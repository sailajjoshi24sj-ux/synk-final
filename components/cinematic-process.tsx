"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Lightbulb, PenTool, Code, TestTube, Rocket, Headphones,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description: "Our designers craft stunning, user-centered interfaces with wireframes, prototypes, and visual designs you'll love.",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    description: "Expert engineers bring designs to life using cutting-edge technologies and best practices for scalable, maintainable code.",
  },
  {
    icon: TestTube,
    number: "04",
    title: "Testing",
    description: "Rigorous quality assurance ensures your product works flawlessly across all devices and edge cases.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Launch",
    description: "We deploy your solution with zero downtime, optimized performance, and comprehensive monitoring.",
  },
  {
    icon: Headphones,
    number: "06",
    title: "Support",
    description: "Ongoing maintenance, updates, and 24/7 support keep your digital products running at peak performance.",
  },
]

export function CinematicProcess() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section  = sectionRef.current
    const header   = headerRef.current
    const timeline = timelineRef.current
    if (!section || !header || !timeline) return

    const ctx = gsap.context(() => {
      // ── Card-arrival border-radius ────────────────────────────────
      gsap.fromTo(
        section,
        { borderTopLeftRadius: "28px", borderTopRightRadius: "28px" },
        {
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      )

      // ── Header entrance ───────────────────────────────────────────
      gsap.from(header, {
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      })

      const cards = gsap.utils.toArray<HTMLElement>(".process-step")
      const dots  = gsap.utils.toArray<HTMLElement>(".process-dot")

      // ── Pre-hide everything ────────────────────────────────────────
      gsap.set(cards, { opacity: 0, y: 55, scale: 0.93 })
      gsap.set(dots,  { scale: 0, opacity: 0 })
      gsap.set(".timeline-line", { scaleY: 0 })

      // ── Timeline line draws as the section scrolls through ────────
      gsap.to(".timeline-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 80%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      })

      // ── Each card reveals as it enters the viewport ───────────────
      // Individual triggers so every card fires right as it scrolls in —
      // no matter how tall the section is, every step becomes visible.
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })

        if (dots[i]) {
          gsap.to(dots[i], {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2.5)",
            delay: 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-background overflow-hidden"
      style={{
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
        boxShadow: "0 -16px 60px oklch(0.5 0.02 250 / 0.07), 0 -2px 0 oklch(0.88 0.01 250)",
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Our Process
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that transforms ideas into exceptional digital products
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary origin-top" />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step relative md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="glass rounded-2xl p-8 depth-card">
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-primary block">{step.number}</span>
                        <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="process-dot hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-card border-4 border-primary z-10" />

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
