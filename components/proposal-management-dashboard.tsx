"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FileText, Edit2, Trash2, Eye, Search } from "lucide-react"

interface ProposalManagementDashboardProps {
  locale: "en" | "ne"
}

interface UserProposal {
  id: string
  title: string
  circle: string
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  votes: number
  createdAt: string
  updatedAt: string
}

const content = {
  en: {
    title: "My Proposals",
    subtitle: "Manage and track your submitted proposals",
    draft: "Draft",
    submitted: "Submitted",
    underReview: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    allProposals: "All Proposals",
    draftProposals: "Drafts",
    activeProposals: "Active",
    completedProposals: "Completed",
    searchPlaceholder: "Search proposals...",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    noProposals: "No proposals yet",
    createNew: "Create New Proposal",
    votes: "Votes",
    circle: "Circle",
    status: "Status",
    createdDate: "Created",
    lastUpdated: "Last Updated",
  },
  ne: {
    title: "मेरो प्रस्तावहरु",
    subtitle: "आफ्नो पेश गरिएका प्रस्तावहरु व्यवस्थापन र ट्र्याक गर्नुहोस्",
    draft: "ड्राफ्ट",
    submitted: "पेश गरिएको",
    underReview: "समीक्षाधीन",
    approved: "अनुमोदित",
    rejected: "अस्वीकृत",
    allProposals: "सबै प्रस्तावहरु",
    draftProposals: "ड्राफ्टहरु",
    activeProposals: "सक्रिय",
    completedProposals: "पूर्ण",
    searchPlaceholder: "प्रस्तावहरु खोज्नुहोस्...",
    edit: "सम्पादन गर्नुहोस्",
    delete: "हटाउनुहोस्",
    view: "हेर्नुहोस्",
    noProposals: "अझै कुनै प्रस्ताव छैन",
    createNew: "नयाँ प्रस्ताव सृजना गर्नुहोस्",
    votes: "मतहरु",
    circle: "सर्कल",
    status: "स्थिति",
    createdDate: "सृजना गरिएको",
    lastUpdated: "अन्तिम अपडेट",
  },
}

const mockProposals: UserProposal[] = [
  {
    id: "1",
    title: "Digital Voting System Implementation",
    circle: "Governance & Policy",
    status: "approved",
    votes: 156,
    createdAt: "2025-10-15",
    updatedAt: "2025-10-18",
  },
  {
    id: "2",
    title: "Climate Action Plan 2025",
    circle: "Environment & Sustainability",
    status: "under_review",
    votes: 89,
    createdAt: "2025-10-10",
    updatedAt: "2025-10-20",
  },
  {
    id: "3",
    title: "Education Curriculum Reform",
    circle: "Education & Youth",
    status: "submitted",
    votes: 0,
    createdAt: "2025-10-05",
    updatedAt: "2025-10-05",
  },
  {
    id: "4",
    title: "Healthcare Initiative Draft",
    circle: "Health & Wellbeing",
    status: "draft",
    votes: 0,
    createdAt: "2025-10-01",
    updatedAt: "2025-10-01",
  },
]

export default function ProposalManagementDashboard({ locale }: ProposalManagementDashboardProps) {
  const t = content[locale]
  const [searchTerm, setSearchTerm] = useState("")
  const [proposals, setProposals] = useState<UserProposal[]>(mockProposals)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return t.draft
      case "submitted":
        return t.submitted
      case "under_review":
        return t.underReview
      case "approved":
        return t.approved
      case "rejected":
        return t.rejected
      default:
        return status
    }
  }

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.circle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const draftProposals = filteredProposals.filter((p) => p.status === "draft")
  const activeProposals = filteredProposals.filter((p) => ["submitted", "under_review"].includes(p.status))
  const completedProposals = filteredProposals.filter((p) => ["approved", "rejected"].includes(p.status))

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <FileText className="h-4 w-4 mr-2" />
            {t.createNew}
          </Button>
        </div>

        {/* Search */}
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">{t.allProposals}</TabsTrigger>
            <TabsTrigger value="drafts">{t.draftProposals}</TabsTrigger>
            <TabsTrigger value="active">{t.activeProposals}</TabsTrigger>
            <TabsTrigger value="completed">{t.completedProposals}</TabsTrigger>
          </TabsList>

          {/* All Proposals */}
          <TabsContent value="all" className="space-y-4">
            {filteredProposals.length > 0 ? (
              <div className="space-y-4">
                {filteredProposals.map((proposal) => (
                  <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            <Badge className={getStatusColor(proposal.status)}>{getStatusLabel(proposal.status)}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>
                              {t.circle}: {proposal.circle}
                            </span>
                            <span>
                              {t.votes}: {proposal.votes}
                            </span>
                            <span>
                              {t.createdDate}: {proposal.createdAt}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {proposal.status === "draft" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
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

          {/* Draft Proposals */}
          <TabsContent value="drafts" className="space-y-4">
            {draftProposals.length > 0 ? (
              <div className="space-y-4">
                {draftProposals.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
                          <p className="text-sm text-muted-foreground">{proposal.circle}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

          {/* Active Proposals */}
          <TabsContent value="active" className="space-y-4">
            {activeProposals.length > 0 ? (
              <div className="space-y-4">
                {activeProposals.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            <Badge className={getStatusColor(proposal.status)}>{getStatusLabel(proposal.status)}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{proposal.circle}</p>
                          <p className="text-sm font-medium">
                            {t.votes}: {proposal.votes}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
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

          {/* Completed Proposals */}
          <TabsContent value="completed" className="space-y-4">
            {completedProposals.length > 0 ? (
              <div className="space-y-4">
                {completedProposals.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            <Badge className={getStatusColor(proposal.status)}>{getStatusLabel(proposal.status)}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{proposal.circle}</p>
                          <p className="text-sm font-medium">
                            {t.votes}: {proposal.votes}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
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
    </section>
  )
}
