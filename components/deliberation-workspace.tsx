"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, MessageCircle, Flag, Clock, TrendingUp } from "lucide-react"

interface Comment {
  id: string
  author: string
  avatar: string
  role: "member" | "expert" | "facilitator"
  timestamp: string
  content: string
  upvotes: number
  downvotes: number
  replies: Comment[]
  isExpert?: boolean
}

interface DeliberationWorkspaceProps {
  locale: "en" | "ne"
  proposalId: string
}

const content = {
  en: {
    title: "Deliberation Workspace",
    proposalTitle: "Implement Digital Voting System",
    circle: "Governance & Policy",
    status: "Deliberation",
    timeRemaining: "48 hours remaining",
    description:
      "Proposal to implement a secure digital voting system for all governance decisions. This system will ensure transparency, accessibility, and security in our democratic processes.",
    sewa: "SEWA Impact Assessment",
    sewaQ1: "How does this benefit EACH CITIZEN?",
    sewaA1:
      "Every citizen gains equal access to voting regardless of physical location or ability, increasing democratic participation.",
    sewaQ2: "How does this strengthen our SOCIAL FABRIC?",
    sewaA2:
      "Transparent voting builds trust in governance and strengthens community bonds through inclusive decision-making.",
    sewaQ3: "How does this contribute to Nepal's REGENERATION?",
    sewaA3: "Digital governance infrastructure is essential for Nepal's modernization and institutional innovation.",
    proArguments: "Pro Arguments",
    conArguments: "Con Arguments",
    expertInput: "Expert Input",
    discussion: "Discussion Thread",
    sentiment: "Community Sentiment",
    addComment: "Add Your Comment",
    commentPlaceholder: "Share your thoughts, evidence, or questions...",
    submit: "Submit Comment",
    upvote: "Upvote",
    downvote: "Downvote",
    reply: "Reply",
    flag: "Flag",
    members: "Members",
    votes: "Votes",
    supportPercentage: "Support",
    noComments: "No comments yet. Be the first to contribute!",
    facilitator: "Facilitator",
    expert: "Expert",
    member: "Member",
  },
  ne: {
    title: "विचार-विमर्श कार्यक्षेत्र",
    proposalTitle: "डिजिटल मतदान प्रणाली लागू गर्नुहोस्",
    circle: "शासन र नीति",
    status: "विचार-विमर्श",
    timeRemaining: "४८ घण्टा बाकी",
    description:
      "सबै शासन निर्णयहरूको लागि सुरक्षित डिजिटल मतदान प्रणाली लागू गर्ने प्रस्ताव। यो प्रणालीले हाम्रो लोकतान्त्रिक प्रक्रियामा पारदर्शिता, पहुँच र सुरक्षा सुनिश्चित गर्नेछ।",
    sewa: "SEWA प्रभाव मूल्यांकन",
    sewaQ1: "यो प्रत्येक नागरिकलाई कसरी लाभ गर्छ?",
    sewaA1: "प्रत्येक नागरिकले भौतिक स्थान वा क्षमता निर्विशेष मतदानमा समान पहुँच पाउँछ, जसले लोकतान्त्रिक भागीदारी बढाउँछ।",
    sewaQ2: "यो हाम्रो सामाजिक ताना-बाना कसरी शक्तिशाली गर्छ?",
    sewaA2: "पारदर्शी मतदानले शासनमा विश्वास बनाउँछ र समावेशी निर्णय गहनमार्फत सामुदायिक बन्धन शक्तिशाली गर्छ।",
    sewaQ3: "यो नेपालको पुनर्जन्मलाई कसरी योगदान गर्छ?",
    sewaA3: "डिजिटल शासन अवसंरचना नेपालको आधुनिकीकरण र संस्थागत नवाचारको लागि आवश्यक छ।",
    proArguments: "पक्षमा तर्कहरु",
    conArguments: "विपक्षमा तर्कहरु",
    expertInput: "विशेषज्ञ इनपुट",
    discussion: "छलफल थ्रेड",
    sentiment: "सामुदायिक भावना",
    addComment: "आफनो टिप्पणी थप्नुहोस्",
    commentPlaceholder: "आफनो विचार, प्रमाण वा प्रश्न साझा गर्नुहोस्...",
    submit: "टिप्पणी पेश गर्नुहोस्",
    upvote: "समर्थन गर्नुहोस्",
    downvote: "असमर्थन गर्नुहोस्",
    reply: "जवाफ दिनुहोस्",
    flag: "झण्डा लगाउनुहोस्",
    members: "सदस्यहरु",
    votes: "मतहरु",
    supportPercentage: "समर्थन",
    noComments: "अझै कुनै टिप्पणी छैन। पहिलो योगदान गर्नुहोस्!",
    facilitator: "सुविधाकर्ता",
    expert: "विशेषज्ञ",
    member: "सदस्य",
  },
}

const mockProArguments: Comment[] = [
  {
    id: "pro1",
    author: "Dr. Ramesh Kumar",
    avatar: "RK",
    role: "expert",
    timestamp: "2 hours ago",
    content:
      "Digital voting systems have proven to increase voter participation by 30-40% in comparable democracies. The security protocols are well-established and can be customized for Nepal's context.",
    upvotes: 45,
    downvotes: 2,
    replies: [],
    isExpert: true,
  },
  {
    id: "pro2",
    author: "Priya Sharma",
    avatar: "PS",
    role: "member",
    timestamp: "4 hours ago",
    content:
      "This would make voting accessible for people with disabilities and those living abroad. It's a step toward true inclusive democracy.",
    upvotes: 32,
    downvotes: 1,
    replies: [],
  },
]

const mockConArguments: Comment[] = [
  {
    id: "con1",
    author: "Arjun Patel",
    avatar: "AP",
    role: "member",
    timestamp: "3 hours ago",
    content:
      "We need to ensure digital literacy among all citizens first. Rural areas may face connectivity challenges that could exclude voters.",
    upvotes: 28,
    downvotes: 5,
    replies: [],
  },
  {
    id: "con2",
    author: "Prof. Anita Gupta",
    avatar: "AG",
    role: "expert",
    timestamp: "5 hours ago",
    content:
      "Cybersecurity infrastructure in Nepal needs significant strengthening. We should pilot this in limited circles first before full implementation.",
    upvotes: 38,
    downvotes: 3,
    replies: [],
    isExpert: true,
  },
]

const mockDiscussionComments: Comment[] = [
  {
    id: "d1",
    author: "Facilitator Team",
    avatar: "FT",
    role: "facilitator",
    timestamp: "6 hours ago",
    content:
      "Welcome to the deliberation workspace! Please share evidence-based arguments and questions. Let's keep the discussion civil and focused on the proposal's merits.",
    upvotes: 12,
    downvotes: 0,
    replies: [],
  },
  {
    id: "d2",
    author: "Deepak Singh",
    avatar: "DS",
    role: "member",
    timestamp: "5 hours ago",
    content: "Has anyone researched the cost implications? What would be the budget requirement for implementation?",
    upvotes: 18,
    downvotes: 0,
    replies: [
      {
        id: "d2r1",
        author: "Finance Working Group",
        avatar: "FWG",
        role: "expert",
        timestamp: "4 hours ago",
        content:
          "Estimated cost: NPR 25-30 crore for initial setup and NPR 5 crore annually for maintenance. This includes infrastructure, training, and security audits.",
        upvotes: 22,
        downvotes: 0,
        replies: [],
        isExpert: true,
      },
    ],
  },
]

function CommentCard({ comment, level = 0 }: { comment: Comment; level?: number }) {
  const t = content.en
  const [showReplyForm, setShowReplyForm] = useState(false)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "expert":
        return "bg-blue-100 text-blue-800"
      case "facilitator":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "expert":
        return t.expert
      case "facilitator":
        return t.facilitator
      default:
        return t.member
    }
  }

  return (
    <div className={`${level > 0 ? "ml-8 mt-4" : ""}`}>
      <Card className={level > 0 ? "border-l-2 border-primary" : ""}>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">{comment.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{comment.author}</span>
                {comment.role !== "member" && (
                  <Badge className={getRoleColor(comment.role)}>{getRoleLabel(comment.role)}</Badge>
                )}
                <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm mb-4">{comment.content}</p>
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 hover:text-primary transition">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.upvotes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-accent transition">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{comment.downvotes}</span>
                </button>
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-1 hover:text-primary transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.reply}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-accent transition">
                  <Flag className="h-4 w-4" />
                  <span>{t.flag}</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function DeliberationWorkspace({ locale, proposalId }: DeliberationWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("discussion")
  const [newComment, setNewComment] = useState("")
  const t = content[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">{t.proposalTitle}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="font-medium">{t.circle}:</span> Governance & Policy
                </span>
                <Badge className="bg-blue-100 text-blue-800">{t.status}</Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {t.timeRemaining}
                </span>
              </div>
            </div>
          </div>
          <p className="text-base text-foreground mb-6">{t.description}</p>
        </div>

        {/* SEWA Impact Assessment */}
        <Card className="mb-8 border-l-4 border-primary">
          <CardHeader>
            <CardTitle className="text-lg">{t.sewa}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">{t.sewaQ1}</h4>
              <p className="text-sm text-foreground">{t.sewaA1}</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">{t.sewaQ2}</h4>
              <p className="text-sm text-foreground">{t.sewaA2}</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">{t.sewaQ3}</h4>
              <p className="text-sm text-foreground">{t.sewaA3}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="pro">{t.proArguments}</TabsTrigger>
            <TabsTrigger value="con">{t.conArguments}</TabsTrigger>
            <TabsTrigger value="expert">{t.expertInput}</TabsTrigger>
            <TabsTrigger value="discussion">{t.discussion}</TabsTrigger>
          </TabsList>

          {/* Pro Arguments Tab */}
          <TabsContent value="pro" className="space-y-6">
            <div className="space-y-4">
              {mockProArguments.map((arg) => (
                <CommentCard key={arg.id} comment={arg} />
              ))}
            </div>
          </TabsContent>

          {/* Con Arguments Tab */}
          <TabsContent value="con" className="space-y-6">
            <div className="space-y-4">
              {mockConArguments.map((arg) => (
                <CommentCard key={arg.id} comment={arg} />
              ))}
            </div>
          </TabsContent>

          {/* Expert Input Tab */}
          <TabsContent value="expert" className="space-y-6">
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Impact Analysis Report</CardTitle>
                <CardDescription>Prepared by Finance & Technology Working Groups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Financial Impact</h4>
                  <p className="text-sm text-foreground">
                    Initial investment: NPR 25-30 crore. Annual maintenance: NPR 5 crore. ROI expected within 3 years through
                    increased participation and reduced administrative costs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Feasibility</h4>
                  <p className="text-sm text-foreground">
                    System can be implemented using proven open-source technologies. Requires 6-month development and
                    testing phase. Cybersecurity audit recommended before launch.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Social Impact</h4>
                  <p className="text-sm text-foreground">
                    Expected 30-40% increase in voter participation. Improved accessibility for people with disabilities
                    and diaspora members. Requires digital literacy training program.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discussion Thread Tab */}
          <TabsContent value="discussion" className="space-y-6">
            {/* Add Comment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.addComment}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={t.commentPlaceholder}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-24"
                />
                <Button className="bg-primary hover:bg-primary/90">{t.submit}</Button>
              </CardContent>
            </Card>

            {/* Comments */}
            <div className="space-y-4">
              {mockDiscussionComments.length > 0 ? (
                mockDiscussionComments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
              ) : (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <p className="text-muted-foreground">{t.noComments}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Sentiment */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t.sentiment}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
                <p className="text-sm text-muted-foreground">{t.supportPercentage}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                <p className="text-sm text-muted-foreground">{t.votes}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">342</div>
                <p className="text-sm text-muted-foreground">{t.members}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
