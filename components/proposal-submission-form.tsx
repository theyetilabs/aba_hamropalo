"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"

interface ProposalSubmissionFormProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Submit a Proposal",
    subtitle: "Share your ideas and contribute to democratic decision-making",
    step1: "Proposal Details",
    step2: "Implementation & Impact",
    step3: "Resources & Documentation",
    step4: "Review & Submit",
    proposalTitle: "Proposal Title",
    proposalTitlePlaceholder: "Enter a clear, concise title",
    circle: "Select Circle",
    selectCircle: "Select a circle",
    description: "Proposal Description",
    descriptionPlaceholder: "Describe your proposal in detail",
    category: "Category",
    selectCategory: "Select category",
    priority: "Priority Level",
    selectPriority: "Select priority",
    targetAudience: "Target Audience",
    targetAudiencePlaceholder: "Who will benefit from this proposal?",
    problem: "Problem Statement",
    problemPlaceholder: "What specific problem does this proposal address?",
    solution: "Proposed Solution",
    solutionPlaceholder: "How will this proposal solve the identified problem?",
    impact: "Expected Impact",
    impactPlaceholder: "Describe the expected impact on the community",
    timeline: "Implementation Timeline",
    timelinePlaceholder: "e.g., 3-6 months",
    budget: "Estimated Budget",
    budgetPlaceholder: "Enter estimated budget in NPR",
    fundingSource: "Funding Source",
    fundingSourcePlaceholder: "How will this be funded?",
    stakeholders: "Key Stakeholders",
    stakeholdersPlaceholder: "List organizations or individuals involved",
    risks: "Potential Risks & Mitigation",
    risksPlaceholder: "Identify potential challenges and how to address them",
    success: "Success Metrics",
    successPlaceholder: "How will success be measured?",
    attachments: "Supporting Documents",
    dragDrop: "Drag and drop files here or click to browse",
    maxSize: "Max file size: 10MB per file",
    submit: "Submit Proposal",
    submitting: "Submitting...",
    successMessage: "Proposal submitted successfully!",
    error: "Error submitting proposal",
    next: "Next",
    back: "Back",
    review: "Review Your Proposal",
    confirm: "Confirm & Submit",
    required: "Required",
    optional: "Optional",
  },
  ne: {
    title: "प्रस्ताव पेश गर्नुहोस्",
    subtitle: "आफ्नो विचारहरु साझा गर्नुहोस् र लोकतान्त्रिक निर्णय गहनमा योगदान गर्नुहोस्",
    step1: "प्रस्ताव विवरण",
    step2: "कार्यान्वयन र प्रभाव",
    step3: "स्रोत र कागजात",
    step4: "समीक्षा र पेश गर्नुहोस्",
    proposalTitle: "प्रस्ताव शीर्षक",
    proposalTitlePlaceholder: "स्पष्ट, संक्षिप्त शीर्षक प्रविष्ट गर्नुहोस्",
    circle: "सर्कल चयन गर्नुहोस्",
    selectCircle: "सर्कल चयन गर्नुहोस्",
    description: "प्रस्ताव विवरण",
    descriptionPlaceholder: "आफ्नो प्रस्तावलाई विस्तारमा वर्णन गर्नुहोस्",
    category: "श्रेणी",
    selectCategory: "श्रेणी चयन गर्नुहोस्",
    priority: "प्राथमिकता स्तर",
    selectPriority: "प्राथमिकता चयन गर्नुहोस्",
    targetAudience: "लक्षित दर्शक",
    targetAudiencePlaceholder: "यो प्रस्तावबाट कसलाई फाइदा हुन्छ?",
    problem: "समस्या विवरण",
    problemPlaceholder: "यो प्रस्तावले कुन विशिष्ट समस्यालाई सम्बोधन गर्छ?",
    solution: "प्रस्तावित समाधान",
    solutionPlaceholder: "यो प्रस्तावले पहिचान गरिएको समस्यालाई कसरी समाधान गर्छ?",
    impact: "अपेक्षित प्रभाव",
    impactPlaceholder: "समुदायमा अपेक्षित प्रभाव वर्णन गर्नुहोस्",
    timeline: "कार्यान्वयन समय सारणी",
    timelinePlaceholder: "उदा., ३-६ महिना",
    budget: "अनुमानित बजेट",
    budgetPlaceholder: "नेपाली रुपैयाँमा अनुमानित बजेट प्रविष्ट गर्नुहोस्",
    fundingSource: "आर्थिक स्रोत",
    fundingSourcePlaceholder: "यो कसरी वित्त पोषण हुनेछ?",
    stakeholders: "मुख्य सरोकारवाला",
    stakeholdersPlaceholder: "संलग्न संस्था वा व्यक्तिहरूको सूची",
    risks: "सम्भावित जोखिम र न्यूनीकरण",
    risksPlaceholder: "सम्भावित चुनौतीहरू र तिनलाई कसरी सम्बोधन गर्ने पहिचान गर्नुहोस्",
    success: "सफलताका मापदण्डहरू",
    successPlaceholder: "सफलता कसरी मापन गरिनेछ?",
    attachments: "सहायक कागजातहरू",
    dragDrop: "यहाँ फाइलहरु ड्र्याग र ड्रप गर्नुहोस् वा ब्राउज गर्न क्लिक गर्नुहोस्",
    maxSize: "अधिकतम फाइल आकार: प्रति फाइल १०MB",
    submit: "प्रस्ताव पेश गर्नुहोस्",
    submitting: "पेश गरिँदै...",
    successMessage: "प्रस्ताव सफलतापूर्वक पेश गरिएको!",
    error: "प्रस्ताव पेश गर्न त्रुटि",
    next: "अगाडि",
    back: "पछाडि",
    review: "आफ्नो प्रस्ताव समीक्षा गर्नुहोस्",
    confirm: "पुष्टि गर्नुहोस् र पेश गर्नुहोस्",
    required: "आवश्यक",
    optional: "वैकल्पिक",
  },
}

export default function ProposalSubmissionForm({ locale }: ProposalSubmissionFormProps) {
  const t = content[locale]
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    circle: "",
    description: "",
    category: "",
    priority: "",
    targetAudience: "",
    problem: "",
    solution: "",
    impact: "",
    timeline: "",
    budget: "",
    fundingSource: "",
    stakeholders: "",
    risks: "",
    success: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setTimeout(() => {
        setStep(1)
        setFormData({ 
          title: "", circle: "", description: "", category: "", priority: "",
          targetAudience: "", problem: "", solution: "", impact: "", timeline: "",
          budget: "", fundingSource: "", stakeholders: "", risks: "", success: ""
        })
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-blue-600">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step ? "bg-blue-600 text-white" : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-blue-600" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 ? t.step1 : step === 2 ? t.step2 : step === 3 ? t.step3 : t.step4}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.proposalTitle} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="title"
                    placeholder={t.proposalTitlePlaceholder}
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.circle} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="circle"
                      value={formData.circle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    >
                      <option value="">{t.selectCircle}</option>
                      <option value="civic-vigilance">नागरिक सतर्कता (Civic Vigilance)</option>
                      <option value="institutional-innovation">संस्थागत नवाचार (Institutional Innovation)</option>
                      <option value="community-service">सामुदायिक सेवा (Community Service)</option>
                      <option value="national-coalition">राष्ट्रिय गठबन्धन (National Coalition)</option>
                      <option value="environmental-action">वातावरणीय कार्य (Environmental Action)</option>
                      <option value="education-reform">शिक्षा सुधार (Education Reform)</option>
                      <option value="healthcare-access">स्वास्थ्य सेवा पहुँच (Healthcare Access)</option>
                      <option value="economic-justice">आर्थिक न्याय (Economic Justice)</option>
                      <option value="digital-rights">डिजिटल अधिकार (Digital Rights)</option>
                      <option value="cultural-heritage">सांस्कृतिक सम्पदा (Cultural Heritage)</option>
                      <option value="rural-development">ग्रामीण विकास (Rural Development)</option>
                      <option value="gender-equality">लैंगिक समानता (Gender Equality)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.category} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    >
                      <option value="">{t.selectCategory}</option>
                      <option value="policy">नीति (Policy)</option>
                      <option value="initiative">पहल (Initiative)</option>
                      <option value="reform">सुधार (Reform)</option>
                      <option value="project">परियोजना (Project)</option>
                      <option value="infrastructure">पूर्वाधार (Infrastructure)</option>
                      <option value="social-welfare">सामाजिक कल्याण (Social Welfare)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.priority} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">{t.selectPriority}</option>
                    <option value="urgent">तत्काल (Urgent)</option>
                    <option value="high">उच्च (High)</option>
                    <option value="medium">मध्यम (Medium)</option>
                    <option value="low">न्यून (Low)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.description} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="description"
                    placeholder={t.descriptionPlaceholder}
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.targetAudience} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="targetAudience"
                    placeholder={t.targetAudiencePlaceholder}
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.problem} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="problem"
                    placeholder={t.problemPlaceholder}
                    value={formData.problem}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.solution} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="solution"
                    placeholder={t.solutionPlaceholder}
                    value={formData.solution}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.impact} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="impact"
                    placeholder={t.impactPlaceholder}
                    value={formData.impact}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.timeline} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="timeline"
                      placeholder={t.timelinePlaceholder}
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.success} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="success"
                      placeholder={t.successPlaceholder}
                      value={formData.success}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.budget} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="budget"
                      placeholder={t.budgetPlaceholder}
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.fundingSource} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="fundingSource"
                      placeholder={t.fundingSourcePlaceholder}
                      value={formData.fundingSource}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.stakeholders} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="stakeholders"
                    placeholder={t.stakeholdersPlaceholder}
                    value={formData.stakeholders}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.risks} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="risks"
                    placeholder={t.risksPlaceholder}
                    value={formData.risks}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.attachments} <span className="text-muted-foreground">({t.optional})</span>
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-blue-600 transition">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{t.dragDrop}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.maxSize}</p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">{t.review}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.proposalTitle}</p>
                      <p className="font-medium">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.circle}</p>
                      <p className="font-medium">{formData.circle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.category}</p>
                      <p className="font-medium">{formData.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.priority}</p>
                      <p className="font-medium">{formData.priority}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                      <p className="font-medium">{formData.description}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">{t.impact}</p>
                      <p className="font-medium">{formData.impact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.budget}</p>
                      <p className="font-medium">{formData.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.timeline}</p>
                      <p className="font-medium">{formData.timeline}</p>
                    </div>
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">{t.successMessage}</p>
                      <p className="text-sm text-green-800">
                        {locale === "en"
                          ? "Your proposal has been submitted for review by the circle members."
                          : "तपाईको प्रस्ताव सर्कल सदस्यहरूको समीक्षाको लागि पेश गरिएको छ।"}
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">{t.error}</p>
                      <p className="text-sm text-red-800">
                        {locale === "en" ? "Please try again later." : "कृपया पछि पुन: प्रयास गर्नुहोस्।"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  {t.back}
                </Button>
              )}
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={
                    (step === 1 && (!formData.title || !formData.circle || !formData.description || !formData.category || !formData.priority || !formData.targetAudience)) ||
                    (step === 2 && (!formData.problem || !formData.solution || !formData.impact || !formData.timeline || !formData.success)) ||
                    (step === 3 && (!formData.budget || !formData.fundingSource || !formData.stakeholders || !formData.risks))
                  }
                >
                  {t.next}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.submitting : t.confirm}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
