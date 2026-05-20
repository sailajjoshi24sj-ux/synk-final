"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function LoadingScreen() {
  const [visible, setVisible]   = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState<"in" | "hold" | "out">("in")
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const FILL_DURATION = 2400   // ms to fill bar
    const HOLD_AFTER    = 180    // ms to hold at 100% before exit

    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const raw     = Math.min(elapsed / FILL_DURATION, 1)
      // cubic ease-out
      const eased   = 1 - Math.pow(1 - raw, 3)
      setProgress(eased * 100)

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPhase("hold")
        setTimeout(() => {
          setPhase("out")
          setTimeout(() => setVisible(false), 800)
        }, HOLD_AFTER)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center select-none"
          style={{
            zIndex: 9999,
            background: "linear-gradient(145deg, #06061a 0%, #120824 40%, #0d1640 100%)",
          }}
        >
          {/* ── ambient radial glows ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute pointer-events-none"
            style={{
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          {/* ── rotating gradient ring ── */}
          <div className="relative mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-3xl"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, #2563EB 30%, #7c3aed 60%, transparent 100%)",
                opacity: 0.55,
                filter: "blur(8px)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-3xl"
              style={{
                background:
                  "conic-gradient(from 180deg, transparent 0%, #7c3aed 25%, #38bdf8 55%, transparent 100%)",
                opacity: 0.3,
                filter: "blur(14px)",
              }}
            />

            {/* logo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-white rounded-2xl px-10 py-7 shadow-[0_8px_60px_rgba(37,99,235,0.35)]"
            >
              <Image
                src="/synk-logo.png"
                alt="Synk Corp"
                width={220}
                height={88}
                priority
              />
            </motion.div>
          </div>

          {/* ── tagline ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8 text-[11px] font-semibold tracking-[0.35em] uppercase text-white/30"
          >
            Building Intelligent Experiences
          </motion.p>

          {/* ── progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-52 md:w-72"
          >
            <div className="relative h-[2px] rounded-full overflow-hidden bg-white/8">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #2563EB, #7c3aed, #38bdf8)",
                  boxShadow: "0 0 12px rgba(124,58,237,0.8)",
                }}
              />
            </div>

            {/* percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-3 text-right text-[10px] font-mono text-white/25 tabular-nums"
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>

          {/* ── bottom corner dots ── */}
          <div className="absolute bottom-10 flex gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 1 ? "#7c3aed" : "#2563EB" }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
