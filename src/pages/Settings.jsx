import { useClinic } from '../hooks/useClinic'

export default function Settings() {
  const { clinic, loading } = useClinic()

  if (loading) {
    return (
      <div className="fade-in space-y-6">
        <div>
          <div className="skeleton w-32 h-5 mb-2" />
          <div className="skeleton w-48 h-4" />
        </div>
        <div className="card p-6 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i}>
              <div className="skeleton w-20 h-3 mb-2" />
              <div className="skeleton w-64 h-4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Settings</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Clinic information (read-only)</p>
      </div>

      {/* Agent status */}
      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>AI Agent Status</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Priya is handling WhatsApp conversations
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
            <span className="pulse-dot w-2 h-2 rounded-full inline-block" style={{ background: '#22c55e' }} />
            Active
          </div>
        </div>
      </div>

      {/* Clinic info */}
      <div className="card p-5 mb-6">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Clinic Information</h3>
        <div className="space-y-4">
          <InfoRow label="Clinic name" value={clinic?.name} />
          <InfoRow label="Doctor" value={clinic?.doctor_name} />
          <InfoRow label="Address" value={clinic?.address} />
          <InfoRow label="Working hours" value={clinic?.hours} />
          <InfoRow label="Phone" value={clinic?.phone} />
          <InfoRow label="Payment methods" value={clinic?.payment_methods} />
          <InfoRow label="Parking" value={clinic?.parking} />
          <InfoRow label="Additional info" value={clinic?.additional_info} />
        </div>
      </div>

      {/* Services */}
      <div className="card p-5 mb-6">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Services & Pricing</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Service</th>
                <th className="text-right py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Price (₹)</th>
                <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {(clinic?.services || []).map((service, i) => (
                <tr key={service.id || i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: 'var(--text)' }}>{service.name}</td>
                  <td className="py-3 pr-4 text-right mono" style={{ color: 'var(--text-secondary)' }}>₹{service.price_range}</td>
                  <td className="py-3 text-right mono" style={{ color: 'var(--text-secondary)' }}>
                    {service.duration_minutes ? `${service.duration_minutes} min` : '30 min'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phone */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>WhatsApp Number</h3>
        <p className="mono text-base" style={{ color: 'var(--text)' }}>
          {clinic?.twilio_number || clinic?.phone || '—'}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
          Patients message this number to reach the AI agent
        </p>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
      <p className="text-sm" style={{ color: 'var(--text)' }}>
        {value || '—'}
      </p>
    </div>
  )
}
