"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechFlow Inc",
    content: "Synk Corp transformed our entire digital infrastructure. Their AI solutions increased our efficiency by 300% and the team was incredibly professional throughout the process.",
    rating: 5,
  },
  {
    name: "Michael Roberts",
    role: "Founder, RetailGenius",
    content: "The mobile app they built exceeded all expectations. User engagement increased dramatically, and the AI chatbot handles 80% of our customer inquiries automatically.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Marketing Director, GrowthLabs",
    content: "Their Instagram DM automation system generated over 500 qualified leads in the first month. The ROI has been incredible and the bot feels so natural.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CTO, FinanceHub",
    content: "Working with Synk Corp was a game-changer. They delivered a complex financial platform on time and on budget. Their technical expertise is unmatched.",
    rating: 5,
  },
]

export function CinematicTestimonials() {
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const quoteRef     = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection]       = useState(0)

  useEffect(() => {
    const section   = sectionRef.current
    const container = containerRef.current
    const quote     = quoteRef.current
    if (!section || !container || !quote) return

    const ctx = gsap.context(() => {
      // ── Card-arrival: top border-radius 28 → 0 as section docks ──
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

      // ── Brief pin while testimonial is front-and-centre ──────────
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=40%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        })
      }

      // ── Parallax background orbs ──────────────────────────────────
      gsap.to(".testimonial-orb-left", {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
      })
      gsap.to(".testimonial-orb-right", {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 2 },
      })

      // ── Testimonial container entrance ────────────────────────────
      gsap.from(container, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // ── Quote icon parallax ───────────────────────────────────────
      gsap.to(quote, {
        y: -30,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 2 },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const navigate = (dir: number) => {
    setDirection(dir)
    setCurrentIndex((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ?  280 : -280, opacity: 0, scale: 0.96 }),
    center:             () => ({ x: 0, opacity: 1, scale: 1 }),
    exit:   (d: number) => ({ x: d < 0 ?  280 : -280, opacity: 0, scale: 0.96 }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: "oklch(0.975 0.008 250)",
        boxShadow: "0 -16px 60px oklch(0.5 0.02 250 / 0.08), 0 -2px 0 oklch(0.88 0.01 250)",
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
      }}
    >
      {/* Parallax orbs */}
      <div className="testimonial-orb-left absolute top-1/4 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.25 260 / 0.07) 0%, transparent 70%)" }} />
      <div className="testimonial-orb-right absolute bottom-1/4 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.2 200 / 0.06) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Client <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what our partners say about working with us
          </p>
        </motion.div>

        {/* Carousel */}
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10
                         w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center
                         hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10
                         w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center
                         hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="glass rounded-3xl p-8 md:p-12"
                >
                  <div ref={quoteRef} className="inline-block">
                    <Quote className="w-12 h-12 text-primary/25 mb-6" />
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent
                                    flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
