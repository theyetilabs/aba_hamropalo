"use client"

import { useState, use } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProposalDetail from "@/components/proposal-detail"

interface ProposalPageProps {
  params: Promise<{
    proposalId: string
  }>
}

export default function ProposalPage({ params }: ProposalPageProps) {
  const [locale, setLocale] = useState<"en" | "ne">("en")
  const { proposalId } = use(params)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1">
        <ProposalDetail locale={locale} proposalId={proposalId} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}