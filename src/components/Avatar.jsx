import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Updated avatar uses the newly uploaded character image
const AVATAR_IMG = 'https://flamesimagestorage.blob.core.windows.net/files/53163d11-3d62-4be9-810c-fcd86188a9f2_1768679174436_prj_71t2vehf/8be3134c-d561-4723-8192-743e1ab88f30-mee__1_.png'

export default function Avatar({ section }) {
  const [y, setY] = useState(0)

  useEffect(() => {
    const onScroll = () => setY(window.scrollY * 0.06)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const caption = section === 'home'
    ? 'Cloud & Code — mission ready!'
    : section === 'about'
    ? 'Team player. Quick learner. Let’s build something impactful.'
    : section === 'certs'
    ? 'Power-ups loaded: Cloud, DevOps, and front-end flair.'
    : section === 'contact'
    ? 'Signal received — let’s connect.'
    : 'Scroll through the panels to explore my story.'

  return (
    <motion.div
      className="fixed right-6 bottom-6 z-40 select-none"
      style={{ translateY: y }}
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16 }}
    >
      <motion.div
        className="bg-white comic-border rounded-3xl p-3 max-w-[260px]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Photo with comic treatment */}
        <div className="rounded-2xl overflow-hidden comic-border relative bg-white">
          <img src={AVATAR_IMG} alt="Harshitha avatar" className="w-full h-[240px] object-cover object-center" />
          <div className="absolute inset-0 halftone opacity-15" />
        </div>
        <div className="speech mt-3 text-sm">{caption}</div>
      </motion.div>
    </motion.div>
  )
}
