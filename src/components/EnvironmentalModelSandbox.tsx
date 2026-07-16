import React, { useState } from "react";
import { Sliders, Activity, Info, ShieldAlert, Layers } from "lucide-react";

export function EnvironmentalModelSandbox() {
  // Simulator inputs
  const [rainfall, setRainfall] = useState(120); // mm/hr
  const [slope, setSlope] = useState(8); // %
  const [ndvi, setNdvi] = useState(0.4); // 0.1 to 0.8
  const [moisture, setMoisture] = useState(50); // %

  // Calculate global Flood Susceptibility Index (FSI)
  const normRain = Math.min(rainfall / 300, 1);
  const normSlope = Math.min(slope / 25, 1);
  const normNdvi = 1 - (ndvi - 0.1) / 0.7; // higher NDVI reduces risk
  const normMoisture = moisture / 100;

  const fsiScoreRaw = (0.4 * normRain + 0.3 * normSlope + 0.15 * normNdvi + 0.15 * normMoisture) * 100;
  const fsiScore = Math.round(Math.min(Math.max(fsiScoreRaw, 5), 98));

  const baseC = 0.9 - ndvi * 0.6;
  const saturatedC = baseC + (moisture / 100) * 0.1;
  const runoffCoeff = Math.min(Math.max(saturatedC, 0.15), 0.95).toFixed(2);

  const peakLoad = Math.round(rainfall * parseFloat(runoffCoeff) * (1 + slope / 100));

  // Sector-specific risk calculations for map rendering
  // 1. Steep Highlands (Zone 1) - mainly vulnerable to Slope + Rain
  const highlandRisk = Math.round((0.5 * normSlope + 0.5 * normRain) * 100);
  // 2. Urban Center (Zone 2) - vulnerable to Low NDVI (impervious) + Rain
  const urbanRisk = Math.round((0.6 * normNdvi + 0.4 * normRain) * 100);
  // 3. Lowland Plain (Zone 3) - vulnerable to Moisture + Slope runoff accumulation + Rain
  const plainRisk = Math.round((0.4 * normMoisture + 0.3 * normRain + 0.3 * normSlope) * 100);
  // 4. Forest Zone (Zone 4) - naturally protected by high NDVI
  const forestRisk = Math.round((0.2 * normNdvi + 0.8 * normRain) * 45); // generally much lower risk

  // Color helper based on risk score
  const getRiskColor = (score: number) => {
    if (score >= 75) return "#ef4444"; // Rose/Red
    if (score >= 50) return "#f97316"; // Orange
    if (score >= 30) return "#eab308"; // Amber
    return "#10b981"; // Emerald
  };

  const getRiskOpacity = (score: number) => {
    return Math.min(Math.max(0.15 + (score / 100) * 0.7, 0.2), 0.85);
  };

  // Global Risk details
  let riskLevel = "Low Risk";
  let riskBgColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  let advice = "The local terrain and dense vegetation cover provide adequate absorption and natural drainage under this hydrological load.";

  if (fsiScore >= 80) {
    riskLevel = "Extreme Risk";
    riskBgColor = "text-rose-500 bg-rose-500/10 border-rose-500/20";
    advice = "CRITICAL HAZARD: Immediate structural and nature-based bioretention basins needed. High urban runoff and slope gradients require channel capacity expansion and mandatory green infrastructure.";
  } else if (fsiScore >= 60) {
    riskLevel = "High Risk";
    riskBgColor = "text-orange-500 bg-orange-500/10 border-orange-500/20";
    advice = "WARNING: Elevate buffer zones near drainage channels. Target NDVI canopy enhancement (aim for > 0.65) and implement soft-engineering solutions like rain gardens to control peak runoff velocities.";
  } else if (fsiScore >= 35) {
    riskLevel = "Moderate Risk";
    riskBgColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
    advice = "MODERATE: Runoff is manageable. Keep drainage networks clean and monitor soil moisture trends during consecutive storm cycles. Maintain existing vegetation buffers.";
  }

  // River styling based on runoff coefficient
  let riverWidth = 3 + parseFloat(runoffCoeff) * 5;
  let riverColor = "#3b82f6"; // standard blue
  let riverPulse = "";

  if (parseFloat(runoffCoeff) > 0.75) {
    riverColor = "#ef4444"; // flooded rose
    riverWidth += 2;
    riverPulse = "animate-pulse";
  } else if (parseFloat(runoffCoeff) > 0.5) {
    riverColor = "#f97316"; // high flow orange
  }

  return (
    <section className="py-28 bg-secondary/15 relative overflow-hidden border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-xs uppercase tracking-widest text-accent font-mono font-semibold mb-3">
          04b · Simulation Sandbox
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">
          Watershed Modeling Sandbox
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base mb-12">
          An interactive GIS-AHP simulator. Adjust spatial and hydrological inputs on the left to watch the simulated watershed hazard heatmap adapt dynamically in real-time.
        </p>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-8 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold tracking-wider uppercase font-mono text-foreground/80">
                  Simulation Parameters
                </span>
              </div>

              <div className="space-y-6">
                {/* Parameter 1: Rainfall */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground/80">Rainfall Intensity</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">
                      {rainfall} mm/hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={rainfall}
                    onChange={(e) => setRainfall(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Moderate Rain (50 mm/hr)</span>
                    <span>Extreme Cloudburst (300 mm/hr)</span>
                  </div>
                </div>

                {/* Parameter 2: Slope */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground/80">Terrain Slope</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">
                      {slope}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={slope}
                    onChange={(e) => setSlope(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Flat Plain (1%)</span>
                    <span>Steep Basin (25%)</span>
                  </div>
                </div>

                {/* Parameter 3: NDVI */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground/80">Vegetation Index (NDVI)</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">
                      {ndvi.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.8"
                    step="0.05"
                    value={ndvi}
                    onChange={(e) => setNdvi(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Urban / Bare Soil (0.1)</span>
                    <span>Dense Canopy (0.8)</span>
                  </div>
                </div>

                {/* Parameter 4: Moisture */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground/80">Soil Saturation</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">
                      {moisture}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Dry Arid Soil (10%)</span>
                    <span>Fully Saturated (100%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-secondary/35 border border-border/40 p-4 rounded-xl text-xs text-muted-foreground">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p>
                This simulation maps spatial AHP factors to distinct sub-catchment zones: Steep Highlands (Slope-sensitive), Urban Core (NDVI/impervious-sensitive), Forest Buffers, and Lowland Plains (Saturation-sensitive).
              </p>
            </div>
          </div>

          {/* Map and Visual Output Column */}
          <div className="lg:col-span-6 rounded-2xl border border-border/80 bg-card/65 backdrop-blur-sm p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold tracking-wider uppercase font-mono text-foreground/80">
                    Live Watershed Heatmap
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full border text-[10px] font-bold font-mono tracking-wide ${riskBgColor}`}>
                  {riskLevel} (FSI: {fsiScore}%)
                </div>
              </div>

              {/* Dynamic SVG Map */}
              <div className="relative aspect-[4/3] w-full rounded-xl border border-border/60 bg-[#07090e] overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <style>{`
                    @keyframes flow-map {
                      from { stroke-dashoffset: 40; }
                      to { stroke-dashoffset: 0; }
                    }
                    .river-flow-normal {
                      stroke-dasharray: 10, 8;
                      animation: flow-map 1.6s linear infinite;
                    }
                    .river-flow-fast {
                      stroke-dasharray: 6, 4;
                      animation: flow-map 0.6s linear infinite;
                    }
                  `}</style>
                  
                  {/* Grid Lines (Subtle GIS grid) */}
                  <defs>
                    <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    </pattern>
                    
                    {/* Cartographic Patterns for Zones */}
                    {/* Zone 1: Highlands (Topographical contours / diagonal lines) */}
                    <pattern id="pat-highlands" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    </pattern>
                    
                    {/* Zone 2: Urban Core (Grid blocks) */}
                    <pattern id="pat-urban" width="12" height="12" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" x="2" y="2" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                    </pattern>
                    
                    {/* Zone 4: Forest Buffer (Subtle pine tree structures) */}
                    <pattern id="pat-forest" width="18" height="18" patternUnits="userSpaceOnUse">
                      <path d="M 9 3 L 13 9 L 10 9 L 14 14 L 4 14 L 8 9 L 5 9 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                      <line x1="9" y1="14" x2="9" y2="16" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                    </pattern>
                    
                    {/* Zone 3: Lowland Plain (Hydrological waves) */}
                    <pattern id="pat-plain" width="16" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 0 5 Q 4 2, 8 5 T 16 5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                    </pattern>
                    
                    {/* 3D Gradients for Zones */}
                    <linearGradient id="grad-highlands" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={getRiskColor(highlandRisk)} stopOpacity={getRiskOpacity(highlandRisk)} />
                      <stop offset="100%" stopColor={getRiskColor(highlandRisk)} stopOpacity={getRiskOpacity(highlandRisk) * 0.3} />
                    </linearGradient>
                    <linearGradient id="grad-urban" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={getRiskColor(urbanRisk)} stopOpacity={getRiskOpacity(urbanRisk)} />
                      <stop offset="100%" stopColor={getRiskColor(urbanRisk)} stopOpacity={getRiskOpacity(urbanRisk) * 0.3} />
                    </linearGradient>
                    <linearGradient id="grad-forest" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={getRiskColor(forestRisk)} stopOpacity={getRiskOpacity(forestRisk)} />
                      <stop offset="100%" stopColor={getRiskColor(forestRisk)} stopOpacity={getRiskOpacity(forestRisk) * 0.3} />
                    </linearGradient>
                    <linearGradient id="grad-plain" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={getRiskColor(plainRisk)} stopOpacity={getRiskOpacity(plainRisk)} />
                      <stop offset="100%" stopColor={getRiskColor(plainRisk)} stopOpacity={getRiskOpacity(plainRisk) * 0.3} />
                    </linearGradient>
                  </defs>
                  
                  <rect width="400" height="300" fill="url(#map-grid)" />

                  {/* Zone 1: Steep Highlands (Top Left) */}
                  <path
                    d="M 10 10 L 220 10 L 160 120 L 10 160 Z"
                    fill="url(#grad-highlands)"
                    stroke={getRiskColor(highlandRisk)}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="transition-all duration-300"
                  />
                  <path
                    d="M 10 10 L 220 10 L 160 120 L 10 160 Z"
                    fill="url(#pat-highlands)"
                    pointerEvents="none"
                  />
                  <circle cx="65" cy="50" r="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="65" y="50" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" className="font-bold">1</text>
                  <text x="50" y="75" fill="#ffffff" className="font-mono text-[9px] font-bold opacity-80">
                    Highlands: {highlandRisk}%
                  </text>

                  {/* Zone 2: Urban Core (Top Right/Center) */}
                  <path
                    d="M 220 10 L 390 10 L 390 130 L 260 180 L 160 120 Z"
                    fill="url(#grad-urban)"
                    stroke={getRiskColor(urbanRisk)}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="transition-all duration-300"
                  />
                  <path
                    d="M 220 10 L 390 10 L 390 130 L 260 180 L 160 120 Z"
                    fill="url(#pat-urban)"
                    pointerEvents="none"
                  />
                  <circle cx="270" cy="50" r="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="270" y="50" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" className="font-bold">2</text>
                  <text x="250" y="75" fill="#ffffff" className="font-mono text-[9px] font-bold opacity-80">
                    Urban: {urbanRisk}%
                  </text>

                  {/* Zone 4: Forest Conservation Zone (Bottom Left) */}
                  <path
                    d="M 10 160 L 160 120 L 220 200 L 120 290 L 10 290 Z"
                    fill="url(#grad-forest)"
                    stroke={getRiskColor(forestRisk)}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="transition-all duration-300"
                  />
                  <path
                    d="M 10 160 L 160 120 L 220 200 L 120 290 L 10 290 Z"
                    fill="url(#pat-forest)"
                    pointerEvents="none"
                  />
                  <circle cx="65" cy="220" r="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="65" y="220" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" className="font-bold">4</text>
                  <text x="50" y="245" fill="#ffffff" className="font-mono text-[9px] font-bold opacity-80">
                    Forest: {forestRisk}%
                  </text>

                  {/* Zone 3: Lowland Floodplain (Bottom Right) */}
                  <path
                    d="M 260 180 L 390 130 L 390 290 L 120 290 L 220 200 Z"
                    fill="url(#grad-plain)"
                    stroke={getRiskColor(plainRisk)}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="transition-all duration-300"
                  />
                  <path
                    d="M 260 180 L 390 130 L 390 290 L 120 290 L 220 200 Z"
                    fill="url(#pat-plain)"
                    pointerEvents="none"
                  />
                  <circle cx="270" cy="220" r="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="270" y="220" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" className="font-bold">3</text>
                  <text x="250" y="245" fill="#ffffff" className="font-mono text-[9px] font-bold opacity-80">
                    Plain: {plainRisk}%
                  </text>

                  {/* Flow Accumulation Channel (The River) winding through */}
                  <path
                    d="M 10 90 Q 150 110 200 170 T 390 220"
                    fill="none"
                    stroke={riverColor}
                    strokeWidth={riverWidth}
                    strokeLinecap="round"
                    className={`transition-all duration-300 ${
                      parseFloat(runoffCoeff) > 0.75 ? "river-flow-fast" : "river-flow-normal"
                    }`}
                  />

                  {/* Contour line representations (Subtle topographical overlay) */}
                  <path d="M 30 30 Q 100 40 120 90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 50 10 Q 130 20 150 70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 320 250 Q 250 260 210 200" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
                </svg>

                {/* Left Legend Overlay */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur border border-white/10 px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-white space-y-0.5 z-10 pointer-events-none">
                  <div>1: Highlands</div>
                  <div>2: Urban Core</div>
                  <div>3: Lowland Plain</div>
                  <div>4: Forest Buffer</div>
                </div>

                {/* Map Color Legend overlay */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur border border-white/10 px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-white space-y-1 z-10">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#ef4444] rounded"></div><span>Extreme Risk (&ge;75%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#f97316] rounded"></div><span>High Risk (50-74%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#eab308] rounded"></div><span>Moderate Risk (30-49%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#10b981] rounded"></div><span>Low Risk (&lt;30%)</span></div>
                </div>
              </div>
            </div>

            {/* Calculations and Recommendations */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-border/50 bg-secondary/20 p-2.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">Runoff Coeff (C)</span>
                  <span className="text-base font-bold font-mono text-foreground">{runoffCoeff}</span>
                </div>
                <div className="border border-border/50 bg-secondary/20 p-2.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">Peak Discharge</span>
                  <span className="text-base font-bold font-mono text-foreground">{peakLoad}</span>
                </div>
                <div className="border border-border/50 bg-secondary/20 p-2.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">River Flow Status</span>
                  <span className={`text-[11px] font-extrabold uppercase font-mono block mt-1 ${
                    parseFloat(runoffCoeff) > 0.75 ? "text-rose-500" : parseFloat(runoffCoeff) > 0.5 ? "text-orange-500" : "text-emerald-500"
                  }`}>
                    {parseFloat(runoffCoeff) > 0.75 ? "Flooded" : parseFloat(runoffCoeff) > 0.5 ? "High Flow" : "Stable"}
                  </span>
                </div>
              </div>

              <div className="border border-border/50 bg-secondary/15 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                  Engineering Mitigation Advice
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed font-sans">
                  {advice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
