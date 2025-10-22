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
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import EnhancedDisclosures from "@/components/enhanced-disclosures"

interface VerificationFormProps {
  locale: "en" | "ne"
}

interface Allegation {
  id: string
  type: string
  description: string
  status: string
  date: string
  documents: File[]
}

interface PortfolioItem {
  id: string
  type: string
  organization: string
  position: string
  startDate: string
  endDate?: string
  description: string
  isActive: boolean
}

interface FinancialInterest {
  id: string
  type: string
  entity: string
  value: string
  percentage?: string
  description: string
  isConflict: boolean
}

interface DisclosureData {
  allegations: Allegation[]
  portfolio: PortfolioItem[]
  financialInterests: FinancialInterest[]
  hasNoDisclosures: boolean
  additionalNotes: string
}

const content = {
  en: {
    title: "Verify Your Identity",
    subtitle: "Complete verification to access full platform features",
    step1: "Address Verification",
    step2: "Citizenship Status",
    step3: "KYC Details",
    step4: "Review & Submit",
    address: "Address",
    addressPlaceholder: "e.g., Kathmandu, Nepal",
    citizenship: "Citizenship Status",
    selectCitizenship: "Select your status",
    citizen: "Citizen",
    resident: "Resident",
    diaspora: "Diaspora",
    dateOfBirth: "Date of Birth",
    idType: "ID Type",
    selectIdType: "Select ID type",
    passport: "Passport",
    citizenship_card: "Citizenship Card",
    license: "Driver's License",
    idNumber: "ID Number",
    idNumberPlaceholder: "Enter your ID number",
    uploadId: "Upload ID Document",
    uploadIdHint: "PDF or image (max 5MB)",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g., Ram Bahadur Thapa",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+977 98...",
    occupation: "Occupation",
    occupationPlaceholder: "e.g., Software Engineer",
    disclosures: "Any Disclosures?",
    disclosuresHint: "Mention any allegations, portfolio, or financial interests",
    disclosuresPlaceholder: "Enter any relevant disclosures...",
    agreeTerms: "I agree to the verification terms and conditions",
    previous: "Previous",
    next: "Next",
    submit: "Submit Verification",
    verifying: "Verifying...",
    success: "Verification Submitted!",
    successMessage: "Your verification is under review. You'll receive an email once approved.",
    error: "Verification Error",
    errorMessage: "Please fill in all required fields",
    citizenshipTooltip: "Verify your status to access full platform features",
    idTooltip: "Upload a clear copy of your government-issued ID",
    verificationBadge: "Verified Badge",
    badgeDescription: "You will receive a verified badge once approved",
  },
  ne: {
    title: "आपनो पहिचान प्रमाणित गर्नुहोस्",
    subtitle: "पूर्ण प्ल्याटफर्म सुविधाहरु पहुँच गर्न प्रमाणीकरण पूरा गर्नुहोस्",
    step1: "ठेगाना प्रमाणीकरण",
    step2: "नागरिकता स्थिति",
    step3: "KYC विवरण",
    step4: "समीक्षा र जमा गर्नुहोस्",
    address: "ठेगाना",
    addressPlaceholder: "जस्तै, काठमाडौं, नेपाल",
    citizenship: "नागरिकता स्थिति",
    selectCitizenship: "आपनो स्थिति चयन गर्नुहोस्",
    citizen: "नागरिक",
    resident: "बासिन्दा",
    diaspora: "प्रवासी",
    dateOfBirth: "जन्म मिति",
    idType: "पहिचान प्रकार",
    selectIdType: "पहिचान प्रकार चयन गर्नुहोस्",
    passport: "पासपोर्ट",
    citizenship_card: "नागरिकता कार्ड",
    license: "ड्राइभिङ लाइसेन्स",
    idNumber: "पहिचान नम्बर",
    idNumberPlaceholder: "आपनो पहिचान नम्बर प्रविष्ट गर्नुहोस्",
    uploadId: "पहिचान कागजात अपलोड गर्नुहोस्",
    uploadIdHint: "PDF वा छवि (अधिकतम 5MB)",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "जस्तै, राम बहादुर थापा",
    email: "इमेल ठेगाना",
    emailPlaceholder: "you@example.com",
    phone: "फोन नम्बर",
    phonePlaceholder: "+977 98...",
    occupation: "पेशा",
    occupationPlaceholder: "जस्तै, सफ्टवेयर इञ्जिनियर",
    disclosures: "कुनै प्रकटीकरण?",
    disclosuresHint: "कुनै आरोप, पोर्टफोलियो, वा आर्थिक हित उल्लेख गर्नुहोस्",
    disclosuresPlaceholder: "कुनै प्रासंगिक प्रकटीकरण प्रविष्ट गर्नुहोस्...",
    agreeTerms: "मैले प्रमाणीकरण शर्त र शर्तहरु सहमत गर्छु",
    previous: "अघिल्लो",
    next: "अगाडि",
    submit: "प्रमाणीकरण जमा गर्नुहोस्",
    verifying: "प्रमाणित गरिँदै...",
    success: "प्रमाणीकरण जमा भयो!",
    successMessage: "आपनो प्रमाणीकरण समीक्षा अन्तर्गत छ। अनुमोदन भएपछी तपाईले इमेल पाउनुहुनेछ।",
    error: "प्रमाणीकरण त्रुटि",
    errorMessage: "कृपया सबै आवश्यक क्षेत्र भर्नुहोस्",
    citizenshipTooltip: "पूर्ण प्ल्याटफर्म सुविधाहरु पहुँच गर्न आपनो स्थिति प्रमाणित गर्नुहोस्",
    idTooltip: "आपनो सरकारी पहिचान कार्डको स्पष्ट प्रति अपलोड गर्नुहोस्",
    verificationBadge: "प्रमाणित ब्याज",
    badgeDescription: "अनुमोदन भएपछी तपाईले प्रमाणित ब्याज पाउनुहुनेछ",
  },
}

export default function VerificationForm({ locale }: VerificationFormProps) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<{
    address: string
    citizenship: string
    dateOfBirth: string
    idType: string
    idNumber: string
    idFile: File | null
    fullName: string
    email: string
    phone: string
    occupation: string
    disclosures: DisclosureData
    agreeTerms: boolean
  }>({
    address: "",
    citizenship: "",
    dateOfBirth: "",
    idType: "",
    idNumber: "",
    idFile: null,
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    disclosures: {
      allegations: [],
      portfolio: [],
      financialInterests: [],
      hasNoDisclosures: false,
      additionalNotes: ""
    },
    agreeTerms: false,
  })

  const t = content[locale]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: locale === "en" ? "File Too Large" : "फाइल धेरै ठूलो",
          description: locale === "en" ? "Maximum file size is 5MB" : "अधिकतम फाइल आकार 5MB छ",
          variant: "destructive",
        })
        return
      }
      setFormData((prev) => ({ ...prev, idFile: file }))
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.address || !formData.citizenship || !formData.dateOfBirth) {
        toast({
          title: t.error,
          description: t.errorMessage,
          variant: "destructive",
        })
        return
      }
    }
    if (step === 2) {
      if (!formData.idType || !formData.idNumber || !formData.idFile) {
        toast({
          title: t.error,
          description: t.errorMessage,
          variant: "destructive",
        })
        return
      }
    }
    if (step === 3) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: t.error,
          description: t.errorMessage,
          variant: "destructive",
        })
        return
      }
    }
    setStep(step + 1)
  }

  const handleSubmit = async () => {
    if (!formData.agreeTerms) {
      toast({
        title: locale === "en" ? "Accept Terms" : "शर्त स्वीकार गर्नुहोस्",
        description: locale === "en" ? "Please agree to the terms" : "कृपया शर्त स्वीकार गर्नुहोस्",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate verification submission
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
                <Link href="/">{locale === "en" ? "Return Home" : "गृहमा फर्कनुहोस्"}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex gap-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
              <p className="text-xs mt-2 text-muted-foreground text-center">
                {s === 1 && t.step1}
                {s === 2 && t.step2}
                {s === 3 && t.step3}
                {s === 4 && t.step4}
              </p>
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="pt-8">
            {/* Step 1: Address Verification */}
            {step === 1 && (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {locale === "en"
                      ? "Verify your address and citizenship status to access full platform features"
                      : "पूर्ण प्ल्याटफर्म सुविधाहरु पहुँच गर्न आपनो ठेगाना र नागरिकता स्थिति प्रमाणित गर्नुहोस्"}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="address">{t.address}</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={t.addressPlaceholder}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="citizenship">
                    {t.citizenship}
                    <span className="text-xs text-muted-foreground ml-2">({t.citizenshipTooltip})</span>
                  </Label>
                  <Select
                    value={formData.citizenship}
                    onValueChange={(value) => handleSelectChange("citizenship", value)}
                  >
                    <SelectTrigger id="citizenship" className="mt-2">
                      <SelectValue placeholder={t.selectCitizenship} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizen">{t.citizen}</SelectItem>
                      <SelectItem value="resident">{t.resident}</SelectItem>
                      <SelectItem value="diaspora">{t.diaspora}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">{t.dateOfBirth}</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 2: ID Verification */}
            {step === 2 && (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {locale === "en"
                      ? "Upload a clear copy of your government-issued ID"
                      : "आपनो सरकारी पहिचान कार्डको स्पष्ट प्रति अपलोड गर्नुहोस्"}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="idType">{t.idType}</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleSelectChange("idType", value)}>
                    <SelectTrigger id="idType" className="mt-2">
                      <SelectValue placeholder={t.selectIdType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">{t.passport}</SelectItem>
                      <SelectItem value="citizenship_card">{t.citizenship_card}</SelectItem>
                      <SelectItem value="license">{t.license}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="idNumber">{t.idNumber}</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    placeholder={t.idNumberPlaceholder}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="idFile">{t.uploadId}</Label>
                  <p className="text-xs text-muted-foreground mb-2">{t.uploadIdHint}</p>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
                    <input
                      id="idFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="idFile" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {formData.idFile
                          ? formData.idFile.name
                          : locale === "en"
                            ? "Click to upload"
                            : "अपलोड गर्न क्लिक गर्नुहोस्"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: KYC Details */}
            {step === 3 && (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {locale === "en" ? "Complete your KYC information" : "आपनो KYC जानकारी पूरा गर्नुहोस्"}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t.fullNamePlaceholder}
                    className="mt-2"
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
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="occupation">{t.occupation}</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder={t.occupationPlaceholder}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">{t.disclosures}</Label>
                  <p className="text-xs text-muted-foreground mb-4">{t.disclosuresHint}</p>
                  <EnhancedDisclosures
                    locale={locale}
                    onDisclosureChange={(disclosures) => {
                      setFormData(prev => ({ ...prev, disclosures }))
                    }}
                    initialData={formData.disclosures}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    {locale === "en"
                      ? "Review your information before submitting"
                      : "जमा गर्नु अघि आपनो जानकारी समीक्षा गर्नुहोस्"}
                  </AlertDescription>
                </Alert>

                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">{t.address}</p>
                      <p className="text-muted-foreground">{formData.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.citizenship}</p>
                      <p className="text-muted-foreground">{formData.citizenship}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.fullName}</p>
                      <p className="text-muted-foreground">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.email}</p>
                      <p className="text-muted-foreground">{formData.email}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.phone}</p>
                      <p className="text-muted-foreground">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.occupation}</p>
                      <p className="text-muted-foreground">{formData.occupation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreeTerms" className="cursor-pointer font-normal text-sm">
                      {t.agreeTerms}
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
              {step < 4 && (
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                  {t.next}
                </Button>
              )}
              {step === 4 && (
                <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 bg-accent hover:bg-accent/90">
                  {isLoading ? t.verifying : t.submit}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
