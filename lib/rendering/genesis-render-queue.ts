type QueueItem = {
  id: string
  createdAt: number
  ttlMs: number
  status: "queued" | "granted" | "expired"
  position: number
}

type GenesisQueueState = {
  active: number
  maxActive: number
  items: QueueItem[]
}

const KEY = "__lumina_genesis_render_queue__"

function getState(): GenesisQueueState {
  const g = globalThis as unknown as Record<string, GenesisQueueState | undefined>
  if (!g[KEY]) {
    g[KEY] = { active: 0, maxActive: 1, items: [] }
  }
  return g[KEY]!
}

function now() {
  return Date.now()
}

function cleanupExpired(state: GenesisQueueState) {
  const t = now()
  for (const it of state.items) {
    if (it.status !== "expired" && t - it.createdAt > it.ttlMs) {
      it.status = "expired"
    }
  }
  state.items = state.items.filter((it) => it.status !== "expired")
}

function recomputePositions(state: GenesisQueueState) {
  // queued items first
  const ordered = [...state.items].sort((a, b) => a.createdAt - b.createdAt)
  ordered.forEach((it, idx) => {
    it.position = idx + 1
  })
}

function drain(state: GenesisQueueState) {
  cleanupExpired(state)
  recomputePositions(state)

  if (state.active >= state.maxActive) return
  const next = state.items
    .filter((it) => it.status === "queued")
    .sort((a, b) => a.createdAt - b.createdAt)[0]

  if (!next) return
  next.status = "granted"
  state.active += 1
}

export function requestGenesisReservation(ttlMs: number): {
  reservationId: string
  status: "granted" | "queued" | "expired"
  position?: number
  grantedAt?: number
  waitMs?: number
} {
  const state = getState()
  drain(state)
  const id = `res_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
  const item: QueueItem = {
    id,
    createdAt: now(),
    ttlMs,
    status: "queued",
    position: 1,
  }
  state.items.push(item)
  drain(state)

  if (item.status === "granted") {
    return { reservationId: id, status: "granted", grantedAt: now() }
  }

  const pos = item.position
  const waitMs = Math.max(0, (pos - 1) * 3000) // heuristic: 3s per slot
  return { reservationId: id, status: "queued", position: pos, waitMs }
}

export function checkGenesisReservation(reservationId: string): {
  reservationId: string
  status: "granted" | "queued" | "expired" | "not_found"
  position?: number
  waitMs?: number
} {
  const state = getState()
  cleanupExpired(state)
  recomputePositions(state)
  drain(state)

  const it = state.items.find((x) => x.id === reservationId)
  if (!it) {
    return { reservationId, status: "not_found" }
  }
  if (it.status === "granted") {
    return { reservationId, status: "granted" }
  }

  const pos = it.position
  const waitMs = Math.max(0, (pos - 1) * 3000)
  return { reservationId, status: "queued", position: pos, waitMs }
}

export function releaseGenesisReservation(reservationId: string): void {
  const state = getState()
  cleanupExpired(state)
  const it = state.items.find((x) => x.id === reservationId)
  if (!it) return

  // active는 granted일 때만 감소
  if (it.status === "granted" && state.active > 0) {
    state.active -= 1
  }

  // item 제거
  state.items = state.items.filter((x) => x.id !== reservationId)
  cleanupExpired(state)
  recomputePositions(state)
  drain(state)
}

