"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProposalSubmissionForm from "@/components/proposal-submission-form"

export default function SubmitProposalPage() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1">
        <ProposalSubmissionForm locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
