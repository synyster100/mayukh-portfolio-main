import { useEffect, useRef, useState } from "react";

export type PointLink = {
  title: string;
  url: string | null; // null = no link available
};

export type Point = {
  lng: number;
  lat: number;
  label: string;
  image?: string;
  projects?: PointLink[];
  journalPublications?: PointLink[];
  conferencePublications?: PointLink[];
};

// Colour palette
const COLORS = {
  project:     { fill: "#2dd4bf", ring: "#0d9488", label: "Projects" },
  journal:     { fill: "#fbbf24", ring: "#d97706", label: "Journal Publications" },
  conference:  { fill: "#fb7185", ring: "#e11d48", label: "Conference Publications" },
  mixed:       { fill: "#a78bfa", ring: "#7c3aed", label: "Multiple Types" },
};

function markerColor(point: Point) {
  const hasProject  = (point.projects?.length ?? 0) > 0;
  const hasJournal  = (point.journalPublications?.length ?? 0) > 0;
  const hasConf     = (point.conferencePublications?.length ?? 0) > 0;
  const typeCount   = [hasProject, hasJournal, hasConf].filter(Boolean).length;
  if (typeCount > 1)  return COLORS.mixed;
  if (hasProject)     return COLORS.project;
  if (hasJournal)     return COLORS.journal;
  if (hasConf)        return COLORS.conference;
  return COLORS.project;
}

/** Returns the single URL to navigate to if there is exactly one item total, otherwise null */
function getSingleUrl(point: Point): string | null {
  const all: (PointLink | undefined)[] = [
    ...(point.projects ?? []),
    ...(point.journalPublications ?? []),
    ...(point.conferencePublications ?? []),
  ];
  if (all.length === 1 && all[0]?.url) return all[0].url;
  return null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTooltipContent(point: Point) {
  const c = markerColor(point);
  let content = `
    <div style="font-family:Inter,ui-sans-serif,system-ui,sans-serif; font-size:14px; line-height:1.6; color:#f8fafc; min-width:260px; max-width:320px; padding:12px; word-break:break-word; overflow-wrap:break-word; white-space:normal;">
      <div style="font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:${c.fill}; margin-bottom:8px; font-weight:600">${escapeHtml(point.label)}</div>
  `;

  if (point.image) {
    content += `
      <div style="margin:-12px -12px 10px -12px; overflow:hidden; border-radius:8px 8px 0 0; background:#0f172a; display:flex; align-items:center; justify-content:center;">
        <img src="${escapeHtml(point.image)}" alt="${escapeHtml(point.label)}" style="width:100%; max-height:180px; object-fit:contain; display:block" />
      </div>
    `;
  }

  if (point.projects && point.projects.length > 0) {
    const items = point.projects
      .map((t) => `<li style="margin:0; padding:4px 0; border-bottom:1px solid rgba(148,163,184,0.2); word-break:break-word; overflow-wrap:break-word; white-space:normal;">&bull; ${escapeHtml(t.title)}</li>`)
      .join("");
    content += `
      <div style="font-size:13px; font-weight:600; margin-bottom:6px; color:${COLORS.project.fill}; border-bottom:1px solid rgba(148,163,184,0.3); padding-bottom:5px">&#9679; Projects</div>
      <ul style="margin:0; padding-left:0; list-style:none; margin-bottom:8px">${items}</ul>
    `;
  }

  if (point.journalPublications && point.journalPublications.length > 0) {
    const items = point.journalPublications
      .map((t) => `<li style="margin:0; padding:4px 0; border-bottom:1px solid rgba(148,163,184,0.2); word-break:break-word; overflow-wrap:break-word; white-space:normal;">&bull; ${escapeHtml(t.title)}</li>`)
      .join("");
    content += `
      <div style="font-size:13px; font-weight:600; margin-bottom:6px; color:${COLORS.journal.fill}; border-bottom:1px solid rgba(148,163,184,0.3); padding-bottom:5px">&#9679; Journal Publications</div>
      <ul style="margin:0; padding-left:0; list-style:none; margin-bottom:8px">${items}</ul>
    `;
  }

  if (point.conferencePublications && point.conferencePublications.length > 0) {
    const items = point.conferencePublications
      .map((t) => `<li style="margin:0; padding:4px 0; border-bottom:1px solid rgba(148,163,184,0.2); word-break:break-word; overflow-wrap:break-word; white-space:normal;">&bull; ${escapeHtml(t.title)}</li>`)
      .join("");
    content += `
      <div style="font-size:13px; font-weight:600; margin-bottom:6px; color:${COLORS.conference.fill}; border-bottom:1px solid rgba(148,163,184,0.3); padding-bottom:5px">&#9679; Conference Publications</div>
      <ul style="margin:0; padding-left:0; list-style:none">${items}</ul>
    `;
  }

  content += `<div style="margin-top:10px; font-size:11px; color:rgba(148,163,184,0.6); text-align:center">Click marker to open</div></div>`;
  return content;
}

/** Click popup — same as tooltip but items are clickable links */
function getClickContent(point: Point) {
  const c = markerColor(point);
  const linkStyle = (color: string) =>
    `color:${color}; text-decoration:none; font-size:13px; line-height:1.5; display:block; padding:6px 8px; border-radius:6px; margin-bottom:4px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); transition:background 0.15s; word-break:break-word; overflow-wrap:break-word; white-space:normal;`;

  let content = `
    <div style="font-family:Inter,ui-sans-serif,system-ui,sans-serif; color:#f8fafc; min-width:260px; max-width:320px; padding:14px; word-break:break-word; overflow-wrap:break-word; white-space:normal;">
      <div style="font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:${c.fill}; margin-bottom:12px; font-weight:600">${escapeHtml(point.label)}</div>
  `;

  function renderSection(items: PointLink[], color: string, heading: string) {
    if (!items.length) return "";
    const rows = items.map((item) => {
      if (item.url) {
        const isInternal = item.url.startsWith("/");
        return `<a href="${escapeHtml(item.url)}" ${isInternal ? "" : 'target="_blank" rel="noopener"'} style="${linkStyle(color)}">&#8599; ${escapeHtml(item.title)}</a>`;
      }
      return `<div style="${linkStyle("rgba(148,163,184,0.6)")}">${escapeHtml(item.title)} <span style="font-size:10px; opacity:0.6">(no link)</span></div>`;
    }).join("");
    return `
      <div style="font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${color}; margin-bottom:6px; opacity:0.8">${heading}</div>
      <div style="margin-bottom:10px">${rows}</div>
    `;
  }

  content += renderSection(point.projects ?? [], COLORS.project.fill, "Projects");
  content += renderSection(point.journalPublications ?? [], COLORS.journal.fill, "Journal Publications");
  content += renderSection(point.conferencePublications ?? [], COLORS.conference.fill, "Conference Publications");

  content += `</div>`;
  return content;
}

/** SVG pin used as Google Maps custom marker icon URL */
function svgPin(fill: string, ring: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <ellipse cx="16" cy="38" rx="6" ry="2" fill="rgba(0,0,0,0.3)"/>
      <circle cx="16" cy="16" r="14" fill="${ring}" opacity="0.35"/>
      <circle cx="16" cy="16" r="10" fill="${fill}" stroke="${ring}" stroke-width="2.5"/>
      <circle cx="16" cy="16" r="4" fill="white" opacity="0.9"/>
      <line x1="16" y1="26" x2="16" y2="37" stroke="${ring}" stroke-width="2" stroke-linecap="round"/>
    </svg>`.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
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
let globalMapType: "google" | "leaflet" = "google";

if (typeof window !== "undefined") {
  window.gm_authFailure = () => {
    console.warn("Google Maps authorization failed. Triggering fallback to Leaflet.");
    globalMapType = "leaflet";
    window.dispatchEvent(new CustomEvent("google-maps-auth-failure"));
  };
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Google Maps load timeout"));
    }, 3500);

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => {
        clearTimeout(timeout);
        resolve();
      });
      existing.addEventListener("error", () => {
        clearTimeout(timeout);
        reject(new Error("Script error"));
      });
      // If it already loaded or failed, clear timeout and resolve/reject accordingly
      if (window.google?.maps) {
        clearTimeout(timeout);
        resolve();
      }
      return;
    }
    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    if (!key) {
      clearTimeout(timeout);
      reject(new Error("Missing Google Maps browser key"));
      return;
    }
    window.__initProjectMap = () => {
      clearTimeout(timeout);
      resolve();
    };
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__initProjectMap${
      channel ? `&channel=${channel}` : ""
    }`;
    s.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("Script error"));
    };
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

/** Legend component rendered in React over the map */
function MapLegend() {
  const entries = [
    COLORS.project,
    COLORS.journal,
    COLORS.conference,
    COLORS.mixed,
  ];
  return (
    <div
      style={{
        position: "absolute",
        bottom: "16px",
        right: "16px",
        zIndex: 9999,
        pointerEvents: "auto",
        background: "rgba(10, 15, 30, 0.82)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        minWidth: "190px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "2px",
          fontFamily: "Inter, ui-sans-serif, sans-serif",
        }}
      >
        Legend
      </div>
      {entries.map((e) => (
        <div
          key={e.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Inter, ui-sans-serif, sans-serif",
            fontSize: "12px",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: e.fill,
              border: `2px solid ${e.ring}`,
              flexShrink: 0,
              boxShadow: `0 0 6px ${e.fill}88`,
            }}
          />
          {e.label}
        </div>
      ))}
    </div>
  );
}

export default function ProjectMap({ points }: { points: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const leafletMapRef = useRef<any>(null);
  const [mapType, setMapType] = useState<"google" | "leaflet">(globalMapType);

  useEffect(() => {
    const handleAuthFailure = () => {
      globalMapType = "leaflet";
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

          ref.current.innerHTML = "";

          const g = window.google;
          const map = new g.maps.Map(ref.current, {
            center: { lat: 20, lng: -20 },
            zoom: 2,
            minZoom: 2,
            restriction: {
              latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
              strictBounds: true,
            },
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

            const c = markerColor(p);

            const marker = new g.maps.Marker({
              map,
              position: pos,
              title: p.label,
              animation: g.maps.Animation.DROP,
              icon: {
                url: svgPin(c.fill, c.ring),
                scaledSize: new g.maps.Size(32, 40),
                anchor: new g.maps.Point(16, 38),
              },
            });

            marker.addListener("mouseover", () => {
              info.setContent(getTooltipContent(p));
              info.open({ anchor: marker, map });
            });
            marker.addListener("mouseout", () => {
              info.close();
            });
            marker.addListener("click", () => {
              const singleUrl = getSingleUrl(p);
              if (singleUrl) {
                if (singleUrl.startsWith("/")) {
                  window.location.href = singleUrl;
                } else {
                  window.open(singleUrl, "_blank", "noopener");
                }
              } else {
                // Multiple items — show clickable popup
                info.setContent(getClickContent(p));
                info.open({ anchor: marker, map });
                map.panTo(pos);
                map.setZoom(Math.max(map.getZoom() ?? 6, 8));
              }
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
          globalMapType = "leaflet";
          if (!cancelled) setMapType("leaflet");
        });
    } else {
      loadLeaflet()
        .then((L) => {
          if (cancelled || !ref.current || !L) return;

          ref.current.innerHTML = "";

          const mapEl = document.createElement("div");
          mapEl.style.width = "100%";
          mapEl.style.height = "100%";
          ref.current.appendChild(mapEl);

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

          const map = L.map(mapEl, {
            center: [20, -20],
            zoom: 2,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: true,
            scrollWheelZoom: true,
            maxBounds: [[-85, -180], [85, 180]],
            maxBoundsViscosity: 1.0,
          });
          leafletMapRef.current = map;

          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            }
          ).addTo(map);

          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
            { attribution: "Labels &copy; Esri" }
          ).addTo(map);

          const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));

          points.forEach((p) => {
            const c = markerColor(p);

            const markerHtml = `
              <div style="position:relative;display:flex;align-items:center;justify-content:center;width:28px;height:28px">
                <span style="position:absolute;display:inline-flex;height:28px;width:28px;border-radius:50%;background:${c.fill};opacity:0.45;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite"></span>
                <span style="position:relative;display:inline-flex;border-radius:50%;height:14px;width:14px;background:${c.fill};border:2.5px solid ${c.ring};box-shadow:0 0 8px ${c.fill}99"></span>
              </div>
            `;

            // Add ping keyframes once
            if (!document.getElementById("leaflet-ping-keyframes")) {
              const s = document.createElement("style");
              s.id = "leaflet-ping-keyframes";
              s.innerHTML = `@keyframes ping { 75%,100% { transform:scale(2); opacity:0; } }`;
              document.head.appendChild(s);
            }

            const customIcon = L.divIcon({
              className: "custom-leaflet-marker",
              html: markerHtml,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            });

            const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(map);
            marker.bindTooltip(getTooltipContent(p), {
              className: "custom-leaflet-tooltip",
              direction: "top",
              offset: [0, -14],
              opacity: 1,
              sticky: true,
            });

            marker.bindPopup(getClickContent(p), {
              className: "custom-leaflet-popup",
              maxWidth: 340,
              closeButton: true,
            });

            marker.on("click", () => {
              const singleUrl = getSingleUrl(p);
              if (singleUrl) {
                marker.closeTooltip();
                if (singleUrl.startsWith("/")) {
                  window.location.href = singleUrl;
                } else {
                  window.open(singleUrl, "_blank", "noopener");
                }
              } else {
                // Multiple items — popup already bound, just zoom in
                map.setView([p.lat, p.lng], Math.max(map.getZoom() ?? 6, 8));
              }
            });
          });

          if (points.length > 1) {
            map.fitBounds(bounds, { padding: [50, 50] });
            setTimeout(() => {
              if (map.getZoom() > 4) map.setZoom(3);
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
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", height: "100%", isolation: "isolate" }}>
      <div
        ref={ref}
        className="w-full h-full"
        style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08))" }}
      />
      <MapLegend />
    </div>
  );
}
