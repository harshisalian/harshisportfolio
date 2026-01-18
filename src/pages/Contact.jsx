import { Instagram, Github } from 'lucide-react'
import GamepadPanel from '../components/GamepadPanel'

function LeetCodeIcon(props){
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 3 L6 11 L14 19" />
      <path d="M10 7 L17 7" />
      <path d="M10 17 L17 17" />
    </svg>
  )
}

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="caption mb-4">Distress Signal</div>
      <GamepadPanel title="COMMS PANEL">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="speech">Email: <a className="underline" href="mailto:harshisalian3003@gmail.com">harshisalian3003@gmail.com</a></div>
            <div className="speech">Phone: <a className="underline" href="tel:+919611495693">+91 9611495693</a></div>
          </div>
          <div className="title-font">Quick Links</div>
          <div className="grid grid-cols-3 gap-3">
            <a className="comic-btn flex items-center justify-center" href="https://instagram.com" target="_blank" aria-label="Instagram"><Instagram className="text-black"/></a>
            <a className="comic-btn flex items-center justify-center" href="https://leetcode.com" target="_blank" aria-label="LeetCode"><LeetCodeIcon className="text-black"/></a>
            <a className="comic-btn flex items-center justify-center" href="https://github.com/harshisalian" target="_blank" aria-label="GitHub"><Github className="text-black"/></a>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <a className="comic-btn text-center" href="/">Back to Base</a>
            <a className="comic-btn bg-yellow-300 text-center" href="/projects">View Missions</a>
          </div>
        </div>
      </GamepadPanel>
    </div>
  )
}
