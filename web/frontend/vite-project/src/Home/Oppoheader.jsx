import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState, useEffect} from 'react'


const TABS = ['Hackathons', 'Mentors', 'Internships', 'Jobs', 'Business Ideas']


export default function Oppoheader({ activeTab, onTabChange }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold text-slate-900">Trending Opportunities</h2>
        <a href="/explore" className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors">
          View All Listings
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <p className="text-sm text-slate-500 mb-5">Real-time top opportunities updated daily</p>
 
      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap border-b border-slate-200 pb-0">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`text-sm font-medium px-4 py-2 border-b-2 transition-all -mb-px ${
              activeTab === tab
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
 
        {/* Sort/filter icon */}
        <button className="ml-auto flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors pb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h4" />
          </svg>
          Filter
        </button>
      </div>
    </div>
  )
}
 
