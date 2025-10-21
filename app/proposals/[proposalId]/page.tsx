"use client"

import { useState, use } from "react"
import ProposalDetail from "@/components/proposal-detail"

interface ProposalPageProps {
  params: Promise<{
    proposalId: string
  }>
}

export default function ProposalPage({ params }: ProposalPageProps) {
  const [locale] = useState<"en" | "ne">("en")
  const { proposalId } = use(params)

  return <ProposalDetail locale={locale} proposalId={proposalId} />
}