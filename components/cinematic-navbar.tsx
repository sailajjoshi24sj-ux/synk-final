"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Synk Bot", href: "#synkbot" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

function getActiveNav(): string {
  const HALF = window.innerHeight * 0.5
  let current = ""
  for (const item of navItems) {
    const id = item.href.replace("#", "")
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= HALF) current = item.href
  }
  return current
}

export function CinematicNavbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [activeHref, setActiveHref]   = useState("")

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
      setActiveHref(getActiveNav())
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — visible on all breakpoints */}
          <Link href="/" className="flex items-center gap-2.5 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg md:text-xl">S</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground">Synk Corp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeHref === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="bp" style={{ fontSize: "0.9rem", padding: "0.6rem 1.5rem" }}>
              Start Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile: "Start Project" pill — replaces hamburger; bottom nav handles navigation */}
          <a
            href="#contact"
            className="bp md:hidden"
            style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem", WebkitTapHighlightColor: "transparent" }}
          >
            Start Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
