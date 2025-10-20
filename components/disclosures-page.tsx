"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, FileText, Users, TrendingUp } from "lucide-react"

interface DisclosuresPageProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Transparency & Disclosures",
    subtitle: "Our commitment to openness and accountability",
    overview: "Overview",
    overviewText:
      "AbaHamroPalo is built on the principle of radical transparency. All members are required to disclose relevant information about their backgrounds, interests, and potential conflicts. This ensures that our community can make informed decisions and maintain trust in our governance processes.",
    whyDisclosures: "Why Disclosures Matter",
    whyText:
      "Disclosures help us identify potential conflicts of interest, understand diverse perspectives, and ensure that decisions are made in the best interest of the community. They are not meant to judge or exclude, but to foster transparency and accountability.",
    disclosureTypes: "Types of Disclosures",
    financial: "Financial Interests",
    financialDesc:
      "Income sources, investments, business interests, and financial obligations that may influence your participation.",
    portfolio: "Professional Portfolio",
    portfolioDesc:
      "Your work experience, expertise, affiliations, and professional achievements relevant to governance.",
    allegations: "Public Allegations",
    allegationsDesc: "Any public allegations, legal cases, or controversies that may be relevant to community trust.",
    conflicts: "Potential Conflicts",
    conflictsDesc: "Any relationships, affiliations, or interests that could create conflicts in decision-making.",
    disclosureProcess: "Disclosure Process",
    step1: "Initial Disclosure",
    step1Desc: "Complete a comprehensive disclosure form during registration and KYC verification.",
    step2: "Verification",
    step2Desc: "Our verification team reviews disclosures for completeness and accuracy.",
    step3: "Public Profile",
    step3Desc: "Your verified disclosures are displayed on your public profile for community transparency.",
    step4: "Updates",
    step4Desc: "Update your disclosures whenever significant changes occur in your circumstances.",
    confidentiality: "Confidentiality & Privacy",
    confidentialityText:
      "While disclosures are public, sensitive personal information is protected. We follow strict data protection protocols and comply with Nepal's privacy laws. Your data is encrypted and accessible only to authorized personnel.",
    consequences: "Consequences of Non-Disclosure",
    consequence1: "Incomplete or false disclosures may result in account suspension or removal.",
    consequence2: "Repeated violations may result in permanent ban from the platform.",
    consequence3: "Serious violations may be reported to relevant authorities.",
    updates: "Disclosure Updates",
    updatesText:
      "Members must update their disclosures within 30 days of any significant change in their circumstances. This includes new business interests, legal cases, or changes in employment.",
    examples: "Examples of Disclosures",
    example1Title: "Example 1: Business Owner",
    example1Desc:
      "If you own a business that could benefit from platform decisions, disclose the business, its nature, and potential conflicts.",
    example2Title: "Example 2: Government Employee",
    example2Desc:
      "If you work for a government agency, disclose your position and any potential conflicts with platform governance.",
    example3Title: "Example 3: NGO Founder",
    example3Desc:
      "If you founded an NGO, disclose its mission, funding sources, and any potential conflicts with platform decisions.",
    commitment: "Our Commitment to Transparency",
    commitmentText:
      "We are committed to maintaining the highest standards of transparency and accountability. We believe that open disclosure strengthens our community and builds trust. We will continue to evolve our disclosure practices based on community feedback.",
    questions: "Questions About Disclosures?",
    questionsText: "Contact our transparency team at: transparency@hamropalo.org",
  },
  ne: {
    title: "पारदर्शिता र प्रकटीकरण",
    subtitle: "खुलेपन र जवाबदेहिताको लागि हाम्रो प्रतिबद्धता",
    overview: "अवलोकन",
    overviewText:
      "अबा हाम्रो पालो कट्टर पारदर्शिताको सिद्धान्तमा निर्मित छ। सबै सदस्यहरु आपनो पृष्ठभूमि, हित, र सम्भावित द्वन्द्वहरु बारे प्रासंगिक जानकारी प्रकट गर्न आवश्यक छन्। यो सुनिश्चित गर्छ कि हाम्रो सामुदायिक सूचित निर्णय गर्न र हाम्रो शासन प्रक्रियामा विश्वास बनाए राख्न सक्छ।",
    whyDisclosures: "प्रकटीकरण किन महत्त्वपूर्ण छन्",
    whyText:
      "प्रकटीकरणहरु हामीलाई सम्भावित द्वन्द्वहरु पहिचान गर्न, विविध दृष्टिकोणहरु बुझ्न, र निर्णयहरु सामुदायिकको सर्वोत्तम हितमा गरिन्छ भनी सुनिश्चित गर्न मद्दत गर्छन्। तिनहरु न्याय गर्न वा बहिष्कार गर्न नहीं, तर पारदर्शिता र जवाबदेहिता बढाउन हो।",
    disclosureTypes: "प्रकटीकरणको प्रकारहरु",
    financial: "आर्थिक हितहरु",
    financialDesc: "आय स्रोतहरु, लगानीहरु, व्यावसायिक हितहरु, र आर्थिक दायित्वहरु जो आपनो भागीदारीलाई असर गर्न सक्छन्।",
    portfolio: "व्यावसायिक पोर्टफोलियो",
    portfolioDesc: "आपनो कार्य अनुभव, विशेषज्ञता, सम्बद्धताहरु, र शासनको लागि प्रासंगिक व्यावसायिक उपलब्धिहरु।",
    allegations: "सार्वजनिक आरोपहरु",
    allegationsDesc: "कुनै पनि सार्वजनिक आरोपहरु, कानूनी मामलाहरु, वा विवादहरु जो सामुदायिक विश्वासको लागि प्रासंगिक हुन सक्छन्।",
    conflicts: "सम्भावित द्वन्द्वहरु",
    conflictsDesc: "कुनै पनि सम्बन्धहरु, सम्बद्धताहरु, वा हितहरु जो निर्णय-निर्माणमा द्वन्द्व सिर्जना गर्न सक्छन्।",
    disclosureProcess: "प्रकटीकरण प्रक्रिया",
    step1: "प्रारम्भिक प्रकटीकरण",
    step1Desc: "दर्ता र KYC प्रमाणीकरणको समयमा एक व्यापक प्रकटीकरण फर्म पूरा गर्नुहोस्।",
    step2: "प्रमाणीकरण",
    step2Desc: "हाम्रो प्रमाणीकरण टीम पूर्णता र सटीकताको लागि प्रकटीकरणहरु समीक्षा गर्छ।",
    step3: "सार्वजनिक प्रोफाइल",
    step3Desc: "आपनो प्रमाणित प्रकटीकरणहरु सामुदायिक पारदर्शिताको लागि आपनो सार्वजनिक प्रोफाइलमा प्रदर्शित छन्।",
    step4: "अपडेटहरु",
    step4Desc: "आपनो परिस्थितिमा महत्त्वपूर्ण परिवर्तन हुँदा आपनो प्रकटीकरणहरु अपडेट गर्नुहोस्।",
    confidentiality: "गोपनीयता र गोपनीयता",
    confidentialityText:
      "जबकि प्रकटीकरणहरु सार्वजनिक छन्, संवेदनशील व्यक्तिगत जानकारी सुरक्षित छ। हम कठोर डेटा सुरक्षा प्रोटोकल अनुसरण गर्छौं र नेपालको गोपनीयता कानूनहरु पालन गर्छौं। आपनो डेटा एन्क्रिप्ट गरिएको छ र केवल अधिकृत कर्मचारीहरु पहुँचयोग्य छ।",
    consequences: "गैर-प्रकटीकरणको परिणामहरु",
    consequence1: "अधूरो वा झूठा प्रकटीकरणहरु खाता निलम्बन वा हटाउने परिणाम हुन सक्छन्।",
    consequence2: "दोहोरिएको उल्लंघनहरु प्ल्याटफर्मबाट स्थायी प्रतिबन्ध परिणाम हुन सक्छन्।",
    consequence3: "गम्भीर उल्लंघनहरु सम्बन्धित अधिकारीहरुलाई रिपोर्ट गर्न सकिन्छ।",
    updates: "प्रकटीकरण अपडेटहरु",
    updatesText:
      "सदस्यहरु आपनो परिस्थितिमा कुनै पनि महत्त्वपूर्ण परिवर्तनको ३० दिन भित्र आपनो प्रकटीकरणहरु अपडेट गर्नुपर्छ। यो नयाँ व्यावसायिक हितहरु, कानूनी मामलाहरु, वा रोजगारमा परिवर्तनहरु समावेश गर्छ।",
    examples: "प्रकटीकरणको उदाहरणहरु",
    example1Title: "उदाहरण १: व्यावसायिक मालिक",
    example1Desc:
      "यदि तपाई एक व्यावसायिकको मालिक हुनुहुन्छ जो प्ल्याटफर्म निर्णयहरु लाभान्वित हुन सक्छ, व्यावसायिक, यसको प्रकृति, र सम्भावित द्वन्द्वहरु प्रकट गर्नुहोस्।",
    example2Title: "उदाहरण २: सरकारी कर्मचारी",
    example2Desc:
      "यदि तपाई सरकारी एजेन्सीको लागि काम गर्नुहुन्छ, आपनो स्थिति र प्ल्याटफर्म शासनसँग कुनै पनि सम्भावित द्वन्द्वहरु प्रकट गर्नुहोस्।",
    example3Title: "उदाहरण ३: NGO संस्थापक",
    example3Desc:
      "यदि तपाई एक NGO संस्थापन गर्नुभएको हुनुहुन्छ, यसको मिशन, फन्डिङ स्रोतहरु, र प्ल्याटफर्म निर्णयहरुसँग कुनै पनि सम्भावित द्वन्द्वहरु प्रकट गर्नुहोस्।",
    commitment: "पारदर्शिताको लागि हाम्रो प्रतिबद्धता",
    commitmentText:
      "हम पारदर्शिता र जवाबदेहिताको सर्वोच्च मान बनाए राख्न प्रतिबद्ध छौं। हम विश्वास गर्छौं कि खुला प्रकटीकरण हाम्रो सामुदायिकलाई शक्तिशाली बनाउँछ र विश्वास निर्माण गर्छ। हम सामुदायिक प्रतिक्रियाको आधारमा हाम्रो प्रकटीकरण अभ्यास विकसित गर्न जारी राख्नेछौं।",
    questions: "प्रकटीकरणहरु बारे प्रश्नहरु?",
    questionsText: "हाम्रो पारदर्शिता टीमलाई सम्पर्क गर्नुहोस्: transparency@hamropalo.org",
  },
}

export default function DisclosuresPageComponent({ locale }: DisclosuresPageProps) {
  const t = content[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Overview */}
        <Card className="mb-8 border-l-4 border-primary">
          <CardHeader>
            <CardTitle>{t.overview}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{t.overviewText}</p>
          </CardContent>
        </Card>

        {/* Why Disclosures Matter */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">{t.whyText}</AlertDescription>
        </Alert>

        {/* Types of Disclosures */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">{t.disclosureTypes}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: t.financial, desc: t.financialDesc, icon: TrendingUp },
              { title: t.portfolio, desc: t.portfolioDesc, icon: FileText },
              { title: t.allegations, desc: t.allegationsDesc, icon: AlertCircle },
              { title: t.conflicts, desc: t.conflictsDesc, icon: Users },
            ].map((disclosure, idx) => {
              const Icon = disclosure.icon
              return (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">{disclosure.title}</p>
                        <p className="text-sm text-muted-foreground">{disclosure.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Disclosure Process */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">{t.disclosureProcess}</h2>
          <div className="space-y-4">
            {[
              { title: t.step1, desc: t.step1Desc },
              { title: t.step2, desc: t.step2Desc },
              { title: t.step3, desc: t.step3Desc },
              { title: t.step4, desc: t.step4Desc },
            ].map((step, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Confidentiality */}
        <Card className="mb-8 border-l-4 border-accent">
          <CardHeader>
            <CardTitle>{t.confidentiality}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{t.confidentialityText}</p>
          </CardContent>
        </Card>

        {/* Consequences */}
        <Card className="mb-8 border-l-4 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-700">{t.consequences}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[t.consequence1, t.consequence2, t.consequence3].map((consequence, idx) => (
              <div key={idx} className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{consequence}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.updates}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{t.updatesText}</p>
          </CardContent>
        </Card>

        {/* Examples */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">{t.examples}</h2>
          <div className="space-y-4">
            {[
              { title: t.example1Title, desc: t.example1Desc },
              { title: t.example2Title, desc: t.example2Desc },
              { title: t.example3Title, desc: t.example3Desc },
            ].map((example, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">{example.title}</p>
                  <p className="text-sm text-muted-foreground">{example.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Commitment */}
        <Card className="mb-8 bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-white">{t.commitment}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white leading-relaxed">{t.commitmentText}</p>
          </CardContent>
        </Card>

        {/* Questions */}
        <Alert className="bg-green-50 border-green-200">
          <FileText className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <p className="font-semibold mb-1">{t.questions}</p>
            <p>{t.questionsText}</p>
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
