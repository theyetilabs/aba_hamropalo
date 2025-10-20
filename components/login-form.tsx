"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface LoginFormProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to your AbaHamroPalo account",
    phone: "Phone Number",
    phonePlaceholder: "+977 98...",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    signUp: "Sign up here",
    invalidPhone: "Please enter a valid phone number",
    invalidPassword: "Password must be at least 6 characters",
    loginError: "Invalid phone number or password",
    loginSuccess: "Welcome back!",
    demoAccount: "Demo Account",
    demoCredentials: "Phone: 9802834141 | Password: password",
    useDemoAccount: "Use Demo Account",
  },
  ne: {
    title: "स्वागतम",
    subtitle: "आपनो अबा हाम्रो पालो खातामा साइन इन गर्नुहोस्",
    phone: "फोन नम्बर",
    phonePlaceholder: "+977 98...",
    password: "पासवर्ड",
    passwordPlaceholder: "आपनो पासवर्ड प्रविष्ट गर्नुहोस्",
    rememberMe: "मलाई याद राख्नुहोस्",
    forgotPassword: "पासवर्ड भुल्नुभयो?",
    signIn: "साइन इन गर्नुहोस्",
    noAccount: "खाता छैन?",
    signUp: "यहाँ साइन अप गर्नुहोस्",
    invalidPhone: "कृपया वैध फोन नम्बर प्रविष्ट गर्नुहोस्",
    invalidPassword: "पासवर्ड कम्तिमा 6 वर्ण हुनुपर्छ",
    loginError: "अमान्य फोन नम्बर वा पासवर्ड",
    loginSuccess: "स्वागतम!",
    demoAccount: "डेमो खाता",
    demoCredentials: "फोन: 9802834141 | पासवर्ड: password",
    useDemoAccount: "डेमो खाता प्रयोग गर्नुहोस्",
  },
}

export default function LoginForm({ locale }: LoginFormProps) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const { login, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const t = content[locale]

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const validateForm = () => {
    if (!phone) {
      toast({
        title: locale === "en" ? "Missing Phone Number" : "फोन नम्बर हराएको",
        description: t.invalidPhone,
        variant: "destructive",
      })
      return false
    }

    const phoneRegex = /^(\+977)?[0-9]{10}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      toast({
        title: locale === "en" ? "Invalid Phone Number" : "अमान्य फोन नम्बर",
        description: t.invalidPhone,
        variant: "destructive",
      })
      return false
    }

    if (!password) {
      toast({
        title: locale === "en" ? "Missing Password" : "पासवर्ड हराएको",
        description: locale === "en" ? "Please enter your password" : "कृपया आपनो पासवर्ड प्रविष्ट गर्नुहोस्",
        variant: "destructive",
      })
      return false
    }

    if (password.length < 6) {
      toast({
        title: locale === "en" ? "Invalid Password" : "अमान्य पासवर्ड",
        description: t.invalidPassword,
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const success = await login(phone, password)
      
      if (success) {
        toast({
          title: t.loginSuccess,
          description: locale === "en" ? "Welcome back, Prem Regmi!" : "स्वागतम, प्रेम रेग्मी!",
        })
        router.push('/')
      } else {
        toast({
          title: locale === "en" ? "Login Failed" : "लगइन असफल",
          description: t.loginError,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: locale === "en" ? "Login Error" : "लगइन त्रुटि",
        description: locale === "en" ? "An error occurred during login" : "लगइनको क्रममा त्रुटि भयो",
        variant: "destructive",
      })
    }
  }

  const handleDemoAccountFill = () => {
    setPhone("9802834141")
    setPassword("password")
    toast({
      title: "Demo Account Loaded",
      description: "Demo credentials have been filled in",
    })
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            linear-gradient(45deg, #1e40af 25%, transparent 25%), 
            linear-gradient(-45deg, #1e40af 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #1e40af 75%), 
            linear-gradient(-45deg, transparent 75%, #1e40af 75%)
          `,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
        }}
      />
      
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6 group">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-blue-200 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mx-auto">
              <img 
                src="/hamropalo.png" 
                alt="Hamro Palo Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-gray-600 text-base mb-2">{t.subtitle}</p>
          <div className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            AbaHamroPalo
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/98 border border-blue-200 shadow-xl">
          <CardContent className="p-6">
            {/* Demo User Hint */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">{t.demoAccount}</h3>
                  <p className="text-xs text-blue-600 leading-relaxed">
                    {t.demoCredentials}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDemoAccountFill}
                  className="text-xs px-3 py-2 h-auto border-blue-400 text-blue-700 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md whitespace-nowrap"
                  title={t.useDemoAccount}
                >
                  {t.useDemoAccount}
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-800">{t.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-base border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-blue-50/50 transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-800">{t.password}</Label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {t.forgotPassword}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12 text-base border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-blue-50/50 transition-all duration-200"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors p-1 rounded"
                    disabled={isLoading}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3 pt-1">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-blue-300"
                />
                <Label htmlFor="rememberMe" className="cursor-pointer font-normal text-gray-700 text-sm">
                  {t.rememberMe}
                </Label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {locale === "en" ? "Signing in..." : "साइन इन गरिँदै..."}
                  </div>
                ) : (
                  t.signIn
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-100">
                {t.noAccount}{" "}
                <Link href="/register-interest" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline">
                  {t.signUp}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <p className="text-center text-xs text-gray-500 mt-6 px-4 leading-relaxed">
          {locale === "en"
            ? "By signing in, you agree to our Terms of Service and Privacy Policy"
            : "साइन इन गरेर, तपाई हाम्रो सेवा शर्त र गोपनीयता नीति सहमत गर्नुहुन्छ"}
        </p>
      </div>
    </section>
  )
}
