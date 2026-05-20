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
  const [scrolled, setScrolled]     = useState(false)
  const [activeHref, setActiveHref] = useState("")

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/5 border-b border-white/10"
          : ""
      }`}
    >
      <nav className="container mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px] md:h-[80px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <span className="text-white font-bold text-lg md:text-xl">S</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-white tracking-tight">Synk Corp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {navItems.map((item) => {
              const isActive = activeHref === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative text-[13px] font-semibold tracking-[0.04em] uppercase transition-colors duration-200 ${
                    isActive ? "text-black" : "text-black/70 hover:text-black"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-cyan-400"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="bp"
            style={{
              fontSize: "0.8125rem",
              padding: "0.625rem 1.5rem",
              letterSpacing: "0.03em",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Start Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
