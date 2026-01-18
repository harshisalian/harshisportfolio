import { Instagram, Github } from 'lucide-react'

const AVATAR_PHOTO = 'https://flamesimagestorage.blob.core.windows.net/files/31d30922-f92d-4710-94de-fd5c97ea13d6_1768677021604_prj_71t2vehf/54532d8e-337e-4c54-8730-1e2eecbc08a5-WhatsApp_Image_2026-01-12_at_10.25.51_PM.jpeg'

function LeetCodeIcon(props){
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 3 L6 11 L14 19" />
      <path d="M10 7 L17 7" />
      <path d="M10 17 L17 17" />
    </svg>
  )
}

export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[320px,1fr] gap-6">
      {/* Left Panel: Secret Identity dossier */}
      <aside className="panel p-4 rounded-xl h-max">
        <div className="title-font text-2xl mb-3">Secret Identity</div>
        <div className="comic-border rounded-xl overflow-hidden bg-yellow-100 halftone mb-3">
          <img src={AVATAR_PHOTO} alt="Harshitha BRASIL tee" className="w-full h-64 object-cover" />
        </div>
        <div className="space-y-2 text-sm">
          <div><span className="title-font">Bio:</span> Enthusiastic coder passionate about Cloud Computing and Front-End Development.</div>
          <div><span className="title-font">Education:</span> B.E. CSE, Shree Devi Institute of Technology (CGPA: 8.44)</div>
        </div>
        {/* Social Grid */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <a className="comic-btn flex items-center justify-center" href="https://instagram.com" target="_blank" aria-label="Instagram"><Instagram className="text-black"/></a>
          <a className="comic-btn flex items-center justify-center" href="https://leetcode.com" target="_blank" aria-label="LeetCode"><LeetCodeIcon className="text-black"/></a>
          <a className="comic-btn flex items-center justify-center" href="https://github.com/harshisalian" target="_blank" aria-label="GitHub"><Github className="text-black"/></a>
        </div>
      </aside>

      {/* Main Content */}
      <section className="space-y-6">
        <div className="caption">Skill Arsenal</div>
        <div className="panel p-6 rounded-xl">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <div className="title-font text-xl mb-2">Languages</div>
              <div className="flex flex-wrap gap-2">
                {['Python','Java'].map((s) => (
                  <span key={s} className="comic-border px-3 py-1 bg-yellow-200">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="title-font text-xl mb-2">Cloud Tools</div>
              <div className="flex flex-wrap gap-2">
                {['AWS','NPTEL'].map((s) => (
                  <span key={s} className="comic-border px-3 py-1 bg-cyan-200">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="title-font text-xl mb-2">Front-End</div>
              <div className="flex flex-wrap gap-2">
                {['React','TypeScript'].map((s) => (
                  <span key={s} className="comic-border px-3 py-1 bg-magenta-200">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="caption">Top Missions</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { t: 'Planical', d: 'AI-Powered Mental Health Platform', u: 'https://github.com/harshisalian/planical' },
            { t: 'TechSpark', d: 'Full-Stack Event Management System', u: 'https://github.com/harshisalian/techspark' },
            { t: 'Nail Disease Detection', d: 'AI Medical Scanner (CNN)', u: 'https://github.com/harshisalian/nail-disease-detection' },
          ].map((p) => (
            <div key={p.t} className="panel p-4 rounded-xl">
              <div className="title-font text-xl">{p.t}</div>
              <p className="text-sm mb-3">{p.d}</p>
              <a className="comic-btn" target="_blank" href={p.u}>View Codebase</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
