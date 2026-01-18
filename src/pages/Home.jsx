import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ComicSFX from '../components/ComicSFX'
import GamepadPanel from '../components/GamepadPanel'

const HERO_BG_3D = 'https://flamesimagestorage.blob.core.windows.net/files/f66aec03-34db-465b-b21a-467c753ed0e4_1768677058924_prj_71t2vehf/991293e7-2f5a-49d5-a29d-5300edc8f67d-Persona_5_Aesthetic_Buildings.jpg'

export default function Home() {
  const formRef = useRef(null)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section')
            window.dispatchEvent(new CustomEvent('avatar-section', { detail: id }))
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero: 3D centerpiece */}
      <section data-section="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        {/* 3D container (behind text) */}
        <div id="hero-3d-container" className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[80%] h-[80%] comic-border rounded-2xl overflow-hidden relative">
            <img src={HERO_BG_3D} alt="3D scene placeholder" className="w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0 halftone-cyan opacity-40" />
            {/* This container is reserved for the cel-shaded 3D character asset to be uploaded */}
          </div>
        </div>

        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="text-center px-6">
          <div className="caption inline-block mb-6">Issue #1 — The Call to Adventure</div>
          <h1 className="title-font text-5xl md:text-7xl text-yellow-300 drop-shadow-[6px_6px_0_#000]">
            Harshitha: Cloud & Code Specialist
          </h1>
          <p className="mt-6 max-w-3xl mx-auto panel text-lg">
            Final-year Computer Science student on the lookout for entry-level roles. Energetic, collaborative, and ready to ship.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="#about" className="comic-btn">Read Origin</a>
            <a href="/projects" className="comic-btn bg-[var(--c-magenta)]">View Missions</a>
          </div>
        </motion.div>
        <div className="absolute left-6 bottom-6"><ComicSFX text="ZOOM!" color="bg-[var(--c-cyan)]" /></div>
        <div className="absolute right-6 top-10"><ComicSFX text="DEPLOYED!" color="bg-[var(--c-magenta)]" /></div>
      </section>

      {/* About: Origin Story */}
      <section id="about" data-section="about" className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div whileInView={{ x: 0, opacity: 1 }} initial={{ x: -40, opacity: 0 }} viewport={{ once: true }} className="speech">
            <h3 className="title-font text-3xl mb-2">Origin Story</h3>
            <p>
              Enthusiastic and eager to learn, passionate about coding and collaboration. Quick to adapt and motivated to expand skills through new challenges.
            </p>
          </motion.div>
          <motion.div whileInView={{ x: 0, opacity: 1 }} initial={{ x: 40, opacity: 0 }} viewport={{ once: true }} className="speech bg-yellow-200">
            <h3 className="title-font text-3xl mb-2">Team Spirit</h3>
            <p>
              Thrives in fast-moving squads. Clear communicator who loves pairing, reviews, and building robust, maintainable systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills & Certifications */}
      <section data-section="certs" className="max-w-6xl mx-auto px-4">
        <div className="caption mb-4">Power-Ups</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Languages */}
          <motion.div whileInView={{ scale: 1 }} initial={{ scale: 0.9 }} className="panel halftone p-5 rounded-xl">
            <div className="title-font text-2xl mb-2">Languages</div>
            <div className="flex flex-wrap gap-2">
              {['Python','JavaScript','TypeScript','Java'].map((s) => (
                <span key={s} className="comic-border px-3 py-1 bg-yellow-200">{s}</span>
              ))}
            </div>
          </motion.div>
          {/* Tools */}
          <motion.div whileInView={{ scale: 1 }} initial={{ scale: 0.9 }} className="panel halftone p-5 rounded-xl">
            <div className="title-font text-2xl mb-2">Tools</div>
            <div className="flex flex-wrap gap-2">
              {['Git','GitHub','Netlify','Firebase','Supabase'].map((s) => (
                <span key={s} className="comic-border px-3 py-1 bg-cyan-200">{s}</span>
              ))}
            </div>
          </motion.div>
          {/* Cloud Focus */}
          <motion.div whileInView={{ rotate: -1, scale: 1 }} initial={{ rotate: -6, scale: 0.95 }} className="panel halftone p-5 rounded-xl">
            <div className="title-font text-2xl mb-2">Cloud & DevOps</div>
            <p>Cloud Computing focus with DevOps interests from coursework and projects.</p>
          </motion.div>
          {/* Certifications */}
          <motion.div whileInView={{ scale: 1 }} initial={{ scale: 0.9 }} className="panel halftone p-5 rounded-xl md:col-span-2">
            <div className="title-font text-2xl mb-3">Certifications</div>
            <ul className="grid sm:grid-cols-2 gap-2 list-disc ml-6">
              <li>NPTEL Cloud Computing</li>
              <li>Deloitte Cyber Job Simulation</li>
              <li>Infosys Springboard JS/HTML/CSS</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA as Gamepad */}
      <section data-section="contact" className="max-w-4xl mx-auto px-4 pb-24">
        <GamepadPanel title="SEND SIGNAL" onPrimary={() => formRef.current?.requestSubmit()}>
          <p className="mb-4">Use the controller to transmit your message to HQ. Press A to send.</p>
          <ContactForm refObj={formRef} />
        </GamepadPanel>
      </section>
    </div>
  )
}

function ContactForm({ refObj }) {
  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      // send to multipart endpoint so an image can be attached
      const res = await fetch(`${baseUrl}/contact/upload`, { method: 'POST', body: form })
      const data = await res.json()
      alert(res.ok ? 'Message sent! Ref: ' + data.id : 'Error: ' + (data.detail || 'Failed'))
      if (res.ok) e.currentTarget.reset()
    } catch (err) {
      alert('Network error: ' + err.message)
    }
  }

  return (
    <form ref={refObj} onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
      <div className="sm:col-span-1">
        <label className="block mb-1 title-font">Name</label>
        <input name="name" required className="w-full px-4 py-3 rounded-md comic-border bg-white text-black placeholder-black" placeholder="Your name" />
      </div>
      <div className="sm:col-span-1">
        <label className="block mb-1 title-font">Email</label>
        <input name="email" type="email" required className="w-full px-4 py-3 rounded-md comic-border bg-white text-black placeholder-black" placeholder="you@domain.com" />
      </div>
      <div className="sm:col-span-2">
        <label className="block mb-1 title-font">Subject</label>
        <input name="subject" required className="w-full px-4 py-3 rounded-md comic-border bg-white text-black placeholder-black" placeholder="What's this about?" />
      </div>
      <div className="sm:col-span-2">
        <label className="block mb-1 title-font">Message</label>
        <textarea name="message" rows="4" required className="w-full px-4 py-3 rounded-md comic-border bg-white text-black placeholder-black" placeholder="Tell me everything..." />
      </div>
      <div className="sm:col-span-2">
        <label className="block mb-1 title-font">Attach image (optional)</label>
        <input name="image" type="file" accept="image/*" className="w-full px-4 py-3 rounded-md comic-border bg-white text-black" />
      </div>
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" className="comic-btn">Press A to Send</button>
        <a href="/contact" className="comic-btn bg-yellow-300">More ways to reach me</a>
      </div>
    </form>
  )
}
