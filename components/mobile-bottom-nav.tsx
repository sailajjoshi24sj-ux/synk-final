"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Home, Layers, Bot, Users, MessageCircle } from "lucide-react"

const NAV_ITEMS = [
  { id: "home",     label: "Home",     Icon: Home,          sectionId: "hero-section" },
  { id: "services", label: "Services", Icon: Layers,        sectionId: "services"     },
  { id: "synkbot",  label: "Synk Bot", Icon: Bot,           sectionId: "synkbot"      },
  { id: "about",    label: "About",    Icon: Users,         sectionId: "process"      },
  { id: "contact",  label: "Contact",  Icon: MessageCircle, sectionId: "contact"      },
]

function scrollToSection(sectionId: string) {
  if (sectionId === "hero-section") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  const el = document.getElementById(sectionId)
  if (el) {
    // scrollIntoView respects scroll-margin-top (set in globals.css) so the
    // section header clears the fixed top navbar automatically
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

/** Return the nav-id of the deepest section whose top edge has crossed 50% vh. */
function getActiveSection(): string {
  // Using getBoundingClientRect().top because offsetTop is relative to
  // offsetParent (unreliable when ancestors have position:relative / transforms).
  // getBoundingClientRect() always gives the real viewport position.
  const HALF = window.innerHeight * 0.5
  let current = "home"

  for (const { id, sectionId } of NAV_ITEMS) {
    const el = document.getElementById(sectionId)
    if (!el) continue
    // If this section's top is still above the mid-point, it's the active one
    // (iterate top-to-bottom; last match wins → deepest visible section)
    if (el.getBoundingClientRect().top <= HALF) {
      current = id
    }
  }
  return current
}

export function MobileBottomNav() {
  const [active, setActive]   = useState("home")
  const [pressed, setPressed] = useState<string | null>(null)
  // After a tap we ignore scroll-driven updates for this many ms so the
  // manually chosen tab doesn't flicker back before the scroll settles
  const tappedAt = useRef(0)
  const COOLDOWN = 1200

  useEffect(() => {
    function onScroll() {
      if (Date.now() - tappedAt.current < COOLDOWN) return
      setActive(getActiveSection())
    }

    // Initial check after all sections have rendered + GSAP has settled
    const initTimer = setTimeout(() => setActive(getActiveSection()), 300)

    window.addEventListener("scroll", onScroll, { passive: true })
    // scrollend fires once the snap animation finishes — perfect for CSS scroll-snap
    window.addEventListener("scrollend", onScroll, { passive: true })

    return () => {
      clearTimeout(initTimer)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scrollend", onScroll)
    }
  }, [])

  const handleTap = useCallback((item: typeof NAV_ITEMS[0]) => {
    tappedAt.current = Date.now()
    setActive(item.id)
    setPressed(item.id)
    // Short visual press delay, then scroll
    setTimeout(() => {
      setPressed(null)
      scrollToSection(item.sectionId)
    }, 90)
  }, [])

  return (
    <motion.nav
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 300, damping: 34 }}
      aria-label="Primary navigation"
      className="fixed bottom-0 left-0 right-0 z-[200] block md:hidden"
      // Transparent area above the bar must NOT block scroll events
      style={{ pointerEvents: "none" }}
    >
      <div
        className="px-4"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
          pointerEvents: "auto",
        }}
      >
        {/* ── Frosted glass pill bar ─────────────────────────────── */}
        <div
          className="relative rounded-[28px] px-2 py-2"
          style={{
            background: "oklch(1 0 0 / 0.9)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid oklch(0.88 0.01 250 / 0.65)",
            boxShadow: [
              "0 -1px 0 oklch(0.94 0.01 250 / 0.6)",
              "0 8px 48px -4px oklch(0.4 0.08 260 / 0.18)",
              "0 2px 16px -2px oklch(0.4 0.06 260 / 0.1)",
              "inset 0 1px 0 oklch(1 0 0 / 0.9)",
            ].join(", "),
          }}
        >
          <div className="flex items-center justify-around">
            {NAV_ITEMS.map((item) => {
              const isActive  = active   === item.id
              const isPressed = pressed  === item.id
              const { Icon }  = item

              return (
                <button
                  key={item.id}
                  onClick={() => handleTap(item)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="relative flex flex-col items-center justify-center gap-[3px] rounded-[20px] select-none"
                  style={{
                    width: 60,
                    minHeight: 52,
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    outline: "none",
                  }}
                >
                  {/* Sliding pill indicator — layoutId lets Framer Motion
                      animate it from the old tab position to the new one */}
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0 rounded-[20px]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 520, damping: 40 }}
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.55 0.25 260 / 0.13), oklch(0.6 0.2 200 / 0.08))",
                      }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: isPressed ? 0.72 : isActive ? 1.12 : 1,
                      y: isActive ? -1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="relative"
                  >
                    <Icon
                      style={{
                        width: 22,
                        height: 22,
                        color: isActive ? "oklch(0.52 0.27 260)" : "oklch(0.58 0.01 250)",
                        strokeWidth: isActive ? 2.25 : 1.75,
                        filter: isActive
                          ? "drop-shadow(0 0 6px oklch(0.52 0.27 260 / 0.5))"
                          : "none",
                        transition: "color 0.22s ease, filter 0.22s ease",
                      }}
                    />
                    {/* Radial glow behind icon when active */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.28 }}
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle, oklch(0.55 0.25 260 / 0.22) 0%, transparent 70%)",
                          transform: "scale(2.4)",
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : 0.55,
                      scale:   isActive ? 1 : 0.9,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="relative text-[9.5px] leading-none tracking-tight block"
                    style={{
                      color:      isActive ? "oklch(0.52 0.27 260)" : "oklch(0.45 0.01 250)",
                      fontWeight: isActive ? 700 : 500,
                      transition: "color 0.22s ease",
                    }}
                  >
                    {item.label}
                  </motion.span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
