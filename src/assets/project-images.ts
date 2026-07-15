/**
 * Project image assets — imported here so Vite processes and resolves
 * the URLs correctly in both dev (raw path) and production (hashed path).
 *
 * To add a new project image:
 * 1. Drop the file into src/assets/images/projects/
 * 2. Add an import below
 * 3. Add the slug -> URL mapping in PROJECT_IMAGE_URLS
 */

// @ts-ignore — Vite handles image imports and resolves to a URL string
import uavTopographicSurvey from "./images/projects/uav-topographic-survey-rbd.jpg";

export const PROJECT_IMAGE_URLS: Record<string, string> = {
  "uav-topographic-survey-rbd-eco-resort": uavTopographicSurvey,
};

/**
 * Publication image assets
 * Same pattern — add imports and slug->URL mappings here.
 */
export const PUBLICATION_IMAGE_URLS: Record<string, string> = {
  // e.g. "louisiana-shoreline": louisianaImage,
};
