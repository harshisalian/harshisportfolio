import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClass = ({ isActive }) => `px-4 py-2 rounded-md title-font text-xl tracking-wide border-4 border-black shadow-[4px_4px_0_0_#000] ${isActive ? 'bg-yellow-300 text-black' : 'bg-white text-black hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform'}`

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur panel">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--c-cyan)] border-4 border-black shadow-[4px_4px_0_0_#000] rounded-full" />
          <span className="title-font text-3xl text-black">RETROfolio</span>
        </Link>
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
