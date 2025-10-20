"use client"

import { useState, useEffect } from "react"
import { Users, MessageCircle, Vote, CheckCircle, ArrowRight, Lightbulb, FileText, Megaphone } from "lucide-react"

interface DemocraticProcessProps {
  locale: "en" | "ne"
}

export default function DemocraticProcess({ locale }: DemocraticProcessProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(phaseInterval)
  }, [])

  const content = {
    en: {
      title: "Democratic Process in Action",
      subtitle: "From community voice to collective decision - transparent, inclusive, and empowering",
      steps: [
        {
          icon: Lightbulb,
          title: "Community Ideas",
          description: "Citizens propose solutions and share innovative ideas for local challenges",
          detail: "Every voice matters in shaping our community's future"
        },
        {
          icon: MessageCircle,
          title: "Open Discussion",
          description: "Transparent dialogue and debate among community members",
          detail: "Building consensus through respectful conversation"
        },
        {
          icon: Vote,
          title: "Democratic Voting",
          description: "Secure, transparent voting using Voice Tokens for fair representation",
          detail: "Your vote, your voice, your community's future"
        },
        {
          icon: CheckCircle,
          title: "Implementation",
          description: "Turning collective decisions into real community improvements",
          detail: "From decision to action - making change happen"
        }
      ],
      features: [
        { icon: FileText, label: "Transparent Records", value: "100%" },
        { icon: Users, label: "Community Participation", value: "78%" },
        { icon: Megaphone, label: "Voice Amplification", value: "5x" }
      ]
    },
    ne: {
      title: "कार्यमा लोकतान्त्रिक प्रक्रिया",
      subtitle: "समुदायिक आवाजदेखि सामूहिक निर्णयसम्म - पारदर्शी, समावेशी र सशक्तिकरण",
      steps: [
        {
          icon: Lightbulb,
          title: "समुदायिक विचारहरू",
          description: "नागरिकहरूले स्थानीय चुनौतीहरूका समाधान र नवीन विचारहरू प्रस्तुत गर्छन्",
          detail: "हाम्रो समुदायको भविष्य आकार दिनमा हरेक आवाज महत्वपूर्ण छ"
        },
        {
          icon: MessageCircle,
          title: "खुला छलफल",
          description: "समुदायका सदस्यहरूबीच पारदर्शी संवाद र बहस",
          detail: "सम्मानजनक कुराकानीमार्फत सहमति निर्माण"
        },
        {
          icon: Vote,
          title: "लोकतान्त्रिक मतदान",
          description: "निष्पक्ष प्रतिनिधित्वका लागि भ्वाइस टोकन प्रयोग गरी सुरक्षित, पारदर्शी मतदान",
          detail: "तपाईंको मत, तपाईंको आवाज, तपाईंको समुदायको भविष्य"
        },
        {
          icon: CheckCircle,
          title: "कार्यान्वयन",
          description: "सामूहिक निर्णयहरूलाई वास्तविक समुदायिक सुधारमा परिणत गर्दै",
          detail: "निर्णयदेखि कार्यसम्म - परिवर्तन ल्याउँदै"
        }
      ],
      features: [
        { icon: FileText, label: "पारदर्शी अभिलेख", value: "१००%" },
        { icon: Users, label: "समुदायिक सहभागिता", value: "७८%" },
        { icon: Megaphone, label: "आवाज विस्तार", value: "५ गुणा" }
      ]
    }
  }

  const currentContent = content[locale]

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => {
          // Deterministic positions based on index
          const positions = [
            {left: 10, top: 20}, {left: 85, top: 15}, {left: 30, top: 80}, {left: 70, top: 60},
            {left: 15, top: 45}, {left: 90, top: 75}, {left: 45, top: 25}, {left: 60, top: 85},
            {left: 25, top: 10}, {left: 80, top: 40}, {left: 5, top: 70}, {left: 95, top: 30},
            {left: 40, top: 55}, {left: 75, top: 90}, {left: 20, top: 35}, {left: 65, top: 5},
            {left: 35, top: 65}, {left: 85, top: 50}, {left: 50, top: 95}, {left: 12, top: 75}
          ]
          const pos = positions[i] || {left: 50, top: 50}
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full transition-all duration-3000 ${animationPhase === 0 ? 'animate-pulse' : animationPhase === 1 ? 'animate-bounce' : 'animate-ping'}`}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 200}ms`
              }}
            ></div>
          )
        })}
        
        {/* Democratic Flow Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600">
          <path
            d="M100 300 Q300 100 500 300 T900 300"
            stroke="url(#democraticGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="democraticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {currentContent.steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < currentContent.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-white/30 to-transparent z-0"></div>
                )}
                
                <div
                  className={`relative bg-card border border-border rounded-2xl p-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isActive ? 'scale-105 shadow-lg bg-accent/10' : 'hover:scale-102 hover:bg-accent/5'} cursor-pointer group`}
                  style={{transitionDelay: `${index * 200}ms`}}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Number */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isActive ? 'bg-white text-gray-900 scale-110' : 'bg-gray-700 text-white'}`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 bg-primary ${isActive ? 'scale-110 shadow-lg' : 'group-hover:scale-105'}`}>
                     <Icon size={28} className="text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed group-hover:text-foreground transition-colors">
                    {step.description}
                  </p>
                  
                  {/* Detail */}
                  <div className="mt-4">
                    <div className="border-t border-primary/20 pt-3">
                      <p className="text-xs text-muted-foreground italic group-hover:text-primary transition-colors">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-4">
                    <div className="w-full bg-muted rounded-full h-1">
                       <div 
                         className={`h-1 rounded-full transition-all duration-1000 bg-primary ${isActive ? 'w-full' : 'w-0'}`}
                       ></div>
                     </div>
                  </div>

                  {/* Floating Elements */}
                  {isActive && (
                    <>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-primary/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {currentContent.features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`bg-card border border-border rounded-xl p-6 text-center transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} hover:bg-accent/10 hover:scale-105`}
                style={{transitionDelay: `${index * 150 + 800}ms`}}
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {feature.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {feature.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Interactive Flow Visualization */}
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
          <div className="inline-flex items-center gap-4 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <ArrowRight size={16} className="text-primary" />
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{animationDelay: '500ms'}}></div>
              <ArrowRight size={16} className="text-primary" />
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{animationDelay: '1000ms'}}></div>
              <ArrowRight size={16} className="text-primary" />
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{animationDelay: '1500ms'}}></div>
            </div>
            <span className="text-primary text-sm font-semibold">
              {locale === 'en' ? 'Continuous Democratic Flow' : 'निरन्तर लोकतान्त्रिक प्रवाह'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}