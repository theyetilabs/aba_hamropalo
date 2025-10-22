"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CitizenshipVerification from "@/components/citizenship-verification"

interface PageProps {
  params: { locale?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function CitizenshipVerificationPage({ params }: PageProps) {
  const [locale, setLocale] = useState<"en" | "ne">((params.locale as "en" | "ne") || "en")

  return (
    <div className="min-h-screen bg-background">
      <Navigation locale={locale} setLocale={setLocale} />
      <CitizenshipVerification 
        locale={locale}
      />
      <Footer locale={locale} />
    </div>
  )
}