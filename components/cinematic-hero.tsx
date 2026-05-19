"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SyncBackground } from "@/components/sync-background"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Bot,
  CheckCircle2,
  Bell,
  Zap,
  Users,
  BarChart3,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// ─── Word-by-word animated headline ───────────────────────────────────────────
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

// ─── Mouse-parallax wrapper ────────────────────────────────────────────────────
function ParallaxCard({
  children,
  className,
  depth = 1,
  mouseX,
  mouseY,
  delay = 0,
}: {
  children: React.ReactNode
  className: string
  depth?: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  delay?: number
}) {
  const tx = useTransform(mouseX, [-1, 1], [-depth * 16, depth * 16])
  const ty = useTransform(mouseY, [-1, 1], [-depth * 11, depth * 11])
  const sx = useSpring(tx, { stiffness: 80, damping: 28 })
  const sy = useSpring(ty, { stiffness: 80, damping: 28 })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Magnetic CTA button ───────────────────────────────────────────────────────
function MagneticButton({
  label,
  primary = false,
}: {
  label: string
  primary?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 22 })
  const sy = useSpring(y, { stiffness: 220, damping: 22 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      {primary ? (
        <a href="#contact" className="bp">
          {label}
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <button className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground text-base font-semibold hover:bg-secondary hover:border-foreground/20 transition-all duration-300">
          {label}
        </button>
      )}
    </motion.div>
  )
}

// ─── Live chat card ────────────────────────────────────────────────────────────
const chatLines = [
  { type: "user", text: "I need a new website" },
  { type: "bot", text: "Let's build something incredible." },
]

function ChatCard({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const [visible, setVisible] = useState<number[]>([])

  useEffect(() => {
    const t0 = setTimeout(() => setVisible([0]), 1400)
    const t1 = setTimeout(() => setVisible([0, 1]), 3000)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
    }
  }, [])

  return (
    <ParallaxCard
      mouseX={mouseX}
      mouseY={mouseY}
      depth={1.6}
      delay={1.0}
      className="absolute -top-6 right-4 xl:right-0 w-[220px] xl:w-[250px] z-20"
    >
      <div className="glass rounded-2xl p-4 shadow-2xl border border-white/60">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground leading-tight">Synk Bot</div>
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green-500"
              />
              <span className="text-[10px] text-muted-foreground">Online now</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 min-h-[52px]">
          <AnimatePresence>
            {chatLines.map(
              (line, i) =>
                visible.includes(i) && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28 }}
                    className={`text-[11px] px-3 py-2 rounded-xl leading-snug max-w-[90%] ${
                      line.type === "user"
                        ? "bg-primary text-white ml-auto text-right"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {line.text}
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Typing dots while waiting for bot reply */}
          {visible.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-1 px-3 py-2 bg-secondary rounded-xl w-12"
            >
              {[0, 0.22, 0.44].map((d, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </ParallaxCard>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Mouse tracking for card parallax
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  // Apple-style scroll: hero stays pinned while next section slides over it
  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!section || !left || !right) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        // Pin hero WITHOUT adding a spacer — next section scrolls directly over it
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })

        // Scrub hero content out as the next section slides up
        // By progress 0.55 (55 vh scrolled), hero is fully invisible —
        // which is exactly when the trust section is halfway across
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        })
          .to(left,  { opacity: 0, scale: 0.94, y: -28, ease: "power2.out", duration: 0.55 }, 0)
          .to(right, { opacity: 0, scale: 0.96, y: -18, ease: "power2.out", duration: 0.55 }, 0.04)
      } else {
        // Mobile: simple quick fade, no pin (avoids heavy locked-scroll feel)
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=60%",
            scrub: 0.6,
          },
        })
          .to(left,  { opacity: 0, y: -20, duration: 0.5 }, 0)
          .to(right, { opacity: 0, y: -14, duration: 0.5 }, 0.04)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col"
      style={{
        background: "oklch(0.99 0.005 250)",
        zIndex: 1,
        // "clip" clips overflowing decorative elements exactly like "hidden"
        // but does NOT mark this element as a scroll container.
        // "hidden" + h-screen made iOS try (and fail) to scroll this section,
        // silently swallowing the user's swipe gesture before it reached window.
        overflow: "clip",
      }}
    >
      {/* ─── Background ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sync flow canvas — neural mesh */}
        <SyncBackground />

        {/* Primary radial glow — top right */}
        <div
          className="absolute -top-32 -right-32 w-[750px] h-[750px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.25 260 / 0.13) 0%, oklch(0.55 0.25 260 / 0.04) 50%, transparent 70%)",
          }}
        />
        {/* Secondary glow — bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[650px] h-[650px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.6 0.2 200 / 0.1) 0%, transparent 65%)",
          }}
        />
        {/* Centre ambient pulse */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.25 260 / 0.15) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.017]"
          style={{
            backgroundImage: `linear-gradient(rgba(80,80,160,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(80,80,160,0.6) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Navbar height spacer */}
      <div className="h-20 flex-shrink-0" />

      {/* ─── Main content ─────────────────────────────────── */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-10 lg:py-0 min-h-[calc(100vh-5rem)]">

            {/* ── Left: Text ──────────────────────────────── */}
            <div
              ref={leftRef}
              className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/15 bg-primary/5 text-sm font-medium text-primary">
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
              <div className="mb-6 leading-[1.07]">
                <h1 className="text-[clamp(2.4rem,6vw,5.2rem)] font-bold tracking-tight text-foreground">
                  <span className="block">
                    <AnimatedWords text="Building" delay={0.2} />
                  </span>
                  <span className="block">
                    <AnimatedWords
                      text="Intelligent"
                      delay={0.32}
                      className="gradient-text"
                    />
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
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-md lg:max-w-lg"
              >
                We create websites, mobile apps, AI systems, and automation
                workflows that help businesses grow faster.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.92 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <MagneticButton label="Start Your Project" primary />
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm"
              >
                {[
                  { icon: CheckCircle2, label: "150+ Projects" },
                  { icon: Users, label: "50+ Clients" },
                  { icon: Zap, label: "24/7 Support" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Floating card ecosystem ──────────── */}
            {/* Desktop */}
            <div ref={rightRef} className="relative h-[480px] xl:h-[520px] hidden lg:block">

              {/* === Main analytics dashboard === */}
              <ParallaxCard
                mouseX={mouseX}
                mouseY={mouseY}
                depth={0.55}
                delay={0.55}
                className="absolute top-10 left-0 right-0 mx-auto w-[350px] xl:w-[390px] z-10"
              >
                <div className="glass rounded-2xl p-5 shadow-2xl border border-white/65">
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium mb-0.5">Performance Overview</p>
                      <p className="text-base font-bold text-foreground">AI Dashboard</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Stat tiles */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {[
                      { label: "Revenue", value: "+47%", color: "text-emerald-600", bg: "bg-emerald-500/10" },
                      { label: "Leads", value: "234", color: "text-blue-600", bg: "bg-blue-500/10" },
                      { label: "Success", value: "98%", color: "text-primary", bg: "bg-primary/10" },
                    ].map(({ label, value, color, bg }) => (
                      <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
                        <p className={`text-base font-bold ${color}`}>{value}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <div className="flex items-end gap-[3px] h-11 mb-2">
                    {[38, 55, 42, 68, 50, 78, 62, 85, 72, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm origin-bottom"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.85 + i * 0.045,
                          ease: "backOut",
                        }}
                        style={{
                          height: `${h}%`,
                          background:
                            i === 9
                              ? "oklch(0.55 0.25 260)"
                              : `oklch(0.55 0.25 260 / ${0.22 + i * 0.075})`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Last 10 weeks · Powered by Synk AI</p>
                </div>
              </ParallaxCard>

              {/* === Live chat card === */}
              <ChatCard mouseX={mouseX} mouseY={mouseY} />

              {/* === Automation flow card === */}
              <ParallaxCard
                mouseX={mouseX}
                mouseY={mouseY}
                depth={0.9}
                delay={1.2}
                className="absolute bottom-4 left-2 w-[228px] z-10"
              >
                <div className="glass rounded-2xl p-4 shadow-xl border border-white/55">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">Automation Active</span>
                    <motion.div
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="ml-auto w-2 h-2 rounded-full bg-green-500"
                    />
                  </div>

                  {/* Flow nodes */}
                  <div className="flex items-center gap-1.5 mb-3">
                    {["Trigger", "AI", "CRM"].map((node, i) => (
                      <div key={node} className="flex items-center gap-1.5">
                        <div className="px-2.5 py-1 rounded-lg bg-secondary text-[10px] font-medium text-foreground">
                          {node}
                        </div>
                        {i < 2 && (
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.3 }}
                          >
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-muted-foreground">
                    <span className="text-primary font-semibold">143 messages</span> processed today
                  </p>
                </div>
              </ParallaxCard>

              {/* === New lead notification pill === */}
              <ParallaxCard
                mouseX={mouseX}
                mouseY={mouseY}
                depth={1.25}
                delay={1.45}
                className="absolute bottom-20 right-2 xl:right-0 w-[196px] z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="glass rounded-2xl px-4 py-3 shadow-lg border border-white/65 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground leading-tight">New Lead</p>
                      <p className="text-[10px] text-muted-foreground">from Instagram DM</p>
                    </div>
                  </div>
                </motion.div>
              </ParallaxCard>

              {/* === Floating stats badge === */}
              <ParallaxCard
                mouseX={mouseX}
                mouseY={mouseY}
                depth={1.05}
                delay={1.65}
                className="absolute top-0 right-6 xl:right-8 z-20"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="glass rounded-xl px-4 py-2.5 shadow-lg border border-white/60 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-[11px] font-bold text-foreground whitespace-nowrap">
                      98% Client Satisfaction
                    </span>
                  </div>
                </motion.div>
              </ParallaxCard>
            </div>

            {/* ── Mobile simplified card ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.9 }}
              className="hidden"
            >
              <div className="glass rounded-2xl p-5 shadow-xl border border-white/60">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-foreground">AI Dashboard</p>
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Projects", value: "150+" },
                    { label: "Clients", value: "50+" },
                    { label: "Success", value: "98%" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-secondary/60 rounded-xl p-3 text-center">
                      <p className="text-base font-bold text-primary">{value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-[3px] h-9">
                  {[38, 55, 42, 68, 50, 78, 62, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: `oklch(0.55 0.25 260 / ${0.3 + i * 0.09})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-wide text-muted-foreground uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border-2 border-muted-foreground/25 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
