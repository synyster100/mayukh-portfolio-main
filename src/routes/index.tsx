import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Download,
  Github,
  Linkedin,
  GraduationCap,
  Globe2,
  FileText,
  ExternalLink,
  Sparkles,
  Compass,
  Layers,
  Satellite,
  Droplets,
  Mountain,
  Cpu,
  CloudRain,
  Building2,
  Leaf,
  BrainCircuit,
  Map as MapIcon,
  Waves,
  ShieldAlert,
  Sun,
  Moon,
  ArrowUp,
  Award,
  BookOpen,
  ShieldCheck,
  Heart,
  Trophy,
  Palette,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { useReveal, useCountUp, useInView } from "@/hooks/use-reveal";
import ProjectMap from "@/components/ProjectMap";
import { GeospatialMethodologyVisualizer } from "@/components/GeospatialMethodologyVisualizer";
import {
  AutoCADIcon,
  QGISIcon,
  ArcGISIcon,
  GEEIcon,
  ETABSIcon,
  PlaxisIcon,
  HecRasIcon,
  EpanetIcon,
  ETankIcon,
  SWMMIcon,
  PythonIcon,
  CPlusPlusIcon,
  JavaScriptIcon,
} from "@/components/SkillIcons";
import { Wrench } from "lucide-react";

import { PROJECT_CATEGORIES, PROJECTS } from "@/data/projects";
import { PROJECT_IMAGE_URLS } from "@/assets/project-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Md Ali Ahnaf Abid Mayukh — GIS & GeoAI Researcher" },
      {
        name: "description",
        content:
          "Civil Engineer and GIS & Remote Sensing researcher exploring GeoAI, flood risk, and climate resilience through geospatial intelligence.",
      },
      { property: "og:title", content: "Md Ali Ahnaf Abid Mayukh — GIS & GeoAI Researcher" },
      {
        property: "og:description",
        content:
          "Portfolio of Md Ali Ahnaf Abid Mayukh — geospatial data, environmental monitoring, and machine learning for climate resilience.",
      },
    ],
  }),
  component: Portfolio,
});

/* ---------- Data ---------- */

const NAV = [
  { id: "about", label: "About", icon: Compass, color: "text-sky-500" },
  { id: "education", label: "Education", icon: GraduationCap, color: "text-indigo-500" },
  { id: "research", label: "Research", icon: FileText, color: "text-amber-500" },
  { id: "sandbox", label: "Simulation", icon: Cpu, color: "text-rose-500" },
  { id: "projects", label: "Projects", icon: Globe2, color: "text-emerald-500" },
  { id: "experience", label: "Experience", icon: Building2, color: "text-purple-500" },
  { id: "skills", label: "Skills", icon: BrainCircuit, color: "text-teal-500" },
  { id: "contact", label: "Contact", icon: Mail, color: "text-pink-500" },
];

const STATS = [
  { value: 20, suffix: "+", label: "Research Projects" },
  { value: 10, suffix: "+", label: "Publications & Papers" },
  { value: 25, suffix: "+", label: "Engineers Mentored" },
  { value: 20, suffix: "+", label: "Students Trained" },
];

const INTERESTS = [
  { 
    icon: Mountain, 
    label: "Geoenvironmental Engineering", 
    description: "Focusing on soil stabilization, polymer treatments, and eco-friendly geotechnical infrastructure systems.",
    theme: {
      text: "group-hover:text-amber-700",
      bg: "group-hover:bg-amber-500/[0.03]",
      border: "group-hover:border-amber-300/60",
      iconBg: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
      shadow: "group-hover:shadow-amber-500/5",
    }
  },
  { 
    icon: Satellite, 
    label: "GIS & Remote Sensing", 
    description: "Leveraging multispectral satellite analytics, spatiotemporal mapping, and spatial data science.",
    theme: {
      text: "group-hover:text-indigo-700",
      bg: "group-hover:bg-indigo-500/[0.03]",
      border: "group-hover:border-indigo-300/60",
      iconBg: "bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white",
      shadow: "group-hover:shadow-indigo-500/5",
    }
  },
  { 
    icon: CloudRain, 
    label: "Flood Risk Management", 
    description: "Developing hydrodynamic hazard modeling, AHP-GIS flood index mapping, and runoff forecasting systems.",
    theme: {
      text: "group-hover:text-sky-700",
      bg: "group-hover:bg-sky-500/[0.03]",
      border: "group-hover:border-sky-300/60",
      iconBg: "bg-sky-500/10 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
      shadow: "group-hover:shadow-sky-500/5",
    }
  },
  { 
    icon: Waves, 
    label: "Shoreline Dynamics", 
    description: "Tracking coastal erosion, beach forecasting, and satellite-based shoreline tracking dynamics.",
    theme: {
      text: "group-hover:text-teal-700",
      bg: "group-hover:bg-teal-500/[0.03]",
      border: "group-hover:border-teal-300/60",
      iconBg: "bg-teal-500/10 text-teal-600 group-hover:bg-teal-500 group-hover:text-white",
      shadow: "group-hover:shadow-teal-500/5",
    }
  },
  { 
    icon: BrainCircuit, 
    label: "GeoAI", 
    description: "Applying spatiotemporal machine learning models and explainable AI insights to earth science.",
    theme: {
      text: "group-hover:text-rose-700",
      bg: "group-hover:bg-rose-500/[0.03]",
      border: "group-hover:border-rose-300/60",
      iconBg: "bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
      shadow: "group-hover:shadow-rose-500/5",
    }
  },
  { 
    icon: ShieldAlert, 
    label: "Disaster Management", 
    description: "Formulating multi-hazard risk assessments, vulnerability mapping, and mitigation strategies.",
    theme: {
      text: "group-hover:text-red-700",
      bg: "group-hover:bg-red-500/[0.03]",
      border: "group-hover:border-red-300/60",
      iconBg: "bg-red-500/10 text-red-600 group-hover:bg-red-500 group-hover:text-white",
      shadow: "group-hover:shadow-red-500/5",
    }
  },
  { 
    icon: Layers, 
    label: "Environmental Modelling", 
    description: "Simulating hydrological processes, urban stormwater networks, and aquifer management.",
    theme: {
      text: "group-hover:text-emerald-700",
      bg: "group-hover:bg-emerald-500/[0.03]",
      border: "group-hover:border-emerald-300/60",
      iconBg: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
      shadow: "group-hover:shadow-emerald-500/5",
    }
  },
];

const JOURNAL = [
  {
    authors: "Ahmed, M. F., Sadik, M. S., <strong>Mayukh, A. A.</strong>, Labib, M. I.",
    title: "Governance Models for Urban Environmental Infrastructure in the Global South: A Scoping Review of Socio-Economic Implications for Pathways to Sustainable Cities (SDG 11) and Institutional Partnerships (SDG 17)",
    venue: "Journal of Lifestyle & SDGs Review. 6, e08255, 1-21",
    year: 2026,
    link: "https://doi.org/10.47172/2965-730X.SDGsReview.v6.n05.pe08255",
  },
  {
    authors: "Chowdhury, M. S., <strong>Mayukh, A. A.</strong> & Kim, Y. J.",
    title: "Spatiotemporal Shoreline Change Assessment And Machine Learning Projections For Coastal Louisiana",
    venue: "Geodata and AI, Vol. 7, Article 100089",
    year: 2025,
    location: { lng: -93.3197, lat: 29.7953, label: "Cameron Beach, Louisiana" },
    link: "https://doi.org/10.1016/j.geoai.2026.100089",
  },
  {
    authors: "Azad, S. B., Chowdhury, M. I., Sinha, R., & <strong>Mayukh, A. A.</strong>",
    title: "Improvement Of Engineering Properties Of Different Materials Using Microbial Treatment - A Review",
    venue: "Journal of Harbin Engineering University, 45(1), Article 01. 84-92",
    year: 2024,
    link: "https://harbinengineeringjournal.com/index.php/journal/article/view/2295",
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>",
    title: "Analyzing the Traffic Efficiency and Environmental Impact of the Cloverleaf Interchange at Bhanga, Bangladesh by Simulation",
    venue: "Journal of Civil Engineering (IEB). 51(2), 81-86",
    year: 2023,
    location: { lng: 89.9771, lat: 23.3966, label: "Bhanga, Bangladesh" },
    link: "https://jce-ieb.org/doc_file/5102002.pdf",
  },
];

const CONFERENCE = [
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S., Kim, Y. J.",
    title: "Comparative Machine Learning and Explainable Flood Susceptibility Mapping in Humphreys County, Tennessee Using AHP and SHAP",
    venue: "ACEM26",
    year: 2026,
    status: "[Accepted for presentation]",
    location: { lng: -87.8803, lat: 35.8703, label: "ACEM26 — Humphreys County, Tennessee, USA" },
    link: null,
  },
  {
    authors: "Chowdhury, M. S., <strong>Mayukh, A. A.</strong>, Kim, Y. J., An, J., Nam, B. H.",
    title: "GeoAI-Enabled Remote Sensing Framework for Shoreline Change Forecasting at Pensacola Beach, Florida",
    venue: "ACEM26",
    year: 2026,
    status: "[Accepted for presentation]",
    location: { lng: -87.1370, lat: 30.3349, label: "ACEM26 — Pensacola Beach, Florida, USA" },
    link: null,
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S.",
    title: "GIS-Based Multi-Temporal Land Cover Dynamics in Terrell County, Texas: Assessing Oil-Driven Desertification and Rangeland Resilience (2001–2021)",
    venue: "ASCE 2027",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -101.9500, lat: 30.2200, label: "ASCE 2027 — Terrell County, Texas, USA" },
    link: null,
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S.",
    title: "Hybrid Hydro-Geomorphic AHP Framework for Flash Flood Susceptibility: A Case Study of the Limestone Karst Terrain in Kerr County, Texas",
    venue: "ASCE 2027",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -99.3500, lat: 30.0500, label: "ASCE 2027 — Kerr County, Texas, USA" },
    link: null,
  },
  {
    authors: "Chowdhury, M. S., <strong>Mayukh, A. A.</strong>",
    title: "Spatiotemporal Land Cover Change from 2003 to 2023 and 2033 Projections for Topography Derived Inundation Susceptibility in El Paso County, Texas",
    venue: "ASCE 2027",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -104.8214, lat: 31.7619, label: "ASCE 2027 — El Paso County, Texas, USA" },
    link: null,
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S., Kim, Y. J. & Youn, S.",
    title: "Flood Susceptibility Mapping In San Antonio, Texas Using Multi-Criteria AHP-GIS Integration",
    venue: "International Geoscience and Remote Sensing Symposium (IGARSS 2026)",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -98.4936, lat: 29.4241, label: "IGARSS 2026 — San Antonio, Texas, USA" },
    link: null,
  },
  {
    authors: "Prantor, R., <strong>Mayukh, A. A.</strong>, Abid, R. N., Rimi, N. N., Sharaf, K., Fariha, Z., & Joy, R.",
    title: "Assessment Of Flood Susceptibility In Bangladesh: Integrating SPI Into A GIS-AHP Decision Framework",
    venue: "International Conference on Civil Engineering Research & Innovations 2025 (ICCEI 2025) (pp. 1370-1375)",
    year: 2025,
    status: "",
    location: { lng: 90.2000, lat: 23.6850, label: "ICCEI 2025 — Bangladesh" },
    link: "https://icceiruet.org/wp-content/uploads/2025/12/98_Camera-Ready-Final-Paper_ICCEI-2025.pdf",
  },
  {
    authors: "Nishat, M. H., Labib, A., Khan, N. M., Muntaha, S., & <strong>Mayukh, A. A.</strong>",
    title: "Challenges And Opportunities For Implementing Rooftop Solar In Dhaka’s Residential Sector",
    venue: "International Conference on Engineering Research, Innovation, and Education 2025 (ICERIE 2025) (pp. 239-245). Atlantis Press",
    year: 2025,
    status: "",
    location: { lng: 90.4125, lat: 23.8103, label: "ICERIE 2025 — Dhaka, Bangladesh" },
    link: "https://doi.org/10.2991/978-94-6463-884-4_29",
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, & Labib, A.",
    title: "A Decadal GIS-Based Analysis Of Turbidity Dynamics And Urban Expansion In The Buriganga River (2013–2023)",
    venue: "Poster Presentation Segment, Cennovation 2025, Dhaka, Bangladesh",
    year: 2025,
    status: "",
    location: { lng: 90.3800, lat: 23.6200, label: "Cennovation 2025 — Buriganga River, Dhaka, Bangladesh" },
    link: "https://www.researchgate.net/publication/398942866_A_Decadal_GIS-Based_Analysis_of_Turbidity_Dynamics_and_Urban_Expansion_in_the_Buriganga_River_2013-2023",
  },
];

const PROJECT_FILTERS = ["All", ...PROJECT_CATEGORIES] as const;

const TIMELINE = [
  {
    category: "professional",
    year: "Oct 2025 — Present",
    role: "Outside Plant Engineer — Civil Infrastructure (Remote)",
    org: "SKARION Engineering, Virginia, USA",
    orgUrl: "https://skarionengineering.com/",
    image: "/skarion_team.jpeg",
    bullets: [
      "Designed 400,000+ ft (500+ residential fiber deployments) of XGS-PON fiber networks, HLD/LLD packages and detailed BOMs.",
      "Delivered end-to-end OSP designs (aerial & underground) using ArcGIS Pro and AutoCAD, ensuring full compliance with NESC/NEC standards across projects in Williamson County, TX and North Carolina markets (Holly Springs, Greensboro).",
      "Mentored 25+ junior designers, cutting onboarding time by ~50% and improving overall team delivery efficiency."
    ],
  },
  {
    category: "professional",
    year: "Jan 2025 — Jun 2025",
    role: "CAD Specialist & Technology Research Coordinator (Contract)",
    org: "Micromaster Corporation, Dhaka, Bangladesh",
    orgUrl: "https://micromasterbd.com/",
    bullets: [
      "Developed 2D & 3D CAD models for aquaculture, water treatment, and ETP systems.",
      "Designed and studied fiberglass tanks, RAS, and IPRS technologies with precision.",
      "Optimized manufacturing drawings & BOM for cost-efficient production.",
      "Collaborated with engineers & technicians to refine system layouts.",
      "Ensured compliance with industry standards in water treatment design.",
      "Managed technical documentation & CAD data for streamlined workflows."
    ],
  },
  {
    category: "teaching-research",
    year: "Jan 2026 — Jun 2026",
    role: "Research Assistant (RA)",
    org: "North South University, Dhaka, Bangladesh",
    orgUrl: "https://www.northsouth.edu/",
    bullets: [
      "Collaborated with faculty at the Department of Civil and Environmental Engineering to develop course materials for the Advanced Foundation Analysis course, applying FEM-based numerical modeling to analyze soil–structure interaction and evaluate foundation performance under complex loading scenarios.",
      "Contributed to a review paper using a PRISMA-ScR-based scoping review on urban environmental infrastructure governance and a book chapter on sustainable construction materials, conducting large-scale literature synthesis (500+ sources) and supporting technical writing and content development."
    ],
  },
  {
    category: "teaching-research",
    year: "Jan 2025 — Present",
    role: "Instructor",
    org: "LEAD Academy, Dhaka, Bangladesh",
    orgUrl: "https://lead.academy/",
    bullets: [
      "Developed an AutoCAD course with 13 learning modules with 87 video lectures (9+ hours) with 30 quizzes and 4 final projects. <a href='https://lead.academy/course/autocad-from-scratch-2d-3d' target='_blank' rel='noopener' class='text-accent hover:underline'>Course Link</a> (Published on November, 2025)."
    ],
  },
  {
    category: "teaching-research",
    year: "Apr 2025 — Present",
    role: "AutoCAD Instructor",
    org: "Caturjo Architecture Academy, Chattogram, Bangladesh",
    orgUrl: "https://caturjosthapotto.com/",
    bullets: [
      "Delivered a structured 10-week (10+ hours) AutoCAD training program for industry professionals on civil engineering drafting practices in compliance with BNBC 2020 standards and provided learning materials accordingly.",
      "Trained 20 polytechnic graduate students, conducted live Q&A sessions and webinars."
    ],
  },
  {
    category: "teaching-research",
    year: "Nov 2023 — Oct 2025",
    role: "Chief Instructor: AutoCAD",
    org: "IUT CAD Society, Gazipur, Bangladesh",
    orgUrl: "https://www.facebook.com/iutcadsociety/",
    bullets: [
      "Taken live classes of a batch of over 30 undergrad students from various departments both online and offline.",
      "Made the question paper and managed 104 participants as the Head Organizer of the Drafting Contest in the Cennovation 2025."
    ],
  },
  {
    category: "internship",
    year: "Jun 2024 — Jul 2024",
    role: "Industrial Trainee",
    org: "DOHWA Engineering Co. Ltd., Dhaka, Bangladesh",
    orgUrl: "https://www.dohwa.co.kr/?lang=en",
    image: "/dohwa_internship.jpeg",
    bullets: [
      "Participated in 6 different heritage site restoration projects and construction site inspections inside Dhaka.",
      "Attended 2 interim workshops on coastal, water resource, and transportation engineering at Bangladesh Inland Water Transport Corporation (BIWTC) Headquarters and Roads and Highways Department (RHD).",
      "Used GIS for road network mapping and rural infrastructure planning through the ‘Western Economic Corridor & Regional Enhancement Program (WeCARE) Phase-I: Rural Connectivity, Market and Logistic Infrastructure Improvement Project’",
      "Used AutoCAD LISPs for soil cut-and-fill calculations and Excel for engineering data analysis."
    ],
  },
  {
    category: "internship",
    year: "Jul 2023 — Aug 2023",
    role: "Civil Engineering Intern",
    org: "Protiti. Architects & Engineers Ltd.",
    bullets: [
      "Gained practical knowledge and insights in Structural and Construction Engineering.",
      "Developed proficiency in creating and interpreting construction drawings.",
      "Enhanced client relations skills through direct interactions and project discussions.",
      "Conducted and participated in construction site inspections to ensure compliance with design specifications and safety standards.",
      "Improved AutoCAD skills, including drafting and designing structural elements.",
      "Learned to prepare and manage Bills of Quantities (BOQ) for various projects.",
      "Collaborated with experienced industry professionals, learning best practices and innovative techniques."
    ],
  },
];

const SKILL_GROUPS = [
  {
    group: "GIS & Remote Sensing",
    items: [
      { name: "ArcGIS Pro" },
      { name: "QGIS" },
      { name: "Google Earth Engine" },
    ],
  },
  {
    group: "Engineering & Design",
    items: [
      { name: "AutoCAD" },
      { name: "ETABS" },
      { name: "PLAXIS" },
    ],
  },
  {
    group: "Hydrological Modelling",
    items: [
      { name: "HEC-RAS" },
      { name: "EPANET" },
      { name: "eTank" },
      { name: "SWMM" },
    ],
  },
  {
    group: "Programming Languages",
    items: [
      { name: "Python", level: "Advanced" },
      { name: "C++", level: "Intermediate" },
      { name: "JavaScript", level: "Basic" },
    ],
  },
];

const SKILL_ICONS: Record<string, React.ComponentType> = {
  "ArcGIS Pro": ArcGISIcon,
  "QGIS": QGISIcon,
  "Google Earth Engine": GEEIcon,
  "AutoCAD": AutoCADIcon,
  "ETABS": ETABSIcon,
  "PLAXIS": PlaxisIcon,
  "HEC-RAS": HecRasIcon,
  "EPANET": EpanetIcon,
  "eTank": ETankIcon,
  "SWMM": SWMMIcon,
  "Python": PythonIcon,
  "C++": CPlusPlusIcon,
  "JavaScript": JavaScriptIcon,
};

const SKILL_IMAGES: Record<string, string> = {
  "ArcGIS Pro": "/images/skills/arcgis_pro.png",
  "QGIS": "/images/skills/qgis.png",
  "Google Earth Engine": "/images/skills/google_earth_engine.png",
  "AutoCAD": "/images/skills/autocad.png",
  "ETABS": "/images/skills/etabs.png",
  "PLAXIS": "/images/skills/plaxis.jpeg",
  "HEC-RAS": "/images/skills/hec_ras.jpeg",
  "EPANET": "/images/skills/epanet.png",
};

const EXTRACURRICULARS = [
  {
    role: "Expert Reviewer",
    org: "IPCC",
    period: "May 2026 - Jul 2026",
    category: "Environment",
    description: "Selected as an expert reviewer for the Second Order Draft of the IPCC Special Report on Climate Change and Cities (SRCITIES). Reviewed scientific, technical, and socio-economic content and provided expert comments to support the development of a balanced and policy-relevant climate assessment.",
  },
  {
    role: "Member of YLLC",
    org: "British Council",
    period: "Jan 2010 - Aug 2016",
    category: "Education",
    bullets: [
      "Engaged in a diverse and vibrant global network.",
      "Participated in cultural exchange activities.",
      "Enhanced language skills through dedicated programs.",
      "Accessed a wide range of educational resources.",
      "Collaborated in workshops to gain new skills.",
      "Attended events and discussions to broaden perspectives.",
      "Contributed to fostering cross-cultural understanding.",
      "Proudly part of a global community committed to development.",
    ],
  },
  {
    role: "Program Executive",
    org: "Space and Environment Research Center (SERC)",
    period: "Apr 2025 - Oct 2025",
    category: "Disaster Management",
    description: "SERC Disaster Management Program under the project No. SP-9/24 - 'Developing Space-Based Integrated Disaster Management System in Asia and the Pacific'. Used GIS and remote sensing based solutions to address climate change and disaster management.",
  },
  {
    role: "Field Scout",
    org: "Bangladesh Scouts",
    period: "Jan 2017 - Jan 2018",
    category: "Social Services",
  },
  {
    role: "Organizer",
    org: "Cennovation",
    period: "Jul 2025",
    category: "Event Planning",
    description: "Successfully organized the National Drafting Competition that had 75 teams (104 people) from different universities.",
  },
  {
    role: "Apprentice Artist",
    org: "Bangladesh Academy of Fine Arts",
    period: "2013 - 2017",
    category: "Arts and Culture",
  },

  {
    role: "Member",
    org: "IUT ITE Student Chapter",
    period: "2021 - Oct 2025",
    category: "Education",
  },
  {
    role: "Member",
    org: "IUT Debating Society",
    period: "2021 - Oct 2025",
    category: "Debate",
  },
  {
    role: "Campus Ambassador",
    org: "East West University Telecommunications Club",
    period: "Nov 2023 - Dec 2023",
    category: "Leadership",
  },
  {
    role: "Campus Ambassador",
    org: "Interactive Cares",
    period: "Apr 2023 - May 2023",
    category: "Education",
  },
  {
    role: "Member",
    org: "IUT Career & Business Society",
    period: "2021 - Oct 2025",
    category: "Professional Development",
  },
  {
    role: "Member",
    org: "ACI IUT Student Chapter",
    period: "Apr 2021 - Oct 2025",
    category: "Education",
  },
];

const CERTIFICATIONS = [
  {
    title: "GIS, Mapping, and Spatial Analysis Specialization",
    issuer: "University of Toronto",
    date: "Jan 2026",
    id: "AZB0W1PX3UDQ",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Geographic Information Systems (GIS) Specialization",
    issuer: "University of California, Davis",
    date: "Sep 2025",
    id: "19I0B2ED0QNE",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "GIS: Geographic Information Systems for Sustainability",
    issuer: "University of Michigan",
    date: "Feb 2025",
    id: "X7MRGBICR2Q3",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Google Project Management: Specialization",
    issuer: "Google",
    date: "Jan 2025",
    id: "USR15WDCD8IR",
    category: "Project Management & Leadership"
  },
  {
    title: "Geospatial Technology for Construction",
    issuer: "L&T EduTech",
    date: "Jan 2025",
    id: "2M4ULNKOY8T3",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Certified Supply Chain Analyst (CSCA)",
    issuer: "ISCEA - International Supply Chain Education Alliance",
    date: "Nov 2023",
    id: "2311192065",
    category: "Project Management & Leadership"
  },
  {
    title: "Remote Sensing Image Acquisition, Analysis and Applications",
    issuer: "UNSW",
    date: "Nov 2024",
    id: "F6MMXMEN6UF8",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "GIS Data Formats, Design and Quality",
    issuer: "University of California, Davis",
    date: "Nov 2024",
    id: "5EGFMIOLMKGT",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Geospatial Analysis with ArcGIS",
    issuer: "University of California, Davis",
    date: "Nov 2024",
    id: "M1J5CX8KMOIX",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "GIS Applications Across Industries",
    issuer: "University of California, Davis",
    date: "Nov 2024",
    id: "OGKEZ9V2LEJ0",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Exploring ArcGIS Pro: GIS Tutorials",
    issuer: "CADCIM Technologies",
    date: "Nov 2024",
    id: "UC-02a2721b-6015-4004-a80a-8b10c44fcc56",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Fundamentals of GIS",
    issuer: "University of California, Davis",
    date: "Oct 2024",
    id: "1EPMOYU3CQXK",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Telling Stories with GIS Maps",
    issuer: "Esri",
    date: "Dec 2024",
    id: "67550fee56773b14de50a7b4/-360",
    category: "Geospatial & Remote Sensing"
  },
  {
    title: "Data Analysis with Python Specialization",
    issuer: "University of Colorado Boulder",
    date: "Dec 2024",
    id: "2P3CL1GRPGOI",
    category: "Data Science, AI & Computing"
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "Nov 2024",
    id: "D7PYDD00PL09",
    category: "Data Science, AI & Computing"
  },
  {
    title: "Harnessing AI and Machine Learning for Geospatial Analysis",
    issuer: "Udemy",
    date: "Dec 2024",
    id: "UC-4a0a846d-3657-4120-bb0b-8cbbe4c1b695",
    category: "Data Science, AI & Computing"
  },
  {
    title: "Sustainability for Design, Construction, and Manufacturing",
    issuer: "Project Management Institute (PMI)",
    date: "Oct 2024",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Sustainable Construction Management",
    issuer: "University of Maryland",
    date: "Nov 2024",
    id: "IV8TFNFYW4KZ",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Sustainable Cities Specialization",
    issuer: "The Johns Hopkins University",
    date: "Nov 2024",
    id: "2OX1TX5JJHFY",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Life Cycle Assessment",
    issuer: "University of Michigan",
    date: "Oct 2024",
    id: "O9CBB5NYYG8E",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Slope Engineering",
    issuer: "The Hong Kong University of Science and Technology",
    date: "Oct 2024",
    id: "L8YQ7R8GDVTD",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Exploring AutoCAD Civil 3D (Basics to Advanced)",
    issuer: "CADCIM Technologies",
    date: "Dec 2024",
    id: "UC-d29872aa-6408-4eb8-90f9-ab0bba359928",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Exploring Autodesk Revit for Structure (BIM)",
    issuer: "CADCIM Technologies",
    date: "Dec 2024",
    id: "UC-d29872aa-6408-4eb8-90f9-ab0bba359928",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Water Resources Management and Policy",
    issuer: "University of Geneva",
    date: "Oct 2024",
    id: "PLQAJJA7KDC4",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "ETABS Essentials 2022",
    issuer: "ACI IUT Student Chapter",
    date: "Sep 2022",
    id: "ACIIUT.jpg",
    category: "Civil Engineering & Sustainability"
  },
  {
    title: "Project Management Specialization",
    issuer: "Politecnico di Milano",
    date: "Oct 2024",
    id: "GS7C7LHWC32U",
    category: "Project Management & Leadership"
  },
  {
    title: "Leading Teams: Developing as a Leader",
    issuer: "University of Illinois Urbana-Champaign",
    date: "Oct 2024",
    id: "PMUECLSVGEOF",
    category: "Project Management & Leadership"
  }
];

function InteractiveGISBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Grid spacing details
    const spacingX = 65;
    const spacingY = 60;
    const cols = Math.ceil(width / spacingX) + 1;
    const rows = Math.ceil(height / spacingY) + 1;
    const points: { x: number; y: number; ox: number; oy: number }[] = [];

    // Initialize grid points
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          x: c * spacingX,
          y: r * spacingY,
          ox: c * spacingX,
          oy: r * spacingY,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.004; // slow terrain wave animation
      const time = timeRef.current;

      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      const isDark = document.documentElement.classList.contains("dark");
      ctx.lineWidth = 0.65;
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 102, 204, 0.08)";

      // Warp points dynamically
      const maxWarpDist = 240;
      points.forEach((p) => {
        // Slow terrain waves undulation
        const terrainWave = Math.sin(p.ox * 0.005 + time) * 12 + Math.cos(p.oy * 0.004 + time * 1.5) * 8;
        const baseOffset = p.oy + terrainWave;

        const dx = mouse.x - p.ox;
        const dy = mouse.y - baseOffset;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxWarpDist) {
          const force = (maxWarpDist - dist) / maxWarpDist;
          const smoothForce = Math.sin(force * Math.PI / 2);
          
          // Warp Y-coordinate vertically
          p.y = baseOffset + smoothForce * 36;
          // Warp X-coordinate horizontally to create 3D perspective distortion
          p.x = p.ox + (p.ox - mouse.x) * force * 0.06;
        } else {
          p.y += (baseOffset - p.y) * 0.1;
          p.x += (p.ox - p.x) * 0.1;
        }
      });

      // Draw horizontal topographic mesh lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = points[idx];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw vertical mesh grid lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const p = points[idx];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw subtle intersection points
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(0, 102, 204, 0.24)";
      points.forEach((p, idx) => {
        if (idx % 3 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Subtle coordinates tracking badge in bottom left
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 102, 204, 0.4)";
        ctx.font = "8px monospace";
        const lat = (23.8103 + (mouse.y - height / 2) * 0.0001).toFixed(4);
        const lon = (90.4125 + (mouse.x - width / 2) * 0.0001).toFixed(4);
        ctx.fillText(`SYS_GRID: LAT ${lat}° N / LON ${lon}° E`, 24, height - 24);
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-background transition-colors duration-300">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}

/* ---------- Component ---------- */

function Portfolio() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min((window.scrollY / totalScroll) * 100, 100));
      }
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Highly-optimized delegated mousemove handler for the hover-glow border cards
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest(".glow-card") as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  useEffect(() => {
    const SELECTOR = [
      "section:not(#top) h2",
      "section:not(#top) h3",
      "section:not(#top) > div > p",
      "section:not(#top) .rounded-2xl",
      "section:not(#top) .rounded-xl",
      "section:not(#top) li",
      "section:not(#top) [data-anim]",
      "footer > *",
    ].join(",");

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    els.forEach((el, i) => {
      el.classList.add("anim-init");
      // light per-item stagger based on DOM order within its parent
      const idx = Array.from(el.parentElement?.children ?? []).indexOf(el);
      const delay = Math.min(idx, 8) * 70;
      el.style.transitionDelay = `${delay}ms`;
      void i;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("anim-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <InteractiveGISBackground />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Education />
        <Interests />
        <Publications />
        <GeospatialMethodologyVisualizer />
        <Projects />
        <Experience />
        <Skills />
        <Leadership />
        <Recommendations />
        <Contact />
        <Footer />
      </div>

      {/* Floating Circular Scroll to Top Indicator */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-2.5 rounded-full border border-border bg-card/90 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-9 h-9 transform -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15"
            className="stroke-muted/20 fill-none"
            strokeWidth="2.5"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            className="stroke-accent fill-none transition-all duration-300"
            strokeWidth="2.5"
            strokeDasharray="94.2"
            strokeDashoffset={94.2 - (94.2 * scrollProgress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="w-4 h-4 text-accent absolute transition-transform group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    // Sync initial state with document class list
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="font-display text-2xl leading-none">A.</span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase hidden sm:inline">
            Mayukh
          </span>
        </a>
        <nav className="hidden lg:flex items-center bg-card/90 border border-border backdrop-blur-lg rounded-full p-1 shadow-md gap-0.5">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-foreground/85 hover:text-foreground hover:bg-secondary/80 border border-transparent hover:border-border/40 transition-all duration-200 font-bold text-xs tracking-wide font-sans relative"
            >
              <n.icon className={`w-3.5 h-3.5 ${n.color} transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300`} />
              <span>{n.label}</span>
              
              {/* Sliding accent line */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-[60%] transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 p-1.5 rounded-full border-2 border-accent/30 bg-secondary/90 hover:bg-secondary hover:border-accent/60 transition-all duration-200 shadow-md shrink-0 scale-105"
            aria-label="Toggle visual theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div className={`p-1.5 rounded-full transition-all duration-300 ${theme === "light" ? "bg-background text-amber-500 shadow-sm scale-110" : "text-muted-foreground/50 hover:text-foreground/80"}`}>
              <Sun className="w-4 h-4" />
            </div>
            <div className={`p-1.5 rounded-full transition-all duration-300 ${theme === "dark" ? "bg-background text-indigo-400 shadow-sm scale-110" : "text-muted-foreground/50 hover:text-foreground/80"}`}>
              <Moon className="w-4 h-4" />
            </div>
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 text-sm border border-foreground/80 rounded-full px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors font-semibold"
          >
            Let's collaborate <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-12 overflow-hidden border-b border-border/20 bg-background/5">
      {/* Background Satellite Image Container with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/65 to-background z-10" />
        <img
          src="/satellite_hero.jpg"
          alt="Satellite coastal city view background"
          className="w-full h-full object-cover opacity-[0.25] dark:opacity-[0.16] scale-100 animate-footer-zoom"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8 hero-stage order-2 lg:order-1">

          <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-balance">
            Md Ali Ahnaf
            <br />
            Abid <em className="text-accent not-italic">Mayukh</em>
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Fresh graduate Civil &amp; Environmental Engineering specializing in <strong className="text-foreground font-semibold">Geospatial Data Analysis and CAD systems</strong>.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#publications"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm hover:bg-primary/90 transition-colors"
            >
              View Research <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-foreground/30 rounded-full px-5 py-2.5 text-sm hover:border-foreground transition-colors"
            >
              Explore Projects <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/Md-Ali-Ahnaf-Abid-Mayukh-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" /> Contact
            </a>
          </div>
        </div>

        {/* Profile picture and side card */}
        <div className="lg:col-span-4 lg:pl-6 order-1 lg:order-2 flex flex-col gap-6">
          <div className="relative">
          </div>
          <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm p-6 shadow-lg hover:border-accent/30 transition-colors duration-300">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-accent font-bold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Status &amp; Footprint
            </div>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                <div>
                  <div className="font-bold text-foreground">Outside Plant Engineer</div>
                  <div className="text-muted-foreground text-xs">SKARION Engineering</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-foreground">Former Research Assistant</div>
                  <div className="text-muted-foreground text-xs">North South University (NSU)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                <div>
                  <div className="font-bold text-foreground">Civil Engineering Alumnus</div>
                  <div className="text-muted-foreground text-xs">Islamic University of Technology (IUT)</div>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent" /> Dhaka, Bangladesh
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-accent" /> B.Sc. Civil Engineering (Oct 2025)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-20 border-y border-border bg-secondary/15 overflow-hidden py-5">
        <div className="flex gap-8 py-2 animate-marquee whitespace-nowrap font-display select-none hover:[animation-play-state:paused] cursor-pointer">
          {[...Array(3)].flatMap((_, i) =>
            [
              { label: "Geoenvironmental Engineering", icon: Mountain, color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
              { label: "GIS & Remote Sensing", icon: Satellite, color: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20" },
              { label: "Flood Risk Management", icon: CloudRain, color: "text-sky-600 bg-sky-500/10 border-sky-500/20" },
              { label: "Shoreline Dynamics", icon: Waves, color: "text-teal-600 bg-teal-500/10 border-teal-500/20" },
              { label: "GeoAI", icon: BrainCircuit, color: "text-rose-600 bg-rose-500/10 border-rose-500/20" },
              { label: "Disaster Management", icon: ShieldAlert, color: "text-red-600 bg-red-500/10 border-red-500/20" },
              { label: "Environmental Modelling", icon: Layers, color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
            ].map(({ label, icon: Icon, color }, j) => (
              <span
                key={`${i}-${j}`}
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full border border-border bg-card shadow-md hover:border-accent/50 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <span className={`p-1.5 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-foreground font-medium text-base tracking-wide">{label}</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="pt-12 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="01 · About" title="About me" />
        <div ref={ref} className="reveal grid lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent blur-md opacity-30" />
              <img
                src="/profile.jpeg"
                alt="Profile picture of Md Ali Ahnaf Abid Mayukh"
                className="relative w-full aspect-[4/5] rounded-2xl object-cover border-4 border-card shadow-lg"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg text-pretty text-foreground/85 leading-relaxed order-1 lg:order-2">
            <p>
              I am a civil engineer and researcher dedicated to understanding and addressing environmental hazards. My research focus lies at the intersection of <strong className="text-foreground font-semibold">geospatial data science (GIS &amp; Remote Sensing), hydrodynamic modeling, and geoenvironmental engineering</strong>, with a focus on building resilient systems for disaster mitigation and sustainable infrastructure.
            </p>
            <p>
              From analyzing long-term shoreline dynamics and urban stormwater grids to conducting soil-structure stabilization studies, I enjoy bridging the gap between theoretical research and practical infrastructure engineering. By integrating data-driven insights with physical modeling, my goal is to design solutions that adapt to changing climatic patterns and protect vulnerable communities.
            </p>
            <p>
              Beyond research, I have experience designing telecommunication networks and instructing hundreds of professionals and students in structural CAD modeling. I am motivated by a commitment to lifelong learning, collaborative science, and translating complex environmental data into policy-actionable solutions.
            </p>
          </div>
        </div>

        <Stats />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="mt-20 grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto border-y border-border"
    >
      {STATS.map((s, i) => (
        <Stat key={i} {...s} start={inView} />
      ))}
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
  start,
  compact,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  compact?: boolean;
}) {
  const v = useCountUp(value, start);
  const display = compact
    ? v >= 1000
      ? `${(v / 1000).toFixed(0)}k`
      : v.toString()
    : v.toLocaleString();
  return (
    <div className="p-6 lg:p-8 text-center border-border border-b [&:nth-last-child(-n+2)]:border-b-0 md:border-b-0 odd:border-r md:odd:border-r-0 md:[&:not(:last-child)]:border-r">
      <div className="font-display text-4xl lg:text-5xl tracking-tight">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ---------- Interests ---------- */

function Interests() {
  const ref = useReveal<HTMLDivElement>();

  const renderCardAnimation = (label: string) => {
    switch (label) {
      case "Geoenvironmental Engineering":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="absolute top-4 right-4 w-24 h-24 text-amber-500">
              {/* Embankment Cross-section */}
              <path d="M 10 80 L 40 35 L 70 35 L 90 80 Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
              {/* Stabilized Soil Core (Polymer block) */}
              <rect x="45" y="35" width="12" height="45" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
              {/* Seepage Flow Lines (blocked by core) */}
              <path d="M 0 60 Q 25 62 45 78" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" className="animate-polymer-flow" />
              <path d="M 0 70 Q 25 71 45 79" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" className="animate-polymer-flow" style={{ animationDelay: "0.8s" }} />
              {/* Deflection arrow */}
              <path d="M 45 78 L 48 80 L 45 82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        );
      case "GIS & Remote Sensing":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 200 200" className="absolute top-4 right-4 w-28 h-28 text-indigo-500">
              <path d="M 40 100 A 60 60 0 1 1 160 100 A 60 60 0 1 1 40 100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="opacity-40" />
              <g className="animate-satellite-orbit" style={{ transformOrigin: "100px 100px" }}>
                <rect x="90" y="34" width="20" height="12" rx="2" fill="currentColor" />
                <rect x="75" y="38" width="15" height="4" fill="currentColor" opacity="0.8" />
                <rect x="110" y="38" width="15" height="4" fill="currentColor" opacity="0.8" />
                <path d="M 100 46 L 80 100 L 120 100 Z" fill="url(#sat-gradient)" opacity="0.18" />
              </g>
              <defs>
                <linearGradient id="sat-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case "Flood Risk Management":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="absolute right-4 bottom-4 w-24 h-24 text-sky-500">
              {/* House 1 (Left, small) */}
              <g opacity="0.6">
                <polygon points="15,55 30,40 45,55" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="18" y="55" width="24" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="27" y="65" width="6" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
              </g>
              {/* House 2 (Right, large) */}
              <g opacity="0.8">
                <polygon points="45,45 65,25 85,45" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="50" y="45" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="62" y="60" width="8" height="15" fill="none" stroke="currentColor" strokeWidth="1" />
              </g>
              {/* Inundating flood water level */}
              <g className="animate-flood-inundate">
                <path d="M 0 58 Q 25 54 50 60 T 100 58 L 100 100 L 0 100 Z" fill="currentColor" opacity="0.3" />
                <path d="M 0 58 Q 25 54 50 60 T 100 58" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        );
      case "Shoreline Dynamics":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="absolute right-4 bottom-4 w-24 h-24 text-teal-500">
              <path d="M 0 0 L 30 0 Q 45 40 25 75 T 35 100 L 0 100 Z" fill="currentColor" opacity="0.15" className="animate-coastline-shift" />
              <path d="M 30 0 Q 45 40 25 75 T 35 100" fill="none" stroke="currentColor" strokeWidth="2" className="animate-coastline-line" />
              <text x="50" y="15" textAnchor="middle" className="font-mono text-[7px] font-extrabold fill-rose-500 animate-erosion-tag pointer-events-none">EROSION</text>
              <text x="50" y="15" textAnchor="middle" className="font-mono text-[7px] font-extrabold fill-emerald-500 animate-deposition-tag pointer-events-none">ACCRETION</text>
            </svg>
          </div>
        );
      case "GeoAI":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="absolute right-4 bottom-4 w-24 h-24 text-rose-500">
              <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="80" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="50" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="20" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
              <line x1="80" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
              <circle cx="20" cy="20" r="3.5" fill="currentColor" className="animate-node-pulse" />
              <circle cx="80" cy="20" r="3.5" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.5s" }} />
              <circle cx="50" cy="50" r="5.5" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "1s" }} />
              <circle cx="50" cy="80" r="3.5" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "1.5s" }} />
            </svg>
          </div>
        );
      case "Disaster Management":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="absolute top-4 right-4 w-24 h-24 text-red-500">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5,1.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.4" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
              <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="1.5" className="animate-radar-sweep" style={{ transformOrigin: "50px 50px" }} />
            </svg>
          </div>
        );
      case "Environmental Modelling":
        return (
          <div style={{ position: "absolute", zIndex: 1, inset: 0, pointerEvents: "none" }} className="hover-anim overflow-hidden opacity-0 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="absolute right-4 bottom-4 w-24 h-24 text-emerald-500">
              {/* Drainage Network Pipes/Channels */}
              <line x1="15" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.25" />
              <line x1="85" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.25" />
              <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
              {/* Flowing Water Pulses */}
              <line x1="15" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" className="animate-drainage-flow" />
              <line x1="85" y1="20" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" className="animate-drainage-flow" style={{ animationDelay: "0.5s" }} />
              <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6,6" className="animate-drainage-flow" />
              {/* Junction Nodes */}
              <circle cx="15" cy="20" r="3" fill="currentColor" className="animate-node-pulse" />
              <circle cx="85" cy="20" r="3" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.5s" }} />
              <circle cx="50" cy="40" r="4.5" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.2s" }} />
              <circle cx="50" cy="80" r="4" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.8s" }} />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="research" className="py-16 bg-secondary/30 relative overflow-hidden border-y border-border/50">
      <style dangerouslySetInnerHTML={{ __html: `
        .glow-card:hover .hover-anim {
          opacity: 0.35 !important;
        }
        @keyframes satellite-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-satellite-orbit {
          animation: satellite-orbit 14s linear infinite;
        }
        @keyframes wave-flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave-flow {
          animation: wave-flow 6s linear infinite;
        }
        @keyframes rain-fall {
          0% { transform: translateY(-20px); opacity: 0; }
          40% { opacity: 0.7; }
          100% { transform: translateY(160px); opacity: 0; }
        }
        .animate-rain-1 { animation: rain-fall 1.7s linear infinite; }
        .animate-rain-2 { animation: rain-fall 2.1s linear infinite; animation-delay: 0.5s; }
        .animate-rain-3 { animation: rain-fall 1.4s linear infinite; animation-delay: 0.9s; }
        
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.15); opacity: 0.85; }
        }
        .animate-node-pulse {
          animation: pulse-node 2.2s ease-in-out infinite;
        }
        
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-sweep {
          animation: radar-sweep 6s linear infinite;
        }
        
        @keyframes strata-slide {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        .animate-strata-slide {
          animation: strata-slide 3.5s ease-in-out infinite;
        }
        @keyframes polymer-flow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-polymer-flow {
          animation: polymer-flow 3s linear infinite;
        }
        @keyframes drainage-flow {
          0% { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-drainage-flow {
          animation: drainage-flow 1.5s linear infinite;
        }
        @keyframes coastline-shift {
          0%, 100% { transform: translateX(0); }
          35% { transform: translateX(-8px); fill: #f43f5e; }
          70% { transform: translateX(12px); fill: #10b981; }
        }
        .animate-coastline-shift {
          animation: coastline-shift 6s ease-in-out infinite;
        }
        @keyframes coastline-line {
          0%, 100% { transform: translateX(0); stroke: #2dd4bf; }
          35% { transform: translateX(-8px); stroke: #f43f5e; }
          70% { transform: translateX(12px); stroke: #10b981; }
        }
        .animate-coastline-line {
          animation: coastline-line 6s ease-in-out infinite;
        }
        @keyframes erosion-tag {
          0%, 70%, 100% { opacity: 0; }
          35% { opacity: 1; }
        }
        .animate-erosion-tag {
          animation: erosion-tag 6s ease-in-out infinite;
        }
        @keyframes deposition-tag {
          0%, 35%, 100% { opacity: 0; }
          70% { opacity: 1; }
        }
        .animate-deposition-tag {
          animation: deposition-tag 6s ease-in-out infinite;
        }
        @keyframes flood-inundate {
          0%, 100% { transform: translateY(22px); }
          50% { transform: translateY(0px); }
        }
        .animate-flood-inundate {
          animation: flood-inundate 5s ease-in-out infinite;
        }
      `}} />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="03a · Research interests" title="Research interests" />
        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {INTERESTS.map(({ icon: Icon, label, description, theme }, i) => (
            <div
              key={label}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={`group glow-card relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${theme.bg} ${theme.border} ${theme.shadow} overflow-hidden`}
            >
              {renderCardAnimation(label)}
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${theme.iconBg}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className={`font-display text-lg font-bold text-foreground leading-snug transition-colors ${theme.text}`}>
                  {label}
                </h3>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-sans font-medium">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Publications ---------- */

function getBibtex(pub: { title: string; authors: string; venue: string; year: number }, type: "journal" | "conference") {
  const cleanAuthors = pub.authors.replace(/<\/?strong>/g, ""); // strip HTML tags
  const firstAuthorLast = cleanAuthors.split(",")[0].trim().split(" ").pop() ?? "Mayukh";
  const citeKey = `${firstAuthorLast.toLowerCase()}${pub.year}${pub.title.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  
  if (type === "journal") {
    return `@article{${citeKey},
  author    = {${cleanAuthors.replace(/&amp;/g, "and").replace(/,/g, " and")}},
  title     = {${pub.title}},
  journal   = {${pub.venue.split(".")[0].trim()}},
  year      = {${pub.year}},
  note      = {${pub.venue}}
}`;
  } else {
    return `@inproceedings{${citeKey},
  author    = {${cleanAuthors.replace(/&amp;/g, "and").replace(/,/g, " and")}},
  title     = {${pub.title}},
  booktitle = {${pub.venue}},
  year      = {${pub.year}}
}`;
  }
}

function Publications() {
  const [tab, setTab] = useState<"journal" | "conference">("journal");
  const [openCiteIndex, setOpenCiteIndex] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, indexKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(indexKey);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <section id="publications" className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="03b · Publications" title="Selected publications" />
        <div className="mt-10 flex items-center gap-2 border-b border-border">
          {(
            [
              ["journal", `Journal Papers (${JOURNAL.length})`],
              ["conference", `Conference Papers (${CONFERENCE.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setOpenCiteIndex(null);
              }}
              className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                tab === key
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 divide-y divide-border">
          {tab === "journal"
            ? JOURNAL.map((p, i) => (
                <article
                  key={i}
                  className="group grid md:grid-cols-12 gap-4 py-8 hover:bg-secondary/30 transition-all duration-300 px-6 -mx-6 rounded-xl"
                >
                  <div className="md:col-span-1 font-mono text-base text-accent font-bold">
                    {p.year}
                  </div>
                  <div className="md:col-span-8 space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shrink-0">
                        Peer-Reviewed Journal
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-snug text-foreground group-hover:text-accent transition-colors tracking-tight">
                      {p.title}
                    </h3>
                    <p
                      className="text-base text-foreground/90 font-medium font-sans leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: p.authors }}
                    />
                    <p className="text-sm text-muted-foreground italic font-sans leading-relaxed">
                      {p.venue}
                    </p>
                  </div>
                  <div className="md:col-span-3 md:text-right flex flex-wrap gap-2 items-start md:justify-end">
                    <button
                      onClick={() => setOpenCiteIndex(openCiteIndex === `journal-${i}` ? null : `journal-${i}`)}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        openCiteIndex === `journal-${i}`
                          ? "bg-accent/15 text-accent border-accent/40 animate-pulse"
                          : "text-muted-foreground hover:text-accent border-border bg-card hover:bg-accent/5"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Cite
                    </button>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-accent border border-border bg-card hover:bg-accent/5 px-3 py-1.5 rounded-lg transition-all duration-200"
                      >
                        {p.link.includes("doi.org") ? "DOI Link" : "View Paper"}{" "}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {openCiteIndex === `journal-${i}` && (
                    <div className="md:col-span-12 mt-4 p-4 rounded-xl bg-card border border-border/80 text-left relative group">
                      <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">BibTeX Citation</span>
                        <button
                          onClick={() => handleCopy(getBibtex(p, "journal"), `journal-${i}`)}
                          className="text-[10px] uppercase font-mono font-bold tracking-wider text-accent hover:underline flex items-center gap-1"
                        >
                          {copiedIndex === `journal-${i}` ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="text-xs text-foreground/85 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                        {getBibtex(p, "journal")}
                      </pre>
                    </div>
                  )}
                </article>
              ))
            : CONFERENCE.map((p, i) => (
                <article
                  key={i}
                  className="group grid md:grid-cols-12 gap-4 py-8 hover:bg-secondary/30 transition-all duration-300 px-6 -mx-6 rounded-xl"
                >
                  <div className="md:col-span-1 font-mono text-base text-accent font-bold">
                    {p.year}
                  </div>
                  <div className="md:col-span-8 space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0">
                        {p.venue}
                      </span>
                      {p.status && (
                        <span className="inline-flex items-center text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 shrink-0">
                          {p.status.replace("[", "").replace("]", "")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold leading-snug text-foreground group-hover:text-accent transition-colors tracking-tight">
                      {p.title}
                    </h3>
                    <p
                      className="text-base text-foreground/90 font-medium font-sans leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: p.authors }}
                    />
                    <p className="text-sm text-muted-foreground italic font-sans leading-relaxed">
                      {p.venue} ({p.year})
                    </p>
                  </div>
                  <div className="md:col-span-3 md:text-right flex flex-wrap gap-2 items-start md:justify-end">
                    <button
                      onClick={() => setOpenCiteIndex(openCiteIndex === `conf-${i}` ? null : `conf-${i}`)}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        openCiteIndex === `conf-${i}`
                          ? "bg-accent/15 text-accent border-accent/40 animate-pulse"
                          : "text-muted-foreground hover:text-accent border-border bg-card hover:bg-accent/5"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Cite
                    </button>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-accent border border-border bg-card hover:bg-accent/5 px-3 py-1.5 rounded-lg transition-all duration-200"
                      >
                        {p.link.includes("doi.org") ? "DOI Link" : "View Paper"}{" "}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {openCiteIndex === `conf-${i}` && (
                    <div className="md:col-span-12 mt-4 p-4 rounded-xl bg-card border border-border/80 text-left relative group">
                      <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">BibTeX Citation</span>
                        <button
                          onClick={() => handleCopy(getBibtex(p, "conference"), `conf-${i}`)}
                          className="text-[10px] uppercase font-mono font-bold tracking-wider text-accent hover:underline flex items-center gap-1"
                        >
                          {copiedIndex === `conf-${i}` ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="text-xs text-foreground/85 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                        {getBibtex(p, "conference")}
                      </pre>
                    </div>
                  )}
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const [showAll, setShowAll] = useState(false);

  const groupedProjects = PROJECT_CATEGORIES.map((category) => ({
    category,
    projects: PROJECTS.filter((project) => project.category === category),
  }));

  const sections =
    filter === "All"
      ? groupedProjects
      : groupedProjects.filter(({ category }) => category === filter);

  const filterOptions = PROJECT_FILTERS.map((value) => ({
    value,
    count:
      value === "All"
        ? PROJECTS.length
        : groupedProjects.find(({ category }) => category === value)?.projects.length ?? 0,
  }));

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
    setShowAll(false);
  };

  return (
    <section id="projects" className="py-16 bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeader eyebrow="05 · Projects" title="Featured projects" />
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-4 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          >
            Detailed showcase <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* World map */}
        <WorldMap />

        <div className="mt-12 flex flex-wrap gap-2">
          {filterOptions.map(({ value, count }) => (
            <button
              key={value}
              onClick={() => handleFilterChange(value)}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                filter === value
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
              }`}
            >
              {value} ({count})
            </button>
          ))}
        </div>

        <div className="mt-8">
          {filter === "All" ? (
            // Render all projects in a single grid without category headers
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROJECTS.slice(0, showAll ? PROJECTS.length : 6).map((p) => (
                  <Link
                    key={p.title}
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="group glow-card relative rounded-2xl border border-border bg-card p-6 hover:border-accent/60 transition-all hover:-translate-y-1 duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                      </div>
                      <div className="rounded-full p-1 text-muted-foreground hover:text-accent transition-colors">
                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-all" />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl leading-tight mt-5">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground flex-1">{p.desc}</p>
                    <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono text-foreground/70 bg-secondary px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {PROJECTS.length > 6 && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/35 px-6 py-3 text-sm font-semibold hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02]"
                  >
                    {showAll ? (
                      <>Show Less Projects</>
                    ) : (
                      <>View All {PROJECTS.length} Projects</>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Render projects grouped by category with headers
            <div className="space-y-10">
              {sections.map(({ category, projects }) => (
                <div key={category} className="space-y-8">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl">{category}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {projects.length} project{projects.length === 1 ? "" : "s"} showcased in this track.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.slice(0, showAll ? projects.length : 6).map((p) => (
                      <Link
                        key={p.title}
                        to="/projects/$slug"
                        params={{ slug: p.slug }}
                        className="group glow-card relative rounded-2xl border border-border bg-card p-6 hover:border-accent/60 transition-all hover:-translate-y-1 duration-300 flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5 rounded-full">
                              {p.category}
                            </span>
                          </div>
                          <div className="rounded-full p-1 text-muted-foreground hover:text-accent transition-colors">
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-all" />
                          </div>
                        </div>
                        <h3 className="font-display text-2xl leading-tight mt-5">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground flex-1">{p.desc}</p>
                        <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono text-foreground/70 bg-secondary px-2 py-1 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {projects.length > 6 && (
                    <div className="flex justify-center mt-10">
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="inline-flex items-center gap-2 rounded-full border border-foreground/35 px-6 py-3 text-sm font-semibold hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02]"
                      >
                        {showAll ? (
                          <>Show Less Projects</>
                        ) : (
                          <>View All {projects.length} Projects</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WorldMap() {
  const locationMap = new Map<string, { lng: number; lat: number; label: string; image?: string; projects?: { title: string; url: string | null }[]; journalPublications?: { title: string; url: string | null }[]; conferencePublications?: { title: string; url: string | null }[] }>();

  // Add project points — link to internal detail page
  PROJECTS.forEach((project) => {
    if (!project.location) return;

    const key = `${project.location.lng}-${project.location.lat}`;
    const existing = locationMap.get(key);
    const item = { title: project.title, url: `/projects/${project.slug}` };

    if (existing) {
      existing.projects = [...(existing.projects || []), item];
    } else {
      locationMap.set(key, {
        ...project.location,
        image: PROJECT_IMAGE_URLS[project.slug],
        projects: [item],
      });
    }
  });

  // Add publication points from JOURNAL (amber markers) — link to external DOI/PDF
  JOURNAL.forEach((pub) => {
    if (!("location" in pub) || !pub.location) return;

    const key = `${pub.location.lng}-${pub.location.lat}`;
    const existing = locationMap.get(key);
    const item = { title: pub.title, url: pub.link ?? null };

    if (existing) {
      existing.journalPublications = [...(existing.journalPublications || []), item];
    } else {
      locationMap.set(key, {
        ...pub.location,
        journalPublications: [item],
      });
    }
  });

  // Add publication points from CONFERENCE (rose markers) — link to external DOI/PDF
  CONFERENCE.forEach((pub) => {
    if (!("location" in pub) || !pub.location) return;

    const key = `${pub.location.lng}-${pub.location.lat}`;
    const existing = locationMap.get(key);
    const item = { title: pub.title, url: pub.link ?? null };

    if (existing) {
      existing.conferencePublications = [...(existing.conferencePublications || []), item];
    } else {
      locationMap.set(key, {
        ...pub.location,
        conferencePublications: [item],
      });
    }
  });

  const points = Array.from(locationMap.values());

  return (
    <div className="mt-12 relative rounded-2xl border border-border bg-card overflow-hidden">
      <div className="absolute top-4 left-4 z-10 text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-border">
        <Satellite className="w-3.5 h-3.5 text-accent" />
        Project &amp; publication locations
      </div>
      <div className="relative aspect-[2/1] min-h-[420px]">
        <ProjectMap points={points} />
      </div>
    </div>
  );
}


/* ---------- Experience ---------- */

function Experience() {
  const ref = useReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<"all" | "professional" | "teaching-research" | "internship">("all");

  const filteredTimeline = TIMELINE.filter(
    (t) => activeTab === "all" || t.category === activeTab
  );

  return (
    <section id="experience" className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="06 · Experience"
          title="Professional Experience"
        />

        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border">
          {(
            [
              ["all", "All Experience"],
              ["professional", "Professional"],
              ["teaching-research", "Teaching & Research"],
              ["internship", "Internships"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-3 text-sm transition-colors border-b-2 -mb-px ${
                activeTab === key
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div ref={ref} className="reveal mt-14 relative">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {filteredTimeline.map((t, i) => {
              return (
                <div
                  key={i}
                  className={`group relative md:grid md:grid-cols-2 md:gap-12 p-6 rounded-2xl border border-transparent hover:bg-card/75 hover:border-border/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:backdrop-blur-sm transition-all duration-300 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Timeline Node Icon */}
                  <div className="absolute left-3 md:left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border border-border bg-background transition-all duration-300 z-10 group-hover:bg-accent group-hover:border-accent group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(251,113,133,0.7)]" />
                  
                  {/* Left Column */}
                  <div className="pl-10 md:pl-0 md:pr-10 md:text-right flex flex-col justify-start pt-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {t.year}
                    </div>
                    <h3 className="font-display text-2xl mt-2 font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                      {t.role}
                    </h3>
                    <div className="text-sm text-foreground/75 font-medium mt-1">
                      {t.orgUrl ? (
                        <a
                          href={t.orgUrl}
                          target="_blank"
                          rel="noopener"
                          className="hover:text-accent transition-colors underline decoration-border hover:decoration-accent"
                        >
                          {t.org}
                        </a>
                      ) : (
                        t.org
                      )}
                    </div>
                  </div>

                  {/* Right Column (Duties / Achievements) */}
                  <div className="pl-10 md:pl-0 flex flex-col justify-start">
                    <ul className="space-y-3 text-sm text-foreground/80 leading-relaxed font-sans font-medium">
                      {t.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-accent shrink-0 font-extrabold">•</span>
                          <span dangerouslySetInnerHTML={{ __html: b }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Gallery - Big pictures underneath experience */}
        <div className="mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
              Professional Collaboration &amp; Fieldwork
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SKARION Card */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/skarion_team.jpeg"
                  alt="SKARION Engineering Design Team"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">SKARION Engineering</div>
                <h4 className="font-display text-base font-bold text-foreground">Design Team</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Collaborative workshop with engineering peers and Director of Engineering, Al Saki focusing on infrastructure route optimization.
                </p>
              </div>
            </div>

            {/* DOHWA Card 1 */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/dohwa_internship.jpeg"
                  alt="DOHWA Engineering Internship Cohort"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">DOHWA Engineering Co. Ltd.</div>
                <h4 className="font-display text-base font-bold text-foreground">Internship Cohort</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Inside DOHWA's Dhaka office with Jinha Bok, Deputy General Manager / Global Marketing.
                </p>
              </div>
            </div>

            {/* DOHWA Card 2 */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/dohwa_certificate.jpeg"
                  alt="DOHWA Engineering Certificate Presentation"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">DOHWA Engineering Co. Ltd.</div>
                <h4 className="font-display text-base font-bold text-foreground">Certificate Presentation</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Receiving the industrial training certification from Hong, Jong Wook, Bangladesh Country Director.
                </p>
              </div>
            </div>

            {/* DOHWA Card 3 */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/dohwa_farewell.jpeg"
                  alt="DOHWA Engineering Farewell Group Picture"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">DOHWA Engineering Co. Ltd.</div>
                <h4 className="font-display text-base font-bold text-foreground">Farewell Group Photo</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Farewell day group picture with Rozina Khanam, General Manager.
                </p>
              </div>
            </div>

            {/* DOHWA / BIWTC Workshop Card */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/biwtc_workshop.jpeg"
                  alt="Interim workshops at Bangladesh Inland Water Transport Corporation Headquarters"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">DOHWA Engineering Co. Ltd.</div>
                <h4 className="font-display text-base font-bold text-foreground">BIWTC Headquarters Workshop</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Participated in interim technical workshops and project presentations at the Bangladesh Inland Water Transport Corporation (BIWTC) Headquarters during the DOHWA Internship.
                </p>
              </div>
            </div>

            {/* Laalkuthi Site Card */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/laalkuthi_inspection.jpeg"
                  alt="Laalkuthi heritage site restoration and construction inspections"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">DOHWA Engineering Co. Ltd.</div>
                <h4 className="font-display text-base font-bold text-foreground">Laalkuthi Restoration Project</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Conducted on-site construction safety inspections and structural survey reviews at the historic Laalkuthi heritage restoration site in Old Dhaka as a part of the DOHWA Internship with the DOHWA Team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */

function Education() {
  const [activeCertTab, setActiveCertTab] = useState<
    | "All"
    | "Geospatial & Remote Sensing"
    | "Data Science, AI & Computing"
    | "Civil Engineering & Sustainability"
    | "Project Management & Leadership"
  >("All");

  const filteredCerts = activeCertTab === "All"
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === activeCertTab);

  return (
    <section id="education" className="py-20 relative overflow-hidden border-b border-border/50 bg-secondary/10">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Left Column: Title */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <SectionHeader eyebrow="02 · Education" title="Academic foundation" />
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Standardized test scores, academic credentials, and professional certifications at the intersection of civil mechanics, geomorphology, and computational systems.
          </p>
        </div>

        {/* Right Column: Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Degree and Thesis Card */}
          <div className="p-6 rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-md hover:border-accent/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors" />
            
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Islamic University of Technology (IUT)
                  </h3>
                  <p className="text-sm text-accent font-bold mt-0.5 flex items-center gap-1.5">
                    B.Sc. in Civil Engineering
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                <span className="font-mono text-[10px] text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border/60 font-bold uppercase tracking-wider text-center">
                  Jun 2021 — Oct 2025
                </span>
                <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-wider text-center">
                  Conferred Oct 2025
                </span>
              </div>
            </div>

            <div className="mt-5 text-sm md:text-base text-foreground/80 leading-relaxed pl-0 sm:pl-16">
              Concentration: <strong className="text-foreground font-semibold">Geoenvironmental Engineering</strong> · CGPA <span className="bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md font-mono text-accent font-bold text-sm">3.09 / 4.00</span>
            </div>

            {/* Thesis Card */}
            <div className="mt-6 rounded-xl border border-border/50 p-5 bg-secondary/15 relative pl-5 sm:pl-16 text-left">
              <div className="absolute left-5 top-5 text-accent hidden sm:block">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold mb-2">
                Undergraduate Thesis
              </div>
              <p className="font-display text-base md:text-lg font-bold text-foreground leading-snug">
                Experimental Study on Seepage Control in Sand Embankments Stabilized with Sodium Lignosulfonate and Supplementary Polymers
              </p>
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                <span>Supervisor:</span>
                <span className="text-foreground/80 font-semibold bg-secondary/40 px-2 py-0.5 rounded">Prof. Dr. Hossain Md. Shahin</span>
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-foreground/80 leading-relaxed border-t border-border/20 pt-4 pl-1">
                <li className="flex gap-2">
                  <span className="text-accent shrink-0 font-bold">▪</span>
                  <span><strong>Soil Characterization:</strong> Tested local sandy soil sample containing <strong>95.81% sand</strong> with a specific gravity of <strong>2.71</strong> and baseline coefficient of permeability of <strong>0.0088 cm/sec</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0 font-bold">▪</span>
                  <span><strong>UCS Strength Enhancement:</strong> Sourced Sodium Lignosulfonate (SLS), SB-95 (sodium silicate-based), and TX-95 (polymer-based) stabilizers. Curing for 21 days with <strong>5% SLS + 10% SB-95 &amp; TX-95</strong> achieved a peak compressive strength of <strong>108.57 kPa</strong>, representing a 25% improvement over SLS-only treatment (87.2 kPa).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0 font-bold">▪</span>
                  <span><strong>Seepage &amp; Permeability Reduction:</strong> Conducted constant-head tests showing a <strong>30-fold reduction in coefficient of permeability</strong> (from <strong>6 &times; 10⁻³ cm/s</strong> down to <strong>2 &times; 10⁻⁴ cm/s</strong>), demonstrating strong polymeric film encapsulation and resistance to piping failure.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Standardized Tests Card */}
          <div className="p-6 rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-md hover:border-accent/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors" />
            
            <h3 className="font-display text-xl font-bold text-foreground mb-6 pb-3 border-b border-border/60 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Standardized Test Scores
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* GRE Card */}
              <div className="border border-border/50 rounded-xl p-5 bg-secondary/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-base font-extrabold font-display text-foreground">GRE General Test</span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold font-mono text-accent bg-accent/10 px-3 py-1 rounded-md border border-accent/25">312</span>
                    </div>
                  </div>
                  
                  {/* Circular Score Rings Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {/* Quant */}
                    <div className="flex flex-col items-center bg-card/40 border border-border/40 rounded-xl p-3">
                      <div className="relative w-16 h-16 flex items-center justify-center mt-1">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="24" className="stroke-secondary/30" strokeWidth="3" fill="transparent" />
                          <circle cx="32" cy="32" r="24" className="stroke-accent" strokeWidth="3" fill="transparent" strokeDasharray="150.8" strokeDashoffset={150.8 - (71 / 100) * 150.8} strokeLinecap="round" />
                        </svg>
                        <div className="absolute font-mono text-sm font-extrabold text-foreground">161</div>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold mt-3">Quant</span>
                      <span className="text-[10px] font-mono text-accent/90 font-bold">71st percentile</span>
                    </div>

                    {/* Verbal */}
                    <div className="flex flex-col items-center bg-card/40 border border-border/40 rounded-xl p-3">
                      <div className="relative w-16 h-16 flex items-center justify-center mt-1">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="24" className="stroke-secondary/30" strokeWidth="3" fill="transparent" />
                          <circle cx="32" cy="32" r="24" className="stroke-accent" strokeWidth="3" fill="transparent" strokeDasharray="150.8" strokeDashoffset={150.8 - (49 / 100) * 150.8} strokeLinecap="round" />
                        </svg>
                        <div className="absolute font-mono text-sm font-extrabold text-foreground">151</div>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold mt-3">Verbal</span>
                      <span className="text-[10px] font-mono text-accent/90 font-bold">49th percentile</span>
                    </div>

                    {/* AWA */}
                    <div className="flex flex-col items-center bg-card/40 border border-border/40 rounded-xl p-3">
                      <div className="relative w-16 h-16 flex items-center justify-center mt-1">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="24" className="stroke-secondary/30" strokeWidth="3" fill="transparent" />
                          <circle cx="32" cy="32" r="24" className="stroke-accent" strokeWidth="3" fill="transparent" strokeDasharray="150.8" strokeDashoffset={150.8 - (37 / 100) * 150.8} strokeLinecap="round" />
                        </svg>
                        <div className="absolute font-mono text-sm font-extrabold text-foreground">3.5</div>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold mt-3">AWA</span>
                      <span className="text-[10px] font-mono text-accent/90 font-bold">37th percentile</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* IELTS Card */}
              <div className="border border-border/50 rounded-xl p-5 bg-secondary/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-base font-extrabold font-display text-foreground">IELTS Academic</span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold font-mono text-accent bg-accent/10 px-3 py-1 rounded-md border border-accent/25">7.5</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 text-center mb-4">
                    {[
                      ["L", "7.0", "Listening"],
                      ["R", "7.0", "Reading"],
                      ["W", "7.5", "Writing"],
                      ["S", "8.0", "Speaking"],
                    ].map(([k, v, name]) => (
                      <div key={k} className="border border-border/40 bg-card/45 rounded-xl p-2.5 shadow-sm hover:border-accent/20 transition-colors">
                        <div className="font-mono font-extrabold text-base text-foreground">{v}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold mt-1">{k}</div>
                        <div className="text-[8px] text-muted-foreground/75 leading-none mt-1 font-semibold">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bars to show balance */}
                <div className="space-y-2 border-t border-border/30 pt-4">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground uppercase font-bold">
                    <span>Overall English Proficiency</span>
                    <span className="text-accent">CEFR C1 level</span>
                  </div>
                  <div className="w-full bg-secondary/50 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-accent h-full rounded-full" style={{ width: "83.3%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Portfolio Card */}
          <div className="p-6 rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-md hover:border-accent/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors" />
            
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6 pb-3 border-b border-border/60">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Professional Credentials &amp; Certifications
              </h3>
              <span className="text-xs font-mono font-bold bg-accent/10 text-accent border border-accent/25 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {CERTIFICATIONS.length} Verified Credentials
              </span>
            </div>
            
            {/* Category Tabs Switcher */}
            <div className="flex flex-wrap gap-1.5 mb-6 bg-secondary/30 border border-border/50 p-1 rounded-xl">
              {["All", "Geospatial & Remote Sensing", "Data Science, AI & Computing", "Civil Engineering & Sustainability", "Project Management & Leadership"].map((cat) => {
                const count = cat === "All" ? CERTIFICATIONS.length : CERTIFICATIONS.filter(c => c.category === cat).length;
                const label = cat === "All" ? "All" : cat.split(" & ")[0];
                const isActive = activeCertTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCertTab(cat as any)}
                    className={`text-[10px] px-3.5 py-2 rounded-lg transition-all duration-200 font-bold uppercase tracking-wider font-mono ${
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Certifications Scroll Grid */}
            <div className="grid sm:grid-cols-2 gap-4 max-h-[290px] overflow-y-auto pr-2 custom-scrollbar text-left">
              {filteredCerts.map((cert, index) => (
                <div key={index} className="border border-border/40 p-4 rounded-xl bg-secondary/15 space-y-2.5 hover:border-accent/30 hover:bg-secondary/20 transition-all duration-200 relative group/cert">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="font-display text-sm font-bold text-foreground leading-snug line-clamp-2">
                      {cert.title}
                    </h4>
                    <span className="font-mono text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded shrink-0">
                      {cert.date}
                    </span>
                  </div>
                  
                  <div className="text-[11px] text-muted-foreground leading-relaxed flex items-center justify-between">
                    <span>Issued by: <strong className="text-foreground/80 font-semibold">{cert.issuer}</strong></span>
                  </div>

                  {cert.id && (
                    <div className="font-mono text-[9px] text-muted-foreground border-t border-border/30 pt-2 flex justify-between items-center mt-2">
                      <span>ID: {cert.id}</span>
                      <span className="text-[8px] uppercase tracking-widest text-emerald-500 font-extrabold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Footnote */}
            <div className="mt-5 text-[10px] text-muted-foreground text-center font-sans">
              * Showing featured credentials. 30+ additional micro-certifications in AI, AutoCAD Civil 3D, water resource planning, and ESG strategies are fully documented on my LinkedIn profile.
            </div>
          </div>
        </div>

        {/* Academic Gallery - Big pictures underneath education */}
        <div className="lg:col-span-12 mt-16 border-t border-border/40 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
              Academic Milestones &amp; Research Gallery
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Photo 1: B.Sc. Graduation (Stage) */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/graduation.jpeg"
                  alt="37th Convocation of IUT"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">IUT Stage</div>
                <h4 className="font-display text-base font-bold text-foreground">37th Convocation of IUT</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Conferring of B.Sc. in Civil Engineering degree.</p>
              </div>
            </div>

            {/* Photo 2: Convocation Campus */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/graduation_2.jpeg"
                  alt="Convocation Ceremony at IUT Campus"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">IUT Campus</div>
                <h4 className="font-display text-base font-bold text-foreground">Convocation Ceremony</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Commemorative photos at the iconic IUT red campus.</p>
              </div>
            </div>

            {/* Photo 3: With Prof. Shahin */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/with_prof_shahin.jpeg"
                  alt="With Supervisor Prof. Dr. Hossain Md. Shahin"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">Research Discussion</div>
                <h4 className="font-display text-base font-bold text-foreground">With Prof. Shahin</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Thesis discussion on seepage control with supervisor.</p>
              </div>
            </div>

            {/* Photo 4: Thesis Team */}
            <div className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-md group hover:border-accent/40 transition-all duration-300">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/50">
                <img
                  src="/thesis_team.jpeg"
                  alt="Research & Thesis Team at IUT Laboratory"
                  className="object-cover w-full h-full grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="p-5 border-t border-border/40 text-left">
                <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase mb-1">IUT Laboratory</div>
                <h4 className="font-display text-base font-bold text-foreground">Research &amp; Thesis Team</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Thesis co-researchers at the Civil Engineering lab.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */

function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="py-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="07 · Skills" title="Technical toolkit" />
        <div ref={ref} className="reveal mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_GROUPS.map((g) => (
            <div
              key={g.group}
              className="p-8 rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-accent/30 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-base font-bold text-foreground tracking-wider mb-6 pb-4 border-b border-border/70 flex items-center gap-2 group-hover:text-accent transition-colors">
                  <div className="w-1.5 h-5 bg-accent rounded-full transition-transform group-hover:scale-y-125"></div>
                  {g.group}
                </h3>
                <div className="flex flex-col gap-3">
                  {g.items.map((item) => {
                    const imagePath = SKILL_IMAGES[item.name];
                    const IconComponent = SKILL_ICONS[item.name];
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-secondary/15 hover:bg-secondary/35 hover:border-accent/20 hover:translate-x-1.5 transition-all duration-300 group/skill"
                      >
                        <div className="flex items-center gap-3">
                          {imagePath ? (
                            <div className="w-8 h-8 rounded-lg bg-background border border-border/50 flex items-center justify-center p-1 group-hover/skill:scale-110 transition-transform duration-200 shrink-0 overflow-hidden">
                              <img
                                src={imagePath}
                                alt={`${item.name} logo`}
                                className="object-contain max-w-full max-h-full"
                              />
                            </div>
                          ) : IconComponent ? (
                            <div className="w-8 h-8 rounded-lg bg-background border border-border/50 flex items-center justify-center p-1 group-hover/skill:scale-110 transition-transform duration-200 shrink-0">
                              <IconComponent />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-background border border-border/50 flex items-center justify-center p-1 shrink-0">
                              <Wrench className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <span className="text-base text-foreground font-bold tracking-wide">{item.name}</span>
                        </div>
                        {"level" in item && item.level && (
                          <span className={`text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-sm ${
                            item.level === "Advanced"
                              ? "bg-accent/10 text-accent border border-accent/30"
                              : item.level === "Intermediate"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}>
                            {item.level}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Leadership ---------- */

function Leadership() {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "environment":
        return Globe2;
      case "education":
        return BookOpen;
      case "disaster management":
        return Satellite;
      case "social services":
      case "earthquake vulnerability":
        return Heart;
      case "event planning":
        return Trophy;
      case "arts and culture":
        return Palette;
      case "debate":
        return MessageSquare;
      case "leadership":
        return Compass;
      case "professional development":
        return Briefcase;
      default:
        return Award;
    }
  };

  return (
    <section id="leadership" className="py-20 bg-secondary/30 relative overflow-hidden border-t border-border/50">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <SectionHeader eyebrow="08 · Extracurriculars" title="Leadership &amp; Engagement" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXTRACURRICULARS.map((item, idx) => {
            const Icon = getCategoryIcon(item.category || "");
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border bg-card/65 p-6 shadow-sm hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-4 mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold px-2.5 py-0.5 rounded bg-accent/10 border border-accent/15 select-none">
                      {item.category || "Activity"}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground font-bold">
                      {item.period}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/5 border border-accent/15 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-extrabold text-foreground leading-snug group-hover:text-accent transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-xs text-muted-foreground font-bold mt-0.5">
                        {item.org}
                      </div>
                    </div>
                  </div>

                  {item.description && (
                    <p className="mt-4 text-xs md:text-sm text-foreground/80 leading-relaxed font-sans font-medium">
                      {item.description}
                    </p>
                  )}

                  {item.bullets && (
                    <ul className="mt-4 text-xs md:text-sm text-foreground/75 space-y-1.5 leading-relaxed font-sans pl-1 border-t border-border/20 pt-3">
                      {item.bullets.slice(0, 5).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2">
                          <span className="text-accent shrink-0 font-bold">▪</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Recommendations ---------- */

const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const RECOMMENDATIONS = [
  {
    name: "Rozina Khanam, PMP®",
    role: "Project Portfolio Management | Donor-Funded Projects | PMO Leadership | Business Development | International Consultancy Services | Infrastructure Development",
    context: "Mentor & Supervisor (Industrial Training at DOHWA, 2024)",
    company: "DOHWA Engineering",
    text: (
      <>
        I am pleased to recommend Ali Ahnaf Abid Mayukh, who completed his 4-week Industrial Training under my supervision in 2024 as a final-year Civil Engineering student from IUT. Throughout the training, Mayukh demonstrated <span className="bg-amber-500/10 text-amber-500 dark:text-amber-400 px-1.5 py-0.5 rounded font-semibold border-b border-amber-500/20">strong enthusiasm for learning</span>, <span className="bg-amber-500/10 text-amber-500 dark:text-amber-400 px-1.5 py-0.5 rounded font-semibold border-b border-amber-500/20">quick adaptability</span>, and a <span className="bg-amber-500/10 text-amber-500 dark:text-amber-400 px-1.5 py-0.5 rounded font-semibold border-b border-amber-500/20">professional attitude</span>. He grasped technical concepts well, communicated effectively, and consistently showed initiative in assigned tasks. His curiosity, discipline, and positive approach made him stand out. I am confident that he has the potential to excel in his engineering career and will be an asset to any team.
      </>
    ),
    initials: "RK",
    gradient: "from-amber-500 to-orange-600",
    glowColor: "bg-amber-500/10 shadow-[0_0_80px_rgba(245,158,11,0.18)]",
  },
  {
    name: "Abdullah Al Saki",
    role: "Founder @ SKARION | Engineering Talent & Career Growth",
    context: "Manager & Supervisor (SKARION)",
    company: "SKARION",
    text: (
      <>
        I have had the opportunity to supervise Mayukh closely, and his performance has consistently been marked by <span className="bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 px-1.5 py-0.5 rounded font-semibold border-b border-emerald-500/20">discipline</span>, <span className="bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 px-1.5 py-0.5 rounded font-semibold border-b border-emerald-500/20">technical clarity</span>, and a <span className="bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 px-1.5 py-0.5 rounded font-semibold border-b border-emerald-500/20">strong sense of responsibility</span>. He demonstrates impressive proficiency in CAD and analytical tasks, and he approaches every assignment with initiative and a <span className="bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 px-1.5 py-0.5 rounded font-semibold border-b border-emerald-500/20">problem-solving mindset</span>. His ability to learn quickly, communicate effectively, and deliver high-quality work under pressure has made a measurable contribution to our projects. Mayukh is dependable, collaborative, and truly committed to professional growth, and I strongly recommend him.
      </>
    ),
    initials: "AS",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "bg-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.18)]",
  },
  {
    name: "Adnan Arsalan, PMP®",
    role: "Project Manager @ RocketPhone.ai | Driving AI & SaaS Innovation | Waterfall & Agile | Salesforce | MS Project, Jira & Monday",
    context: "Manager (AutoCAD Course at LEAD Academy)",
    company: "LEAD Academy",
    text: (
      <>
        I’ve had the pleasure of working with Ali Ahnaf Abid Mayukh on the AutoCAD from Scratch: 2D & 3D course at LEAD Academy, and he’s been nothing short of outstanding. His <span className="bg-purple-500/10 text-purple-500 dark:text-purple-400 px-1.5 py-0.5 rounded font-semibold border-b border-purple-500/20">commitment to timeliness</span>, <span className="bg-purple-500/10 text-purple-500 dark:text-purple-400 px-1.5 py-0.5 rounded font-semibold border-b border-purple-500/20">clarity in delivery</span>, and <span className="bg-purple-500/10 text-purple-500 dark:text-purple-400 px-1.5 py-0.5 rounded font-semibold border-b border-purple-500/20">overall professionalism</span> set a benchmark that’s hard to match. Mayukh brings a calm, structured teaching style that makes even complex concepts feel approachable. Anyone looking to work with a reliable, skilled, and highly professional individual will find him to be a fantastic choice.
      </>
    ),
    initials: "AA",
    gradient: "from-purple-500 to-pink-600",
    glowColor: "bg-purple-500/10 shadow-[0_0_80px_rgba(168,85,247,0.18)]",
  },
  {
    name: "Ishmam Labib",
    role: "Graduate Civil Engineer | Transportation Planning Research Enthusiast",
    context: "Studied together (Feb 2026)",
    company: "IUT",
    text: (
      <>
        I am delighted to recommend Ali Ahnaf Abid Mayukh for his <span className="bg-sky-500/10 text-sky-500 dark:text-sky-400 px-1.5 py-0.5 rounded font-semibold border-b border-sky-500/20">exceptional expertise in ArcGIS</span> and advanced geospatial analysis. Ali has demonstrated strong technical proficiency, particularly in working with <strong className="text-foreground font-bold">Digital Elevation Models (DEM)</strong> and integrating <strong className="text-foreground font-bold">machine learning techniques</strong> into GIS-based applications.
        <br /><br />
        Truly, Ali has the ability to <span className="bg-sky-500/10 text-sky-500 dark:text-sky-400 px-1.5 py-0.5 rounded font-semibold border-b border-sky-500/20">independently design and execute complex flood susceptibility modeling projects</span>. I have personally seen him handle end-to-end geospatial workflows from data preprocessing and DEM analysis to applying <strong className="text-foreground font-bold text-accent">ML-oriented GIS techniques</strong> for predictive modeling. His analytical depth, attention to spatial accuracy, and methodological rigor are impressive.
        <br /><br />
        Beyond his technical capability, Ali has also presented his research work at academic conferences, showcasing both his communication skills and confidence in defending his methodology and findings. Ali is a dedicated, detail-oriented, and highly skilled GIS professional who would be a valuable asset to any research or technical team working in geospatial analytics, environmental modeling, or flood risk assessment.
      </>
    ),
    initials: "IL",
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "bg-blue-500/10 shadow-[0_0_80px_rgba(59,130,246,0.18)]",
  },
];

function Recommendations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isHovered || isModalOpen) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % RECOMMENDATIONS.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isHovered, isModalOpen]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + RECOMMENDATIONS.length) % RECOMMENDATIONS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % RECOMMENDATIONS.length);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const context = formData.get("context") as string;
    const text = formData.get("text") as string;

    const subject = encodeURIComponent(`[Portfolio Recommendation] Endorsement from ${name}`);
    const body = encodeURIComponent(
      `Hi Mayukh,\n\n` +
      `Here is my recommendation for your portfolio:\n\n` +
      `--------------------------------------------------\n` +
      `Name: ${name}\n` +
      `Designation/Title: ${title}\n` +
      `Company/Institution: ${company}\n` +
      `Relationship/Context: ${context}\n` +
      `--------------------------------------------------\n\n` +
      `Recommendation Text:\n` +
      `"${text}"\n\n` +
      `Best regards,\n` +
      `${name}`
    );

    window.open(`mailto:ahnafabid2@iut-dhaka.edu?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="recommendations" className="py-16 bg-background relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      {/* Dynamic shifting background glow orb */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full filter blur-[70px] transition-all duration-1000 ease-in-out pointer-events-none ${RECOMMENDATIONS[activeIndex].glowColor}`} 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <SectionHeader eyebrow="09 · Endorsements" title="Recommendations" />
        
        <div 
          className="relative mt-6 max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slider Window */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card/45 backdrop-blur-md shadow-lg shadow-black/[0.02]">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {RECOMMENDATIONS.map((rec, idx) => (
                <div 
                  key={idx}
                  className="w-full shrink-0 p-5 md:p-6"
                >
                  <div className="group relative transition-all duration-300 flex flex-col justify-between min-h-[220px]">
                    {/* Background Quote Mark */}
                    <QuoteIcon 
                      style={{ position: "absolute" }} 
                      className="w-12 h-12 text-accent/5 group-hover:text-accent/10 absolute top-0 right-0 transition-all duration-500 scale-95 group-hover:scale-100 pointer-events-none" 
                    />
                    
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-start gap-4 justify-between">
                        <div className="flex items-start gap-4">
                          {/* Pulsing Avatar */}
                          <div className="relative shrink-0">
                            <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-tr ${rec.gradient} opacity-20 blur-[2px]`} />
                            <div className={`w-12 h-12 rounded-full relative z-10 flex items-center justify-center text-sm font-extrabold text-white bg-gradient-to-br ${rec.gradient} shadow border border-white/10 shrink-0`}>
                              {rec.initials}
                            </div>
                          </div>
                          
                          {/* Name & Title */}
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-display text-base font-black tracking-tight text-foreground leading-tight">
                                {rec.name}
                              </h3>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                                <Linkedin className="w-2.5 h-2.5" />
                                1st
                              </span>
                            </div>
                            
                            <div className="text-[11px] text-muted-foreground font-semibold leading-relaxed line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-help" title={rec.role}>
                              {rec.role}
                            </div>
                          </div>
                        </div>

                        {/* Slide Indicator Index */}
                        <div className="text-[9px] font-mono tracking-widest text-muted-foreground/60 bg-muted/30 px-2 py-0.5 rounded border border-border/40 shrink-0">
                          {String(idx + 1).padStart(2, '0')} / {String(RECOMMENDATIONS.length).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Content Callout Quote Box */}
                      <div className="mt-4 border-l-2 border-accent/30 pl-4 py-1.5 bg-secondary/15 rounded-r-lg pr-2">
                        <div className="text-xs md:text-sm text-foreground/80 leading-relaxed font-sans font-medium italic">
                          {rec.text}
                        </div>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground font-bold">
                      <span className="text-accent/80 font-extrabold uppercase tracking-widest text-[9px]">
                        {rec.context}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted/40 text-[9px] font-bold border border-border/40 text-muted-foreground">
                        {rec.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-[-60px] top-[45%] z-20 w-10 h-10 rounded-full border border-white/10 bg-card/85 backdrop-blur-md shadow-md hover:bg-accent/15 hover:border-accent/40 active:scale-95 transition-all text-muted-foreground hover:text-foreground hidden sm:flex items-center justify-center group"
            aria-label="Previous recommendation"
          >
            <svg className="w-5 h-5 stroke-current fill-none stroke-[2.5] transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-[-20px] md:right-[-60px] top-[45%] z-20 w-10 h-10 rounded-full border border-white/10 bg-card/85 backdrop-blur-md shadow-md hover:bg-accent/15 hover:border-accent/40 active:scale-95 transition-all text-muted-foreground hover:text-foreground hidden sm:flex items-center justify-center group"
            aria-label="Next recommendation"
          >
            <svg className="w-5 h-5 stroke-current fill-none stroke-[2.5] transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Navigation Dots & Invite Action Container */}
          <div className="flex flex-col items-center gap-3 mt-10 pt-6 border-t border-border/20 text-center">
            {/* Dots */}
            <div className="flex justify-center gap-2 mb-2">
              {RECOMMENDATIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "bg-accent w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <p className="text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground/80 uppercase font-bold">
              Worked with Mayukh?
            </p>
            <h4 className="font-display text-sm md:text-base font-extrabold text-foreground max-w-sm">
              Your endorsement and feedback are highly valued!
            </h4>
            
            {/* Recommend Me Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent font-extrabold text-[11px] tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(251,113,133,0.08)] hover:shadow-[0_0_25px_rgba(251,113,133,0.18)] hover:scale-[1.03] active:scale-95 mt-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Leave a Recommendation
            </button>
          </div>
        </div>
      </div>

      {/* Recommend Me Form Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300">
          <div 
            className="bg-card border border-border w-full max-w-md rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground">Write a Recommendation</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Leave an endorsement of Mayukh's professional work.</p>
                </div>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black text-foreground">Thanks for your recommendation!</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[260px] leading-relaxed">
                      Your endorsement draft has been created. Mayukh will review and showcase it on this board shortly!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-bold text-xs uppercase tracking-widest transition-all hover:opacity-90 shadow-sm active:scale-95"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1 block">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Rozina Khanam"
                      className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1 block">Designation / Role</label>
                      <input 
                        type="text" 
                        name="title" 
                        required 
                        placeholder="e.g. Project Manager"
                        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1 block">Company / Org</label>
                      <input 
                        type="text" 
                        name="company" 
                        required 
                        placeholder="e.g. DOHWA Engineering"
                        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1 block">Relationship / Context</label>
                    <input 
                      type="text" 
                      name="context" 
                      required 
                      placeholder="e.g. Mentor & Supervisor during Internship"
                      className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1 block">Recommendation Text</label>
                    <textarea 
                      name="text" 
                      required 
                      rows={4}
                      placeholder="Write your recommendation here..."
                      className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/40 mt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-accent text-accent-foreground hover:opacity-90 text-xs font-bold transition-all shadow-sm"
                    >
                      Submit Recommendation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <section id="contact" className="py-16 bg-secondary/60 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow="10 · Contact" title="Let's build something resilient." />
          <p className="mt-6 text-lg text-foreground/80 max-w-md">
            Open to research collaboration, consulting, and graduate opportunities
            in GIS, GeoAI, and climate resilience.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <a
              href="mailto:ahnafabid2@iut-dhaka.edu"
              className="flex items-center gap-3 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" /> ahnafabid2@iut-dhaka.edu
            </a>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" /> +880 1408 199 798
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              ["LinkedIn", Linkedin, "https://www.linkedin.com/in/ali-ahnaf-abid-mayukh-csca%E2%84%A2-40aab5257/"],
              ["Scholar", GraduationCap, "https://scholar.google.com/citations?user=xtAN2JUAAAAJ&hl=en"],
              
            ].map(([label, Icon, href]) => {
              const I = Icon as typeof Linkedin;
              return (
                <a
                  key={label as string}
                  href={href as string}
                  className="inline-flex items-center gap-2 text-sm border border-border rounded-full px-4 py-2 hover:border-foreground/50 transition-colors"
                >
                  <I className="w-4 h-4" /> {label as string}
                </a>
              );
            })}
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const subjectInput = formData.get("subject") as string;
            const message = formData.get("message") as string;

            const mailSubject = encodeURIComponent(`[Portfolio Contact] ${subjectInput}`);
            const mailBody = encodeURIComponent(
              `Name: ${name}\n` +
              `Email: ${email}\n\n` +
              `Message:\n` +
              `${message}`
            );

            window.open(`mailto:ahnafabid2@iut-dhaka.edu?subject=${mailSubject}&body=${mailBody}`, "_blank");
            setSent(true);
            formRef.current?.reset();
            setTimeout(() => setSent(false), 4000);
          }}
          className="lg:col-span-7 rounded-2xl border border-border bg-card p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Subject" name="subject" required />
          <Field label="Message" name="message" required textarea />
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm hover:bg-accent transition-colors"
          >
            {sent ? "Sent — thanks!" : "Let's Collaborate"}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className="mt-2 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 resize-none transition-colors"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="mt-2 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 transition-colors"
        />
      )}
    </label>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative bg-[#070e20] text-white overflow-hidden border-t border-border/20">
      {/* Background Satellite Image Container with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#070e20]/80 z-10 backdrop-blur-[2px]" />
        <img
          src="/satellite_footer.jpg"
          alt="Satellite earth observation background"
          className="w-full h-full object-cover opacity-45 scale-100 animate-footer-zoom"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <p className="font-display text-3xl md:text-5xl leading-tight max-w-3xl text-balance">
          Using geospatial intelligence and environmental data to build resilient
          and sustainable futures.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm">
          <div className="text-white/60">
            © {new Date().getFullYear()} Md Ali Ahnaf Abid Mayukh. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/ali-ahnaf-abid-mayukh-csca%E2%84%A2-40aab5257/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com/citations?user=xtAN2JUAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-accent transition-colors"
            >
              Scholar
            </a>
            <a
              href="/Md-Ali-Ahnaf-Abid-Mayukh-CV.pdf"
              download
              className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Shared ---------- */

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</div>
        <h2 className="font-display text-4xl md:text-6xl leading-none mt-3 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="w-10 h-px bg-border" /> Section
      </div>
    </div>
  );
}
