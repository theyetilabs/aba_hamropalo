"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Users, FileText, Zap, BookOpen, Target } from "lucide-react"

interface OnboardingGuideProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Welcome to AbaHamroPalo",
    subtitle: "Your guide to democratic participation",
    step1: "Understand the Platform",
    step1Desc: "Learn about our democratic governance model and how your voice matters",
    step2: "Join Circles",
    step2Desc: "Select circles aligned with your interests and expertise",
    step3: "Participate in Deliberation",
    step3Desc: "Engage in thoughtful discussions and share your perspectives",
    step4: "Vote on Proposals",
    step4Desc: "Use your voice tokens to vote on important decisions",
    getStarted: "Get Started",
    learnMore: "Learn More",
    features: "Key Features",
    feature1: "Democratic Governance",
    feature1Desc: "Participate in decisions that shape our future",
    feature2: "Voice Tokens",
    feature2Desc: "Earn tokens through participation and use them to vote",
    feature3: "Community Circles",
    feature3Desc: "Join specialized circles for focused discussions",
    feature4: "Transparent Voting",
    feature4Desc: "Quadratic voting ensures fair representation",
  },
  ne: {
    title: "AbaHamroPaloमा स्वागतम्",
    subtitle: "लोकतान्त्रिक भागीदारीको लागि तपाईको गाइड",
    step1: "प्ल्याटफर्म बुझ्नुहोस्",
    step1Desc: "हाम्रो लोकतान्त्रिक शासन मडेल र तपाईको आवाज कसरी महत्त्वपूर्ण छ भनेर जान्नुहोस्",
    step2: "सर्कलहरुमा सामेल हुनुहोस्",
    step2Desc: "तपाईको रुचि र विशेषज्ञताको साथ संरेखित सर्कलहरु चयन गर्नुहोस्",
    step3: "विचार-विमर्शमा भाग लिनुहोस्",
    step3Desc: "विचारशील छलफलमा संलग्न हुनुहोस् र आफ्नो दृष्टिकोण साझा गर्नुहोस्",
    step4: "प्रस्तावहरुमा मतदान गर्नुहोस्",
    step4Desc: "महत्त्वपूर्ण निर्णयहरुमा मतदान गर्न आफ्नो आवाज टोकन प्रयोग गर्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
    learnMore: "थप जान्नुहोस्",
    features: "मुख्य विशेषताहरु",
    feature1: "लोकतान्त्रिक शासन",
    feature1Desc: "हाम्रो भविष्य आकार दिने निर्णयहरुमा भाग लिनुहोस्",
    feature2: "आवाज टोकन",
    feature2Desc: "भागीदारीको माध्यमबाट टोकन अर्जन गर्नुहोस् र मतदानमा प्रयोग गर्नुहोस्",
    feature3: "समुदाय सर्कलहरु",
    feature3Desc: "केन्द्रित छलफलको लागि विशेष सर्कलहरुमा सामेल हुनुहोस्",
    feature4: "पारदर्शी मतदान",
    feature4Desc: "द्विघाती मतदान निष्पक्ष प्रतिनिधित्व सुनिश्चित गर्छ",
  },
}

export default function OnboardingGuide({ locale }: OnboardingGuideProps) {
  const t = content[locale]
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { icon: BookOpen, title: t.step1, desc: t.step1Desc },
    { icon: Users, title: t.step2, desc: t.step2Desc },
    { icon: FileText, title: t.step3, desc: t.step3Desc },
    { icon: Zap, title: t.step4, desc: t.step4Desc },
  ]

  const features = [
    { icon: Target, title: t.feature1, desc: t.feature1Desc },
    { icon: Zap, title: t.feature2, desc: t.feature2Desc },
    { icon: Users, title: t.feature3, desc: t.feature3Desc },
    { icon: FileText, title: t.feature4, desc: t.feature4Desc },
  ]

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t.title}</h1>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Onboarding Steps */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            {locale === "en" ? "Your Journey" : "तपाईको यात्रा"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(index)
              return (
                <Card key={index} className={`relative ${isCompleted ? "border-primary bg-primary/5" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg ${isCompleted ? "bg-primary text-white" : "bg-secondary text-primary"}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {locale === "en" ? `Step ${index + 1}` : `चरण ${index + 1}`}
                          </Badge>
                        </div>
                      </div>
                      {isCompleted && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <CardTitle className="text-lg mt-2">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{step.desc}</CardDescription>
                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      className="w-full"
                      onClick={() => {
                        if (isCompleted) {
                          setCompletedSteps(completedSteps.filter((s) => s !== index))
                        } else {
                          setCompletedSteps([...completedSteps, index])
                        }
                      }}
                    >
                      {isCompleted ? (locale === "en" ? "Completed" : "पूर्ण") : locale === "en" ? "Start" : "सुरु गर्नुहोस्"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">{t.features}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="mt-2">{feature.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            {t.getStarted}
          </Button>
        </div>
      </div>
    </section>
  )
}
