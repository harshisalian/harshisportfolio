import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); onDone?.() }, 1200)
    return () => clearTimeout(t)
  }, [onDone])

  if (!show) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--c-black)] text-white">
      <div className="relative flex flex-col items-center">
        <div className="w-28 h-28 rounded-full border-[6px] border-yellow-300 border-t-[6px] border-t-[var(--c-magenta)] animate-spin shadow-[6px_6px_0_#000]"></div>
        <div className="mt-5 title-font text-2xl bg-white text-black comic-border px-4 py-2 rotate-[-3deg]">LOADING MISSION...</div>
        <div className="absolute -top-3 -right-8 title-font text-white bg-[var(--c-cyan)] comic-border px-2 rotate-[8deg]">TURNING PAGES</div>
      </div>
    </div>
  )
}
