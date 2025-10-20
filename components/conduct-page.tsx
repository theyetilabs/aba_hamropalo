"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface ConductPageProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Community Code of Conduct",
    subtitle: "Guidelines for respectful and constructive participation",
    ourValues: "Our Values",
    sewa: "SEWA Principles",
    sewaDesc: "Service, Equity, Wisdom, and Accountability guide all our interactions",
    principles: "Core Principles",
    principle1: "Respect and Dignity",
    principle1Desc: "Treat all members with respect and dignity, regardless of background or beliefs",
    principle2: "Transparency",
    principle2Desc: "Communicate openly and honestly in all discussions and decisions",
    principle3: "Inclusivity",
    principle3Desc: "Welcome diverse perspectives and ensure all voices are heard",
    principle4: "Accountability",
    principle4Desc: "Take responsibility for your actions and their impact on the community",
    principle5: "Non-Violence",
    principle5Desc: "Resolve conflicts peacefully and avoid harmful language or behavior",
    principle6: "Evidence-Based",
    principle6Desc: "Support arguments with facts, data, and credible sources",
    expectedBehavior: "Expected Behavior",
    behavior1: "Participate constructively in discussions",
    behavior2: "Listen actively to different viewpoints",
    behavior3: "Provide evidence-based feedback",
    behavior4: "Respect confidentiality and privacy",
    behavior5: "Support new members and foster learning",
    behavior6: "Report violations through proper channels",
    unacceptableBehavior: "Unacceptable Behavior",
    unacceptable1: "Hate speech, discrimination, or harassment",
    unacceptable2: "Spreading misinformation or false claims",
    unacceptable3: "Personal attacks or ad hominem arguments",
    unacceptable4: "Manipulation or coercion of voting",
    unacceptable5: "Violation of confidentiality or privacy",
    unacceptable6: "Spam or disruptive behavior",
    enforcement: "Enforcement",
    enforcementDesc:
      "Violations of this Code of Conduct may result in warnings, token burning, temporary suspension, or permanent removal from the platform. All enforcement actions are subject to community review.",
    minorViolation: "Minor Violation",
    minorViolationDesc: "25% token burn + warning",
    majorViolation: "Major Violation",
    majorViolationDesc: "75% token burn + suspension",
    severeViolation: "Severe Violation",
    severeViolationDesc: "100% token burn + permanent removal",
    reportingViolations: "Reporting Violations",
    reportingDesc:
      "If you witness a violation of this Code of Conduct, please report it to the community moderators or the Council. All reports are treated confidentially.",
    contactSupport: "Contact Support",
    email: "Email: info@hamropalo.org",
    appeals: "Appeals Process",
    appealsDesc:
      "Members have the right to appeal enforcement actions. Appeals are reviewed by an independent panel and decided through community vote.",
    commitment: "Our Commitment",
    commitmentDesc:
      "We are committed to maintaining a safe, respectful, and inclusive community where all members can participate fully in democratic governance. This Code of Conduct applies to all members and is enforced fairly and consistently.",
  },
  ne: {
    title: "सामुदायिक आचरण संहिता",
    subtitle: "सम्मानजनक र रचनात्मक भागीदारीको लागि दिशानिर्देश",
    ourValues: "हाम्रो मानहरु",
    sewa: "SEWA सिद्धान्तहरु",
    sewaDesc: "सेवा, समानता, ज्ञान, र जवाबदेहिता सबै हाम्रो अन्तरक्रियाहरुलाई गाइड गर्छन्",
    principles: "मूल सिद्धान्तहरु",
    principle1: "सम्मान र गरिमा",
    principle1Desc: "सबै सदस्यहरुलाई पृष्ठभूमि वा विश्वास निर्विशेष सम्मान र गरिमा सहित व्यवहार गर्नुहोस्",
    principle2: "पारदर्शिता",
    principle2Desc: "सबै छलफल र निर्णयहरुमा खुलेआम र इमानदारीपूर्वक संचार गर्नुहोस्",
    principle3: "समावेशिता",
    principle3Desc: "विविध दृष्टिकोणहरु स्वागत गर्नुहोस् र सबै आवाजहरु सुनिश्चित गर्नुहोस्",
    principle4: "जवाबदेहिता",
    principle4Desc: "आपनो कार्यहरु र सामुदायिकमा तिनको प्रभावको लागि जिम्मेवारी लिनुहोस्",
    principle5: "अहिंसा",
    principle5Desc: "द्वन्द्वहरु शान्तिपूर्वक समाधान गर्नुहोस् र हानिकारक भाषा वा व्यवहार बेवास्ता गर्नुहोस्",
    principle6: "प्रमाण-आधारित",
    principle6Desc: "तर्कहरुलाई तथ्य, डेटा, र विश्वसनीय स्रोतहरु सहित समर्थन गर्नुहोस्",
    expectedBehavior: "अपेक्षित व्यवहार",
    behavior1: "छलफलमा रचनात्मक रूपमा भाग लिनुहोस्",
    behavior2: "विभिन्न दृष्टिकोणहरु सक्रियतापूर्वक सुनुहोस्",
    behavior3: "प्रमाण-आधारित प्रतिक्रिया प्रदान गर्नुहोस्",
    behavior4: "गोपनीयता र गोपनीयता सम्मान गर्नुहोस्",
    behavior5: "नयाँ सदस्यहरुलाई समर्थन गर्नुहोस् र सिकाइ बढाउनुहोस्",
    behavior6: "उचित च्यानलहरु मार्फत उल्लंघनहरु रिपोर्ट गर्नुहोस्",
    unacceptableBehavior: "अस्वीकार्य व्यवहार",
    unacceptable1: "घृणा भाषण, भेदभाव, वा उत्पीडन",
    unacceptable2: "गलत जानकारी वा झूठा दावीहरु फैलाउनु",
    unacceptable3: "व्यक्तिगत आक्रमण वा ad hominem तर्कहरु",
    unacceptable4: "मतदान हेरफेर वा जबरदस्ती",
    unacceptable5: "गोपनीयता वा गोपनीयता उल्लंघन",
    unacceptable6: "स्प्याम वा विघ्नकारी व्यवहार",
    enforcement: "प्रवर्तन",
    enforcementDesc:
      "यो आचरण संहिता उल्लंघनहरु चेतावनीहरु, टोकन जलन, अस्थायी निलम्बन, वा प्ल्याटफर्मबाट स्थायी हटाउने परिणाम हुन सक्छ। सबै प्रवर्तन कार्यहरु सामुदायिक समीक्षाको अधीन छन्।",
    minorViolation: "साना उल्लंघन",
    minorViolationDesc: "२५% टोकन जलन + चेतावनी",
    majorViolation: "प्रमुख उल्लंघन",
    majorViolationDesc: "७५% टोकन जलन + निलम्बन",
    severeViolation: "गम्भीर उल्लंघन",
    severeViolationDesc: "१००% टोकन जलन + स्थायी हटाउने",
    reportingViolations: "उल्लंघनहरु रिपोर्ट गर्नु",
    reportingDesc:
      "यदि तपाई यो आचरण संहिता उल्लंघन साक्षी हुनुहुन्छ भने, कृपया सामुदायिक मध्यस्थहरु वा काउन्सिललाई रिपोर्ट गर्नुहोस्। सबै रिपोर्टहरु गोपनीय रूपमा व्यवहार गरिन्छ।",
    contactSupport: "समर्थन सम्पर्क गर्नुहोस्",
    email: "ईमेल: info@hamropalo.org",
    appeals: "अपील प्रक्रिया",
    appealsDesc:
      "सदस्यहरुलाई प्रवर्तन कार्यहरु अपील गर्ने अधिकार छ। अपीलहरु स्वतन्त्र प्यानेल द्वारा समीक्षा गरिन्छ र सामुदायिक मतद्वारा निर्णय गरिन्छ।",
    commitment: "हाम्रो प्रतिबद्धता",
    commitmentDesc:
      "हम एक सुरक्षित, सम्मानजनक, र समावेशी सामुदायिक बनाए राख्न प्रतिबद्ध छौं जहाँ सबै सदस्यहरु लोकतान्त्रिक शासनमा पूर्ण रूपमा भाग लिन सक्छन्। यो आचरण संहिता सबै सदस्यहरुमा लागु हुन्छ र न्यायपूर्वक र सुसंगत रूपमा प्रवर्तन गरिन्छ।",
  },
}

export default function ConductPageComponent({ locale }: ConductPageProps) {
  const t = content[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Our Values */}
        <Card className="mb-8 border-l-4 border-primary">
          <CardHeader>
            <CardTitle>{t.ourValues}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">{t.sewa}</h3>
              <p className="text-blue-800">{t.sewaDesc}</p>
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">{t.principles}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: t.principle1, desc: t.principle1Desc },
              { title: t.principle2, desc: t.principle2Desc },
              { title: t.principle3, desc: t.principle3Desc },
              { title: t.principle4, desc: t.principle4Desc },
              { title: t.principle5, desc: t.principle5Desc },
              { title: t.principle6, desc: t.principle6Desc },
            ].map((principle, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">{principle.title}</p>
                      <p className="text-sm text-muted-foreground">{principle.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Expected Behavior */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.expectedBehavior}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[t.behavior1, t.behavior2, t.behavior3, t.behavior4, t.behavior5, t.behavior6].map((behavior, idx) => (
              <div key={idx} className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{behavior}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Unacceptable Behavior */}
        <Card className="mb-8 border-l-4 border-red-500">
          <CardHeader>
            <CardTitle>{t.unacceptableBehavior}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[t.unacceptable1, t.unacceptable2, t.unacceptable3, t.unacceptable4, t.unacceptable5, t.unacceptable6].map(
              (behavior, idx) => (
                <div key={idx} className="flex gap-2">
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{behavior}</span>
                </div>
              ),
            )}
          </CardContent>
        </Card>

        {/* Enforcement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.enforcement}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">{t.enforcementDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-900 mb-1">{t.minorViolation}</p>
                <p className="text-sm text-blue-800">{t.minorViolationDesc}</p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="font-semibold text-orange-900 mb-1">{t.majorViolation}</p>
                <p className="text-sm text-orange-800">{t.majorViolationDesc}</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-semibold text-red-900 mb-1">{t.severeViolation}</p>
                <p className="text-sm text-red-800">{t.severeViolationDesc}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting & Appeals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {t.reportingViolations}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">{t.reportingDesc}</p>
              <p className="text-sm font-semibold">{t.contactSupport}</p>
              <p className="text-sm text-muted-foreground">{t.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.appeals}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.appealsDesc}</p>
            </CardContent>
          </Card>
        </div>

        {/* Commitment */}
        <Card className="border-l-4 border-primary">
          <CardHeader>
            <CardTitle>{t.commitment}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{t.commitmentDesc}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
