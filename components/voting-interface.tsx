"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, CheckCircle } from "lucide-react"

interface VotingOption {
  id: string
  title: string
  description: string
  votes: number
  percentage: number
}

interface VotingInterfaceProps {
  locale: "en" | "ne"
  proposalId: string
}

const content = {
  en: {
    title: "Voting Interface",
    proposalTitle: "Implement Digital Voting System",
    circle: "Governance & Policy",
    votingModel: "Voting Model",
    quadraticVoting: "Quadratic Voting",
    equalVoting: "1-Voice-1-Vote",
    voiceTokens: "Voice Tokens",
    availableTokens: "Available Tokens",
    votingPower: "Your Voting Power",
    votes: "Votes",
    tokenCost: "Token Cost",
    voteAllocation: "Vote Allocation",
    allocateVotes: "Allocate Your Votes",
    option: "Option",
    support: "Support",
    oppose: "Oppose",
    abstain: "Abstain",
    votingCostTable: "Voting Cost Table",
    numberOfVotes: "Number of Votes",
    cost: "Cost (Tokens)",
    totalCost: "Total Cost",
    remainingTokens: "Remaining Tokens",
    submitVote: "Submit Vote",
    confirmVote: "Confirm Your Vote",
    voteConfirmation: "Vote Confirmation",
    youAreVoting: "You are voting with",
    forOption: "for",
    voteSubmitted: "Vote Submitted Successfully",
    voteDetails: "Vote Details",
    timestamp: "Timestamp",
    transactionId: "Transaction ID",
    viewResults: "View Results",
    quadraticExplanation:
      "Quadratic voting prevents wealthy capture by making voting power = √(tokens). This means more tokens give you more votes, but with diminishing returns.",
    equalExplanation:
      "1-Voice-1-Vote ensures equal weight for all verified members on fundamental governance questions, regardless of token balance.",
    minimumTokens: "Minimum 10 tokens required to vote",
    insufficientTokens: "You do not have enough tokens to vote",
    votingClosed: "Voting has ended for this proposal",
    votingNotStarted: "Voting has not started yet",
    currentResults: "Current Results",
    timeRemaining: "Time Remaining",
    hours: "hours",
    minutes: "minutes",
  },
  ne: {
    title: "मतदान इन्टरफेस",
    proposalTitle: "डिजिटल मतदान प्रणाली लागू गर्नुहोस्",
    circle: "शासन र नीति",
    votingModel: "मतदान मोडेल",
    quadraticVoting: "द्विघात मतदान",
    equalVoting: "१-आवाज-१-मत",
    voiceTokens: "आवाज टोकन",
    availableTokens: "उपलब्ध टोकन",
    votingPower: "आपको मतदान शक्ति",
    votes: "मतहरु",
    tokenCost: "टोकन लागत",
    voteAllocation: "मत आवंटन",
    allocateVotes: "आपको मतहरु आवंटित गर्नुहोस्",
    option: "विकल्प",
    support: "समर्थन",
    oppose: "विरोध",
    abstain: "निरपेक्ष",
    votingCostTable: "मतदान लागत तालिका",
    numberOfVotes: "मतहरुको संख्या",
    cost: "लागत (टोकन)",
    totalCost: "कुल लागत",
    remainingTokens: "बाकी टोकन",
    submitVote: "मत पेश गर्नुहोस्",
    confirmVote: "आपको मत पुष्टि गर्नुहोस्",
    voteConfirmation: "मत पुष्टिकरण",
    youAreVoting: "तपाई मतदान गर्दै हुनुहुन्छ",
    forOption: "को लागि",
    voteSubmitted: "मत सफलतापूर्वक पेश गरियो",
    voteDetails: "मत विवरण",
    timestamp: "समय मुहुर्त",
    transactionId: "लेनदेन आईडी",
    viewResults: "परिणाम हेर्नुहोस्",
    quadraticExplanation:
      "द्विघात मतदान धनी कब्जा रोक्छ मतदान शक्ति = √(टोकन) बनाएर। यसको मतलब अधिक टोकन आपलाई अधिक मत दिन्छ, तर घटते रिटर्नको साथ।",
    equalExplanation: "१-आवाज-१-मत सबै प्रमाणित सदस्यहरूलाई मौलिक शासन प्रश्नहरूमा समान वजन सुनिश्चित गर्छ, टोकन ब्यालेन्स निर्विशेष।",
    minimumTokens: "मतदान गर्न कम से कम १० टोकन आवश्यक छ",
    insufficientTokens: "तपाईसँग मतदान गर्न पर्याप्त टोकन छैन",
    votingClosed: "यो प्रस्तावको लागि मतदान समाप्त भएको छ",
    votingNotStarted: "यो प्रस्तावको लागि मतदान सुरु भएको छैन",
    currentResults: "वर्तमान परिणाम",
    timeRemaining: "बाकी समय",
    hours: "घण्टा",
    minutes: "मिनेट",
  },
}

// Quadratic voting cost calculator
function calculateQuadraticCost(votes: number): number {
  return votes * votes
}

function calculateQuadraticVotes(tokens: number): number {
  return Math.sqrt(tokens)
}

export default function VotingInterface({ locale, proposalId }: VotingInterfaceProps) {
  const [votingModel, setVotingModel] = useState<"quadratic" | "equal">("quadratic")
  const [availableTokens] = useState(270)
  const [supportVotes, setSupportVotes] = useState(0)
  const [opposeVotes, setOpposeVotes] = useState(0)
  const [abstainVotes, setAbstainVotes] = useState(0)
  const [voteSubmitted, setVoteSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("allocate")

  const t = content[locale]

  // Calculate costs
  const supportCost = calculateQuadraticCost(supportVotes)
  const opposeCost = calculateQuadraticCost(opposeVotes)
  const abstainCost = calculateQuadraticCost(abstainVotes)
  const totalCost = supportCost + opposeCost + abstainCost
  const remainingTokens = availableTokens - totalCost

  // Calculate voting power
  const maxVotingPower = calculateQuadraticVotes(availableTokens)
  const currentVotingPower = calculateQuadraticVotes(totalCost)

  // Voting cost table
  const votingCostTable = [
    { votes: 1, cost: 1 },
    { votes: 2, cost: 4 },
    { votes: 3, cost: 9 },
    { votes: 4, cost: 16 },
    { votes: 5, cost: 25 },
    { votes: 6, cost: 36 },
    { votes: 7, cost: 49 },
    { votes: 8, cost: 64 },
  ]

  // Mock voting options
  const votingOptions: VotingOption[] = [
    {
      id: "support",
      title: t.support,
      description: "I support this proposal",
      votes: 156,
      percentage: 68,
    },
    {
      id: "oppose",
      title: t.oppose,
      description: "I oppose this proposal",
      votes: 52,
      percentage: 23,
    },
    {
      id: "abstain",
      title: t.abstain,
      description: "I abstain from voting",
      votes: 20,
      percentage: 9,
    },
  ]

  const handleSubmitVote = () => {
    if (remainingTokens < 0) return
    setVoteSubmitted(true)
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{t.proposalTitle}</p>
          <div className="flex items-center gap-4 text-sm">
            <Badge className="bg-blue-100 text-blue-800">{t.circle}</Badge>
            <span className="text-muted-foreground">
              {t.timeRemaining}: 24 {t.hours} 15 {t.minutes}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Voting Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Voting Model Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.votingModel}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      name="votingModel"
                      value="quadratic"
                      checked={votingModel === "quadratic"}
                      onChange={(e) => setVotingModel(e.target.value as "quadratic" | "equal")}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{t.quadraticVoting}</div>
                      <p className="text-sm text-muted-foreground">{t.quadraticExplanation}</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      name="votingModel"
                      value="equal"
                      checked={votingModel === "equal"}
                      onChange={(e) => setVotingModel(e.target.value as "quadratic" | "equal")}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{t.equalVoting}</div>
                      <p className="text-sm text-muted-foreground">{t.equalExplanation}</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Vote Allocation */}
            {votingModel === "quadratic" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.allocateVotes}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Support Votes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold">{t.support}</label>
                      <span className="text-sm text-muted-foreground">
                        {supportVotes} {t.votes} ({supportCost} {t.tokenCost})
                      </span>
                    </div>
                    <Slider
                      value={[supportVotes]}
                      onValueChange={(value) => setSupportVotes(value[0])}
                      max={Math.floor(calculateQuadraticVotes(availableTokens))}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Oppose Votes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold">{t.oppose}</label>
                      <span className="text-sm text-muted-foreground">
                        {opposeVotes} {t.votes} ({opposeCost} {t.tokenCost})
                      </span>
                    </div>
                    <Slider
                      value={[opposeVotes]}
                      onValueChange={(value) => setOpposeVotes(value[0])}
                      max={Math.floor(calculateQuadraticVotes(availableTokens - supportCost))}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Abstain Votes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold">{t.abstain}</label>
                      <span className="text-sm text-muted-foreground">
                        {abstainVotes} {t.votes} ({abstainCost} {t.tokenCost})
                      </span>
                    </div>
                    <Slider
                      value={[abstainVotes]}
                      onValueChange={(value) => setAbstainVotes(value[0])}
                      max={Math.floor(calculateQuadraticVotes(availableTokens - supportCost - opposeCost))}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Voting Cost Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.votingCostTable}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">{t.numberOfVotes}</th>
                        <th className="text-left py-2 px-2">{t.cost}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {votingCostTable.map((row) => (
                        <tr key={row.votes} className="border-b hover:bg-muted">
                          <td className="py-2 px-2">{row.votes}</td>
                          <td className="py-2 px-2 font-semibold">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Token Summary */}
            <Card className="border-l-4 border-primary">
              <CardHeader>
                <CardTitle className="text-lg">{t.voiceTokens}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.availableTokens}</p>
                  <p className="text-3xl font-bold text-primary">{availableTokens}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">{t.totalCost}</p>
                  <p className="text-2xl font-bold text-accent">{totalCost}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">{t.remainingTokens}</p>
                  <p className={`text-2xl font-bold ${remainingTokens >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {remainingTokens}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Voting Power */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.votingPower}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.currentVotes}</p>
                  <p className="text-3xl font-bold text-primary">{currentVotingPower.toFixed(2)}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Formula: √(tokens spent)</p>
                  <p className="text-sm">
                    √{totalCost} = {currentVotingPower.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Vote */}
            <Button
              onClick={handleSubmitVote}
              disabled={remainingTokens < 0 || (supportVotes === 0 && opposeVotes === 0 && abstainVotes === 0)}
              className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
            >
              {t.submitVote}
            </Button>

            {remainingTokens < 0 && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{t.insufficientTokens}</p>
              </div>
            )}
          </div>
        </div>

        {/* Vote Confirmation Modal */}
        {voteSubmitted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle>{t.voteSubmitted}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.support}:</span>
                    <span className="font-semibold">{supportVotes} votes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.oppose}:</span>
                    <span className="font-semibold">{opposeVotes} votes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.abstain}:</span>
                    <span className="font-semibold">{abstainVotes} votes</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-muted-foreground">{t.totalCost}:</span>
                    <span className="font-semibold">{totalCost} tokens</span>
                  </div>
                </div>
                <Button onClick={() => setVoteSubmitted(false)} className="w-full bg-primary hover:bg-primary/90">
                  {t.viewResults}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
