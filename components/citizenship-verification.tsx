"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  Shield, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowLeft,
  Award,
  User,
  Calendar,
  MapPin
} from "lucide-react"
import Link from "next/link"

interface CitizenshipVerificationProps {
  locale: "en" | "ne"
  onVerificationComplete?: (data: CitizenshipData) => void
  initialData?: Partial<CitizenshipData>
  readonly?: boolean
}

interface CitizenshipData {
  citizenshipNumber: string
  citizenshipType: "birth" | "naturalization" | "descent"
  issuedDate: string
  issuedDistrict: string
  fatherName: string
  motherName: string
  grandfatherName: string
  documentFile?: File
  verificationStatus: "pending" | "verified" | "rejected"
  submittedDate?: string
  verifiedDate?: string
  notes?: string
  verifiedBadge?: boolean
}

const content = {
  en: {
    title: "Citizenship Verification",
    subtitle: "Verify your Nepali citizenship status with official documents",
    personalInfo: "Citizenship Information",
    citizenshipNumber: "Citizenship Number",
    citizenshipNumberPlaceholder: "Enter your citizenship certificate number",
    citizenshipType: "Citizenship Type",
    citizenshipByBirth: "Citizenship by Birth",
    citizenshipByNaturalization: "Citizenship by Naturalization", 
    citizenshipByDescent: "Citizenship by Descent",
    issuedDate: "Issued Date",
    issuedDistrict: "Issued District",
    issuedDistrictPlaceholder: "Select the district where citizenship was issued",
    
    familyInfo: "Family Information",
    fatherName: "Father's Name",
    fatherNamePlaceholder: "Enter father's full name as per citizenship",
    motherName: "Mother's Name", 
    motherNamePlaceholder: "Enter mother's full name as per citizenship",
    grandfatherName: "Grandfather's Name",
    grandfatherNamePlaceholder: "Enter grandfather's full name as per citizenship",
    
    documentUpload: "Citizenship Certificate",
    documentDesc: "Upload a clear photo or scan of your citizenship certificate",
    uploadDocument: "Upload Certificate",
    fileRequirements: "File requirements: JPG, PNG, PDF (max 5MB)",
    documentUploaded: "Certificate uploaded successfully",
    
    verificationStatus: "Verification Status",
    pending: "Pending Review",
    verified: "Verified",
    rejected: "Rejected",
    submittedOn: "Submitted on",
    verifiedOn: "Verified on",
    verifiedBadge: "Verified Citizen",
    
    submit: "Submit for Verification",
    resubmit: "Resubmit Information",
    update: "Update Information",
    backToSettings: "Back to Settings",
    progress: "Progress",
    
    validationErrors: {
      citizenshipNumberRequired: "Citizenship number is required",
      citizenshipTypeRequired: "Citizenship type is required",
      issuedDateRequired: "Issued date is required",
      issuedDistrictRequired: "Issued district is required",
      fatherNameRequired: "Father's name is required",
      motherNameRequired: "Mother's name is required",
      grandfatherNameRequired: "Grandfather's name is required",
      documentRequired: "Please upload your citizenship certificate",
      citizenshipNumberInvalid: "Please enter a valid citizenship number",
      dateInvalid: "Please enter a valid date",
    },
    
    success: "Citizenship verification submitted successfully",
    successDesc: "Your citizenship information has been submitted for review. You'll receive an update within 2-3 business days.",
    
    notes: "Review Notes",
    noNotes: "No additional notes from reviewer",
    
    verificationBenefits: "Verification Benefits",
    benefitsList: [
      "Verified citizen badge on your profile",
      "Enhanced trust and credibility",
      "Access to citizen-only features",
      "Priority in community discussions",
      "Eligibility for leadership roles"
    ],
  },
  ne: {
    title: "नागरिकता प्रमाणीकरण",
    subtitle: "आधिकारिक कागजातहरूसँग आपनो नेपाली नागरिकता स्थिति प्रमाणित गर्नुहोस्",
    personalInfo: "नागरिकता जानकारी",
    citizenshipNumber: "नागरिकता नम्बर",
    citizenshipNumberPlaceholder: "आपनो नागरिकता प्रमाणपत्र नम्बर प्रविष्ट गर्नुहोस्",
    citizenshipType: "नागरिकता प्रकार",
    citizenshipByBirth: "जन्मसूत्रको नागरिकता",
    citizenshipByNaturalization: "प्राकृतिकीकरणको नागरिकता",
    citizenshipByDescent: "वंशजको नागरिकता",
    issuedDate: "जारी मिति",
    issuedDistrict: "जारी गर्ने जिल्ला",
    issuedDistrictPlaceholder: "नागरिकता जारी भएको जिल्ला चयन गर्नुहोस्",
    
    familyInfo: "पारिवारिक जानकारी",
    fatherName: "बुबाको नाम",
    fatherNamePlaceholder: "नागरिकता अनुसार बुबाको पूरा नाम प्रविष्ट गर्नुहोस्",
    motherName: "आमाको नाम",
    motherNamePlaceholder: "नागरिकता अनुसार आमाको पूरा नाम प्रविष्ट गर्नुहोस्",
    grandfatherName: "हजुरबुबाको नाम",
    grandfatherNamePlaceholder: "नागरिकता अनुसार हजुरबुबाको पूरा नाम प्रविष्ट गर्नुहोस्",
    
    documentUpload: "नागरिकता प्रमाणपत्र",
    documentDesc: "आपनो नागरिकता प्रमाणपत्रको स्पष्ट फोटो वा स्क्यान अपलोड गर्नुहोस्",
    uploadDocument: "प्रमाणपत्र अपलोड गर्नुहोस्",
    fileRequirements: "फाइल आवश्यकताहरू: JPG, PNG, PDF (अधिकतम 5MB)",
    documentUploaded: "प्रमाणपत्र सफलतापूर्वक अपलोड भयो",
    
    verificationStatus: "प्रमाणीकरण स्थिति",
    pending: "समीक्षा अन्तर्गत",
    verified: "प्रमाणित",
    rejected: "अस्वीकृत",
    submittedOn: "जमा गरिएको",
    verifiedOn: "प्रमाणित भएको",
    verifiedBadge: "प्रमाणित नागरिक",
    
    submit: "प्रमाणीकरणको लागि जमा गर्नुहोस्",
    resubmit: "जानकारी पुनः जमा गर्नुहोस्",
    update: "जानकारी अपडेट गर्नुहोस्",
    backToSettings: "सेटिङहरूमा फर्कनुहोस्",
    progress: "प्रगति",
    
    validationErrors: {
      citizenshipNumberRequired: "नागरिकता नम्बर आवश्यक छ",
      citizenshipTypeRequired: "नागरिकता प्रकार आवश्यक छ",
      issuedDateRequired: "जारी मिति आवश्यक छ",
      issuedDistrictRequired: "जारी गर्ने जिल्ला आवश्यक छ",
      fatherNameRequired: "बुबाको नाम आवश्यक छ",
      motherNameRequired: "आमाको नाम आवश्यक छ",
      grandfatherNameRequired: "हजुरबुबाको नाम आवश्यक छ",
      documentRequired: "कृपया आपनो नागरिकता प्रमाणपत्र अपलोड गर्नुहोस्",
      citizenshipNumberInvalid: "कृपया मान्य नागरिकता नम्बर प्रविष्ट गर्नुहोस्",
      dateInvalid: "कृपया मान्य मिति प्रविष्ट गर्नुहोस्",
    },
    
    success: "नागरिकता प्रमाणीकरण सफलतापूर्वक जमा भयो",
    successDesc: "आपनो नागरिकता जानकारी समीक्षाको लागि जमा गरिएको छ। तपाईंले २-३ कार्य दिन भित्र अपडेट प्राप्त गर्नुहुनेछ।",
    
    notes: "समीक्षा नोटहरू",
    noNotes: "समीक्षकबाट कुनै अतिरिक्त नोट छैन",
    
    verificationBenefits: "प्रमाणीकरण फाइदाहरू",
    benefitsList: [
      "आपनो प्रोफाइलमा प्रमाणित नागरिक ब्याज",
      "बढेको विश्वास र विश्वसनीयता",
      "नागरिक-मात्र सुविधाहरूमा पहुँच",
      "सामुदायिक छलफलमा प्राथमिकता",
      "नेतृत्व भूमिकाहरूको लागि योग्यता"
    ],
  },
}

const nepaliDistricts = [
  "काठमाडौं", "भक्तपुर", "ललितपुर", "धनुसा", "महोत्तरी", "सर्लाही", "रौतहट", "बारा", "पर्सा",
  "सिंधुली", "दोलखा", "सिन्धुपाल्चोक", "काभ्रेपलाञ्चोक", "नुवाकोट", "रसुवा", "धादिङ",
  "मकवानपुर", "चितवन", "तनहुँ", "लमजुङ", "गोरखा", "मनाङ", "मुस्ताङ", "पर्वत", "स्याङ्जा",
  "कास्की", "पाल्पा", "बागलुङ", "गुल्मी", "अर्घाखाँची", "धनकुटा", "तेहथुम", "भोजपुर",
  "सङ्खुवासभा", "ओखलढुङ्गा", "सुनसरी", "मोरङ", "झापा", "इलाम", "पञ्चथर", "तापलेजुङ",
  "रामेछाप", "सोलुखुम्बु", "उदयपुर", "नवलपरासी", "रुपन्देही", "कपिलवस्तु", "सप्तरी",
  "सिरहा", "बाजुरा", "बज्हाङ", "अछाम", "डोटी", "बैतडी", "दार्चुला", "कैलाली", "कञ्चनपुर"
]

export default function CitizenshipVerification({ 
  locale, 
  onVerificationComplete, 
  initialData,
  readonly = false 
}: CitizenshipVerificationProps) {
  const [citizenshipData, setCitizenshipData] = useState<CitizenshipData>({
    citizenshipNumber: "",
    citizenshipType: "birth",
    issuedDate: "",
    issuedDistrict: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    verificationStatus: "pending",
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completionProgress, setCompletionProgress] = useState(0)
  const { toast } = useToast()
  const t = content[locale]

  // Calculate completion progress
  useEffect(() => {
    const fields = [
      citizenshipData.citizenshipNumber,
      citizenshipData.citizenshipType,
      citizenshipData.issuedDate,
      citizenshipData.issuedDistrict,
      citizenshipData.fatherName,
      citizenshipData.motherName,
      citizenshipData.grandfatherName,
      citizenshipData.documentFile
    ]
    const completedFields = fields.filter(field => field).length
    setCompletionProgress((completedFields / fields.length) * 100)
  }, [citizenshipData])

  const handleInputChange = (field: keyof CitizenshipData, value: string) => {
    setCitizenshipData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, document: "File size must be less than 5MB" }))
        return
      }
      setCitizenshipData(prev => ({ ...prev, documentFile: file }))
      setErrors(prev => ({ ...prev, document: "" }))
      toast({
        title: t.documentUploaded,
        description: `${file.name} uploaded successfully`,
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!citizenshipData.citizenshipNumber.trim()) {
      newErrors.citizenshipNumber = t.validationErrors.citizenshipNumberRequired
    }
    if (!citizenshipData.citizenshipType) {
      newErrors.citizenshipType = t.validationErrors.citizenshipTypeRequired
    }
    if (!citizenshipData.issuedDate) {
      newErrors.issuedDate = t.validationErrors.issuedDateRequired
    }
    if (!citizenshipData.issuedDistrict) {
      newErrors.issuedDistrict = t.validationErrors.issuedDistrictRequired
    }
    if (!citizenshipData.fatherName.trim()) {
      newErrors.fatherName = t.validationErrors.fatherNameRequired
    }
    if (!citizenshipData.motherName.trim()) {
      newErrors.motherName = t.validationErrors.motherNameRequired
    }
    if (!citizenshipData.grandfatherName.trim()) {
      newErrors.grandfatherName = t.validationErrors.grandfatherNameRequired
    }
    if (!citizenshipData.documentFile) {
      newErrors.document = t.validationErrors.documentRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const updatedData = {
        ...citizenshipData,
        verificationStatus: "pending" as const,
        submittedDate: new Date().toISOString().split('T')[0]
      }
      
      setCitizenshipData(updatedData)
      onVerificationComplete?.(updatedData)
      
      toast({
        title: t.success,
        description: t.successDesc,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit verification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/settings" 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToSettings}
            </Link>
            <div className="flex items-center gap-2">
              {citizenshipData.verifiedBadge && (
                <Badge variant="default" className="bg-green-600">
                  <Award className="h-3 w-3 mr-1" />
                  {t.verifiedBadge}
                </Badge>
              )}
              <Badge variant={citizenshipData.verificationStatus === "verified" ? "default" : "secondary"}>
                {citizenshipData.verificationStatus === "verified" ? t.verified : 
                 citizenshipData.verificationStatus === "rejected" ? t.rejected : t.pending}
              </Badge>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {t.subtitle}
            </p>
            
            {/* Progress Indicator */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t.progress}</span>
                <span>{Math.round(completionProgress)}%</span>
              </div>
              <Progress value={completionProgress} className="h-2" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Verification Status */}
          {(citizenshipData.verificationStatus !== "pending" || citizenshipData.submittedDate) && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">{t.verificationStatus}</h3>
                  </div>
                  {citizenshipData.verificationStatus === "verified" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : citizenshipData.verificationStatus === "rejected" ? (
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-yellow-600" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {citizenshipData.submittedDate && (
                    <div>
                      <span className="text-gray-600">{t.submittedOn}: </span>
                      <span className="font-medium">{citizenshipData.submittedDate}</span>
                    </div>
                  )}
                  {citizenshipData.verifiedDate && (
                    <div>
                      <span className="text-gray-600">{t.verifiedOn}: </span>
                      <span className="font-medium">{citizenshipData.verifiedDate}</span>
                    </div>
                  )}
                </div>
                
                {citizenshipData.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{t.notes}</h4>
                    <p className="text-gray-700 text-sm">{citizenshipData.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-600" />
                <CardTitle>{t.personalInfo}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="citizenshipNumber">{t.citizenshipNumber}</Label>
                  <Input
                    id="citizenshipNumber"
                    value={citizenshipData.citizenshipNumber}
                    onChange={(e) => handleInputChange("citizenshipNumber", e.target.value)}
                    placeholder={t.citizenshipNumberPlaceholder}
                    disabled={readonly}
                  />
                  {errors.citizenshipNumber && (
                    <p className="text-sm text-red-600">{errors.citizenshipNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citizenshipType">{t.citizenshipType}</Label>
                  <Select
                    value={citizenshipData.citizenshipType}
                    onValueChange={(value) => handleInputChange("citizenshipType", value)}
                    disabled={readonly}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birth">{t.citizenshipByBirth}</SelectItem>
                      <SelectItem value="naturalization">{t.citizenshipByNaturalization}</SelectItem>
                      <SelectItem value="descent">{t.citizenshipByDescent}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.citizenshipType && (
                    <p className="text-sm text-red-600">{errors.citizenshipType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuedDate">{t.issuedDate}</Label>
                  <Input
                    id="issuedDate"
                    type="date"
                    value={citizenshipData.issuedDate}
                    onChange={(e) => handleInputChange("issuedDate", e.target.value)}
                    disabled={readonly}
                  />
                  {errors.issuedDate && (
                    <p className="text-sm text-red-600">{errors.issuedDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuedDistrict">{t.issuedDistrict}</Label>
                  <Select
                    value={citizenshipData.issuedDistrict}
                    onValueChange={(value) => handleInputChange("issuedDistrict", value)}
                    disabled={readonly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.issuedDistrictPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {nepaliDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.issuedDistrict && (
                    <p className="text-sm text-red-600">{errors.issuedDistrict}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-600" />
                <CardTitle>{t.familyInfo}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fatherName">{t.fatherName}</Label>
                  <Input
                    id="fatherName"
                    value={citizenshipData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    placeholder={t.fatherNamePlaceholder}
                    disabled={readonly}
                  />
                  {errors.fatherName && (
                    <p className="text-sm text-red-600">{errors.fatherName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherName">{t.motherName}</Label>
                  <Input
                    id="motherName"
                    value={citizenshipData.motherName}
                    onChange={(e) => handleInputChange("motherName", e.target.value)}
                    placeholder={t.motherNamePlaceholder}
                    disabled={readonly}
                  />
                  {errors.motherName && (
                    <p className="text-sm text-red-600">{errors.motherName}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="grandfatherName">{t.grandfatherName}</Label>
                  <Input
                    id="grandfatherName"
                    value={citizenshipData.grandfatherName}
                    onChange={(e) => handleInputChange("grandfatherName", e.target.value)}
                    placeholder={t.grandfatherNamePlaceholder}
                    disabled={readonly}
                  />
                  {errors.grandfatherName && (
                    <p className="text-sm text-red-600">{errors.grandfatherName}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle>{t.documentUpload}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{t.documentDesc}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('citizenship-upload')?.click()}
                    disabled={readonly}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {t.uploadDocument}
                  </Button>
                  <p className="text-sm text-gray-500">{t.fileRequirements}</p>
                  <input
                    id="citizenship-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
              
              {citizenshipData.documentFile && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {citizenshipData.documentFile.name}
                  </span>
                </div>
              )}
              
              {errors.document && (
                <p className="text-sm text-red-600">{errors.document}</p>
              )}
            </CardContent>
          </Card>

          {/* Verification Benefits */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-blue-600" />
                <CardTitle>{t.verificationBenefits}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          {!readonly && (
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : citizenshipData.verificationStatus === "rejected" ? (
                  t.resubmit
                ) : citizenshipData.submittedDate ? (
                  t.update
                ) : (
                  t.submit
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}