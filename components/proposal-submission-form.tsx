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
    step2: "Impact Assessment",
    step3: "Review & Submit",
    proposalTitle: "Proposal Title",
    proposalTitlePlaceholder: "Enter a clear, concise title",
    circle: "Select Circle",
    selectCircle: "Select a circle",
    description: "Proposal Description",
    descriptionPlaceholder: "Describe your proposal in detail",
    category: "Category",
    selectCategory: "Select category",
    impact: "Expected Impact",
    impactPlaceholder: "Describe the expected impact",
    timeline: "Implementation Timeline",
    timelinePlaceholder: "e.g., 3-6 months",
    budget: "Estimated Budget (Optional)",
    budgetPlaceholder: "Enter estimated budget",
    attachments: "Attachments (Optional)",
    dragDrop: "Drag and drop files here or click to browse",
    maxSize: "Max file size: 10MB",
    submit: "Submit Proposal",
    submitting: "Submitting...",
    success: "Proposal submitted successfully!",
    error: "Error submitting proposal",
    next: "Next",
    back: "Back",
    review: "Review Your Proposal",
    confirm: "Confirm & Submit",
  },
  ne: {
    title: "प्रस्ताव पेश गर्नुहोस्",
    subtitle: "आफ्नो विचारहरु साझा गर्नुहोस् र लोकतान्त्रिक निर्णय गहनमा योगदान गर्नुहोस्",
    step1: "प्रस्ताव विवरण",
    step2: "प्रभाव मूल्यांकन",
    step3: "समीक्षा र पेश गर्नुहोस्",
    proposalTitle: "प्रस्ताव शीर्षक",
    proposalTitlePlaceholder: "स्पष्ट, संक्षिप्त शीर्षक प्रविष्ट गर्नुहोस्",
    circle: "सर्कल चयन गर्नुहोस्",
    selectCircle: "सर्कल चयन गर्नुहोस्",
    description: "प्रस्ताव विवरण",
    descriptionPlaceholder: "आफ्नो प्रस्तावलाई विस्तारमा वर्णन गर्नुहोस्",
    category: "श्रेणी",
    selectCategory: "श्रेणी चयन गर्नुहोस्",
    impact: "अपेक्षित प्रभाव",
    impactPlaceholder: "अपेक्षित प्रभाव वर्णन गर्नुहोस्",
    timeline: "कार्यान्वयन समय सारणी",
    timelinePlaceholder: "उदा., ३-६ महिना",
    budget: "अनुमानित बजेट (वैकल्पिक)",
    budgetPlaceholder: "अनुमानित बजेट प्रविष्ट गर्नुहोस्",
    attachments: "संलग्नकहरु (वैकल्पिक)",
    dragDrop: "यहाँ फाइलहरु ड्र्याग र ड्रप गर्नुहोस् वा ब्राउज गर्न क्लिक गर्नुहोस्",
    maxSize: "अधिकतम फाइल आकार: १०MB",
    submit: "प्रस्ताव पेश गर्नुहोस्",
    submitting: "पेश गरिँदै...",
    success: "प्रस्ताव सफलतापूर्वक पेश गरिएको!",
    error: "प्रस्ताव पेश गर्न त्रुटि",
    next: "अगाडि",
    back: "पछाडि",
    review: "आफ्नो प्रस्ताव समीक्षा गर्नुहोस्",
    confirm: "पुष्टि गर्नुहोस् र पेश गर्नुहोस्",
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
    impact: "",
    timeline: "",
    budget: "",
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
        setFormData({ title: "", circle: "", description: "", category: "", impact: "", timeline: "", budget: "" })
        setSubmitStatus("idle")
      }, 2000)
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
          <h1 className="text-4xl font-bold mb-2 text-primary">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-primary" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{step === 1 ? t.step1 : step === 2 ? t.step2 : t.step3}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.proposalTitle}</label>
                  <Input
                    name="title"
                    placeholder={t.proposalTitlePlaceholder}
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.circle}</label>
                  <select
                    name="circle"
                    value={formData.circle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">{t.selectCircle}</option>
                    <option value="governance">Governance & Policy</option>
                    <option value="environment">Environment & Sustainability</option>
                    <option value="education">Education & Youth</option>
                    <option value="health">Health & Wellbeing</option>
                    <option value="economy">Economic Development</option>
                    <option value="culture">Culture & Heritage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.description}</label>
                  <Textarea
                    name="description"
                    placeholder={t.descriptionPlaceholder}
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.category}</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">{t.selectCategory}</option>
                    <option value="policy">Policy</option>
                    <option value="initiative">Initiative</option>
                    <option value="reform">Reform</option>
                    <option value="project">Project</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.impact}</label>
                  <Textarea
                    name="impact"
                    placeholder={t.impactPlaceholder}
                    value={formData.impact}
                    onChange={handleInputChange}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.timeline}</label>
                  <Input
                    name="timeline"
                    placeholder={t.timelinePlaceholder}
                    value={formData.timeline}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.budget}</label>
                  <Input
                    name="budget"
                    placeholder={t.budgetPlaceholder}
                    value={formData.budget}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.attachments}</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{t.dragDrop}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.maxSize}</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">{t.review}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.proposalTitle}</p>
                      <p className="font-medium">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.circle}</p>
                      <p className="font-medium">{formData.circle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                      <p className="font-medium">{formData.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.impact}</p>
                      <p className="font-medium">{formData.impact}</p>
                    </div>
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">{t.success}</p>
                      <p className="text-sm text-green-800">
                        {locale === "en"
                          ? "Your proposal has been submitted for review."
                          : "तपाईको प्रस्ताव समीक्षाको लागि पेश गरिएको छ।"}
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
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto bg-primary hover:bg-primary/90"
                  disabled={
                    (step === 1 && (!formData.title || !formData.circle || !formData.description)) ||
                    (step === 2 && !formData.impact)
                  }
                >
                  {t.next}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="ml-auto bg-primary hover:bg-primary/90"
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
