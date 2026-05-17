"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches

    if (isMobile) {
      // Mobile: use 100 % native browser scroll.
      // Lenis registers { passive: false } touch listeners that prevent the
      // browser's default scroll gesture on iOS/Android, so the page appears
      // stuck. Native scroll avoids this entirely.
      // GSAP ScrollTrigger still works — it falls back to listening on the
      // native window "scroll" event automatically when Lenis is absent.
      ScrollTrigger.config({ ignoreMobileResize: true })
      setTimeout(() => ScrollTrigger.refresh(), 150)
      return
    }

    // ── Desktop only: Lenis smooth scroll ──────────────────────────────
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.0,
      wheelMultiplier: 0.85,
      infinite: false,
    })

    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.config({ ignoreMobileResize: true })
    setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return <>{children}</>
}
