export type ProjectCategory = "Remote Sensing" | "AutoCAD";

export type Project = {
  slug: string;
  title: string;
  tech: string[];
  desc: string;
  category: ProjectCategory;
  location?: { lng: number; lat: number; label: string };
  year?: string;
  overview: string;
  highlights: string[];
  workflow: string[];
  deliverables: string[];
  impact: string;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = ["Remote Sensing", "AutoCAD"];

export const PROJECTS: Project[] = [
  {
    slug: "shoreline-dynamics-cameron-beach",
    title:
      "Analysis of Shoreline Dynamics at Cameron Beach, Louisiana (2014 - 2023) and Prediction Using Machine Learning (2023 - 2033)",
    tech: ["GEE", "DSAS Plugin", "ArcGIS Pro", "XGBoost"],
    desc:
      "Used GEE, DSAS plugin, ArcGIS Pro, and an XGBoost model to analyze and predict shoreline change from shorelines derived from NDWI.",
    category: "Remote Sensing",
    location: { lng: -93.49, lat: 29.79, label: "Cameron Beach, Louisiana" },
    year: "2014 - 2033",
    overview:
      "This project examined shoreline movement at Cameron Beach using NDWI-derived shorelines from satellite imagery and extended the analysis with a machine-learning prediction workflow for the next decade.",
    highlights: [
      "Extracted shorelines from multi-temporal imagery using NDWI in Google Earth Engine.",
      "Applied the DSAS plugin and ArcGIS Pro to quantify shoreline movement between 2014 and 2023.",
      "Built an XGBoost-based prediction workflow to estimate shoreline change from 2023 to 2033.",
    ],
    workflow: [
      "Collected and processed satellite imagery in Google Earth Engine to derive shoreline lines across multiple years.",
      "Transferred shoreline outputs into ArcGIS Pro and DSAS for transect-based shoreline change analysis.",
      "Prepared the change metrics as inputs for XGBoost to build a predictive shoreline movement model.",
    ],
    deliverables: [
      "NDWI-derived historical shorelines",
      "DSAS shoreline change metrics",
      "Machine-learning prediction outputs for 2023 - 2033",
    ],
    impact:
      "The final workflow supports coastal monitoring and provides a predictive basis for understanding future erosion risk in vulnerable shoreline zones.",
  },
  {
    slug: "sentinel-2-cloud-masking-framework",
    title:
      "Developed and Evaluated a Multi-Method Cloud Masking and Compositing Framework for Sentinel-2 Imagery",
    tech: ["GEE", "Python", "Machine Learning", "Deep Learning"],
    desc:
      "Implemented rule-based, machine learning, and deep learning cloud-masking workflows in GEE and Python for Sentinel-2 imagery.",
    category: "Remote Sensing",
    year: "Sentinel-2 Study",
    overview:
      "This project compared several approaches for cloud masking and compositing Sentinel-2 imagery to improve the quality of analysis-ready remote sensing products.",
    highlights: [
      "Implemented rule-based cloud masking workflows for baseline preprocessing.",
      "Tested machine learning and deep learning methods for more adaptive cloud screening.",
      "Compared compositing strategies to improve clarity and reliability in final imagery outputs.",
    ],
    workflow: [
      "Prepared Sentinel-2 image collections and preprocessing routines in Google Earth Engine.",
      "Ran cloud masking experiments in both GEE and Python across conventional and learned approaches.",
      "Evaluated the strengths of each method for building cleaner composite imagery.",
    ],
    deliverables: [
      "Cloud-masking workflow comparison",
      "Composite image outputs",
      "Evaluation-ready preprocessing framework",
    ],
    impact:
      "The framework improves image preparation reliability and creates a reusable basis for downstream land, water, and environmental analysis.",
  },
  {
    slug: "terrell-county-land-cover-dynamics",
    title:
      "Performed GIS-Based Multi-Temporal Analysis of Land Cover Dynamics in Terrell County, Texas (2001 - 2021)",
    tech: ["ArcGIS Pro", "NLCD", "Landsat NDVI", "Oil Well Data"],
    desc:
      "Integrated NLCD, Landsat NDVI, and oil well data to analyze desertification, vegetation recovery, and rangeland resilience.",
    category: "Remote Sensing",
    location: { lng: -101.95, lat: 30.22, label: "Terrell County, Texas" },
    year: "2001 - 2021",
    overview:
      "This project investigated how land cover, vegetation health, and oil-field pressure interacted over two decades in Terrell County, Texas.",
    highlights: [
      "Used NLCD and Landsat NDVI to track multi-temporal land cover and vegetation condition.",
      "Integrated oil well data to study the relationship between energy development and landscape change.",
      "Interpreted desertification, vegetation recovery, and rangeland resilience patterns over time.",
    ],
    workflow: [
      "Collected multi-year NLCD, NDVI, and energy development datasets for a common GIS workflow.",
      "Mapped land cover transitions and vegetation trends across the 2001 - 2021 period.",
      "Linked spatial changes with oil development influence to interpret ecosystem response.",
    ],
    deliverables: [
      "Land cover change maps",
      "Vegetation trend analysis",
      "Spatial interpretation of rangeland resilience",
    ],
    impact:
      "The analysis helps explain long-term land transformation in a semi-arid landscape and supports environmental interpretation under development pressure.",
  },
  {
    slug: "kerr-county-flood-susceptibility",
    title:
      "Flood Susceptibility Mapping of Kerr County, Texas Using AHP-Driven Multi-Criteria GIS Analysis",
    tech: ["ArcGIS Pro", "AHP", "GIS"],
    desc:
      "Developed a flood susceptibility map for Kerr County using AHP-MCDA and ROC validation with 9 geomorphological factors.",
    category: "AutoCAD",
    location: { lng: -99.35, lat: 30.05, label: "Kerr County, Texas" },
    year: "Flood Susceptibility Study",
    overview:
      "This GIS-based hazard assessment identified flood-prone zones in Kerr County by combining multiple geomorphological and hydrologic drivers within an AHP-MCDA framework.",
    highlights: [
      "Built an AHP-weighted multi-criteria GIS model using 9 controlling factors.",
      "Generated flood susceptibility zones across the county for planning and hazard screening.",
      "Validated the model using ROC analysis to assess predictive reliability.",
    ],
    workflow: [
      "Selected and standardized nine geomorphological and hydrologic conditioning factors in ArcGIS Pro.",
      "Assigned relative weights using the analytical hierarchy process to build the MCDA model.",
      "Classified and validated flood susceptibility outputs using ROC-based performance checking.",
    ],
    deliverables: [
      "AHP-MCDA flood susceptibility map",
      "Weighted factor model",
      "ROC validation summary",
    ],
    impact:
      "The project supports flood-aware planning, land management, and infrastructure screening in hazard-prone areas.",
  },
  {
    slug: "uav-topographic-survey-rbd-eco-resort",
    title:
      "UAV-Based Digital Topographic Survey of RBD Eco Resort, Sreepur, Gazipur for ANTS Drone Hub",
    tech: ["ArcGIS Pro", "AutoCAD", "UAV Survey"],
    desc:
      "Surveyed drone imagery with boundary, area, and contour mapping for resort land development using ArcGIS Pro and AutoCAD.",
    category: "AutoCAD",
    location: { lng: 90.43, lat: 24.2, label: "Sreepur, Gazipur" },
    year: "Topographic Survey Project",
    overview:
      "This applied survey project transformed UAV imagery into topographic mapping outputs to support resort land development and site planning.",
    highlights: [
      "Processed drone survey outputs for site boundary and area mapping.",
      "Prepared contour information to support terrain-aware land development decisions.",
      "Delivered survey-based mapping outputs using ArcGIS Pro and AutoCAD.",
    ],
    workflow: [
      "Collected and organized UAV-derived site imagery for mapping and measurement workflows.",
      "Processed survey outputs in ArcGIS Pro to prepare boundary, area, and terrain interpretations.",
      "Translated the mapped outputs into AutoCAD-ready products for planning and design use.",
    ],
    deliverables: [
      "Boundary map",
      "Area measurement outputs",
      "Contour-based development drawings",
    ],
    impact:
      "The project provided a practical topographic foundation for site understanding and resort land development planning.",
  },
  {
    slug: "plaquemines-parish-lidar-dem",
    title:
      "LiDAR-Derived Digital Elevation Model (DEM) Generation for Plaquemines Parish, Louisiana (2024)",
    tech: ["LiDAR", "ArcGIS Pro"],
    desc:
      "Processed LiDAR point clouds in ArcGIS Pro, filtered vegetation, and generated DEM in ArcGIS Pro.",
    category: "Remote Sensing",
    location: { lng: -89.72, lat: 29.31, label: "Plaquemines Parish, Louisiana" },
    year: "2024",
    overview:
      "This project produced a high-resolution digital elevation model from LiDAR point clouds for terrain interpretation in Plaquemines Parish, Louisiana.",
    highlights: [
      "Processed raw LiDAR point cloud data within ArcGIS Pro.",
      "Filtered vegetation noise to isolate the ground surface more accurately.",
      "Generated DEM outputs for terrain and floodplain-related interpretation.",
    ],
    workflow: [
      "Imported and organized LiDAR point cloud data in ArcGIS Pro.",
      "Applied filtering routines to remove vegetation and improve ground representation.",
      "Built a clean DEM surface suitable for terrain-focused analysis and mapping.",
    ],
    deliverables: [
      "Filtered ground point dataset",
      "LiDAR-derived DEM",
      "Topographic interpretation outputs",
    ],
    impact:
      "The resulting elevation model improves terrain understanding and supports studies where accurate topography is critical.",
  },
  {
    slug: "buriganga-turbidity-urban-encroachment",
    title:
      "Scientific Poster Presentation: Turbidity Mapping and Urban Encroachment Analysis of the Buriganga River (2013 - 2023)",
    tech: ["GEE", "GIS", "Buffer Analysis", "LULC"],
    desc:
      "Mapped turbidity and LULC in GEE with 2 km buffer analysis to quantify urban expansion impacts on the Buriganga River, Dhaka.",
    category: "Remote Sensing",
    location: { lng: 90.38, lat: 23.7, label: "Buriganga River, Dhaka" },
    year: "2013 - 2023",
    overview:
      "This poster project investigated how urban expansion around the Buriganga River corresponded with turbidity patterns and land use change over a ten-year period.",
    highlights: [
      "Mapped turbidity variation using remote sensing workflows in Google Earth Engine.",
      "Conducted land use and land cover analysis within a 2 km river buffer.",
      "Quantified urban expansion impacts on the river corridor in Dhaka.",
    ],
    workflow: [
      "Prepared river-focused image analysis in Google Earth Engine for temporal turbidity interpretation.",
      "Generated LULC and buffer-based spatial analysis to measure surrounding urban growth.",
      "Synthesized findings into a scientific poster format for presentation and communication.",
    ],
    deliverables: [
      "Turbidity maps",
      "2 km buffer LULC analysis",
      "Scientific poster presentation outputs",
    ],
    impact:
      "The study helps communicate the environmental pressure of urban encroachment on an important river system in Dhaka.",
  },
  {
    slug: "footing-settlement-analysis-brahmanbaria",
    title:
      "Design and Settlement Analysis of Mat and Isolated Footings of a Residential Building in Brahmanbaria",
    tech: ["ETABS", "PLAXIS 3D", "Foundation Design"],
    desc:
      "Modeled mat and isolated footings of a 12-story residential building using ETABS and PLAXIS 3D with site-specific soil parameters.",
    category: "AutoCAD",
    location: { lng: 91.11, lat: 23.96, label: "Brahmanbaria, Bangladesh" },
    year: "Foundation Analysis Study",
    overview:
      "This structural and geotechnical study evaluated mat and isolated footing options for a 12-story residential building using building loads and site-specific soil conditions.",
    highlights: [
      "Modeled structural behavior in ETABS for load interpretation.",
      "Performed settlement analysis in PLAXIS 3D using site-specific soil parameters.",
      "Compared mat and isolated footing responses for foundation decision support.",
    ],
    workflow: [
      "Developed the structural loading model for the residential building in ETABS.",
      "Built geotechnical simulation cases in PLAXIS 3D based on local soil characteristics.",
      "Compared footing alternatives through settlement behavior and design feasibility interpretation.",
    ],
    deliverables: [
      "Foundation modeling scenarios",
      "Settlement analysis outputs",
      "Comparative footing design interpretation",
    ],
    impact:
      "The project supports safer and more informed foundation design decisions for mid-rise residential development.",
  },
  {
    slug: "urban-stormwater-modeling-azimpur",
    title:
      "Urban Stormwater Modeling of Azimpur Colony, Dhaka Using SWMM",
    tech: ["EPA SWMM 5.2", "Hydrologic Analysis", "Hydraulic Analysis"],
    desc:
      "Conducted a detailed hydrologic and hydraulic analysis of the Azimpur Colony catchment in Dhaka using EPA SWMM 5.2.",
    category: "AutoCAD",
    location: { lng: 90.37, lat: 23.73, label: "Azimpur Colony, Dhaka" },
    year: "Stormwater Modeling Study",
    overview:
      "This project modeled runoff generation and drainage network response in Azimpur Colony to better understand urban stormwater performance under local conditions.",
    highlights: [
      "Built a detailed catchment-based SWMM model for hydrologic and hydraulic simulation.",
      "Assessed runoff, drainage conveyance, and potential stormwater bottlenecks.",
      "Generated engineering insights for improving urban stormwater management in a dense residential context.",
    ],
    workflow: [
      "Defined catchment and drainage conditions for the Azimpur Colony study area.",
      "Simulated runoff and hydraulic performance using EPA SWMM 5.2.",
      "Interpreted the system response to identify stormwater management concerns and opportunities.",
    ],
    deliverables: [
      "SWMM model configuration",
      "Hydrologic and hydraulic analysis outputs",
      "Stormwater management interpretation",
    ],
    impact:
      "The analysis provides a practical basis for diagnosing drainage issues and supporting urban stormwater planning in Dhaka.",
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
