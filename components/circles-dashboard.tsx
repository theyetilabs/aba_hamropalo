"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, Search } from "lucide-react"

interface Circle {
  id: string
  name: string
  description: string
  icon: string
  members: number
  proposals: number
  joined: boolean
  category: string
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
  },
}

const mockCircles: Circle[] = [
  {
    id: "1",
    name: "Governance & Policy",
    description: "Democratic governance and policy-making discussions",
    icon: "🏛️",
    members: 342,
    proposals: 28,
    joined: true,
    category: "governance",
  },
  {
    id: "2",
    name: "Environment & Sustainability",
    description: "Environmental protection and sustainable development",
    icon: "🌱",
    members: 256,
    proposals: 15,
    joined: false,
    category: "environment",
  },
  {
    id: "3",
    name: "Education & Youth",
    description: "Education reform and youth empowerment initiatives",
    icon: "📚",
    members: 189,
    proposals: 22,
    joined: true,
    category: "education",
  },
  {
    id: "4",
    name: "Health & Wellbeing",
    description: "Healthcare access and public health initiatives",
    icon: "⚕️",
    members: 214,
    proposals: 18,
    joined: false,
    category: "health",
  },
  {
    id: "5",
    name: "Economic Development",
    description: "Economic growth and business development strategies",
    icon: "💼",
    members: 298,
    proposals: 31,
    joined: false,
    category: "economy",
  },
  {
    id: "6",
    name: "Culture & Heritage",
    description: "Cultural preservation and heritage conservation",
    icon: "🎭",
    members: 167,
    proposals: 12,
    joined: true,
    category: "culture",
  },
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
  const [circles, setCircles] = useState<Circle[]>(mockCircles)
  const [searchTerm, setSearchTerm] = useState("")
  const t = content[locale]

  const handleJoinLeave = (circleId: string) => {
    setCircles(circles.map((circle) => (circle.id === circleId ? { ...circle, joined: !circle.joined } : circle)))
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
                  <Card key={circle.id} className="hover:shadow-lg transition-shadow">
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
                      <Button
                        onClick={() => handleJoinLeave(circle.id)}
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
                  <Card key={circle.id} className="border-2 border-primary">
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
                      <Button onClick={() => handleJoinLeave(circle.id)} variant="outline" className="w-full">
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
                  <Card key={proposal.id} className="hover:shadow-md transition-shadow">
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
                        <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">{t.viewProposals}</Button>
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
    </section>
  )
}
