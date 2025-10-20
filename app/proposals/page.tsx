"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProposalManagementDashboard from "@/components/proposal-management-dashboard"

export default function ProposalsPage() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1">
        <ProposalManagementDashboard locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
