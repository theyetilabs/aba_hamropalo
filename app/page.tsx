"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import CommunityImpact from "@/components/community-impact"
import DemocraticProcess from "@/components/democratic-process"
import FeaturesSection from "@/components/features-section"
import Footer from "@/components/footer"

export default function Home() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1">
        <HeroSection locale={locale} />
        <CommunityImpact locale={locale} />
        <DemocraticProcess locale={locale} />
        <FeaturesSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
