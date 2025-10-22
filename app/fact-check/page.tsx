"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FactCheckSystem from "@/components/fact-check-system"

interface PageProps {
  params: { locale?: string }
  searchParams: { 
    mode?: "enrollment" | "verification" | "reverify"
    readonly?: string
  }
}

export default function FactCheckPage({ params, searchParams }: PageProps) {
  const [locale, setLocale] = useState<"en" | "ne">((params.locale as "en" | "ne") || "en")
  const mode = searchParams.mode || "enrollment"
  const readonly = searchParams.readonly === "true"

  // Mock data for demonstration - in real app, this would come from API/database
  const mockUserData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+977-9841234567",
    profession: "Journalist",
    organization: "Nepal Media House",
    experience: "5",
    education: "Master's in Journalism from Tribhuvan University",
    certifications: ["Digital Journalism Certificate", "Fact-Checking Certification"],
    languages: ["English", "Nepali", "Hindi"],
    specializations: ["Politics", "Health", "Economics"],
    portfolioUrl: "https://johndoe-portfolio.com",
    sampleWork: "I have fact-checked over 200 political claims during the last election cycle, including verification of budget allocation statements and policy implementation claims.",
    previousExperience: "5 years of experience in investigative journalism with focus on political reporting and fact-checking. Previously worked with major news outlets in Nepal.",
    references: "Editor-in-Chief: Jane Smith (jane.smith@newsmedia.com, +977-9851234567)\nSenior Journalist: Ram Sharma (ram.sharma@newsportal.com, +977-9861234567)",
    verificationStatus: "verified" as const,
    enrollmentDate: "2024-01-15",
    verifiedDate: "2024-01-22",
    verifiedBadge: true,
    totalChecks: 156,
    accuracyRate: 94.2,
    averageResponseTime: 4.5,
    communityRating: 4.7
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation locale={locale} setLocale={setLocale} />
      <FactCheckSystem 
        locale={locale}
        mode={mode}
        initialData={mode === "verification" ? mockUserData : undefined}
        readonly={readonly}
      />
      <Footer locale={locale} />
    </div>
  )
}