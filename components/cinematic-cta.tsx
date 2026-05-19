"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  "Free initial consultation",
  "Custom solutions for your needs",
  "24/7 dedicated support",
  "Flexible engagement models",
]

const headlineWords = ["Let's", "Build", "Something", "Extraordinary"]

export function CinematicCTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const orbRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section  = sectionRef.current
    const headline = headlineRef.current
    const benefits = benefitsRef.current
    const orb      = orbRef.current
    if (!section || !headline || !benefits || !orb) return

    const ctx = gsap.context(() => {
      // ── Brief desktop pin ──────────────────────────────────────────
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=35%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        })
      }

      // ── Orb parallax ───────────────────────────────────────────────
      gsap.to(orb, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      })

      // ── Word-by-word headline reveal ───────────────────────────────
      const words = gsap.utils.toArray<HTMLElement>(".cta-word")
      gsap.set(words, { opacity: 0, y: 60, rotateX: -28 })
      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.72,
        ease: "back.out(1.4)",
        stagger: { amount: 0.55, from: "start" },
        scrollTrigger: {
          trigger: headline,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      })

      // ── Benefits stagger ───────────────────────────────────────────
      const items = gsap.utils.toArray<HTMLElement>(".cta-benefit")
      gsap.set(items, { opacity: 0, x: -24 })
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: benefits,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div
          ref={orbRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
                     bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full blur-3xl
                     pointer-events-none"
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Ready to Start?
            </span>
          </motion.div>

          {/* Headline — word-by-word GSAP reveal */}
          <div
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            style={{ perspective: "600px" }}
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="cta-word inline-block mr-[0.25em]">
                {word === "Extraordinary" ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  <span className="text-foreground">{word}</span>
                )}
              </span>
            ))}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your vision into reality with our expert team.
            From concept to launch, we&apos;re with you every step of the way.
          </motion.p>

          {/* Benefits */}
          <div ref={benefitsRef} className="flex flex-wrap justify-center gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="cta-benefit flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="bp"
              style={{ fontSize: "1.125rem", padding: "1rem 2.5rem" }}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </a>
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-7 text-lg rounded-full border-2 hover:bg-secondary"
            >
              Schedule a Call
            </Button>
          </motion.div>

          {/* Trust logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by industry leaders worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {["TechCorp", "InnovateLab", "FutureAI", "GlobalTech", "NextGen"].map((company) => (
                <span key={company} className="text-xl font-bold text-foreground">
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
