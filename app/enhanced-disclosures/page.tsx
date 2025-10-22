"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import EnhancedDisclosures from "@/components/enhanced-disclosures"

interface PageProps {
  params: { locale?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function EnhancedDisclosuresPage({ params, searchParams }: PageProps) {
  const [locale, setLocale] = useState<"en" | "ne">((params.locale as "en" | "ne") || "en")

  return (
    <div className="min-h-screen bg-background">
      <Navigation locale={locale} setLocale={setLocale} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <EnhancedDisclosures 
          locale={locale}
          onDisclosureChange={(disclosures) => {
            console.log("Disclosure data updated:", disclosures)
            // Here you would typically save to your backend
          }}
        />
      </div>
      <Footer locale={locale} />
    </div>
  )
}