import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState, useEffect} from 'react'
import Oppoheader from './Oppoheader.jsx'


// Mock data for each tab
const OPPORTUNITIES = {
  Hackathons: [
    {
      id: 1,
      title: 'Global Fintech Hackathon 2026',
      description: 'Join 15,000+ developers competing for $5M in prizes building the next generation of fintech solutions.',
      tag: 'Hackathon',
      image: null,
      gradient: 'from-blue-900 to-blue-700',
      dark: true,
    },
    {
      id: 2,
      title: 'Quantum Strategy Analyst',
      description: 'First and only program at creating global connectivity, focusing on emerging markets.',
      tag: 'Strategy',
      image: null,
      gradient: 'from-amber-500 to-orange-600',
      dark: true,
    },
    {
      id: 3,
      title: 'AI Green Supply Chain Logistics',
      description: 'Build AI models to automate leading logistics platforms to decrease bias.',
      tag: 'AI / Logistics',
      image: null,
      gradient: 'from-yellow-400 to-yellow-500',
      dark: false,
    },
    {
      id: 4,
      title: 'Quantum Computing Summit',
      description: 'Exclusive research, remote for Scientists to be Quantum researchers at the forefront of technology.',
      tag: 'Research',
      image: null,
      gradient: 'from-slate-800 to-slate-700',
      dark: true,
    },
    {
      id: 5,
      title: 'Lead Product Designer',
      description: 'Defining the next generation of fintech solutions using the worlds best design tools.',
      tag: 'Design',
      image: null,
      gradient: 'from-blue-600 to-indigo-700',
      dark: true,
    },
  ],
  Internships: [
    {
      id: 6,
      title: 'Software Engineering Intern — Google',
      description: 'Summer internship for top students passionate about distributed systems and ML.',
      tag: 'Internship',
      gradient: 'from-blue-500 to-blue-700',
      dark: true,
    },
    {
      id: 7,
      title: 'Product Management Intern — Stripe',
      description: 'Work alongside PMs shipping products used by millions of businesses globally.',
      tag: 'Product',
      gradient: 'from-indigo-600 to-purple-700',
      dark: true,
    },
    {
      id: 8,
      title: 'Data Science Intern — Anthropic',
      description: 'Analyze large datasets to support safety research and model evaluations.',
      tag: 'Data',
      gradient: 'from-emerald-600 to-teal-700',
      dark: true,
    },
    {
      id: 9,
      title: 'Finance Analyst Intern — Goldman',
      description: 'Rotational program across equities, credit, and macro trading desks.',
      tag: 'Finance',
      gradient: 'from-slate-700 to-slate-900',
      dark: true,
    },
    {
      id: 10,
      title: 'UX Research Intern — Figma',
      description: 'Conduct user interviews and usability studies to shape future design tools.',
      tag: 'UX Research',
      gradient: 'from-pink-500 to-rose-600',
      dark: true,
    },
  ],
  Jobs: [
    {
      id: 11,
      title: 'Senior Backend Engineer — OpenAI',
      description: 'Build scalable APIs and infrastructure for the next generation of AI products.',
      tag: 'Full-time',
      gradient: 'from-gray-800 to-gray-900',
      dark: true,
    },
    {
      id: 12,
      title: 'Growth Marketing Manager',
      description: 'Own growth loops and paid acquisition channels for a Series B fintech startup.',
      tag: 'Marketing',
      gradient: 'from-orange-500 to-amber-600',
      dark: true,
    },
    {
      id: 13,
      title: 'Machine Learning Engineer — Meta',
      description: 'Join the Fundamental AI Research team working on next-gen foundation models.',
      tag: 'ML Engineering',
      gradient: 'from-blue-700 to-blue-900',
      dark: true,
    },
    {
      id: 14,
      title: 'VP of Engineering — Stealth Startup',
      description: 'Lead a 30-person engineering org building real-time financial infrastructure.',
      tag: 'Leadership',
      gradient: 'from-slate-700 to-slate-800',
      dark: true,
    },
    {
      id: 15,
      title: 'DevRel Engineer — Vercel',
      description: 'Help developers build with the edge and shape the future of web deployment.',
      tag: 'DevRel',
      gradient: 'from-indigo-600 to-blue-700',
      dark: true,
    },
  ],
  Mentors: [
    {
      id: 16,
      title: 'VC Partner Mentorship Program',
      description: '1:1 sessions with top investors from a16z, Sequoia, and YC.',
      tag: 'Mentorship',
      gradient: 'from-violet-600 to-purple-700',
      dark: true,
    },
    {
      id: 17,
      title: 'Founder Office Hours — YC Alumni',
      description: 'Weekly drop-in with YC alumni founders across B2B SaaS and infrastructure.',
      tag: 'Startup',
      gradient: 'from-amber-500 to-yellow-500',
      dark: false,
    },
    {
      id: 18,
      title: 'AI Research Mentors Network',
      description: 'Get paired with PhD researchers from top labs for guidance on ML careers.',
      tag: 'AI / Research',
      gradient: 'from-teal-600 to-emerald-700',
      dark: true,
    },
    {
      id: 19,
      title: 'Product Design Mentorship',
      description: 'Portfolio reviews and weekly standups with senior designers at Figma, Airbnb.',
      tag: 'Design',
      gradient: 'from-pink-600 to-rose-700',
      dark: true,
    },
    {
      id: 20,
      title: 'Quant Finance Mentorship',
      description: 'Connect with traders and quants from Citadel, Two Sigma, and Jane Street.',
      tag: 'Finance',
      gradient: 'from-slate-600 to-slate-800',
      dark: true,
    },
  ],
  'Business Ideas': [
    {
      id: 21,
      title: 'AI-Powered Legal Research Tool',
      description: 'Automate case law research and brief drafting for solo attorneys.',
      tag: 'Legal Tech',
      gradient: 'from-blue-800 to-blue-900',
      dark: true,
    },
    {
      id: 22,
      title: 'Micro SaaS for Freelancers',
      description: 'Build a time-tracking and invoicing tool tailored for independent creators.',
      tag: 'SaaS',
      gradient: 'from-indigo-500 to-blue-600',
      dark: true,
    },
    {
      id: 23,
      title: 'Climate Data Marketplace',
      description: 'Aggregate and sell real-time environmental sensor data to ESG investors.',
      tag: 'Climate',
      gradient: 'from-green-600 to-emerald-700',
      dark: true,
    },
    {
      id: 24,
      title: 'B2B Procurement Intelligence',
      description: 'Help procurement teams benchmark vendor pricing with AI-powered insights.',
      tag: 'Enterprise',
      gradient: 'from-slate-700 to-slate-900',
      dark: true,
    },
    {
      id: 25,
      title: 'Health Data Aggregator',
      description: 'Unify wearable and EHR data to surface actionable insights for patients.',
      tag: 'HealthTech',
      gradient: 'from-rose-600 to-pink-700',
      dark: true,
    },
  ],
}

function OppoCard({ opp }) {
  return (
    <div className={`rounded-xl overflow-hidden card-hover cursor-pointer border border-slate-200 flex flex-col`}>
      {/* Colored header */}
      <div className={`bg-gradient-to-br ${opp.gradient} h-28 flex items-end p-3`}>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${opp.dark ? 'bg-white/20 text-white' : 'bg-black/15 text-slate-800'}`}>
          {opp.tag}
        </span>
      </div>
      {/* Body */}
      <div className="bg-white p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">{opp.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">{opp.description}</p>
        <button className="mt-3 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors text-left">
          Join Now →
        </button>
      </div>
    </div>
  )
}

function PremiumCard() {
  return (
    <div className="rounded-xl overflow-hidden border-2 border-blue-700 flex flex-col bg-white card-hover cursor-pointer">
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 h-28 flex items-center justify-center">
        <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-bold text-blue-700 mb-1">PREMIUM ACCESS</span>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">
          Get full access to exclusive opportunities verified and curated by industry experts.
        </p>
        <button className="mt-3 btn-primary text-xs py-2 w-full text-center">
          Upgrade Now
        </button>
      </div>
    </div>
  )
}

export default function Oppo() {
  const [activeTab, setActiveTab] = useState('Hackathons')

  const cards = OPPORTUNITIES[activeTab] || []

  return (
    <div className="pb-12">
      <Oppoheader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.slice(0, 4).map(opp => (
            <OppoCard key={opp.id} opp={opp} />
          ))}
          <PremiumCard />
        </div>

        <div className="flex justify-center mt-8">
          <button className="btn-outline flex items-center gap-2 px-8 py-2.5">
            Load more opportunities
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}