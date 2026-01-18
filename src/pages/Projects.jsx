import { motion } from 'framer-motion'

const covers = [
  'https://flamesimagestorage.blob.core.windows.net/files/56d0d317-c2ef-4ed1-a1b6-0b7f0c146bf4_1768677021440_prj_71t2vehf/0c71d677-fdf9-4cb8-a10b-15ae04c3467d-download__2_.jpg',
  'https://flamesimagestorage.blob.core.windows.net/files/4019dc08-d753-428a-abe1-3f65dff52ddb_1768677066251_prj_71t2vehf/41abd70c-0564-4b30-8507-3d89cfafdad9-download__3_.jpg',
  'https://flamesimagestorage.blob.core.windows.net/files/afd0b780-dde3-4dbe-bdac-76276ca955ad_1768677073198_prj_71t2vehf/98257271-1272-4f69-8513-a37fcb813e39-_______3____.jpg'
]

const projects = [
  {
    title: 'Planical',
    subtitle: 'AI-Powered Mental Health Platform',
    desc: 'React.js + FastAPI + LangChain + Firebase, scaled to 1000+ users.',
    url: 'https://github.com/harshisalian/planical',
    cover: covers[0],
  },
  {
    title: 'TechSpark',
    subtitle: 'Full-Stack Event Management System',
    desc: 'Next.js + Supabase platform for college fests and registrations.',
    url: 'https://github.com/harshisalian/techspark',
    cover: covers[1],
  },
  {
    title: 'Nail Disease Detection',
    subtitle: 'AI Medical Scanner (CNN)',
    desc: 'Deep-learning based scanner for real-time analysis.',
    url: 'https://github.com/harshisalian/nail-disease-detection',
    cover: covers[2],
  },
]

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="caption mb-6">Projects</div>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <motion.div key={idx} whileHover={{ rotate: -1, scale: 1.02 }} initial={{ scale: 0.96 }} className="rounded-xl overflow-hidden comic-border bg-white text-black">
            <div className="relative h-56 overflow-hidden">
              <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 halftone opacity-30" />
              <div className="absolute top-3 left-3 title-font bg-yellow-300 px-3 py-1 comic-border">SPECIAL ISSUE</div>
            </div>
            <div className="p-4">
              <div className="title-font text-2xl">{p.title}</div>
              <div className="text-sm mb-1">{p.subtitle}</div>
              <p className="text-sm mb-3">{p.desc}</p>
              <a href={p.url} target="_blank" className="comic-btn bg-[var(--c-cyan)]">View Codebase</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
