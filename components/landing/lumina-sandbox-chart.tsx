"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export type SandboxChartRow = { week: string; success: number; revenue: number }

export function LuminaSandboxLineChart({ data }: { data: SandboxChartRow[] }) {
  return (
    <div className="h-[240px] min-h-[240px] w-full min-w-0 md:h-[280px] md:min-h-[280px]">
      <ResponsiveContainer width="100%" height="100%" minHeight={240}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="week" stroke="rgba(255,255,255,0.25)" tick={{ fontSize: 10 }} />
          <YAxis
            domain={[0, 100]}
            stroke="rgba(255,255,255,0.25)"
            tick={{ fontSize: 10 }}
            width={32}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(8,7,6,0.92)",
              border: "1px solid rgba(201,162,39,0.25)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="success"
            name="성공 확률 %"
            stroke="#c9a227"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="매출 지수"
            stroke="#94a3b8"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
