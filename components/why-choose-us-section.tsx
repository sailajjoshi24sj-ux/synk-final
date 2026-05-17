"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Zap, 
  Brain, 
  Palette, 
  Scale, 
  Smartphone, 
  HeadphonesIcon 
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Fast Development",
    description: "Rapid prototyping and agile development cycles to get your product to market faster.",
  },
  {
    icon: Brain,
    title: "AI-Powered Solutions",
    description: "Cutting-edge artificial intelligence integrated into every solution we build.",
  },
  {
    icon: Palette,
    title: "Modern UI/UX",
    description: "Beautiful, intuitive interfaces designed with user experience as the priority.",
  },
  {
    icon: Scale,
    title: "Scalable Architecture",
    description: "Built from the ground up to handle growth and increased demand seamlessly.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Every solution is designed to work flawlessly across all devices and platforms.",
  },
  {
    icon: HeadphonesIcon,
    title: "Reliable Support",
    description: "Dedicated support team available to assist you at every step of your journey.",
  },
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Why Synk Corp
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Why Choose{" "}
            <span className="gradient-text">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            We combine technical excellence with creative innovation to deliver 
            solutions that exceed expectations.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isLarge = index === 0 || index === 3 // First and fourth items span 2 columns on large screens
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group ${isLarge ? "lg:col-span-1" : ""}`}
              >
                <div className="h-full glass rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground relative">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
