import { useState } from 'react'
import { useAppointments } from '../hooks/useAppointments'
import { usePatients } from '../hooks/usePatients'
import { useMessages } from '../hooks/useMessages'
import { useClinic } from '../hooks/useClinic'
import StatCard from '../components/StatCard'
import AppointmentRow from '../components/AppointmentRow'
import ConversationRow from '../components/ConversationRow'

function groupByDate(appointments) {
  const groups = {}
  for (const apt of appointments) {
    const key = apt.date
    if (!groups[key]) groups[key] = []
    groups[key].push(apt)
  }
  return groups
}

function formatDateHeader(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('today')
  const { todayAppts, upcomingAppts, weekCount, loading: apptsLoading, refetch: refetchAppts } = useAppointments()
  const { patients, loading: patientsLoading } = usePatients()
  const { messages, totalCount, loading: msgsLoading, refetch: refetchMsgs } = useMessages()
  const { clinic, loading: clinicLoading } = useClinic()

  const loading = apptsLoading || patientsLoading || msgsLoading || clinicLoading

  function handleRefresh() {
    refetchAppts()
    refetchMsgs()
  }

  const grouped = groupByDate(upcomingAppts)

  return (
    <div className="fade-in">
      {/* Clinic header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {clinic ? (
            <>
              <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                {clinic.name}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {clinic.address?.split('—')[0]?.trim() || 'Clinic Dashboard'}
              </p>
            </>
          ) : (
            <>
              <div className="skeleton w-48 h-5 mb-2" />
              <div className="skeleton w-32 h-4" />
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
            <span className="pulse-dot w-2 h-2 rounded-full inline-block" style={{ background: '#22c55e' }} />
            Agent live
          </div>
          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all cursor-pointer active:scale-95"
            style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}
            aria-label="Refresh data"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 stagger">
        <StatCard
          label="Today"
          value={loading ? '—' : todayAppts.length}
          subtitle="appointments"
          borderColor="#6366f1"
        />
        <StatCard
          label="This week"
          value={loading ? '—' : weekCount}
          subtitle="appointments"
          borderColor="#8b5cf6"
        />
        <StatCard
          label="Patients"
          value={loading ? '—' : patients.length}
          subtitle="total"
          borderColor="#22c55e"
        />
        <StatCard
          label="Conversations"
          value={loading ? '—' : totalCount}
          subtitle="handled by AI"
          borderColor="#f59e0b"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button
          className={`tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today ({todayAppts.length})
        </button>
        <button
          className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`tab ${activeTab === 'conversations' ? 'active' : ''}`}
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
      </div>

      {/* Tab content */}
      <div className="card overflow-hidden">
        {activeTab === 'today' && (
          <>
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="skeleton w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="skeleton w-32 h-4 mb-2" />
                      <div className="skeleton w-48 h-3" />
                    </div>
                    <div className="skeleton w-16 h-4" />
                  </div>
                ))}
              </div>
            ) : todayAppts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-5xl mb-4 opacity-30">📅</div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                  No appointments today
                </p>
                <p className="text-xs max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                  When patients book via WhatsApp or call, they'll appear here.
                </p>
              </div>
            ) : (
              <div className="stagger">
                {todayAppts.map(apt => (
                  <AppointmentRow key={apt.id} appointment={apt} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'upcoming' && (
          <>
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="skeleton w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="skeleton w-32 h-4 mb-2" />
                      <div className="skeleton w-48 h-3" />
                    </div>
                    <div className="skeleton w-16 h-4" />
                  </div>
                ))}
              </div>
            ) : upcomingAppts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-5xl mb-4 opacity-30">📅</div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                  No upcoming appointments
                </p>
                <p className="text-xs max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                  Future bookings will appear here grouped by date.
                </p>
              </div>
            ) : (
              Object.entries(grouped).map(([date, appts]) => (
                <div key={date}>
                  <div className="px-5 py-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {formatDateHeader(date)}
                  </div>
                  {appts.map(apt => (
                    <AppointmentRow key={apt.id} appointment={apt} />
                  ))}
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'conversations' && (
          <>
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="skeleton w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <div className="skeleton w-24 h-3 mb-2" />
                      <div className="skeleton w-full h-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-5xl mb-4 opacity-30">💬</div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                  No conversations yet
                </p>
                <p className="text-xs max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                  AI conversations with patients will appear here.
                </p>
              </div>
            ) : (
              <div>
                {messages.map(msg => (
                  <ConversationRow key={msg.id} message={msg} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
