"use client"

import { useState, useEffect } from "react"
import { Users, Vote, Zap, Heart, Globe, TrendingUp, Award, Target } from "lucide-react"

interface CommunityImpactProps {
  locale: "en" | "ne"
}

export default function CommunityImpact({ locale }: CommunityImpactProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const content = {
    en: {
      title: "Empowering Communities Across Nepal",
      subtitle: "Real impact through democratic participation and community-driven governance",
      stats: [
        { icon: Users, label: "Active Communities", value: "2,847", growth: "+34%" },
        { icon: Vote, label: "Decisions Made", value: "15,623", growth: "+67%" },
        { icon: Zap, label: "Voice Tokens Earned", value: "4.2M", growth: "+89%" },
        { icon: Heart, label: "Lives Improved", value: "28,456", growth: "+45%" }
      ],
      impactAreas: [
        {
          title: "Rural Development",
          description: "Connecting remote villages to democratic processes",
          icon: Globe
        },
        {
          title: "Youth Engagement",
          description: "Empowering next generation leaders",
          icon: TrendingUp
        },
        {
          title: "Women's Participation",
          description: "Ensuring equal voice in governance",
          icon: Award
        },
        {
          title: "Local Governance",
          description: "Strengthening grassroots democracy",
          icon: Target
        }
      ]
    },
    ne: {
      title: "नेपालभरका समुदायहरूलाई सशक्तिकरण",
      subtitle: "लोकतान्त्रिक सहभागिता र समुदायिक शासनमार्फत वास्तविक प्रभाव",
      stats: [
        { icon: Users, label: "सक्रिय समुदायहरू", value: "२,८४७", growth: "+३४%" },
        { icon: Vote, label: "निर्णयहरू", value: "१५,६२३", growth: "+६७%" },
        { icon: Zap, label: "भ्वाइस टोकन", value: "४२ लाख", growth: "+८९%" },
        { icon: Heart, label: "सुधारिएका जीवन", value: "२८,४५६", growth: "+४५%" }
      ],
      impactAreas: [
        {
          title: "ग्रामीण विकास",
          description: "दुर्गम गाउँहरूलाई लोकतान्त्रिक प्रक्रियासँग जोड्दै",
          icon: Globe
        },
        {
          title: "युवा सहभागिता",
          description: "भावी पुस्ताका नेताहरूलाई सशक्तिकरण",
          icon: TrendingUp
        },
        {
          title: "महिला सहभागिता",
          description: "शासनमा समान आवाज सुनिश्चित गर्दै",
          icon: Award
        },
        {
          title: "स्थानीय शासन",
          description: "तल्लो तहको लोकतन्त्रलाई बलियो बनाउँदै",
          icon: Target
        }
      ]
    }
  }

  const currentContent = content[locale]

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {currentContent.stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'} hover:scale-105 cursor-pointer group border border-border hover:border-primary/20`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="text-accent font-semibold text-sm group-hover:text-accent/80 transition-colors duration-300">
                    {stat.growth}
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentContent.impactAreas.map((area, index) => {
            const Icon = area.icon
            const isActive = activeCard === index
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isActive ? 'scale-105 shadow-2xl shadow-primary/20 border-primary/30' : 'scale-100 shadow-lg hover:shadow-xl hover:shadow-primary/10 border-border hover:border-primary/20'} cursor-pointer group border bg-card/80 backdrop-blur-sm`}
                style={{transitionDelay: `${index * 150 + 800}ms`}}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className={`absolute inset-0 ${isActive ? 'bg-primary/10' : 'bg-transparent group-hover:bg-primary/5'} transition-all duration-300`}></div>
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110 bg-primary/20 text-primary' : 'group-hover:scale-105 bg-primary/10 group-hover:bg-primary/15 text-primary'}`}>
                      <Icon size={24} />
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-primary scale-125' : 'bg-primary/30 group-hover:bg-primary/50'}`}></div>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {area.description}
                  </p>
                  
                  {/* Interactive Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-border rounded-full h-1">
                      <div 
                        className={`bg-primary h-1 rounded-full transition-all duration-1000 ${isActive ? 'w-full' : 'w-0 group-hover:w-1/2'}`}
                        style={{transitionDelay: isActive ? '200ms' : '0ms'}}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className={`absolute top-4 right-4 w-2 h-2 bg-primary/40 rounded-full transition-all duration-1000 ${isActive ? 'animate-ping' : 'group-hover:animate-pulse'}`}></div>
                <div className={`absolute bottom-4 left-4 w-1 h-1 bg-accent/30 rounded-full transition-all duration-1000 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'}`} style={{animationDelay: '500ms'}}></div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1200ms'}}>
          <div className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <Heart size={20} />
            <span>{locale === 'en' ? 'Join Our Community' : 'हाम्रो समुदायमा सामेल हुनुहोस्'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}