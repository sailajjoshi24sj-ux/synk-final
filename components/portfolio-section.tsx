"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"

const categories = ["All", "Websites", "Mobile Apps", "AI Systems", "Automation"]

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Websites",
    description: "A comprehensive financial analytics platform with real-time data visualization.",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    id: 2,
    title: "Healthcare App",
    category: "Mobile Apps",
    description: "Cross-platform mobile app for patient management and telemedicine.",
    image: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    tags: ["Flutter", "Firebase", "AI"],
  },
  {
    id: 3,
    title: "AI Customer Service Bot",
    category: "AI Systems",
    description: "Intelligent chatbot handling 10,000+ queries daily with 95% accuracy.",
    image: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    tags: ["OpenAI", "Node.js", "NLP"],
  },
  {
    id: 4,
    title: "E-commerce Automation",
    category: "Automation",
    description: "End-to-end automation suite for inventory and order management.",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    tags: ["Automation", "API", "Integration"],
  },
  {
    id: 5,
    title: "Real Estate Platform",
    category: "Websites",
    description: "Property listing and management system with virtual tour integration.",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    tags: ["Next.js", "Supabase", "Maps"],
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    category: "Mobile Apps",
    description: "Comprehensive fitness app with AI-powered workout recommendations.",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    tags: ["React Native", "AI", "Health"],
  },
]

export function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  )

  return (
    <section id="portfolio" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of our best work across different industries and technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative glass rounded-2xl overflow-hidden h-full">
                  {/* Image/Gradient */}
                  <div
                    className="h-48 relative overflow-hidden"
                    style={{ background: project.image }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold mt-2 mb-3 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium">
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
