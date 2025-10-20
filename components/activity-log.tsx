"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Vote, 
  UserPlus, 
  FileText, 
  Settings, 
  Shield, 
  Calendar,
  Search,
  Filter
} from "lucide-react"

interface ActivityLogProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Activity Log",
    subtitle: "Track all activities and events on the platform",
    searchPlaceholder: "Search activities...",
    filterAll: "All Activities",
    filterProposals: "Proposals",
    filterVoting: "Voting",
    filterComments: "Comments",
    filterUsers: "User Actions",
    filterSystem: "System Events",
    timeAgo: {
      now: "Just now",
      minute: "1 minute ago",
      minutes: "minutes ago",
      hour: "1 hour ago",
      hours: "hours ago",
      day: "1 day ago",
      days: "days ago",
      week: "1 week ago",
      weeks: "weeks ago",
    },
    activities: {
      proposal_created: "created a new proposal",
      proposal_updated: "updated proposal",
      vote_cast: "voted on proposal",
      comment_added: "commented on proposal",
      user_registered: "joined the platform",
      user_verified: "completed verification",
      circle_joined: "joined circle",
      circle_created: "created new circle",
      system_update: "System updated",
      maintenance: "Maintenance completed",
    }
  },
  ne: {
    title: "गतिविधि लग",
    subtitle: "प्ल्याटफर्ममा सबै गतिविधि र घटनाहरू ट्र्याक गर्नुहोस्",
    searchPlaceholder: "गतिविधिहरू खोज्नुहोस्...",
    filterAll: "सबै गतिविधिहरू",
    filterProposals: "प्रस्तावहरू",
    filterVoting: "मतदान",
    filterComments: "टिप्पणीहरू",
    filterUsers: "प्रयोगकर्ता कार्यहरू",
    filterSystem: "प्रणाली घटनाहरू",
    timeAgo: {
      now: "अहिले",
      minute: "१ मिनेट अगाडि",
      minutes: "मिनेट अगाडि",
      hour: "१ घण्टा अगाडि",
      hours: "घण्टा अगाडि",
      day: "१ दिन अगाडि",
      days: "दिन अगाडि",
      week: "१ हप्ता अगाडि",
      weeks: "हप्ता अगाडि",
    },
    activities: {
      proposal_created: "नयाँ प्रस्ताव सिर्जना गर्यो",
      proposal_updated: "प्रस्ताव अपडेट गर्यो",
      vote_cast: "प्रस्तावमा मत दियो",
      comment_added: "प्रस्तावमा टिप्पणी गर्यो",
      user_registered: "प्ल्याटफर्ममा सामेल भयो",
      user_verified: "प्रमाणीकरण पूरा गर्यो",
      circle_joined: "सर्कलमा सामेल भयो",
      circle_created: "नयाँ सर्कल सिर्जना गर्यो",
      system_update: "प्रणाली अपडेट भयो",
      maintenance: "मर्मत पूरा भयो",
    }
  }
}

// Demo data for activity log
const demoActivities = [
  {
    id: "1",
    type: "proposal_created",
    user: {
      name: "राम बहादुर थापा",
      avatar: "/placeholder-user.jpg",
      initials: "रथ"
    },
    title: "Digital Nepal Initiative 2024",
    description: "Proposed comprehensive digitalization plan for government services",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    category: "proposals"
  },
  {
    id: "2",
    type: "vote_cast",
    user: {
      name: "सीता देवी श्रेष्ठ",
      avatar: "/placeholder-user.jpg",
      initials: "सश्रे"
    },
    title: "Education Reform Bill",
    description: "Voted in favor of the education reform proposal",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    category: "voting"
  },
  {
    id: "3",
    type: "comment_added",
    user: {
      name: "गोपाल खड्का",
      avatar: "/placeholder-user.jpg",
      initials: "गख"
    },
    title: "Healthcare Infrastructure",
    description: "Added detailed feedback on rural healthcare accessibility",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    category: "comments"
  },
  {
    id: "4",
    type: "user_registered",
    user: {
      name: "अनिता पौडेल",
      avatar: "/placeholder-user.jpg",
      initials: "अप"
    },
    title: "New Member",
    description: "Joined from Kathmandu district with interests in governance",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    category: "users"
  },
  {
    id: "5",
    type: "circle_created",
    user: {
      name: "विकास लामा",
      avatar: "/placeholder-user.jpg",
      initials: "विल"
    },
    title: "Environment Protection Circle",
    description: "Created new circle focused on environmental conservation",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    category: "users"
  },
  {
    id: "6",
    type: "proposal_updated",
    user: {
      name: "कमला गुरुङ",
      avatar: "/placeholder-user.jpg",
      initials: "कगु"
    },
    title: "Tourism Development Strategy",
    description: "Updated proposal with community feedback and revised budget",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    category: "proposals"
  },
  {
    id: "7",
    type: "user_verified",
    user: {
      name: "सुरेश बस्नेत",
      avatar: "/placeholder-user.jpg",
      initials: "सुब"
    },
    title: "Verification Complete",
    description: "Successfully completed KYC verification process",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    category: "users"
  },
  {
    id: "8",
    type: "system_update",
    user: {
      name: "System",
      avatar: "",
      initials: "SYS"
    },
    title: "Platform Update v2.1.0",
    description: "Enhanced security features and improved user interface",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    category: "system"
  },
  {
    id: "9",
    type: "vote_cast",
    user: {
      name: "दीपक महर्जन",
      avatar: "/placeholder-user.jpg",
      initials: "दीम"
    },
    title: "Infrastructure Development",
    description: "Voted against the highway expansion proposal",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: "voting"
  },
  {
    id: "10",
    type: "circle_joined",
    user: {
      name: "प्रिया राई",
      avatar: "/placeholder-user.jpg",
      initials: "प्रराई"
    },
    title: "Youth Development Circle",
    description: "Joined circle focused on youth empowerment and education",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    category: "users"
  }
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "proposal_created":
    case "proposal_updated":
      return <FileText className="w-4 h-4" />
    case "vote_cast":
      return <Vote className="w-4 h-4" />
    case "comment_added":
      return <MessageSquare className="w-4 h-4" />
    case "user_registered":
    case "user_verified":
    case "circle_joined":
    case "circle_created":
      return <UserPlus className="w-4 h-4" />
    case "system_update":
    case "maintenance":
      return <Settings className="w-4 h-4" />
    default:
      return <Calendar className="w-4 h-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "proposal_created":
    case "proposal_updated":
      return "bg-blue-500"
    case "vote_cast":
      return "bg-green-500"
    case "comment_added":
      return "bg-red-500"
    case "user_registered":
    case "user_verified":
    case "circle_joined":
    case "circle_created":
      return "bg-blue-500"
    case "system_update":
    case "maintenance":
      return "bg-gray-500"
    default:
      return "bg-primary"
  }
}

const formatTimeAgo = (timestamp: Date, locale: "en" | "ne") => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

  const t = content[locale].timeAgo

  if (minutes < 1) return t.now
  if (minutes === 1) return t.minute
  if (minutes < 60) return `${minutes} ${t.minutes}`
  if (hours === 1) return t.hour
  if (hours < 24) return `${hours} ${t.hours}`
  if (days === 1) return t.day
  if (days < 7) return `${days} ${t.days}`
  if (weeks === 1) return t.week
  return `${weeks} ${t.weeks}`
}

export default function ActivityLog({ locale }: ActivityLogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const t = content[locale]

  const filteredActivities = demoActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterCategory === "all" || activity.category === filterCategory

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filterAll}</SelectItem>
                  <SelectItem value="proposals">{t.filterProposals}</SelectItem>
                  <SelectItem value="voting">{t.filterVoting}</SelectItem>
                  <SelectItem value="comments">{t.filterComments}</SelectItem>
                  <SelectItem value="users">{t.filterUsers}</SelectItem>
                  <SelectItem value="system">{t.filterSystem}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {/* Activity Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{activity.user.name}</span>
                        <span className="text-muted-foreground text-sm">
                          {t.activities[activity.type as keyof typeof t.activities]}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{activity.title}</h3>
                      <p className="text-muted-foreground text-sm">{activity.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity.timestamp, locale)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {activity.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                {locale === "en" ? "No activities found" : "कुनै गतिविधि फेला परेन"}
              </h3>
              <p className="text-muted-foreground">
                {locale === "en" 
                  ? "Try adjusting your search or filter criteria" 
                  : "आपनो खोज वा फिल्टर मापदण्ड समायोजन गर्ने प्रयास गर्नुहोस्"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}