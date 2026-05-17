"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "AI Automations Built" },
  { value: 30, suffix: "+", label: "Mobile Apps Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
]

const technologies = [
  "Flutter",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
  "OpenAI",
  "Firebase",
  "AI Agents",
  "Automation",
  "TypeScript",
  "Python",
  "TailwindCSS",
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text">
      {count}
      {suffix}
    </span>
  )
}

export function TrustSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Marquee */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden py-4">
          <div className="animate-marquee flex gap-8 items-center">
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="flex-shrink-0 px-6 py-3 glass rounded-full"
              >
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-12"
      >
        <p className="text-sm text-muted-foreground">
          Trusted by startups and enterprises across{" "}
          <span className="text-foreground font-medium">Nepal</span>,{" "}
          <span className="text-foreground font-medium">USA</span>,{" "}
          <span className="text-foreground font-medium">UK</span>, and{" "}
          <span className="text-foreground font-medium">Australia</span>
        </p>
      </motion.div>
    </section>
  )
}
