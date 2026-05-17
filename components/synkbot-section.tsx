"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  MessageCircle, 
  Bot, 
  UserPlus, 
  Calendar, 
  HelpCircle, 
  Instagram, 
  Facebook,
  Zap,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: MessageCircle, label: "Auto Replies" },
  { icon: Bot, label: "AI Conversations" },
  { icon: UserPlus, label: "Lead Capture" },
  { icon: Calendar, label: "Appointment Booking" },
  { icon: HelpCircle, label: "FAQ Automation" },
  { icon: Instagram, label: "Instagram DM" },
  { icon: Facebook, label: "Facebook Messenger" },
  { icon: Zap, label: "Instant Response" },
]

const chatMessages = [
  { type: "user", text: "Hi! I'm interested in your services" },
  { type: "bot", text: "Hello! 👋 Thank you for reaching out to Synk Corp! I'd be happy to help you explore our services. What are you looking to build?", typing: false },
  { type: "user", text: "I need a mobile app for my business" },
  { type: "bot", text: "Great choice! 📱 We specialize in Flutter and React Native development. Would you like to schedule a free consultation to discuss your project?", typing: false },
]

export function SynkBotSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="synkbot" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Featured Product</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            Introducing{" "}
            <span className="gradient-text">Synk Bot</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg text-pretty">
            Automate Instagram and Facebook DMs using AI-powered conversations that help 
            businesses generate leads, answer customers instantly, and automate support.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative mx-auto w-[280px] sm:w-[320px]">
              {/* Phone Body */}
              <div className="relative glass rounded-[3rem] p-3 border border-border/50 shadow-2xl shadow-primary/20">
                {/* Screen */}
                <div className="bg-card rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-3 bg-secondary/50">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 rounded-sm bg-muted-foreground/50" />
                    </div>
                  </div>

                  {/* Chat Header */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Synk Bot</p>
                      <p className="text-xs text-green-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Online
                      </p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 h-[350px] overflow-y-auto">
                    {chatMessages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.3 }}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-md"
                              : "bg-secondary text-foreground rounded-bl-md"
                          }`}
                        >
                          {message.text}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.8 }}
                      className="flex justify-start"
                    >
                      <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full bg-muted-foreground/50"
                              style={{
                                animation: "pulse 1s infinite",
                                animationDelay: `${i * 0.2}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-4 top-1/4 glass px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span className="text-xs text-foreground">Connected</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -left-4 bottom-1/3 glass px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-foreground">Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Automate Your Customer Conversations
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Synk Bot transforms how you engage with customers on social media. 
              Never miss a lead again with 24/7 AI-powered responses that feel 
              genuinely human.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 glass rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{feature.label}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity group"
              >
                Get Synk Bot
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 bg-secondary/50 hover:bg-secondary text-foreground"
              >
                See Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
