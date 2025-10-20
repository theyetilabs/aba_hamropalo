"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TermsPageProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "Terms and Conditions",
    effectiveDate: "Effective Date: October 2025",
    section1: "1. Purpose and Scope",
    section1Content:
      "These Terms and Conditions govern your access to and use of the AbaHamroPalo Web Platform. By accessing or using the platform, you agree to be bound by these Terms, our Privacy Policy, and all related governance charters.",
    section2: "2. Eligibility and Registration",
    section2Content:
      "To use this platform, you must be a citizen or resident of Nepal, at least 18 years old, and commit to the SEWA values of service, transparency, and non-violence.",
    section3: "3. User Responsibilities",
    section3Content:
      "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to use the platform only for lawful purposes and in a way that does not infringe upon the rights of others.",
    section4: "4. Intellectual Property",
    section4Content:
      "The platform, content, and tools are owned by the Nepal Regeneration Movement DAO. Users retain rights to original submissions but grant the DAO a non-exclusive license to use, display, and distribute content for governance purposes.",
    section5: "5. Limitation of Liability",
    section5Content:
      "The platform operates on a best-effort basis and is not liable for political, personal, or reputational consequences of user participation, third-party integrations, or temporary disruptions.",
    section6: "6. Amendments",
    section6Content:
      "These Terms are living and evolve democratically. Changes may be proposed by any member and ratified through the 1-Voice-1-Vote system. Users will be notified of updates and must re-consent to continue participation.",
    section7: "7. Termination",
    section7Content:
      "Members may leave the platform voluntarily at any time. The DAO reserves the right to suspend or terminate accounts for violation of these Terms or fraudulent activity.",
    section8: "8. Contact",
    section8Content: "For inquiries or complaints, contact: info@hamropalo.org",
    acknowledgment: "Acknowledgment",
    acknowledgmentText:
      "By clicking 'Agree and Continue', you confirm that you have read and understood these Terms and consent to participate under the SEWA governance model.",
  },
  ne: {
    title: "सर्तहरु र शर्तहरु",
    effectiveDate: "प्रभावी मिति: अक्टोबर २०२५",
    section1: "१. उद्देश्य र दायरा",
    section1Content:
      "यी सर्तहरु र शर्तहरु AbaHamroPalo वेब प्ल्याटफर्मको पहुँच र प्रयोगलाई नियन्त्रण गर्छन्। प्ल्याटफर्म पहुँच वा प्रयोग गरेर, तपाई यी सर्तहरु, हाम्रो गोपनीयता नीति, र सबै सम्बन्धित शासन चार्टरहरु द्वारा बाध्य हुन सहमत हुनुहुन्छ।",
    section2: "२. योग्यता र पञ्जीकरण",
    section2Content:
      "यो प्ल्याटफर्म प्रयोग गर्न, तपाई नेपालको नागरिक वा निवासी, कम से कम १८ वर्षको उमेर, र SEWA मानहरु (सेवा, पारदर्शिता, र अहिंसा) को प्रतिबद्धता हुनुपर्छ।",
    section3: "३. प्रयोगकर्ता जिम्मेवारीहरु",
    section3Content:
      "प्रयोगकर्ताहरु आपनो खाता जानकारीको गोपनीयता बनाए राख्न र आपनो खातामा हुने सबै गतिविधिहरुको लागि जिम्मेवार छन्। तपाई प्ल्याटफर्म केवल कानूनी उद्देश्यहरुको लागि र अन्यको अधिकारहरु उल्लंघन नगरी प्रयोग गर्न सहमत हुनुहुन्छ।",
    section4: "४. बौद्धिक सम्पत्ति",
    section4Content:
      "प्ल्याटफर्म, सामग्री, र उपकरणहरु नेपाल पुनर्जन्म आन्दोलन DAO द्वारा स्वामित्वमा छन्। प्रयोगकर्ताहरु मूल जमाहरुमा अधिकार राख्छन् तर DAO लाई शासन उद्देश्यहरुको लागि सामग्री प्रयोग, प्रदर्शन, र वितरण गर्न गैर-एक्सक्लुसिभ लाइसेन्स दिन्छन्।",
    section5: "५. दायित्वको सीमा",
    section5Content:
      "प्ल्याटफर्म सर्वोत्तम प्रयास आधारमा संचालित हुन्छ र प्रयोगकर्ता भागीदारीको राजनीतिक, व्यक्तिगत, वा प्रतिष्ठा परिणामहरु, तृतीय-पक्ष एकीकरणहरु, वा अस्थायी व्यवधानहरुको लागि दायी छैन।",
    section6: "६. संशोधनहरु",
    section6Content:
      "यी सर्तहरु जीवन्त र लोकतान्त्रिक रूपमा विकसित हुन्छन्। परिवर्तनहरु कुनै पनि सदस्य द्वारा प्रस्ताव गर्न सकिन्छ र १-आवाज-१-मत प्रणाली द्वारा अनुमोदन गर्न सकिन्छ। प्रयोगकर्ताहरुलाई अपडेटहरु बारे सूचित गरिनेछ र भाग लिन जारी राख्न पुनः सहमति दिनुपर्नेछ।",
    section7: "७. समाप्ति",
    section7Content:
      "सदस्यहरु कुनै पनि समय स्वेच्छाले प्ल्याटफर्म छोड्न सक्छन्। DAO यी सर्तहरु वा धोखाधडी गतिविधिको उल्लंघनको लागि खातहरु निलम्बन वा समाप्त गर्ने अधिकार राख्छ।",
    section8: "८. सम्पर्क",
    section8Content: "प्रश्न वा शिकायतहरुको लागि, सम्पर्क गर्नुहोस्: info@hamropalo.org",
    acknowledgment: "स्वीकृति",
    acknowledgmentText:
      '"सहमत र जारी राख्नुहोस्" क्लिक गरेर, तपाई पुष्टि गर्नुहुन्छ कि तपाईले यी सर्तहरु पढ्नुभएको र बुझ्नुभएको छ र SEWA शासन मोडेल अन्तर्गत भाग लिन सहमत हुनुहुन्छ।',
  },
}

export default function TermsPageComponent({ locale }: TermsPageProps) {
  const t = content[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.effectiveDate}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.section1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section1Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section2}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section2Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section3}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section3Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section4}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section4Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section5}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section5Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section6}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section6Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section7}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section7Content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.section8}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.section8Content}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-primary">
            <CardHeader>
              <CardTitle>{t.acknowledgment}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{t.acknowledgmentText}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
