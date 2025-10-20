"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ActivityLog from "@/components/activity-log"

export default function ActivityPage() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <ActivityLog locale={locale} />
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  )
}