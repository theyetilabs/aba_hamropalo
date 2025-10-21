"use client"

import { useState, Suspense } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LoginForm from "@/components/login-form"

function LoginFormWrapper({ locale }: { locale: "en" | "ne" }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
      <LoginForm locale={locale} />
    </Suspense>
  )
}

export default function LoginPage() {
  const [locale, setLocale] = useState<"en" | "ne">("en")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1">
        <LoginFormWrapper locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
