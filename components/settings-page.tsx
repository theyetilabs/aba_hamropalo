"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, User, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface SettingsPageProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Settings",
    subtitle: "Manage your account and preferences",
    backToProfile: "Back to Profile",
    account: "Account",
    privacy: "Privacy",
    notifications: "Notifications",
    security: "Security",
    profileInformation: "Profile Information",
    email: "Email",
    emailAddress: "Email Address",
    phone: "Phone Number",
    address: "Address",
    citizenship: "Citizenship Number",
    saveChanges: "Save Changes",
    privacySettings: "Privacy Settings",
    profileVisibility: "Profile Visibility",
    profileVisibilityDesc: "Allow other members to see your profile",
    showActivity: "Show Activity",
    showActivityDesc: "Display your participation history to other members",
    showTokenBalance: "Show Token Balance",
    showTokenBalanceDesc: "Display your token balance publicly",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    proposalUpdates: "Proposal Updates",
    proposalUpdatesDesc: "Receive updates when proposals you're involved in change status",
    discussionReplies: "Discussion Replies",
    discussionRepliesDesc: "Get notified when someone replies to your comments",
    meetingReminders: "Meeting Reminders",
    meetingRemindersDesc: "Receive reminders for upcoming circle meetings",
    tokenUpdates: "Token Updates",
    tokenUpdatesDesc: "Get notified about token earnings and burning events",
    securitySettings: "Security Settings",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    twoFactor: "Two-Factor Authentication",
    twoFactorDesc: "Add an extra layer of security to your account",
    enable: "Enable",
    disable: "Disable",
    activeSessions: "Active Sessions",
    currentDevice: "Current Device",
    lastActive: "Last Active",
    signOut: "Sign Out",
    signOutAll: "Sign Out All Devices",
    dataManagement: "Data Management",
    downloadData: "Download Your Data",
    downloadDataDesc: "Export all your personal data in a portable format",
    download: "Download",
    deleteAccount: "Delete Account",
    deleteAccountDesc: "Permanently delete your account and all associated data",
    delete: "Delete",
    deleteWarning: "This action cannot be undone",
  },
  ne: {
    title: "सेटिङ्स",
    subtitle: "आपको खाता र प्राथमिकताहरु प्रबन्ध गर्नुहोस्",
    backToProfile: "प्रोफाइलमा फर्कनुहोस्",
    account: "खाता",
    privacy: "गोपनीयता",
    notifications: "सूचनाहरु",
    security: "सुरक्षा",
    profileInformation: "प्रोफाइल जानकारी",
    email: "ईमेल",
    emailAddress: "ईमेल ठेगाना",
    phone: "फोन नम्बर",
    address: "ठेगाना",
    citizenship: "नागरिकता नम्बर",
    saveChanges: "परिवर्तन सुरक्षित गर्नुहोस्",
    privacySettings: "गोपनीयता सेटिङ्स",
    profileVisibility: "प्रोफाइल दृश्यता",
    profileVisibilityDesc: "अन्य सदस्यहरूलाई आपको प्रोफाइल हेर्न अनुमति दिनुहोस्",
    showActivity: "गतिविधि देखाउनुहोस्",
    showActivityDesc: "अन्य सदस्यहरूलाई आपको भागीदारी इतिहास प्रदर्शन गर्नुहोस्",
    showTokenBalance: "टोकन ब्यालेन्स देखाउनुहोस्",
    showTokenBalanceDesc: "आपको टोकन ब्यालेन्स सार्वजनिक रूपमा प्रदर्शन गर्नुहोस्",
    notificationSettings: "सूचना सेटिङ्स",
    emailNotifications: "ईमेल सूचनाहरु",
    proposalUpdates: "प्रस्ताव अपडेटहरु",
    proposalUpdatesDesc: "जब तपाई संलग्न प्रस्तावहरु स्थिति परिवर्तन गर्छन् तब अपडेट पाउनुहोस्",
    discussionReplies: "छलफल जवाफहरु",
    discussionRepliesDesc: "जब कोई आपको टिप्पणीमा जवाफ दिन्छ तब सूचित हुनुहोस्",
    meetingReminders: "बैठक रिमाइन्डरहरु",
    meetingRemindersDesc: "आसन्न सर्कल बैठकहरुको लागि रिमाइन्डर पाउनुहोस्",
    tokenUpdates: "टोकन अपडेटहरु",
    tokenUpdatesDesc: "टोकन आय र जलन घटनाहरु बारे सूचित हुनुहोस्",
    securitySettings: "सुरक्षा सेटिङ्स",
    changePassword: "पासवर्ड परिवर्तन गर्नुहोस्",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नयाँ पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
    twoFactor: "दुई-कारक प्रमाणीकरण",
    twoFactorDesc: "आपको खातामा सुरक्षाको अतिरिक्त तह थप्नुहोस्",
    enable: "सक्षम गर्नुहोस्",
    disable: "अक्षम गर्नुहोस्",
    activeSessions: "सक्रिय सत्र",
    currentDevice: "वर्तमान उपकरण",
    lastActive: "अन्तिम सक्रिय",
    signOut: "साइन आउट गर्नुहोस्",
    signOutAll: "सबै उपकरणहरु साइन आउट गर्नुहोस्",
    dataManagement: "डेटा प्रबन्धन",
    downloadData: "आपको डेटा डाउनलोड गर्नुहोस्",
    downloadDataDesc: "सबै आपको व्यक्तिगत डेटा पोर्टेबल ढाँचामा निर्यात गर्नुहोस्",
    download: "डाउनलोड गर्नुहोस्",
    deleteAccount: "खाता मेटाउनुहोस्",
    deleteAccountDesc: "आपको खाता र सबै सम्बन्धित डेटा स्थायी रूपमा मेटाउनुहोस्",
    delete: "मेटाउनुहोस्",
    deleteWarning: "यो कार्य पूर्ववत गर्न सकिंदैन",
  },
}

export default function SettingsPageComponent({ locale }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("account")
  const t = content[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/profile" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            {t.backToProfile}
          </Link>
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t.account}</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">{t.privacy}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">{t.notifications}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">{t.security}</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.profileInformation}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailAddress}</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input id="phone" type="tel" defaultValue="+977 1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t.address}</Label>
                  <Input id="address" defaultValue="Kathmandu, Nepal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="citizenship">{t.citizenship}</Label>
                  <Input id="citizenship" defaultValue="12345678" disabled />
                </div>
                <Button className="bg-primary hover:bg-primary/90">{t.saveChanges}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.privacySettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.profileVisibility}</p>
                    <p className="text-sm text-muted-foreground">{t.profileVisibilityDesc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.showActivity}</p>
                    <p className="text-sm text-muted-foreground">{t.showActivityDesc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.showTokenBalance}</p>
                    <p className="text-sm text-muted-foreground">{t.showTokenBalanceDesc}</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.notificationSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.proposalUpdates}</p>
                    <p className="text-sm text-muted-foreground">{t.proposalUpdatesDesc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.discussionReplies}</p>
                    <p className="text-sm text-muted-foreground">{t.discussionRepliesDesc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.meetingReminders}</p>
                    <p className="text-sm text-muted-foreground">{t.meetingRemindersDesc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{t.tokenUpdates}</p>
                    <p className="text-sm text-muted-foreground">{t.tokenUpdatesDesc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.securitySettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 border-b pb-6">
                  <h3 className="font-semibold">{t.changePassword}</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current">{t.currentPassword}</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">{t.newPassword}</Label>
                    <Input id="new" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">{t.confirmPassword}</Label>
                    <Input id="confirm" type="password" />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">{t.saveChanges}</Button>
                </div>

                <div className="space-y-4 border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{t.twoFactor}</p>
                      <p className="text-sm text-muted-foreground">{t.twoFactorDesc}</p>
                    </div>
                    <Button variant="outline">{t.enable}</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">{t.activeSessions}</h3>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{t.currentDevice}</span>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t.lastActive}: Just now</p>
                    <Button variant="outline" size="sm">
                      {t.signOut}
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    {t.signOutAll}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle>{t.dataManagement}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold mb-1">{t.downloadData}</p>
                  <p className="text-sm text-muted-foreground mb-3">{t.downloadDataDesc}</p>
                  <Button variant="outline">{t.download}</Button>
                </div>
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <p className="font-semibold text-red-900 mb-1">{t.deleteAccount}</p>
                  <p className="text-sm text-red-800 mb-3">{t.deleteAccountDesc}</p>
                  <p className="text-xs text-red-700 mb-3">{t.deleteWarning}</p>
                  <Button variant="destructive">{t.delete}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
