import StatusBadge from './StatusBadge'

function formatTime12h(time24) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 || 12
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}

function getInitial(name) {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

export default function AppointmentRow({ appointment }) {
  const patient = appointment.patients || {}
  const initial = getInitial(patient.name)

  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b transition-colors hover:opacity-90" style={{ borderColor: 'var(--border)' }}>
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
      >
        {initial}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
          {patient.name || 'Unknown Patient'}
        </p>
        <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
          {appointment.treatment}
          {patient.phone && ` · ${patient.phone}`}
        </p>
      </div>

      {/* Time + Status */}
      <div className="text-right shrink-0 flex flex-col items-end gap-1">
        <span className="mono text-sm font-medium" style={{ color: 'var(--text)' }}>
          {formatTime12h(appointment.time)}
        </span>
        <StatusBadge status={appointment.status} />
      </div>
    </div>
  )
}
