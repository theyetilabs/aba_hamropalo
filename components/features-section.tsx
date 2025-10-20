"use client"

import { useState, useEffect } from "react"
import { 
  Coins, 
  Vote, 
  MessageSquare, 
  Users, 
  Shield, 
  Globe, 
  Zap, 
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Lock,
  Eye,
  Lightbulb,
  Network,
  Scale,
  UserCheck
} from "lucide-react"

interface FeaturesSectionProps {
  locale: "en" | "ne"
}

export default function FeaturesSection({ locale }: FeaturesSectionProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const content = {
    en: {
      title: "Core Features",
      subtitle: "Modern tools for transparent and equitable democratic participation",
      features: [
        {
          icon: Coins,
          title: "Voice Tokens",
          description: "Earn tokens through participation",
          details: "Blockchain-based token system with anti-gaming mechanisms"
        },
        {
          icon: Scale,
          title: "Transparent Voting",
          description: "Quadratic voting prevents wealth capture",
          details: "Mathematically proven fair voting with diminishing returns"
        },
        {
          icon: Network,
          title: "Community Circles",
          description: "Join interest-based governance groups",
          details: "Self-organizing communities with clear accountability"
        },
        {
          icon: Eye,
          title: "Open Deliberation",
          description: "AI-assisted transparent discussions with fact-checking",
          details: "Real-time transparency with immutable discussion records"
        }
      ]
    },
    ne: {
      title: "मुख्य विशेषताहरू",
      subtitle: "पारदर्शी र न्यायसंगत लोकतान्त्रिक सहभागिताका लागि आधुनिक उपकरणहरू",
      features: [
        {
          icon: Coins,
          title: "भ्वाइस टोकन",
          description: "सहभागितामार्फत टोकन कमाउनुहोस्",
          details: "एन्टी-गेमिङ मेकानिज्मसहित ब्लकचेन-आधारित टोकन प्रणाली"
        },
        {
          icon: Scale,
          title: "पारदर्शी मतदान",
          description: "द्विघात मतदानले धन कब्जालाई रोक्छ",
          details: "घट्दो प्रतिफलसहित गणितीय रूपमा प्रमाणित निष्पक्ष मतदान"
        },
        {
          icon: Network,
          title: "सामुदायिक सर्कल",
          description: "रुचि-आधारित शासन समूहहरूमा सामेल हुनुहोस्",
          details: "स्पष्ट जवाफदेहितासहित स्व-संगठित समुदायहरू"
        },
        {
          icon: Eye,
          title: "खुला छलफल",
          description: "तथ्य-जाँचसहित AI-सहायता प्राप्त पारदर्शी छलफल",
          details: "अपरिवर्तनीय छलफल रेकर्डसहित वास्तविक समयको पारदर्शिता"
        }
      ]
    }
  }

  const backgroundIcons = [
    Shield, Globe, Zap, Target, CheckCircle, Sparkles, Heart, Lock, 
    Lightbulb, UserCheck, ArrowRight, Vote, Users, MessageSquare
  ]

  const currentContent = content[locale]

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Background Icons */}
        {backgroundIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute opacity-5"
            style={{
              left: `${(index * 7 + 10) % 90}%`,
              top: `${(index * 11 + 15) % 80}%`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            <Icon 
              size={24 + (index % 3) * 8} 
              className="text-primary animate-float"
            />
          </div>
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d="M 100 200 Q 300 100 500 200 T 900 200"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 200 400 Q 400 300 600 400 T 1000 400"
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            {locale === 'en' ? 'Next-Gen Democracy' : 'अर्को पुस्ताको लोकतन्त्र'}
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {currentContent.features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredFeature === index
            
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${
                  isHovered 
                    ? 'bg-card border-primary shadow-2xl scale-105 -translate-y-2' 
                    : 'bg-card/50 border-border hover:bg-card hover:border-accent hover:shadow-lg hover:scale-102'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl" />
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isHovered 
                      ? 'bg-primary text-primary-foreground scale-110 rotate-3' 
                      : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-105'
                  }`}>
                    <Icon size={40} className="transition-transform duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                      isHovered ? 'text-primary' : 'text-foreground'
                    }`}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                      {feature.description}
                    </p>

                    {/* Details */}
                    <div className="mt-4">
                      <div className="border-t border-border pt-4">
                        <p className="text-sm text-foreground font-medium flex items-center justify-center gap-2 bg-muted/50 rounded-lg p-3">
                          <CheckCircle size={16} className="text-primary flex-shrink-0" />
                          <span className="text-center">{feature.details}</span>
                        </p>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className={`mt-4 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}>
                      <ArrowRight size={20} className="text-primary mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                {isHovered && (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <ArrowRight size={16} className="text-muted-foreground" />
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
              <ArrowRight size={16} className="text-muted-foreground" />
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1000ms' }} />
            </div>
            <span className="text-foreground text-sm font-medium">
              {locale === 'en' ? 'Powering Democratic Innovation' : 'लोकतान्त्रिक नवाचारलाई शक्ति प्रदान गर्दै'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
