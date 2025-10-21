"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  MapPin, 
  Users, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Share2, 
  FileText, 
  Clock, 
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit,
  Eye
} from "lucide-react"

interface ProposalDetailProps {
  locale: "en" | "ne"
  proposalId: string
}

interface Proposal {
  id: string
  title: string
  description: string
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  category: string
  priority: "high" | "medium" | "low"
  author: {
    name: string
    avatar?: string
    location: string
  }
  circle: string
  createdAt: string
  updatedAt: string
  votes: {
    support: number
    oppose: number
    abstain: number
  }
  budget?: string
  timeline?: string
  targetAudience?: string
  expectedImpact?: string
  implementation?: string
  risks?: string
  successMetrics?: string
  comments: number
  supporters: number
  views: number
}

const content = {
  en: {
    backToProposals: "← Back to Proposals",
    status: "Status",
    category: "Category",
    priority: "Priority",
    author: "Author",
    circle: "Circle",
    created: "Created",
    updated: "Last Updated",
    overview: "Overview",
    details: "Details",
    discussion: "Discussion",
    timeline: "Timeline",
    budget: "Budget",
    targetAudience: "Target Audience",
    expectedImpact: "Expected Impact",
    implementation: "Implementation Plan",
    risks: "Risks & Mitigation",
    successMetrics: "Success Metrics",
    support: "Support",
    oppose: "Oppose",
    abstain: "Abstain",
    comments: "Comments",
    supporters: "Supporters",
    views: "Views",
    vote: "Vote",
    share: "Share",
    edit: "Edit",
    viewOnly: "View Only",
    draft: "Draft",
    submitted: "Submitted",
    underReview: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    high: "High",
    medium: "Medium",
    low: "Low",
    draftMessage: "This proposal is still in draft mode. You can continue editing before submission.",
    underReviewMessage: "This proposal is currently under review by the community and relevant authorities.",
    approvedMessage: "This proposal has been approved and is ready for implementation.",
    rejectedMessage: "This proposal has been rejected. Please review the feedback and consider resubmitting.",
    submittedMessage: "This proposal has been submitted and is awaiting community review.",
    noVotingDraft: "Voting is not available for draft proposals.",
    noVotingUnderReview: "Voting will be available once the review process is complete.",
    votingActive: "Community voting is now active for this proposal."
  },
  ne: {
    backToProposals: "← प्रस्तावहरूमा फर्कनुहोस्",
    status: "स्थिति",
    category: "श्रेणी",
    priority: "प्राथमिकता",
    author: "लेखक",
    circle: "सर्कल",
    created: "सृजना गरिएको",
    updated: "अन्तिम अपडेट",
    overview: "सिंहावलोकन",
    details: "विवरणहरू",
    discussion: "छलफल",
    timeline: "समयसीमा",
    budget: "बजेट",
    targetAudience: "लक्षित दर्शक",
    expectedImpact: "अपेक्षित प्रभाव",
    implementation: "कार्यान्वयन योजना",
    risks: "जोखिम र न्यूनीकरण",
    successMetrics: "सफलताका मापदण्डहरू",
    support: "समर्थन",
    oppose: "विरोध",
    abstain: "तटस्थ",
    comments: "टिप्पणीहरू",
    supporters: "समर्थकहरू",
    views: "हेराइ",
    vote: "मत दिनुहोस्",
    share: "साझा गर्नुहोस्",
    edit: "सम्पादन गर्नुहोस्",
    viewOnly: "मात्र हेर्नुहोस्",
    draft: "ड्राफ्ट",
    submitted: "पेश गरिएको",
    underReview: "समीक्षाधीन",
    approved: "अनुमोदित",
    rejected: "अस्वीकृत",
    high: "उच्च",
    medium: "मध्यम",
    low: "न्यून",
    draftMessage: "यो प्रस्ताव अझै ड्राफ्ट मोडमा छ। तपाईं पेश गर्नु अघि सम्पादन जारी राख्न सक्नुहुन्छ।",
    underReviewMessage: "यो प्रस्ताव हाल समुदाय र सम्बन्धित अधिकारीहरूद्वारा समीक्षाधीन छ।",
    approvedMessage: "यो प्रस्ताव अनुमोदन भएको छ र कार्यान्वयनको लागि तयार छ।",
    rejectedMessage: "यो प्रस्ताव अस्वीकार गरिएको छ। कृपया प्रतिक्रिया समीक्षा गर्नुहोस् र पुनः पेश गर्ने विचार गर्नुहोस्।",
    submittedMessage: "यो प्रस्ताव पेश गरिएको छ र समुदायिक समीक्षाको प्रतीक्षामा छ।",
    noVotingDraft: "ड्राफ्ट प्रस्तावहरूको लागि मतदान उपलब्ध छैन।",
    noVotingUnderReview: "समीक्षा प्रक्रिया पूरा भएपछि मतदान उपलब्ध हुनेछ।",
    votingActive: "यस प्रस्तावको लागि समुदायिक मतदान अब सक्रिय छ।"
  }
}

// Mock proposal data with Nepal context
const mockProposals: Record<string, Proposal> = {
  "1": {
    id: "1",
    title: "Digital Voting System Implementation",
    description: "A comprehensive proposal to implement a secure digital voting system for local elections in Nepal, ensuring transparency and accessibility for all citizens including those in remote areas.",
    status: "approved",
    category: "Governance & Technology",
    priority: "high",
    author: {
      name: "Rajesh Hamal",
      location: "Kathmandu, Nepal"
    },
    circle: "Governance & Policy",
    createdAt: "2025-10-15",
    updatedAt: "2025-10-18",
    votes: {
      support: 156,
      oppose: 23,
      abstain: 12
    },
    budget: "NPR 50,00,000 (Fifty Lakhs)",
    timeline: "6 months implementation phase",
    targetAudience: "All eligible voters in Nepal",
    expectedImpact: "Increase voter turnout by 25% and reduce election costs by 40%",
    implementation: "Phase 1: Pilot in 3 districts, Phase 2: Nationwide rollout",
    risks: "Technical failures, cybersecurity threats, digital divide",
    successMetrics: "Voter turnout increase, cost reduction, security audit results",
    comments: 45,
    supporters: 234,
    views: 1250
  },
  "2": {
    id: "2",
    title: "Climate Action Plan 2025",
    description: "A comprehensive climate action plan focusing on renewable energy adoption, forest conservation, and sustainable agriculture practices across Nepal's diverse geographical regions.",
    status: "under_review",
    category: "Environment & Climate",
    priority: "high",
    author: {
      name: "Sita Rai",
      location: "Pokhara, Nepal"
    },
    circle: "Environment & Sustainability",
    createdAt: "2025-10-10",
    updatedAt: "2025-10-20",
    votes: {
      support: 0,
      oppose: 0,
      abstain: 0
    },
    budget: "NPR 2,00,00,000 (Two Crores)",
    timeline: "3 years implementation",
    targetAudience: "All communities in Nepal, especially rural areas",
    expectedImpact: "Reduce carbon emissions by 30% and create 10,000 green jobs",
    implementation: "Community-based approach with local government partnerships",
    risks: "Funding constraints, political changes, community resistance",
    successMetrics: "Emission reduction, job creation, renewable energy adoption rate",
    comments: 0,
    supporters: 0,
    views: 89
  },
  "3": {
    id: "3",
    title: "Education Curriculum Reform",
    description: "Modernizing Nepal's education curriculum to include digital literacy, critical thinking, and practical skills relevant to the 21st century job market.",
    status: "submitted",
    category: "Education & Development",
    priority: "medium",
    author: {
      name: "Dr. Binod Chaudhary",
      location: "Chitwan, Nepal"
    },
    circle: "Education & Youth",
    createdAt: "2025-10-05",
    updatedAt: "2025-10-05",
    votes: {
      support: 0,
      oppose: 0,
      abstain: 0
    },
    budget: "NPR 75,00,000 (Seventy-Five Lakhs)",
    timeline: "2 years development and implementation",
    targetAudience: "Students from Grade 1-12 across Nepal",
    expectedImpact: "Improve student employability and critical thinking skills",
    implementation: "Gradual rollout starting with pilot schools in each province",
    risks: "Teacher training requirements, infrastructure limitations",
    successMetrics: "Student performance improvement, employment rates",
    comments: 0,
    supporters: 0,
    views: 67
  },
  "4": {
    id: "4",
    title: "Healthcare Initiative Draft",
    description: "Improving healthcare access in rural Nepal through mobile health clinics and telemedicine services, addressing the healthcare gap in remote mountainous regions.",
    status: "draft",
    category: "Health & Wellbeing",
    priority: "high",
    author: {
      name: "Dr. Sunita Sharma",
      location: "Dhangadhi, Nepal"
    },
    circle: "Health & Wellbeing",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-01",
    votes: {
      support: 0,
      oppose: 0,
      abstain: 0
    },
    budget: "NPR 1,50,00,000 (One and Half Crores)",
    timeline: "18 months implementation",
    targetAudience: "Rural communities in mountainous regions",
    expectedImpact: "Provide healthcare access to 50,000 people in remote areas",
    implementation: "Mobile clinics with satellite internet connectivity",
    risks: "Geographical challenges, equipment maintenance, staff retention",
    successMetrics: "Patient reach, health outcome improvements, cost per patient",
    comments: 0,
    supporters: 0,
    views: 23
  }
}

export default function ProposalDetail({ locale, proposalId }: ProposalDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const t = content[locale]
  
  const proposal = mockProposals[proposalId]
  
  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Proposal Not Found</h2>
          <p className="text-muted-foreground">The requested proposal could not be found.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800"
      case "submitted": return "bg-blue-100 text-blue-800"
      case "under_review": return "bg-yellow-100 text-yellow-800"
      case "approved": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusMessage = () => {
    switch (proposal.status) {
      case "draft": return t.draftMessage
      case "submitted": return t.submittedMessage
      case "under_review": return t.underReviewMessage
      case "approved": return t.approvedMessage
      case "rejected": return t.rejectedMessage
      default: return ""
    }
  }

  const getVotingMessage = () => {
    switch (proposal.status) {
      case "draft": return t.noVotingDraft
      case "under_review": return t.noVotingUnderReview
      case "approved": case "submitted": return t.votingActive
      default: return ""
    }
  }

  const canVote = proposal.status === "approved" || proposal.status === "submitted"
  const canEdit = proposal.status === "draft"
  const totalVotes = proposal.votes.support + proposal.votes.oppose + proposal.votes.abstain

  return (
    <section className="py-8 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          {t.backToProposals}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">{proposal.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getStatusColor(proposal.status)}>
                  {t[proposal.status as keyof typeof t] || proposal.status}
                </Badge>
                <Badge className={getPriorityColor(proposal.priority)}>
                  {t[proposal.priority as keyof typeof t] || proposal.priority}
                </Badge>
                <Badge variant="outline">{proposal.category}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {canEdit && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  {t.edit}
                </Button>
              )}
              {!canEdit && (
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  {t.viewOnly}
                </Button>
              )}
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                {t.share}
              </Button>
            </div>
          </div>

          {/* Status Message */}
          <Card className="mb-6">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                {proposal.status === "approved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                {proposal.status === "rejected" && <AlertCircle className="h-5 w-5 text-red-600" />}
                {proposal.status === "under_review" && <Clock className="h-5 w-5 text-yellow-600" />}
                {proposal.status === "draft" && <FileText className="h-5 w-5 text-gray-600" />}
                {proposal.status === "submitted" && <CheckCircle className="h-5 w-5 text-blue-600" />}
                <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Author and Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={proposal.author.avatar} />
                    <AvatarFallback>{proposal.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{proposal.author.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {proposal.author.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{proposal.circle}</p>
                    <p className="text-sm text-muted-foreground">{t.circle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{proposal.createdAt}</p>
                    <p className="text-sm text-muted-foreground">{t.created}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{proposal.views}</p>
                    <p className="text-sm text-muted-foreground">{t.views}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                <TabsTrigger value="details">{t.details}</TabsTrigger>
                <TabsTrigger value="discussion">{t.discussion}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Proposal Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {proposal.description}
                    </p>
                    
                    {proposal.expectedImpact && (
                      <div>
                        <h4 className="font-semibold mb-2">{t.expectedImpact}</h4>
                        <p className="text-sm text-muted-foreground">{proposal.expectedImpact}</p>
                      </div>
                    )}

                    {proposal.budget && (
                      <div>
                        <h4 className="font-semibold mb-2">{t.budget}</h4>
                        <p className="text-sm text-muted-foreground">{proposal.budget}</p>
                      </div>
                    )}

                    {proposal.timeline && (
                      <div>
                        <h4 className="font-semibold mb-2">{t.timeline}</h4>
                        <p className="text-sm text-muted-foreground">{proposal.timeline}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <div className="space-y-6">
                  {proposal.targetAudience && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.targetAudience}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{proposal.targetAudience}</p>
                      </CardContent>
                    </Card>
                  )}

                  {proposal.implementation && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.implementation}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{proposal.implementation}</p>
                      </CardContent>
                    </Card>
                  )}

                  {proposal.risks && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.risks}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{proposal.risks}</p>
                      </CardContent>
                    </Card>
                  )}

                  {proposal.successMetrics && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.successMetrics}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{proposal.successMetrics}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      {t.discussion} ({proposal.comments})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      Discussion feature will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Community Voting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{getVotingMessage()}</p>
                
                {canVote && totalVotes > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        {t.support}: {proposal.votes.support}
                      </span>
                      <span>{Math.round((proposal.votes.support / totalVotes) * 100)}%</span>
                    </div>
                    <Progress value={(proposal.votes.support / totalVotes) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                        {t.oppose}: {proposal.votes.oppose}
                      </span>
                      <span>{Math.round((proposal.votes.oppose / totalVotes) * 100)}%</span>
                    </div>
                    <Progress value={(proposal.votes.oppose / totalVotes) * 100} className="h-2" />
                  </div>
                )}

                {canVote && (
                  <div className="flex gap-2 pt-4">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {t.support}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {t.oppose}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t.supporters}</span>
                  <span className="font-medium">{proposal.supporters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t.comments}</span>
                  <span className="font-medium">{proposal.comments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t.views}</span>
                  <span className="font-medium">{proposal.views}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}