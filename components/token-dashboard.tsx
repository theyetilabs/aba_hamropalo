"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Award, Users, FileText, Zap, AlertCircle, Flame } from "lucide-react"

interface TokenActivity {
  id: string
  type: "mint" | "burn"
  activity: string
  amount: number
  date: string
  status: "completed" | "pending"
}

interface TokenDashboardProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Voice Token Dashboard",
    subtitle: "Manage your governance participation and voice tokens",
    tokenBalance: "Token Balance",
    votingPower: "Voting Power",
    monthlyEarnings: "Monthly Earnings",
    totalMinted: "Total Minted",
    totalBurned: "Total Burned",
    lastActivity: "Last Activity",
    earningOpportunities: "Earning Opportunities",
    tokenHistory: "Token History",
    tokenSystem: "Token System",
    tokenLedger: "Token Ledger",
    activity: "Activity",
    amount: "Amount",
    date: "Date",
    status: "Status",
    completed: "Completed",
    pending: "Pending",
    meetingAttendance: "Meeting Attendance",
    meetingAttendanceDesc: "Attend circle meetings",
    meetingReward: "10 tokens per meeting",
    proposalSubmission: "Proposal Submission",
    proposalSubmissionDesc: "Submit and get approved proposals",
    proposalReward: "50 tokens per proposal",
    communityService: "Community Service",
    communityServiceDesc: "Participate in service projects",
    serviceReward: "25-100 tokens per project",
    mentorship: "Mentorship",
    mentorshipDesc: "Guide and mentor new members",
    mentorReward: "25 tokens per mentee/month",
    leadership: "Leadership Roles",
    leadershipDesc: "Take on circle facilitator roles",
    leadershipReward: "100 tokens per month",
    peerRecognition: "Peer Recognition",
    peerRecognitionDesc: "Receive recognition from peers",
    peerReward: "10 tokens per recognition",
    claimReward: "Claim Reward",
    viewDetails: "View Details",
    tokenSystemInfo: "Token System Information",
    totalSupply: "Total Supply",
    activeParticipationPool: "Active Participation Pool",
    reservePool: "Reserve/Future Pool",
    governancePool: "Governance Operations Pool",
    quadraticVoting: "Quadratic Voting",
    quadraticVotingDesc: "Voting power = √(tokens). Prevents wealthy capture.",
    equalVoting: "1-Voice-1-Vote",
    equalVotingDesc: "One verified member = one vote on fundamental issues.",
    inactivityBurn: "Inactivity Burn",
    inactivityBurnDesc: "50% of tokens burned after 6 months of inactivity",
    conductViolation: "Conduct Violation",
    conductViolationDesc: "Tokens burned for governance violations",
    monthlyChart: "Monthly Token Activity",
    tokens: "Tokens",
    minted: "Minted",
    burned: "Burned",
    net: "Net",
    yourVotingPower: "Your Voting Power",
    maxVotingPower: "Max Voting Power",
    formula: "Formula: √(token balance)",
    currentBalance: "Current Balance",
    nextMilestone: "Next Milestone",
    tokensToNextMilestone: "Tokens to Next Milestone",
    inactivityWarning: "Inactivity Warning",
    lastActivityDate: "Last Activity",
    daysInactive: "Days Inactive",
    burnWarning: "Your tokens will be burned in",
    days: "days",
    if: "if",
    noActivity: "you don't participate",
    participateNow: "Participate Now",
    tokenBreakdown: "Token Breakdown",
    earned: "Earned",
    burned: "Burned",
    available: "Available",
    locked: "Locked",
    leadershipTokens: "Leadership Tokens",
    leadershipTokensDesc: "Temporary tokens from leadership roles",
    expiresOn: "Expires on",
  },
  ne: {
    title: "आवाज टोकन ड्यासबोर्ड",
    subtitle: "आपको शासन भागीदारी र आवाज टोकन प्रबन्ध गर्नुहोस्",
    tokenBalance: "टोकन ब्यालेन्स",
    votingPower: "मतदान शक्ति",
    monthlyEarnings: "मासिक आय",
    totalMinted: "कुल टकसाली",
    totalBurned: "कुल जलाइएको",
    lastActivity: "अन्तिम गतिविधि",
    earningOpportunities: "आय अवसर",
    tokenHistory: "टोकन इतिहास",
    tokenSystem: "टोकन प्रणाली",
    tokenLedger: "टोकन खाता",
    activity: "गतिविधि",
    amount: "रकम",
    date: "मिति",
    status: "स्थिति",
    completed: "पूर्ण",
    pending: "लम्बित",
    meetingAttendance: "बैठक उपस्थिति",
    meetingAttendanceDesc: "सर्कल बैठकमा भाग लिनुहोस्",
    meetingReward: "प्रति बैठक १० टोकन",
    proposalSubmission: "प्रस्ताव जमा",
    proposalSubmissionDesc: "प्रस्ताव जमा र अनुमोदन पाउनुहोस्",
    proposalReward: "प्रति प्रस्ताव ५० टोकन",
    communityService: "सामुदायिक सेवा",
    communityServiceDesc: "सेवा परियोजनामा भाग लिनुहोस्",
    serviceReward: "प्रति परियोजना २५-१०० टोकन",
    mentorship: "मेन्टरशिप",
    mentorshipDesc: "नयाँ सदस्यहरूलाई गाइड र मेन्टर गर्नुहोस्",
    mentorReward: "प्रति मेन्टी/महिना २५ टोकन",
    leadership: "नेतृत्व भूमिका",
    leadershipDesc: "सर्कल सुविधाकर्ता भूमिका लिनुहोस्",
    leadershipReward: "प्रति महिना १०० टोकन",
    peerRecognition: "साथी मान्यता",
    peerRecognitionDesc: "साथीहरूबाट मान्यता पाउनुहोस्",
    peerReward: "प्रति मान्यता १० टोकन",
    claimReward: "पुरस्कार दावी गर्नुहोस्",
    viewDetails: "विवरण हेर्नुहोस्",
    tokenSystemInfo: "टोकन प्रणाली जानकारी",
    totalSupply: "कुल आपूर्ति",
    activeParticipationPool: "सक्रिय भागीदारी पूल",
    reservePool: "रिजर्व/भविष्य पूल",
    governancePool: "शासन संचालन पूल",
    quadraticVoting: "द्विघात मतदान",
    quadraticVotingDesc: "मतदान शक्ति = √(टोकन)। धनी कब्जा रोक्छ।",
    equalVoting: "१-आवाज-१-मत",
    equalVotingDesc: "एक प्रमाणित सदस्य = मौलिक मुद्दामा एक मत।",
    inactivityBurn: "निष्क्रियता जलन",
    inactivityBurnDesc: "६ महिनाको निष्क्रियता पछि ५०% टोकन जलाइन्छ",
    conductViolation: "आचरण उल्लंघन",
    conductViolationDesc: "शासन उल्लंघनको लागि टोकन जलाइन्छ",
    monthlyChart: "मासिक टोकन गतिविधि",
    tokens: "टोकन",
    minted: "टकसाली",
    burned: "जलाइएको",
    net: "शुद्ध",
    yourVotingPower: "आपको मतदान शक्ति",
    maxVotingPower: "अधिकतम मतदान शक्ति",
    formula: "सूत्र: √(टोकन ब्यालेन्स)",
    currentBalance: "वर्तमान ब्यालेन्स",
    nextMilestone: "अगलो माइलस्टोन",
    tokensToNextMilestone: "अगलो माइलस्टोनमा टोकन",
    inactivityWarning: "निष्क्रियता चेतावनी",
    lastActivityDate: "अन्तिम गतिविधि",
    daysInactive: "निष्क्रिय दिनहरु",
    burnWarning: "आपको टोकन जलाइनेछ",
    days: "दिनहरु",
    if: "यदि",
    noActivity: "तपाई भाग लिनुहुन्न",
    participateNow: "अब भाग लिनुहोस्",
    tokenBreakdown: "टोकन विभाजन",
    earned: "अर्जित",
    burned: "जलाइएको",
    available: "उपलब्ध",
    locked: "लक गरिएको",
    leadershipTokens: "नेतृत्व टोकन",
    leadershipTokensDesc: "नेतृत्व भूमिकाबाट अस्थायी टोकन",
    expiresOn: "को लागि समाप्त हुन्छ",
  },
}

const mockActivities: TokenActivity[] = [
  {
    id: "1",
    type: "mint",
    activity: "Meeting Attendance - Governance Circle",
    amount: 10,
    date: "2025-10-18",
    status: "completed",
  },
  {
    id: "2",
    type: "mint",
    activity: "Proposal Submission - Digital Voting System",
    amount: 50,
    date: "2025-10-15",
    status: "completed",
  },
  {
    id: "3",
    type: "mint",
    activity: "Community Service - Local Cleanup",
    amount: 25,
    date: "2025-10-12",
    status: "completed",
  },
  {
    id: "4",
    type: "burn",
    activity: "Voting - Budget Allocation",
    amount: -8,
    date: "2025-10-10",
    status: "completed",
  },
  {
    id: "5",
    type: "mint",
    activity: "Mentorship - Onboarding New Member",
    amount: 25,
    date: "2025-10-08",
    status: "completed",
  },
]

const earningOpportunities = [
  {
    id: "meeting",
    icon: Users,
    title: "Meeting Attendance",
    description: "Attend circle meetings",
    reward: "10 tokens",
    frequency: "Per meeting",
    available: true,
  },
  {
    id: "proposal",
    icon: FileText,
    title: "Proposal Submission",
    description: "Submit and get approved proposals",
    reward: "50 tokens",
    frequency: "Per proposal",
    available: true,
  },
  {
    id: "service",
    icon: Award,
    title: "Community Service",
    description: "Participate in service projects",
    reward: "25-100 tokens",
    frequency: "Per project",
    available: true,
  },
  {
    id: "mentor",
    icon: Users,
    title: "Mentorship",
    description: "Guide and mentor new members",
    reward: "25 tokens",
    frequency: "Per mentee/month",
    available: false,
  },
  {
    id: "leadership",
    icon: Zap,
    title: "Leadership Roles",
    description: "Take on circle facilitator roles",
    reward: "100 tokens",
    frequency: "Per month",
    available: false,
  },
  {
    id: "recognition",
    icon: Award,
    title: "Peer Recognition",
    description: "Receive recognition from peers",
    reward: "10 tokens",
    frequency: "Per recognition",
    available: true,
  },
]

export default function TokenDashboard({ locale }: TokenDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const t = content[locale]

  const userTokenBalance = 270
  const totalMinted = 320
  const totalBurned = 50
  const votingPower = Math.sqrt(userTokenBalance)
  const maxVotingPower = Math.sqrt(1000)
  const lastActivityDays = 2

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.tokenBalance}</p>
                <p className="text-3xl font-bold text-primary">{userTokenBalance}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.votingPower}</p>
                <p className="text-3xl font-bold text-blue-600">{votingPower.toFixed(1)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.monthlyEarnings}</p>
                <p className="text-3xl font-bold text-green-600">+110</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.totalMinted}</p>
                <p className="text-3xl font-bold text-green-600">{totalMinted}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.totalBurned}</p>
                <p className="text-3xl font-bold text-red-600">{totalBurned}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Voting Power Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t.yourVotingPower}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{t.currentBalance}</span>
                      <span className="text-2xl font-bold text-primary">{votingPower.toFixed(2)}</span>
                    </div>
                    <Progress value={(votingPower / maxVotingPower) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">{t.formula}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-900">
                      √{userTokenBalance} = {votingPower.toFixed(2)} {t.votes}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Inactivity Warning */}
              <Card className="border-l-4 border-red-500">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    {t.inactivityWarning}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.lastActivityDate}</p>
                    <p className="font-semibold">
                      {lastActivityDays} {t.daysInactive}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded text-sm text-red-900">
                    {t.burnWarning} <span className="font-bold">178 {t.days}</span> {t.if} {t.noActivity}
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">{t.participateNow}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Token Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>{t.tokenBreakdown}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t.earned}</p>
                    <p className="text-2xl font-bold text-green-600">{totalMinted}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t.burned}</p>
                    <p className="text-2xl font-bold text-red-600">{totalBurned}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t.available}</p>
                    <p className="text-2xl font-bold text-blue-600">{userTokenBalance}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t.locked}</p>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earningOpportunities.map((opp) => {
                const Icon = opp.icon
                return (
                  <Card key={opp.id} className={opp.available ? "" : "opacity-60"}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{opp.title}</CardTitle>
                            <CardDescription className="text-xs">{opp.frequency}</CardDescription>
                          </div>
                        </div>
                        {!opp.available && <Badge variant="outline">Locked</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{opp.description}</p>
                      <div className="text-2xl font-bold text-primary">{opp.reward}</div>
                      <Button disabled={!opp.available} className="w-full bg-primary hover:bg-primary/90">
                        {opp.available ? t.claimReward : "Locked"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.tokenLedger}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">{t.activity}</th>
                        <th className="text-right py-3 px-2">{t.amount}</th>
                        <th className="text-left py-3 px-2">{t.date}</th>
                        <th className="text-left py-3 px-2">{t.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockActivities.map((activity) => (
                        <tr key={activity.id} className="border-b hover:bg-muted">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              {activity.type === "mint" ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span>{activity.activity}</span>
                            </div>
                          </td>
                          <td
                            className={`text-right py-3 px-2 font-semibold ${activity.type === "mint" ? "text-green-600" : "text-red-600"}`}
                          >
                            {activity.type === "mint" ? "+" : ""}
                            {activity.amount}
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">{activity.date}</td>
                          <td className="py-3 px-2">
                            {activity.status === "completed" ? (
                              <Badge className="bg-green-100 text-green-800">{t.completed}</Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">{t.pending}</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Token Supply */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.tokenSystemInfo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.totalSupply}</p>
                    <p className="text-2xl font-bold">30,000,000</p>
                  </div>
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t.activeParticipationPool}</span>
                      <span className="font-semibold">60% (18M)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t.reservePool}</span>
                      <span className="font-semibold">30% (9M)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t.governancePool}</span>
                      <span className="font-semibold">10% (3M)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voting Models */}
              <Card>
                <CardHeader>
                  <CardTitle>Voting Models</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">{t.quadraticVoting}</h4>
                    <p className="text-sm text-muted-foreground">{t.quadraticVotingDesc}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">{t.equalVoting}</h4>
                    <p className="text-sm text-muted-foreground">{t.equalVotingDesc}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Token Burning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-600" />
                  Token Burning Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-1">{t.inactivityBurn}</h4>
                  <p className="text-sm text-red-800">{t.inactivityBurnDesc}</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-1">{t.conductViolation}</h4>
                  <p className="text-sm text-red-800">{t.conductViolationDesc}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
