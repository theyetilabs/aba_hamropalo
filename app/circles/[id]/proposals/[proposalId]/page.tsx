"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  FileText, 
  Vote, 
  Clock, 
  MapPin, 
  Banknote, 
  Users, 
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Download,
  Share2
} from "lucide-react"
import Link from "next/link"

interface ProposalDetail {
  id: string
  title: string
  status: "active" | "voting" | "passed" | "rejected"
  votes: {
    for: number
    against: number
    abstain: number
    total: number
  }
  description: string
  fullDescription: string
  author: {
    name: string
    role: string
    avatar: string
  }
  createdAt: string
  votingDeadline: string
  category: string
  priority: "high" | "medium" | "low"
  budget: {
    requested: string
    approved?: string
    currency: "NPR" | "USD"
  }
  timeline: {
    phase: string
    description: string
    startDate: string
    endDate: string
    status: "completed" | "current" | "pending"
  }[]
  objectives: string[]
  beneficiaries: {
    direct: string
    indirect: string
    demographics: string[]
  }
  implementation: {
    location: string[]
    duration: string
    methodology: string
    resources: string[]
  }
  risks: {
    risk: string
    mitigation: string
    probability: "low" | "medium" | "high"
  }[]
  documents: {
    name: string
    type: string
    size: string
    url: string
  }[]
  comments: {
    id: string
    author: string
    content: string
    timestamp: string
    votes: number
  }[]
  supporters: {
    name: string
    organization: string
    statement: string
  }[]
}

const mockProposalDetails: Record<string, ProposalDetail> = {
  "p1": {
    id: "p1",
    title: "सार्वजनिक खरिद निगरानी प्रणाली स्थापना (Public Procurement Monitoring System)",
    status: "voting",
    votes: {
      for: 234,
      against: 45,
      abstain: 23,
      total: 302
    },
    description: "सरकारी खरिद प्रक्रियामा पारदर्शिता ल्याउन र भ्रष्टाचार रोक्न डिजिटल निगरानी प्रणाली स्थापना गर्ने।",
    fullDescription: "यो प्रस्तावले नेपालको सार्वजनिक खरिद प्रक्रियालाई पूर्ण रूपमा पारदर्शी बनाउने लक्ष्य राखेको छ। यसले सबै सरकारी ठेक्का र खरिदको विवरण real-time मा सार्वजनिक गर्नेछ। प्रणालीमा tender tracking, vendor evaluation, contract monitoring, र citizen feedback mechanism समावेश हुनेछ। यसले भ्रष्टाचार न्यूनीकरण, fair competition प्रवर्द्धन, र सार्वजनिक पैसाको दुरुपयोग रोक्नेछ।",
    author: {
      name: "Bishnu Maya Pariyar",
      role: "Anti-Corruption Specialist, Commission for Investigation of Abuse of Authority (CIAA)",
      avatar: "BMP"
    },
    createdAt: "2025-01-10T09:00:00Z",
    votingDeadline: "2025-01-30T23:59:59Z",
    category: "Anti-Corruption & Transparency",
    priority: "high",
    budget: {
      requested: "NPR 25,000,000",
      approved: "NPR 20,000,000",
      currency: "NPR"
    },
    timeline: [
      {
        phase: "Research & Planning",
        description: "Conduct needs assessment and technical planning",
        startDate: "2025-02-01",
        endDate: "2025-03-15",
        status: "pending"
      },
      {
        phase: "Development",
        description: "Build core platform features and mobile applications",
        startDate: "2025-03-16",
        endDate: "2025-07-31",
        status: "pending"
      },
      {
        phase: "Pilot Testing",
        description: "Deploy in 5 selected rural municipalities",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        status: "pending"
      },
      {
        phase: "Full Deployment",
        description: "Roll out to all participating municipalities",
        startDate: "2025-11-01",
        endDate: "2026-02-28",
        status: "pending"
      }
    ],
    objectives: [
      "सबै सरकारी खरिद प्रक्रियाको 100% real-time transparency प्राप्त गर्ने",
      "Tender evaluation मा bias र favoritism 80% सम्म कम गर्ने",
      "सार्वजनिक खरिदमा citizen participation 60% बढाउने",
      "Contract monitoring र performance tracking को लागि automated system स्थापना गर्ने",
      "Procurement irregularities को detection time 75% कम गर्ने",
      "Vendor registration र evaluation process मा 90% digitization हासिल गर्ने",
      "सार्वजनिक खरिदको cost efficiency 25% सुधार गर्ने"
    ],
    beneficiaries: {
      direct: "250,000 rural citizens",
      indirect: "1,000,000 family members and community members",
      demographics: [
        "Rural municipality residents",
        "Local government officials",
        "Small business owners",
        "Youth and students",
        "Women's groups and cooperatives"
      ]
    },
    implementation: {
      location: [
        "Phase 1: Federal Ministries र Departments (6 months)",
        "Phase 2: Provincial Governments (8 months)",
        "Phase 3: Local Governments (10 months)"
      ],
      duration: "24 months",
      methodology: "Blockchain-based transparency framework integrated with existing PPMO (Public Procurement Monitoring Office) systems, following international best practices from Estonia's e-Procurement और Singapore's GeBIZ",
      resources: [
        "Blockchain Platform Development: NPR 8,000,000",
        "Integration with existing systems: NPR 4,000,000",
        "Training & Capacity Building: NPR 3,500,000",
        "Security & Audit Systems: NPR 2,500,000",
        "Public Awareness Campaign: NPR 1,500,000",
        "Monitoring & Evaluation: NPR 500,000"
      ]
    },
    risks: [
      {
        risk: "Limited internet connectivity in remote areas",
        mitigation: "Develop offline-capable features and mobile data optimization",
        probability: "high"
      },
      {
        risk: "Low digital literacy among target users",
        mitigation: "Comprehensive training programs and simplified interfaces",
        probability: "medium"
      },
      {
        risk: "Resistance from traditional governance structures",
        mitigation: "Stakeholder engagement and gradual implementation approach",
        probability: "medium"
      }
    ],
    documents: [
      {
        name: "Public Procurement Legal Framework Analysis",
        type: "PDF",
        size: "3.2 MB",
        url: "/documents/legal-framework-p1.pdf"
      },
      {
        name: "Blockchain Technology Implementation Plan",
        type: "PDF", 
        size: "5.1 MB",
        url: "/documents/blockchain-implementation-p1.pdf"
      },
      {
        name: "Current Procurement System Gap Analysis",
        type: "PDF",
        size: "4.8 MB", 
        url: "/documents/gap-analysis-p1.pdf"
      },
      {
        name: "CIAA Corruption Case Study Report",
        type: "PDF",
        size: "2.9 MB",
        url: "/documents/corruption-cases-p1.pdf"
      },
      {
        name: "International Best Practices Comparison",
        type: "PDF",
        size: "3.5 MB",
        url: "/documents/international-practices-p1.pdf"
      },
      {
        name: "Cost-Benefit Analysis and ROI Projection",
        type: "Excel",
        size: "1.2 MB",
        url: "/documents/cost-benefit-p1.xlsx"
      }
    ],
    comments: [
      {
        id: "c1",
        author: "Dr. Govinda Raj Pokharel, Former Secretary, Ministry of Federal Affairs",
        content: "यो प्रस्ताव नेपालको सार्वजनिक खरिदमा क्रान्तिकारी परिवर्तन ल्याउनेछ। Blockchain technology को use गर्दा transparency र accountability दुवै बढ्छ। तर के सबै government agencies ले यो system adopt गर्न ready छन्?",
        timestamp: "2025-01-15T14:30:00Z",
        votes: 67
      },
      {
        id: "c2", 
        author: "Kamala Devi Shrestha, Procurement Specialist, World Bank",
        content: "Real-time monitoring system ले procurement irregularities detect गर्न सजिलो बनाउनेछ। NPR 25M budget reasonable छ considering the scope. तर technical training को लागि adequate resources allocate गरिएको छ?",
        timestamp: "2025-01-16T10:15:00Z",
        votes: 45
      },
      {
        id: "c3",
        author: "Arjun Bahadur Thapa, Former CIAA Commissioner",
        content: "CIAA को experience अनुसार, procurement मा 60% corruption cases हुन्छन्। यो system ले vendor evaluation मा bias कम गर्नेछ र fair competition promote गर्नेछ। Implementation timeline realistic छ।",
        timestamp: "2025-01-17T16:45:00Z",
        votes: 89
      },
      {
        id: "c4",
        author: "Sita Kumari Rai, President, Federation of Contractors' Associations",
        content: "Automated tender evaluation ले small contractors लाई पनि fair opportunity दिनेछ। तर digital platform use गर्न training र support चाहिन्छ। Overall, यो positive step हो transparency को लागि।",
        timestamp: "2025-01-18T11:20:00Z",
        votes: 52
      },
      {
        id: "c5",
        author: "Rajan Bhattarai, IT Expert, Transparency International Nepal",
        content: "Contract monitoring र performance tracking को automated system ले post-award transparency पनि ensure गर्नेछ। यो long-overdue reform हो। International best practices follow गरिएको देखिन्छ।",
        timestamp: "2025-01-19T09:15:00Z",
        votes: 73
      }
    ],
    supporters: [
      {
        name: "Digital Nepal Initiative",
        organization: "Technology NGO",
        statement: "We fully support this proposal as it aligns with our mission of digital inclusion for all Nepali citizens."
      },
      {
        name: "Federation of Rural Municipalities",
        organization: "Government Association",
        statement: "This platform addresses our core challenges in service delivery and citizen engagement."
      }
    ]
  },
  "p2": {
    id: "p2",
    title: "राजनीतिक दलको आर्थिक पारदर्शिता पोर्टल (Political Party Financial Transparency Portal)",
    status: "active",
    votes: {
      for: 189,
      against: 12,
      abstain: 8,
      total: 209
    },
    description: "राजनीतिक दलहरूको आम्दानी र खर्चको पूर्ण विवरण सार्वजनिक गर्न डिजिटल प्लेटफर्म निर्माण।",
    fullDescription: "यो प्रस्तावले नेपालका सबै राजनीतिक दलहरूको आर्थिक गतिविधिलाई पूर्ण रूपमा पारदर्शी बनाउने लक्ष्य राखेको छ। यसमा चन्दा, अनुदान र खर्चको हरेक रुपैयाँको हिसाब real-time मा सार्वजनिक हुनेछ। प्लेटफर्मले donation tracking, expenditure monitoring, asset declaration, र public audit mechanism समावेश गर्नेछ। यसले राजनीतिक भ्रष्टाचार न्यूनीकरण, electoral transparency प्रवर्द्धन, र democratic accountability सुनिश्चित गर्नेछ।",
    author: {
      name: "Arjun Bahadur Thapa",
      role: "Electoral Reform Advocate, Transparency International Nepal",
      avatar: "ABT"
    },
    createdAt: "2025-01-10T11:30:00Z",
    votingDeadline: "2025-01-28T23:59:59Z",
    category: "Electoral Transparency & Democracy",
    priority: "high",
    budget: {
      requested: "NPR 18,000,000",
      approved: "NPR 15,000,000",
      currency: "NPR"
    },
    timeline: [
      {
        phase: "Legal Framework & Standards",
        description: "Develop legal requirements and financial reporting standards for political parties",
        startDate: "2025-02-15",
        endDate: "2025-04-30",
        status: "pending"
      },
      {
        phase: "Platform Development",
        description: "Build digital portal with donation tracking and expenditure monitoring features",
        startDate: "2025-05-01",
        endDate: "2025-08-31",
        status: "pending"
      },
      {
        phase: "Pilot Testing with Major Parties",
        description: "Test platform with 5 major political parties and refine features",
        startDate: "2025-09-01",
        endDate: "2025-11-30",
        status: "pending"
      },
      {
        phase: "Full Implementation",
        description: "Mandatory adoption by all registered political parties",
        startDate: "2025-12-01",
        endDate: "2026-03-31",
        status: "pending"
      }
    ],
    objectives: [
      "सबै registered political parties को 100% financial disclosure प्राप्त गर्ने",
      "Political donation tracking मा 95% accuracy र real-time reporting हासिल गर्ने",
      "Electoral expenditure monitoring मा transparency 80% बढाउने",
      "Illegal funding sources को detection र prevention system स्थापना गर्ने",
      "Public access to party finances मा citizen engagement 70% बढाउने",
      "Asset declaration र conflict of interest disclosure को automated system बनाउने",
      "Political corruption cases मा evidence collection 60% सुधार गर्ने"
    ],
    beneficiaries: {
      direct: "30,000,000 eligible voters and citizens",
      indirect: "All Nepali citizens interested in democratic transparency",
      demographics: [
        "Voters seeking transparency in political funding",
        "Civil society organizations monitoring democracy",
        "Media and journalists covering electoral politics",
        "Academic researchers studying political finance",
        "Anti-corruption activists and watchdog groups"
      ]
    },
    implementation: {
      location: [
        "Phase 1: National-level political parties (6 months)",
        "Phase 2: Provincial-level parties (4 months)",
        "Phase 3: Local-level political organizations (6 months)"
      ],
      duration: "16 months",
      methodology: "Blockchain-based financial tracking integrated with Election Commission database, following international standards from UK's Electoral Commission र Canada's Elections Act",
      resources: [
        "Digital Platform Development: NPR 6,000,000",
        "Blockchain Integration & Security: NPR 3,500,000",
        "Legal Framework Development: NPR 2,000,000",
        "Training & Capacity Building: NPR 2,500,000",
        "Public Awareness Campaign: NPR 2,000,000",
        "Monitoring & Compliance System: NPR 2,000,000"
      ]
    },
    risks: [
      {
        risk: "Political parties resistance to financial disclosure",
        mitigation: "Gradual implementation with legal mandates and public pressure",
        probability: "high"
      },
      {
        risk: "Attempts to circumvent reporting through shell organizations",
        mitigation: "Advanced tracking algorithms and cross-verification systems",
        probability: "medium"
      },
      {
        risk: "Data security and privacy concerns",
        mitigation: "Robust cybersecurity measures and selective disclosure protocols",
        probability: "medium"
      }
    ],
    documents: [
      {
        name: "Political Party Finance Legal Framework Analysis",
        type: "PDF",
        size: "3.8 MB",
        url: "/documents/political-finance-legal-p2.pdf"
      },
      {
        name: "International Best Practices in Party Finance Transparency",
        type: "PDF",
        size: "4.5 MB",
        url: "/documents/international-practices-p2.pdf"
      },
      {
        name: "Blockchain Technology for Financial Tracking",
        type: "PDF",
        size: "2.9 MB",
        url: "/documents/blockchain-finance-p2.pdf"
      },
      {
        name: "Election Commission Integration Plan",
        type: "PDF",
        size: "3.2 MB",
        url: "/documents/election-commission-integration-p2.pdf"
      },
      {
        name: "Privacy and Data Protection Framework",
        type: "PDF",
        size: "2.1 MB",
        url: "/documents/privacy-framework-p2.pdf"
      },
      {
        name: "Implementation Timeline and Budget Breakdown",
        type: "Excel",
        size: "1.4 MB",
        url: "/documents/implementation-budget-p2.xlsx"
      }
    ],
    comments: [
      {
        id: "c6",
        author: "Dr. Bhimarjun Acharya, Former Chief Election Commissioner",
        content: "यो प्रस्ताव नेपालको electoral democracy को लागि ऐतिहासिक कदम हो। Political party finance मा transparency ल्याउनु अत्यावश्यक छ। तर के सबै parties ले voluntary compliance गर्लान्?",
        timestamp: "2025-01-12T09:20:00Z",
        votes: 78
      },
      {
        id: "c7",
        author: "Sushila Karki, Former Chief Justice",
        content: "Legal framework strong बनाउनु पर्छ। Constitutional provisions र existing laws संग alignment हुनुपर्छ। Blockchain technology ले data integrity ensure गर्नेछ।",
        timestamp: "2025-01-14T15:40:00Z",
        votes: 65
      },
      {
        id: "c8",
        author: "Rabi Lamichhane, Media Entrepreneur",
        content: "Media को लागि यो invaluable resource हुनेछ। Political funding sources track गर्न सकिन्छ। तर privacy concerns address गर्नुपर्छ sensitive information को लागि।",
        timestamp: "2025-01-15T11:30:00Z",
        votes: 52
      },
      {
        id: "c9",
        author: "Gagan Thapa, Member of Parliament",
        content: "Young politicians हामी transparency support गर्छौं। यसले clean politics promote गर्नेछ। Implementation मा political will चाहिन्छ सबै parties बाट।",
        timestamp: "2025-01-16T14:15:00Z",
        votes: 89
      },
      {
        id: "c10",
        author: "Padma Aryal, Transparency International Nepal",
        content: "International best practices follow गरिएको छ। Real-time monitoring ले electoral corruption detect गर्न सजिलो हुनेछ। Budget allocation reasonable छ।",
        timestamp: "2025-01-17T10:45:00Z",
        votes: 43
      }
    ],
    supporters: [
      {
        name: "Transparency International Nepal",
        organization: "Anti-Corruption NGO",
        statement: "This proposal aligns perfectly with our mission of promoting transparency and accountability in governance and politics."
      },
      {
        name: "Election Commission of Nepal",
        organization: "Constitutional Body",
        statement: "We support this initiative as it will enhance our capacity to monitor political party finances and ensure electoral integrity."
      },
      {
        name: "Federation of Nepali Journalists",
        organization: "Media Association",
        statement: "This platform will provide journalists with crucial data for investigative reporting on political finance and electoral transparency."
      }
    ]
  },
  "p3": {
    id: "p3",
    title: "स्थानीय तहमा सामाजिक लेखापरीक्षा अनिवार्यता (Mandatory Social Audit at Local Level)",
    status: "passed",
    votes: {
      for: 312,
      against: 28,
      abstain: 15,
      total: 355
    },
    description: "सबै स्थानीय तहमा वार्षिक सामाजिक लेखापरीक्षा अनिवार्य गर्ने नीति।",
    fullDescription: "यो प्रस्तावले नेपालका सबै स्थानीय तहमा सामाजिक लेखापरीक्षालाई अनिवार्य बनाउने लक्ष्य राखेको छ। नागरिकहरूले प्रत्यक्ष रूपमा स्थानीय सरकारको काम र खर्चको समीक्षा गर्न सक्नेछन्। यसले participatory governance प्रवर्द्धन, local accountability सुनिश्चित, र grassroots democracy सुदृढीकरण गर्नेछ। प्रणालीमा citizen participation, transparent reporting, र regular monitoring mechanism समावेश हुनेछ।",
    author: {
      name: "Kamala Devi Shrestha",
      role: "Local Governance Expert, National Association of Rural Municipalities",
      avatar: "KDS"
    },
    createdAt: "2025-01-05T09:00:00Z",
    votingDeadline: "2025-01-25T23:59:59Z",
    category: "Local Governance & Accountability",
    priority: "high",
    budget: {
      requested: "NPR 12,000,000",
      approved: "NPR 10,000,000",
      currency: "NPR"
    },
    timeline: [
      {
        phase: "Policy Framework Development",
        description: "Develop legal framework and guidelines for mandatory social audit",
        startDate: "2025-02-01",
        endDate: "2025-04-15",
        status: "pending"
      },
      {
        phase: "Capacity Building",
        description: "Train local government officials and citizen auditors",
        startDate: "2025-04-16",
        endDate: "2025-07-31",
        status: "pending"
      },
      {
        phase: "Pilot Implementation",
        description: "Implement in 25 selected local governments across all provinces",
        startDate: "2025-08-01",
        endDate: "2025-11-30",
        status: "pending"
      },
      {
        phase: "Full Rollout",
        description: "Mandatory implementation in all 753 local governments",
        startDate: "2025-12-01",
        endDate: "2026-06-30",
        status: "pending"
      }
    ],
    objectives: [
      "सबै 753 स्थानीय तहमा 100% सामाजिक लेखापरीक्षा implementation प्राप्त गर्ने",
      "Citizen participation मा 75% वृद्धि हासिल गर्ने local governance मा",
      "Local government transparency score 80% सुधार गर्ने",
      "Budget utilization efficiency 60% बढाउने through citizen oversight",
      "Corruption cases मा 50% कमी ल्याउने local level मा",
      "Public service delivery satisfaction 70% सुधार गर्ने",
      "Women र marginalized groups को participation 65% बढाउने"
    ],
    beneficiaries: {
      direct: "25,000,000 citizens under local governments",
      indirect: "All Nepali citizens benefiting from improved local governance",
      demographics: [
        "Rural and urban municipality residents",
        "Local government officials and staff",
        "Civil society organizations and NGOs",
        "Women's groups and marginalized communities",
        "Youth and student organizations"
      ]
    },
    implementation: {
      location: [
        "Phase 1: All 7 provinces simultaneously (6 months)",
        "Phase 2: 77 districts with priority focus (8 months)",
        "Phase 3: All 753 local governments (12 months)"
      ],
      duration: "18 months",
      methodology: "Participatory governance approach integrated with existing Local Government Operation Act, following international best practices from India's MGNREGA social audit र Brazil's participatory budgeting",
      resources: [
        "Policy Development & Legal Framework: NPR 1,500,000",
        "Training & Capacity Building: NPR 3,500,000",
        "Digital Platform for Reporting: NPR 2,000,000",
        "Community Mobilization: NPR 2,000,000",
        "Monitoring & Evaluation: NPR 1,000,000"
      ]
    },
    risks: [
      {
        risk: "Limited citizen awareness and participation",
        mitigation: "Comprehensive awareness campaigns and incentive programs",
        probability: "medium"
      },
      {
        risk: "Resistance from local government officials",
        mitigation: "Gradual implementation with training and support systems",
        probability: "medium"
      },
      {
        risk: "Lack of technical capacity at local level",
        mitigation: "Extensive training programs and technical support mechanisms",
        probability: "high"
      }
    ],
    documents: [
      {
        name: "Local Government Operation Act Amendment Draft",
        type: "PDF",
        size: "2.8 MB",
        url: "/documents/lgoa-amendment-p3.pdf"
      },
      {
        name: "Social Audit Guidelines and Procedures",
        type: "PDF",
        size: "3.5 MB",
        url: "/documents/social-audit-guidelines-p3.pdf"
      },
      {
        name: "International Best Practices Study",
        type: "PDF",
        size: "4.2 MB",
        url: "/documents/international-practices-p3.pdf"
      },
      {
        name: "Citizen Participation Framework",
        type: "PDF",
        size: "2.1 MB",
        url: "/documents/citizen-participation-p3.pdf"
      },
      {
        name: "Training Manual for Social Auditors",
        type: "PDF",
        size: "3.8 MB",
        url: "/documents/training-manual-p3.pdf"
      },
      {
        name: "Implementation Budget and Timeline",
        type: "Excel",
        size: "1.1 MB",
        url: "/documents/implementation-budget-p3.xlsx"
      }
    ],
    comments: [
      {
        id: "c11",
        author: "Bimalendra Nidhi, Former Deputy Prime Minister",
        content: "स्थानीय तहमा सामाजिक लेखापरीक्षा federalism को सफलताको लागि अत्यावश्यक छ। यसले grassroots democracy सुदृढ बनाउनेछ। तर implementation मा practical challenges हुन सक्छन्।",
        timestamp: "2025-01-08T14:30:00Z",
        votes: 95
      },
      {
        id: "c12",
        author: "Dil Kumari Rawal, Mayor, Dhangadhi Sub-Metropolitan",
        content: "Local government को तर्फबाट हामी यो initiative support गर्छौं। Citizen engagement बढ्दा service delivery पनि सुधार हुन्छ। Training र technical support चाहिन्छ।",
        timestamp: "2025-01-09T10:15:00Z",
        votes: 78
      },
      {
        id: "c13",
        author: "Chitra Lekha Yadav, Former Minister for Women, Children and Senior Citizens",
        content: "Women र marginalized groups को participation ensure गर्नुपर्छ। Social audit मा inclusive approach अपनाउनुपर्छ। यो positive step हो local accountability को लागि।",
        timestamp: "2025-01-10T16:45:00Z",
        votes: 67
      },
      {
        id: "c14",
        author: "Rajesh Hamal, Social Activist",
        content: "नागरिक चेतनाको लागि यो महत्वपूर्ण कदम हो। Local budget र projects को transparency बढ्नेछ। Community ownership develop हुनेछ।",
        timestamp: "2025-01-11T11:20:00Z",
        votes: 54
      },
      {
        id: "c15",
        author: "Dr. Shanta Chaudhary, Governance Expert",
        content: "International experience अनुसार social audit ले corruption significantly कम गर्छ। Nepal मा यो implement गर्न challenging तर necessary छ। Systematic approach चाहिन्छ।",
        timestamp: "2025-01-12T09:15:00Z",
        votes: 82
      }
    ],
    supporters: [
      {
        name: "National Association of Rural Municipalities in Nepal (NARMIN)",
        organization: "Local Government Association",
        statement: "We fully support this initiative as it will strengthen local democracy and improve service delivery to our communities."
      },
      {
        name: "Federation of Nepali Chambers of Commerce and Industry",
        organization: "Business Association",
        statement: "Transparent local governance will create a better business environment and reduce corruption at the grassroots level."
      },
      {
        name: "Nepal Federation of Indigenous Nationalities",
        organization: "Indigenous Rights Organization",
        statement: "Social audit will ensure that marginalized communities have a voice in local governance and resource allocation."
      }
    ]
  },
  "p4": {
    id: "p4",
    title: "भ्रष्टाचार उजुरी मोबाइल एप विकास (Anti-Corruption Mobile App Development)",
    status: "voting",
    votes: {
      for: 156,
      against: 23,
      abstain: 8,
      total: 187
    },
    description: "नागरिकहरूले भ्रष्टाचारका घटनाहरू तुरुन्त रिपोर्ट गर्न सक्ने मोबाइल एप।",
    fullDescription: "यो प्रस्तावले नागरिकहरूलाई भ्रष्टाचारका घटनाहरू सजिलै र सुरक्षित रूपमा रिपोर्ट गर्न सक्ने comprehensive mobile application विकास गर्ने लक्ष्य राखेको छ। एपमा GPS tracking, photo/video upload, anonymous reporting, real-time status tracking, र multi-language support को सुविधा हुनेछ। यसले citizen engagement बढाउने, corruption reporting को barrier कम गर्ने, र transparency प्रवर्द्धन गर्नेछ।",
    author: {
      name: "Sita Kumari Rai",
      role: "Digital Rights Activist, Technology for Transparency Nepal",
      avatar: "SKR"
    },
    createdAt: "2025-01-12T11:30:00Z",
    votingDeadline: "2025-02-12T23:59:59Z",
    category: "Digital Innovation & Anti-Corruption",
    priority: "high",
    budget: {
      requested: "NPR 8,500,000",
      currency: "NPR"
    },
    timeline: [
      {
        phase: "Research & Design",
        description: "User research, UI/UX design, and technical architecture planning",
        startDate: "2025-03-01",
        endDate: "2025-04-30",
        status: "pending"
      },
      {
        phase: "App Development",
        description: "Mobile app development for Android and iOS platforms",
        startDate: "2025-05-01",
        endDate: "2025-08-31",
        status: "pending"
      },
      {
        phase: "Testing & Security Audit",
        description: "Comprehensive testing, security audit, and bug fixes",
        startDate: "2025-09-01",
        endDate: "2025-10-15",
        status: "pending"
      },
      {
        phase: "Launch & Training",
        description: "Public launch with awareness campaigns and user training",
        startDate: "2025-10-16",
        endDate: "2025-12-31",
        status: "pending"
      }
    ],
    objectives: [
      "User-friendly mobile app 100% functional बनाउने Android र iOS दुवैमा",
      "Monthly active users 50,000+ achieve गर्ने first year मा",
      "Corruption reports मा 200% वृद्धि ल्याउने through easy reporting",
      "Response time 48 hours भित्र 90% cases मा maintain गर्ने",
      "Anonymous reporting feature 100% secure र untraceable बनाउने",
      "Multi-language support (Nepali, English, Maithili, Bhojpuri) provide गर्ने",
      "Government agencies संग 95% integration success rate प्राप्त गर्ने"
    ],
    beneficiaries: {
      direct: "30,000,000 smartphone users in Nepal",
      indirect: "All Nepali citizens benefiting from reduced corruption",
      demographics: [
        "Urban and rural smartphone users",
        "Government service seekers",
        "Business community facing corruption",
        "Civil society organizations",
        "Anti-corruption agencies and investigators"
      ]
    },
    implementation: {
      location: [
        "Phase 1: Kathmandu Valley pilot (3 months)",
        "Phase 2: Major cities and district headquarters (6 months)",
        "Phase 3: Nationwide rollout including rural areas (9 months)"
      ],
      duration: "12 months",
      methodology: "Agile development methodology with user-centered design, following international best practices from India's I Paid a Bribe platform र South Korea's Anti-Corruption & Civil Rights Commission app",
      resources: [
        "Mobile App Development (Android/iOS): NPR 3,500,000",
        "Backend Infrastructure & Security: NPR 2,000,000",
        "UI/UX Design & User Research: NPR 1,000,000",
        "Testing & Quality Assurance: NPR 800,000",
        "Marketing & Awareness Campaign: NPR 1,200,000"
      ]
    },
    risks: [
      {
        risk: "Low smartphone penetration in rural areas",
        mitigation: "Web-based version and SMS reporting options",
        probability: "medium"
      },
      {
        risk: "Security threats and data breaches",
        mitigation: "End-to-end encryption and regular security audits",
        probability: "high"
      },
      {
        risk: "False or malicious reports",
        mitigation: "Verification system and user accountability measures",
        probability: "medium"
      },
      {
        risk: "Government resistance or blocking",
        mitigation: "Stakeholder engagement and legal framework compliance",
        probability: "low"
      }
    ],
    documents: [
      {
        name: "Mobile App Technical Specification",
        type: "PDF",
        size: "3.2 MB",
        url: "/documents/app-technical-spec-p4.pdf"
      },
      {
        name: "User Interface Design Mockups",
        type: "PDF",
        size: "5.8 MB",
        url: "/documents/ui-design-mockups-p4.pdf"
      },
      {
        name: "Security and Privacy Framework",
        type: "PDF",
        size: "2.4 MB",
        url: "/documents/security-framework-p4.pdf"
      },
      {
        name: "International Best Practices Analysis",
        type: "PDF",
        size: "4.1 MB",
        url: "/documents/international-practices-p4.pdf"
      },
      {
        name: "User Research and Survey Report",
        type: "PDF",
        size: "3.6 MB",
        url: "/documents/user-research-p4.pdf"
      },
      {
        name: "Development Budget Breakdown",
        type: "Excel",
        size: "1.3 MB",
        url: "/documents/budget-breakdown-p4.xlsx"
      }
    ],
    comments: [
      {
        id: "c16",
        author: "Lok Man Singh Karki, Former Chief Commissioner, CIAA",
        content: "Digital platform ले corruption reporting लाई revolutionize गर्नेछ। Anonymous reporting feature विशेष गरी महत्वपूर्ण छ। Security measures robust हुनुपर्छ।",
        timestamp: "2025-01-13T09:45:00Z",
        votes: 89
      },
      {
        id: "c17",
        author: "Renu Dahal, IT Professional",
        content: "Technical feasibility राम्रो छ। User experience मा focus गर्नुपर्छ। Rural areas मा internet connectivity challenge हुन सक्छ। Offline functionality पनि चाहिन्छ।",
        timestamp: "2025-01-14T14:20:00Z",
        votes: 67
      },
      {
        id: "c18",
        author: "Gagan Thapa, Member of Parliament",
        content: "यो innovative approach हो corruption combat गर्न। Parliament बाट support गर्नेछौं। Legal framework पनि update गर्नुपर्ने हुन सक्छ।",
        timestamp: "2025-01-15T11:30:00Z",
        votes: 78
      },
      {
        id: "c19",
        author: "Sushila Karki, Former Chief Justice",
        content: "Judicial system संग integration important छ। Evidence collection र verification process clear हुनुपर्छ। Legal validity ensure गर्नुपर्छ।",
        timestamp: "2025-01-16T16:15:00Z",
        votes: 92
      },
      {
        id: "c20",
        author: "Bimal Koirala, Transparency International Nepal",
        content: "Global experience अनुसार mobile apps ले corruption reporting significantly बढाउँछ। Nepal मा यो timely initiative हो। Implementation strategy crucial छ।",
        timestamp: "2025-01-17T10:45:00Z",
        votes: 71
      }
    ],
    supporters: [
      {
        name: "Commission for the Investigation of Abuse of Authority (CIAA)",
        organization: "Anti-Corruption Agency",
        statement: "We support this digital initiative as it will enhance our capacity to receive and investigate corruption complaints efficiently."
      },
      {
        name: "Nepal Computer Association",
        organization: "IT Industry Association",
        statement: "This project represents the positive use of technology for social good and we pledge our technical expertise for its success."
      },
      {
        name: "Transparency International Nepal",
        organization: "Anti-Corruption NGO",
        statement: "Mobile technology can be a game-changer in fighting corruption. We fully endorse this innovative approach to citizen engagement."
      }
    ]
  }
}

export default function ProposalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const circleId = params.id as string
  const proposalId = params.proposalId as string
  const [locale, setLocale] = useState<"en" | "ne">("en")

  const proposal = mockProposalDetails[proposalId] || mockProposalDetails["p1"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "voting":
        return "bg-yellow-100 text-yellow-800"
      case "passed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTimelineStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "current":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const votePercentage = {
    for: (proposal.votes.for / proposal.votes.total) * 100,
    against: (proposal.votes.against / proposal.votes.total) * 100,
    abstain: (proposal.votes.abstain / proposal.votes.total) * 100
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation locale={locale} setLocale={setLocale} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href={`/circles/${circleId}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "en" ? "Back to Circle" : "सर्कलमा फर्कनुहोस्"}
          </Link>
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{proposal.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{proposal.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{proposal.category}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(proposal.status)}>
                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </Badge>
              <Badge className={getPriorityColor(proposal.priority)}>
                {proposal.priority.charAt(0).toUpperCase() + proposal.priority.slice(1)} Priority
              </Badge>
            </div>
          </div>
        </div>

        {/* Voting Status */}
        {proposal.status === "voting" && (
          <Card className="mb-6 border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Vote className="h-5 w-5 text-blue-600" />
                  {locale === "en" ? "Voting in Progress" : "मतदान जारी छ"}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {locale === "en" ? "Deadline:" : "अन्तिम मिति:"} {new Date(proposal.votingDeadline).toLocaleDateString()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600 font-medium">For ({proposal.votes.for})</span>
                    <span>{votePercentage.for.toFixed(1)}%</span>
                  </div>
                  <Progress value={votePercentage.for} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-500 font-medium">Against ({proposal.votes.against})</span>
                    <span>{votePercentage.against.toFixed(1)}%</span>
                  </div>
                  <Progress value={votePercentage.against} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-600 font-medium">Abstain ({proposal.votes.abstain})</span>
                    <span>{votePercentage.abstain.toFixed(1)}%</span>
                  </div>
                  <Progress value={votePercentage.abstain} className="h-2" />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {locale === "en" ? "Vote For" : "पक्षमा मत"}
                </Button>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  <XCircle className="h-4 w-4 mr-2" />
                  {locale === "en" ? "Vote Against" : "विपक्षमा मत"}
                </Button>
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  {locale === "en" ? "Abstain" : "तटस्थ"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Proposal Overview" : "प्रस्ताव सिंहावलोकन"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{proposal.description}</p>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-2">{locale === "en" ? "Detailed Description" : "विस्तृत विवरण"}</h4>
                <p className="text-sm leading-relaxed">{proposal.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {locale === "en" ? "Objectives" : "उद्देश्यहरू"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {proposal.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {locale === "en" ? "Implementation Timeline" : "कार्यान्वयन समयतालिका"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposal.timeline.map((phase, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getTimelineStatusIcon(phase.status)}
                        {index < proposal.timeline.length - 1 && (
                          <div className="w-px h-12 bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{phase.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Implementation Details */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Implementation Details" : "कार्यान्वयन विवरण"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {locale === "en" ? "Locations" : "स्थानहरू"}
                  </h4>
                  <ul className="text-sm space-y-1">
                    {proposal.implementation.location.map((location, index) => (
                      <li key={index} className="text-muted-foreground">• {location}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {locale === "en" ? "Duration" : "अवधि"}
                  </h4>
                  <p className="text-sm text-muted-foreground">{proposal.implementation.duration}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{locale === "en" ? "Methodology" : "कार्यप्रणाली"}</h4>
                  <p className="text-sm text-muted-foreground">{proposal.implementation.methodology}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{locale === "en" ? "Required Resources" : "आवश्यक स्रोतहरू"}</h4>
                  <ul className="text-sm space-y-1">
                    {proposal.implementation.resources.map((resource, index) => (
                      <li key={index} className="text-muted-foreground">• {resource}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  {locale === "en" ? "Risk Assessment" : "जोखिम मूल्याङ्कन"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposal.risks.map((risk, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{risk.risk}</h4>
                        <Badge className={getPriorityColor(risk.probability)}>
                          {risk.probability} risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {locale === "en" ? "Community Discussion" : "सामुदायिक छलफल"} ({proposal.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposal.comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{comment.author}</span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{comment.votes} votes</span>
                          <span>•</span>
                          <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Quick Information" : "द्रुत जानकारी"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{locale === "en" ? "Budget" : "बजेट"}</p>
                    <p className="text-sm text-muted-foreground">{proposal.budget.requested}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{locale === "en" ? "Direct Beneficiaries" : "प्रत्यक्ष लाभार्थी"}</p>
                    <p className="text-sm text-muted-foreground">{proposal.beneficiaries.direct}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{locale === "en" ? "Duration" : "अवधि"}</p>
                    <p className="text-sm text-muted-foreground">{proposal.implementation.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Proposal Author" : "प्रस्तावकर्ता"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">{proposal.author.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{proposal.author.name}</p>
                    <p className="text-sm text-muted-foreground">{proposal.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {locale === "en" ? "Documents" : "कागजातहरू"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {proposal.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supporters */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Supporters" : "समर्थकहरू"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proposal.supporters.map((supporter, index) => (
                    <div key={index} className="border-l-2 border-green-200 pl-3">
                      <p className="font-semibold text-sm">{supporter.name}</p>
                      <p className="text-xs text-muted-foreground mb-1">{supporter.organization}</p>
                      <p className="text-xs italic">"{supporter.statement}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Actions" : "कार्यहरू"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  {locale === "en" ? "Share Proposal" : "प्रस्ताव साझा गर्नुहोस्"}
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {locale === "en" ? "Add Comment" : "टिप्पणी थप्नुहोस्"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}