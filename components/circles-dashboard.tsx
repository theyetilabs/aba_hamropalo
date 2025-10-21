"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, FileText, Search, X, ExternalLink } from "lucide-react"

interface Circle {
  id: string
  name: string
  description: string
  icon: string
  members: number
  proposals: number
  joined: boolean
  category: string
  entryCriteria: string[]
  roles: string[]
  termsAndConditions: string
}

interface Proposal {
  id: string
  title: string
  circle: string
  status: "active" | "voting" | "passed" | "rejected"
  votes: number
  description: string
}

interface CirclesDashboardProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Circles & Proposals",
    subtitle: "Join circles and participate in democratic governance",
    searchPlaceholder: "Search circles...",
    allCircles: "All Circles",
    myCircles: "My Circles",
    proposals: "Proposals",
    members: "Members",
    proposals_count: "Proposals",
    join: "Join Circle",
    leave: "Leave Circle",
    viewProposals: "View Proposals",
    active: "Active",
    voting: "Voting",
    passed: "Passed",
    rejected: "Rejected",
    noCircles: "No circles found",
    noProposals: "No proposals yet",
    governance: "Governance & Policy",
    environment: "Environment & Sustainability",
    education: "Education & Youth",
    health: "Health & Wellbeing",
    economy: "Economic Development",
    culture: "Culture & Heritage",
    joinCircleTitle: "Join Circle",
    entryCriteria: "Entry Criteria",
    selectRole: "Select Your Role",
    termsAndConditions: "Terms and Conditions",
    agreeToTerms: "I agree to the terms and conditions",
    confirmJoin: "Confirm Join",
    cancel: "Cancel",
    pleaseSelectRole: "Please select a role",
    pleaseAgreeTerms: "Please agree to the terms and conditions",
  },
  ne: {
    title: "सर्कलहरु र प्रस्तावहरु",
    subtitle: "सर्कलहरुमा सामेल हुनुहोस् र लोकतान्त्रिक शासनमा भाग लिनुहोस्",
    searchPlaceholder: "सर्कलहरु खोज्नुहोस्...",
    allCircles: "सबै सर्कलहरु",
    myCircles: "मेरो सर्कलहरु",
    proposals: "प्रस्तावहरु",
    members: "सदस्यहरु",
    proposals_count: "प्रस्तावहरु",
    join: "सर्कलमा सामेल हुनुहोस्",
    leave: "सर्कल छोड्नुहोस्",
    viewProposals: "प्रस्तावहरु हेर्नुहोस्",
    active: "सक्रिय",
    voting: "मतदान",
    passed: "पारित",
    rejected: "अस्वीकृत",
    noCircles: "कुनै सर्कल फेला परेन",
    noProposals: "अझै कुनै प्रस्ताव छैन",
    governance: "शासन र नीति",
    environment: "वातावरण र स्थिरता",
    education: "शिक्षा र युवा",
    health: "स्वास्थ्य र कल्याण",
    economy: "आर्थिक विकास",
    culture: "संस्कृति र विरासत",
    joinCircleTitle: "सर्कलमा सामेल हुनुहोस्",
    entryCriteria: "प्रवेश मापदण्ड",
    selectRole: "आफ्नो भूमिका छान्नुहोस्",
    termsAndConditions: "नियम र शर्तहरु",
    agreeToTerms: "म नियम र शर्तहरुमा सहमत छु",
    confirmJoin: "सामेल हुने पुष्टि गर्नुहोस्",
    cancel: "रद्द गर्नुहोस्",
    pleaseSelectRole: "कृपया भूमिका छान्नुहोस्",
    pleaseAgreeTerms: "कृपया नियम र शर्तहरुमा सहमत हुनुहोस्",
  },
}

const mockCircles: Circle[] = [
  {
    id: "civic-vigilance",
    name: "Civic Vigilance and Transparency",
    description: "Monitoring corruption, party financing, and elite capture - the watchdog role",
    icon: "👁️",
    members: 456,
    proposals: 34,
    joined: false,
    category: "vigilance",
    entryCriteria: [
      "Minimum 2 years experience in civil society or journalism",
      "Clean background verification",
      "Commitment to transparency principles",
      "Basic understanding of anti-corruption laws"
    ],
    roles: [
      "Corruption Monitor - राष्ट्रिय भ्रष्टाचार निगरानी",
      "Financial Investigator - वित्तीय अनुसन्धानकर्ता", 
      "Public Auditor - सार्वजनिक लेखा परीक्षक",
      "Transparency Advocate - पारदर्शिता वकिल"
    ],
    termsAndConditions: "Members must maintain strict confidentiality, follow ethical guidelines, and commit to at least 10 hours monthly contribution."
  },
  {
    id: "institutional-innovation",
    name: "Institutional Innovation",
    description: "Developing digital and procedural tools like Election Transparency Tool - the builder role",
    icon: "🔧",
    members: 289,
    proposals: 28,
    joined: true,
    category: "innovation",
    entryCriteria: [
      "Technical background in software development or policy design",
      "Portfolio of previous innovation projects",
      "Understanding of democratic processes",
      "Collaborative mindset for team projects"
    ],
    roles: [
      "Tech Developer - प्राविधिक विकासकर्ता",
      "Process Designer - प्रक्रिया डिजाइनर",
      "System Architect - प्रणाली वास्तुकार",
      "Innovation Researcher - नवाचार अनुसन्धानकर्ता"
    ],
    termsAndConditions: "Members must contribute to open-source projects, share knowledge freely, and participate in monthly innovation workshops."
  },
  {
    id: "community-service",
    name: "Community Service and Regeneration",
    description: "Linking SEWA ideals to tangible local projects - the doer role",
    icon: "🤝",
    members: 678,
    proposals: 45,
    joined: true,
    category: "service",
    entryCriteria: [
      "Demonstrated community service experience",
      "Local community connections",
      "Physical ability to participate in field work",
      "Commitment to SEWA principles"
    ],
    roles: [
      "Community Organizer - समुदायिक संयोजक",
      "Project Coordinator - परियोजना संयोजक",
      "Field Worker - क्षेत्रीय कार्यकर्ता",
      "Resource Mobilizer - स्रोत परिचालक"
    ],
    termsAndConditions: "Members must participate in monthly community service activities, maintain local partnerships, and report project outcomes."
  },
  {
    id: "national-coalition",
    name: "National Coalition Circle",
    description: "Working together for building a coalition with all groups for creating a big political party",
    icon: "🏛️",
    members: 234,
    proposals: 19,
    joined: false,
    category: "coalition",
    entryCriteria: [
      "Political experience or strong civic engagement",
      "Network connections across different groups",
      "Strategic thinking and negotiation skills",
      "Commitment to democratic coalition building"
    ],
    roles: [
      "Coalition Builder - गठबन्धन निर्माता",
      "Strategic Planner - रणनीतिक योजनाकार",
      "Stakeholder Liaison - सरोकारवाला संपर्क",
      "Policy Coordinator - नीति संयोजक"
    ],
    termsAndConditions: "Members must maintain political neutrality within the circle, respect diverse viewpoints, and work towards consensus building."
  },
  {
    id: "environmental-action",
    name: "Environmental Action & Climate Justice",
    description: "Addressing climate change, environmental protection, and sustainable development initiatives",
    icon: "🌱",
    members: 523,
    proposals: 41,
    joined: false,
    category: "environment",
    entryCriteria: [
      "Environmental science background or demonstrated environmental activism",
      "Understanding of climate change and sustainability principles",
      "Commitment to environmental justice",
      "Experience in community organizing or policy advocacy"
    ],
    roles: [
      "Climate Researcher - जलवायु अनुसन्धानकर्ता",
      "Environmental Advocate - वातावरणीय वकिल",
      "Sustainability Coordinator - दिगोपन संयोजक",
      "Green Policy Analyst - हरित नीति विश्लेषक"
    ],
    termsAndConditions: "Members must participate in environmental campaigns, support sustainable practices, and contribute to climate action initiatives."
  },
  {
    id: "education-reform",
    name: "Education Reform & Youth Empowerment",
    description: "Transforming education systems and empowering youth for democratic participation",
    icon: "📚",
    members: 712,
    proposals: 56,
    joined: true,
    category: "education",
    entryCriteria: [
      "Educational background or teaching experience",
      "Passion for youth development and empowerment",
      "Understanding of modern pedagogical approaches",
      "Commitment to inclusive and equitable education"
    ],
    roles: [
      "Education Policy Researcher - शिक्षा नीति अनुसन्धानकर्ता",
      "Youth Mentor - युवा मार्गदर्शक",
      "Curriculum Developer - पाठ्यक्रम विकासकर्ता",
      "Digital Learning Specialist - डिजिटल शिक्षा विशेषज्ञ"
    ],
    termsAndConditions: "Members must support educational equity, mentor young people, and contribute to curriculum development initiatives."
  },
  {
    id: "healthcare-access",
    name: "Healthcare Access & Public Health",
    description: "Ensuring universal healthcare access and promoting public health initiatives",
    icon: "🏥",
    members: 445,
    proposals: 38,
    joined: false,
    category: "health",
    entryCriteria: [
      "Healthcare professional background or public health experience",
      "Understanding of healthcare systems and policy",
      "Commitment to health equity and universal access",
      "Experience in community health programs"
    ],
    roles: [
      "Public Health Advocate - सार्वजनिक स्वास्थ्य वकिल",
      "Healthcare Policy Analyst - स्वास्थ्य नीति विश्लेषक",
      "Community Health Organizer - सामुदायिक स्वास्थ्य संयोजक",
      "Medical Research Coordinator - चिकित्सा अनुसन्धान संयोजक"
    ],
    termsAndConditions: "Members must advocate for health equity, support community health initiatives, and contribute to healthcare policy development."
  },
  {
    id: "economic-justice",
    name: "Economic Justice & Workers' Rights",
    description: "Promoting economic equality, workers' rights, and fair labor practices",
    icon: "⚖️",
    members: 389,
    proposals: 32,
    joined: true,
    category: "economy",
    entryCriteria: [
      "Economics, labor relations, or social justice background",
      "Understanding of economic inequality and labor issues",
      "Commitment to workers' rights and economic justice",
      "Experience in advocacy or organizing"
    ],
    roles: [
      "Labor Rights Advocate - श्रमिक अधिकार वकिल",
      "Economic Policy Researcher - आर्थिक नीति अनुसन्धानकर्ता",
      "Workers' Union Organizer - मजदुर संघ संयोजक",
      "Social Justice Coordinator - सामाजिक न्याय संयोजक"
    ],
    termsAndConditions: "Members must support workers' rights, advocate for economic justice, and participate in labor organizing activities."
  },
  {
    id: "digital-rights",
    name: "Digital Rights & Technology Ethics",
    description: "Protecting digital privacy, promoting tech ethics, and ensuring digital inclusion",
    icon: "💻",
    members: 267,
    proposals: 24,
    joined: false,
    category: "technology",
    entryCriteria: [
      "Technology background or digital rights advocacy experience",
      "Understanding of privacy, cybersecurity, and digital ethics",
      "Commitment to digital inclusion and rights protection",
      "Knowledge of technology policy and regulation"
    ],
    roles: [
      "Digital Rights Advocate - डिजिटल अधिकार वकिल",
      "Privacy Researcher - गोपनीयता अनुसन्धानकर्ता",
      "Tech Ethics Specialist - प्रविधि नैतिकता विशेषज्ञ",
      "Digital Inclusion Coordinator - डिजिटल समावेशन संयोजक"
    ],
    termsAndConditions: "Members must protect digital rights, promote ethical technology use, and support digital inclusion initiatives."
  },
  {
    id: "cultural-heritage",
    name: "Cultural Heritage & Arts Preservation",
    description: "Preserving cultural heritage, promoting arts, and celebrating diversity",
    icon: "🎭",
    members: 356,
    proposals: 29,
    joined: false,
    category: "culture",
    entryCriteria: [
      "Arts, culture, or heritage preservation background",
      "Passion for cultural diversity and artistic expression",
      "Understanding of heritage conservation principles",
      "Commitment to cultural inclusivity and preservation"
    ],
    roles: [
      "Cultural Preservationist - सांस्कृतिक संरक्षणवादी",
      "Arts Advocate - कला वकिल",
      "Heritage Researcher - विरासत अनुसन्धानकर्ता",
      "Community Arts Organizer - सामुदायिक कला संयोजक"
    ],
    termsAndConditions: "Members must support cultural preservation, promote artistic expression, and participate in heritage conservation activities."
  },
  {
    id: "rural-development",
    name: "Rural Development & Agricultural Innovation",
    description: "Supporting rural communities, promoting sustainable agriculture, and rural empowerment",
    icon: "🌾",
    members: 634,
    proposals: 47,
    joined: true,
    category: "rural",
    entryCriteria: [
      "Agricultural, rural development, or community development background",
      "Understanding of rural challenges and opportunities",
      "Commitment to sustainable agriculture and rural empowerment",
      "Experience in rural community work"
    ],
    roles: [
      "Agricultural Innovation Specialist - कृषि नवाचार विशेषज्ञ",
      "Rural Development Coordinator - ग्रामीण विकास संयोजक",
      "Farmers' Rights Advocate - किसान अधिकार वकिल",
      "Sustainable Agriculture Researcher - दिगो कृषि अनुसन्धानकर्ता"
    ],
    termsAndConditions: "Members must support rural communities, promote sustainable agriculture, and participate in rural development initiatives."
  },
  {
    id: "gender-equality",
    name: "Gender Equality & Women's Empowerment",
    description: "Promoting gender equality, women's rights, and inclusive representation",
    icon: "♀️",
    members: 578,
    proposals: 43,
    joined: false,
    category: "gender",
    entryCriteria: [
      "Gender studies, women's rights, or social justice background",
      "Understanding of gender inequality and intersectionality",
      "Commitment to women's empowerment and gender justice",
      "Experience in advocacy or organizing for gender equality"
    ],
    roles: [
      "Women's Rights Advocate - महिला अधिकार वकिल",
      "Gender Policy Researcher - लैंगिक नीति अनुसन्धानकर्ता",
      "Empowerment Program Coordinator - सशक्तिकरण कार्यक्रम संयोजक",
      "Intersectional Justice Organizer - अन्तरक्रियात्मक न्याय संयोजक"
    ],
    termsAndConditions: "Members must advocate for gender equality, support women's empowerment, and promote inclusive representation in all activities."
  }
]

const mockProposals: Proposal[] = [
  {
    id: "p1",
    title: "Implement Digital Voting System",
    circle: "Governance & Policy",
    status: "voting",
    votes: 156,
    description: "Proposal to implement a secure digital voting system for all governance decisions",
  },
  {
    id: "p2",
    title: "Climate Action Plan 2025",
    circle: "Environment & Sustainability",
    status: "active",
    votes: 89,
    description: "Comprehensive climate action plan with specific targets and timelines",
  },
  {
    id: "p3",
    title: "Education Curriculum Reform",
    circle: "Education & Youth",
    status: "voting",
    votes: 203,
    description: "Modernize education curriculum to include digital literacy and critical thinking",
  },
  {
    id: "p4",
    title: "Universal Healthcare Initiative",
    circle: "Health & Wellbeing",
    status: "passed",
    votes: 267,
    description: "Proposal for universal healthcare coverage across all districts",
  },
  {
    id: "p5",
    title: "SME Support Program",
    circle: "Economic Development",
    status: "active",
    votes: 142,
    description: "Government support program for small and medium enterprises",
  },
]

export default function CirclesDashboard({ locale }: CirclesDashboardProps) {
  const router = useRouter()
  const [circles, setCircles] = useState<Circle[]>(mockCircles)
  const [searchTerm, setSearchTerm] = useState("")
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null)
  const [selectedRole, setSelectedRole] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const t = content[locale]

  const handleCircleClick = (circleId: string) => {
    router.push(`/circles/${circleId}`)
  }

  const handleProposalClick = (proposalId: string) => {
    router.push(`/proposals/${proposalId}`)
  }

  const handleJoinClick = (circle: Circle) => {
    if (circle.joined) {
      // Direct leave action
      setCircles(circles.map((c) => (c.id === circle.id ? { ...c, joined: false } : c)))
    } else {
      // Show join modal
      setSelectedCircle(circle)
      setSelectedRole("")
      setAgreeToTerms(false)
      setShowJoinModal(true)
    }
  }

  const handleConfirmJoin = () => {
    if (!selectedRole) {
      alert(t.pleaseSelectRole)
      return
    }
    if (!agreeToTerms) {
      alert(t.pleaseAgreeTerms)
      return
    }
    
    if (selectedCircle) {
      setCircles(circles.map((c) => (c.id === selectedCircle.id ? { ...c, joined: true } : c)))
      setShowJoinModal(false)
      setSelectedCircle(null)
      setSelectedRole("")
      setAgreeToTerms(false)
    }
  }

  const handleJoinLeave = (circleId: string) => {
    const circle = circles.find(c => c.id === circleId)
    if (circle) {
      handleJoinClick(circle)
    }
  }

  const filteredCircles = circles.filter(
    (circle) =>
      circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const myCircles = circles.filter((circle) => circle.joined)
  const allCircles = circles

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "voting":
        return "bg-blue-100 text-blue-800"
      case "passed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">{t.allCircles}</TabsTrigger>
            <TabsTrigger value="my">{t.myCircles}</TabsTrigger>
            <TabsTrigger value="proposals">{t.proposals}</TabsTrigger>
          </TabsList>

          {/* All Circles Tab */}
          <TabsContent value="all" className="space-y-6">
            {filteredCircles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCircles.map((circle) => (
                  <Card 
                    key={circle.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => handleCircleClick(circle.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{circle.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{circle.name}</CardTitle>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{circle.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {circle.members} {t.members}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {circle.proposals} {t.proposals_count}
                          </span>
                        </div>
                      </div>
                      
                      {/* Entry Criteria */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">
                          {locale === "en" ? "Entry Criteria:" : "प्रवेश मापदण्ड:"}
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {circle.entryCriteria.slice(0, 2).map((criteria, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-primary">•</span>
                              <span>{criteria}</span>
                            </li>
                          ))}
                          {circle.entryCriteria.length > 2 && (
                            <li className="text-primary text-xs">
                              +{circle.entryCriteria.length - 2} {locale === "en" ? "more criteria" : "थप मापदण्ड"}
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Available Roles */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">
                          {locale === "en" ? "Available Roles:" : "उपलब्ध भूमिकाहरू:"}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {circle.roles.slice(0, 2).map((role, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {role.split(' - ')[0]}
                            </Badge>
                          ))}
                          {circle.roles.length > 2 && (
                            <Badge variant="outline" className="text-xs text-primary">
                              +{circle.roles.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleJoinLeave(circle.id)
                        }}
                        className={`w-full ${
                          circle.joined ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {circle.joined ? t.leave : t.join}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-muted-foreground">{t.noCircles}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Circles Tab */}
          <TabsContent value="my" className="space-y-6">
            {myCircles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCircles.map((circle) => (
                  <Card key={circle.id} className="border-2 border-primary cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCircleClick(circle.id)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{circle.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{circle.name}</CardTitle>
                            <Badge className="mt-2 bg-primary text-white">{locale === "en" ? "Joined" : "सामेल"}</Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{circle.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {circle.members} {t.members}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {circle.proposals} {t.proposals_count}
                          </span>
                        </div>
                      </div>
                      
                      {/* Your Role */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">
                          {locale === "en" ? "Your Role:" : "तपाईंको भूमिका:"}
                        </h4>
                        <Badge className="bg-primary text-white">
                          {circle.roles[0]?.split(' - ')[0] || (locale === "en" ? "Member" : "सदस्य")}
                        </Badge>
                      </div>

                      {/* Terms & Conditions */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">
                          {locale === "en" ? "Terms:" : "सर्तहरू:"}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {circle.termsAndConditions.slice(0, 80)}...
                        </p>
                      </div>

                      <Button onClick={(event) => { event.stopPropagation(); handleJoinLeave(circle.id); }} variant="outline" className="w-full">
                        {t.leave}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-muted-foreground">
                    {locale === "en" ? "You haven't joined any circles yet" : "तपाईले अझै कुनै सर्कलमा सामेल हुनुभएको छैन"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-4">
            {mockProposals.length > 0 ? (
              <div className="space-y-4">
                {mockProposals.map((proposal) => (
                  <Card key={proposal.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleProposalClick(proposal.id)}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            <Badge className={getStatusColor(proposal.status)}>
                              {t[proposal.status as keyof typeof t] || proposal.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              {locale === "en" ? "Circle:" : "सर्कल:"}{" "}
                              <span className="font-medium">{proposal.circle}</span>
                            </span>
                            <span className="text-muted-foreground">
                              {locale === "en" ? "Votes:" : "मतहरु:"}{" "}
                              <span className="font-medium">{proposal.votes}</span>
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProposalClick(proposal.id);
                          }}
                        >
                          {t.viewProposals}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-muted-foreground">{t.noProposals}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Circle Membership Modal */}
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCircle?.icon} {t.joinCircleTitle}: {selectedCircle?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedCircle?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Entry Criteria */}
            <div>
              <h4 className="font-semibold mb-3">{t.entryCriteria}</h4>
              <ul className="space-y-2">
                {selectedCircle?.entryCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Role Selection */}
            <div>
              <h4 className="font-semibold mb-3">{t.selectRole}</h4>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                {selectedCircle?.roles.map((role, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={role} id={`role-${index}`} />
                    <Label htmlFor={`role-${index}`} className="text-sm">{role}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Terms and Conditions */}
            <div>
              <h4 className="font-semibold mb-3">{t.termsAndConditions}</h4>
              <div className="bg-gray-50 p-4 rounded-lg text-sm max-h-32 overflow-y-auto">
                {selectedCircle?.termsAndConditions}
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agree-terms" 
                checked={agreeToTerms} 
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
              />
              <Label htmlFor="agree-terms" className="text-sm">
                {t.agreeToTerms}
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowJoinModal(false)}
            >
              {t.cancel}
            </Button>
            <Button 
              onClick={handleConfirmJoin}
              className="bg-primary hover:bg-primary/90"
              disabled={!selectedRole || !agreeToTerms}
            >
              {t.confirmJoin}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
