import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'


export default function Weekly() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
 
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }
 
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Asymmetry Weekly Insights</h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            Join 50,000+ professional analysts receiving our curated list of high-impact opportunities every Monday morning.
          </p>
 
          {subscribed ? (
            <div className="mt-5 flex items-center gap-2 text-emerald-600 font-semibold text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You're subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-5 flex gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@asymmetry.com"
                required
                className="flex-1 border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </div>
 
        {/* Right – decorative newsletter preview */}
        <div className="flex-shrink-0 w-56 h-36 rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden p-4 hidden md:block">
          <div className="h-2 w-16 bg-slate-200 rounded mb-2" />
          <div className="h-2 w-24 bg-blue-200 rounded mb-3" />
          {[40, 56, 48, 32].map((w, i) => (
            <div key={i} className="h-1.5 bg-slate-100 rounded mb-1.5" style={{ width: `${w}%` }} />
          ))}
          <div className="mt-2 flex gap-1.5">
            <div className="h-5 w-14 bg-blue-700 rounded text-white flex items-center justify-center text-[8px] font-bold">READ</div>
          </div>
        </div>
      </div>
    </section>
  )
}
 
