"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const categories = ["All", "Web", "Mobile", "AI", "Automation"]

const projects = [
  {
    title: "FinanceAI Dashboard",
    category: "Web",
    description: "AI-powered financial analytics platform with real-time insights",
    image: "from-blue-500/30 via-cyan-500/20 to-transparent",
    tags: ["Next.js", "Python", "OpenAI"],
  },
  {
    title: "HealthTrack Pro",
    category: "Mobile",
    description: "Cross-platform health monitoring app with AI diagnostics",
    image: "from-emerald-500/30 via-teal-500/20 to-transparent",
    tags: ["Flutter", "TensorFlow", "Firebase"],
  },
  {
    title: "RetailBot AI",
    category: "AI",
    description: "Conversational AI for e-commerce customer support",
    image: "from-purple-500/30 via-pink-500/20 to-transparent",
    tags: ["GPT-4", "Node.js", "MongoDB"],
  },
  {
    title: "LogiFlow System",
    category: "Automation",
    description: "End-to-end logistics automation with predictive routing",
    image: "from-orange-500/30 via-amber-500/20 to-transparent",
    tags: ["Python", "AWS", "PostgreSQL"],
  },
  {
    title: "EduLearn Platform",
    category: "Web",
    description: "AI-driven personalized learning management system",
    image: "from-indigo-500/30 via-violet-500/20 to-transparent",
    tags: ["React", "Django", "Redis"],
  },
  {
    title: "SmartHome Hub",
    category: "Mobile",
    description: "IoT control center with voice-activated AI assistant",
    image: "from-rose-500/30 via-red-500/20 to-transparent",
    tags: ["Swift", "Kotlin", "IoT"],
  },
]

export function CinematicPortfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid    = gridRef.current
    if (!section || !grid) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card")

      // All cards start invisible with a slight upward tilt
      gsap.set(cards, { opacity: 0, y: 60, rotateX: 10, scale: 0.92 })

      // Stagger reveal when grid enters viewport
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.1)",
        stagger: { amount: 0.55, from: "start" },
        scrollTrigger: {
          trigger: grid,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      })

      // Subtle upward parallax as page scrolls past
      cards.forEach((card) => {
        gsap.to(card, {
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-secondary/20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Our Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how we&apos;ve helped businesses transform their digital presence
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="portfolio-card group"
            >
              <div className="glass rounded-2xl overflow-hidden depth-card h-full">
                {/* Image placeholder with gradient */}
                <div className={`h-48 bg-gradient-to-br ${project.image} relative overflow-hidden`}>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="w-12 h-12 rounded-full bg-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </motion.div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-medium text-foreground">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-all duration-300">
            View All Projects
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
