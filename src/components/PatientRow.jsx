function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function PatientRow({ patient }) {
  const initial = patient.name ? patient.name.charAt(0).toUpperCase() : '?'
  const channelIcon = patient.channel === 'voice' ? '📞' : '💬'
  const channelLabel = patient.channel === 'voice' ? 'Voice' : 'WhatsApp'

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
          {patient.name || 'Unknown'}
        </p>
        <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
          {patient.phone}
        </p>
      </div>

      {/* Channel badge */}
      <div className="hidden sm:flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
        <span>{channelIcon}</span>
        <span>{channelLabel}</span>
      </div>

      {/* Stats */}
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {patient.appointmentCount} appt{patient.appointmentCount !== 1 ? 's' : ''}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {patient.lastAppointment ? formatDate(patient.lastAppointment) : 'No visits'}
        </p>
      </div>

      {/* First contact */}
      <div className="text-right shrink-0">
        <p className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          {formatDate(patient.first_contact || patient.created_at)}
        </p>
      </div>
    </div>
  )
}
