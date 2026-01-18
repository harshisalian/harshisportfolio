import { motion } from 'framer-motion'

export default function Blogs() {
  const posts = Array.from({ length: 5 }).map((_, i) => ({
    title: `Issue #${i + 1}: Panel by Panel`,
    excerpt: 'Thoughts on design systems, motion, and building UIs that feel alive.',
    date: `2026-0${i + 1}-01`,
  }))

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="caption mb-6">Latest Issues</div>
      <div className="space-y-4">
        {posts.map((post, idx) => (
          <motion.article key={idx} whileHover={{ x: 4 }} className="panel p-5 rounded-xl flex items-start gap-4">
            <div className="w-24 h-24 rounded-lg bg-yellow-200 halftone comic-border" />
            <div>
              <h3 className="title-font text-2xl">{post.title}</h3>
              <p className="text-sm my-2">{post.excerpt}</p>
              <span className="text-xs">{post.date}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
