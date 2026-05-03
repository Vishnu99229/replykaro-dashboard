import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: dark ? 'rgba(17,17,16,0.85)' : 'rgba(248,247,244,0.85)', borderColor: 'var(--border)' }}>
        <div className="max-w-[960px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              R
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight" style={{ color: 'var(--text)' }}>ReplyKaro</h1>
              <p className="text-[11px] leading-tight" style={{ color: 'var(--text-secondary)' }}>Clinic Dashboard</p>
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-colors cursor-pointer"
            style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-[960px] w-full mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl" style={{ background: dark ? 'rgba(17,17,16,0.92)' : 'rgba(248,247,244,0.92)', borderColor: 'var(--border)' }}>
        <div className="max-w-[960px] mx-auto flex justify-around py-2 px-2">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">🏠</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">👥</span>
            <span>Patients</span>
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📊</span>
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
