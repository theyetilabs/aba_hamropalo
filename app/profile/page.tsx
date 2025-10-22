"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Shield, 
  Coins, 
  Phone, 
  Edit, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Settings,
  Activity
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const content = {
  en: {
    profile: "Profile",
    personalInfo: "Personal Information",
    verificationStatus: "Verification Status",
    disclosures: "Disclosures",
    settings: "Settings",
    name: "Name",
    phone: "Phone",
    tokens: "Tokens",
    verified: "Verified",
    notVerified: "Not Verified",
    verificationLevel: "Verification Level",
    basic: "Basic",
    enhanced: "Enhanced", 
    complete: "Complete",
    editProfile: "Edit Profile",
    editDisclosures: "Edit Disclosures",
    viewDisclosures: "View Disclosures",
    accountSettings: "Account Settings",
    activityHistory: "Activity History",
    description: "Manage your profile information, verification status, and disclosures.",
    verificationDescription: "Your account verification status and level.",
    disclosuresDescription: "View and edit your public disclosures and declarations.",
    settingsDescription: "Manage your account preferences and settings.",
  },
  ne: {
    profile: "प्रोफाइल",
    personalInfo: "व्यक्तिगत जानकारी",
    verificationStatus: "प्रमाणीकरण स्थिति",
    disclosures: "खुलासाहरू",
    settings: "सेटिङहरू",
    name: "नाम",
    phone: "फोन",
    tokens: "टोकनहरू",
    verified: "प्रमाणित",
    notVerified: "प्रमाणित नभएको",
    verificationLevel: "प्रमाणीकरण स्तर",
    basic: "आधारभूत",
    enhanced: "उन्नत",
    complete: "पूर्ण",
    editProfile: "प्रोफाइल सम्पादन गर्नुहोस्",
    editDisclosures: "खुलासाहरू सम्पादन गर्नुहोस्",
    viewDisclosures: "खुलासाहरू हेर्नुहोस्",
    accountSettings: "खाता सेटिङहरू",
    activityHistory: "गतिविधि इतिहास",
    description: "आफ्नो प्रोफाइल जानकारी, प्रमाणीकरण स्थिति, र खुलासाहरू व्यवस्थापन गर्नुहोस्।",
    verificationDescription: "तपाईंको खाता प्रमाणीकरण स्थिति र स्तर।",
    disclosuresDescription: "आफ्ना सार्वजनिक खुलासाहरू र घोषणाहरू हेर्नुहोस् र सम्पादन गर्नुहोस्।",
    settingsDescription: "आफ्ना खाता प्राथमिकताहरू र सेटिङहरू व्यवस्थापन गर्नुहोस्।",
  },
}

interface ProfilePageProps {
  searchParams: { locale?: "en" | "ne" }
}

export default function ProfilePage({ searchParams }: ProfilePageProps) {
  const [locale, setLocale] = useState<"en" | "ne">((searchParams.locale || "en") as "en" | "ne")
  const t = content[locale]
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const getVerificationLevelColor = (level: string) => {
    switch (level) {
      case "complete":
        return "bg-green-100 text-green-800 border-green-200"
      case "enhanced":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "basic":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getVerificationLevelText = (level: string) => {
    switch (level) {
      case "complete":
        return t.complete
      case "enhanced":
        return t.enhanced
      case "basic":
        return t.basic
      default:
        return t.basic
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <Navigation locale={locale} setLocale={setLocale} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            {t.profile}
          </h1>
          <p className="text-primary-foreground/80">
            {t.description}
          </p>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {user?.name}
                    {user?.isVerified && (
                      <CheckCircle size={20} className="text-green-500" />
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {user?.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins size={14} />
                      {user?.tokens} {t.tokens}
                    </span>
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  variant="outline" 
                  className={getVerificationLevelColor(user?.verificationLevel || "basic")}
                >
                  <Shield size={12} className="mr-1" />
                  {getVerificationLevelText(user?.verificationLevel || "basic")}
                </Badge>
                <div className="mt-2">
                  <Badge variant={user?.isVerified ? "default" : "secondary"}>
                    {user?.isVerified ? (
                      <>
                        <CheckCircle size={12} className="mr-1" />
                        {t.verified}
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} className="mr-1" />
                        {t.notVerified}
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User size={16} />
              {t.personalInfo}
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <Shield size={16} />
              {t.verificationStatus}
            </TabsTrigger>
            <TabsTrigger value="disclosures" className="flex items-center gap-2">
              <FileText size={16} />
              {t.disclosures}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              {t.settings}
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t.personalInfo}</CardTitle>
                    <CardDescription>
                      Your basic account information.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit size={16} />
                    {t.editProfile}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">{t.name}</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      {user?.name}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">{t.phone}</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      {user?.phone}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">{t.tokens}</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md flex items-center gap-2">
                      <Coins size={16} />
                      {user?.tokens}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">{t.verificationLevel}</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <Badge className={getVerificationLevelColor(user?.verificationLevel || "basic")}>
                        {getVerificationLevelText(user?.verificationLevel || "basic")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Status Tab */}
          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>{t.verificationStatus}</CardTitle>
                <CardDescription>
                  {t.verificationDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {user?.isVerified ? (
                        <CheckCircle size={24} className="text-green-500" />
                      ) : (
                        <AlertCircle size={24} className="text-yellow-500" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          {user?.isVerified ? t.verified : t.notVerified}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {t.verificationLevel}: {getVerificationLevelText(user?.verificationLevel || "basic")}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={user?.isVerified ? "default" : "secondary"}
                      className={user?.isVerified ? "bg-green-100 text-green-800" : ""}
                    >
                      {user?.isVerified ? t.verified : t.notVerified}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disclosures Tab */}
          <TabsContent value="disclosures">
            <Card>
              <CardHeader>
                <CardTitle>{t.disclosures}</CardTitle>
                <CardDescription>
                  {t.disclosuresDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link href="/enhanced-disclosures">
                        <Edit size={16} className="mr-2" />
                        {t.editDisclosures}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/enhanced-disclosures?view=readonly">
                        <FileText size={16} className="mr-2" />
                        {t.viewDisclosures}
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Your disclosures help maintain transparency and trust in the democratic process. 
                      Keep them updated to reflect your current status.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings}</CardTitle>
                <CardDescription>
                  {t.settingsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild variant="outline">
                    <Link href="/settings">
                      <Settings size={16} className="mr-2" />
                      {t.accountSettings}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/activity">
                      <Activity size={16} className="mr-2" />
                      {t.activityHistory}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer locale={locale} />
    </div>
  )
}