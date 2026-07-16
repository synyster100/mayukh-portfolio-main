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
} from "lucide-react";
import { useReveal, useCountUp, useInView } from "@/hooks/use-reveal";
import ProjectMap from "@/components/ProjectMap";
import { EnvironmentalModelSandbox } from "@/components/EnvironmentalModelSandbox";

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
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "sandbox", label: "Simulation" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
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
    location: { lng: -87.8803, lat: 35.8703, label: "Humphreys County, Tennessee, USA" },
    link: null,
  },
  {
    authors: "Chowdhury, M. S., <strong>Mayukh, A. A.</strong>, Kim, Y. J., An, J., Nam, B. H.",
    title: "GeoAI-Enabled Remote Sensing Framework for Shoreline Change Forecasting at Pensacola Beach, Florida",
    venue: "ACEM26",
    year: 2026,
    status: "[Accepted for presentation]",
    location: { lng: -87.1370, lat: 30.3349, label: "Pensacola Beach, Florida, USA" },
    link: null,
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S.",
    title: "GIS-Based Multi-Temporal Land Cover Dynamics in Terrell County, Texas: Assessing Oil-Driven Desertification and Rangeland Resilience (2001–2021)",
    venue: "ASCE 2027",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -101.9500, lat: 30.2200, label: "Terrell County, Texas, USA" },
    link: null,
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S.",
    title: "Hybrid Hydro-Geomorphic AHP Framework for Flash Flood Susceptibility: A Case Study of the Limestone Karst Terrain in Kerr County, Texas",
    venue: "ASCE 2027",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -99.3500, lat: 30.0500, label: "Kerr County, Texas, USA" },
    link: null,
  },
  {
    authors: "Chowdhury, M. S., <strong>Mayukh, A. A.</strong>",
    title: "Spatiotemporal Land Cover Change from 2003 to 2023 and 2033 Projections for Topography Derived Inundation Susceptibility in El Paso County, Texas",
    venue: "ASCE 2027",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -104.8214, lat: 31.7619, label: "El Paso County, Texas, USA" },
    link: null,
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, Chowdhury, M. S., Kim, Y. J. & Youn, S.",
    title: "Flood Susceptibility Mapping In San Antonio, Texas Using Multi-Criteria AHP-GIS Integration",
    venue: "International Geoscience and Remote Sensing Symposium (IGARSS 2026)",
    year: 2025,
    status: "[Accepted for presentation]",
    location: { lng: -98.4936, lat: 29.4241, label: "San Antonio, Texas, USA" },
    link: null,
  },
  {
    authors: "Prantor, R., <strong>Mayukh, A. A.</strong>, Abid, R. N., Rimi, N. N., Sharaf, K., Fariha, Z., & Joy, R.",
    title: "Assessment Of Flood Susceptibility In Bangladesh: Integrating SPI Into A GIS-AHP Decision Framework",
    venue: "International Conference on Civil Engineering Research & Innovations 2025 (ICCEI 2025) (pp. 1370-1375)",
    year: 2025,
    status: "",
    location: { lng: 90.3563, lat: 23.6850, label: "Bangladesh" },
    link: "https://icceiruet.org/wp-content/uploads/2025/12/98_Camera-Ready-Final-Paper_ICCEI-2025.pdf",
  },
  {
    authors: "Nishat, M. H., Labib, A., Khan, N. M., Muntaha, S., & <strong>Mayukh, A. A.</strong>",
    title: "Challenges And Opportunities For Implementing Rooftop Solar In Dhaka’s Residential Sector",
    venue: "International Conference on Engineering Research, Innovation, and Education 2025 (ICERIE 2025) (pp. 239-245). Atlantis Press",
    year: 2025,
    status: "",
    location: { lng: 90.3800, lat: 23.7100, label: "Dhaka, Bangladesh" },
    link: "https://doi.org/10.2991/978-94-6463-884-4_29",
  },
  {
    authors: "<strong>Mayukh, A. A.</strong>, & Labib, A.",
    title: "A Decadal GIS-Based Analysis Of Turbidity Dynamics And Urban Expansion In The Buriganga River (2013–2023)",
    venue: "Poster Presentation Segment, Cennovation 2025, Dhaka, Bangladesh",
    year: 2025,
    status: "",
    location: { lng: 90.3800, lat: 23.7000, label: "Buriganga River, Dhaka, Bangladesh" },
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
    org: "Micromaster Corporation",
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

/* ---------- Component ---------- */

function Portfolio() {
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

  return (
    <div className="min-h-screen bg-background text-foreground bg-contours relative">
      <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none z-0" />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Education />
        <Interests />
        <Publications />
        <EnvironmentalModelSandbox />
        <Projects />
        <Experience />
        <Skills />
        <Leadership />
        <Contact />
        <Footer />
      </div>
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
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
            >
              {n.label}
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
    <section id="top" className="relative pt-32 pb-24 overflow-hidden bg-contours">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      {/* Decorative SVG topo */}
      <svg
        className="absolute -right-24 -top-10 w-[640px] h-[640px] opacity-30 pointer-events-none animate-contour"
        viewBox="0 0 600 600"
        fill="none"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <circle
            key={i}
            cx="300"
            cy="300"
            r={40 + i * 22}
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-primary"
            strokeDasharray="2 6"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
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
                <span className="text-foreground font-extrabold text-base tracking-tight">{label}</span>
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
    <section id="about" className="py-28">
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
  return (
    <section id="research" className="py-28 bg-secondary/30 relative overflow-hidden border-y border-border/50">
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
              className={`group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${theme.bg} ${theme.border} ${theme.shadow}`}
            >
              <div>
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

function Publications() {
  const [tab, setTab] = useState<"journal" | "conference">("journal");
  return (
    <section id="publications" className="py-28">
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
              onClick={() => setTab(key)}
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
                  <div className="md:col-span-3 md:text-right flex items-start md:justify-end">
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
                  <div className="md:col-span-3 md:text-right flex items-start md:justify-end">
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
    <section id="projects" className="py-28 bg-secondary/60">
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
                    className="group relative rounded-2xl border border-border bg-card p-6 hover:border-accent/60 transition-all hover:-translate-y-1 duration-300 flex flex-col"
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
                        className="group relative rounded-2xl border border-border bg-card p-6 hover:border-accent/60 transition-all hover:-translate-y-1 duration-300 flex flex-col"
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
    <section id="experience" className="py-28">
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
          <div className="space-y-12">
            {filteredTimeline.map((t, i) => (
              <div
                key={i}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                <div className="pl-10 md:pl-0 md:pr-10 md:text-right">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t.year}
                  </div>
                  <h3 className="font-display text-2xl mt-2">{t.role}</h3>
                  <div className="text-sm text-foreground/70">
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
                <div className="pl-10 md:pl-10 mt-3 md:mt-0">
                  <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                    {t.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-accent shrink-0">→</span>
                        <span dangerouslySetInnerHTML={{ __html: b }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
    <section id="education" className="py-28 relative overflow-hidden border-b border-border/50 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="02 · Education" title="Academic foundation" />
          <p className="text-muted-foreground mt-6 text-base leading-relaxed">
            Standardized test scores, academic credentials, and professional certifications at the intersection of civil mechanics, geomorphology, and computational systems.
          </p>
          <div className="mt-8 border-l-2 border-accent pl-4 py-1 text-xs text-muted-foreground font-mono space-y-2 uppercase tracking-wider">
            <div>Degree Status: Conferred Oct 2025</div>
            <div>Research Track: Geoenvironmental</div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-5">
          {/* Degree and Thesis Card */}
          <div className="p-6 rounded-2xl border border-border bg-card/85 backdrop-blur-sm shadow-md hover:border-accent/40 transition-all duration-300">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Islamic University of Technology (IUT)
                </h3>
                <p className="text-base text-accent font-semibold mt-1">
                  B.Sc. in Civil Engineering
                </p>
              </div>
              <span className="font-mono text-xs text-muted-foreground bg-secondary/40 px-3 py-1 rounded-full border border-border/60 font-bold">
                Jun 2021 — Oct 2025
              </span>
            </div>
            <div className="mt-4 text-base text-foreground/80 leading-relaxed">
              Concentration: <strong className="text-foreground">Geoenvironmental Engineering</strong> · CGPA <strong className="text-foreground">3.09 / 4.00</strong>
            </div>
            <div className="mt-6 rounded-xl border border-border/40 p-6 bg-secondary/15 relative">
              <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold mb-2">
                Undergraduate Thesis
              </div>
              <p className="font-display text-lg font-bold text-foreground leading-snug">
                Experimental Study on Seepage Control in Sand Embankments Stabilized with Sodium Lignosulfonate and Supplementary Polymers
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Supervisor: <span className="text-foreground/80 font-medium">Prof. Dr. Hossain Md. Shahin</span>
              </p>
            </div>
          </div>

          {/* Standardized Tests Card */}
          <div className="p-6 rounded-2xl border border-border bg-card/85 backdrop-blur-sm shadow-md hover:border-accent/40 transition-all duration-300">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 pb-3 border-b border-border/60">
              Standardized Test Scores
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* GRE Card */}
              <div className="border border-border/60 rounded-xl p-5 bg-secondary/10 relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold font-display text-foreground">GRE General Test</span>
                  <span className="text-xl font-bold font-mono text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">312</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    ["Quant", "161", "71%"],
                    ["Verbal", "151", "49%"],
                    ["AWA", "3.5", "37%"],
                  ].map(([k, v, pct]) => (
                    <div key={k} className="border border-border/40 bg-card rounded-lg p-2.5">
                      <div className="font-mono font-bold text-sm text-foreground">{v}</div>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">{k}</div>
                      <div className="text-[8px] font-mono text-accent/80 font-medium">{pct}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IELTS Card */}
              <div className="border border-border/60 rounded-xl p-5 bg-secondary/10 relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold font-display text-foreground">IELTS Academic</span>
                  <span className="text-xl font-bold font-mono text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">7.5</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  {[
                    ["L", "7.0"],
                    ["R", "7.0"],
                    ["W", "7.5"],
                    ["S", "8.0"],
                  ].map(([k, v]) => (
                    <div key={k} className="border border-border/40 bg-card rounded-lg p-2">
                      <div className="font-mono font-bold text-sm text-foreground">{v}</div>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Portfolio Card */}
          <div className="p-6 rounded-2xl border border-border bg-card/85 backdrop-blur-sm shadow-md hover:border-accent/40 transition-all duration-300">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6 pb-3 border-b border-border/60">
              <h3 className="font-display text-xl font-bold text-foreground">
                Professional Credentials &amp; Certifications
              </h3>
              <span className="text-xs font-mono font-bold bg-accent/10 text-accent border border-accent/25 px-2.5 py-1 rounded-full">
                {CERTIFICATIONS.length} Verified Credentials
              </span>
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["All", "Geospatial & Remote Sensing", "Data Science, AI & Computing", "Civil Engineering & Sustainability", "Project Management & Leadership"].map((cat) => {
                const count = cat === "All" ? CERTIFICATIONS.length : CERTIFICATIONS.filter(c => c.category === cat).length;
                const label = cat === "All" ? "All" : cat.split(" & ")[0];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCertTab(cat as any)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 font-semibold ${
                      activeCertTab === cat
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary/70 hover:text-foreground"
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCerts.map((cert, index) => (
                <div key={index} className="border border-border/40 p-4 rounded-xl bg-secondary/15 space-y-2 hover:border-accent/30 transition-colors">
                  <div className="flex justify-between items-start gap-2">
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
                    <div className="font-mono text-[9px] text-muted-foreground border-t border-border/40 pt-2 flex justify-between items-center">
                      <span>ID: {cert.id}</span>
                      <span className="text-[8px] uppercase tracking-wider text-accent font-extrabold">Verified</span>
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
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */

function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
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
                  {g.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-secondary/15 hover:bg-secondary/35 hover:border-accent/20 hover:translate-x-1.5 transition-all duration-300"
                    >
                      <span className="text-base text-foreground font-bold tracking-wide">{item.name}</span>
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
                  ))}
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
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="08 · Extracurriculars" title="Extracurricular activities" />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXTRACURRICULARS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card/60 p-6 flex flex-col justify-between hover:border-accent/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/10">
                    {item.category || "Activity"}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground font-semibold">
                  {item.role}
                </h3>
                <div className="text-sm text-foreground/75 font-medium mt-1">
                  {item.org}
                </div>
                
                {item.description && (
                  <p className="mt-4 text-sm text-foreground/85 leading-relaxed border-t border-border/20 pt-3">
                    {item.description}
                  </p>
                )}
                
                {item.bullets && (
                  <ul className="mt-4 text-xs text-foreground/75 space-y-1.5 border-t border-border/20 pt-3 leading-relaxed">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2">
                        <span className="text-accent shrink-0">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Test scores ---------- */



/* ---------- Contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <section id="contact" className="py-28 bg-secondary/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-contours opacity-60 pointer-events-none" />
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
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <p className="font-display text-3xl md:text-5xl leading-tight max-w-3xl text-balance">
          Using geospatial intelligence and environmental data to build resilient
          and sustainable futures.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-primary-foreground/15 pt-6 text-sm">
          <div className="text-primary-foreground/70">
            © {new Date().getFullYear()} Md Ali Ahnaf Abid Mayukh. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/ali-ahnaf-abid-mayukh-csca%E2%84%A2-40aab5257/" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="https://scholar.google.com/citations?user=xtAN2JUAAAAJ&hl=en" className="hover:text-accent transition-colors">Scholar</a>
            <a
              href="/Md-Ali-Ahnaf-Abid-Mayukh-CV.pdf"
              download
              className="inline-flex items-center gap-2 border border-primary-foreground/30 rounded-full px-4 py-2 hover:bg-primary-foreground hover:text-primary transition-colors"
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
