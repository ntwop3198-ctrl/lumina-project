/**
 * Windows: 지정 포트를 LISTENING 중인 프로세스를 종료합니다.
 * 사용: node scripts/free-port.js 3001
 * 비 Windows에서는 no-op.
 */
const { execSync } = require("child_process")

function killListenersOnPort(port) {
  if (process.platform !== "win32") return

  const portStr = String(port)
  try {
    const out = execSync("netstat -ano", { encoding: "utf8" })
    const pids = new Set()
    // "127.0.0.1:3001" / "[::]:3001" — :8080 에서 :80 오인 방지 위해 단어 경계
    const re = new RegExp(`:${portStr}\\s+.*LISTENING`)
    for (const line of out.split(/\r?\n/)) {
      if (!re.test(line)) continue
      const parts = line.trim().split(/\s+/)
      const pid = parts[parts.length - 1]
      if (/^\d+$/.test(pid)) pids.add(pid)
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" })
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* no netstat */
  }
}

if (require.main === module) {
  const p = process.argv[2] || "3001"
  if (!/^\d+$/.test(p)) {
    console.error("Usage: node scripts/free-port.js <port>")
    process.exit(1)
  }
  killListenersOnPort(p)
}

module.exports = { killListenersOnPort }
