"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface ManifestoPageProps {
  locale: "en" | "ne"
}

const content = {
  en: {
    title: "AbaHamroPalo Manifesto",
    subtitle: "Our Vision for Nepal's Democratic Regeneration",
    introduction: "Introduction",
    introText:
      "AbaHamroPalo (Our Turn) is a democratic governance platform rooted in the principles of SEWA—Service, Equity, Wisdom, and Accountability. We believe that Nepal's future depends on inclusive, transparent, and regenerative democratic participation where every voice matters.",
    vision: "Our Vision",
    visionText:
      "We envision a Nepal where citizens actively participate in governance, where decisions are made transparently through collective wisdom, and where service to the community is the highest calling. We are building a movement for regenerative politics that puts people and planet first.",
    mission: "Our Mission",
    missionText:
      "To create a decentralized democratic platform that empowers Nepali citizens to participate in governance, propose solutions to community challenges, and collectively decide on matters that affect their lives.",
    sewaValues: "SEWA Principles",
    service: "Service",
    serviceDesc: "We serve the community with integrity, putting collective wellbeing above personal gain.",
    equity: "Equity",
    equityDesc: "We ensure equal voice and opportunity for all, regardless of background, wealth, or status.",
    wisdom: "Wisdom",
    wisdomDesc: "We value diverse perspectives, evidence-based decision-making, and collective intelligence.",
    accountability: "Accountability",
    accountabilityDesc: "We take responsibility for our actions and remain transparent in all dealings.",
    coreValues: "Core Values",
    transparency: "Transparency",
    transparencyDesc: "All decisions, discussions, and data are open to public scrutiny.",
    inclusion: "Inclusion",
    inclusionDesc: "We welcome all voices and ensure marginalized communities are heard.",
    nonViolence: "Non-Violence",
    nonViolenceDesc: "We resolve conflicts peacefully and reject harmful rhetoric.",
    regeneration: "Regeneration",
    regenerationDesc: "We focus on healing communities and building sustainable solutions.",
    democracy: "Democratic Governance",
    democracyDesc: "We practice 1-Voice-1-Vote, where every member has equal voting power.",
    principles: "Guiding Principles",
    principle1: "Decentralized Decision-Making",
    principle1Desc: "Power is distributed among community members, not concentrated in leadership.",
    principle2: "Evidence-Based Deliberation",
    principle2Desc: "Decisions are informed by data, research, and expert input.",
    principle3: "Continuous Learning",
    principle3Desc: "We evolve our practices based on feedback and changing community needs.",
    principle4: "Regenerative Impact",
    principle4Desc: "Every initiative aims to heal and strengthen our communities.",
    principle5: "Digital Accessibility",
    principle5Desc: "Our platform is designed for all, including those with limited digital access.",
    principle6: "Cultural Respect",
    principle6Desc: "We honor Nepal's diverse cultures and traditions in our governance.",
    commitment: "Our Commitment",
    commitmentText:
      "We commit to building a platform that serves all Nepali citizens, regardless of their background. We will maintain the highest standards of integrity, transparency, and accountability. We will listen to our community, adapt to their needs, and work tirelessly toward a more just and regenerative Nepal.",
    callToAction: "Join the Movement",
    callToActionText:
      "AbaHamroPalo is not just a platform—it is a movement for democratic regeneration. We invite you to join us in building a better future for Nepal. Together, we can create meaningful change.",
  },
  ne: {
    title: "अबा हाम्रो पालो घोषणापत्र",
    subtitle: "नेपालको लोकतान्त्रिक पुनर्जन्मको लागि हाम्रो दृष्टिकोण",
    introduction: "परिचय",
    introText:
      "अबा हाम्रो पालो SEWA को सिद्धान्तहरुमा निहित एक लोकतान्त्रिक शासन प्ल्याटफर्म हो—सेवा, समानता, ज्ञान, र जवाबदेहिता। हम विश्वास गर्छौं कि नेपालको भविष्य समावेशी, पारदर्शी, र पुनर्जन्मकारी लोकतान्त्रिक भागीदारीमा निर्भर छ जहाँ प्रत्येक आवाज महत्त्वपूर्ण छ।",
    vision: "हाम्रो दृष्टिकोण",
    visionText:
      "हम एक नेपाल कल्पना गर्छौं जहाँ नागरिकहरु सक्रियतापूर्वक शासनमा भाग लिन्छन्, जहाँ निर्णयहरु सामूहिक ज्ञान मार्फत पारदर्शीतापूर्वक गरिन्छन्, र जहाँ सामुदायिकको सेवा सर्वोच्च आह्वान हो। हम पुनर्जन्मकारी राजनीतिको लागि एक आन्दोलन निर्माण गरिरहेका छौं जो मानिस र ग्रहलाई प्राथमिकता दिन्छ।",
    mission: "हाम्रो मिशन",
    missionText:
      "एक विकेन्द्रीकृत लोकतान्त्रिक प्ल्याटफर्म सिर्जना गर्नु जो नेपाली नागरिकहरुलाई शासनमा भाग लिन, सामुदायिक चुनौतीहरुको समाधान प्रस्ताव गर्न, र सामूहिकतापूर्वक आपनो जीवनलाई असर गर्ने विषयहरुमा निर्णय गर्न सशक्त बनाउँछ।",
    sewaValues: "SEWA सिद्धान्तहरु",
    service: "सेवा",
    serviceDesc: "हम सत्यनिष्ठा सहित सामुदायिकको सेवा गर्छौं, व्यक्तिगत लाभ भन्दा सामूहिक कल्याण राख्छौं।",
    equity: "समानता",
    equityDesc: "हम सबैको लागि समान आवाज र अवसर सुनिश्चित गर्छौं, पृष्ठभूमि, सम्पत्ति, वा स्थिति निर्विशेष।",
    wisdom: "ज्ञान",
    wisdomDesc: "हम विविध दृष्टिकोणहरु, प्रमाण-आधारित निर्णय-निर्माण, र सामूहिक बुद्धिमत्तालाई मूल्य दिन्छौं।",
    accountability: "जवाबदेहिता",
    accountabilityDesc: "हम आपनो कार्यहरुको लागि जिम्मेवारी लिन्छौं र सबै लेनदेनमा पारदर्शी रहन्छौं।",
    coreValues: "मूल मानहरु",
    transparency: "पारदर्शिता",
    transparencyDesc: "सबै निर्णयहरु, छलफलहरु, र डेटा सार्वजनिक जाँचको लागि खुला छन्।",
    inclusion: "समावेशिता",
    inclusionDesc: "हम सबै आवाजहरुलाई स्वागत गर्छौं र सीमान्तकृत समुदायहरु सुनिश्चित गर्छौं।",
    nonViolence: "अहिंसा",
    nonViolenceDesc: "हम द्वन्द्वहरु शान्तिपूर्वक समाधान गर्छौं र हानिकारक वक्तव्य अस्वीकार गर्छौं।",
    regeneration: "पुनर्जन्म",
    regenerationDesc: "हम समुदायहरु निको पार्न र टिकाऊ समाधान निर्माण गर्न केन्द्रित छौं।",
    democracy: "लोकतान्त्रिक शासन",
    democracyDesc: "हम १-आवाज-१-मत अभ्यास गर्छौं, जहाँ प्रत्येक सदस्यको समान मतदान शक्ति छ।",
    principles: "मार्गदर्शक सिद्धान्तहरु",
    principle1: "विकेन्द्रीकृत निर्णय-निर्माण",
    principle1Desc: "शक्ति सामुदायिक सदस्यहरु बीच वितरित छ, नेतृत्वमा केन्द्रित छैन।",
    principle2: "प्रमाण-आधारित विचार-विमर्श",
    principle2Desc: "निर्णयहरु डेटा, अनुसन्धान, र विशेषज्ञ इनपुट द्वारा सूचित छन्।",
    principle3: "निरन्तर सिकाइ",
    principle3Desc: "हम प्रतिक्रिया र परिवर्तनशील सामुदायिक आवश्यकताहरु आधारमा हाम्रो अभ्यास विकसित गर्छौं।",
    principle4: "पुनर्जन्मकारी प्रभाव",
    principle4Desc: "प्रत्येक पहल हाम्रो समुदायहरु निको पार्न र शक्तिशाली गर्न लक्ष्य राख्छ।",
    principle5: "डिजिटल पहुँच",
    principle5Desc: "हाम्रो प्ल्याटफर्म सीमित डिजिटल पहुँच भएकाहरु सहित सबैको लागि डिजाइन गरिएको छ।",
    principle6: "सांस्कृतिक सम्मान",
    principle6Desc: "हम हाम्रो शासनमा नेपालको विविध संस्कृति र परम्पराहरुलाई सम्मान गर्छौं।",
    commitment: "हाम्रो प्रतिबद्धता",
    commitmentText:
      "हम एक प्ल्याटफर्म निर्माण गर्न प्रतिबद्ध छौं जो सबै नेपाली नागरिकहरुको सेवा गर्छ, तिनको पृष्ठभूमि निर्विशेष। हम सत्यनिष्ठा, पारदर्शिता, र जवाबदेहिताको सर्वोच्च मान बनाए राख्नेछौं। हम हाम्रो सामुदायिकको कुरा सुन्नेछौं, तिनको आवश्यकताहरु अनुकूल गर्नेछौं, र अधिक न्यायपूर्ण र पुनर्जन्मकारी नेपालको दिशामा अथक परिश्रम गर्नेछौं।",
    callToAction: "आन्दोलनमा सामेल हुनुहोस्",
    callToActionText:
      "अबा हाम्रो पालो केवल एक प्ल्याटफर्म होइन—यो लोकतान्त्रिक पुनर्जन्मको लागि एक आन्दोलन हो। हम तपाईलाई नेपालको लागि एक राम्रो भविष्य निर्माण गर्न आमन्त्रण गर्छौं। सँगै, हम अर्थपूर्ण परिवर्तन सिर्जना गर्न सक्छौं।",
  },
}

export default function ManifestoPageComponent({ locale }: ManifestoPageProps) {
  const t = content[locale]

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-primary">
          <CardHeader>
            <CardTitle>{t.introduction}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{t.introText}</p>
          </CardContent>
        </Card>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t.vision}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{t.visionText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.mission}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{t.missionText}</p>
            </CardContent>
          </Card>
        </div>

        {/* SEWA Values */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">{t.sewaValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: t.service, desc: t.serviceDesc },
              { title: t.equity, desc: t.equityDesc },
              { title: t.wisdom, desc: t.wisdomDesc },
              { title: t.accountability, desc: t.accountabilityDesc },
            ].map((value, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">{value.title}</p>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">{t.coreValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: t.transparency, desc: t.transparencyDesc },
              { title: t.inclusion, desc: t.inclusionDesc },
              { title: t.nonViolence, desc: t.nonViolenceDesc },
              { title: t.regeneration, desc: t.regenerationDesc },
              { title: t.democracy, desc: t.democracyDesc },
            ].map((value, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">{value.title}</p>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guiding Principles */}
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
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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

        {/* Commitment */}
        <Card className="mb-8 border-l-4 border-accent">
          <CardHeader>
            <CardTitle>{t.commitment}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{t.commitmentText}</p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-white">{t.callToAction}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white leading-relaxed">{t.callToActionText}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
