"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, ArrowLeft, Calendar, TrendingUp, Award, MapPin, Clock, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

interface CircleDetail {
  id: string
  name: string
  description: string
  icon: string
  members: number
  proposals: number
  joined: boolean
  category: string
  fullDescription: string
  criteria: string[]
  roles: string[]
  terms: string
  achievements: string[]
  activeProjects: number
  completedProjects: number
  monthlyGrowth: number
  location: string
  established: string
  nextMeeting: string
  budget: string
  impact: {
    title: string
    value: string
    description: string
  }[]
}

interface Proposal {
  id: string
  title: string
  status: "active" | "voting" | "passed" | "rejected"
  votes: number
  description: string
  author: string
  createdAt: string
}

const mockCircleDetails: Record<string, CircleDetail> = {
  "civic-vigilance": {
    id: "civic-vigilance",
    name: "Civic Vigilance and Transparency",
    description: "Monitoring corruption, party financing, and elite capture - the watchdog role",
    icon: "👁️",
    members: 456,
    proposals: 34,
    joined: false,
    category: "vigilance",
    fullDescription:
      "This circle serves as the watchdog of our democratic platform, focusing on monitoring corruption, tracking party financing, and preventing elite capture. Members work together to ensure transparency and accountability in all democratic processes.",
    criteria: [
      "Minimum 2 years experience in civil society or journalism",
      "Clean background verification",
      "Commitment to transparency principles",
      "Basic understanding of anti-corruption laws"
    ],
    roles: [
      "Corruption Monitor - राष्ट्रिय भ्रष्टाचार निगरानी",
      "Financial Investigator - वित्तीय अनुसन्धानकर्ता", 
      "Public Auditor - सार्वजनिक लेखा परीक्षक",
      "Transparency Advocate - पारदर्शिता वकिल"
    ],
    terms: "Members must maintain strict confidentiality, follow ethical guidelines, and commit to at least 10 hours monthly contribution.",
    achievements: [
      "Exposed 15 corruption cases worth NPR 2.3 billion",
      "Established transparency portal with 50,000+ users",
      "Trained 200+ citizen monitors across Nepal",
      "Published 12 investigative reports on elite capture"
    ],
    activeProjects: 8,
    completedProjects: 23,
    monthlyGrowth: 12,
    location: "Kathmandu, Pokhara, Chitwan",
    established: "March 2023",
    nextMeeting: "January 25, 2025 - 2:00 PM",
    budget: "NPR 4.5 Million (Annual)",
    impact: [
      {
        title: "Corruption Cases Exposed",
        value: "15",
        description: "Major corruption cases brought to public attention"
      },
      {
        title: "Money Recovered",
        value: "NPR 2.3B",
        description: "Public funds recovered through investigations"
      },
      {
        title: "Citizens Trained",
        value: "200+",
        description: "Community members trained in transparency monitoring"
      }
    ]
  },
  "institutional-innovation": {
    id: "institutional-innovation",
    name: "Institutional Innovation",
    description: "Developing digital and procedural tools like Election Transparency Tool - the builder role",
    icon: "🔧",
    members: 289,
    proposals: 28,
    joined: true,
    category: "innovation",
    fullDescription:
      "This circle focuses on building the future of democratic participation through technology and innovative processes. Members develop digital tools, design new procedures, and create systems that enhance democratic engagement.",
    criteria: [
      "Technical background in software development or policy design",
      "Portfolio of previous innovation projects",
      "Understanding of democratic processes",
      "Collaborative mindset for team projects"
    ],
    roles: [
      "Tech Developer - प्राविधिक विकासकर्ता",
      "Process Designer - प्रक्रिया डिजाइनर",
      "System Architect - प्रणाली वास्तुकार",
      "Innovation Researcher - नवाचार अनुसन्धानकर्ता"
    ],
    terms: "Members must contribute to open-source projects, share knowledge freely, and participate in monthly innovation workshops.",
    achievements: [
      "Developed 5 digital democracy tools used by 10,000+ citizens",
      "Created blockchain voting system for 3 pilot elections",
      "Built mobile app with 25,000+ downloads",
      "Established innovation lab in 4 major cities"
    ],
    activeProjects: 12,
    completedProjects: 18,
    monthlyGrowth: 18,
    location: "Kathmandu, Lalitpur, Bhaktapur",
    established: "January 2023",
    nextMeeting: "January 27, 2025 - 10:00 AM",
    budget: "NPR 6.2 Million (Annual)",
    impact: [
      {
        title: "Digital Tools Created",
        value: "5",
        description: "Innovative platforms enhancing democratic participation"
      },
      {
        title: "Citizens Reached",
        value: "35,000+",
        description: "People using our digital democracy solutions"
      },
      {
        title: "Open Source Contributions",
        value: "150+",
        description: "Code commits to democratic technology projects"
      }
    ]
  },
  "community-service": {
    id: "community-service",
    name: "Community Service and Regeneration",
    description: "Linking SEWA ideals to tangible local projects - the doer role",
    icon: "🤝",
    members: 678,
    proposals: 45,
    joined: true,
    category: "service",
    fullDescription:
      "This circle embodies the SEWA (service) ideals by connecting democratic participation with tangible community action. Members organize local projects, coordinate community initiatives, and ensure that democratic decisions translate into real-world impact.",
    criteria: [
      "Demonstrated community service experience",
      "Local community connections",
      "Physical ability to participate in field work",
      "Commitment to SEWA principles"
    ],
    roles: [
      "Community Organizer - समुदायिक संयोजक",
      "Project Coordinator - परियोजना संयोजक",
      "Field Worker - क्षेत्रीय कार्यकर्ता",
      "Resource Mobilizer - स्रोत परिचालक"
    ],
    terms: "Members must participate in monthly community service activities, maintain local partnerships, and report project outcomes.",
    achievements: [
      "Completed 45 community infrastructure projects",
      "Trained 500+ community health workers",
      "Established 12 youth skill development centers",
      "Served 25,000+ families across rural Nepal"
    ],
    activeProjects: 15,
    completedProjects: 45,
    monthlyGrowth: 8,
    location: "All 7 Provinces of Nepal",
    established: "February 2023",
    nextMeeting: "January 26, 2025 - 4:00 PM",
    budget: "NPR 8.7 Million (Annual)",
    impact: [
      {
        title: "Families Served",
        value: "25,000+",
        description: "Rural families benefited from community projects"
      },
      {
        title: "Health Workers Trained",
        value: "500+",
        description: "Community health workers deployed nationwide"
      },
      {
        title: "Infrastructure Projects",
        value: "45",
        description: "Roads, schools, and water systems completed"
      }
    ]
  },
  "national-coalition": {
    id: "national-coalition",
    name: "National Coalition Circle",
    description: "Working together for building a coalition with all groups for creating a big political party",
    icon: "🏛️",
    members: 234,
    proposals: 19,
    joined: false,
    category: "coalition",
    fullDescription:
      "This circle focuses on building broad-based coalitions across different groups and communities to create a unified political movement. Members work on strategic planning, stakeholder engagement, and consensus building for large-scale political change.",
    criteria: [
      "Political experience or strong civic engagement",
      "Network connections across different groups",
      "Strategic thinking and negotiation skills",
      "Commitment to democratic coalition building"
    ],
    roles: [
      "Coalition Builder - गठबन्धन निर्माता",
      "Strategic Planner - रणनीतिक योजनाकार",
      "Stakeholder Liaison - सरोकारवाला संपर्क",
      "Policy Coordinator - नीति संयोजक"
    ],
    terms: "Members must maintain political neutrality within the circle, respect diverse viewpoints, and work towards consensus building.",
    achievements: [
      "Built coalition with 25+ civil society organizations",
      "Organized 8 multi-party dialogue sessions",
      "Drafted unified democratic manifesto",
      "Established presence in all 77 districts"
    ],
    activeProjects: 6,
    completedProjects: 12,
    monthlyGrowth: 15,
    location: "National Coverage - All Districts",
    established: "April 2023",
    nextMeeting: "January 28, 2025 - 11:00 AM",
    budget: "NPR 5.8 Million (Annual)",
    impact: [
      {
        title: "Organizations United",
        value: "25+",
        description: "Civil society groups in democratic coalition"
      },
      {
        title: "Districts Covered",
        value: "77",
        description: "Nationwide presence across all districts"
      },
      {
        title: "Dialogue Sessions",
        value: "8",
        description: "Multi-party consensus building meetings"
      }
    ]
  },
}

const mockMembers: Record<string, Array<{id: string, name: string, role: string, avatar: string}>> = {
  "civic-vigilance": [
    { id: "m1", name: "Bishnu Maya Pariyar", role: "Corruption Monitor", avatar: "BP" },
    { id: "m2", name: "Arjun Bahadur Thapa", role: "Financial Investigator", avatar: "AT" },
    { id: "m3", name: "Kamala Devi Shrestha", role: "Public Auditor", avatar: "KS" },
    { id: "m4", name: "Ramesh Koirala", role: "Transparency Advocate", avatar: "RK" },
    { id: "m5", name: "Sita Kumari Rai", role: "Corruption Monitor", avatar: "SR" },
    { id: "m6", name: "Prakash Dahal", role: "Financial Investigator", avatar: "PD" },
  ],
  "institutional-innovation": [
    { id: "m7", name: "Rajesh Kumar Maharjan", role: "Tech Developer", avatar: "RM" },
    { id: "m8", name: "Sunita Tamang", role: "System Architect", avatar: "ST" },
    { id: "m9", name: "Dipak Gurung", role: "Process Designer", avatar: "DG" },
    { id: "m10", name: "Anita Shrestha", role: "Innovation Researcher", avatar: "AS" },
    { id: "m11", name: "Manoj Poudel", role: "Tech Developer", avatar: "MP" },
    { id: "m12", name: "Kavita Adhikari", role: "System Architect", avatar: "KA" },
  ],
  "community-service": [
    { id: "m13", name: "Ganga Kumari Rai", role: "Community Organizer", avatar: "GR" },
    { id: "m14", name: "Tek Bahadur Magar", role: "Project Coordinator", avatar: "TM" },
    { id: "m15", name: "Saraswati Adhikari", role: "Field Worker", avatar: "SA" },
    { id: "m16", name: "Krishna Bahadur Limbu", role: "Resource Mobilizer", avatar: "KL" },
    { id: "m17", name: "Maya Devi Thapa", role: "Community Organizer", avatar: "MT" },
    { id: "m18", name: "Surya Prasad Sharma", role: "Project Coordinator", avatar: "SS" },
  ],
  "national-coalition": [
    { id: "m19", name: "Bhim Bahadur Rawal", role: "Coalition Builder", avatar: "BR" },
    { id: "m20", name: "Laxmi Devi Chaudhary", role: "Strategic Planner", avatar: "LC" },
    { id: "m21", name: "Narayan Prasad Rijal", role: "Policy Coordinator", avatar: "NR" },
    { id: "m22", name: "Indira Kumari Tharu", role: "Stakeholder Liaison", avatar: "IT" },
    { id: "m23", name: "Gopal Singh Dhami", role: "Coalition Builder", avatar: "GD" },
    { id: "m24", name: "Radha Kumari Joshi", role: "Strategic Planner", avatar: "RJ" },
  ],
}

const mockProposals: Record<string, Proposal[]> = {
  "civic-vigilance": [
    {
      id: "cv1",
      title: "सार्वजनिक खरिद निगरानी प्रणाली स्थापना (Public Procurement Monitoring System)",
      status: "voting",
      votes: 234,
      description: "सरकारी खरिद प्रक्रियामा पारदर्शिता ल्याउन र भ्रष्टाचार रोक्न डिजिटल निगरानी प्रणाली स्थापना गर्ने। यसले सबै सरकारी ठेक्का र खरिदको विवरण सार्वजनिक गर्नेछ।",
      author: "Bishnu Maya Pariyar",
      createdAt: "2025-01-15",
    },
    {
      id: "cv2", 
      title: "राजनीतिक दलको आर्थिक पारदर्शिता पोर्टल (Political Party Financial Transparency Portal)",
      status: "active",
      votes: 189,
      description: "राजनीतिक दलहरूको आम्दानी र खर्चको पूर्ण विवरण सार्वजनिक गर्न डिजिटल प्लेटफर्म निर्माण। यसमा चन्दा, अनुदान र खर्चको हरेक रुपैयाँको हिसाब हुनेछ।",
      author: "Arjun Bahadur Thapa",
      createdAt: "2025-01-10",
    },
    {
      id: "cv3",
      title: "स्थानीय तहमा सामाजिक लेखापरीक्षा अनिवार्यता (Mandatory Social Audit at Local Level)",
      status: "passed",
      votes: 312,
      description: "सबै स्थानीय तहमा वार्षिक सामाजिक लेखापरीक्षा अनिवार्य गर्ने नीति। नागरिकहरूले प्रत्यक्ष रूपमा स्थानीय सरकारको काम र खर्चको समीक्षा गर्न सक्नेछन्।",
      author: "Kamala Devi Shrestha",
      createdAt: "2025-01-05",
    },
    {
      id: "cv4",
      title: "भ्रष्टाचार उजुरी मोबाइल एप विकास (Anti-Corruption Mobile App Development)",
      status: "voting",
      votes: 156,
      description: "नागरिकहरूले भ्रष्टाचारका घटनाहरू तुरुन्त रिपोर्ट गर्न सक्ने मोबाइल एप। GPS ट्र्याकिङ, फोटो/भिडियो अपलोड र गुमनाम रिपोर्टिङको सुविधा हुनेछ।",
      author: "Sita Kumari Rai",
      createdAt: "2025-01-12",
    },
  ],
  "institutional-innovation": [
    {
      id: "ii1",
      title: "ब्लकचेन आधारित मतदान प्रणाली (Blockchain-Based Voting System)",
      status: "voting",
      votes: 167,
      description: "स्थानीय निर्वाचनदेखि सुरु गरेर ब्लकचेन प्रविधिमा आधारित सुरक्षित र पारदर्शी मतदान प्रणाली। यसले मत हेरफेरको सम्भावना शून्य बनाउनेछ।",
      author: "Rajesh Kumar Maharjan",
      createdAt: "2025-01-12",
    },
    {
      id: "ii2",
      title: "ग्रामीण क्षेत्रका लागि डिजिटल सहभागिता प्लेटफर्म (Digital Participation Platform for Rural Areas)",
      status: "active", 
      votes: 145,
      description: "इन्टरनेट नभएका ठाउँमा SMS र भ्वाइस कल मार्फत लोकतान्त्रिक सहभागिता बढाउने प्रणाली। किसानहरूले आफ्ना समस्या र सुझाव पठाउन सक्नेछन्।",
      author: "Sunita Tamang",
      createdAt: "2025-01-08",
    },
    {
      id: "ii3",
      title: "AI आधारित नीति विश्लेषण उपकरण (AI-Based Policy Analysis Tool)",
      status: "voting",
      votes: 203,
      description: "सरकारी नीतिहरूको प्रभाव विश्लेषण गर्न कृत्रिम बुद्धिमत्ता प्रयोग। यसले नीतिको फाइदा-नोक्सान र जनताको जीवनमा पर्ने प्रभाव पूर्वानुमान गर्नेछ।",
      author: "Dipak Gurung",
      createdAt: "2025-01-03",
    },
    {
      id: "ii4",
      title: "युवाहरूका लागि डिजिटल नागरिकता शिक्षा (Digital Citizenship Education for Youth)",
      status: "active",
      votes: 178,
      description: "१६-२५ वर्षका युवाहरूलाई डिजिटल माध्यमबाट लोकतन्त्र र नागरिकताको शिक्षा दिने कार्यक्रम। गेमिफिकेशन र इन्टरएक्टिभ कन्टेन्ट प्रयोग गरिनेछ।",
      author: "Anita Sharma",
      createdAt: "2025-01-06",
    },
  ],
  "community-service": [
    {
      id: "cs1",
      title: "सामुदायिक स्वास्थ्य कार्यकर्ता तालिम कार्यक्रम (Community Health Worker Training Program)",
      status: "active",
      votes: 289,
      description: "प्रत्येक वडामा कम्तिमा ५ जना सामुदायिक स्वास्थ्य कार्यकर्ता तयार गर्ने। उनीहरूले आधारभूत स्वास्थ्य सेवा, खोप र पोषण शिक्षा प्रदान गर्नेछन्।",
      author: "Ganga Kumari Rai",
      createdAt: "2025-01-14",
    },
    {
      id: "cs2",
      title: "ग्रामीण सडक निर्माण श्रमदान कार्यक्रम (Rural Road Construction Volunteer Program)", 
      status: "voting",
      votes: 234,
      description: "स्थानीय समुदायको सहयोगमा ग्रामीण सडक निर्माण। प्रत्येक परिवारले महिनामा २ दिन श्रमदान गर्नुपर्ने र सरकारले सामग्री उपलब्ध गराउने।",
      author: "Tek Bahadur Magar",
      createdAt: "2025-01-09",
    },
    {
      id: "cs3",
      title: "महिला उद्यमशीलता विकास केन्द्र (Women Entrepreneurship Development Center)",
      status: "passed",
      votes: 356,
      description: "ग्रामीण महिलाहरूलाई सीप विकास र व्यवसायिक तालिम दिने केन्द्र स्थापना। कृषि प्रशोधन, हस्तकला र डेयरी व्यवसायमा फोकस गरिनेछ।",
      author: "Saraswati Adhikari",
      createdAt: "2025-01-01",
    },
    {
      id: "cs4",
      title: "बालबालिकाका लागि पोषण बगैंचा कार्यक्रम (Nutrition Garden Program for Children)",
      status: "voting",
      votes: 198,
      description: "प्रत्येक विद्यालयमा पोषण बगैंचा स्थापना गरी बालबालिकाहरूलाई स्वस्थ खाना र कृषिको ज्ञान दिने। विद्यार्थीहरूले आफैं तरकारी उत्पादन गर्नेछन्।",
      author: "Ram Prasad Chaudhary",
      createdAt: "2025-01-11",
    },
  ],
  "national-coalition": [
    {
      id: "nc1",
      title: "राष्ट्रिय एकता र सहमति निर्माण रणनीति (National Unity and Consensus Building Strategy)",
      status: "voting",
      votes: 178,
      description: "विभिन्न जातजाति, धर्म र क्षेत्रका मानिसहरूबीच एकता कायम गर्न व्यापक रणनीति। सांस्कृतिक आदानप्रदान र संवाद कार्यक्रमहरू आयोजना गरिनेछ।",
      author: "Bhim Bahadur Rawal",
      createdAt: "2025-01-13",
    },
    {
      id: "nc2",
      title: "संघीयता कार्यान्वयन निगरानी समिति (Federalism Implementation Monitoring Committee)",
      status: "active",
      votes: 156,
      description: "संघीयताको सही कार्यान्वयन भइरहेको छ कि छैन भनेर निगरानी गर्ने नागरिक समिति। तीनै तहका सरकारको काम कारबाहीको मूल्यांकन गरिनेछ।",
      author: "Laxmi Devi Chaudhary",
      createdAt: "2025-01-07",
    },
    {
      id: "nc3",
      title: "युवा राजनीतिक नेतृत्व विकास कार्यक्रम (Youth Political Leadership Development Program)",
      status: "voting", 
      votes: 198,
      description: "२५-३५ वर्षका युवाहरूलाई राजनीतिक नेतृत्वको तालिम दिने। नैतिकता, जनसेवा र लोकतान्त्रिक मूल्यमान्यतामा आधारित नेतृत्व विकास गरिनेछ।",
      author: "Narayan Prasad Rijal",
      createdAt: "2025-01-02",
    },
    {
      id: "nc4",
      title: "प्रवासी नेपालीहरूको राजनीतिक सहभागिता (Political Participation of Nepali Diaspora)",
      status: "active",
      votes: 134,
      description: "विदेशमा बसेका नेपालीहरूले पनि देशको राजनीतिक प्रक्रियामा सहभागी हुन सक्ने व्यवस्था। अनलाइन मतदान र नीति छलफलमा सहभागिताको अवसर सिर्जना गरिनेछ।",
      author: "Binod Chaudhary",
      createdAt: "2025-01-09",
    },
  ],
  "environmental-action": [
    {
      id: "ea1",
      title: "हिमालयी क्षेत्रमा जलवायु परिवर्तन अनुगमन केन्द्र (Climate Change Monitoring Center in Himalayas)",
      status: "voting",
      votes: 245,
      description: "हिमालयी क्षेत्रमा जलवायु परिवर्तनको प्रभाव अध्ययन गर्न अत्याधुनिक अनुगमन केन्द्र स्थापना। हिउँ पग्लने दर, तापक्रम वृद्धि र वर्षाको ढाँचा अध्ययन गरिनेछ।",
      author: "Dr. Meera Acharya",
      createdAt: "2025-01-18",
    },
    {
      id: "ea2",
      title: "सामुदायिक वन संरक्षण पुरस्कार योजना (Community Forest Conservation Reward Scheme)",
      status: "active",
      votes: 189,
      description: "वन संरक्षणमा उत्कृष्ट काम गर्ने सामुदायिक वन उपभोक्ता समितिहरूलाई आर्थिक पुरस्कार। वन क्षेत्र बढाउने र वन्यजन्तु संरक्षण गर्ने समुदायलाई प्रोत्साहन दिइनेछ।",
      author: "Keshav Sthapit",
      createdAt: "2025-01-15",
    },
    {
      id: "ea3",
      title: "प्लास्टिक मुक्त नेपाल अभियान (Plastic-Free Nepal Campaign)",
      status: "voting",
      votes: 312,
      description: "२०३० सालसम्म नेपाललाई एकपटक प्रयोग हुने प्लास्टिकबाट मुक्त बनाउने राष्ट्रिय अभियान। वैकल्पिक सामग्रीको प्रवर्द्धन र प्लास्टिक रिसाइक्लिङ प्रणाली विकास गरिनेछ।",
      author: "Bimala Rai Paudyal",
      createdAt: "2025-01-12",
    },
  ],
  "education-reform": [
    {
      id: "er1",
      title: "मातृभाषामा प्राथमिक शिक्षा अनिवार्यता (Mandatory Primary Education in Mother Tongue)",
      status: "voting",
      votes: 267,
      description: "सबै बालबालिकाहरूले आफ्नो मातृभाषामा प्राथमिक शिक्षा पाउने अधिकार सुनिश्चित गर्ने। स्थानीय भाषामा पाठ्यक्रम र शिक्षक तयारी कार्यक्रम सञ्चालन गरिनेछ।",
      author: "Prof. Yogendra Yadav",
      createdAt: "2025-01-16",
    },
    {
      id: "er2",
      title: "डिजिटल साक्षरता अनिवार्य पाठ्यक्रम (Mandatory Digital Literacy Curriculum)",
      status: "active",
      votes: 198,
      description: "कक्षा ६ देखि १० सम्म डिजिटल साक्षरता अनिवार्य विषय। कम्प्युटर सीप, इन्टरनेट सुरक्षा र डिजिटल नागरिकताको शिक्षा दिइनेछ।",
      author: "Shanti Paudel",
      createdAt: "2025-01-13",
    },
    {
      id: "er3",
      title: "ग्रामीण विद्यालयहरूमा विज्ञान प्रयोगशाला स्थापना (Science Laboratory Setup in Rural Schools)",
      status: "passed",
      votes: 345,
      description: "सबै माध्यमिक विद्यालयहरूमा आधारभूत विज्ञान प्रयोगशाला स्थापना। व्यावहारिक शिक्षाको माध्यमबाट विद्यार्थीहरूमा वैज्ञानिक सोच विकास गरिनेछ।",
      author: "Dr. Ramesh Khanal",
      createdAt: "2025-01-10",
    },
  ],
  "healthcare-access": [
    {
      id: "ha1",
      title: "टेलिमेडिसिन सेवा विस्तार कार्यक्रम (Telemedicine Service Expansion Program)",
      status: "voting",
      votes: 234,
      description: "दुर्गम क्षेत्रका बिरामीहरूले भिडियो कल मार्फत डाक्टरसँग सल्लाह लिन सक्ने सेवा। मोबाइल नेटवर्क र इन्टरनेट पहुँच भएका सबै ठाउँमा यो सेवा उपलब्ध गराइनेछ।",
      author: "Dr. Sushma Koirala",
      createdAt: "2025-01-17",
    },
    {
      id: "ha2",
      title: "मानसिक स्वास्थ्य जागरूकता अभियान (Mental Health Awareness Campaign)",
      status: "active",
      votes: 189,
      description: "मानसिक स्वास्थ्यको महत्त्व र उपचारको बारेमा जनचेतना फैलाउने राष्ट्रव्यापी अभियान। विशेषगरी युवाहरूमा डिप्रेसन र चिन्ताको समस्या समाधान गर्न फोकस गरिनेछ।",
      author: "Dr. Prakash Kafle",
      createdAt: "2025-01-14",
    },
    {
      id: "ha3",
      title: "आमा र बालबालिकाको पोषण कार्यक्रम (Mother and Child Nutrition Program)",
      status: "voting",
      votes: 278,
      description: "गर्भवती आमा र ५ वर्षमुनिका बालबालिकाहरूका लागि निःशुल्क पोषण सप्लिमेन्ट। कुपोषण घटाउन र बाल मृत्युदर कम गर्न यो कार्यक्रम सञ्चालन गरिनेछ।",
      author: "Kamala Thapa",
      createdAt: "2025-01-11",
    },
  ],
  "economic-justice": [
    {
      id: "ej1",
      title: "न्यूनतम पारिश्रमिक वृद्धि र कार्यान्वयन (Minimum Wage Increase and Implementation)",
      status: "voting",
      votes: 298,
      description: "न्यूनतम पारिश्रमिक दैनिक ८०० रुपैयाँ निर्धारण गरी सबै क्षेत्रमा कडाइका साथ कार्यान्वयन। श्रमिकहरूको जीवनयापनको लागत अनुसार पारिश्रमिक निर्धारण गरिनेछ।",
      author: "Bishnu Rimal",
      createdAt: "2025-01-19",
    },
    {
      id: "ej2",
      title: "सहकारी संस्थाहरूको सुदृढीकरण कार्यक्रम (Cooperative Institution Strengthening Program)",
      status: "active",
      votes: 167,
      description: "कृषि, डेयरी र लघु उद्योगमा सहकारी संस्थाहरूलाई प्राविधिक र आर्थिक सहयोग। सामूहिक स्वामित्व र लाभ बाँडफाँडको संस्कृति विकास गरिनेछ।",
      author: "Goma Devi Tiwari",
      createdAt: "2025-01-16",
    },
    {
      id: "ej3",
      title: "युवा उद्यमी ऋण कार्यक्रम (Youth Entrepreneur Loan Program)",
      status: "voting",
      votes: 223,
      description: "१८-३५ वर्षका युवाहरूलाई न्यूनतम ब्याजदरमा व्यवसायिक ऋण। नवाचारमूलक व्यवसायिक योजना भएका युवाहरूलाई प्राथमिकता दिइनेछ।",
      author: "Suresh Dhakal",
      createdAt: "2025-01-13",
    },
  ],
  "digital-rights": [
    {
      id: "dr1",
      title: "डाटा संरक्षण कानून कार्यान्वयन (Data Protection Law Implementation)",
      status: "voting",
      votes: 187,
      description: "नागरिकहरूको व्यक्तिगत डाटाको सुरक्षा सुनिश्चित गर्न कडा कानून बनाउने र कार्यान्वयन गर्ने। कम्पनीहरूले डाटा संकलन र प्रयोगको बारेमा स्पष्ट जानकारी दिनुपर्ने।",
      author: "Advocate Ravi Lamichhane",
      createdAt: "2025-01-18",
    },
    {
      id: "dr2",
      title: "इन्टरनेट पहुँच मौलिक अधिकार घोषणा (Internet Access as Fundamental Right Declaration)",
      status: "active",
      votes: 234,
      description: "इन्टरनेट पहुँचलाई मौलिक अधिकारको रूपमा संविधानमा समावेश गर्ने। सबै नागरिकहरूले किफायती दरमा इन्टरनेट पाउने अधिकार सुनिश्चित गरिनेछ।",
      author: "Sagar Prasai",
      createdAt: "2025-01-15",
    },
    {
      id: "dr3",
      title: "साइबर सुरक्षा जागरूकता कार्यक्रम (Cyber Security Awareness Program)",
      status: "voting",
      votes: 156,
      description: "नागरिकहरूलाई अनलाइन ठगी, फिसिङ र साइबर अपराधबाट बच्न सिकाउने राष्ट्रव्यापी कार्यक्रम। विशेषगरी वृद्ध र ग्रामीण जनतालाई लक्षित गरिनेछ।",
      author: "Binita Sharma",
      createdAt: "2025-01-12",
    },
  ],
  "cultural-heritage": [
    {
      id: "ch1",
      title: "डिजिटल सांस्कृतिक सम्पदा संग्रहालय (Digital Cultural Heritage Museum)",
      status: "voting",
      votes: 198,
      description: "नेपालका सबै सांस्कृतिक सम्पदाहरूको डिजिटल संग्रहालय निर्माण। पुरातत्व, कला, संगीत र परम्परागत ज्ञानलाई डिजिटल रूपमा संरक्षण गरिनेछ।",
      author: "Dr. Purushottam Lochan Shrestha",
      createdAt: "2025-01-17",
    },
    {
      id: "ch2",
      title: "स्थानीय भाषा र बोली संरक्षण कार्यक्रम (Local Language and Dialect Preservation Program)",
      status: "active",
      votes: 167,
      description: "लोप हुँदै गएका स्थानीय भाषा र बोलीहरूको अभिलेखीकरण र संरक्षण। वृद्धहरूसँग अन्तर्वार्ता लिएर भाषिक सम्पदा संरक्षण गरिनेछ।",
      author: "Laxman Upreti",
      createdAt: "2025-01-14",
    },
    {
      id: "ch3",
      title: "परम्परागत कला र शिल्प प्रवर्द्धन योजना (Traditional Arts and Crafts Promotion Plan)",
      status: "voting",
      votes: 234,
      description: "परम्परागत कला र शिल्पकारहरूलाई आर्थिक सहयोग र बजार पहुँच प्रदान गर्ने। युवाहरूलाई परम्परागत सीप सिकाउने तालिम कार्यक्रम सञ्चालन गरिनेछ।",
      author: "Muna Chhetri",
      createdAt: "2025-01-11",
    },
  ],
  "rural-development": [
    {
      id: "rd1",
      title: "स्मार्ट कृषि प्रविधि विस्तार कार्यक्रम (Smart Agriculture Technology Extension Program)",
      status: "voting",
      votes: 245,
      description: "किसानहरूलाई आधुनिक कृषि प्रविधि, ड्रोन र सेन्सर प्रयोग गर्न सिकाउने। मौसम पूर्वानुमान र बाली रोग पहिचानका लागि मोबाइल एप प्रदान गरिनेछ।",
      author: "Agri-Expert Ramhari Khatiwada",
      createdAt: "2025-01-18",
    },
    {
      id: "rd2",
      title: "ग्रामीण पर्यटन विकास योजना (Rural Tourism Development Plan)",
      status: "active",
      votes: 189,
      description: "ग्रामीण क्षेत्रको प्राकृतिक सुन्दरता र सांस्कृतिक सम्पदालाई पर्यटनसँग जोडेर स्थानीय रोजगारी सिर्जना। होमस्टे र इको-टुरिज्मलाई प्रवर्द्धन गरिनेछ।",
      author: "Tourism Expert Dil Maya Gurung",
      createdAt: "2025-01-15",
    },
    {
      id: "rd3",
      title: "ग्रामीण क्षेत्रमा फाइबर इन्टरनेट विस्तार (Fiber Internet Expansion in Rural Areas)",
      status: "voting",
      votes: 267,
      description: "सबै गाउँपालिकाहरूमा हाई-स्पीड फाइबर इन्टरनेट पुर्याउने। यसले अनलाइन शिक्षा, टेलिमेडिसिन र ई-कमर्सको विकासमा योगदान पुर्याउनेछ।",
      author: "Tech Expert Bikash Dhakal",
      createdAt: "2025-01-12",
    },
  ],
  "gender-equality": [
    {
      id: "ge1",
      title: "महिला उद्यमी सहायता कोष स्थापना (Women Entrepreneur Support Fund Establishment)",
      status: "voting",
      votes: 278,
      description: "महिला उद्यमीहरूलाई व्यवसाय सुरु गर्न र विस्तार गर्न विशेष कोष स्थापना। न्यूनतम ब्याजदर र सजिलो शर्तमा ऋण उपलब्ध गराइनेछ।",
      author: "Entrepreneur Sabitra Bhandari",
      createdAt: "2025-01-19",
    },
    {
      id: "ge2",
      title: "कार्यक्षेत्रमा यौन दुर्व्यवहार रोकथाम नीति (Workplace Sexual Harassment Prevention Policy)",
      status: "active",
      votes: 234,
      description: "सबै कार्यक्षेत्रमा यौन दुर्व्यवहार रोकथामका लागि कडा नीति र उजुरी सुन्ने संयन्त्र स्थापना। पीडितहरूलाई न्याय दिलाउने प्रभावकारी व्यवस्था गरिनेछ।",
      author: "Advocate Meera Dhungana",
      createdAt: "2025-01-16",
    },
    {
      id: "ge3",
      title: "बालविवाह उन्मूलन अभियान (Child Marriage Eradication Campaign)",
      status: "voting",
      votes: 312,
      description: "बालविवाह पूर्ण रूपमा अन्त्य गर्न सामुदायिक स्तरमा जागरूकता अभियान। बालिकाहरूको शिक्षा र स्वास्थ्यमा लगानी बढाएर बालविवाहको जरै काट्ने काम गरिनेछ।",
      author: "Social Worker Kamala Hemchuri",
      createdAt: "2025-01-13",
    },
  ],
}

interface ActivityLog {
  id: string
  type: "proposal" | "member" | "project" | "meeting" | "achievement" | "vote" | "discussion"
  title: string
  description: string
  author: string
  timestamp: string
  details?: string
}

const mockActivityLogs: Record<string, ActivityLog[]> = {
  "civic-vigilance": [
    {
      id: "a1",
      type: "proposal",
      title: "New Anti-Corruption Proposal Submitted",
      description: "Establish Anti-Corruption Monitoring System proposal submitted for community review",
      author: "Bishnu Maya Pariyar",
      timestamp: "2025-01-20T14:30:00Z",
      details: "Comprehensive system to monitor government contracts and public spending"
    },
    {
      id: "a2", 
      type: "vote",
      title: "Elite Capture Prevention Framework Passed",
      description: "Community voted to approve the Elite Capture Prevention Framework with 312 votes",
      author: "Community Vote",
      timestamp: "2025-01-19T16:45:00Z",
      details: "Framework will implement mechanisms to prevent wealthy elites from capturing democratic processes"
    },
    {
      id: "a3",
      type: "member",
      title: "New Members Joined",
      description: "5 new transparency advocates joined the circle",
      author: "System",
      timestamp: "2025-01-18T10:15:00Z",
      details: "Welcome to our new corruption monitors and financial investigators"
    },
    {
      id: "a4",
      type: "achievement",
      title: "Major Corruption Case Exposed",
      description: "Circle successfully exposed corruption worth NPR 150 million in infrastructure project",
      author: "Investigation Team",
      timestamp: "2025-01-17T09:20:00Z",
      details: "Collaborative investigation led to recovery of misappropriated funds"
    },
    {
      id: "a5",
      type: "meeting",
      title: "Monthly Transparency Review Meeting",
      description: "Circle conducted monthly review of ongoing investigations and transparency initiatives",
      author: "Kamala Devi Shrestha",
      timestamp: "2025-01-15T14:00:00Z",
      details: "Reviewed 8 active cases and planned next month's monitoring activities"
    },
    {
      id: "a6",
      type: "project",
      title: "Transparency Portal Update Released",
      description: "New features added to public transparency portal including real-time corruption reporting",
      author: "Tech Team",
      timestamp: "2025-01-14T11:30:00Z",
      details: "Portal now supports anonymous reporting and automated case tracking"
    },
    {
      id: "a7",
      type: "discussion",
      title: "Community Discussion on Party Financing",
      description: "Active discussion on improving political party financing transparency",
      author: "Arjun Bahadur Thapa",
      timestamp: "2025-01-12T16:20:00Z",
      details: "45 community members participated in the discussion forum"
    },
    {
      id: "a8",
      type: "achievement",
      title: "Training Program Completed",
      description: "Successfully trained 25 new citizen monitors in transparency principles",
      author: "Training Team",
      timestamp: "2025-01-10T13:45:00Z",
      details: "Participants from 5 different districts completed the certification program"
    }
  ],
  "institutional-innovation": [
    {
      id: "a9",
      type: "project",
      title: "Blockchain Voting System Beta Launch",
      description: "Successfully launched beta version of blockchain-based voting infrastructure",
      author: "Sunita Tamang",
      timestamp: "2025-01-19T15:30:00Z",
      details: "System tested with 500 beta users across 3 pilot locations"
    },
    {
      id: "a10",
      type: "proposal",
      title: "Digital Democracy Platform Enhancement Proposal",
      description: "New proposal to upgrade platform with AI-powered features submitted",
      author: "Rajesh Kumar Maharjan",
      timestamp: "2025-01-18T11:20:00Z",
      details: "Proposal includes AI-powered proposal matching and enhanced citizen engagement tools"
    },
    {
      id: "a11",
      type: "achievement",
      title: "Mobile App Reaches 25,000 Downloads",
      description: "Democratic participation mobile app milestone achieved",
      author: "Development Team",
      timestamp: "2025-01-16T09:15:00Z",
      details: "App now serves rural communities across all 7 provinces"
    },
    {
      id: "a12",
      type: "member",
      title: "Innovation Lab Team Expansion",
      description: "3 new system architects joined the innovation team",
      author: "HR Team",
      timestamp: "2025-01-15T14:45:00Z",
      details: "Team now includes specialists in blockchain, AI, and mobile development"
    }
  ],
  "community-service": [
    {
      id: "a13",
      type: "project",
      title: "Community Health Worker Deployment",
      description: "50 new community health workers deployed to remote areas",
      author: "Ganga Kumari Rai",
      timestamp: "2025-01-20T08:30:00Z",
      details: "Workers will serve 15 villages in Karnali and Sudurpashchim provinces"
    },
    {
      id: "a14",
      type: "achievement",
      title: "Infrastructure Project Completed",
      description: "New school building completed in Dolakha district",
      author: "Project Team",
      timestamp: "2025-01-18T16:00:00Z",
      details: "School will serve 200 students from 5 surrounding villages"
    },
    {
      id: "a15",
      type: "vote",
      title: "Youth Skills Development Centers Approved",
      description: "Community approved establishment of 3 new skill development centers",
      author: "Community Vote",
      timestamp: "2025-01-17T12:30:00Z",
      details: "Centers will focus on digital literacy and vocational training"
    }
  ],
  "national-coalition": [
    {
      id: "a16",
      type: "meeting",
      title: "Multi-Party Dialogue Session",
      description: "Successful dialogue session with representatives from 8 political parties",
      author: "Bhim Bahadur Rawal",
      timestamp: "2025-01-19T10:00:00Z",
      details: "Discussed framework for democratic coalition building"
    },
    {
      id: "a17",
      type: "achievement",
      title: "Coalition Expanded to All Districts",
      description: "Successfully established presence in all 77 districts of Nepal",
      author: "Expansion Team",
      timestamp: "2025-01-16T14:20:00Z",
      details: "Coalition now includes local representatives from every district"
    }
  ],
  "environmental-action": [
    {
      id: "a18",
      type: "project",
      title: "Climate Monitoring Network Launched",
      description: "Deployed 50 climate monitoring stations across Nepal's mountain regions",
      author: "Environmental Team",
      timestamp: "2025-01-20T09:00:00Z",
      details: "Real-time data collection for climate change impact assessment"
    },
    {
      id: "a19",
      type: "achievement",
      title: "Forest Conservation Success",
      description: "Protected 1,000 hectares of forest from illegal logging",
      author: "Conservation Unit",
      timestamp: "2025-01-18T14:30:00Z",
      details: "Community-led initiative resulted in 15 arrests and policy changes"
    },
    {
      id: "a20",
      type: "proposal",
      title: "Renewable Energy Transition Plan",
      description: "Comprehensive proposal for transitioning rural communities to renewable energy",
      author: "Sustainability Team",
      timestamp: "2025-01-16T11:45:00Z",
      details: "Plan includes solar, wind, and micro-hydro installations"
    }
  ],
  "education-reform": [
    {
      id: "a21",
      type: "project",
      title: "Digital Learning Platform Launched",
      description: "Online education platform serving 10,000+ students in remote areas",
      author: "Education Tech Team",
      timestamp: "2025-01-19T13:20:00Z",
      details: "Platform includes interactive lessons in Nepali and English"
    },
    {
      id: "a22",
      type: "achievement",
      title: "Teacher Training Program Completed",
      description: "Successfully trained 200 teachers in modern pedagogical methods",
      author: "Training Department",
      timestamp: "2025-01-17T10:15:00Z",
      details: "Focus on student-centered learning and technology integration"
    },
    {
      id: "a23",
      type: "vote",
      title: "Education Equity Initiative Approved",
      description: "Community voted to approve scholarship program for underprivileged students",
      author: "Community Vote",
      timestamp: "2025-01-15T16:30:00Z",
      details: "Program will support 500 students annually"
    }
  ],
  "healthcare-access": [
    {
      id: "a24",
      type: "project",
      title: "Mobile Health Clinics Deployed",
      description: "15 mobile health units now serving remote mountain communities",
      author: "Health Services Team",
      timestamp: "2025-01-20T08:45:00Z",
      details: "Providing primary healthcare to 25,000 people in underserved areas"
    },
    {
      id: "a25",
      type: "achievement",
      title: "Maternal Mortality Reduction",
      description: "Achieved 40% reduction in maternal mortality in target districts",
      author: "Maternal Health Unit",
      timestamp: "2025-01-18T12:00:00Z",
      details: "Through improved prenatal care and skilled birth attendance"
    },
    {
      id: "a26",
      type: "meeting",
      title: "Public Health Emergency Preparedness",
      description: "Conducted emergency response training for 100 health workers",
      author: "Emergency Response Team",
      timestamp: "2025-01-16T09:30:00Z",
      details: "Preparing for natural disasters and disease outbreaks"
    }
  ],
  "economic-justice": [
    {
      id: "a27",
      type: "achievement",
      title: "Minimum Wage Campaign Success",
      description: "Successfully advocated for 25% increase in minimum wage",
      author: "Labor Rights Team",
      timestamp: "2025-01-19T15:45:00Z",
      details: "New wage will benefit 500,000 workers across the country"
    },
    {
      id: "a28",
      type: "project",
      title: "Worker Cooperative Network",
      description: "Established network of 50 worker cooperatives",
      author: "Cooperative Development Team",
      timestamp: "2025-01-17T11:20:00Z",
      details: "Promoting democratic workplace governance and profit sharing"
    },
    {
      id: "a29",
      type: "proposal",
      title: "Universal Basic Income Pilot",
      description: "Proposal for UBI pilot program in 3 rural districts",
      author: "Economic Policy Team",
      timestamp: "2025-01-14T14:10:00Z",
      details: "6-month pilot to test poverty reduction effectiveness"
    }
  ],
  "digital-rights": [
    {
      id: "a30",
      type: "achievement",
      title: "Data Privacy Law Advocacy",
      description: "Successfully influenced passage of comprehensive data privacy legislation",
      author: "Digital Rights Advocates",
      timestamp: "2025-01-20T16:00:00Z",
      details: "Law includes strong protections for personal data and digital rights"
    },
    {
      id: "a31",
      type: "project",
      title: "Digital Literacy Campaign",
      description: "Trained 5,000 citizens in digital literacy and online safety",
      author: "Education Outreach Team",
      timestamp: "2025-01-18T10:30:00Z",
      details: "Focus on elderly and rural populations"
    },
    {
      id: "a32",
      type: "discussion",
      title: "AI Ethics Framework Discussion",
      description: "Community discussion on ethical AI development and deployment",
      author: "Ethics Committee",
      timestamp: "2025-01-15T13:45:00Z",
      details: "150 participants contributed to framework development"
    }
  ],
  "cultural-heritage": [
    {
      id: "a33",
      type: "project",
      title: "Digital Heritage Archive",
      description: "Digitized 10,000 historical documents and artifacts",
      author: "Heritage Preservation Team",
      timestamp: "2025-01-19T12:15:00Z",
      details: "Making cultural heritage accessible to global audience"
    },
    {
      id: "a34",
      type: "achievement",
      title: "UNESCO World Heritage Site Protection",
      description: "Successfully prevented commercial development in heritage zone",
      author: "Conservation Activists",
      timestamp: "2025-01-17T14:45:00Z",
      details: "Preserved 3 UNESCO sites from inappropriate development"
    },
    {
      id: "a35",
      type: "meeting",
      title: "Traditional Arts Festival",
      description: "Organized festival showcasing traditional Nepali arts and crafts",
      author: "Cultural Events Team",
      timestamp: "2025-01-16T18:00:00Z",
      details: "Featured 200 artists and attracted 50,000 visitors"
    }
  ],
  "rural-development": [
    {
      id: "a36",
      type: "project",
      title: "Smart Agriculture Initiative",
      description: "Introduced precision farming techniques to 1,000 farmers",
      author: "Agricultural Innovation Team",
      timestamp: "2025-01-20T07:30:00Z",
      details: "Using IoT sensors and data analytics to optimize crop yields"
    },
    {
      id: "a37",
      type: "achievement",
      title: "Food Security Milestone",
      description: "Achieved food security for 50,000 rural households",
      author: "Food Security Unit",
      timestamp: "2025-01-18T11:00:00Z",
      details: "Through improved seeds, irrigation, and storage facilities"
    },
    {
      id: "a38",
      type: "vote",
      title: "Rural Infrastructure Fund Approved",
      description: "Community approved NPR 100 million fund for rural infrastructure",
      author: "Community Vote",
      timestamp: "2025-01-15T15:20:00Z",
      details: "Fund will support roads, bridges, and communication networks"
    }
  ],
  "gender-equality": [
    {
      id: "a39",
      type: "achievement",
      title: "Women's Leadership Program Success",
      description: "Graduated 500 women from leadership development program",
      author: "Women's Empowerment Team",
      timestamp: "2025-01-19T14:00:00Z",
      details: "50% of graduates now hold leadership positions in their communities"
    },
    {
      id: "a40",
      type: "project",
      title: "Gender-Based Violence Prevention",
      description: "Established 25 safe houses and support centers",
      author: "GBV Prevention Unit",
      timestamp: "2025-01-17T09:45:00Z",
      details: "Providing shelter and legal support to survivors"
    },
    {
      id: "a41",
      type: "proposal",
      title: "Equal Pay Enforcement Mechanism",
      description: "Proposal for stronger enforcement of equal pay legislation",
      author: "Legal Advocacy Team",
      timestamp: "2025-01-14T12:30:00Z",
      details: "Includes penalties for wage discrimination and monitoring systems"
    }
  ]
}

export default function CircleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const circleId = params.id as string
  const [locale, setLocale] = useState<"en" | "ne">("en")

  const circle = mockCircleDetails[circleId] || mockCircleDetails["civic-vigilance"]

  const handleProposalClick = (proposalId: string) => {
    router.push(`/circles/${circleId}/proposals/${proposalId}`)
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} setLocale={setLocale} />
      <main className="flex-1 bg-background">
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/circles" className="flex items-center gap-2 text-primary hover:opacity-80 mb-8">
              <ArrowLeft className="h-4 w-4" />
              {locale === "en" ? "Back to Circles" : "सर्कलहरुमा फर्कनुहोस्"}
            </Link>

            {/* Circle Header */}
            <div className="mb-12 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-8">
              <div className="flex items-start gap-6">
                <div className="text-6xl">{circle?.icon || "🏛️"}</div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2 text-blue-600">{circle?.name || "Circle Not Found"}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{circle?.description || "This circle could not be found."}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">
                        {circle?.members || 0} {locale === "en" ? "Members" : "सदस्यहरु"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">
                        {circle?.proposals || 0} {locale === "en" ? "Proposals" : "प्रस्तावहरु"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">
                        {circle?.activeProjects || 0} {locale === "en" ? "Active Projects" : "सक्रिय परियोजनाहरु"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-red-500" />
                      <span className="font-semibold">
                        +{circle?.monthlyGrowth || 0}% {locale === "en" ? "Growth" : "वृद्धि"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{circle?.location || "Location not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{locale === "en" ? "Est." : "स्थापना"} {circle?.established || "Unknown"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{locale === "en" ? "Next Meeting:" : "अर्को बैठक:"} {circle?.nextMeeting || "TBD"}</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    {circle?.joined
                      ? locale === "en"
                        ? "Leave Circle"
                        : "सर्कल छोड्नुहोस्"
                      : locale === "en"
                        ? "Join Circle"
                        : "सर्कलमा सामेल हुनुहोस्"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="proposals" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8 overflow-x-auto">
                <TabsTrigger value="proposals">{locale === "en" ? "Proposals" : "प्रस्तावहरु"}</TabsTrigger>
                <TabsTrigger value="projects">{locale === "en" ? "Projects" : "परियोजनाहरु"}</TabsTrigger>
                <TabsTrigger value="achievements">{locale === "en" ? "Achievements" : "उपलब्धिहरु"}</TabsTrigger>
                <TabsTrigger value="analytics">{locale === "en" ? "Analytics" : "विश्लेषण"}</TabsTrigger>
                <TabsTrigger value="activity">{locale === "en" ? "Activity" : "गतिविधि"}</TabsTrigger>
                <TabsTrigger value="about">{locale === "en" ? "About" : "बारेमा"}</TabsTrigger>
                <TabsTrigger value="members">{locale === "en" ? "Members" : "सदस्यहरु"}</TabsTrigger>
              </TabsList>

              {/* Proposals Tab */}
              <TabsContent value="proposals" className="space-y-4">
                <div className="space-y-4">
                  {(mockProposals[circleId] || []).map((proposal) => (
                    <Card 
                      key={proposal.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleProposalClick(proposal.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{proposal.title}</h3>
                              <Badge className={getStatusColor(proposal.status)}>
                                {proposal.status === "active"
                                  ? locale === "en"
                                    ? "Active"
                                    : "सक्रिय"
                                  : proposal.status === "voting"
                                    ? locale === "en"
                                      ? "Voting"
                                      : "मतदान"
                                    : proposal.status === "passed"
                                      ? locale === "en"
                                        ? "Passed"
                                        : "पारित"
                                      : locale === "en"
                                        ? "Rejected"
                                        : "अस्वीकृत"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">
                                {locale === "en" ? "By:" : "द्वारा:"}{" "}
                                <span className="font-medium">{proposal.author}</span>
                              </span>
                              <span className="text-muted-foreground">
                                {locale === "en" ? "Votes:" : "मतहरु:"}{" "}
                                <span className="font-medium">{proposal.votes}</span>
                              </span>
                              <span className="text-muted-foreground">
                                {locale === "en" ? "Created:" : "सृजना गरिएको:"}{" "}
                                <span className="font-medium">{proposal.createdAt}</span>
                              </span>
                            </div>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                            {locale === "en" ? "View Details" : "विवरण हेर्नुहोस्"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Active Projects */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        {locale === "en" ? "Active Projects" : "सक्रिय परियोजनाहरु"}
                      </CardTitle>
                      <CardDescription>
                        {circle.activeProjects} {locale === "en" ? "ongoing initiatives" : "चलिरहेका पहलहरु"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">
                            {locale === "en" ? "Digital Transparency Portal" : "डिजिटल पारदर्शिता पोर्टल"}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {locale === "en" 
                              ? "Building a comprehensive platform for tracking government expenditures"
                              : "सरकारी खर्च ट्र्याक गर्नको लागि व्यापक प्लेटफर्म निर्माण"}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: "75%"}}></div>
                            </div>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">
                            {locale === "en" ? "Community Outreach Program" : "सामुदायिक पहुँच कार्यक्रम"}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {locale === "en" 
                              ? "Training local monitors in rural districts"
                              : "ग्रामीण जिल्लाहरूमा स्थानीय निगरानीकर्ताहरूलाई तालिम"}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: "45%"}}></div>
                            </div>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Completed Projects */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        {locale === "en" ? "Completed Projects" : "सम्पन्न परियोजनाहरु"}
                      </CardTitle>
                      <CardDescription>
                        {circle?.completedProjects || 0} {locale === "en" ? "successful initiatives" : "सफल पहलहरु"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">
                            {locale === "en" ? "Anti-Corruption Database" : "भ्रष्टाचार विरोधी डाटाबेस"}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {locale === "en" ? "Completed" : "सम्पन्न"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">
                            {locale === "en" ? "Citizen Training Modules" : "नागरिक तालिम मोड्युलहरु"}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {locale === "en" ? "Completed" : "सम्पन्न"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">
                            {locale === "en" ? "Mobile Monitoring App" : "मोबाइल निगरानी एप"}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {locale === "en" ? "Completed" : "सम्पन्न"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {locale === "en" ? "Project Timeline" : "परियोजना समयतालिका"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Q1 2025: Digital Platform Launch</p>
                          <p className="text-sm text-muted-foreground">Complete transparency portal development</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Q2 2025: Rural Expansion</p>
                          <p className="text-sm text-muted-foreground">Extend monitoring network to 25 districts</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Q3 2025: Policy Integration</p>
                          <p className="text-sm text-muted-foreground">Integrate with government transparency initiatives</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(circle?.achievements || []).map((achievement, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Award className="h-6 w-6 text-yellow-500 mt-1" />
                          <div>
                            <p className="font-medium text-sm leading-relaxed">{achievement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Impact Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      {locale === "en" ? "Impact Metrics" : "प्रभाव मेट्रिक्स"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(circle?.impact || []).map((metric, index) => (
                        <div key={index} className="text-center p-4 border rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                          <div className="font-semibold mb-1">{metric.title}</div>
                          <div className="text-sm text-muted-foreground">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recognition & Awards */}
                <Card>
                  <CardHeader>
                    <CardTitle>{locale === "en" ? "Recognition & Awards" : "मान्यता र पुरस्कारहरु"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                        <Award className="h-8 w-8 text-yellow-600" />
                        <div>
                          <p className="font-semibold">
                            {locale === "en" ? "Excellence in Transparency Award 2024" : "पारदर्शितामा उत्कृष्टता पुरस्कार २०२४"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {locale === "en" ? "Recognized by Nepal Transparency International" : "नेपाल ट्रान्सपरेन्सी इन्टरनेशनल द्वारा मान्यता"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                        <Award className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-semibold">
                            {locale === "en" ? "Digital Innovation Award 2024" : "डिजिटल नवाचार पुरस्कार २०२४"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {locale === "en" ? "Best Democratic Technology Platform" : "सर्वोत्तम लोकतान्त्रिक प्रविधि प्लेटफर्म"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                {/* Key Performance Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">{circle.members}</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === "en" ? "Total Members" : "कुल सदस्यहरु"}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-green-600">+{circle.monthlyGrowth}%</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === "en" ? "Monthly Growth" : "मासिक वृद्धि"}
                          </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{circle.activeProjects}</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === "en" ? "Active Projects" : "सक्रिय परियोजनाहरु"}
                          </p>
                        </div>
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-purple-600">{circle.proposals}</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === "en" ? "Total Proposals" : "कुल प्रस्तावहरु"}
                          </p>
                        </div>
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Budget & Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      {locale === "en" ? "Budget & Resources" : "बजेट र स्रोतहरु"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">
                          {locale === "en" ? "Annual Budget" : "वार्षिक बजेट"}
                        </h4>
                        <div className="text-3xl font-bold text-primary mb-2">{circle?.budget || "Budget not specified"}</div>
                        <p className="text-sm text-muted-foreground">
                          {locale === "en" ? "Allocated for 2025 activities" : "२०२५ गतिविधिहरूको लागि छुट्याइएको"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">
                          {locale === "en" ? "Resource Utilization" : "स्रोत उपयोग"}
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{locale === "en" ? "Projects" : "परियोजनाहरु"}</span>
                              <span>65%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: "65%"}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{locale === "en" ? "Training" : "तालिम"}</span>
                              <span>25%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: "25%"}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{locale === "en" ? "Operations" : "सञ्चालन"}</span>
                              <span>10%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: "10%"}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {locale === "en" ? "Recent Activity" : "हालैका गतिविधिहरु"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 border-l-4 border-primary bg-primary/5">
                        <div className="text-sm">
                          <p className="font-medium">
                            {locale === "en" ? "New proposal submitted" : "नयाँ प्रस्ताव पेश गरियो"}
                          </p>
                          <p className="text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-l-4 border-green-500 bg-green-50">
                        <div className="text-sm">
                          <p className="font-medium">
                            {locale === "en" ? "Project milestone completed" : "परियोजना माइलस्टोन पूरा भयो"}
                          </p>
                          <p className="text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-l-4 border-blue-500 bg-blue-50">
                        <div className="text-sm">
                          <p className="font-medium">
                            {locale === "en" ? "New members joined" : "नयाँ सदस्यहरु सामेल भए"}
                          </p>
                          <p className="text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {locale === "en" ? "Activity Timeline" : "गतिविधि समयरेखा"}
                    </CardTitle>
                    <CardDescription>
                      {locale === "en" 
                        ? "Complete log of all circle activities, proposals, and achievements" 
                        : "सबै सर्कल गतिविधिहरू, प्रस्तावहरू र उपलब्धिहरूको पूर्ण लग"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(mockActivityLogs[circleId] || []).map((activity) => {
                        const getActivityIcon = (type: string) => {
                          switch (type) {
                            case "proposal": return "📝"
                            case "vote": return "🗳️"
                            case "member": return "👥"
                            case "achievement": return "🏆"
                            case "project": return "🚀"
                            case "meeting": return "📅"
                            case "discussion": return "💬"
                            default: return "📌"
                          }
                        }

                        const getActivityColor = (type: string) => {
                          switch (type) {
                            case "proposal": return "border-blue-500 bg-blue-50"
                            case "vote": return "border-green-500 bg-green-50"
                            case "member": return "border-purple-500 bg-purple-50"
                            case "achievement": return "border-yellow-500 bg-yellow-50"
                            case "project": return "border-indigo-500 bg-indigo-50"
                            case "meeting": return "border-orange-500 bg-orange-50"
                            case "discussion": return "border-pink-500 bg-pink-50"
                            default: return "border-gray-500 bg-gray-50"
                          }
                        }

                        const formatDate = (timestamp: string) => {
                          const date = new Date(timestamp)
                          const now = new Date()
                          const diffTime = Math.abs(now.getTime() - date.getTime())
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                          
                          if (diffDays === 1) return locale === "en" ? "1 day ago" : "१ दिन अगाडि"
                          if (diffDays < 7) return locale === "en" ? `${diffDays} days ago` : `${diffDays} दिन अगाडि`
                          if (diffDays < 30) {
                            const weeks = Math.floor(diffDays / 7)
                            return locale === "en" ? `${weeks} week${weeks > 1 ? 's' : ''} ago` : `${weeks} हप्ता अगाडि`
                          }
                          return date.toLocaleDateString(locale === "en" ? "en-US" : "ne-NP")
                        }

                        return (
                          <div key={activity.id} className={`flex gap-4 p-4 border-l-4 rounded-lg ${getActivityColor(activity.type)}`}>
                            <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold text-lg">{activity.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">{activity.description}</p>
                              {activity.details && (
                                <p className="text-sm text-muted-foreground italic border-l-2 border-gray-300 pl-3">
                                  {activity.details}
                                </p>
                              )}
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-primary">{activity.author}</span>
                                <span className="text-muted-foreground">{formatDate(activity.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      
                      {(!mockActivityLogs[circleId] || mockActivityLogs[circleId].length === 0) && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>{locale === "en" ? "No activity logs available yet" : "अहिलेसम्म कुनै गतिविधि लगहरू उपलब्ध छैनन्"}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      {locale === "en" ? "Activity Statistics" : "गतिविधि तथ्याङ्कहरू"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const activities = mockActivityLogs[circleId] || []
                        const stats = activities.reduce((acc, activity) => {
                          acc[activity.type] = (acc[activity.type] || 0) + 1
                          return acc
                        }, {} as Record<string, number>)

                        const statItems = [
                          { type: "proposal", label: locale === "en" ? "Proposals" : "प्रस्तावहरू", icon: "📝", color: "text-blue-600" },
                          { type: "vote", label: locale === "en" ? "Votes" : "मतदानहरू", icon: "🗳️", color: "text-green-600" },
                          { type: "achievement", label: locale === "en" ? "Achievements" : "उपलब्धिहरू", icon: "🏆", color: "text-yellow-600" },
                          { type: "project", label: locale === "en" ? "Projects" : "परियोजनाहरू", icon: "🚀", color: "text-indigo-600" },
                        ]

                        return statItems.map((item) => (
                          <div key={item.type} className="text-center p-4 bg-secondary/50 rounded-lg">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className={`text-2xl font-bold ${item.color}`}>
                              {stats[item.type] || 0}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.label}</div>
                          </div>
                        ))
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{locale === "en" ? "About This Circle" : "यो सर्कल बारेमा"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Description" : "विवरण"}</h3>
                      <p className="text-muted-foreground">{circle?.fullDescription || "Description not available"}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Entry Criteria" : "प्रवेश मापदण्ड"}</h3>
                      <ul className="space-y-2">
                        {(circle?.criteria || []).map((criterion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Available Roles" : "उपलब्ध भूमिकाहरु"}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(circle?.roles || []).map((role, index) => (
                          <Badge key={index} variant="secondary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{locale === "en" ? "Circle Terms" : "सर्कल शर्तहरु"}</h3>
                      <p className="text-muted-foreground">{circle?.terms || "Terms not specified"}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Members Tab */}
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>{locale === "en" ? "Circle Members" : "सर्कल सदस्यहरु"}</CardTitle>
                    <CardDescription>
                      {circle.members} {locale === "en" ? "active members" : "सक्रिय सदस्यहरु"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(mockMembers[circleId] || []).map((member) => (
                        <Card key={member.id} className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-semibold text-sm">{member.avatar}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{member.name}</p>
                              <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
