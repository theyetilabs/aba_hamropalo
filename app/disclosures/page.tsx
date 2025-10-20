"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DisclosuresPageComponent from "@/components/disclosures-page"

export default function DisclosuresPage() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1 bg-background">
        <DisclosuresPageComponent locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
