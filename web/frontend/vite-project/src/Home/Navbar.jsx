import React from 'react'
import ReactDOM from 'react-dom/client'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Navbar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
  return (
    <>
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
          Asymmetry
        </Link>
 
        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/explore" className="hover:text-blue-700 transition-colors">Explore</Link>
          <Link to="/pricing" className="hover:text-blue-700 transition-colors">Pricing</Link>
          <Link to="/about" className="hover:text-blue-700 transition-colors">About</Link>
        </nav>
 
        {/* Search + Login */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-slate-100 rounded-md px-3 py-1.5 gap-2 w-52">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search opportunities..."
              className="bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400 w-full"
            />
          </div>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    </header>

    </>
  )
}

export default Navbar