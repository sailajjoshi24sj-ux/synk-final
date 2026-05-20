"use client"

import { motion } from "framer-motion"
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"

const footerLinks = {
  services: [
    { label: "Web Development", href: "#" },
    { label: "Mobile Apps", href: "#" },
    { label: "AI Chatbots", href: "#" },
    { label: "Automation", href: "#" },
    { label: "UI/UX Design", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Linkedin,  href: "#", label: "LinkedIn"  },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github,    href: "#", label: "GitHub"    },
]

export function CinematicFooter() {
  return (
    <footer className="relative bg-white border-t border-gray-200">

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <span className="text-2xl font-bold text-black">Synk Corp</span>
            </Link>

            <p className="text-black/70 leading-relaxed mb-8 max-w-sm">
              Building intelligent digital experiences that transform businesses
              and delight users worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-black/70">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>info@synkcorp.com</span>
              </div>
              <div className="flex items-center gap-3 text-black/70">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>9851363489 / 9841602632</span>
              </div>
              <div className="flex items-center gap-3 text-black/70">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Baneshwor, Kathmandu</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-black mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black/60 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black/60 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black/60 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="text-black/50 text-sm">
              &copy; {new Date().getFullYear()} Synk Corp. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-black/60" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link href="#" className="text-black/50 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-black/50 hover:text-black transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
        style={{ background: "linear-gradient(135deg, #2563EB, #7c3aed)" }}
        aria-label="Scroll to top"
      >
        <ArrowUpRight className="w-5 h-5 text-white rotate-[-45deg]" />
      </motion.button>
    </footer>
  )
}
