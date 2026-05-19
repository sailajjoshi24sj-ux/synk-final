"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle, Bot, Zap, TrendingUp,
  Users, Clock, CheckCircle2, Sparkles,
} from "lucide-react"
import ScrollReveal from "./ui/scroll-reveal"

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: MessageCircle, title: "Instagram & Facebook DMs", description: "Automate responses across all social platforms instantly" },
  { icon: Bot,           title: "AI-Powered Replies",       description: "Smart conversations that feel human and convert leads"   },
  { icon: Zap,           title: "Instant Response",          description: "24/7 automated engagement, never miss a message"        },
  { icon: TrendingUp,    title: "Lead Generation",           description: "Convert conversations into qualified business leads"    },
]

const chatMessages = [
  { type: "user", text: "Hey! Saw your product — super interested 👀",                                  delay: 0    },
  { type: "bot",  text: "Hey! 👋 What caught your eye?",                                                delay: 450  },
  { type: "user", text: "The premium plan. What's included?",                                           delay: 950  },
  { type: "bot",  text: "Unlimited automation, custom AI & priority support. Want a demo? 🚀",          delay: 1500 },
]

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px] md:w-[320px]">
      <div className="relative bg-foreground/5 rounded-[3rem] p-3 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground/10 rounded-b-2xl" />
        <div className="bg-card rounded-[2.5rem] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-secondary/50">
            <span className="text-xs font-medium text-foreground">9:41</span>
            <div className="w-4 h-2 bg-foreground/60 rounded-sm" />
          </div>
          <div className="h-[400px] sm:h-[460px] md:h-[560px] overflow-hidden relative">
            {children}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-3xl scale-110 opacity-50" />
    </div>
  )
}

function ChatBubble({ type, text, isVisible }: { type: string; text: string; isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.93, x: type === "user" ? 16 : -16 }}
          animate={{ opacity: 1, y: 0,  scale: 1,    x: 0 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`flex ${type === "user" ? "justify-end" : "justify-start"} mb-3`}
        >
          {type === "bot" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
          <div
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              type === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-secondary text-foreground rounded-bl-md"
            }`}
          >
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function CinematicSynkBot() {
  const sectionRef     = useRef<HTMLElement>(null)
  const leftRef        = useRef<HTMLDivElement>(null)
  const phoneRef       = useRef<HTMLDivElement>(null)
  const benefitsRef    = useRef<HTMLElement>(null)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isInView, setIsInView]               = useState(false)
  const [messagesReady, setMessagesReady]     = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const left    = leftRef.current
    const phone   = phoneRef.current
    if (!section || !left || !phone) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      // ── Viewport detection ─────────────────────────────────────────
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=40%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onEnter:     () => setIsInView(true),
          onLeaveBack: () => { setIsInView(false); setVisibleMessages([]) },
        })
      } else {
        // On mobile, start messages immediately when phone enters — no wait for flip
        ScrollTrigger.create({
          trigger: phone,
          start: "top 80%",
          onEnter:     () => { setIsInView(true); setMessagesReady(true) },
          onLeaveBack: () => { setIsInView(false); setVisibleMessages([]) },
        })
      }

      // ── Phone entrance ─────────────────────────────────────────────
      if (isMobile) {
        // Simple fade-up on mobile — rotateY is heavy and can stay invisible
        // if the ScrollTrigger fires before the phone is in the right position
        gsap.set(phone, { opacity: 0, y: 30 })
        gsap.to(phone, {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phone,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })
      } else {
        // Desktop: 180° Y-axis flip with GPU promotion
        gsap.set(phone, {
          transformPerspective: 1100,
          rotateY: 180,
          opacity: 0,
          scale: 0.92,
          force3D: true,
          willChange: "transform, opacity",
        })
        gsap.to(phone, {
          rotateY: 0, opacity: 1, scale: 1,
          duration: 1.6,
          ease: "power3.inOut",
          force3D: true,
          onComplete: () => {
            gsap.set(phone, { willChange: "auto", clearProps: "willChange" })
            setMessagesReady(true)
          },
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            toggleActions: "play none none none",
          },
        })

        // Desktop phone parallax
        gsap.to(phone, {
          y: -70, ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        })

        // Desktop left content parallax
        gsap.to(left, {
          y: -28, ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        })
      }

      // ── Feature cards stagger ─────────────────────────────────────
      const featureCards = gsap.utils.toArray<HTMLElement>(".synkbot-feature")
      gsap.set(featureCards, { opacity: 0, x: -28 })
      gsap.to(featureCards, {
        opacity: 1, x: 0,
        duration: 0.52,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: left,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isInView || !messagesReady) return
    const timers = chatMessages.map((msg, index) =>
      setTimeout(() => setVisibleMessages((prev) => [...prev, index]), msg.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [isInView, messagesReady])

  // ── Benefits section dramatic scroll animations ──────────────────────
  useEffect(() => {
    const section = benefitsRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Eyebrow: lines extend outward, label fades in
      const eyebrowLabel = section.querySelector<HTMLElement>(".eyebrow-label")
      const eyebrowLeft  = section.querySelector<HTMLElement>(".eyebrow-line-left")
      const eyebrowRight = section.querySelector<HTMLElement>(".eyebrow-line-right")
      if (eyebrowLabel && eyebrowLeft && eyebrowRight) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: eyebrowLabel, start: "top 88%", toggleActions: "play none none none" },
        })
        tl.from(eyebrowLeft,  { scaleX: 0, transformOrigin: "right",  duration: 0.7, ease: "power3.out" })
          .from(eyebrowLabel, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out" }, "-=0.4")
          .from(eyebrowRight, { scaleX: 0, transformOrigin: "left",   duration: 0.7, ease: "power3.out" }, "-=0.6")
      }

      // Each numbered pillar
      const pillars = gsap.utils.toArray<HTMLElement>(".synk-pillar", section)
      pillars.forEach((pillar) => {
        const num  = pillar.querySelector<HTMLElement>(".pillar-num")
        const line = pillar.querySelector<HTMLElement>(".pillar-line")
        const text = pillar.querySelector<HTMLElement>(".pillar-text")
        if (!num || !line || !text) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pillar,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        })

        tl.to(pillar, { opacity: 1, duration: 0.01 })
          // Number: shrinks from oversized blur to sharp stamp
          .to(num, {
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "expo.out",
          })
          // Border draws down from top
          .to(line, {
            scaleY: 1,
            duration: 0.55,
            ease: "power3.inOut",
          }, "-=0.6")
          // Text slides in from the right
          .to(text, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          }, "-=0.45")
      })

      // Punch line: scale up from below
      const punchline = section.querySelector<HTMLElement>(".synk-punchline")
      if (punchline) {
        gsap.from(punchline, {
          scale: 0.82,
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: punchline, start: "top 82%", toggleActions: "play none none none" },
        })
      }

      // Background orbs parallax
      const orbLeft  = section.querySelector<HTMLElement>(".benefit-orb-left")
      const orbRight = section.querySelector<HTMLElement>(".benefit-orb-right")
      if (orbLeft) gsap.to(orbLeft,  { y: -80, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 2 } })
      if (orbRight) gsap.to(orbRight, { y: -50, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 3 } })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden py-16 lg:min-h-screen lg:flex lg:items-center"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        {/*
          Mobile layout (flex-col + CSS order):  heading(1) → phone(2) → features/stats(3)
          Desktop layout (lg:grid 2-col):        leftRef(order-1) | phone(order-2)
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Mobile-only heading (hidden on desktop, shown in leftRef instead) ── */}
          <motion.div
            className="lg:hidden order-1 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Featured Product
            </div>
            <h2 className="text-4xl font-bold mb-3 text-foreground">
              Meet <span className="gradient-text">Synk Bot</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The AI-powered automation system that transforms your social media
              presence into a 24/7 lead generation machine.
            </p>
          </motion.div>

          {/* ── Phone mockup — order 2 on mobile, right column on desktop ── */}
          <div ref={phoneRef} className="order-2 lg:order-2 flex justify-center">
            {/* Chat Header */}
            <PhoneMockup>
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Synk Bot</div>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-500"
                    />
                    <span className="text-xs text-muted-foreground">Online now</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1 overflow-y-auto h-[calc(100%-130px)]">
                {chatMessages.map((msg, index) => (
                  <ChatBubble
                    key={index}
                    type={msg.type}
                    text={msg.text}
                    isVisible={visibleMessages.includes(index)}
                  />
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-secondary">
                  <span className="text-sm text-muted-foreground">Type a message...</span>
                </div>
              </div>
            </PhoneMockup>
          </div>

          {/* ── Left content — order 3 on mobile, left column (order-1) on desktop ── */}
          <div ref={leftRef} className="order-3 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Desktop-only heading */}
              <div className="hidden lg:block">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                  <Sparkles className="w-4 h-4" />
                  Featured Product
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                  Meet <span className="gradient-text">Synk Bot</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  The AI-powered automation system that transforms your social media
                  presence into a 24/7 lead generation machine.
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 mt-8 lg:mt-0">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="synkbot-feature flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { icon: Users,        color: "green",  value: "50K+",  label: "Active Users"  },
                  { icon: Clock,        color: "blue",   value: "<1s",   label: "Response Time" },
                  { icon: CheckCircle2, color: "purple", value: "99.9%", label: "Uptime"        },
                ].map(({ icon: Icon, color, value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-${color}-500/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${color}-500`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{value}</div>
                      <div className="text-sm text-muted-foreground">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>

    {/* ── Benefits Reveal ──────────────────────────────────────────────── */}
    <section ref={benefitsRef} className="relative bg-gradient-to-b from-background to-secondary/20 py-16 lg:py-24 overflow-hidden">

      {/* Subtle top connector line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-border to-transparent pointer-events-none" />

      {/* Background glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="benefit-orb-left absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="benefit-orb-right absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Section eyebrow — lines animated outward by GSAP */}
        <div className="flex items-center gap-6 mb-20">
          <div className="eyebrow-line-left h-px flex-1 bg-gradient-to-r from-transparent via-border to-primary/30" />
          <span className="eyebrow-label text-xs font-bold tracking-[0.25em] uppercase text-primary/60 whitespace-nowrap px-2">
            The Synk Bot Difference
          </span>
          <div className="eyebrow-line-right h-px flex-1 bg-gradient-to-l from-transparent via-border to-primary/30" />
        </div>

        {/* Manifesto — large scroll-driven word reveal */}
        <div className="max-w-4xl mx-auto mb-16">
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            baseRotation={5}
            blurStrength={10}
            wordAnimationEnd="bottom 55%"
            textClassName="text-[clamp(1.85rem,4.8vw,3.8rem)] font-bold text-foreground leading-snug"
          >
            Every second your inbox sits unanswered is a sale walking out the door. Synk Bot steps in, replying instantly, qualifying automatically, converting relentlessly. Around the clock.
          </ScrollReveal>
        </div>

        {/* Three revelation pillars — GSAP scroll animations */}
        <div className="max-w-4xl mx-auto space-y-14 mb-14">
          {([
            {
              num: "01",
              text: "Businesses see a dramatic jump in qualified leads within the first week, without changing a single workflow.",
            },
            {
              num: "02",
              text: "Response time drops from hours to under one second. No lost prospects. No missed windows. Ever.",
            },
            {
              num: "03",
              text: "Handle ten thousand simultaneous conversations. Zero extra headcount. Zero overtime. Truly infinite scale.",
            },
          ] as const).map(({ num, text }) => (
            <div
              key={num}
              className="synk-pillar flex gap-6 lg:gap-14 items-start"
              style={{ opacity: 0 }}
            >
              {/* Oversized number — starts blurred & scaled up, stamps in */}
              <div className="flex-shrink-0 pt-1 w-14 lg:w-20">
                <span
                  className="pillar-num block text-5xl lg:text-7xl font-black leading-none select-none"
                  style={{
                    color: "oklch(0.55 0.25 260 / 0.32)",
                    transform: "scale(1.75)",
                    filter: "blur(14px)",
                    display: "block",
                  }}
                >
                  {num}
                </span>
              </div>

              {/* Text side — border draws, then text slides in */}
              <div className="flex-1 pl-6 relative">
                {/* Animated left border */}
                <div
                  className="pillar-line absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent"
                  style={{ transform: "scaleY(0)", transformOrigin: "top" }}
                />
                {/* Text */}
                <div
                  className="pillar-text"
                  style={{ opacity: 0, transform: "translateX(40px)" }}
                >
                  <p className="text-[clamp(1.15rem,2.4vw,1.9rem)] font-semibold text-foreground leading-snug">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final punch line */}
        <div className="synk-punchline text-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={false}
            baseRotation={-3}
            wordAnimationEnd="bottom 75%"
            containerClassName="inline-block"
            textClassName="text-[clamp(1.5rem,3.2vw,2.8rem)] font-bold gradient-text"
          >
            Not just automation. Your unfair advantage.
          </ScrollReveal>
        </div>

      </div>
    </section>
    </>
  )
}
