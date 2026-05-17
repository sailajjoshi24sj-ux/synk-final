"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Global Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
]

const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "TensorFlow",
  "OpenAI", "AWS", "Vercel", "Prisma", "PostgreSQL", "MongoDB",
  "Flutter", "Swift", "Kotlin", "Docker", "Kubernetes", "GraphQL"
]

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    const duration = 2000

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, inView])

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function CinematicTrust() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const stats = statsRef.current

    if (!section || !stats) return

    const ctx = gsap.context(() => {
      // Animate top border-radius 28px → 0 as the section scrolls from
      // the bottom of the viewport up to the very top — gives the
      // "card docking onto the screen" feel (Apple Newsroom / iPhone pages)
      gsap.fromTo(
        section,
        { borderTopLeftRadius: "28px", borderTopRightRadius: "28px" },
        {
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",   // section enters from below
            end: "top top",        // section docked at viewport top
            scrub: true,
          },
        }
      )

      // Counter trigger
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => setInView(true),
      })

      // Stagger stat cards in
      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.3,
            },
            delay: i * 0.05,
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "oklch(0.97 0.008 250)",
        // Top shadow gives depth as the card slides over the hero
        boxShadow: "0 -16px 60px oklch(0.5 0.02 250 / 0.10), 0 -2px 0 oklch(0.88 0.01 250)",
        // Initial rounded top corners — GSAP animates these to 0
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Trusted by Innovators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the companies transforming their digital presence with cutting-edge AI solutions
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card glass rounded-2xl p-6 md:p-8 text-center depth-card"
            >
              <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-muted-foreground font-medium text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Marquee — full-width, outside container */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-secondary/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-secondary/80 to-transparent z-10 pointer-events-none" />

        {/* Two copies = seamless loop at translateX(-50%) */}
        <div className="marquee-track flex gap-4 md:gap-6 w-max">
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-full bg-card border border-border text-foreground font-medium whitespace-nowrap text-sm md:text-base"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
