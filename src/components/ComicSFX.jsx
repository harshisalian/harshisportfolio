import { motion } from 'framer-motion'

export default function ComicSFX({ text = 'POW!', color = 'bg-[var(--c-magenta)]', className = '' }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      whileInView={{ scale: 1, rotate: -8, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      className={`inline-block title-font text-white px-4 py-2 comic-border ${color} ${className}`}
    >
      {text}
    </motion.div>
  )
}
