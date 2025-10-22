"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

interface KYCStatusDashboardProps {
  locale: "en" | "ne"
}

interface VerificationStep {
  id: string
  name: string
  status: "completed" | "pending" | "rejected"
  completedDate?: string
  notes?: string
}

const content = {
  en: {
    title: "KYC Verification Status",
    subtitle: "Track your verification progress",
    status: "Status",
    completed: "Completed",
    pending: "Pending Review",
    rejected: "Needs Revision",
    completedDate: "Completed on",
    steps: {
      address: "Address Verification",
      citizenship: "Citizenship Status",
      identity: "Identity Document",
      kyc: "KYC Information",
    },
    statusMessages: {
      completed: "Your information has been verified and approved.",
      pending: "Your submission is under review. This typically takes 2-3 business days.",
      rejected: "Please review the notes below and resubmit your information.",
    },
    viewDetails: "View Details",
    resubmit: "Resubmit Information",
    nextSteps: "Next Steps",
    nextStepsText: "Once your verification is approved, you'll be able to:",
    benefits: [
      "Access full platform features",
      "Participate in circles and proposals",
      "Vote on important decisions",
      "Receive your verification badge",
    ],
    notes: "Notes",
    noNotes: "No additional notes",
    additionalOpportunities: "Additional Opportunities",
    factCheckEnrollment: "Become a Fact-Checker",
    factCheckDescription: "Join our community of verified fact-checkers",
    manifestoAgreement: "Manifesto Agreement",
    manifestoDescription: "Read and agree to our community manifesto",
  },
  ne: {
    title: "KYC प्रमाणीकरण स्थिति",
    subtitle: "आपनो प्रमाणीकरण प्रगति ट्र्याक गर्नुहोस्",
    status: "स्थिति",
    completed: "पूरा भयो",
    pending: "समीक्षा अन्तर्गत",
    rejected: "संशोधन आवश्यक",
    completedDate: "पूरा भएको",
    steps: {
      address: "ठेगाना प्रमाणीकरण",
      citizenship: "नागरिकता स्थिति",
      identity: "पहिचान कागजात",
      kyc: "KYC जानकारी",
    },
    statusMessages: {
      completed: "आपनो जानकारी प्रमाणित र अनुमोदित भयो।",
      pending: "आपनो जमा समीक्षा अन्तर्गत छ। यो सामान्यतः २-३ कार्य दिन लाग्छ।",
      rejected: "कृपया तलको नोटहरु समीक्षा गर्नुहोस् र आपनो जानकारी पुनः जमा गर्नुहोस्।",
    },
    viewDetails: "विवरण हेर्नुहोस्",
    resubmit: "जानकारी पुनः जमा गर्नुहोस्",
    nextSteps: "अगाडिको चरणहरु",
    nextStepsText: "आपनो प्रमाणीकरण अनुमोदित भएपछी, तपाई सक्षम हुनुहुनेछ:",
    benefits: [
      "पूर्ण प्ल्याटफर्म सुविधाहरु पहुँच गर्नुहोस्",
      "सर्कल र प्रस्तावहरुमा भाग लिनुहोस्",
      "महत्त्वपूर्ण निर्णयहरुमा मतदान गर्नुहोस्",
      "आपनो प्रमाणीकरण ब्याज प्राप्त गर्नुहोस्",
    ],
    notes: "नोटहरु",
    noNotes: "कुनै अतिरिक्त नोट छैन",
    additionalOpportunities: "अतिरिक्त अवसरहरू",
    factCheckEnrollment: "तथ्य-जाँचकर्ता बन्नुहोस्",
    factCheckDescription: "हाम्रो प्रमाणित तथ्य-जाँचकर्ताहरूको समुदायमा सामेल हुनुहोस्",
    manifestoAgreement: "घोषणापत्र सम्झौता",
    manifestoDescription: "हाम्रो सामुदायिक घोषणापत्र पढ्नुहोस् र सहमत हुनुहोस्",
  },
}

const mockVerificationData: VerificationStep[] = [
  {
    id: "address",
    name: "Address Verification",
    status: "completed",
    completedDate: "2024-10-15",
  },
  {
    id: "citizenship",
    name: "Citizenship Status",
    status: "completed",
    completedDate: "2024-10-15",
  },
  {
    id: "identity",
    name: "Identity Document",
    status: "pending",
  },
  {
    id: "kyc",
    name: "KYC Information",
    status: "pending",
  },
]

export default function KYCStatusDashboard({ locale }: KYCStatusDashboardProps) {
  const [verificationSteps] = useState<VerificationStep[]>(mockVerificationData)
  const t = content[locale]

  const overallStatus = verificationSteps.every((step) => step.status === "completed")
    ? "completed"
    : verificationSteps.some((step) => step.status === "rejected")
      ? "rejected"
      : "pending"

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">{t.completed}</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">{t.pending}</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">{t.rejected}</Badge>
      default:
        return null
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Overall Status Card */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t.status}</span>
              {getStatusBadge(overallStatus)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              {t.statusMessages[overallStatus as keyof typeof t.statusMessages]}
            </p>

            {overallStatus === "rejected" && (
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/reverify">{t.resubmit}</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-primary">Verification Steps</h2>
          {verificationSteps.map((step) => (
            <Card key={step.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">{getStatusIcon(step.status)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{step.name}</h3>
                      {step.completedDate && (
                        <p className="text-sm text-muted-foreground">
                          {t.completedDate}:{" "}
                          {new Date(step.completedDate).toLocaleDateString(locale === "en" ? "en-US" : "ne-NP")}
                        </p>
                      )}
                      {step.notes && (
                        <div className="mt-3 p-3 bg-muted rounded">
                          <p className="text-sm font-medium mb-1">{t.notes}</p>
                          <p className="text-sm text-muted-foreground">{step.notes}</p>
                        </div>
                      )}
                      
                      {/* Action buttons for specific verification steps */}
                      <div className="mt-3 flex gap-2">
                        {step.id === "address" && (
                          <Button asChild variant="outline" size="sm">
                            <Link href="/address-verification">{t.viewDetails}</Link>
                          </Button>
                        )}
                        {step.id === "citizenship" && (
                          <Button asChild variant="outline" size="sm">
                            <Link href="/citizenship-verification">{t.viewDetails}</Link>
                          </Button>
                        )}
                        {step.status === "rejected" && (
                          <Button asChild variant="default" size="sm">
                            <Link href={
                              step.id === "address" ? "/address-verification" :
                              step.id === "citizenship" ? "/citizenship-verification" :
                              "/reverify"
                            }>
                              {t.resubmit}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>{getStatusBadge(step.status)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        {overallStatus === "completed" && (
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">{t.nextSteps}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 mb-4">{t.nextStepsText}</p>
              <ul className="space-y-2 mb-6">
                {t.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-green-800">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Additional Opportunities */}
              <div className="border-t border-green-200 pt-4">
                <h4 className="font-semibold text-green-900 mb-3">{t.additionalOpportunities}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="justify-start h-auto p-4 border-green-300 hover:bg-green-100">
                    <Link href="/fact-check?mode=enrollment">
                      <div className="text-left">
                        <div className="font-medium text-green-900">{t.factCheckEnrollment}</div>
                        <div className="text-sm text-green-700">{t.factCheckDescription}</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="justify-start h-auto p-4 border-green-300 hover:bg-green-100">
                    <Link href="/manifesto-agreement">
                      <div className="text-left">
                        <div className="font-medium text-green-900">{t.manifestoAgreement}</div>
                        <div className="text-sm text-green-700">{t.manifestoDescription}</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
