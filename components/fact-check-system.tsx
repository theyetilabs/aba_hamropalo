"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  Shield, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowLeft,
  Award,
  User,
  Calendar,
  MapPin,
  ExternalLink,
  RefreshCw,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

interface FactCheckSystemProps {
  locale: "en" | "ne"
  mode?: "enrollment" | "verification" | "reverify"
  initialData?: Partial<FactCheckerData>
  readonly?: boolean
}

interface FactCheckerData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  profession: string
  organization: string
  experience: string
  
  // Qualifications
  education: string
  certifications: string[]
  languages: string[]
  specializations: string[]
  
  // Portfolio
  portfolioUrl?: string
  sampleWork: string
  previousExperience: string
  references: string
  
  // Verification Status
  verificationStatus: "pending" | "verified" | "rejected"
  enrollmentDate?: string
  verifiedDate?: string
  notes?: string
  verifiedBadge?: boolean
  
  // Performance Metrics (for verified fact-checkers)
  totalChecks?: number
  accuracyRate?: number
  averageResponseTime?: number
  communityRating?: number
}

interface FactCheckRequest {
  id: string
  title: string
  description: string
  source: string
  submittedBy: string
  submittedDate: string
  status: "pending" | "in_progress" | "completed" | "disputed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  assignedTo?: string
  result?: "true" | "false" | "misleading" | "unverifiable"
  evidence?: string
  notes?: string
}

const content = {
  en: {
    title: "Fact-Check System",
    subtitle: "Join our community of verified fact-checkers",
    
    // Enrollment
    enrollmentTitle: "Fact-Checker Enrollment",
    enrollmentSubtitle: "Apply to become a verified fact-checker",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email Address",
    emailPlaceholder: "Enter your email address",
    phone: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    profession: "Profession",
    professionPlaceholder: "Enter your current profession",
    organization: "Organization",
    organizationPlaceholder: "Enter your organization/employer",
    experience: "Years of Experience",
    experiencePlaceholder: "Enter years of relevant experience",
    
    qualifications: "Qualifications",
    education: "Education Background",
    educationPlaceholder: "Describe your educational background",
    certifications: "Certifications",
    certificationsPlaceholder: "List relevant certifications (comma-separated)",
    languages: "Languages",
    languagesPlaceholder: "Languages you can fact-check in (comma-separated)",
    specializations: "Specializations",
    specializationsPlaceholder: "Areas of expertise (comma-separated)",
    
    portfolio: "Portfolio & Experience",
    portfolioUrl: "Portfolio URL",
    portfolioUrlPlaceholder: "Link to your portfolio or professional profile",
    sampleWork: "Sample Work",
    sampleWorkPlaceholder: "Describe examples of your fact-checking or research work",
    previousExperience: "Previous Experience",
    previousExperiencePlaceholder: "Describe your relevant experience in journalism, research, or fact-checking",
    references: "References",
    referencesPlaceholder: "Provide contact information for professional references",
    
    // Verification Dashboard
    verificationTitle: "Fact-Checker Dashboard",
    verificationSubtitle: "Manage fact-check requests and track your performance",
    pendingRequests: "Pending Requests",
    myAssignments: "My Assignments",
    completedChecks: "Completed Checks",
    performance: "Performance Metrics",
    
    // Request Management
    requestTitle: "Fact-Check Request",
    requestDescription: "Description",
    source: "Source",
    submittedBy: "Submitted By",
    submittedDate: "Submitted Date",
    priority: "Priority",
    category: "Category",
    status: "Status",
    assignedTo: "Assigned To",
    
    // Results
    result: "Verification Result",
    evidence: "Evidence",
    notes: "Notes",
    resultTrue: "True",
    resultFalse: "False",
    resultMisleading: "Misleading",
    resultUnverifiable: "Unverifiable",
    
    // Status
    pending: "Pending Review",
    verified: "Verified",
    rejected: "Rejected",
    inProgress: "In Progress",
    completed: "Completed",
    disputed: "Disputed",
    
    // Priority
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
    
    // Actions
    submit: "Submit Application",
    resubmit: "Resubmit Application",
    update: "Update Information",
    takeAssignment: "Take Assignment",
    submitResult: "Submit Result",
    viewDetails: "View Details",
    backToSettings: "Back to Settings",
    progress: "Progress",
    
    // Performance
    totalChecks: "Total Checks",
    accuracyRate: "Accuracy Rate",
    averageResponseTime: "Avg Response Time",
    communityRating: "Community Rating",
    hours: "hours",
    
    // Categories
    categories: {
      politics: "Politics",
      health: "Health",
      science: "Science",
      economics: "Economics",
      social: "Social Issues",
      technology: "Technology",
      environment: "Environment",
      other: "Other"
    },
    
    validationErrors: {
      fullNameRequired: "Full name is required",
      emailRequired: "Email address is required",
      phoneRequired: "Phone number is required",
      professionRequired: "Profession is required",
      organizationRequired: "Organization is required",
      experienceRequired: "Experience is required",
      educationRequired: "Education background is required",
      sampleWorkRequired: "Sample work description is required",
      previousExperienceRequired: "Previous experience is required",
      referencesRequired: "References are required",
      emailInvalid: "Please enter a valid email address",
      phoneInvalid: "Please enter a valid phone number",
    },
    
    success: "Application submitted successfully",
    successDesc: "Your fact-checker application has been submitted for review. You'll receive an update within 5-7 business days.",
    
    verificationBenefits: "Fact-Checker Benefits",
    benefitsList: [
      "Verified fact-checker badge",
      "Access to exclusive fact-checking tools",
      "Priority in community discussions",
      "Contribution to information accuracy",
      "Professional networking opportunities",
      "Performance-based recognition"
    ],
  },
  ne: {
    title: "तथ्य-जाँच प्रणाली",
    subtitle: "हाम्रो प्रमाणित तथ्य-जाँचकर्ताहरूको समुदायमा सामेल हुनुहोस्",
    
    // Enrollment
    enrollmentTitle: "तथ्य-जाँचकर्ता नामांकन",
    enrollmentSubtitle: "प्रमाणित तथ्य-जाँचकर्ता बन्नको लागि आवेदन दिनुहोस्",
    personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "आपनो पूरा नाम प्रविष्ट गर्नुहोस्",
    email: "इमेल ठेगाना",
    emailPlaceholder: "आपनो इमेल ठेगाना प्रविष्ट गर्नुहोस्",
    phone: "फोन नम्बर",
    phonePlaceholder: "आपनो फोन नम्बर प्रविष्ट गर्नुहोस्",
    profession: "पेशा",
    professionPlaceholder: "आपनो हालको पेशा प्रविष्ट गर्नुहोस्",
    organization: "संस्था",
    organizationPlaceholder: "आपनो संस्था/नियोक्ता प्रविष्ट गर्नुहोस्",
    experience: "अनुभवका वर्षहरू",
    experiencePlaceholder: "सान्दर्भिक अनुभवका वर्षहरू प्रविष्ट गर्नुहोस्",
    
    qualifications: "योग्यताहरू",
    education: "शैक्षिक पृष्ठभूमि",
    educationPlaceholder: "आपनो शैक्षिक पृष्ठभूमि वर्णन गर्नुहोस्",
    certifications: "प्रमाणपत्रहरू",
    certificationsPlaceholder: "सान्दर्भिक प्रमाणपत्रहरू सूचीबद्ध गर्नुहोस् (अल्पविराम-विभाजित)",
    languages: "भाषाहरू",
    languagesPlaceholder: "तपाईंले तथ्य-जाँच गर्न सक्ने भाषाहरू (अल्पविराम-विभाजित)",
    specializations: "विशेषज्ञताहरू",
    specializationsPlaceholder: "विशेषज्ञताका क्षेत्रहरू (अल्पविराम-विभाजित)",
    
    portfolio: "पोर्टफोलियो र अनुभव",
    portfolioUrl: "पोर्टफोलियो URL",
    portfolioUrlPlaceholder: "आपनो पोर्टफोलियो वा व्यावसायिक प्रोफाइलको लिङ्क",
    sampleWork: "नमूना कार्य",
    sampleWorkPlaceholder: "आपनो तथ्य-जाँच वा अनुसन्धान कार्यका उदाहरणहरू वर्णन गर्नुहोस्",
    previousExperience: "पूर्व अनुभव",
    previousExperiencePlaceholder: "पत्रकारिता, अनुसन्धान, वा तथ्य-जाँचमा आपनो सान्दर्भिक अनुभव वर्णन गर्नुहोस्",
    references: "सन्दर्भहरू",
    referencesPlaceholder: "व्यावसायिक सन्दर्भहरूको सम्पर्क जानकारी प्रदान गर्नुहोस्",
    
    // Verification Dashboard
    verificationTitle: "तथ्य-जाँचकर्ता ड्यासबोर्ड",
    verificationSubtitle: "तथ्य-जाँच अनुरोधहरू व्यवस्थापन गर्नुहोस् र आपनो प्रदर्शन ट्र्याक गर्नुहोस्",
    pendingRequests: "पेन्डिङ अनुरोधहरू",
    myAssignments: "मेरो असाइनमेन्टहरू",
    completedChecks: "पूरा भएका जाँचहरू",
    performance: "प्रदर्शन मेट्रिक्स",
    
    // Request Management
    requestTitle: "तथ्य-जाँच अनुरोध",
    requestDescription: "विवरण",
    source: "स्रोत",
    submittedBy: "द्वारा जमा गरिएको",
    submittedDate: "जमा गरिएको मिति",
    priority: "प्राथमिकता",
    category: "श्रेणी",
    status: "स्थिति",
    assignedTo: "असाइन गरिएको",
    
    // Results
    result: "प्रमाणीकरण परिणाम",
    evidence: "प्रमाण",
    notes: "नोटहरू",
    resultTrue: "सत्य",
    resultFalse: "झूटो",
    resultMisleading: "भ्रामक",
    resultUnverifiable: "अप्रमाणित",
    
    // Status
    pending: "समीक्षा अन्तर्गत",
    verified: "प्रमाणित",
    rejected: "अस्वीकृत",
    inProgress: "प्रगतिमा",
    completed: "पूरा भयो",
    disputed: "विवादित",
    
    // Priority
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    urgent: "तत्काल",
    
    // Actions
    submit: "आवेदन जमा गर्नुहोस्",
    resubmit: "आवेदन पुनः जमा गर्नुहोस्",
    update: "जानकारी अपडेट गर्नुहोस्",
    takeAssignment: "असाइनमेन्ट लिनुहोस्",
    submitResult: "परिणाम जमा गर्नुहोस्",
    viewDetails: "विवरण हेर्नुहोस्",
    backToSettings: "सेटिङहरूमा फर्कनुहोस्",
    progress: "प्रगति",
    
    // Performance
    totalChecks: "कुल जाँचहरू",
    accuracyRate: "सटीकता दर",
    averageResponseTime: "औसत प्रतिक्रिया समय",
    communityRating: "सामुदायिक मूल्याङ्कन",
    hours: "घण्टा",
    
    // Categories
    categories: {
      politics: "राजनीति",
      health: "स्वास्थ्य",
      science: "विज्ञान",
      economics: "अर्थशास्त्र",
      social: "सामाजिक मुद्दाहरू",
      technology: "प्रविधि",
      environment: "वातावरण",
      other: "अन्य"
    },
    
    validationErrors: {
      fullNameRequired: "पूरा नाम आवश्यक छ",
      emailRequired: "इमेल ठेगाना आवश्यक छ",
      phoneRequired: "फोन नम्बर आवश्यक छ",
      professionRequired: "पेशा आवश्यक छ",
      organizationRequired: "संस्था आवश्यक छ",
      experienceRequired: "अनुभव आवश्यक छ",
      educationRequired: "शैक्षिक पृष्ठभूमि आवश्यक छ",
      sampleWorkRequired: "नमूना कार्य विवरण आवश्यक छ",
      previousExperienceRequired: "पूर्व अनुभव आवश्यक छ",
      referencesRequired: "सन्दर्भहरू आवश्यक छ",
      emailInvalid: "कृपया मान्य इमेल ठेगाना प्रविष्ट गर्नुहोस्",
      phoneInvalid: "कृपया मान्य फोन नम्बर प्रविष्ट गर्नुहोस्",
    },
    
    success: "आवेदन सफलतापूर्वक जमा भयो",
    successDesc: "आपनो तथ्य-जाँचकर्ता आवेदन समीक्षाको लागि जमा गरिएको छ। तपाईंले ५-७ कार्य दिन भित्र अपडेट प्राप्त गर्नुहुनेछ।",
    
    verificationBenefits: "तथ्य-जाँचकर्ता फाइदाहरू",
    benefitsList: [
      "प्रमाणित तथ्य-जाँचकर्ता ब्याज",
      "विशेष तथ्य-जाँच उपकरणहरूमा पहुँच",
      "सामुदायिक छलफलमा प्राथमिकता",
      "सूचना सटीकतामा योगदान",
      "व्यावसायिक नेटवर्किङ अवसरहरू",
      "प्रदर्शन-आधारित मान्यता"
    ],
  },
}

// Mock data for demonstration
const mockFactCheckRequests: FactCheckRequest[] = [
  {
    id: "1",
    title: "Government Budget Allocation Claims",
    description: "Claims about increased education budget allocation in the new fiscal year",
    source: "Social Media Post",
    submittedBy: "John Doe",
    submittedDate: "2024-10-20",
    status: "pending",
    priority: "high",
    category: "politics"
  },
  {
    id: "2", 
    title: "Health Statistics Verification",
    description: "Statistics about vaccination rates in rural areas",
    source: "News Article",
    submittedBy: "Jane Smith",
    submittedDate: "2024-10-19",
    status: "in_progress",
    priority: "medium",
    category: "health",
    assignedTo: "Current User"
  }
]

export default function FactCheckSystem({ 
  locale, 
  mode = "enrollment",
  initialData,
  readonly = false 
}: FactCheckSystemProps) {
  const [factCheckerData, setFactCheckerData] = useState<FactCheckerData>({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    organization: "",
    experience: "",
    education: "",
    certifications: [],
    languages: [],
    specializations: [],
    sampleWork: "",
    previousExperience: "",
    references: "",
    verificationStatus: "pending",
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completionProgress, setCompletionProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("pending")
  const { toast } = useToast()
  const t = content[locale]

  // Calculate completion progress for enrollment
  useEffect(() => {
    if (mode === "enrollment") {
      const fields = [
        factCheckerData.fullName,
        factCheckerData.email,
        factCheckerData.phone,
        factCheckerData.profession,
        factCheckerData.organization,
        factCheckerData.experience,
        factCheckerData.education,
        factCheckerData.sampleWork,
        factCheckerData.previousExperience,
        factCheckerData.references
      ]
      const completedFields = fields.filter(field => field).length
      setCompletionProgress((completedFields / fields.length) * 100)
    }
  }, [factCheckerData, mode])

  const handleInputChange = (field: keyof FactCheckerData, value: string) => {
    setFactCheckerData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleArrayInputChange = (field: keyof FactCheckerData, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item)
    setFactCheckerData(prev => ({ ...prev, [field]: arrayValue }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!factCheckerData.fullName.trim()) {
      newErrors.fullName = t.validationErrors.fullNameRequired
    }
    if (!factCheckerData.email.trim()) {
      newErrors.email = t.validationErrors.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(factCheckerData.email)) {
      newErrors.email = t.validationErrors.emailInvalid
    }
    if (!factCheckerData.phone.trim()) {
      newErrors.phone = t.validationErrors.phoneRequired
    }
    if (!factCheckerData.profession.trim()) {
      newErrors.profession = t.validationErrors.professionRequired
    }
    if (!factCheckerData.organization.trim()) {
      newErrors.organization = t.validationErrors.organizationRequired
    }
    if (!factCheckerData.experience.trim()) {
      newErrors.experience = t.validationErrors.experienceRequired
    }
    if (!factCheckerData.education.trim()) {
      newErrors.education = t.validationErrors.educationRequired
    }
    if (!factCheckerData.sampleWork.trim()) {
      newErrors.sampleWork = t.validationErrors.sampleWorkRequired
    }
    if (!factCheckerData.previousExperience.trim()) {
      newErrors.previousExperience = t.validationErrors.previousExperienceRequired
    }
    if (!factCheckerData.references.trim()) {
      newErrors.references = t.validationErrors.referencesRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const updatedData = {
        ...factCheckerData,
        verificationStatus: "pending" as const,
        enrollmentDate: new Date().toISOString().split('T')[0]
      }
      
      setFactCheckerData(updatedData)
      
      toast({
        title: t.success,
        description: t.successDesc,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Enrollment Mode
  if (mode === "enrollment") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link 
                href="/settings" 
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToSettings}
              </Link>
              {factCheckerData.verifiedBadge && (
                <Badge variant="default" className="bg-green-600">
                  <Award className="h-3 w-3 mr-1" />
                  Verified Fact-Checker
                </Badge>
              )}
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.enrollmentTitle}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {t.enrollmentSubtitle}
              </p>
              
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{t.progress}</span>
                  <span>{Math.round(completionProgress)}%</span>
                </div>
                <Progress value={completionProgress} className="h-2" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-600" />
                  <CardTitle>{t.personalInfo}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input
                      id="fullName"
                      value={factCheckerData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      disabled={readonly}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={factCheckerData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder={t.emailPlaceholder}
                      disabled={readonly}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input
                      id="phone"
                      value={factCheckerData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder={t.phonePlaceholder}
                      disabled={readonly}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">{t.profession}</Label>
                    <Input
                      id="profession"
                      value={factCheckerData.profession}
                      onChange={(e) => handleInputChange("profession", e.target.value)}
                      placeholder={t.professionPlaceholder}
                      disabled={readonly}
                    />
                    {errors.profession && (
                      <p className="text-sm text-red-600">{errors.profession}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">{t.organization}</Label>
                    <Input
                      id="organization"
                      value={factCheckerData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder={t.organizationPlaceholder}
                      disabled={readonly}
                    />
                    {errors.organization && (
                      <p className="text-sm text-red-600">{errors.organization}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">{t.experience}</Label>
                    <Input
                      id="experience"
                      value={factCheckerData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder={t.experiencePlaceholder}
                      disabled={readonly}
                    />
                    {errors.experience && (
                      <p className="text-sm text-red-600">{errors.experience}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-blue-600" />
                  <CardTitle>{t.qualifications}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="education">{t.education}</Label>
                  <Textarea
                    id="education"
                    value={factCheckerData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder={t.educationPlaceholder}
                    disabled={readonly}
                    rows={3}
                  />
                  {errors.education && (
                    <p className="text-sm text-red-600">{errors.education}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="certifications">{t.certifications}</Label>
                    <Input
                      id="certifications"
                      value={factCheckerData.certifications.join(', ')}
                      onChange={(e) => handleArrayInputChange("certifications", e.target.value)}
                      placeholder={t.certificationsPlaceholder}
                      disabled={readonly}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages">{t.languages}</Label>
                    <Input
                      id="languages"
                      value={factCheckerData.languages.join(', ')}
                      onChange={(e) => handleArrayInputChange("languages", e.target.value)}
                      placeholder={t.languagesPlaceholder}
                      disabled={readonly}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specializations">{t.specializations}</Label>
                  <Input
                    id="specializations"
                    value={factCheckerData.specializations.join(', ')}
                    onChange={(e) => handleArrayInputChange("specializations", e.target.value)}
                    placeholder={t.specializationsPlaceholder}
                    disabled={readonly}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Portfolio & Experience */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <CardTitle>{t.portfolio}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">{t.portfolioUrl}</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    value={factCheckerData.portfolioUrl || ""}
                    onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                    placeholder={t.portfolioUrlPlaceholder}
                    disabled={readonly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sampleWork">{t.sampleWork}</Label>
                  <Textarea
                    id="sampleWork"
                    value={factCheckerData.sampleWork}
                    onChange={(e) => handleInputChange("sampleWork", e.target.value)}
                    placeholder={t.sampleWorkPlaceholder}
                    disabled={readonly}
                    rows={4}
                  />
                  {errors.sampleWork && (
                    <p className="text-sm text-red-600">{errors.sampleWork}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousExperience">{t.previousExperience}</Label>
                  <Textarea
                    id="previousExperience"
                    value={factCheckerData.previousExperience}
                    onChange={(e) => handleInputChange("previousExperience", e.target.value)}
                    placeholder={t.previousExperiencePlaceholder}
                    disabled={readonly}
                    rows={4}
                  />
                  {errors.previousExperience && (
                    <p className="text-sm text-red-600">{errors.previousExperience}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="references">{t.references}</Label>
                  <Textarea
                    id="references"
                    value={factCheckerData.references}
                    onChange={(e) => handleInputChange("references", e.target.value)}
                    placeholder={t.referencesPlaceholder}
                    disabled={readonly}
                    rows={3}
                  />
                  {errors.references && (
                    <p className="text-sm text-red-600">{errors.references}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-blue-600" />
                  <CardTitle>{t.verificationBenefits}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.benefitsList.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Submit Button */}
            {!readonly && (
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : factCheckerData.verificationStatus === "rejected" ? (
                    t.resubmit
                  ) : factCheckerData.enrollmentDate ? (
                    t.update
                  ) : (
                    t.submit
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Verification Dashboard Mode
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/settings" 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToSettings}
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-600">
                <Award className="h-3 w-3 mr-1" />
                Verified Fact-Checker
              </Badge>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.verificationTitle}
            </h1>
            <p className="text-lg text-gray-600">
              {t.verificationSubtitle}
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.totalChecks}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {factCheckerData.totalChecks || 0}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.accuracyRate}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {factCheckerData.accuracyRate || 0}%
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.averageResponseTime}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {factCheckerData.averageResponseTime || 0} {t.hours}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t.communityRating}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {factCheckerData.communityRating || 0}/5
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fact-Check Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Search className="h-6 w-6 text-blue-600" />
              Fact-Check Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              {["pending", "assigned", "completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "pending" ? t.pendingRequests :
                   tab === "assigned" ? t.myAssignments : t.completedChecks}
                </button>
              ))}
            </div>

            {/* Request List */}
            <div className="space-y-4">
              {mockFactCheckRequests.map((request) => (
                <Card key={request.id} className="border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{request.title}</h3>
                        <p className="text-gray-600 mb-3">{request.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{t.source}: {request.source}</span>
                          <span>{t.submittedBy}: {request.submittedBy}</span>
                          <span>{t.submittedDate}: {request.submittedDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          request.priority === "urgent" ? "destructive" :
                          request.priority === "high" ? "default" :
                          request.priority === "medium" ? "secondary" : "outline"
                        }>
                          {request.priority === "urgent" ? t.urgent :
                           request.priority === "high" ? t.high :
                           request.priority === "medium" ? t.medium : t.low}
                        </Badge>
                        
                        <Badge variant={
                          request.status === "completed" ? "default" :
                          request.status === "in_progress" ? "secondary" : "outline"
                        }>
                          {request.status === "completed" ? t.completed :
                           request.status === "in_progress" ? t.inProgress :
                           request.status === "disputed" ? t.disputed : t.pending}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t.category}: {t.categories[request.category as keyof typeof t.categories]}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          {t.viewDetails}
                        </Button>
                        {request.status === "pending" && (
                          <Button size="sm">
                            {t.takeAssignment}
                          </Button>
                        )}
                        {request.status === "in_progress" && request.assignedTo === "Current User" && (
                          <Button size="sm">
                            {t.submitResult}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}