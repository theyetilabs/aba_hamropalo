"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Lock } from "lucide-react"

interface FooterProps {
  locale: "en" | "ne"
}

const footerLinks = {
  en: {
    manifesto: "Manifesto",
    terms: "Terms",
    contact: "Contact",
    privacy: "Privacy",
  },
  ne: {
    manifesto: "घोषणापत्र",
    terms: "शर्तहरु",
    contact: "सम्पर्क",
    privacy: "गोपनीयता",
  },
}

export default function Footer({ locale }: FooterProps) {
  const links = footerLinks[locale]
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Protected routes that require authentication
  const protectedRoutes = ['/circles', '/proposals', '/tokens', '/activity']

  const handleProtectedLink = (href: string, e: React.MouseEvent) => {
    if (protectedRoutes.includes(href) && !isAuthenticated) {
      e.preventDefault()
      // Redirect to login with return URL
      router.push(`/login?returnUrl=${encodeURIComponent(href)}`)
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">AbaHamroPalo</h3>
            <p className="text-primary-foreground/80 text-sm">
              {locale === "en"
                ? "Nepal Regeneration Movement - Democratic Governance Platform"
                : "नेपाल पुनर्जन्म आन्दोलन - लोकतान्त्रिक शासन मञ्च"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{locale === "en" ? "Platform" : "मञ्च"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/circles" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  onClick={(e) => handleProtectedLink('/circles', e)}
                >
                  {locale === "en" ? "Circles" : "सर्कलहरु"}
                  {!isAuthenticated && (
                    <Lock className="ml-1 h-3 w-3 opacity-60" />
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/proposals" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  onClick={(e) => handleProtectedLink('/proposals', e)}
                >
                  {locale === "en" ? "Proposals" : "प्रस्तावहरु"}
                  {!isAuthenticated && (
                    <Lock className="ml-1 h-3 w-3 opacity-60" />
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/tokens" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  onClick={(e) => handleProtectedLink('/tokens', e)}
                >
                  {locale === "en" ? "Tokens" : "टोकनहरु"}
                  {!isAuthenticated && (
                    <Lock className="ml-1 h-3 w-3 opacity-60" />
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="/activity" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  onClick={(e) => handleProtectedLink('/activity', e)}
                >
                  {locale === "en" ? "Activity" : "गतिविधि"}
                  {!isAuthenticated && (
                    <Lock className="ml-1 h-3 w-3 opacity-60" />
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{locale === "en" ? "Resources" : "स्रोतहरु"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/manifesto" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {links.manifesto}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {links.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {links.privacy}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{locale === "en" ? "Contact" : "सम्पर्क"}</h4>
            <p className="text-sm text-primary-foreground/80">
              {locale === "en" ? "Email: info@hamropalo.org" : "इमेल: info@hamropalo.org"}
            </p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 flex justify-between items-center text-sm text-primary-foreground/80">
          <p>
            {locale === "en" ? "© 2025 AbaHamroPalo. All rights reserved." : "© 2025 अबा हाम्रो पालो। सर्वाधिकार सुरक्षित।"}
          </p>
        </div>
      </div>
    </footer>
  )
}
