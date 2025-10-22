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
import { CheckCircle2, Phone, MapPin, Shield, Upload, FileText, Eye, Clock } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface RegistrationFormProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Join AbaHamroPalo",
    subtitle: "Complete comprehensive verification to become part of Nepal's democratic regeneration movement",
    step1: "Personal Information",
    step2: "Phone Verification",
    step3: "Address Verification",
    step4: "Citizenship Verification",
    step5: "Interests & Agreements",
    step6: "Review & Submit",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    district: "District",
    selectDistrict: "Select your district",
    
    // Phone verification
    phoneVerification: "Phone Number Verification",
    phoneVerificationDesc: "We'll send a verification code to your phone number",
    verificationCode: "Verification Code",
    sendCode: "Send Code",
    resendCode: "Resend Code",
    verifyCode: "Verify Code",
    phoneVerified: "Phone number verified successfully",
    
    // Address verification
    addressVerification: "Address Verification",
    addressVerificationDesc: "Provide your complete address and supporting documents",
    fullAddress: "Full Address",
    addressPlaceholder: "Street, Ward, Municipality/VDC, District",
    municipality: "Municipality/VDC",
    ward: "Ward Number",
    addressDocument: "Address Verification Document",
    addressDocumentDesc: "Upload utility bill, bank statement, or government document showing your address",
    uploadDocument: "Upload Document",
    documentUploaded: "Document uploaded successfully",
    
    // Citizenship verification
    citizenshipVerification: "Citizenship Status Verification",
    citizenshipVerificationDesc: "Verify your Nepali citizenship status",
    citizenshipNumber: "Citizenship Number",
    citizenshipType: "Citizenship Type",
    citizenshipByBirth: "Citizenship by Birth",
    citizenshipByNaturalization: "Citizenship by Naturalization",
    citizenshipDocument: "Citizenship Certificate",
    citizenshipDocumentDesc: "Upload clear photo of your citizenship certificate",
    
    interests: "Areas of Interest",
    selectInterests: "What areas interest you?",
    governance: "Governance & Policy",
    environment: "Environment & Sustainability",
    education: "Education & Youth",
    health: "Health & Wellbeing",
    economy: "Economic Development",
    culture: "Culture & Heritage",
    
    // Agreements and manifesto
    manifestoReading: "Manifesto Agreement",
    manifestoDesc: "Please read and agree to our manifesto and principles",
    readManifesto: "Read AbaHamroPalo Manifesto",
    agreeManifesto: "I have read and agree to the AbaHamroPalo manifesto",
    agreeTerms: "I agree to the",
    termsLink: "Terms of Service",
    andText: "and",
    codeOfConduct: "Code of Conduct",
    agreeText: "",
    agreeNewsletter: "I'd like to receive updates about AbaHamroPalo",
    
    // Review section
    reviewInformation: "Review Your Information",
    personalInfo: "Personal Information",
    verificationStatus: "Verification Status",
    verified: "Verified",
    pending: "Pending Review",
    
    previous: "Previous",
    next: "Next",
    submit: "Complete Registration",
    success: "Welcome to AbaHamroPalo!",
    successMessage: "Your registration is complete and under review. You'll receive an email once your verification is approved.",
    
    // Validation messages
    phoneRequired: "Phone number is required",
    phoneInvalid: "Please enter a valid phone number",
    verificationCodeRequired: "Please enter the verification code",
    addressRequired: "Full address is required",
    citizenshipRequired: "Citizenship number is required",
    documentRequired: "Please upload the required document",
    manifestoRequired: "Please read and agree to the manifesto",
  },
  ne: {
    title: "अबा हाम्रो पालोमा सामेल हुनुहोस्",
    subtitle: "नेपालको लोकतान्त्रिक पुनर्जन्म आन्दोलनको भाग बन्न व्यापक प्रमाणीकरण पूरा गर्नुहोस्",
    step1: "व्यक्तिगत जानकारी",
    step2: "फोन प्रमाणीकरण",
    step3: "ठेगाना प्रमाणीकरण",
    step4: "नागरिकता प्रमाणीकरण",
    step5: "रुचि र सम्झौताहरु",
    step6: "समीक्षा र पेश गर्नुहोस्",
    firstName: "पहिलो नाम",
    lastName: "अन्तिम नाम",
    email: "इमेल ठेगाना",
    phone: "फोन नम्बर",
    district: "जिल्ला",
    selectDistrict: "आपनो जिल्ला चयन गर्नुहोस्",
    
    // Phone verification
    phoneVerification: "फोन नम्बर प्रमाणीकरण",
    phoneVerificationDesc: "हामी तपाईंको फोन नम्बरमा प्रमाणीकरण कोड पठाउनेछौं",
    verificationCode: "प्रमाणीकरण कोड",
    sendCode: "कोड पठाउनुहोस्",
    resendCode: "कोड पुनः पठाउनुहोस्",
    verifyCode: "कोड प्रमाणित गर्नुहोस्",
    phoneVerified: "फोन नम्बर सफलतापूर्वक प्रमाणित भयो",
    
    // Address verification
    addressVerification: "ठेगाना प्रमाणीकरण",
    addressVerificationDesc: "आपनो पूरा ठेगाना र सहायक कागजातहरू प्रदान गर्नुहोस्",
    fullAddress: "पूरा ठेगाना",
    addressPlaceholder: "सडक, वार्ड, नगरपालिका/गाविस, जिल्ला",
    municipality: "नगरपालिका/गाविस",
    ward: "वार्ड नम्बर",
    addressDocument: "ठेगाना प्रमाणीकरण कागजात",
    addressDocumentDesc: "उपयोगिता बिल, बैंक स्टेटमेन्ट, वा तपाईंको ठेगाना देखाउने सरकारी कागजात अपलोड गर्नुहोस्",
    uploadDocument: "कागजात अपलोड गर्नुहोस्",
    documentUploaded: "कागजात सफलतापूर्वक अपलोड भयो",
    
    // Citizenship verification
    citizenshipVerification: "नागरिकता स्थिति प्रमाणीकरण",
    citizenshipVerificationDesc: "आपनो नेपाली नागरिकता स्थिति प्रमाणित गर्नुहोस्",
    citizenshipNumber: "नागरिकता नम्बर",
    citizenshipType: "नागरिकता प्रकार",
    citizenshipByBirth: "जन्मसूत्रको नागरिकता",
    citizenshipByNaturalization: "प्राकृतिकीकरणको नागरिकता",
    citizenshipDocument: "नागरिकता प्रमाणपत्र",
    citizenshipDocumentDesc: "आपनो नागरिकता प्रमाणपत्रको स्पष्ट फोटो अपलोड गर्नुहोस्",
    
    interests: "रुचिको क्षेत्र",
    selectInterests: "कुन क्षेत्रहरु तपाईलाई रुचि छ?",
    governance: "शासन र नीति",
    environment: "वातावरण र स्थिरता",
    education: "शिक्षा र युवा",
    health: "स्वास्थ्य र कल्याण",
    economy: "आर्थिक विकास",
    culture: "संस्कृति र विरासत",
    
    // Agreements and manifesto
    manifestoReading: "घोषणापत्र सम्झौता",
    manifestoDesc: "कृपया हाम्रो घोषणापत्र र सिद्धान्तहरू पढ्नुहोस् र सहमत हुनुहोस्",
    readManifesto: "अबा हाम्रो पालो घोषणापत्र पढ्नुहोस्",
    agreeManifesto: "मैले अबा हाम्रो पालो घोषणापत्र पढेको छु र सहमत छु",
    agreeTerms: "मैले",
    termsLink: "सेवा शर्त",
    andText: "र",
    codeOfConduct: "आचरण संहिता",
    agreeText: "सहमत गर्छु",
    agreeNewsletter: "मैले अबा हाम्रो पालोको अपडेट पाउन चाहन्छु",
    
    // Review section
    reviewInformation: "आपनो जानकारी समीक्षा गर्नुहोस्",
    personalInfo: "व्यक्तिगत जानकारी",
    verificationStatus: "प्रमाणीकरण स्थिति",
    verified: "प्रमाणित",
    pending: "समीक्षा बाँकी",
    
    previous: "अघिल्लो",
    next: "अगाडि",
    submit: "दर्ता पूरा गर्नुहोस्",
    success: "अबा हाम्रो पालोमा स्वागतम!",
    successMessage: "आपनो दर्ता पूरा भयो र समीक्षाधीन छ। तपाईंको प्रमाणीकरण अनुमोदन भएपछि तपाईंले इमेल प्राप्त गर्नुहुनेछ।",
    
    // Validation messages
    phoneRequired: "फोन नम्बर आवश्यक छ",
    phoneInvalid: "कृपया मान्य फोन नम्बर प्रविष्ट गर्नुहोस्",
    verificationCodeRequired: "कृपया प्रमाणीकरण कोड प्रविष्ट गर्नुहोस्",
    addressRequired: "पूरा ठेगाना आवश्यक छ",
    citizenshipRequired: "नागरिकता नम्बर आवश्यक छ",
    documentRequired: "कृपया आवश्यक कागजात अपलोड गर्नुहोस्",
    manifestoRequired: "कृपया घोषणापत्र पढ्नुहोस् र सहमत हुनुहोस्",
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
  "सोलुखुम्बु",
  "उदयपुर",
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
    
    // Phone verification
    verificationCode: "",
    phoneVerified: false,
    
    // Address verification
    fullAddress: "",
    municipality: "",
    ward: "",
    addressDocument: null as File | null,
    
    // Citizenship verification
    citizenshipNumber: "",
    citizenshipType: "",
    citizenshipDocument: null as File | null,
    
    interests: [] as string[],
    agreeManifesto: false,
    agreeTerms: false,
    agreeNewsletter: false,
  })

  const [verificationState, setVerificationState] = useState({
    codeSent: false,
    codeVerified: false,
    addressDocumentUploaded: false,
    citizenshipDocumentUploaded: false,
  })

  const t = content[locale]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }))
    if (file) {
      if (name === "addressDocument") {
        setVerificationState(prev => ({ ...prev, addressDocumentUploaded: true }))
      } else if (name === "citizenshipDocument") {
        setVerificationState(prev => ({ ...prev, citizenshipDocumentUploaded: true }))
      }
      toast({
        title: t.documentUploaded,
        description: file.name,
      })
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleCheckboxChange = (field: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const sendVerificationCode = () => {
    if (!formData.phone) {
      toast({
        title: locale === "en" ? "Phone Required" : "फोन आवश्यक",
        description: t.phoneRequired,
        variant: "destructive",
      })
      return
    }
    
    // Simulate sending verification code
    setVerificationState(prev => ({ ...prev, codeSent: true }))
    toast({
      title: locale === "en" ? "Code Sent" : "कोड पठाइयो",
      description: locale === "en" ? "Verification code sent to your phone" : "आपको फोनमा प्रमाणीकरण कोड पठाइयो",
    })
  }

  const verifyCode = () => {
    if (!formData.verificationCode) {
      toast({
        title: locale === "en" ? "Code Required" : "कोड आवश्यक",
        description: t.verificationCodeRequired,
        variant: "destructive",
      })
      return
    }
    
    // Simulate code verification
    setVerificationState(prev => ({ ...prev, codeVerified: true }))
    setFormData(prev => ({ ...prev, phoneVerified: true }))
    toast({
      title: t.phoneVerified,
      description: locale === "en" ? "You can now proceed to the next step" : "अब तपाई अर्को चरणमा जान सक्नुहुन्छ",
    })
  }

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.district) {
          toast({
            title: locale === "en" ? "Missing Information" : "जानकारी हराएको",
            description: locale === "en" ? "Please fill in all fields" : "कृपया सबै क्षेत्र भर्नुहोस्",
            variant: "destructive",
          })
          return false
        }
        break
      case 2:
        if (!formData.phoneVerified) {
          toast({
            title: locale === "en" ? "Phone Not Verified" : "फोन प्रमाणित छैन",
            description: locale === "en" ? "Please verify your phone number" : "कृपया आपको फोन नम्बर प्रमाणित गर्नुहोस्",
            variant: "destructive",
          })
          return false
        }
        break
      case 3:
        if (!formData.fullAddress || !formData.municipality || !formData.ward || !formData.addressDocument) {
          toast({
            title: locale === "en" ? "Address Information Required" : "ठेगाना जानकारी आवश्यक",
            description: t.addressRequired,
            variant: "destructive",
          })
          return false
        }
        break
      case 4:
        if (!formData.citizenshipNumber || !formData.citizenshipType || !formData.citizenshipDocument) {
          toast({
            title: locale === "en" ? "Citizenship Information Required" : "नागरिकता जानकारी आवश्यक",
            description: t.citizenshipRequired,
            variant: "destructive",
          })
          return false
        }
        break
      case 5:
        if (formData.interests.length === 0 || !formData.agreeManifesto) {
          toast({
            title: locale === "en" ? "Complete Requirements" : "आवश्यकताहरु पूरा गर्नुहोस्",
            description: t.manifestoRequired,
            variant: "destructive",
          })
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
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
    console.log("Enhanced form submitted:", formData)
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
                  <CheckCircle2 className="w-8 h-8 text-white" />
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
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
              <p className="text-xs mt-2 text-muted-foreground text-center">
                {s === 1 && t.step1}
                {s === 2 && t.step2}
                {s === 3 && t.step3}
                {s === 4 && t.step4}
                {s === 5 && t.step5}
                {s === 6 && t.step6}
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
                  <Select value={formData.district} onValueChange={(value) => handleSelectChange("district", value)}>
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

            {/* Step 2: Phone Verification */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.phoneVerification}</h3>
                  <p className="text-muted-foreground">{t.phoneVerificationDesc}</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">{t.phone}:</span> {formData.phone}
                  </p>
                </div>

                {!verificationState.codeSent ? (
                  <Button onClick={sendVerificationCode} className="w-full">
                    {t.sendCode}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="verificationCode">{t.verificationCode}</Label>
                      <Input
                        id="verificationCode"
                        name="verificationCode"
                        value={formData.verificationCode}
                        onChange={handleInputChange}
                        placeholder="123456"
                        className="mt-2"
                        maxLength={6}
                      />
                    </div>
                    
                    {formData.phoneVerified ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{t.phoneVerified}</span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={verifyCode} className="flex-1">
                          {t.verifyCode}
                        </Button>
                        <Button variant="outline" onClick={sendVerificationCode}>
                          {t.resendCode}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Address Verification */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.addressVerification}</h3>
                  <p className="text-muted-foreground">{t.addressVerificationDesc}</p>
                </div>

                <div>
                  <Label htmlFor="fullAddress">{t.fullAddress}</Label>
                  <Textarea
                    id="fullAddress"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    placeholder={t.addressPlaceholder}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="municipality">{t.municipality}</Label>
                    <Input
                      id="municipality"
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ward">{t.ward}</Label>
                    <Input
                      id="ward"
                      name="ward"
                      type="number"
                      value={formData.ward}
                      onChange={handleInputChange}
                      className="mt-2"
                      min="1"
                      max="35"
                    />
                  </div>
                </div>

                <div>
                  <Label>{t.addressDocument}</Label>
                  <p className="text-sm text-muted-foreground mb-2">{t.addressDocumentDesc}</p>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("addressDocument", e.target.files?.[0] || null)}
                      className="hidden"
                      id="addressDocument"
                    />
                    <Label htmlFor="addressDocument" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>{t.uploadDocument}</span>
                      </Button>
                    </Label>
                    {verificationState.addressDocumentUploaded && (
                      <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">{t.documentUploaded}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Citizenship Verification */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.citizenshipVerification}</h3>
                  <p className="text-muted-foreground">{t.citizenshipVerificationDesc}</p>
                </div>

                <div>
                  <Label htmlFor="citizenshipNumber">{t.citizenshipNumber}</Label>
                  <Input
                    id="citizenshipNumber"
                    name="citizenshipNumber"
                    value={formData.citizenshipNumber}
                    onChange={handleInputChange}
                    placeholder="12345678"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>{t.citizenshipType}</Label>
                  <Select value={formData.citizenshipType} onValueChange={(value) => handleSelectChange("citizenshipType", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={locale === "en" ? "Select citizenship type" : "नागरिकता प्रकार चयन गर्नुहोस्"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birth">{t.citizenshipByBirth}</SelectItem>
                      <SelectItem value="naturalization">{t.citizenshipByNaturalization}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t.citizenshipDocument}</Label>
                  <p className="text-sm text-muted-foreground mb-2">{t.citizenshipDocumentDesc}</p>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("citizenshipDocument", e.target.files?.[0] || null)}
                      className="hidden"
                      id="citizenshipDocument"
                    />
                    <Label htmlFor="citizenshipDocument" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>{t.uploadDocument}</span>
                      </Button>
                    </Label>
                    {verificationState.citizenshipDocumentUploaded && (
                      <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">{t.documentUploaded}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Interests & Agreements */}
            {step === 5 && (
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

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">{t.manifestoReading}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{t.manifestoDesc}</p>
                  
                  <Button variant="outline" asChild className="mb-4">
                    <Link href="/manifesto" target="_blank">
                      <Eye className="w-4 h-4 mr-2" />
                      {t.readManifesto}
                    </Link>
                  </Button>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeManifesto"
                      checked={formData.agreeManifesto}
                      onCheckedChange={() => handleCheckboxChange("agreeManifesto")}
                    />
                    <Label htmlFor="agreeManifesto" className="cursor-pointer font-normal text-sm">
                      {t.agreeManifesto}
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {step === 6 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">{t.reviewInformation}</h3>
                
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t.personalInfo}</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">{locale === "en" ? "Name:" : "नाम:"}</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium">{locale === "en" ? "Email:" : "इमेल:"}</span> {formData.email}</p>
                      <p><span className="font-medium">{locale === "en" ? "Phone:" : "फोन:"}</span> {formData.phone}</p>
                      <p><span className="font-medium">{locale === "en" ? "District:" : "जिल्ला:"}</span> {formData.district}</p>
                      <p><span className="font-medium">{locale === "en" ? "Address:" : "ठेगाना:"}</span> {formData.fullAddress}</p>
                      <p><span className="font-medium">{locale === "en" ? "Citizenship:" : "नागरिकता:"}</span> {formData.citizenshipNumber}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{t.verificationStatus}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{t.phoneVerification}: {t.verified}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{t.addressVerification}: {t.pending}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{t.citizenshipVerification}: {t.pending}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p><span className="font-medium">{locale === "en" ? "Interests:" : "रुचिहरु:"}</span> {formData.interests.join(", ")}</p>
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
              {step < 6 && (
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                  {t.next}
                </Button>
              )}
              {step === 6 && (
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
