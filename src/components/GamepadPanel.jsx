import React from 'react'

// Optional subtle texture from user-provided wallpaper
const TEXTURE_IMG = 'https://flamesimagestorage.blob.core.windows.net/files/5d47bdfe-c7e1-49fd-a8d0-5adb3fcb3a80_1768679286916_prj_71t2vehf/d65644aa-6edb-4b92-bd62-8cb0c732ab8e-wallpapers.jpg'

export default function GamepadPanel({ title = 'SEND SIGNAL', children, onPrimary }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Controller body */}
      <div className="relative bg-white comic-border rounded-[40px] p-6 md:p-8 overflow-hidden text-black">
        {/* Texture */}
        <div className="absolute inset-0 opacity-12" style={{ backgroundImage: `url(${TEXTURE_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        {/* Halftone overlay */}
        <div className="absolute inset-0 halftone-cyan opacity-20" />

        {/* Header label */}
        <div className="relative z-10 flex items-center gap-3 mb-4">
          <div className="title-font bg-yellow-300 text-black px-3 py-1 comic-border rotate-[-3deg]">{title}</div>
          <div className="pow">PING!</div>
        </div>

        {/* Handles */}
        <div className="absolute -left-10 bottom-6 w-24 h-24 bg-[var(--c-cyan)] rounded-full border-4 border-black shadow-[6px_6px_0_#000]" />
        <div className="absolute -right-10 bottom-6 w-24 h-24 bg-[var(--c-magenta)] rounded-full border-4 border-black shadow-[6px_6px_0_#000]" />

        {/* D-pad */}
        <div className="relative z-10 absolute left-6 md:left-10 top-1/2 -translate-y-1/2">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`w-6 h-6 md:w-8 md:h-8 ${i===1||i===3||i===5||i===7?'bg-black':'bg-transparent'} comic-border`} />
            ))}
          </div>
        </div>

        {/* ABXY buttons */}
        <div className="relative z-10 absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <button onClick={onPrimary} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--c-cyan)] comic-border title-font">A</button>
          <div className="flex gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-300 comic-border title-font flex items-center justify-center">B</div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--c-magenta)] comic-border title-font flex items-center justify-center">X</div>
          </div>
        </div>

        {/* Start/Select */}
        <div className="relative z-10 absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-3">
          <div className="w-16 h-6 bg-black comic-border" />
          <div className="w-16 h-6 bg-black comic-border" />
        </div>

        {/* Screen for content */}
        <div className="relative z-10 bg-white text-black comic-border rounded-2xl p-4 md:p-6 mt-2">
          {children}
        </div>
      </div>
    </div>
  )
}
