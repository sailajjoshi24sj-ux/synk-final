"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Workflow, 
  MessageCircle, 
  Settings, 
  Layers, 
  Palette 
} from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "High-performance, responsive websites built with modern technologies and optimized for conversions.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that handles customer queries, captures leads, and provides 24/7 support.",
  },
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    description: "Smart automation systems that streamline your business processes and reduce manual work.",
  },
  {
    icon: MessageCircle,
    title: "DM Automation",
    description: "Instagram and Facebook DM automation that engages customers and converts conversations into sales.",
  },
  {
    icon: Settings,
    title: "Custom Business Systems",
    description: "Tailored software solutions designed specifically for your unique business requirements.",
  },
  {
    icon: Layers,
    title: "SaaS Development",
    description: "Scalable software-as-a-service platforms built for growth and recurring revenue.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that delight users and drive engagement.",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Premium Digital{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            From concept to deployment, we deliver end-to-end solutions that transform 
            your ideas into powerful digital products.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
                  {/* Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity gradient-border pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
