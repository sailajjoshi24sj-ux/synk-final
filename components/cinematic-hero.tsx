"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle2, Zap, Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

function AnimatedWords({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.22em]"
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        }).to(content, { opacity: 0, scale: 0.94, y: -28, ease: "power2.out", duration: 0.55 }, 0)
      } else {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=60%",
            scrub: 0.6,
          },
        }).to(content, { opacity: 0, y: -20, duration: 0.5 }, 0)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col"
      style={{ background: "transparent", zIndex: 1, overflow: "clip" }}
    >
      <div className="h-20 flex-shrink-0" />

      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-10">
          <div
            ref={contentRef}
            className="flex flex-col items-center text-center max-w-4xl mx-auto py-10 lg:py-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium text-white/90 tracking-wide">
                <motion.span
                  animate={{ rotate: [0, 18, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                AI-Powered Development Agency
              </div>
            </motion.div>

            {/* Headline */}
            <div className="mb-8 leading-[1.06]">
              <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold tracking-tight text-white">
                <span className="block">
                  <AnimatedWords text="Building" delay={0.2} />
                </span>
                <span className="block">
                  <AnimatedWords text="Intelligent" delay={0.32} className="text-black" />
                </span>
                <span className="block">
                  <AnimatedWords text="Digital Experiences" delay={0.46} />
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.78 }}
              className="text-lg md:text-xl text-white/75 leading-relaxed mb-14 max-w-xl"
            >
              We create websites, mobile apps, AI systems, and automation
              workflows that help businesses grow faster.
            </motion.p>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm"
            >
              {[
                { icon: CheckCircle2, label: "150+ Projects" },
                { icon: Users, label: "50+ Clients" },
                { icon: Zap, label: "24/7 Support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/60">
                  <Icon className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                  <span className="font-medium tracking-wide">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-cyan-300"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
