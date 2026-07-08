import { useEffect, useRef, useState } from "react";

type Point = { lng: number; lat: number; label: string; projects: string[] };

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTooltipContent(point: Point) {
  const projectItems = point.projects
    .map((project) => `<li style="margin:0">${escapeHtml(project)}</li>`)
    .join("");

  return `
    <div style="font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:12px;line-height:1.5;color:#f8fafc;min-width:220px">
      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;margin-bottom:6px">${escapeHtml(point.label)}</div>
      <div style="font-size:13px;font-weight:600;margin-bottom:6px">Projects</div>
      <ul style="margin:0;padding-left:16px">
        ${projectItems}
      </ul>
    </div>
  `;
}

declare global {
  interface Window {
    google: any;
    L: any;
    __initProjectMap?: () => void;
    gm_authFailure?: () => void;
  }
}

const SCRIPT_ID = "google-maps-js";

if (typeof window !== "undefined") {
  window.gm_authFailure = () => {
    console.warn("Google Maps authorization failed. Triggering fallback to Leaflet.");
    window.dispatchEvent(new CustomEvent("google-maps-auth-failure"));
  };
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    if (!key) {
      reject(new Error("Missing Google Maps browser key"));
      return;
    }
    window.__initProjectMap = () => resolve();
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__initProjectMap${
      channel ? `&channel=${channel}` : ""
    }`;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function loadLeaflet(): Promise<any> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.L) return Promise.resolve(window.L);

  return new Promise((resolve, reject) => {
    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const scriptId = "leaflet-js";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(window.L));
      existing.addEventListener("error", reject);
      return;
    }

    const s = document.createElement("script");
    s.id = scriptId;
    s.async = true;
    s.defer = true;
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = () => resolve(window.L);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function ProjectMap({ points }: { points: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const leafletMapRef = useRef<any>(null);
  const [mapType, setMapType] = useState<"google" | "leaflet">("google");

  useEffect(() => {
    const handleAuthFailure = () => {
      setMapType("leaflet");
    };

    window.addEventListener("google-maps-auth-failure", handleAuthFailure);
    return () => {
      window.removeEventListener("google-maps-auth-failure", handleAuthFailure);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (mapType === "google") {
      loadGoogleMaps()
        .then(() => {
          if (cancelled || !ref.current || !window.google?.maps) return;
          
          // Clear any fallback map nodes
          ref.current.innerHTML = "";

          const g = window.google;
          const map = new g.maps.Map(ref.current, {
            center: { lat: 20, lng: -20 },
            zoom: 2,
            minZoom: 2,
            mapTypeId: "hybrid",
            tilt: 45,
            heading: 0,
            gestureHandling: "greedy",
            scrollwheel: true,
            backgroundColor: "#0b1620",
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            rotateControl: true,
            zoomControl: true,
            styles: [],
          });
          googleMapRef.current = map;

          const bounds = new g.maps.LatLngBounds();
          const info = new g.maps.InfoWindow();

          points.forEach((p) => {
            const pos = { lat: p.lat, lng: p.lng };
            bounds.extend(pos);
            const marker = new g.maps.Marker({
              map,
              position: pos,
              title: `${p.label}: ${p.projects.join(", ")}`,
              animation: g.maps.Animation.DROP,
            });
            marker.addListener("mouseover", () => {
              info.setContent(getTooltipContent(p));
              info.open({ anchor: marker, map });
            });
            marker.addListener("mouseout", () => {
              info.close();
            });
            marker.addListener("click", () => {
              info.setContent(getTooltipContent(p));
              info.open({ anchor: marker, map });
              map.panTo(pos);
              map.setZoom(Math.max(map.getZoom() ?? 6, 8));
              map.setTilt(60);
            });
          });

          if (points.length > 1) {
            map.fitBounds(bounds, 80);
            g.maps.event.addListenerOnce(map, "idle", () => {
              if ((map.getZoom() ?? 0) > 4) map.setZoom(3);
            });
          }
        })
        .catch((err) => {
          console.warn("Google Maps failed to load, switching to Leaflet fallback:", err);
          if (!cancelled) setMapType("leaflet");
        });
    } else {
      loadLeaflet()
        .then((L) => {
          if (cancelled || !ref.current || !L) return;

          // Clear element
          ref.current.innerHTML = "";

          // Create leaflet map wrapper div
          const mapEl = document.createElement("div");
          mapEl.style.width = "100%";
          mapEl.style.height = "100%";
          ref.current.appendChild(mapEl);

          // Add custom leaflet dark popups styles if they don't exist yet
          const styleId = "leaflet-custom-dark-theme";
          if (!document.getElementById(styleId)) {
            const styleNode = document.createElement("style");
            styleNode.id = styleId;
            styleNode.innerHTML = `
              .custom-leaflet-popup .leaflet-popup-content-wrapper {
                background: rgba(15, 23, 42, 0.9) !important;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #f8fafc !important;
                border-radius: 12px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
                font-family: ui-sans-serif, system-ui, sans-serif;
              }
              .custom-leaflet-popup .leaflet-popup-tip {
                background: rgba(15, 23, 42, 0.9) !important;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              }
              .custom-leaflet-popup .leaflet-popup-content {
                margin: 8px 12px !important;
              }
              .custom-leaflet-tooltip {
                background: rgba(15, 23, 42, 0.94) !important;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
                color: #f8fafc !important;
                padding: 0 !important;
              }
              .custom-leaflet-tooltip::before {
                border-top-color: rgba(15, 23, 42, 0.94) !important;
              }
              .custom-leaflet-tooltip .leaflet-tooltip-content {
                margin: 0;
                padding: 10px 12px;
              }
              .custom-leaflet-marker {
                background: none !important;
                border: none !important;
              }
            `;
            document.head.appendChild(styleNode);
          }

          // Initialize Map
          const map = L.map(mapEl, {
            center: [20, -20],
            zoom: 2,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: true,
            scrollWheelZoom: true,
          });
          leafletMapRef.current = map;

          // Esri World Imagery Tile Layer
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            }
          ).addTo(map);

          // Esri World Boundaries and Places (hybrid labels)
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: "Labels &copy; Esri",
            }
          ).addTo(map);

          const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));

          points.forEach((p) => {
            const markerHtml = `
              <div class="relative flex items-center justify-center w-6 h-6">
                <span class="absolute inline-flex h-6 w-6 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border border-white shadow-lg"></span>
              </div>
            `;

            const customIcon = L.divIcon({
              className: "custom-leaflet-marker",
              html: markerHtml,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            });

            const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(map);
            marker.bindTooltip(getTooltipContent(p), {
              className: "custom-leaflet-tooltip",
              direction: "top",
              offset: [0, -12],
              opacity: 1,
              sticky: true,
            });

            marker.on("click", () => {
              map.setView([p.lat, p.lng], Math.max(map.getZoom() ?? 6, 8));
            });
          });

          if (points.length > 1) {
            map.fitBounds(bounds, { padding: [50, 50] });
            setTimeout(() => {
              if (map.getZoom() > 4) {
                map.setZoom(3);
              }
            }, 300);
          } else if (points.length === 1) {
            map.setView([points[0].lat, points[0].lng], 5);
          }
        })
        .catch((err) => {
          console.error("Leaflet initialization failed:", err);
        });
    }

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [points, mapType]);

  return (
    <div
      ref={ref}
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08))" }}
    />
  );
}
