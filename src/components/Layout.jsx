import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Avatar from './Avatar'
import LoadingScreen from './LoadingScreen'

// Background parallax layers using user-provided comic-style images
const LAYER_IMG_1 = 'https://flamesimagestorage.blob.core.windows.net/files/f66aec03-34db-465b-b21a-467c753ed0e4_1768677058924_prj_71t2vehf/991293e7-2f5a-49d5-a29d-5300edc8f67d-Persona_5_Aesthetic_Buildings.jpg'
const LAYER_IMG_2 = 'https://flamesimagestorage.blob.core.windows.net/files/4019dc08-d753-428a-abe1-3f65dff52ddb_1768677066251_prj_71t2vehf/41abd70c-0564-4b30-8507-3d89cfafdad9-download__3_.jpg'
const LAYER_IMG_3 = 'https://flamesimagestorage.blob.core.windows.net/files/afd0b780-dde3-4dbe-bdac-76276ca955ad_1768677073198_prj_71t2vehf/98257271-1272-4f69-8513-a37fcb813e39-_______3____.jpg'

export default function Layout() {
  const location = useLocation()
  const [avatarSection, setAvatarSection] = useState('home')
  const [trail, setTrail] = useState([])
  const [offset, setOffset] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const route = location.pathname
    if (route === '/') setAvatarSection('home')
    else if (route.startsWith('/projects')) setAvatarSection('certs')
    else if (route.startsWith('/profile')) setAvatarSection('about')
    else if (route.startsWith('/contact')) setAvatarSection('contact')
  }, [location])

  useEffect(() => {
    const onCustom = (e) => setAvatarSection(e.detail)
    window.addEventListener('avatar-section', onCustom)
    return () => window.removeEventListener('avatar-section', onCustom)
  }, [])

  // Cursor CMYK trail
  useEffect(() => {
    const handler = (e) => {
      setTrail((prev) => {
        const next = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]
        return next.slice(-14)
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // Parallax depth
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--c-black)] relative overflow-x-hidden">
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {/* Parallax background layers */}
      <img src={LAYER_IMG_1} alt="bg1" className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-10" style={{ transform: `translateY(${offset * 0.05}px)` }} />
      <img src={LAYER_IMG_2} alt="bg2" className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply" style={{ transform: `translateY(${offset * 0.1}px)` }} />
      <img src={LAYER_IMG_3} alt="bg3" className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" style={{ transform: `translateY(${offset * 0.15}px)` }} />

      {/* Halftone overlay */}
      <div className="fixed inset-0 halftone-yellow opacity-30"></div>

      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Avatar section={avatarSection} />

      {/* Cursor dots */}
      {trail.map((p, i) => (
        <div
          key={p.id}
          className="dot"
          style={{
            left: p.x + 'px',
            top: p.y + 'px',
            background: i % 3 === 0 ? 'rgba(0,188,212,0.8)' : i % 3 === 1 ? 'rgba(233,30,99,0.8)' : 'rgba(255,235,59,0.8)',
            boxShadow: '0 0 0 3px #000',
            transform: `translate(-50%,-50%) scale(${(i + 1) / trail.length})`,
          }}
        />
      ))}
    </div>
  )
}
