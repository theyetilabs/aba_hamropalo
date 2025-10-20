"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ReverifyForm from "@/components/reverify-form"

export default function ReverifyPage() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1 bg-background">
        <ReverifyForm locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
