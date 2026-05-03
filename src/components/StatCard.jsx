export default function StatCard({ label, value, subtitle, borderColor = '#6366f1' }) {
  return (
    <div className="card p-5 relative overflow-hidden" style={{ borderLeft: `4px solid ${borderColor}` }}>
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
      <p className="text-4xl font-bold mt-1 tracking-tight" style={{ color: 'var(--text)' }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
        {subtitle}
      </p>
      {/* Subtle gradient background */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5"
        style={{ background: borderColor, transform: 'translate(30%, -30%)', filter: 'blur(16px)' }}
      />
    </div>
  )
}
