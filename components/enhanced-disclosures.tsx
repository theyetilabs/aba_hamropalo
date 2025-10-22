"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  AlertTriangle, 
  ArrowLeft,
  Briefcase, 
  Coins, 
  FileText, 
  Plus, 
  Trash2, 
  Upload,
  Shield,
  Building,
  TrendingUp,
  Users,
  Scale,
  Eye
} from "lucide-react"
import Link from "next/link"

interface EnhancedDisclosuresProps {
  locale: "en" | "ne"
  onDisclosureChange?: (disclosures: DisclosureData) => void
  initialData?: Partial<DisclosureData>
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

interface PoliticalBackground {
  id: string
  previousWork: string
  workDuration: string
  workDescription: string
  annualIncome: string
  incomeSource: string
  politicalParty?: string
  partyDuration?: string
  partyRole?: string
  achievements: string
  briberyDeclaration: boolean
  corruptionDeclaration: boolean
  additionalInfo?: string
}

interface DisclosureData {
  allegations: Allegation[]
  portfolio: PortfolioItem[]
  financialInterests: FinancialInterest[]
  politicalBackground: PoliticalBackground[]
  hasNoDisclosures: boolean
  additionalNotes: string
}

const content = {
  en: {
    title: "Comprehensive Disclosures",
    subtitle: "Provide transparent information about allegations, portfolio, and financial interests",
    backToProfile: "Back to Profile",
    
    // Tabs
    allegations: "Allegations",
    portfolio: "Portfolio & Affiliations",
    financial: "Financial Interests",
    political: "Political Background",
    summary: "Summary",
    
    // Allegations
    allegationsTitle: "Legal Allegations & Proceedings",
    allegationsDesc: "Disclose any legal allegations, proceedings, or investigations",
    addAllegation: "Add Allegation",
    allegationType: "Type of Allegation",
    allegationTypes: {
      criminal: "Criminal",
      civil: "Civil",
      administrative: "Administrative",
      regulatory: "Regulatory",
      ethics: "Ethics Violation",
      other: "Other"
    },
    allegationDescription: "Description",
    allegationStatus: "Current Status",
    allegationStatuses: {
      pending: "Pending",
      resolved: "Resolved",
      dismissed: "Dismissed",
      ongoing: "Ongoing"
    },
    allegationDate: "Date Filed/Reported",
    uploadDocuments: "Upload Supporting Documents",
    
    // Portfolio
    portfolioTitle: "Professional Portfolio & Affiliations",
    portfolioDesc: "List your business interests, board positions, and professional affiliations",
    addPortfolioItem: "Add Portfolio Item",
    portfolioType: "Type",
    portfolioTypes: {
      board: "Board Position",
      executive: "Executive Role",
      advisory: "Advisory Position",
      investment: "Investment/Ownership",
      partnership: "Partnership",
      consulting: "Consulting",
      other: "Other"
    },
    organization: "Organization/Company",
    position: "Position/Role",
    startDate: "Start Date",
    endDate: "End Date",
    currentPosition: "Current Position",
    portfolioDescription: "Description of Role/Interest",
    
    // Financial
    financialTitle: "Financial Interests & Conflicts",
    financialDesc: "Declare financial interests that may create conflicts of interest",
    addFinancialInterest: "Add Financial Interest",
    financialType: "Type of Interest",
    financialTypes: {
      stocks: "Stocks/Securities",
      bonds: "Bonds",
      realEstate: "Real Estate",
      business: "Business Ownership",
      trust: "Trust/Fund",
      contract: "Government Contract",
      other: "Other"
    },
    entity: "Entity/Company",
    value: "Estimated Value",
    percentage: "Ownership Percentage",
    financialDescription: "Description",
    potentialConflict: "Potential Conflict of Interest",
    
    // Political Background
    politicalTitle: "Political Background & Experience",
    politicalDesc: "Provide information about your political experience, income, and integrity declarations",
    addPoliticalBackground: "Add Political Background",
    previousWork: "Previous Work/Profession",
    workDuration: "Duration of Work",
    workDescription: "Description of Work",
    annualIncome: "Annual Income (NPR)",
    incomeSource: "Primary Source of Income",
    politicalParty: "Political Party Affiliation",
    partyDuration: "Duration with Party",
    partyRole: "Role in Party",
    achievements: "Notable Achievements",
    briberyDeclaration: "I declare that I have never given or received bribes",
    corruptionDeclaration: "I declare that I have never been involved in corruption",
    politicalAdditionalInfo: "Additional Political Information",
    
    // Common
    noDisclosures: "I have no disclosures to make",
    additionalNotes: "Additional Notes",
    additionalNotesPlaceholder: "Any additional information you'd like to provide...",
    remove: "Remove",
    required: "Required",
    optional: "Optional",
    
    // Summary
    summaryTitle: "Disclosure Summary",
    summaryDesc: "Review all your disclosures before submitting",
    totalAllegations: "Total Allegations",
    totalPortfolio: "Portfolio Items",
    totalFinancial: "Financial Interests",
    totalPolitical: "Political Background",
    completionRate: "Completion Rate",
    
    // Validation
    pleaseProvideDescription: "Please provide a description",
    pleaseSelectType: "Please select a type",
    pleaseProvideOrganization: "Please provide organization name",
    pleaseProvideEntity: "Please provide entity name",
    
    // Status badges
    verified: "Verified",
    pending: "Pending Review",
    incomplete: "Incomplete"
  },
  ne: {
    title: "व्यापक प्रकटीकरण",
    subtitle: "आरोप, पोर्टफोलियो, र आर्थिक हितहरूको बारेमा पारदर्शी जानकारी प्रदान गर्नुहोस्",
    backToProfile: "प्रोफाइलमा फर्कनुहोस्",
    
    // Tabs
    allegations: "आरोपहरू",
    portfolio: "पोर्टफोलियो र सम्बद्धताहरू",
    financial: "आर्थिक हितहरू",
    political: "राजनीतिक पृष्ठभूमि",
    summary: "सारांश",
    
    // Allegations
    allegationsTitle: "कानुनी आरोप र कार्यवाही",
    allegationsDesc: "कुनै पनि कानुनी आरोप, कार्यवाही, वा अनुसन्धान प्रकट गर्नुहोस्",
    addAllegation: "आरोप थप्नुहोस्",
    allegationType: "आरोपको प्रकार",
    allegationTypes: {
      criminal: "फौजदारी",
      civil: "नागरिक",
      administrative: "प्रशासनिक",
      regulatory: "नियामक",
      ethics: "नैतिकता उल्लंघन",
      other: "अन्य"
    },
    allegationDescription: "विवरण",
    allegationStatus: "वर्तमान स्थिति",
    allegationStatuses: {
      pending: "विचाराधीन",
      resolved: "समाधान भएको",
      dismissed: "खारेज",
      ongoing: "जारी"
    },
    allegationDate: "दायर/रिपोर्ट गरिएको मिति",
    uploadDocuments: "सहायक कागजातहरू अपलोड गर्नुहोस्",
    
    // Portfolio
    portfolioTitle: "व्यावसायिक पोर्टफोलियो र सम्बद्धताहरू",
    portfolioDesc: "आपनो व्यापारिक हित, बोर्ड पदहरू, र व्यावसायिक सम्बद्धताहरू सूचीबद्ध गर्नुहोस्",
    addPortfolioItem: "पोर्टफोलियो वस्तु थप्नुहोस्",
    portfolioType: "प्रकार",
    portfolioTypes: {
      board: "बोर्ड पद",
      executive: "कार्यकारी भूमिका",
      advisory: "सल्लाहकार पद",
      investment: "लगानी/स्वामित्व",
      partnership: "साझेदारी",
      consulting: "परामर्श",
      other: "अन्य"
    },
    organization: "संस्था/कम्पनी",
    position: "पद/भूमिका",
    startDate: "सुरु मिति",
    endDate: "अन्त्य मिति",
    currentPosition: "वर्तमान पद",
    portfolioDescription: "भूमिका/हितको विवरण",
    
    // Financial
    financialTitle: "आर्थिक हित र द्वन्द्व",
    financialDesc: "हितको द्वन्द्व सिर्जना गर्न सक्ने आर्थिक हितहरू घोषणा गर्नुहोस्",
    addFinancialInterest: "आर्थिक हित थप्नुहोस्",
    financialType: "हितको प्रकार",
    financialTypes: {
      stocks: "स्टक/धितोपत्र",
      bonds: "बन्ड",
      realEstate: "घर जग्गा",
      business: "व्यापारिक स्वामित्व",
      trust: "ट्रस्ट/कोष",
      contract: "सरकारी सम्झौता",
      other: "अन्य"
    },
    entity: "संस्था/कम्पनी",
    value: "अनुमानित मूल्य",
    percentage: "स्वामित्व प्रतिशत",
    financialDescription: "विवरण",
    potentialConflict: "सम्भावित हितको द्वन्द्व",
    
    // Political Background
    politicalTitle: "राजनीतिक पृष्ठभूमि र अनुभव",
    politicalDesc: "आपनो राजनीतिक अनुभव, आम्दानी, र इमानदारी घोषणाको बारेमा जानकारी प्रदान गर्नुहोस्",
    addPoliticalBackground: "राजनीतिक पृष्ठभूमि थप्नुहोस्",
    previousWork: "अघिल्लो काम/पेशा",
    workDuration: "कामको अवधि",
    workDescription: "कामको विवरण",
    annualIncome: "वार्षिक आम्दानी (रु.)",
    incomeSource: "आम्दानीको मुख्य स्रोत",
    politicalParty: "राजनीतिक दलको सम्बद्धता",
    partyDuration: "दलसँगको अवधि",
    partyRole: "दलमा भूमिका",
    achievements: "उल्लेखनीय उपलब्धिहरू",
    briberyDeclaration: "म घोषणा गर्छु कि मैले कहिल्यै घूस दिएको वा लिएको छैन",
    corruptionDeclaration: "म घोषणा गर्छु कि म कहिल्यै भ्रष्टाचारमा संलग्न भएको छैन",
    politicalAdditionalInfo: "थप राजनीतिक जानकारी",
    
    // Common
    noDisclosures: "मसँग कुनै प्रकटीकरण छैन",
    additionalNotes: "थप टिप्पणीहरू",
    additionalNotesPlaceholder: "तपाईले प्रदान गर्न चाहनुभएको कुनै अतिरिक्त जानकारी...",
    remove: "हटाउनुहोस्",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    
    // Summary
    summaryTitle: "प्रकटीकरण सारांश",
    summaryDesc: "पेश गर्नु अघि आपना सबै प्रकटीकरणहरूको समीक्षा गर्नुहोस्",
    totalAllegations: "कुल आरोपहरू",
    totalPortfolio: "पोर्टफोलियो वस्तुहरू",
    totalFinancial: "आर्थिक हितहरू",
    totalPolitical: "राजनीतिक पृष्ठभूमि",
    completionRate: "पूर्णता दर",
    
    // Validation
    pleaseProvideDescription: "कृपया विवरण प्रदान गर्नुहोस्",
    pleaseSelectType: "कृपया प्रकार चयन गर्नुहोस्",
    pleaseProvideOrganization: "कृपया संस्थाको नाम प्रदान गर्नुहोस्",
    pleaseProvideEntity: "कृपया संस्थाको नाम प्रदान गर्नुहोस्",
    
    // Status badges
    verified: "प्रमाणित",
    pending: "समीक्षाधीन",
    incomplete: "अपूर्ण"
  }
}

export default function EnhancedDisclosures({ 
  locale, 
  onDisclosureChange, 
  initialData 
}: EnhancedDisclosuresProps) {
  const [disclosureData, setDisclosureData] = useState<DisclosureData>({
    allegations: initialData?.allegations || [],
    portfolio: initialData?.portfolio || [],
    financialInterests: initialData?.financialInterests || [],
    politicalBackground: initialData?.politicalBackground || [],
    hasNoDisclosures: initialData?.hasNoDisclosures || false,
    additionalNotes: initialData?.additionalNotes || ""
  })

  const [activeTab, setActiveTab] = useState("allegations")

  const t = content[locale]

  // Calculate completion rate
  const calculateCompletionRate = () => {
    if (disclosureData.hasNoDisclosures) return 100
    
    let totalFields = 0
    let completedFields = 0

    // Count allegations
    disclosureData.allegations.forEach(allegation => {
      totalFields += 4 // type, description, status, date
      if (allegation.type) completedFields++
      if (allegation.description) completedFields++
      if (allegation.status) completedFields++
      if (allegation.date) completedFields++
    })

    // Count portfolio items
    disclosureData.portfolio.forEach(item => {
      totalFields += 5 // type, organization, position, startDate, description
      if (item.type) completedFields++
      if (item.organization) completedFields++
      if (item.position) completedFields++
      if (item.startDate) completedFields++
      if (item.description) completedFields++
    })

    // Count financial interests
    disclosureData.financialInterests.forEach(interest => {
      totalFields += 4 // type, entity, value, description
      if (interest.type) completedFields++
      if (interest.entity) completedFields++
      if (interest.value) completedFields++
      if (interest.description) completedFields++
    })

    // Count political background
    disclosureData.politicalBackground.forEach(political => {
      totalFields += 7 // previousWork, workDuration, workDescription, annualIncome, incomeSource, achievements, declarations
      if (political.previousWork) completedFields++
      if (political.workDuration) completedFields++
      if (political.workDescription) completedFields++
      if (political.annualIncome) completedFields++
      if (political.incomeSource) completedFields++
      if (political.achievements) completedFields++
      if (political.briberyDeclaration && political.corruptionDeclaration) completedFields++
    })

    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0
  }

  // Handle data changes
  const updateDisclosureData = (newData: Partial<DisclosureData>) => {
    const updated = { ...disclosureData, ...newData }
    setDisclosureData(updated)
    onDisclosureChange?.(updated)
  }

  // Allegation handlers
  const addAllegation = () => {
    const newAllegation: Allegation = {
      id: Date.now().toString(),
      type: "",
      description: "",
      status: "",
      date: "",
      documents: []
    }
    updateDisclosureData({
      allegations: [...disclosureData.allegations, newAllegation]
    })
  }

  const updateAllegation = (id: string, updates: Partial<Allegation>) => {
    updateDisclosureData({
      allegations: disclosureData.allegations.map(allegation =>
        allegation.id === id ? { ...allegation, ...updates } : allegation
      )
    })
  }

  const removeAllegation = (id: string) => {
    updateDisclosureData({
      allegations: disclosureData.allegations.filter(allegation => allegation.id !== id)
    })
  }

  // Portfolio handlers
  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      type: "",
      organization: "",
      position: "",
      startDate: "",
      description: "",
      isActive: true
    }
    updateDisclosureData({
      portfolio: [...disclosureData.portfolio, newItem]
    })
  }

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    updateDisclosureData({
      portfolio: disclosureData.portfolio.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    })
  }

  const removePortfolioItem = (id: string) => {
    updateDisclosureData({
      portfolio: disclosureData.portfolio.filter(item => item.id !== id)
    })
  }

  // Financial interest handlers
  const addFinancialInterest = () => {
    const newInterest: FinancialInterest = {
      id: Date.now().toString(),
      type: "",
      entity: "",
      value: "",
      description: "",
      isConflict: false
    }
    updateDisclosureData({
      financialInterests: [...disclosureData.financialInterests, newInterest]
    })
  }

  const updateFinancialInterest = (id: string, updates: Partial<FinancialInterest>) => {
    updateDisclosureData({
      financialInterests: disclosureData.financialInterests.map(interest =>
        interest.id === id ? { ...interest, ...updates } : interest
      )
    })
  }

  const removeFinancialInterest = (id: string) => {
    updateDisclosureData({
      financialInterests: disclosureData.financialInterests.filter(interest => interest.id !== id)
    })
  }

  // Political background handlers
  const addPoliticalBackground = () => {
    const newBackground: PoliticalBackground = {
      id: Date.now().toString(),
      previousWork: "",
      workDuration: "",
      workDescription: "",
      annualIncome: "",
      incomeSource: "",
      politicalParty: "",
      partyDuration: "",
      partyRole: "",
      achievements: "",
      briberyDeclaration: false,
      corruptionDeclaration: false,
      additionalInfo: ""
    }
    updateDisclosureData({
      politicalBackground: [...disclosureData.politicalBackground, newBackground]
    })
  }

  const updatePoliticalBackground = (id: string, updates: Partial<PoliticalBackground>) => {
    updateDisclosureData({
      politicalBackground: disclosureData.politicalBackground.map(background =>
        background.id === id ? { ...background, ...updates } : background
      )
    })
  }

  const removePoliticalBackground = (id: string) => {
    updateDisclosureData({
      politicalBackground: disclosureData.politicalBackground.filter(background => background.id !== id)
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mb-4">
          <Link 
            href="/profile" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backToProfile}</span>
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="text-sm">
            <span className="font-medium">{t.completionRate}: </span>
            <span className="text-primary">{calculateCompletionRate()}%</span>
          </div>
          <Progress value={calculateCompletionRate()} className="w-32" />
        </div>
      </div>

      {/* No Disclosures Checkbox */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="noDisclosures"
              checked={disclosureData.hasNoDisclosures}
              onCheckedChange={(checked) => 
                updateDisclosureData({ hasNoDisclosures: checked as boolean })
              }
            />
            <Label htmlFor="noDisclosures" className="text-sm font-medium">
              {t.noDisclosures}
            </Label>
          </div>
        </CardContent>
      </Card>

      {!disclosureData.hasNoDisclosures && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="allegations" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{t.allegations}</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>{t.portfolio}</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center space-x-2">
              <Coins className="h-4 w-4" />
              <span>{t.financial}</span>
            </TabsTrigger>
            <TabsTrigger value="political" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{t.political}</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>{t.summary}</span>
            </TabsTrigger>
          </TabsList>

          {/* Allegations Tab */}
          <TabsContent value="allegations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>{t.allegationsTitle}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.allegationsDesc}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {disclosureData.allegations.map((allegation) => (
                  <Card key={allegation.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>{t.allegationType} <span className="text-red-500">*</span></Label>
                            <Select
                              value={allegation.type}
                              onValueChange={(value) => updateAllegation(allegation.id, { type: value })}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(t.allegationTypes).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>{t.allegationStatus} <span className="text-red-500">*</span></Label>
                            <Select
                              value={allegation.status}
                              onValueChange={(value) => updateAllegation(allegation.id, { status: value })}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(t.allegationStatuses).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAllegation(allegation.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label>{t.allegationDate}</Label>
                        <Input
                          type="date"
                          value={allegation.date}
                          onChange={(e) => updateAllegation(allegation.id, { date: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label>{t.allegationDescription} <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={allegation.description}
                          onChange={(e) => updateAllegation(allegation.id, { description: e.target.value })}
                          placeholder={t.pleaseProvideDescription}
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={addAllegation} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addAllegation}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <span>{t.portfolioTitle}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.portfolioDesc}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {disclosureData.portfolio.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>{t.portfolioType} <span className="text-red-500">*</span></Label>
                            <Select
                              value={item.type}
                              onValueChange={(value) => updatePortfolioItem(item.id, { type: value })}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(t.portfolioTypes).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>{t.organization} <span className="text-red-500">*</span></Label>
                            <Input
                              value={item.organization}
                              onChange={(e) => updatePortfolioItem(item.id, { organization: e.target.value })}
                              placeholder={t.pleaseProvideOrganization}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label>{t.position} <span className="text-red-500">*</span></Label>
                        <Input
                          value={item.position}
                          onChange={(e) => updatePortfolioItem(item.id, { position: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>{t.startDate} <span className="text-red-500">*</span></Label>
                          <Input
                            type="date"
                            value={item.startDate}
                            onChange={(e) => updatePortfolioItem(item.id, { startDate: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label>{t.endDate}</Label>
                          <Input
                            type="date"
                            value={item.endDate || ""}
                            onChange={(e) => updatePortfolioItem(item.id, { endDate: e.target.value })}
                            className="mt-2"
                            disabled={item.isActive}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${item.id}`}
                          checked={item.isActive}
                          onCheckedChange={(checked) => 
                            updatePortfolioItem(item.id, { 
                              isActive: checked as boolean,
                              endDate: checked ? "" : item.endDate
                            })
                          }
                        />
                        <Label htmlFor={`current-${item.id}`} className="text-sm">
                          {t.currentPosition}
                        </Label>
                      </div>
                      
                      <div>
                        <Label>{t.portfolioDescription} <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updatePortfolioItem(item.id, { description: e.target.value })}
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={addPortfolioItem} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addPortfolioItem}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Interests Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-green-500" />
                  <span>{t.financialTitle}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.financialDesc}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {disclosureData.financialInterests.map((interest) => (
                  <Card key={interest.id} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>{t.financialType} <span className="text-red-500">*</span></Label>
                            <Select
                              value={interest.type}
                              onValueChange={(value) => updateFinancialInterest(interest.id, { type: value })}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(t.financialTypes).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>{t.entity} <span className="text-red-500">*</span></Label>
                            <Input
                              value={interest.entity}
                              onChange={(e) => updateFinancialInterest(interest.id, { entity: e.target.value })}
                              placeholder={t.pleaseProvideEntity}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFinancialInterest(interest.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>{t.value} <span className="text-red-500">*</span></Label>
                          <Input
                            value={interest.value}
                            onChange={(e) => updateFinancialInterest(interest.id, { value: e.target.value })}
                            placeholder="e.g., NPR 1,00,000"
                            className="mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label>{t.percentage}</Label>
                          <Input
                            value={interest.percentage || ""}
                            onChange={(e) => updateFinancialInterest(interest.id, { percentage: e.target.value })}
                            placeholder="e.g., 25%"
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>{t.financialDescription} <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={interest.description}
                          onChange={(e) => updateFinancialInterest(interest.id, { description: e.target.value })}
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`conflict-${interest.id}`}
                          checked={interest.isConflict}
                          onCheckedChange={(checked) => 
                            updateFinancialInterest(interest.id, { isConflict: checked as boolean })
                          }
                        />
                        <Label htmlFor={`conflict-${interest.id}`} className="text-sm">
                          {t.potentialConflict}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={addFinancialInterest} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addFinancialInterest}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Political Background Tab */}
          <TabsContent value="political" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>{t.politicalTitle}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.politicalDesc}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {disclosureData.politicalBackground.map((political) => (
                  <Card key={political.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>{t.previousWork} <span className="text-red-500">*</span></Label>
                            <Input
                              value={political.previousWork}
                              onChange={(e) => updatePoliticalBackground(political.id, { previousWork: e.target.value })}
                              placeholder="e.g., Teacher, Engineer, Business Owner"
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label>{t.workDuration} <span className="text-red-500">*</span></Label>
                            <Input
                              value={political.workDuration}
                              onChange={(e) => updatePoliticalBackground(political.id, { workDuration: e.target.value })}
                              placeholder="e.g., 5 years, 2010-2015"
                              className="mt-2"
                            />
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePoliticalBackground(political.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label>{t.workDescription} <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={political.workDescription}
                          onChange={(e) => updatePoliticalBackground(political.id, { workDescription: e.target.value })}
                          className="mt-2"
                          rows={3}
                          placeholder="Describe your previous work experience and responsibilities"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>{t.annualIncome} <span className="text-red-500">*</span></Label>
                          <Input
                            value={political.annualIncome}
                            onChange={(e) => updatePoliticalBackground(political.id, { annualIncome: e.target.value })}
                            placeholder="e.g., रु. 500,000"
                            className="mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label>{t.incomeSource} <span className="text-red-500">*</span></Label>
                          <Input
                            value={political.incomeSource}
                            onChange={(e) => updatePoliticalBackground(political.id, { incomeSource: e.target.value })}
                            placeholder="e.g., Salary, Business, Investment"
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>{t.politicalParty} <span className="text-gray-500">({t.optional})</span></Label>
                          <Input
                            value={political.politicalParty || ''}
                            onChange={(e) => updatePoliticalBackground(political.id, { politicalParty: e.target.value })}
                            placeholder="e.g., Nepal Communist Party"
                            className="mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label>{t.partyDuration} <span className="text-gray-500">({t.optional})</span></Label>
                          <Input
                            value={political.partyDuration || ''}
                            onChange={(e) => updatePoliticalBackground(political.id, { partyDuration: e.target.value })}
                            placeholder="e.g., 3 years"
                            className="mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label>{t.partyRole} <span className="text-gray-500">({t.optional})</span></Label>
                          <Input
                            value={political.partyRole || ''}
                            onChange={(e) => updatePoliticalBackground(political.id, { partyRole: e.target.value })}
                            placeholder="e.g., Member, Secretary"
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>{t.achievements} <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={political.achievements}
                          onChange={(e) => updatePoliticalBackground(political.id, { achievements: e.target.value })}
                          className="mt-2"
                          rows={3}
                          placeholder="List your notable achievements and contributions to society"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`bribery-${political.id}`}
                            checked={political.briberyDeclaration}
                            onCheckedChange={(checked) => 
                              updatePoliticalBackground(political.id, { briberyDeclaration: checked as boolean })
                            }
                          />
                          <Label htmlFor={`bribery-${political.id}`} className="text-sm">
                            {t.briberyDeclaration}
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`corruption-${political.id}`}
                            checked={political.corruptionDeclaration}
                            onCheckedChange={(checked) => 
                              updatePoliticalBackground(political.id, { corruptionDeclaration: checked as boolean })
                            }
                          />
                          <Label htmlFor={`corruption-${political.id}`} className="text-sm">
                            {t.corruptionDeclaration}
                          </Label>
                        </div>
                      </div>
                      
                      <div>
                        <Label>{t.politicalAdditionalInfo} <span className="text-gray-500">({t.optional})</span></Label>
                        <Textarea
                          value={political.additionalInfo || ''}
                          onChange={(e) => updatePoliticalBackground(political.id, { additionalInfo: e.target.value })}
                          className="mt-2"
                          rows={2}
                          placeholder="Any additional political information you'd like to share"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={addPoliticalBackground} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addPoliticalBackground}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-500" />
                  <span>{t.summaryTitle}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.summaryDesc}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{disclosureData.allegations.length}</div>
                    <div className="text-sm text-muted-foreground">{t.totalAllegations}</div>
                  </Card>
                  
                  <Card className="text-center p-4">
                    <Briefcase className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{disclosureData.portfolio.length}</div>
                    <div className="text-sm text-muted-foreground">{t.totalPortfolio}</div>
                  </Card>
                  
                  <Card className="text-center p-4">
                    <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{disclosureData.financialInterests.length}</div>
                    <div className="text-sm text-muted-foreground">{t.totalFinancial}</div>
                  </Card>
                  
                  <Card className="text-center p-4">
                    <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{disclosureData.politicalBackground.length}</div>
                    <div className="text-sm text-muted-foreground">{t.totalPolitical}</div>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.completionRate}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={calculateCompletionRate()} className="w-32" />
                      <span className="text-sm font-medium">{calculateCompletionRate()}%</span>
                    </div>
                  </div>
                  
                  {calculateCompletionRate() < 100 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {locale === "en" 
                          ? "Please complete all required fields before submitting."
                          : "पेश गर्नु अघि सबै आवश्यक क्षेत्रहरू पूरा गर्नुहोस्।"
                        }
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{t.additionalNotes}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={disclosureData.additionalNotes}
            onChange={(e) => updateDisclosureData({ additionalNotes: e.target.value })}
            placeholder={t.additionalNotesPlaceholder}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  )
}