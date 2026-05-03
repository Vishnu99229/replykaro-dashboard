function timeAgo(dateStr) {
  if (!dateStr) return ''
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function ConversationRow({ message }) {
  const patient = message.patients || {}
  const isUser = message.role === 'user'

  return (
    <div className="flex items-start gap-3 px-5 py-3 border-b transition-colors" style={{ borderColor: 'var(--border)' }}>
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5"
        style={{
          background: isUser ? 'var(--border)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: isUser ? 'var(--text-secondary)' : 'white',
        }}
      >
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
            {isUser ? (patient.name || 'Patient') : 'Priya (AI)'}
          </span>
          {patient.phone && isUser && (
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {patient.phone}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {message.content}
        </p>
      </div>

      {/* Time */}
      <span className="mono text-xs shrink-0 mt-1" style={{ color: 'var(--text-secondary)' }}>
        {timeAgo(message.created_at)}
      </span>
    </div>
  )
}
