"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Search, 
  FileText, 
  Palette, 
  Code, 
  TestTube, 
  Rocket 
} from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description: "We dive deep into understanding your business, goals, and challenges to create the perfect strategy.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Planning",
    description: "Detailed project roadmap with milestones, timelines, and clear deliverables for complete transparency.",
  },
  {
    icon: Palette,
    number: "03",
    title: "Design",
    description: "Creating stunning, user-centric designs that capture your brand and delight your users.",
  },
  {
    icon: Code,
    number: "04",
    title: "Development",
    description: "Building your solution with clean, scalable code using the latest technologies and best practices.",
  },
  {
    icon: TestTube,
    number: "05",
    title: "Testing",
    description: "Rigorous quality assurance to ensure your product is bug-free and performs flawlessly.",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Launch",
    description: "Smooth deployment and ongoing support to ensure your success from day one.",
  },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            How We{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A proven methodology that ensures consistent, high-quality results for every project.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="glass rounded-2xl p-8 h-full relative group hover:scale-[1.02] transition-transform">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-2 text-6xl font-bold text-primary/10 select-none">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 z-10">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity gradient-border pointer-events-none" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
