"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, CheckCircle2, Clock, AlertCircle, MapPin, Home, Building2, MapIcon, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface AddressVerificationProps {
  locale: "en" | "ne"
  onVerificationComplete?: (data: AddressData) => void
  initialData?: Partial<AddressData>
  readonly?: boolean
}

interface AddressData {
  fullAddress: string
  municipality: string
  ward: string
  district: string
  province: string
  postalCode?: string
  documentType: string
  documentFile?: File
  verificationStatus: "pending" | "verified" | "rejected"
  submittedDate?: string
  verifiedDate?: string
  notes?: string
}

const content = {
  en: {
    title: "Address Verification",
    subtitle: "Verify your residential address with supporting documents",
    personalAddress: "Personal Address Information",
    fullAddress: "Full Address",
    fullAddressPlaceholder: "House/Apartment number, Street name, Locality",
    municipality: "Municipality/Rural Municipality",
    municipalityPlaceholder: "Select your municipality",
    ward: "Ward Number",
    wardPlaceholder: "Enter ward number",
    district: "District",
    districtPlaceholder: "Select your district",
    province: "Province",
    provincePlaceholder: "Select your province",
    postalCode: "Postal Code (Optional)",
    postalCodePlaceholder: "Enter postal code if available",
    
    documentUpload: "Supporting Documents",
    documentType: "Document Type",
    documentTypeDesc: "Choose the type of document you're uploading",
    utilityBill: "Utility Bill (Electricity/Water/Internet)",
    bankStatement: "Bank Statement",
    governmentLetter: "Government Letter/Certificate",
    rentalAgreement: "Rental Agreement",
    propertyTax: "Property Tax Receipt",
    
    uploadDocument: "Upload Document",
    uploadDesc: "Upload a clear photo or scan of your address verification document",
    fileRequirements: "File requirements: JPG, PNG, PDF (max 5MB)",
    documentUploaded: "Document uploaded successfully",
    
    verificationStatus: "Verification Status",
    pending: "Pending Review",
    verified: "Verified",
    rejected: "Rejected",
    submittedOn: "Submitted on",
    verifiedOn: "Verified on",
    
    submit: "Submit for Verification",
    resubmit: "Resubmit Information",
    update: "Update Information",
    backToSettings: "Back to Settings",
    progress: "Progress",
    
    validationErrors: {
      fullAddressRequired: "Full address is required",
      municipalityRequired: "Municipality is required",
      wardRequired: "Ward number is required",
      districtRequired: "District is required",
      provinceRequired: "Province is required",
      documentTypeRequired: "Document type is required",
      documentRequired: "Please upload a supporting document",
      wardInvalid: "Ward number must be between 1 and 35",
    },
    
    success: "Address verification submitted successfully",
    successDesc: "Your address information has been submitted for review. You'll receive an update within 2-3 business days.",
    
    notes: "Review Notes",
    noNotes: "No additional notes from reviewer",
  },
  ne: {
    title: "ठेगाना प्रमाणीकरण",
    subtitle: "सहायक कागजातहरूसँग आपनो आवासीय ठेगाना प्रमाणित गर्नुहोस्",
    personalAddress: "व्यक्तिगत ठेगाना जानकारी",
    fullAddress: "पूरा ठेगाना",
    fullAddressPlaceholder: "घर/अपार्टमेन्ट नम्बर, सडकको नाम, इलाका",
    municipality: "नगरपालिका/गाउँपालिका",
    municipalityPlaceholder: "आपनो नगरपालिका चयन गर्नुहोस्",
    ward: "वार्ड नम्बर",
    wardPlaceholder: "वार्ड नम्बर प्रविष्ट गर्नुहोस्",
    district: "जिल्ला",
    districtPlaceholder: "आपनो जिल्ला चयन गर्नुहोस्",
    province: "प्रदेश",
    provincePlaceholder: "आपनो प्रदेश चयन गर्नुहोस्",
    postalCode: "हुलाक कोड (वैकल्पिक)",
    postalCodePlaceholder: "उपलब्ध भएमा हुलाक कोड प्रविष्ट गर्नुहोस्",
    
    documentUpload: "सहायक कागजातहरू",
    documentType: "कागजातको प्रकार",
    documentTypeDesc: "तपाईंले अपलोड गर्दै हुनुभएको कागजातको प्रकार छान्नुहोस्",
    utilityBill: "उपयोगिता बिल (बिजुली/पानी/इन्टरनेट)",
    bankStatement: "बैंक स्टेटमेन्ट",
    governmentLetter: "सरकारी पत्र/प्रमाणपत्र",
    rentalAgreement: "भाडा सम्झौता",
    propertyTax: "सम्पत्ति कर रसिद",
    
    uploadDocument: "कागजात अपलोड गर्नुहोस्",
    uploadDesc: "आपनो ठेगाना प्रमाणीकरण कागजातको स्पष्ट फोटो वा स्क्यान अपलोड गर्नुहोस्",
    fileRequirements: "फाइल आवश्यकताहरू: JPG, PNG, PDF (अधिकतम 5MB)",
    documentUploaded: "कागजात सफलतापूर्वक अपलोड भयो",
    
    verificationStatus: "प्रमाणीकरण स्थिति",
    pending: "समीक्षा अन्तर्गत",
    verified: "प्रमाणित",
    rejected: "अस्वीकृत",
    submittedOn: "जमा गरिएको",
    verifiedOn: "प्रमाणित भएको",
    
    submit: "प्रमाणीकरणको लागि जमा गर्नुहोस्",
    resubmit: "जानकारी पुनः जमा गर्नुहोस्",
    update: "जानकारी अपडेट गर्नुहोस्",
    backToSettings: "सेटिङहरूमा फर्कनुहोस्",
    progress: "प्रगति",
    
    validationErrors: {
      fullAddressRequired: "पूरा ठेगाना आवश्यक छ",
      municipalityRequired: "नगरपालिका आवश्यक छ",
      wardRequired: "वार्ड नम्बर आवश्यक छ",
      districtRequired: "जिल्ला आवश्यक छ",
      provinceRequired: "प्रदेश आवश्यक छ",
      documentTypeRequired: "कागजातको प्रकार आवश्यक छ",
      documentRequired: "कृपया सहायक कागजात अपलोड गर्नुहोस्",
      wardInvalid: "वार्ड नम्बर १ देखि ३५ सम्म हुनुपर्छ",
    },
    
    success: "ठेगाना प्रमाणीकरण सफलतापूर्वक जमा भयो",
    successDesc: "आपनो ठेगाना जानकारी समीक्षाको लागि जमा गरिएको छ। तपाईंले २-३ कार्य दिन भित्र अपडेट प्राप्त गर्नुहुनेछ।",
    
    notes: "समीक्षा नोटहरू",
    noNotes: "समीक्षकबाट कुनै अतिरिक्त नोट छैन",
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

const nepaliProvinces = [
  "प्रदेश नं. १", "मधेश प्रदेश", "बागमती प्रदेश", "गण्डकी प्रदेश", 
  "लुम्बिनी प्रदेश", "कर्णाली प्रदेश", "सुदूरपश्चिम प्रदेश"
]

export default function AddressVerification({ 
  locale, 
  onVerificationComplete, 
  initialData,
  readonly = false 
}: AddressVerificationProps) {
  const { toast } = useToast()
  const t = content[locale]
  
  const [addressData, setAddressData] = useState<AddressData>({
    fullAddress: initialData?.fullAddress || "",
    municipality: initialData?.municipality || "",
    ward: initialData?.ward || "",
    district: initialData?.district || "",
    province: initialData?.province || "",
    postalCode: initialData?.postalCode || "",
    documentType: initialData?.documentType || "",
    verificationStatus: initialData?.verificationStatus || "pending",
    submittedDate: initialData?.submittedDate,
    verifiedDate: initialData?.verifiedDate,
    notes: initialData?.notes,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completionProgress, setCompletionProgress] = useState(0)

  // Calculate completion progress
  useEffect(() => {
    const fields = [
      addressData.fullAddress,
      addressData.municipality,
      addressData.ward,
      addressData.district,
      addressData.province,
      addressData.documentType,
      addressData.documentFile
    ]
    const completedFields = fields.filter(field => field).length
    setCompletionProgress((completedFields / fields.length) * 100)
  }, [addressData])
  
  const handleInputChange = (field: keyof AddressData, value: string) => {
    setAddressData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        })
        return
      }
      
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or PDF file",
          variant: "destructive",
        })
        return
      }
      
      setAddressData(prev => ({ ...prev, documentFile: file }))
      toast({
        title: t.documentUploaded,
        description: `${file.name} uploaded successfully`,
      })
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!addressData.fullAddress.trim()) {
      newErrors.fullAddress = t.validationErrors.fullAddressRequired
    }
    
    if (!addressData.municipality.trim()) {
      newErrors.municipality = t.validationErrors.municipalityRequired
    }
    
    if (!addressData.ward.trim()) {
      newErrors.ward = t.validationErrors.wardRequired
    } else {
      const wardNum = parseInt(addressData.ward)
      if (isNaN(wardNum) || wardNum < 1 || wardNum > 35) {
        newErrors.ward = t.validationErrors.wardInvalid
      }
    }
    
    if (!addressData.district) {
      newErrors.district = t.validationErrors.districtRequired
    }
    
    if (!addressData.province) {
      newErrors.province = t.validationErrors.provinceRequired
    }
    
    if (!addressData.documentType) {
      newErrors.documentType = t.validationErrors.documentTypeRequired
    }
    
    if (!addressData.documentFile && addressData.verificationStatus === "pending") {
      newErrors.documentFile = t.validationErrors.documentRequired
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
        ...addressData,
        verificationStatus: "pending" as const,
        submittedDate: new Date().toISOString().split('T')[0],
      }
      
      setAddressData(updatedData)
      onVerificationComplete?.(updatedData)
      
      toast({
        title: t.success,
        description: t.successDesc,
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default" className="bg-green-100 text-green-800">{t.verified}</Badge>
      case "rejected":
        return <Badge variant="destructive">{t.rejected}</Badge>
      default:
        return <Badge variant="secondary">{t.pending}</Badge>
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
              Back to Settings
            </Link>
            <Badge variant={addressData.verificationStatus === "verified" ? "default" : "secondary"}>
              {addressData.verificationStatus === "verified" ? t.verified : 
               addressData.verificationStatus === "rejected" ? t.rejected : t.pending}
            </Badge>
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
                <span>Progress</span>
                <span>{Math.round(completionProgress)}%</span>
              </div>
              <Progress value={completionProgress} className="h-2" />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle>{t.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
                </div>
              </div>
            </CardHeader>
        <CardContent className="space-y-6">
          {/* Verification Status */}
          {(addressData.verificationStatus !== "pending" || addressData.submittedDate) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{t.verificationStatus}</h3>
                {getStatusBadge(addressData.verificationStatus)}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getStatusIcon(addressData.verificationStatus)}
                {addressData.verificationStatus === "verified" && addressData.verifiedDate ? (
                  <span>{t.verifiedOn}: {addressData.verifiedDate}</span>
                ) : addressData.submittedDate ? (
                  <span>{t.submittedOn}: {addressData.submittedDate}</span>
                ) : null}
              </div>
              
              {addressData.notes && (
                <div className="mt-3">
                  <h4 className="font-medium text-sm mb-1">{t.notes}</h4>
                  <p className="text-sm text-muted-foreground">{addressData.notes}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Personal Address Information */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t.personalAddress}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="fullAddress">{t.fullAddress}</Label>
                <Textarea
                  id="fullAddress"
                  placeholder={t.fullAddressPlaceholder}
                  value={addressData.fullAddress}
                  onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                  disabled={readonly}
                  className={errors.fullAddress ? "border-red-500" : ""}
                />
                {errors.fullAddress && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullAddress}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="municipality">{t.municipality}</Label>
                <Input
                  id="municipality"
                  placeholder={t.municipalityPlaceholder}
                  value={addressData.municipality}
                  onChange={(e) => handleInputChange("municipality", e.target.value)}
                  disabled={readonly}
                  className={errors.municipality ? "border-red-500" : ""}
                />
                {errors.municipality && (
                  <p className="text-sm text-red-600 mt-1">{errors.municipality}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="ward">{t.ward}</Label>
                <Input
                  id="ward"
                  type="number"
                  min="1"
                  max="35"
                  placeholder={t.wardPlaceholder}
                  value={addressData.ward}
                  onChange={(e) => handleInputChange("ward", e.target.value)}
                  disabled={readonly}
                  className={errors.ward ? "border-red-500" : ""}
                />
                {errors.ward && (
                  <p className="text-sm text-red-600 mt-1">{errors.ward}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="district">{t.district}</Label>
                <Select
                  value={addressData.district}
                  onValueChange={(value) => handleInputChange("district", value)}
                  disabled={readonly}
                >
                  <SelectTrigger className={errors.district ? "border-red-500" : ""}>
                    <SelectValue placeholder={t.districtPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {nepaliDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && (
                  <p className="text-sm text-red-600 mt-1">{errors.district}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="province">{t.province}</Label>
                <Select
                  value={addressData.province}
                  onValueChange={(value) => handleInputChange("province", value)}
                  disabled={readonly}
                >
                  <SelectTrigger className={errors.province ? "border-red-500" : ""}>
                    <SelectValue placeholder={t.provincePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {nepaliProvinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && (
                  <p className="text-sm text-red-600 mt-1">{errors.province}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="postalCode">{t.postalCode}</Label>
                <Input
                  id="postalCode"
                  placeholder={t.postalCodePlaceholder}
                  value={addressData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  disabled={readonly}
                />
              </div>
            </div>
          </div>
          
          {/* Document Upload */}
          {!readonly && (
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t.documentUpload}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="documentType">{t.documentType}</Label>
                  <Select
                    value={addressData.documentType}
                    onValueChange={(value) => handleInputChange("documentType", value)}
                  >
                    <SelectTrigger className={errors.documentType ? "border-red-500" : ""}>
                      <SelectValue placeholder={t.documentTypeDesc} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility_bill">{t.utilityBill}</SelectItem>
                      <SelectItem value="bank_statement">{t.bankStatement}</SelectItem>
                      <SelectItem value="government_letter">{t.governmentLetter}</SelectItem>
                      <SelectItem value="rental_agreement">{t.rentalAgreement}</SelectItem>
                      <SelectItem value="property_tax">{t.propertyTax}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.documentType && (
                    <p className="text-sm text-red-600 mt-1">{errors.documentType}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="document">{t.uploadDocument}</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="document"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">{t.uploadDocument}</span>
                          </p>
                          <p className="text-xs text-gray-500">{t.fileRequirements}</p>
                        </div>
                        <input
                          id="document"
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    {addressData.documentFile && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        {addressData.documentFile.name}
                      </p>
                    )}
                    {errors.documentFile && (
                      <p className="text-sm text-red-600 mt-1">{errors.documentFile}</p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{t.uploadDesc}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          {!readonly && (
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : addressData.verificationStatus === "rejected" ? (
                  t.resubmit
                ) : addressData.verificationStatus === "verified" ? (
                  t.update
                ) : (
                  t.submit
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
      </div>
    </div>
  )
}