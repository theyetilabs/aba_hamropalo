"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AddressVerification from "@/components/address-verification"

interface AddressVerificationPageProps {
  params: { locale?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function AddressVerificationPage({ 
  params, 
  searchParams 
}: AddressVerificationPageProps) {
  const [locale, setLocale] = useState<"en" | "ne">((params.locale as "en" | "ne") || "en")
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation locale={locale} setLocale={setLocale} />
      <AddressVerification locale={locale} />
      <Footer locale={locale} />
    </div>
  )
}