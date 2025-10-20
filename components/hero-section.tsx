"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Vote, Zap, BarChart3, Heart, TrendingUp, Globe, MessageCircle, CheckCircle, Lightbulb, FileText, Megaphone, Target, Award, Shield, UserCheck, Crown, Scale, Gavel, Building, Flag, HandHeart, UserPlus, Handshake, Star, Trophy, Bookmark, Calendar, Clock, MapPin, Eye, Lock, Unlock, Key, Fingerprint, Mountain, Home, Compass, Sunrise } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  locale: "en" | "ne"
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    activeVoters: 0,
    communityCircles: 0,
    voiceTokens: 0,
    participation: 0
  })
  
  // Add state for percentage animations
  const [animatedPercentages, setAnimatedPercentages] = useState({
    activeVotersPercent: 0,
    communityCirclesPercent: 0,
    voiceTokensPercent: 0
  })

  useEffect(() => {
    setIsVisible(true)
    
    // Animate statistics counters with delays
    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats(prev => ({
          ...prev,
          activeVoters: prev.activeVoters < 12847 ? prev.activeVoters + 150 : 12847
        }))
      }, 30)
      setTimeout(() => clearInterval(interval), 2000)
    }, 1000)

    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats(prev => ({
          ...prev,
          communityCircles: prev.communityCircles < 156 ? prev.communityCircles + 2 : 156
        }))
      }, 50)
      setTimeout(() => clearInterval(interval), 2000)
    }, 1500)

    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats(prev => ({
          ...prev,
          voiceTokens: prev.voiceTokens < 2.0 ? prev.voiceTokens + 0.05 : 2.0
        }))
      }, 50)
      setTimeout(() => clearInterval(interval), 2000)
    }, 2000)

    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats(prev => ({
          ...prev,
          participation: prev.participation < 78 ? prev.participation + 1 : 78
        }))
      }, 50)
      setTimeout(() => clearInterval(interval), 2000)
    }, 2500)

    // Animate percentages with fast counting
    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercentages(prev => ({
          ...prev,
          activeVotersPercent: prev.activeVotersPercent < 23 ? prev.activeVotersPercent + 1 : 23
        }))
      }, 50)
      setTimeout(() => clearInterval(interval), 1200)
    }, 3000)

    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercentages(prev => ({
          ...prev,
          communityCirclesPercent: prev.communityCirclesPercent < 45 ? prev.communityCirclesPercent + 2 : 45
        }))
      }, 50)
      setTimeout(() => clearInterval(interval), 1200)
    }, 3500)

    setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercentages(prev => ({
          ...prev,
          voiceTokensPercent: prev.voiceTokensPercent < 67 ? prev.voiceTokensPercent + 3 : 67
        }))
      }, 50)
      setTimeout(() => clearInterval(interval), 1200)
    }, 4000)
  }, [])

  const content = {
    en: {
      title: "Democratic Governance for Nepal",
      subtitle:
        "Participate in regenerative politics through transparent, inclusive governance powered by Voice Tokens and community deliberation.",
      cta1: "Get Started",
      cta2: "Learn More",
      feature1: "Transparent Voting",
      feature1Desc: "Quadratic voting prevents wealth capture",
      feature2: "Community Circles",
      feature2Desc: "Join interest-based governance groups",
      feature3: "Voice Tokens",
      feature3Desc: "Earn tokens through participation",
    },
    ne: {
      title: "नेपालको लागि लोकतान्त्रिक शासन",
      subtitle: "भ्वाइस टोकन र सामुदायिक विचार-विमर्श द्वारा संचालित पारदर्शी, समावेशी शासनमा भाग लिनुहोस्।",
      cta1: "सुरु गर्नुहोस्",
      cta2: "थप जान्नुहोस्",
      feature1: "पारदर्शी मतदान",
      feature1Desc: "द्विघात मतदान सम्पत्ति कब्जा रोक्छ",
      feature2: "सामुदायिक सर्कलहरु",
      feature2Desc: "रुचि-आधारित शासन समूहमा सामेल हुनुहोस्",
      feature3: "भ्वाइस टोकनहरु",
      feature3Desc: "भागीदारीको माध्यमबाट टोकन अर्जन गर्न।",
    },
  }

  const t = content[locale]

  return (
    <>
      {/* Hero Section - Compact and Modern */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden py-12 lg:py-16">
        {/* Simplified Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Enhanced Animated Elements - People Power & Voting */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Enhanced Election & Voting Rights Icons */}
          {[...Array(6)].map((_, i) => {
            const icons = [Vote, Flag, Users, HandHeart, Mountain, Home];
            const Icon = icons[i];
            const colors = [
              'from-blue-600/40 to-cyan-500/40',
              'from-indigo-600/40 to-purple-500/40', 
              'from-emerald-600/40 to-green-500/40',
              'from-amber-600/40 to-yellow-500/40',
              'from-rose-600/40 to-pink-500/40',
              'from-violet-600/40 to-purple-500/40'
            ];
            const textColors = ['text-blue-100', 'text-indigo-100', 'text-emerald-100', 'text-amber-100', 'text-rose-100', 'text-violet-100'];
            return (
              <div
                key={`election-icon-${i}`}
                className={`absolute transition-all duration-4000 ${
                  isVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{
                  right: `${5 + (i * 8)}%`,
                  top: `${15 + (i % 3) * 20}%`,
                  transitionDelay: `${i * 150}ms`,
                  animation: `float ${3 + (i % 4)}s ease-in-out infinite, glow ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 250}ms`
                }}
              >
                <div className="relative group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/25 shadow-2xl hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className={`${textColors[i % textColors.length]} drop-shadow-lg`} />
                  </div>
                  {/* Enhanced pulsing ring effects */}
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-2xl animate-ping opacity-75" style={{animationDelay: `${i * 400}ms`}}></div>
                  <div className="absolute -inset-2 w-20 h-20 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-3xl animate-pulse" style={{animationDelay: `${i * 600}ms`}}></div>
                </div>
              </div>
            );
          })}

          {/* Digital Particle Effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-4000 ${
                isVisible ? 'opacity-80' : 'opacity-0'
              }`}
              style={{
                right: `${Math.random() * 50}%`,
                top: `${Math.random() * 100}%`,
                transitionDelay: `${i * 100}ms`,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite, twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}

          {/* People Power Network Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {[...Array(6)].map((_, i) => (
              <g key={`network-${i}`}>
                <line
                  x1={`${20 + i * 15}%`}
                  y1={`${30 + (i % 2) * 40}%`}
                  x2={`${40 + i * 10}%`}
                  y2={`${50 + (i % 3) * 20}%`}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  className="animate-pulse"
                  style={{animationDelay: `${i * 400}ms`}}
                />
              </g>
            ))}
          </svg>

          {/* Enhanced People Power & Election Symbols */}
          {[...Array(4)].map((_, i) => {
            const symbols = [Vote, Users, Shield, Globe];
            const Symbol = symbols[i];
            const positions = [
              { right: '15%', top: '25%' },
              { right: '5%', top: '45%' },
              { right: '20%', top: '65%' },
              { right: '10%', top: '80%' }
            ];
            const gradients = [
              'from-amber-600/40 to-yellow-500/40',
              'from-emerald-600/40 to-green-500/40',
              'from-blue-600/40 to-cyan-500/40',
              'from-rose-600/40 to-pink-500/40'
            ];
            const textColors = [
              'text-amber-100', 'text-emerald-100', 'text-blue-100', 'text-rose-100'
            ];
            return (
              <div
                key={`people-power-${i}`}
                className={`absolute transition-all duration-3000 ${
                  isVisible ? 'opacity-70 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{
                  ...positions[i],
                  transitionDelay: `${i * 300}ms`,
                  animation: `float ${4 + (i % 3)}s ease-in-out infinite, glow ${3 + (i % 2)}s ease-in-out infinite`,
                  animationDelay: `${i * 400}ms`
                }}
              >
                <div className="relative group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradients[i]} rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl hover:scale-125 transition-all duration-300`}>
                    <Symbol size={24} className={`${textColors[i]} drop-shadow-md`} />
                  </div>
                  {/* Enhanced glowing effects */}
                  <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-white/15 to-transparent rounded-xl blur-sm animate-pulse opacity-60" style={{animationDelay: `${i * 250}ms`}}></div>
                  <div className="absolute -inset-1 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-2xl animate-ping opacity-40" style={{animationDelay: `${i * 500}ms`}}></div>
                </div>
              </div>
            );
          })}

          {/* Enhanced Voting Progress Indicators */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`progress-${i}`}
              className={`absolute transition-all duration-4000 ${
                isVisible ? 'opacity-70' : 'opacity-0'
              }`}
              style={{
                right: `${10 + i * 8}%`,
                bottom: `${15 + i * 12}%`,
                transitionDelay: `${i * 400}ms`
              }}
            >
              <div className="relative">
                {/* Progress bar container */}
                <div className="w-24 h-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 shadow-lg">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-5000 shadow-inner"
                    style={{
                      width: `${50 + i * 15}%`,
                      animation: `slideIn 4s ease-out infinite, glow 3s ease-in-out infinite`,
                      animationDelay: `${i * 600}ms`
                    }}
                  />
                </div>
                {/* Glowing effect */}
                <div className="absolute inset-0 w-24 h-2 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-sm animate-pulse" style={{animationDelay: `${i * 300}ms`}}></div>
                {/* Label */}
                <div className="absolute -top-6 left-0 text-xs text-white/60 font-medium">
                  {['Votes', 'Turnout', 'Engagement', 'Participation', 'Democracy'][i]}
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced ambient lighting */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}} />
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side - Main Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
               {/* Badge */}
               <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-accent/20 to-accent/10 text-accent border border-accent/20 backdrop-blur-sm mb-4 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                 <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 animate-pulse" />
                 {locale === "en" ? "Digital Democracy Platform" : "डिजिटल लोकतन्त्र प्लेटफर्म"}
               </div>

              {/* Title */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 leading-tight transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                <span className="bg-gradient-to-r from-blue-400 via-red-500 to-blue-600 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg lg:text-xl text-blue-100 font-semibold mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                {t.subtitle}
              </p>

              {/* Compact Stats */}
              <div className={`grid grid-cols-3 gap-4 py-4 max-w-md mx-auto lg:mx-0 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400 mb-1">50K+</div>
                  <div className="text-xs text-blue-200/80 font-medium">{locale === "en" ? "Citizens" : "नागरिकहरू"}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-red-400 mb-1">156</div>
                  <div className="text-xs text-blue-200/80 font-medium">{locale === "en" ? "Communities" : "समुदायहरू"}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400 mb-1">24/7</div>
                  <div className="text-xs text-blue-200/80 font-medium">{locale === "en" ? "Active" : "सक्रिय"}</div>
                </div>
              </div>

              {/* Compact CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                <Button asChild size="lg" className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold text-sm sm:text-base px-6 py-3 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 group">
                  <Link href="/register-interest" className="flex items-center justify-center gap-2">
                    {t.cta1}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border border-white/20 text-white hover:bg-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm font-semibold text-sm sm:text-base px-6 py-3 rounded-xl transition-all duration-300 group"
                >
                  <Link href="/manifesto" className="flex items-center justify-center gap-2">
                    {t.cta2}
                    <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Statistics Section */}
            <div className="lg:col-span-5">
              <div className="space-y-4">
                {/* Active Voters */}
                <div className={`p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-400/20 backdrop-blur-sm transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Vote size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">
                        {locale === 'en' ? 'Active Voters' : 'सक्रिय मतदाताहरू'}
                      </div>
                      <div className="text-xs text-white/70">
                        {locale === 'en' ? `${animatedStats.activeVoters.toLocaleString()} citizens` : `${animatedStats.activeVoters.toLocaleString()} नागरिकहरू`}
                      </div>
                    </div>
                    <div className="text-green-400 font-bold text-sm">
                      +{animatedPercentages.activeVotersPercent}%
                    </div>
                  </div>
                </div>
                
                {/* Community Circles */}
                <div className={`p-4 bg-gradient-to-r from-accent/10 to-accent/20 rounded-xl border border-accent/20 backdrop-blur-sm transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1200ms'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Users size={18} className="text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">
                        {locale === 'en' ? 'Community Circles' : 'सामुदायिक सर्कलहरू'}
                      </div>
                      <div className="text-xs text-white/70">
                        {locale === 'en' ? `${animatedStats.communityCircles} active groups` : `${animatedStats.communityCircles} सक्रिय समूहहरू`}
                      </div>
                    </div>
                    <div className="text-accent font-bold text-sm">
                      +{animatedPercentages.communityCirclesPercent}%
                    </div>
                  </div>
                </div>
                
                {/* Voice Tokens */}
                <div className={`p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-400/20 backdrop-blur-sm transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1400ms'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">
                        {locale === 'en' ? 'Voice Tokens' : 'भ्वाइस टोकनहरू'}
                      </div>
                      <div className="text-xs text-white/70">
                        {locale === 'en' ? `${animatedStats.voiceTokens.toFixed(1)}M distributed` : `${animatedStats.voiceTokens.toFixed(1)} लाख वितरित`}
                      </div>
                    </div>
                    <div className="text-green-400 font-bold text-sm">
                      +{animatedPercentages.voiceTokensPercent}%
                    </div>
                  </div>
                </div>
                
                {/* Democratic Participation Progress */}
                <div className={`p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-400/20 backdrop-blur-sm transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1600ms'}}>
                  <div className="flex justify-between text-xs text-white/70 mb-2">
                    <span>{locale === 'en' ? 'Democratic Participation' : 'लोकतान्त्रिक सहभागिता'}</span>
                    <span className="font-semibold text-white">{animatedStats.participation}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r from-red-500 via-blue-500 to-green-500 h-2 rounded-full transition-all duration-3000 ${isVisible ? '' : 'w-0'}`} 
                      style={{
                        width: `${animatedStats.participation}%`,
                        transitionDelay: '1800ms'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>


      </section>

      {/* Features Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/2 w-60 h-60 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '800ms'}}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering democratic participation through innovative technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 - Transparent Voting */}
            <div className={`group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 hover:scale-105 hover:-translate-y-3 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{transitionDelay: '1200ms'}}>
               {/* Border Effect */}
               <div className="absolute inset-0 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               {/* Icon Container */}
               <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20">
                 <Vote className="text-primary transition-all duration-500 group-hover:scale-110" size={28} />
               </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {locale === "en" ? "Transparent Voting" : "पारदर्शी मतदान"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {locale === "en" 
                  ? "Experience complete transparency in every vote. Our blockchain-based system ensures every decision is verifiable, immutable, and publicly auditable while maintaining voter privacy."
                  : "हरेक मतमा पूर्ण पारदर्शिता अनुभव गर्नुहोस्। हाम्रो ब्लकचेन-आधारित प्रणालीले मतदाताको गोपनीयता कायम राख्दै हरेक निर्णय प्रमाणित, अपरिवर्तनीय र सार्वजनिक रूपमा लेखापरीक्षण योग्य छ भनी सुनिश्चित गर्छ।"
                }
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">100% Verifiable</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Zero Fraud</span>
                </div>
              </div>
            </div>

            {/* Feature 2 - Community Circles */}
             <div className={`group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-700 hover:scale-105 hover:-translate-y-3 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{transitionDelay: '1400ms'}}>
               {/* Border Effect */}
               <div className="absolute inset-0 border border-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               {/* Floating Elements */}
               <div className="absolute top-4 right-4 w-2 h-2 bg-accent/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
               <div className="absolute bottom-4 right-4 w-1 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500" style={{animationDelay: '200ms'}}></div>
               
               {/* Icon Container */}
               <div className="relative w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent/20 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <Users className="text-accent transition-all duration-500 group-hover:scale-110 relative z-10" size={28} />
               </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                {locale === "en" ? "Community Circles" : "सामुदायिक सर्कल"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {locale === "en" 
                  ? "Join interest-based governance groups that align with your values. Collaborate with like-minded citizens to shape policies and drive meaningful change in your community."
                  : "तपाईंका मूल्यहरूसँग मेल खाने रुचि-आधारित शासन समूहमा सामेल हुनुहोस्। नीतिहरू आकार दिन र तपाईंको समुदायमा अर्थपूर्ण परिवर्तन ल्याउन समान विचारधारा भएका नागरिकहरूसँग सहयोग गर्नुहोस्।"
                }
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:animate-pulse"></div>
                  <span className="text-muted-foreground group-hover:text-accent transition-colors duration-300">50+ Active Groups</span>
                </div>
                <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-300" style={{transitionDelay: '100ms'}}>
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse" style={{animationDelay: '200ms'}}></div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">Real Impact</span>
                </div>
              </div>
            </div>

            {/* Feature 3 - Voice Tokens */}
            <div className={`group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 hover:scale-105 hover:-translate-y-3 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{transitionDelay: '1600ms'}}>
              {/* Border Effect */}
              <div className="absolute inset-0 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20">
                <Zap className="text-primary transition-all duration-500 group-hover:scale-110" size={28} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {locale === "en" ? "Voice Tokens" : "आवाज टोकन"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {locale === "en" 
                  ? "Earn tokens through active participation in democratic processes. Your engagement is rewarded with voting power that grows stronger as you contribute more to your community."
                  : "लोकतान्त्रिक प्रक्रियाहरूमा सक्रिय सहभागिता मार्फत टोकनहरू कमाउनुहोस्। तपाईंको संलग्नतालाई मतदान शक्तिको साथ पुरस्कृत गरिन्छ जुन तपाईंले आफ्नो समुदायमा बढी योगदान गर्दै जाँदा बलियो हुन्छ।"
                }
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Earn & Vote</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Fair Rewards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">
                {locale === "en" ? "Join 10,000+ active citizens shaping the future" : "भविष्य आकार दिने 10,000+ सक्रिय नागरिकहरूमा सामेल हुनुहोस्"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
