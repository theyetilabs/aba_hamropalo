"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CircleDetail {
  id: string
  name: string
  description: string
  icon: string
  members: number
  proposals: number
  joined: boolean
  category: string
  fullDescription: string
  criteria: string[]
  roles: string[]
  terms: string
}

interface Proposal {
  id: string
  title: string
  status: "active" | "voting" | "passed" | "rejected"
  votes: number
  description: string
  author: string
  createdAt: string
}

const mockCircleDetails: Record<string, CircleDetail> = {
  "1": {
    id: "1",
    name: "Governance & Policy",
    description: "Democratic governance and policy-making discussions",
    icon: "🏛️",
    members: 342,
    proposals: 28,
    joined: true,
    category: "governance",
    fullDescription:
      "This circle focuses on democratic governance, policy-making, and institutional development. Members discuss and deliberate on governance structures, policy frameworks, and institutional reforms.",
    criteria: [
      "Active participation in platform",
      "Understanding of governance principles",
      "Commitment to democratic values",
    ],
    roles: ["Member", "Facilitator", "Policy Advisor"],
    terms: "Members agree to uphold democratic principles and engage respectfully in discussions.",
  },
}

const mockProposals: Proposal[] = [
  {
    id: "p1",
    title: "Implement Digital Voting System",
    status: "voting",
    votes: 156,
    description: "Proposal to implement a secure digital voting system for all governance decisions",
    author: "Madan Poudel",
    createdAt: "2025-10-15",
  },
  {
    id: "p2",
    title: "Establish Governance Committee",
    status: "active",
    votes: 89,
    description: "Create a dedicated committee for governance oversight and policy review",
    author: "Sita Sharma",
    createdAt: "2025-10-10",
  },
  {
    id: "p3",
    title: "Policy Transparency Initiative",
    status: "voting",
    votes: 203,
    description: "Ensure all policy decisions are transparently documented and accessible",
    author: "Ram Kumar",
    createdAt: "2025-10-05",
  },
]

export default function CircleDetailPage() {
  const params = useParams()
  const circleId = params.id as string
  const [locale, setLocale] = useState<"en" | "ne">("en")

  const circle = mockCircleDetails[circleId] || mockCircleDetails["1"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "voting":
        return "bg-yellow-100 text-yellow-800"
      case "passed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1 bg-background">
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/circles" className="flex items-center gap-2 text-primary hover:opacity-80 mb-8">
              <ArrowLeft className="h-4 w-4" />
              {locale === "en" ? "Back to Circles" : "सर्कलहरुमा फर्कनुहोस्"}
            </Link>

            {/* Circle Header */}
            <div className="mb-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
              <div className="flex items-start gap-6">
                <div className="text-6xl">{circle.icon}</div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2 text-primary">{circle.name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{circle.description}</p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-semibold">
                        {circle.members} {locale === "en" ? "Members" : "सदस्यहरु"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-semibold">
                        {circle.proposals} {locale === "en" ? "Proposals" : "प्रस्तावहरु"}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    {circle.joined
                      ? locale === "en"
                        ? "Leave Circle"
                        : "सर्कल छोड्नुहोस्"
                      : locale === "en"
                        ? "Join Circle"
                        : "सर्कलमा सामेल हुनुहोस्"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="proposals" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="proposals">{locale === "en" ? "Proposals" : "प्रस्तावहरु"}</TabsTrigger>
                <TabsTrigger value="about">{locale === "en" ? "About" : "बारेमा"}</TabsTrigger>
                <TabsTrigger value="members">{locale === "en" ? "Members" : "सदस्यहरु"}</TabsTrigger>
              </TabsList>

              {/* Proposals Tab */}
              <TabsContent value="proposals" className="space-y-4">
                <div className="space-y-4">
                  {mockProposals.map((proposal) => (
                    <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{proposal.title}</h3>
                              <Badge className={getStatusColor(proposal.status)}>
                                {proposal.status === "active"
                                  ? locale === "en"
                                    ? "Active"
                                    : "सक्रिय"
                                  : proposal.status === "voting"
                                    ? locale === "en"
                                      ? "Voting"
                                      : "मतदान"
                                    : proposal.status === "passed"
                                      ? locale === "en"
                                        ? "Passed"
                                        : "पारित"
                                      : locale === "en"
                                        ? "Rejected"
                                        : "अस्वीकृत"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">
                                {locale === "en" ? "By:" : "द्वारा:"}{" "}
                                <span className="font-medium">{proposal.author}</span>
                              </span>
                              <span className="text-muted-foreground">
                                {locale === "en" ? "Votes:" : "मतहरु:"}{" "}
                                <span className="font-medium">{proposal.votes}</span>
                              </span>
                              <span className="text-muted-foreground">
                                {locale === "en" ? "Created:" : "सृजना गरिएको:"}{" "}
                                <span className="font-medium">{proposal.createdAt}</span>
                              </span>
                            </div>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                            {locale === "en" ? "View Details" : "विवरण हेर्नुहोस्"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{locale === "en" ? "About This Circle" : "यो सर्कल बारेमा"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Description" : "विवरण"}</h3>
                      <p className="text-muted-foreground">{circle.fullDescription}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Entry Criteria" : "प्रवेश मापदण्ड"}</h3>
                      <ul className="space-y-2">
                        {circle.criteria.map((criterion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Available Roles" : "उपलब्ध भूमिकाहरु"}</h3>
                      <div className="flex flex-wrap gap-2">
                        {circle.roles.map((role, index) => (
                          <Badge key={index} variant="secondary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Circle Terms" : "सर्कल शर्तहरु"}</h3>
                      <p className="text-muted-foreground">{circle.terms}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Members Tab */}
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>{locale === "en" ? "Circle Members" : "सर्कल सदस्यहरु"}</CardTitle>
                    <CardDescription>
                      {circle.members} {locale === "en" ? "active members" : "सक्रिय सदस्यहरु"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-semibold">{String.fromCharCode(65 + index)}</span>
                            </div>
                            <div>
                              <p className="font-semibold">Member {index + 1}</p>
                              <p className="text-sm text-muted-foreground">{locale === "en" ? "Active" : "सक्रिय"}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
