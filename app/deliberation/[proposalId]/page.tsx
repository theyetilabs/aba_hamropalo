"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DeliberationWorkspace from "@/components/deliberation-workspace"

export default function DeliberationPage({ params }: { params: { proposalId: string } }) {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1 bg-background">
        <DeliberationWorkspace locale={locale} proposalId={params.proposalId} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
