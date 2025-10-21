"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Lock } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavigationProps {
  locale: "en" | "ne"
  setLocale: (locale: "en" | "ne") => void
}

const content = {
  en: {
    home: "Home",
    circles: "Circles",
    proposals: "Proposals",
    tokens: "Tokens",
    activity: "Activity",
    manifesto: "Manifesto",
    terms: "Terms",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    profile: "Profile",
  },
  ne: {
    home: "गृह",
    circles: "सर्कलहरु",
    proposals: "प्रस्तावहरु",
    tokens: "टोकनहरु",
    activity: "गतिविधि",
    manifesto: "घोषणापत्र",
    terms: "शर्तहरु",
    login: "लगइन",
    signup: "साइन अप",
    logout: "लगआउट",
    profile: "प्रोफाइल",
  },
}

export default function Navigation({ locale, setLocale }: NavigationProps) {
  const t = content[locale]
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image 
                src="/hamropalo.png" 
                alt="HamroPalo Logo" 
                width={42} 
                height={42}
                className="rounded-lg"
              />
            </div>
            <span>AbaHamroPalo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`hover:opacity-80 transition text-sm font-medium relative ${
                isActive("/") 
                  ? "text-accent font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" 
                  : ""
              }`}
            >
              {t.home}
            </Link>
            
            {/* Circles */}
            {isAuthenticated ? (
              <Link 
                href="/circles" 
                className={`hover:opacity-80 transition text-sm font-medium relative ${
                  isActive("/circles") 
                    ? "text-accent font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" 
                    : ""
                }`}
              >
                {t.circles}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/circles" 
                className="hover:opacity-80 transition text-sm font-medium flex items-center gap-1 opacity-70"
              >
                <Lock size={14} />
                {t.circles}
              </Link>
            )}
            
            {/* Proposals */}
            {isAuthenticated ? (
              <Link 
                href="/proposals" 
                className={`hover:opacity-80 transition text-sm font-medium relative ${
                  isActive("/proposals") 
                    ? "text-accent font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" 
                    : ""
                }`}
              >
                {t.proposals}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/proposals" 
                className="hover:opacity-80 transition text-sm font-medium flex items-center gap-1 opacity-70"
              >
                <Lock size={14} />
                {t.proposals}
              </Link>
            )}
            
            {/* Tokens */}
            {isAuthenticated ? (
              <Link 
                href="/tokens" 
                className={`hover:opacity-80 transition text-sm font-medium relative ${
                  isActive("/tokens") 
                    ? "text-accent font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" 
                    : ""
                }`}
              >
                {t.tokens}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/tokens" 
                className="hover:opacity-80 transition text-sm font-medium flex items-center gap-1 opacity-70"
              >
                <Lock size={14} />
                {t.tokens}
              </Link>
            )}
            
            {/* Activity */}
            {isAuthenticated ? (
              <Link 
                href="/activity" 
                className={`hover:opacity-80 transition text-sm font-medium relative ${
                  isActive("/activity") 
                    ? "text-accent font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" 
                    : ""
                }`}
              >
                {t.activity}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/activity" 
                className="hover:opacity-80 transition text-sm font-medium flex items-center gap-1 opacity-70"
              >
                <Lock size={14} />
                {t.activity}
              </Link>
            )}
            
            <Link 
              href="/manifesto" 
              className={`hover:opacity-80 transition text-sm font-medium relative ${
                isActive("/manifesto") 
                  ? "text-accent font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" 
                  : ""
              }`}
            >
              {t.manifesto}
            </Link>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as "en" | "ne")}
              className="bg-primary/20 text-primary-foreground border border-primary-foreground/30 rounded px-3 py-1 text-sm hover:bg-primary/30 transition"
            >
              <option value="en">EN</option>
              <option value="ne">नेपाली</option>
            </select>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent flex items-center gap-2"
                  >
                    <User size={16} />
                    <span className="font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut size={16} className="mr-2" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  <Link href="/login">{t.login}</Link>
                </Button>
                <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/register-interest">{t.signup}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground hover:opacity-80 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              href="/" 
              className={`block px-4 py-2 hover:bg-primary/20 rounded transition ${
                isActive("/") ? "bg-accent/20 text-accent font-semibold border-l-4 border-accent" : ""
              }`}
            >
              {t.home}
            </Link>
            
            {/* Circles */}
            {isAuthenticated ? (
              <Link 
                href="/circles" 
                className={`block px-4 py-2 hover:bg-primary/20 rounded transition ${
                  isActive("/circles") ? "bg-accent/20 text-accent font-semibold border-l-4 border-accent" : ""
                }`}
              >
                {t.circles}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/circles" 
                className="block px-4 py-2 hover:bg-primary/20 rounded transition opacity-70 flex items-center gap-2"
              >
                <Lock size={16} />
                {t.circles}
              </Link>
            )}
            
            {/* Proposals */}
            {isAuthenticated ? (
              <Link 
                href="/proposals" 
                className={`block px-4 py-2 hover:bg-primary/20 rounded transition ${
                  isActive("/proposals") ? "bg-accent/20 text-accent font-semibold border-l-4 border-accent" : ""
                }`}
              >
                {t.proposals}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/proposals" 
                className="block px-4 py-2 hover:bg-primary/20 rounded transition opacity-70 flex items-center gap-2"
              >
                <Lock size={16} />
                {t.proposals}
              </Link>
            )}
            
            {/* Tokens */}
            {isAuthenticated ? (
              <Link 
                href="/tokens" 
                className={`block px-4 py-2 hover:bg-primary/20 rounded transition ${
                  isActive("/tokens") ? "bg-accent/20 text-accent font-semibold border-l-4 border-accent" : ""
                }`}
              >
                {t.tokens}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/tokens" 
                className="block px-4 py-2 hover:bg-primary/20 rounded transition opacity-70 flex items-center gap-2"
              >
                <Lock size={16} />
                {t.tokens}
              </Link>
            )}
            
            {/* Activity */}
            {isAuthenticated ? (
              <Link 
                href="/activity" 
                className={`block px-4 py-2 hover:bg-primary/20 rounded transition ${
                  isActive("/activity") ? "bg-accent/20 text-accent font-semibold border-l-4 border-accent" : ""
                }`}
              >
                {t.activity}
              </Link>
            ) : (
              <Link 
                href="/login?returnUrl=/activity" 
                className="block px-4 py-2 hover:bg-primary/20 rounded transition opacity-70 flex items-center gap-2"
              >
                <Lock size={16} />
                {t.activity}
              </Link>
            )}
            
            <Link 
              href="/manifesto" 
              className={`block px-4 py-2 hover:bg-primary/20 rounded transition ${
                isActive("/manifesto") ? "bg-accent/20 text-accent font-semibold border-l-4 border-accent" : ""
              }`}
            >
              {t.manifesto}
            </Link>
            
            {isAuthenticated ? (
              <div className="px-4 py-2 space-y-2">
                <div className="flex items-center gap-2 text-primary-foreground font-medium">
                  <User size={16} />
                  <span>{user?.name}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent flex items-center gap-2"
                >
                  <LogOut size={16} />
                  {t.logout}
                </Button>
              </div>
            ) : (
              <div className="px-4 py-2 flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  <Link href="/login">{t.login}</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/register-interest">{t.signup}</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
