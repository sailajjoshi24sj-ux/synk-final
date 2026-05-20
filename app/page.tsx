import { CinematicNavbar } from "@/components/cinematic-navbar"
import { CinematicHero } from "@/components/cinematic-hero"
import { CinematicTrust } from "@/components/cinematic-trust"
import { CinematicServices } from "@/components/cinematic-services"
import { CinematicSynkBot } from "@/components/cinematic-synkbot"
// import { CinematicPortfolio } from "@/components/cinematic-portfolio"
import { CinematicProcess } from "@/components/cinematic-process"
import { CinematicTestimonials } from "@/components/cinematic-testimonials"
import { CinematicCTA } from "@/components/cinematic-cta"
import { CinematicFooter } from "@/components/cinematic-footer"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { MeshBackground } from "@/components/hero-section"

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Animated mesh gradient fixed behind the entire page */}
      <MeshBackground />

      <CinematicNavbar />

      <main className="relative">
        {/* Hero pinned at z:1 — next sections slide over it on desktop */}
        <div id="hero-section">
          <CinematicHero />
        </div>

        {/* Remaining sections stack on top of hero on desktop */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <CinematicTrust />
          <section id="services">
            <CinematicServices />
          </section>
          <section id="synkbot">
            <CinematicSynkBot />
          </section>
          {/* <section id="work">
            <CinematicPortfolio />
          </section> */}
          <section id="process">
            <CinematicProcess />
          </section>
          <CinematicTestimonials />
          <section id="contact">
            <CinematicCTA />
          </section>
        </div>
      </main>

      <CinematicFooter />

      {/* Bottom spacer on mobile so footer content clears the fixed nav bar */}
      <div
        className="block md:hidden"
        style={{ height: "calc(72px + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      />

      {/* Mobile app-like bottom navigation — hidden on desktop */}
      <MobileBottomNav />
    </SmoothScrollProvider>
  )
}
