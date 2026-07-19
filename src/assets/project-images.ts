/**
 * Project image assets — imported here so Vite processes and resolves
 * the URLs correctly in both dev (raw path) and production (hashed path).
 *
 * To add a new project image:
 * 1. Drop the file into src/assets/images/projects/
 * 2. Add an import below
 * 3. Add the slug -> URL mapping in PROJECT_IMAGE_URLS
 */

// @ts-ignore
import uavTopographicSurvey from "./images/projects/uav-topographic-survey-rbd-eco-resort.jpg";
// @ts-ignore
import plaqueminesParishLidarDem from "./images/projects/plaquemines-parish-lidar-dem.jpg";
// @ts-ignore
import burigangaTurbidityEncroachment from "./images/projects/buriganga-turbidity-urban-encroachment.jpg";
// @ts-ignore
import footingSettlementBrahmanbaria from "./images/projects/footing-settlement-analysis-brahmanbaria.jpg";
// @ts-ignore
import urbanStormwaterAzimpur from "./images/projects/urban-stormwater-modeling-azimpur.jpg";
// @ts-ignore
import catfishHatcheryCongo from "./images/projects/catfish-hatchery-3d-pipe-network.jpg";
// @ts-ignore
import bandarbanDemTerrain from "./images/projects/bandarban-dem-3d-terrain.jpg";
// @ts-ignore
import karnaphuliNdviAnalysis from "./images/projects/karnaphuli-ndvi-analysis.jpg";
// @ts-ignore
import storyServiceabilityDhaka from "./images/projects/12-story-serviceability-check.jpg";
// @ts-ignore
import soulOfTheShorePavilion from "./images/projects/soul-of-the-shore-pavilion.jpg";
// @ts-ignore
import waterSupplyNarayanganj from "./images/projects/water-supply-aquifer-narayanganj.jpg";
// @ts-ignore
import storyFloorPlanBrahmanbaria from "./images/projects/10-story-floor-plan-brahmanbaria.png";
// @ts-ignore
import meghnaEstuaryTurbidity from "./images/projects/meghna-river-turbidity-map.jpg";
// @ts-ignore
import lstDhaka2018 from "./images/projects/lst-dhaka-division-2018.jpg";
// @ts-ignore
import deforestationChittagong from "./images/projects/deforestation-chittagong-2000-2020.jpg";
// @ts-ignore
import lulcSylhet2024 from "./images/projects/3d-lulc-sylhet-2024.jpeg";
// @ts-ignore
import lulcNdwiGaibandha from "./images/projects/lulc-ndwi-gaibandha-serc.jpg";
// @ts-ignore
import floodRiskDhaka from "./images/projects/flood-risk-dhaka-district-gis.jpg";
// @ts-ignore
import ndviSylhet2023 from "./images/projects/ndvi-sylhet-2023.jpg";
// @ts-ignore
import meteorologicalBrahmanbaria from "./images/projects/meteorological-brahmanbaria.jpg";

export const PROJECT_IMAGE_URLS: Record<string, string> = {
  "uav-topographic-survey-rbd-eco-resort": uavTopographicSurvey,
  "plaquemines-parish-lidar-dem": plaqueminesParishLidarDem,
  "buriganga-turbidity-urban-encroachment": burigangaTurbidityEncroachment,
  "footing-settlement-analysis-brahmanbaria": footingSettlementBrahmanbaria,
  "urban-stormwater-modeling-azimpur": urbanStormwaterAzimpur,
  "catfish-hatchery-3d-pipe-network": catfishHatcheryCongo,
  "bandarban-dem-3d-terrain": bandarbanDemTerrain,
  "karnaphuli-ndvi-analysis": karnaphuliNdviAnalysis,
  "12-story-serviceability-check": storyServiceabilityDhaka,
  "soul-of-the-shore-pavilion": soulOfTheShorePavilion,
  "water-supply-aquifer-narayanganj": waterSupplyNarayanganj,
  "10-story-floor-plan-brahmanbaria": storyFloorPlanBrahmanbaria,
  "meghna-river-turbidity-map": meghnaEstuaryTurbidity,
  "lst-dhaka-division-2018": lstDhaka2018,
  "deforestation-chittagong-2000-2020": deforestationChittagong,
  "3d-lulc-sylhet-2024": lulcSylhet2024,
  "lulc-ndwi-gaibandha-serc": lulcNdwiGaibandha,
  "flood-risk-dhaka-district-gis": floodRiskDhaka,
  "ndvi-sylhet-2023": ndviSylhet2023,
  "meteorological-brahmanbaria-2015-2024": meteorologicalBrahmanbaria,
};

/**
 * Publication image assets
 * Same pattern — add imports and slug->URL mappings here.
 */
export const PUBLICATION_IMAGE_URLS: Record<string, string> = {
  // e.g. "louisiana-shoreline": louisianaImage,
};
