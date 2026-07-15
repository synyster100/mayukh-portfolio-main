export type ProjectCategory = "Remote Sensing" | "Structural Engineering" | "Hydraulic Engineering" | "CAD & Design" | "Architectural Design";

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

export const PROJECT_CATEGORIES: ProjectCategory[] = ["Remote Sensing", "Structural Engineering", "Hydraulic Engineering", "CAD & Design", "Architectural Design"];

export const PROJECTS: Project[] = [
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
    slug: "uav-topographic-survey-rbd-eco-resort",
    title:
      "UAV-Based Digital Topographic Survey of RBD Eco Resort, Sreepur, Gazipur for ANTS Drone Hub",
    tech: ["ArcGIS Pro", "AutoCAD", "UAV Survey"],
    desc:
      "Surveyed drone imagery with boundary, area, and contour mapping for resort land development using ArcGIS Pro and AutoCAD.",
    category: "Remote Sensing",
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
    category: "Structural Engineering",
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
    category: "Hydraulic Engineering",
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
  {
    slug: "catfish-hatchery-3d-pipe-network",
    title:
      "3D Projection and Pipe Network Design of a 2 Million Capacity Catfish Hatchery in Congo for Micromaster Corporation",
    tech: ["AutoCAD"],
    desc:
      "Developed 3D hatchery layout in AutoCAD and optimized pipe network for supply, circulation, and drainage.",
    category: "CAD & Design",
    location: { lng: 21.7587, lat: -4.0383, label: "Congo" },
    year: "Hatchery Design Project",
    overview:
      "This project created a 3D hatchery layout and optimized the pipe network to support a 2 million capacity catfish farm in Congo.",
    highlights: [
      "Developed a detailed 3D hatchery layout in AutoCAD.",
      "Optimized pipe network for water supply, circulation, and drainage systems.",
      "Ensured the design met operational requirements for a large-scale aquaculture facility.",
    ],
    workflow: [
      "Defined hatchery operational requirements and capacity constraints.",
      "Created 3D layout of the hatchery facility in AutoCAD.",
      "Designed and optimized pipe network for efficient water management.",
    ],
    deliverables: [
      "3D hatchery layout drawings",
      "Pipe network design plans",
      "Optimized water management scheme",
    ],
    impact:
      "The design supports efficient operation of a large-scale catfish hatchery, improving productivity and water usage.",
  },
  {
    slug: "bandarban-dem-3d-terrain",
    title:
      "Digital Elevation Models (DEM): 3D Terrain Visualization & Flythrough of Bandarban District, Bangladesh",
    tech: ["GEE", "ArcGIS Pro"],
    desc:
      "Processed DEMs in GEE and rendered 3D terrain models with flythrough animation in ArcGIS Pro.",
    category: "Remote Sensing",
    location: { lng: 92.2098, lat: 22.1940, label: "Bandarban District, Bangladesh" },
    year: "Terrain Visualization Project",
    overview:
      "This project produced 3D terrain visualizations and flythrough animations for Bandarban District using DEM processing in GEE and ArcGIS Pro.",
    highlights: [
      "Processed digital elevation models (DEMs) in Google Earth Engine.",
      "Rendered 3D terrain models in ArcGIS Pro.",
      "Created flythrough animations for immersive terrain exploration.",
    ],
    workflow: [
      "Acquired and processed DEM data in Google Earth Engine.",
      "Imported processed DEMs into ArcGIS Pro for 3D rendering.",
      "Generated flythrough animations to showcase terrain features.",
    ],
    deliverables: [
      "Processed DEM datasets",
      "3D terrain visualizations",
      "Flythrough animation files",
    ],
    impact:
      "The 3D terrain models and animations improve understanding of Bandarban's topography for planning and research purposes.",
  },
  {
    slug: "karnaphuli-ndvi-analysis",
    title:
      "NDVI Analysis and Time Lapse Visualization of the Karnaphuli Basin, Chittagong (2000–2024) for SERC",
    tech: ["GEE", "MODIS", "Landsat"],
    desc:
      "Processed MODIS and Landsat imagery in GEE with cloud masking and atmospheric correction to generate NDVI datasets.",
    category: "Remote Sensing",
    location: { lng: 91.9804, lat: 22.3569, label: "Karnaphuli Basin, Chittagong" },
    year: "2000–2024",
    overview:
      "This project analyzed NDVI trends and created time-lapse visualizations for the Karnaphuli Basin over a 24-year period for SERC.",
    highlights: [
      "Processed MODIS and Landsat imagery with cloud masking and atmospheric correction.",
      "Generated NDVI datasets for vegetation health analysis.",
      "Created time-lapse visualizations to show vegetation changes over time.",
    ],
    workflow: [
      "Acquired MODIS and Landsat imagery in Google Earth Engine.",
      "Applied cloud masking and atmospheric correction preprocessing.",
      "Calculated NDVI and generated time-series analysis and visualizations.",
    ],
    deliverables: [
      "NDVI datasets (2000–2024)",
      "Time-lapse visualization videos",
      "Vegetation trend analysis report",
    ],
    impact:
      "The analysis provides insights into long-term vegetation changes in the Karnaphuli Basin, supporting environmental research and planning.",
  },
  {
    slug: "12-story-serviceability-check",
    title:
      "Serviceability Check of a 12-Story Residential Building in Dhaka",
    tech: ["ETABS"],
    desc:
      "Modeled structural system in ETABS per BNBC 2020 and verified drift, deflection, and vibration under loads.",
    category: "Structural Engineering",
    location: { lng: 90.3995, lat: 23.8103, label: "Dhaka, Bangladesh" },
    year: "Structural Serviceability Project",
    overview:
      "This project performed a serviceability check for a 12-story residential building in Dhaka using ETABS per BNBC 2020 standards.",
    highlights: [
      "Modeled the building's structural system in ETABS.",
      "Verified drift, deflection, and vibration under design loads.",
      "Ensured compliance with BNBC 2020 serviceability criteria.",
    ],
    workflow: [
      "Created structural model of the 12-story building in ETABS.",
      "Applied design loads per BNBC 2020 requirements.",
      "Analyzed and verified serviceability parameters (drift, deflection, vibration).",
    ],
    deliverables: [
      "ETABS structural model",
      "Serviceability analysis report",
      "Compliance verification documentation",
    ],
    impact:
      "The serviceability check ensures the building's safety and comfort, meeting BNBC 2020 standards for residential structures.",
  },
  {
    slug: "soul-of-the-shore-pavilion",
    title:
      "Architectural Design Segment: “Soul of the Shore: A Living Pavilion that Breathes with the Waves”",
    tech: ["Cennovarch 2025", "Reclaimed Wood", "Fabric"],
    desc:
      "Designed a wave-reactive floating bamboo pavilion at Cox’s Bazar by using reclaimed wood and fabric for the Cennovarch 2025.",
    category: "Architectural Design",
    location: { lng: 91.9836, lat: 21.4273, label: "Cox’s Bazar, Bangladesh" },
    year: "Cennovarch 2025",
    overview:
      "This architectural design project created a wave-reactive floating bamboo pavilion at Cox’s Bazar using reclaimed materials for Cennovarch 2025.",
    highlights: [
      "Designed a wave-reactive floating pavilion structure.",
      "Used sustainable materials: bamboo, reclaimed wood, and fabric.",
      "Created a design that harmonizes with the coastal environment of Cox’s Bazar.",
    ],
    workflow: [
      "Conceptualized the pavilion design to respond to wave movements.",
      "Selected sustainable materials (bamboo, reclaimed wood, fabric).",
      "Developed detailed architectural plans for the Cennovarch 2025 competition.",
    ],
    deliverables: [
      "Architectural design plans",
      "3D concept renderings",
      "Sustainability-focused material specifications",
    ],
    impact:
      "The design showcases sustainable coastal architecture, promoting harmony between human-made structures and natural environments.",
  },
  {
    slug: "water-supply-aquifer-narayanganj",
    title:
      "Design of Water Supply System and Aquifer of an Industrial Village at Naryanganj using AutoCAD and Hand Calculation",
    tech: ["AutoCAD", "Hand Calculation"],
    desc:
      "Designed a water supply system and aquifer for an industrial village in Narayanganj using AutoCAD and manual calculations.",
    category: "Hydraulic Engineering",
    location: { lng: 90.5029, lat: 23.6238, label: "Narayanganj, Bangladesh" },
    year: "Narayanganj Water Supply Project",
    overview:
      "This project involved the design of a water supply system and aquifer for an industrial village in Narayanganj, using both AutoCAD and hand calculations to ensure technical feasibility.",
    highlights: [
      "Designed comprehensive water supply system layout in AutoCAD.",
      "Performed detailed hand calculations for aquifer design and water distribution.",
      "Integrated industrial village requirements into the water supply design.",
    ],
    workflow: [
      "Assessed industrial village water demand and site conditions.",
      "Performed hand calculations for aquifer capacity and water supply network.",
      "Designed detailed layouts and schematics in AutoCAD.",
    ],
    deliverables: [
      "AutoCAD water supply system drawings",
      "Hand calculation documentation",
      "Aquifer design report",
    ],
    impact:
      "The design provides a reliable water supply system for the industrial village, supporting sustainable industrial operations in Narayanganj.",
  },
  {
    slug: "10-story-floor-plan-brahmanbaria",
    title:
      "Floor-plan and elevation of a 10 storied building at Brahmanbaria, Bangladesh for Final Year Design Project",
    tech: ["AutoCAD"],
    desc:
      "Designed floor plans and elevations for a 10-story residential building in Brahmanbaria for a final year design project.",
    category: "CAD & Design",
    location: { lng: 91.1100, lat: 23.9600, label: "Brahmanbaria, Bangladesh" },
    year: "Final Year Design Project",
    overview:
      "This final year design project focused on creating detailed floor plans and elevations for a 10-story residential building in Brahmanbaria, Bangladesh.",
    highlights: [
      "Designed comprehensive floor plans for all 10 stories.",
      "Created detailed elevation drawings for the building.",
      "Ensured design compliance with relevant building codes and standards.",
    ],
    workflow: [
      "Conducted site analysis and defined building requirements.",
      "Designed floor plans and room layouts for each story.",
      "Created elevation drawings and refined the design in AutoCAD.",
    ],
    deliverables: [
      "Floor plan drawings",
      "Elevation drawings",
      "Final year design project report",
    ],
    impact:
      "The project demonstrates proficiency in architectural design and AutoCAD, serving as a comprehensive final year project showcase.",
  },
  {
    slug: "meghna-river-turbidity-map",
    title:
      "Turbidity and Water Quality Map of the Meghna River Estuary",
    tech: ["GEE", "Sentinel-2", "ArcGIS Pro"],
    desc:
      "Mapped turbidity and water quality of the Meghna River Estuary using Sentinel-2 data, NDTI, and ArcGIS Pro.",
    category: "Remote Sensing",
    location: { lng: 90.6833, lat: 22.5833, label: "Meghna River Estuary, Bangladesh" },
    year: "Turbidity Mapping Project",
    overview:
      "This project created turbidity and water quality maps of the Meghna River Estuary using Sentinel-2 imagery, the Normalized Difference Turbidity Index (NDTI), and ArcGIS Pro.",
    highlights: [
      "Used Sentinel-2 Surface Reflectance (10m resolution) dataset.",
      "Applied Normalized Difference Turbidity Index (NDTI) = (B3 - B4)/(B3 + B4).",
      "Created final maps in ArcGIS Pro for visualization and layout.",
    ],
    workflow: [
      "Acquired and processed Sentinel-2 imagery in Google Earth Engine.",
      "Calculated NDTI to map turbidity levels.",
      "Created final map layouts and visualizations in ArcGIS Pro.",
    ],
    deliverables: [
      "Turbidity map of Meghna River Estuary",
      "Water quality map",
      "ArcGIS Pro project files",
    ],
    impact:
      "The turbidity and water quality maps provide valuable insights into the Meghna River Estuary's environmental conditions, supporting water resource management.",
  },
  {
    slug: "lst-dhaka-division-2018",
    title:
      "Land Surface Temperature (LST) Map of Dhaka Division (2018)",
    tech: ["GEE", "MODIS", "ArcGIS Pro"],
    desc:
      "Created land surface temperature map of Dhaka Division (2018) using MODIS data in GEE and ArcGIS Pro.",
    category: "Remote Sensing",
    location: { lng: 90.4000, lat: 23.8000, label: "Dhaka Division, Bangladesh" },
    year: "2018",
    overview:
      "This project generated a land surface temperature (LST) map of Dhaka Division for 2018 using MODIS (MOD11A2) data in Google Earth Engine and ArcGIS Pro.",
    highlights: [
      "Used MODIS MOD11A2 (Land Surface Temperature 8-day composites, 1 km resolution).",
      "Processed data in Google Earth Engine for visualization and analysis.",
      "Created final map layout in ArcGIS Pro.",
    ],
    workflow: [
      "Acquired MOD11A2 MODIS data in Google Earth Engine.",
      "Processed and visualized land surface temperature data in GEE.",
      "Created final map layout and visualization in ArcGIS Pro.",
    ],
    deliverables: [
      "Land surface temperature map (2018)",
      "GEE script",
      "ArcGIS Pro project files",
    ],
    impact:
      "The LST map provides insights into urban heat islands and temperature patterns in Dhaka Division, supporting climate resilience planning.",
  },
  {
    slug: "deforestation-chittagong-2000-2020",
    title:
      "Deforestation and Current Forest Cover Map of Chittagong Division (2000–2020)",
    tech: ["GEE", "Hansen Global Forest Change", "ArcGIS Pro"],
    desc:
      "Mapped deforestation and forest cover of Chittagong Division (2000–2020) using Hansen Global Forest Change data in GEE and ArcGIS Pro.",
    category: "Remote Sensing",
    location: { lng: 91.8000, lat: 22.3500, label: "Chittagong Division, Bangladesh" },
    year: "2000–2020",
    overview:
      "This project analyzed deforestation and current forest cover in Chittagong Division from 2000 to 2020 using Hansen Global Forest Change data in Google Earth Engine and ArcGIS Pro.",
    highlights: [
      "Used Hansen Global Forest Change (2000–2022, 30m resolution) dataset.",
      "Analyzed forest cover and forest loss in Google Earth Engine.",
      "Created final map layouts and visualizations in ArcGIS Pro.",
    ],
    workflow: [
      "Acquired Hansen Global Forest Change data in Google Earth Engine.",
      "Processed data to map forest cover and deforestation (2000–2020).",
      "Created final map layouts and visualizations in ArcGIS Pro.",
    ],
    deliverables: [
      "Forest cover map (2000)",
      "Deforestation map (2000–2020)",
      "Current forest cover map",
    ],
    impact:
      "The deforestation and forest cover maps support forest conservation and sustainable land use planning in Chittagong Division.",
  },
  {
    slug: "3d-lulc-sylhet-2024",
    title:
      "3D LULC Map of Sylhet District (2024), Bangladesh",
    tech: ["GEE", "ArcGIS Pro"],
    desc:
      "Created a 3D land use land cover (LULC) map of Sylhet District (2024) incorporating elevation data to show terrain impact on land distribution.",
    category: "Remote Sensing",
    location: { lng: 91.8700, lat: 24.8900, label: "Sylhet District, Bangladesh" },
    year: "2024",
    overview:
      "This project developed a 3D land use land cover (LULC) map of Sylhet District, Bangladesh, integrating elevation data to demonstrate how terrain influences land distribution, with plans to refine elevation clipping in future versions.",
    highlights: [
      "Created 3D LULC map integrating elevation data.",
      "Analyzed how terrain affects land use distribution.",
      "Identified areas for improvement (elevation clipping).",
    ],
    workflow: [
      "Acquired and processed satellite imagery and elevation data.",
      "Generated LULC classification and integrated 3D elevation.",
      "Visualized 3D LULC map and documented findings.",
    ],
    deliverables: [
      "3D LULC map of Sylhet District (2024)",
      "Project documentation",
      "Future enhancement plan",
    ],
    impact:
      "The 3D LULC map enhances understanding of terrain-land use relationships, supporting sustainable development and climate adaptation planning in Sylhet District.",
  },
  {
    slug: "lulc-ndwi-gaibandha-serc",
    title:
      "LULC, NDWI and Extracted Waterbodies map of Gaibandha, Bangladesh",
    tech: ["GEE", "Sentinel-2", "ArcGIS Pro"],
    desc:
      "Generated LULC, NDWI, and extracted waterbodies maps for Gaibandha, Bangladesh using Sentinel-2 data in GEE in collaboration with SERC.",
    category: "Remote Sensing",
    location: { lng: 89.6500, lat: 25.3300, label: "Gaibandha, Bangladesh" },
    year: "SERC Project",
    overview:
      "This project, in collaboration with the Space and Environment Research Center (SERC), created LULC, NDWI, and extracted waterbodies maps for Gaibandha, Bangladesh using Sentinel-2 imagery in Google Earth Engine.",
    highlights: [
      "Generated Land Use Land Cover (LULC) map.",
      "Created Normalized Difference Water Index (NDWI) map using Sentinel-2 green and NIR bands.",
      "Extracted waterbodies by applying a threshold to NDWI results in GEE.",
    ],
    workflow: [
      "Acquired Sentinel-2 imagery in Google Earth Engine.",
      "Classified LULC, calculated NDWI, and extracted waterbodies in GEE.",
      "Visualized and finalized maps for presentation.",
    ],
    deliverables: [
      "LULC map",
      "NDWI map",
      "Extracted waterbodies map",
    ],
    impact:
      "The LULC, NDWI, and waterbodies maps provide valuable insights into Gaibandha's land use and hydrological conditions, supporting environmental research and planning.",
  },
  {
    slug: "meteorological-brahmanbaria-2015-2024",
    title:
      "Decadal Data Extraction, Analysis, and Projection of Rainfall, Humidity, Temperature, Wind Speed and Monthly Variation of Air Pollutants (CO, O3, NO2, PM2.5, PM10, AQI) in Brahmanbaria, Bangladesh (2015–2024) Using Google Earth Engine",
    tech: ["GEE", "ERA5-Land", "CHIRPS"],
    desc:
      "Extracted and analyzed decadal meteorological and air pollutant data for Brahmanbaria (2015–2024) using GEE with ERA5-Land and CHIRPS datasets.",
    category: "Remote Sensing",
    location: { lng: 91.1100, lat: 23.9600, label: "Brahmanbaria, Bangladesh" },
    year: "2015–2024",
    overview:
      "This project extracted and analyzed decadal meteorological data (rainfall, humidity, temperature, wind speed) and monthly air pollutant data (CO, O3, NO2, PM2.5, PM10, AQI) for Brahmanbaria from 2015 to 2024 using Google Earth Engine.",
    highlights: [
      "Used ERA5-Land and CHIRPS datasets in Google Earth Engine.",
      "Spatially filtered data using Brahmanbaria district boundary.",
      "Generated time-series graphs and seasonal variation charts in GEE using JavaScript.",
    ],
    workflow: [
      "Acquired ERA5-Land and CHIRPS datasets in Google Earth Engine.",
      "Spatially filtered and temporally aggregated data (daily/monthly).",
      "Visualized trends and generated preliminary projections in GEE.",
    ],
    deliverables: [
      "Meteorological data analysis (2015–2024)",
      "Air pollutant analysis (CO, O3, NO2, PM2.5, PM10, AQI)",
      "Time-series graphs and seasonal variation charts",
      "GEE JavaScript script",
    ],
    impact:
      "The decadal data analysis and projections support environmental monitoring and climate trend assessment for Brahmanbaria district.",
  },
  {
    slug: "flood-risk-dhaka-district-gis",
    title:
      "GIS-Based Multi-Criteria Flood Risk Mapping Using Hazard, Exposure, and Vulnerability Indicators in Dhaka District",
    tech: ["GIS", "ArcGIS Pro", "Excel"],
    desc:
      "Created a flood risk map for Dhaka District using multi-criteria analysis (Hazard × Exposure × Vulnerability) in ArcGIS Pro.",
    category: "Hydraulic Engineering",
    location: { lng: 90.4000, lat: 23.8000, label: "Dhaka District, Bangladesh" },
    year: "Flood Risk Mapping Project",
    overview:
      "This project used a GIS-based multi-criteria risk assessment framework to evaluate flood risk in five Upazilas of Dhaka District, quantifying risk as Hazard × Exposure × Vulnerability.",
    highlights: [
      "Quantified risk as product of Hazard × Exposure × Vulnerability.",
      "Integrated spatial and attribute data from Excel in ArcGIS Pro.",
      "Generated flood risk map with five classes (Lowest to Very High).",
    ],
    workflow: [
      "Collected hazard, exposure, and vulnerability indicator data.",
      "Normalized and classified data in ArcGIS Pro.",
      "Calculated composite risk indices and generated final risk map.",
    ],
    deliverables: [
      "Flood risk map of Dhaka District",
      "Risk assessment report",
      "ArcGIS Pro project files",
    ],
    impact:
      "The flood risk map identifies high-risk areas (Savar and Keraniganj), supporting disaster risk reduction and climate-resilient planning in Dhaka District.",
  },
  {
    slug: "ndvi-sylhet-2023",
    title:
      "NDVI Map of Sylhet, Bangladesh (2023)",
    tech: ["GEE", "Landsat 8", "ArcGIS Pro", "JavaScript"],
    desc:
      "Created NDVI map of Sylhet, Bangladesh (2023) using Landsat 8 data in GEE and ArcGIS Pro, with JavaScript scripting.",
    category: "Remote Sensing",
    location: { lng: 91.8700, lat: 24.8900, label: "Sylhet, Bangladesh" },
    year: "2023",
    overview:
      "This project generated an NDVI map of Sylhet, Bangladesh for 2023 using USGS Landsat 8 Level 2 Collection 2 Tier 1 data, Google Earth Engine, ArcGIS Pro, and JavaScript.",
    highlights: [
      "Used Landsat 8 Level 2 Collection 2 Tier 1 data from USGS.",
      "Computed NDVI in Google Earth Engine using JavaScript.",
      "Created final map layout in ArcGIS Pro with inset map.",
    ],
    workflow: [
      "Acquired Landsat 8 data in Google Earth Engine.",
      "Computed NDVI using JavaScript in GEE.",
      "Created map layout and visualization in ArcGIS Pro.",
    ],
    deliverables: [
      "NDVI map of Sylhet (2023)",
      "GEE JavaScript script",
      "ArcGIS Pro project files",
    ],
    impact:
      "The NDVI map provides insights into vegetation health in Sylhet, supporting environmental monitoring and land use planning.",
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
