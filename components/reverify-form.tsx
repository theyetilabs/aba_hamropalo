"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ReverifyFormProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Re-verification Required",
    subtitle: "We found some discrepancies in your information. Please update your details.",
    reason: "Reason for Re-verification",
    reasonText: "Your verification did not match our records. Please provide updated information.",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g., Ram Bahadur Thapa",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+977 98...",
    address: "Address",
    addressPlaceholder: "e.g., Kathmandu, Nepal",
    explanation: "Explanation",
    explanationPlaceholder: "Please explain the discrepancies...",
    submit: "Resubmit Verification",
    submitting: "Resubmitting...",
    success: "Re-verification Submitted!",
    successMessage: "Your updated information has been submitted for review.",
    error: "Error",
    errorMessage: "Please fill in all required fields",
    backToHome: "Return Home",
  },
  ne: {
    title: "पुनः प्रमाणीकरण आवश्यक",
    subtitle: "हामीले आपनो जानकारीमा केही विसंगति पाएका छौं। कृपया आपनो विवरण अपडेट गर्नुहोस्।",
    reason: "पुनः प्रमाणीकरणको कारण",
    reasonText: "आपनो प्रमाणीकरण हाम्रो रेकर्डसँग मेल खाएन। कृपया अपडेट गरिएको जानकारी प्रदान गर्नुहोस्।",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "जस्तै, राम बहादुर थापा",
    email: "इमेल ठेगाना",
    emailPlaceholder: "you@example.com",
    phone: "फोन नम्बर",
    phonePlaceholder: "+977 98...",
    address: "ठेगाना",
    addressPlaceholder: "जस्तै, काठमाडौं, नेपाल",
    explanation: "व्याख्या",
    explanationPlaceholder: "कृपया विसंगति व्याख्या गर्नुहोस्...",
    submit: "पुनः प्रमाणीकरण जमा गर्नुहोस्",
    submitting: "पुनः जमा गरिँदै...",
    success: "पुनः प्रमाणीकरण जमा भयो!",
    successMessage: "आपनो अपडेट गरिएको जानकारी समीक्षाको लागि जमा भएको छ।",
    error: "त्रुटि",
    errorMessage: "कृपया सबै आवश्यक क्षेत्र भर्नुहोस्",
    backToHome: "गृहमा फर्कनुहोस्",
  },
}

export default function ReverifyForm({ locale }: ReverifyFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    explanation: "",
  })

  const t = content[locale]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.explanation) {
      toast({
        title: t.error,
        description: t.errorMessage,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate re-verification submission
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
      toast({
        title: t.success,
        description: t.successMessage,
      })
    }, 2000)
  }

  if (submitted) {
    return (
      <section className="py-20 md:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-accent">
            <CardContent className="pt-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-primary">{t.success}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.successMessage}</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/">{t.backToHome}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card>
          <CardContent className="pt-8">
            <Alert className="mb-6 border-accent/50 bg-accent/5">
              <AlertCircle className="h-4 w-4 text-accent" />
              <AlertDescription className="text-accent">{t.reasonText}</AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder={t.fullNamePlaceholder}
                  className="mt-2"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.emailPlaceholder}
                    className="mt-2"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.phonePlaceholder}
                    className="mt-2"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">{t.address}</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t.addressPlaceholder}
                  className="mt-2"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="explanation">{t.explanation}</Label>
                <textarea
                  id="explanation"
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleInputChange}
                  placeholder={t.explanationPlaceholder}
                  className="w-full border border-border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                  rows={5}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isLoading ? t.submitting : t.submit}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-6">
              <Link href="/" className="text-primary hover:underline">
                {t.backToHome}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
