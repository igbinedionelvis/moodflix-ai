"use client"

import { motion } from "framer-motion"

const orbConfig = [
  {
    className:
      "left-[-12%] top-[8%] h-52 w-52 sm:h-72 sm:w-72 bg-fuchsia-500/25",
    duration: 11,
  },
  {
    className:
      "right-[-8%] top-[18%] h-44 w-44 sm:h-60 sm:w-60 bg-cyan-400/20",
    duration: 12.5,
  },
  {
    className:
      "bottom-[-12%] left-[28%] h-56 w-56 sm:h-80 sm:w-80 bg-indigo-500/20",
    duration: 13.2,
  },
]

export function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(109,40,217,0.2),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(15,23,42,0.4),transparent_40%)]" />
      {orbConfig.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{
            duration: orb.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
