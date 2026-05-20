"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  title?: string
  highlightText?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  buttonClassName?: string
  maxWidth?: string
  veilOpacity?: string
  fontFamily?: string
  fontWeight?: number
}

export function HeroSection({
  title = "Intelligent AI Agents for",
  highlightText = "Smart Brands",
  description = "Transform your brand and evolve it through AI-driven brand guidelines and always up-to-date core components.",
  buttonText = "Join Waitlist",
  onButtonClick,
  colors = [
    "#1E1B4B",
    "#312E81",
    "#4C1D95",
    "#6D28D9",
    "#2563EB",
    "#38BDF8",
  ],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-black/25",
  fontFamily = "Satoshi, sans-serif",
  fontWeight = 500,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <section
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background ${className}`}
    >
      <div className="fixed inset-0 h-screen w-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
          </>
        )}
      </div>

      <div className={`relative z-10 mx-auto w-full px-6 ${maxWidth}`}>
        <div className="text-center">
          <h1
            className={`mb-6 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[1.1] ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {highlightText}
            </span>
          </h1>

          <p
            className={`mx-auto mb-10 max-w-2xl px-4 text-lg leading-relaxed text-white/80 sm:text-xl ${descriptionClassName}`}
          >
            {description}
          </p>

          <button
            onClick={onButtonClick}
            className={`rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:text-base ${buttonClassName}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Standalone background layer ──────────────────────────────────────────────
// Use this to put the mesh gradient behind the whole page without any content.
export function MeshBackground({
  colors = [
    "#1E1B4B",
    "#312E81",
    "#4C1D95",
    "#6D28D9",
    "#2563EB",
    "#38BDF8",
  ],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  veilOpacity = "bg-black/25",
}: Pick<HeroSectionProps, "colors" | "distortion" | "swirl" | "speed" | "offsetX" | "veilOpacity">) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <MeshGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={0}
        grainOverlay={0}
        speed={speed}
        offsetX={offsetX}
      />
      <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
    </div>
  )
}
