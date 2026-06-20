import React from 'react'
import ReactDOM from 'react-dom/client'
import {usestate, useeffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  return (
    <>
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            Unlock Every Opportunity.<br />
            <span className="text-blue-700">Classified for You.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Access a curated ecosystem of high-impact professional paths. We filter the noise so you can focus on the growth that matters.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => navigate('/login')} className="btn-primary px-6 py-3 text-base">
              Get Started
            </button>
            <button onClick={() => navigate('/explore')} className="btn-outline px-6 py-3 text-base flex items-center gap-2">
              View All Listings
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
 
        {/* Right – stat card + hero visual */}
        <div className="flex-1 flex justify-center relative">
          {/* Dark blue card */}
          <div
            className="relative rounded-2xl overflow-hidden w-full max-w-sm aspect-video flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #1E3A8A 100%)' }}
          >
            {/* Decorative grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 225" preserveAspectRatio="none">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1={i * 60} y1={0} x2={i * 60} y2={225} stroke="#60A5FA" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={i} x1={0} y1={i * 56} x2={400} y2={i * 56} stroke="#60A5FA" strokeWidth="0.5" />
              ))}
            </svg>
            {/* Glowing cube icon placeholder */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
            </div>
          </div>
 
          {/* Floating stat */}
          <div className="absolute -bottom-4 right-4 md:right-0 bg-white border border-slate-200 rounded-xl shadow-lg px-5 py-3">
            <p className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>12,400+</p>
            <p className="text-xs text-slate-500 mt-0.5">Total Listings</p>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default Hero