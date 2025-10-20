"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import CommentThread from "@/components/comment-thread"
import { MessageCircle, TrendingUp, Users, Clock, AlertCircle } from "lucide-react"

interface DeliberationWorkspaceEnhancedProps {
  locale: "en" | "ne"
}

interface Comment {
  id: string
  author: string
  avatar: string
  role: "member" | "expert" | "facilitator"
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies: Comment[]
}

const content = {
  en: {
    title: "Deliberation Workspace",
    proposal: "Proposal",
    circle: "Circle",
    status: "Status",
    voting: "Voting",
    discussion: "Discussion",
    proAndCon: "Pro & Con",
    expertInput: "Expert Input",
    sentiment: "Community Sentiment",
    support: "Support",
    oppose: "Oppose",
    abstain: "Abstain",
    participants: "Participants",
    comments: "Comments",
    timeRemaining: "Time Remaining",
    days: "days",
    hours: "hours",
    sewaImpact: "SEWA Impact Assessment",
    question1: "Does this proposal strengthen our community?",
    question2: "Is this economically sustainable?",
    question3: "Does this align with our values?",
    yes: "Yes",
    no: "No",
    neutral: "Neutral",
    viewAll: "View All",
    addComment: "Add Comment",
  },
  ne: {
    title: "विचार-विमर्श कार्यक्षेत्र",
    proposal: "प्रस्ताव",
    circle: "सर्कल",
    status: "स्थिति",
    voting: "मतदान",
    discussion: "छलफल",
    proAndCon: "पक्ष र विपक्ष",
    expertInput: "विशेषज्ञ इनपुट",
    sentiment: "समुदाय भावना",
    support: "समर्थन",
    oppose: "विरोध",
    abstain: "निरपेक्ष",
    participants: "प्रतिभागीहरु",
    comments: "टिप्पणीहरु",
    timeRemaining: "बाकी समय",
    days: "दिनहरु",
    hours: "घण्टाहरु",
    sewaImpact: "SEWA प्रभाव मूल्यांकन",
    question1: "के यो प्रस्ताव हाम्रो समुदायलाई शक्तिशाली बनाउँछ?",
    question2: "के यो आर्थिक रूपमा टिकाऊ छ?",
    question3: "के यो हाम्रो मूल्यबोधको साथ संरेखित छ?",
    yes: "हो",
    no: "होइन",
    neutral: "तटस्थ",
    viewAll: "सबै हेर्नुहोस्",
    addComment: "टिप्पणी थप्नुहोस्",
  },
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Dr. Ramesh Sharma",
    avatar: "RS",
    role: "expert",
    content:
      "This proposal addresses a critical gap in our governance framework. The implementation timeline is realistic and the budget allocation is appropriate for the scope.",
    timestamp: "2 hours ago",
    likes: 24,
    dislikes: 1,
    replies: [
      {
        id: "1-1",
        author: "Priya Patel",
        avatar: "PP",
        role: "member",
        content: "I agree with Dr. Sharma. The technical aspects are well thought out.",
        timestamp: "1 hour ago",
        likes: 8,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "Facilitator - Anita Gupta",
    avatar: "AG",
    role: "facilitator",
    content:
      "Thank you all for the thoughtful discussion. We have received several important points about implementation. Let's focus on the budget allocation in the next session.",
    timestamp: "30 minutes ago",
    likes: 15,
    dislikes: 0,
    replies: [],
  },
]

export default function DeliberationWorkspaceEnhanced({ locale }: DeliberationWorkspaceEnhancedProps) {
  const t = content[locale]
  const [comments, setComments] = useState<Comment[]>(mockComments)

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `${comments.length + 1}`,
      author: "You",
      avatar: "YO",
      role: "member",
      content,
      timestamp: "just now",
      likes: 0,
      dislikes: 0,
      replies: [],
    }
    setComments([newComment, ...comments])
  }

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
          <p className="text-lg text-muted-foreground">
            {locale === "en"
              ? "Engage in thoughtful deliberation on important proposals"
              : "महत्त्वपूर्ण प्रस्तावहरुमा विचारशील विचार-विमर्शमा संलग्न हुनुहोस्"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Proposal Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Digital Voting System Implementation</CardTitle>
                    <CardDescription>
                      {t.circle}: Governance & Policy | {t.status}: Active
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{t.voting}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {locale === "en"
                    ? "This proposal aims to implement a secure, transparent digital voting system for all governance decisions. The system will ensure accessibility, security, and real-time vote counting."
                    : "यो प्रस्ताव सबै शासन निर्णयहरुको लागि एक सुरक्षित, पारदर्शी डिजिटल मतदान प्रणाली कार्यान्वयन गर्ने लक्ष्य राखता छ।"}
                </p>

                {/* SEWA Impact */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">{t.sewaImpact}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">{t.question1}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{t.yes}: 78%</Badge>
                        <Badge variant="outline">{t.no}: 12%</Badge>
                        <Badge variant="outline">{t.neutral}: 10%</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">{t.question2}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{t.yes}: 85%</Badge>
                        <Badge variant="outline">{t.no}: 8%</Badge>
                        <Badge variant="outline">{t.neutral}: 7%</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">{t.question3}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{t.yes}: 92%</Badge>
                        <Badge variant="outline">{t.no}: 3%</Badge>
                        <Badge variant="outline">{t.neutral}: 5%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="discussion" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discussion">{t.discussion}</TabsTrigger>
                <TabsTrigger value="procon">{t.proAndCon}</TabsTrigger>
                <TabsTrigger value="expert">{t.expertInput}</TabsTrigger>
              </TabsList>

              {/* Discussion Tab */}
              <TabsContent value="discussion" className="mt-6">
                <CommentThread comments={comments} locale={locale} onAddComment={handleAddComment} />
              </TabsContent>

              {/* Pro & Con Tab */}
              <TabsContent value="procon" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-900">
                        {locale === "en" ? "Pro Arguments" : "पक्ष तर्कहरु"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-green-600 font-bold">+</span>
                        <p className="text-sm">
                          {locale === "en" ? "Increases transparency and accessibility" : "पारदर्शिता र पहुँच बढाउँछ"}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-green-600 font-bold">+</span>
                        <p className="text-sm">
                          {locale === "en" ? "Reduces voting fraud and manipulation" : "मतदान धोखाधडी र हेरफेर कम गर्छ"}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-green-600 font-bold">+</span>
                        <p className="text-sm">
                          {locale === "en" ? "Enables real-time vote counting" : "वास्तविक समय मत गणना सक्षम गर्छ"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-red-900">
                        {locale === "en" ? "Con Arguments" : "विपक्ष तर्कहरु"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-red-600 font-bold">-</span>
                        <p className="text-sm">
                          {locale === "en"
                            ? "Requires significant infrastructure investment"
                            : "महत्त्वपूर्ण अवसंरचना निवेश आवश्यक छ"}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-600 font-bold">-</span>
                        <p className="text-sm">
                          {locale === "en"
                            ? "Digital divide may exclude some voters"
                            : "डिजिटल विभाजन कुछ मतदाताहरुलाई बाहिर राख्न सक्छ"}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-600 font-bold">-</span>
                        <p className="text-sm">
                          {locale === "en"
                            ? "Cybersecurity risks need careful management"
                            : "साइबर सुरक्षा जोखिमहरु सावधानीपूर्वक व्यवस्थापन आवश्यक छ"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Expert Input Tab */}
              <TabsContent value="expert" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.expertInput}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <p className="font-semibold text-purple-900">Dr. Ramesh Sharma - Technology Expert</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {locale === "en"
                          ? "The proposed system architecture is sound and follows international best practices. The security protocols are robust and the implementation timeline is realistic."
                          : "प्रस्तावित प्रणाली आर्किटेक्चर ठोस छ र अन्तर्राष्ट्रिय सर्वोत्तम अभ्यास अनुसरण गर्छ।"}
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-semibold text-blue-900">Prof. Anita Verma - Policy Expert</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {locale === "en"
                          ? "From a policy perspective, this initiative aligns well with our governance modernization goals. The implementation should include provisions for digital literacy training."
                          : "नीति दृष्टिकोणबाट, यो पहल हाम्रो शासन आधुनिकीकरण लक्ष्यहरुको साथ राम्रोसँग संरेखित छ।"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sentiment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.sentiment}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t.support}</span>
                    <span className="text-sm font-semibold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t.oppose}</span>
                    <span className="text-sm font-semibold">18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t.abstain}</span>
                    <span className="text-sm font-semibold">14%</span>
                  </div>
                  <Progress value={14} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{locale === "en" ? "Statistics" : "तथ्यांक"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.participants}</p>
                    <p className="font-semibold">342</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.comments}</p>
                    <p className="font-semibold">156</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.timeRemaining}</p>
                    <p className="font-semibold">
                      3 {t.days} 12 {t.hours}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{locale === "en" ? "Engagement" : "संलग्नता"}</p>
                    <p className="font-semibold">High</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">
                      {locale === "en" ? "Voting Begins Soon" : "मतदान शीघ्र सुरु हुनेछ"}
                    </p>
                    <p className="text-xs text-yellow-800 mt-1">
                      {locale === "en"
                        ? "Voting will begin in 2 days. Make sure to review all materials."
                        : "मतदान २ दिनमा सुरु हुनेछ। सबै सामग्री समीक्षा गर्न निश्चित गर्नुहोस्।"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
