"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import {
  Globe, Smartphone, Bot, Workflow,
  MessageSquare, Palette, Database, Cpu,
} from "lucide-react"
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack"

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon: Globe,         title: "Web Development",  description: "Premium websites and web applications built with cutting-edge technologies for optimal performance.", gradient: "from-blue-500/20 to-cyan-500/20",    iconColor: "text-blue-500"   },
  { icon: Smartphone,    title: "Mobile Apps",       description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",            gradient: "from-purple-500/20 to-pink-500/20",  iconColor: "text-purple-500" },
  { icon: Bot,           title: "AI Chatbots",       description: "Intelligent conversational AI that engages customers and automates support 24/7.",                   gradient: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-500"},
  { icon: Workflow,      title: "AI Workflows",      description: "Custom automation pipelines that streamline operations and boost productivity.",                     gradient: "from-orange-500/20 to-amber-500/20", iconColor: "text-orange-500" },
  { icon: MessageSquare, title: "DM Automation",     description: "Instagram and Facebook DM automation for lead generation and customer engagement.",                 gradient: "from-pink-500/20 to-rose-500/20",   iconColor: "text-pink-500"   },
  { icon: Palette,       title: "UI/UX Design",      description: "Beautiful, intuitive interfaces designed with user experience at the forefront.",                   gradient: "from-violet-500/20 to-indigo-500/20",iconColor: "text-violet-500" },
  { icon: Database,      title: "Backend Systems",   description: "Scalable, secure backend infrastructure that powers your digital products.",                        gradient: "from-cyan-500/20 to-blue-500/20",   iconColor: "text-cyan-500"   },
  { icon: Cpu,           title: "AI Integration",    description: "Seamlessly integrate AI capabilities into your existing systems and workflows.",                    gradient: "from-red-500/20 to-orange-500/20",  iconColor: "text-red-500"    },
]

export function CinematicServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header  = headerRef.current
    const grid    = gridRef.current
    const bg      = bgRef.current
    if (!section || !header || !grid || !bg) return

    const isMobile = window.innerWidth < 640
    const ctx = gsap.context(() => {
      // ── Parallax background ─────────────────────────────
      gsap.to(bg, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // ── Section header: clip-path reveal + slide ────────
      gsap.from(header, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      })

      // ── Service cards: cinematic stagger entrance (desktop only) ───
      if (isMobile) return
      const cards = gsap.utils.toArray<HTMLElement>(".service-card")
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.82, rotateX: 12 })

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.72,
        ease: "back.out(1.2)",
        stagger: {
          amount: 0.65,
          from: "start",
        },
        scrollTrigger: {
          trigger: grid,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // ── Subtle depth parallax on each card as page scrolls
      cards.forEach((card) => {
        gsap.to(card, {
          y: "-10",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        })
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-32"
      style={{ background: "oklch(0.985 0.005 250)" }}
    >
      {/* Background — clipped so it never bleeds on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, oklch(0.55 0.25 260 / 0.06) 0%, transparent 70%)," +
              "radial-gradient(ellipse 60% 50% at 80% 100%, oklch(0.6 0.2 200 / 0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end digital solutions powered by AI and modern technology
          </p>
        </div>

        {/* ── Mobile: ScrollStack stacking cards ────────────────────── */}
        <div className="sm:hidden -mx-4">
          <ScrollStack
            useWindowScroll
            itemDistance={55}
            itemScale={0.035}
            itemStackDistance={20}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.86}
          >
            {services.map((service, index) => (
              <ScrollStackItem key={index}>
                <div
                  className="bg-card rounded-2xl p-5 mx-4 relative overflow-hidden border border-border shadow-lg"
                  style={{ minHeight: "11rem" }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient}
                                flex items-center justify-center mb-4`}
                  >
                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-10 pointer-events-none`}
                  />
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* ── Desktop / tablet: 2-col → 4-col grid with GSAP stagger ── */}
        <div className="hidden sm:block" style={{ perspective: "1000px" }}>
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card relative group cursor-pointer"
                style={{ isolation: "isolate" }}
              >
                <div
                  className="glass rounded-2xl p-5 md:p-7 h-full relative overflow-hidden
                              transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.gradient}
                                flex items-center justify-center mb-5
                                group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`w-6 h-6 md:w-7 md:h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3
                                 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient}
                                 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
