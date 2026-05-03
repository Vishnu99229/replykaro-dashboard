import { useState } from 'react'
import { usePatients } from '../hooks/usePatients'
import PatientRow from '../components/PatientRow'

export default function Patients() {
  const { patients, loading } = usePatients()
  const [search, setSearch] = useState('')

  const filtered = patients.filter(p => {
    const q = search.toLowerCase()
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.phone || '').includes(q)
    )
  })

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Patients</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {patients.length} total patients
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--ring)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* Patient list */}
      <div className="card overflow-hidden">
        {/* Column headers (desktop only) */}
        <div className="hidden sm:flex items-center gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
          style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
          <div className="w-10" />
          <div className="flex-1">Patient</div>
          <div className="w-24 text-center">Channel</div>
          <div className="w-28 text-right">Appointments</div>
          <div className="w-24 text-right">Joined</div>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="skeleton w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton w-32 h-4 mb-2" />
                  <div className="skeleton w-24 h-3" />
                </div>
                <div className="skeleton w-16 h-4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="text-5xl mb-4 opacity-30">👥</div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
              {search ? 'No patients match your search' : 'No patients yet'}
            </p>
            <p className="text-xs max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              {search ? 'Try a different name or phone number.' : 'Patients will appear here after they contact the clinic.'}
            </p>
          </div>
        ) : (
          <div>
            {filtered.map(patient => (
              <PatientRow key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
