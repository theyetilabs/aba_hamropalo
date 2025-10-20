"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ConductPage from "@/components/conduct-page"

export default function Conduct() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1 bg-background">
        <ConductPage locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
