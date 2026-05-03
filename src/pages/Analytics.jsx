import { useMemo } from 'react'
import { useAnalyticsAppointments } from '../hooks/useAppointments'
import { useMessages } from '../hooks/useMessages'
import StatCard from '../components/StatCard'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const COLORS_CHANNEL = ['#14b8a6', '#8b5cf6']
const COLORS_TREATMENT = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#e0e7ff', '#eef2ff']

function getComputedTextColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#7a7a72'
}

export default function Analytics() {
  const { data: appointments, loading: apptsLoading } = useAnalyticsAppointments()
  const { totalCount: conversationCount, loading: msgsLoading } = useMessages()

  const loading = apptsLoading || msgsLoading

  // --- Computed stats ---
  const stats = useMemo(() => {
    if (!appointments.length) return { monthTotal: 0, avgPerDay: 0, busiestDay: '—', conversionRate: 0 }

    const monthTotal = appointments.length
    const avgPerDay = (monthTotal / 30).toFixed(1)

    // Busiest day of week
    const dayCounts = [0, 0, 0, 0, 0, 0, 0] // Sun-Sat
    appointments.forEach(a => {
      const day = new Date(a.date + 'T00:00:00').getDay()
      dayCounts[day]++
    })
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const busiestIdx = dayCounts.indexOf(Math.max(...dayCounts))
    const busiestDay = dayNames[busiestIdx]

    // Conversion rate estimate
    const conversionRate = conversationCount > 0
      ? Math.round((monthTotal / conversationCount) * 100)
      : 0

    return { monthTotal, avgPerDay, busiestDay, conversionRate: Math.min(conversionRate, 100) }
  }, [appointments, conversationCount])

  // --- Chart: appointments per day ---
  const dailyData = useMemo(() => {
    const counts = {}
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      counts[key] = 0
    }
    appointments.forEach(a => {
      if (counts[a.date] !== undefined) counts[a.date]++
    })
    return Object.entries(counts).map(([date, count]) => ({
      date: new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      count,
    }))
  }, [appointments])

  // --- Chart: channel breakdown ---
  const channelData = useMemo(() => {
    let wa = 0, voice = 0
    appointments.forEach(a => {
      if (a.booked_via === 'voice') voice++
      else wa++
    })
    return [
      { name: 'WhatsApp', value: wa },
      { name: 'Voice', value: voice },
    ].filter(d => d.value > 0)
  }, [appointments])

  // --- Chart: top treatments ---
  const treatmentData = useMemo(() => {
    const counts = {}
    appointments.forEach(a => {
      const t = a.treatment || 'Other'
      counts[t] = (counts[t] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, count]) => ({ name, count }))
  }, [appointments])

  const textColor = typeof window !== 'undefined' ? getComputedTextColor() : '#7a7a72'

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Analytics</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last 30 days performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 stagger">
        <StatCard label="This month" value={loading ? '—' : stats.monthTotal} subtitle="appointments" borderColor="#6366f1" />
        <StatCard label="Conv. rate" value={loading ? '—' : `${stats.conversionRate}%`} subtitle="conversations → bookings" borderColor="#22c55e" />
        <StatCard label="Avg / day" value={loading ? '—' : stats.avgPerDay} subtitle="appointments" borderColor="#8b5cf6" />
        <StatCard label="Busiest day" value={loading ? '—' : stats.busiestDay} subtitle="of the week" borderColor="#f59e0b" />
      </div>

      {/* Appointments per day */}
      <div className="card p-5 mb-6">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
          Appointments per day
        </h3>
        {loading ? (
          <div className="skeleton w-full h-48" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: textColor }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: textColor }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: 'var(--text)',
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Channel + Treatments row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Channel donut */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Bookings by channel
          </h3>
          {loading ? (
            <div className="skeleton w-full h-48" />
          ) : channelData.length === 0 ? (
            <p className="text-xs text-center py-12" style={{ color: 'var(--text-secondary)' }}>No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {channelData.map((_, i) => (
                    <Cell key={i} fill={COLORS_CHANNEL[i % COLORS_CHANNEL.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ color: textColor, fontSize: 12 }}>{value}</span>}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                    color: 'var(--text)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top treatments */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Top treatments
          </h3>
          {loading ? (
            <div className="skeleton w-full h-48" />
          ) : treatmentData.length === 0 ? (
            <p className="text-xs text-center py-12" style={{ color: 'var(--text-secondary)' }}>No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={treatmentData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: textColor }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: textColor }}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                    color: 'var(--text)',
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {treatmentData.map((_, i) => (
                    <Cell key={i} fill={COLORS_TREATMENT[i % COLORS_TREATMENT.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
