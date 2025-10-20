"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface RegistrationFormProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Join AbaHamroPalo",
    subtitle: "Become part of Nepal's democratic regeneration movement",
    step1: "Personal Information",
    step2: "Interests & Circles",
    step3: "Confirm & Join",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    district: "District",
    selectDistrict: "Select your district",
    interests: "Areas of Interest",
    selectInterests: "What areas interest you?",
    governance: "Governance & Policy",
    environment: "Environment & Sustainability",
    education: "Education & Youth",
    health: "Health & Wellbeing",
    economy: "Economic Development",
    culture: "Culture & Heritage",
    agreeTerms: "I agree to the",
    termsLink: "Terms of Service",
    andText: "and",
    codeOfConduct: "Code of Conduct",
    agreeText: "",
    agreeNewsletter: "I'd like to receive updates about AbaHamroPalo",
    previous: "Previous",
    next: "Next",
    submit: "Join Now",
    success: "Welcome to AbaHamroPalo!",
    successMessage: "Your registration is complete. You can now explore circles and participate in discussions.",
  },
  ne: {
    title: "अबा हाम्रो पालोमा सामेल हुनुहोस्",
    subtitle: "नेपालको लोकतान्त्रिक पुनर्जन्म आन्दोलनको भाग बन्नुहोस्",
    step1: "व्यक्तिगत जानकारी",
    step2: "रुचि र सर्कलहरु",
    step3: "पुष्टि गर्नुहोस् र सामेल हुनुहोस्",
    firstName: "पहिलो नाम",
    lastName: "अन्तिम नाम",
    email: "इमेल ठेगाना",
    phone: "फोन नम्बर",
    district: "जिल्ला",
    selectDistrict: "आपनो जिल्ला चयन गर्नुहोस्",
    interests: "रुचिको क्षेत्र",
    selectInterests: "कुन क्षेत्रहरु तपाईलाई रुचि छ?",
    governance: "शासन र नीति",
    environment: "वातावरण र स्थिरता",
    education: "शिक्षा र युवा",
    health: "स्वास्थ्य र कल्याण",
    economy: "आर्थिक विकास",
    culture: "संस्कृति र विरासत",
    agreeTerms: "मैले",
    termsLink: "सेवा शर्त",
    andText: "र",
    codeOfConduct: "आचरण संहिता",
    agreeText: "सहमत गर्छु",
    agreeNewsletter: "मैले अबा हाम्रो पालोको अपडेट पाउन चाहन्छु",
    previous: "अघिल्लो",
    next: "अगाडि",
    submit: "अब सामेल हुनुहोस्",
    success: "अबा हाम्रो पालोमा स्वागतम!",
    successMessage: "आपनो दर्ता पूरा भयो। अब तपाईं सर्कलहरू अन्वेषण गर्न र छलफलमा भाग लिन सक्नुहुन्छ।",
  },
}

const nepaliDistricts = [
  "काठमाडौं",
  "भक्तपुर",
  "ललितपुर",
  "धनुसा",
  "महोत्तरी",
  "सर्लाही",
  "रौतहट",
  "बारा",
  "पर्सा",
  "जनकपुर",
  "सिंधुली",
  "दोलखा",
  "सिन्धुपाल्चोक",
  "काभ्रेपलाञ्चोक",
  "नुवाकोट",
  "रसुवा",
  "धादिङ",
  "मकवानपुर",
  "चितवन",
  "तनहुँ",
  "लमजुङ",
  "गोरखा",
  "मनाङ",
  "मुस्ताङ",
  "पर्वत",
  "स्याङ्जा",
  "कास्की",
  "पाल्पा",
  "बागलुङ",
  "गुल्मी",
  "अर्घाखाँची",
  "धनकुटा",
  "तेहथुम",
  "भोजपुर",
  "सङ्खुवासभा",
  "ओखलढुङ्गा",
  "कोसी",
  "सुनसरी",
  "मोरङ",
  "झापा",
  "इलाम",
  "पञ्चथर",
  "तापलेजुङ",
  "भारतपुर",
  "रामेछाप",
  "दोलखा",
  "सोलुखुम्बु",
  "उदयपुर",
  "चितवन",
  "नवलपरासी",
  "बर्दिबास",
  "रुपन्देही",
  "कपिलवस्तु",
  "अरुण",
  "पञ्चकोट",
  "सप्तरी",
  "सिरहा",
  "दक्षिण गोल्फ",
  "बाजुरा",
  "बज्हाङ",
  "अछाम",
  "डोटी",
  "बैतडी",
  "दार्चुला",
  "कैलाली",
  "कञ्चनपुर",
  "सुदूरपश्चिम",
]

export default function RegistrationForm({ locale }: RegistrationFormProps) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    district: "",
    interests: [] as string[],
    agreeTerms: false,
    agreeNewsletter: false,
  })

  const t = content[locale]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, district: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleCheckboxChange = (field: "agreeTerms" | "agreeNewsletter") => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.district) {
        toast({
          title: locale === "en" ? "Missing Information" : "जानकारी हराएको",
          description: locale === "en" ? "Please fill in all fields" : "कृपया सबै क्षेत्र भर्नुहोस्",
          variant: "destructive",
        })
        return
      }
    }
    if (step === 2) {
      if (formData.interests.length === 0) {
        toast({
          title: locale === "en" ? "Select Interests" : "रुचि चयन गर्नुहोस्",
          description:
            locale === "en" ? "Please select at least one area of interest" : "कृपया कम्तिमा एक रुचिको क्षेत्र चयन गर्नुहोस्",
          variant: "destructive",
        })
        return
      }
    }
    setStep(step + 1)
  }

  const handleSubmit = () => {
    if (!formData.agreeTerms) {
      toast({
        title: locale === "en" ? "Accept Terms" : "शर्त स्वीकार गर्नुहोस्",
        description: locale === "en" ? "Please agree to the terms and conditions" : "कृपया शर्त र शर्तहरु स्वीकार गर्नुहोस्",
        variant: "destructive",
      })
      return
    }

    // Simulate form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    toast({
      title: t.success,
      description: t.successMessage,
    })
  }

  if (submitted) {
    return (
      <section className="py-20 md:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-accent">
            <CardContent className="pt-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-primary">{t.success}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.successMessage}</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="/">{locale === "en" ? "Return Home" : "गृहमा फर्कनुहोस्"}</a>
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

        {/* Progress Indicator */}
        <div className="mb-8 flex gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
              <p className="text-sm mt-2 text-muted-foreground">
                {s === 1 && t.step1}
                {s === 2 && t.step2}
                {s === 3 && t.step3}
              </p>
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="pt-8">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t.firstName}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={locale === "en" ? "Madan" : "मदन"}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t.lastName}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={locale === "en" ? "Poudel" : "पौडेल"}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="madan@example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+977 98..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="district">{t.district}</Label>
                  <Select value={formData.district} onValueChange={handleSelectChange}>
                    <SelectTrigger id="district" className="mt-2">
                      <SelectValue placeholder={t.selectDistrict} />
                    </SelectTrigger>
                    <SelectContent>
                      {nepaliDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Interests & Circles */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">{t.interests}</Label>
                  <p className="text-sm text-muted-foreground mb-4">{t.selectInterests}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: "governance", label: t.governance },
                      { key: "environment", label: t.environment },
                      { key: "education", label: t.education },
                      { key: "health", label: t.health },
                      { key: "economy", label: t.economy },
                      { key: "culture", label: t.culture },
                    ].map((interest) => (
                      <div key={interest.key} className="flex items-center gap-3">
                        <Checkbox
                          id={interest.key}
                          checked={formData.interests.includes(interest.key)}
                          onCheckedChange={() => handleInterestToggle(interest.key)}
                        />
                        <Label htmlFor={interest.key} className="cursor-pointer font-normal">
                          {interest.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirm & Join */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">
                    {locale === "en" ? "Review Your Information" : "आपनो जानकारी समीक्षा गर्नुहोस्"}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <span className="font-medium">{locale === "en" ? "Name:" : "नाम:"}</span> {formData.firstName}{" "}
                      {formData.lastName}
                    </p>
                    <p>
                      <span className="font-medium">{locale === "en" ? "Email:" : "इमेल:"}</span> {formData.email}
                    </p>
                    <p>
                      <span className="font-medium">{locale === "en" ? "Phone:" : "फोन:"}</span> {formData.phone}
                    </p>
                    <p>
                      <span className="font-medium">{locale === "en" ? "District:" : "जिल्ला:"}</span>{" "}
                      {formData.district}
                    </p>
                    <p>
                      <span className="font-medium">{locale === "en" ? "Interests:" : "रुचिहरु:"}</span>{" "}
                      {formData.interests.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={() => handleCheckboxChange("agreeTerms")}
                    />
                    <Label htmlFor="agreeTerms" className="cursor-pointer font-normal text-sm">
                      {t.agreeTerms}{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        {t.termsLink}
                      </Link>
                      {" "}{t.andText}{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        {t.codeOfConduct}
                      </Link>
                      {locale === "ne" && ` ${t.agreeText}`}
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeNewsletter"
                      checked={formData.agreeNewsletter}
                      onCheckedChange={() => handleCheckboxChange("agreeNewsletter")}
                    />
                    <Label htmlFor="agreeNewsletter" className="cursor-pointer font-normal text-sm">
                      {t.agreeNewsletter}
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-border">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  {t.previous}
                </Button>
              )}
              {step < 3 && (
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                  {t.next}
                </Button>
              )}
              {step === 3 && (
                <Button onClick={handleSubmit} className="flex-1 bg-accent hover:bg-accent/90">
                  {t.submit}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
