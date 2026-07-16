import React, { useState } from "react";
import { Sliders, Activity, Info, ShieldAlert, Layers, Cpu } from "lucide-react";

export function EnvironmentalModelSandbox() {
  // Simulator inputs
  const [rainfall, setRainfall] = useState(120); // mm/hr
  const [slope, setSlope] = useState(8); // %
  const [ndvi, setNdvi] = useState(0.4); // 0.1 to 0.8
  const [moisture, setMoisture] = useState(50); // %
  
  // 3 New Parameters
  const [infiltration, setInfiltration] = useState(25); // mm/hr (Ksat)
  const [drainage, setDrainage] = useState(45); // % (drainage network density)
  const [antecedent, setAntecedent] = useState(30); // mm (24h antecedent precipitation)

  // Normalize parameters (0 to 1 scale)
  const normRain = Math.min(rainfall / 300, 1);
  const normSlope = Math.min(slope / 25, 1);
  const normNdvi = 1 - (ndvi - 0.1) / 0.7; // higher NDVI reduces risk
  const normMoisture = moisture / 100;
  
  const normInf = 1 - (infiltration - 5) / 75; // higher infiltration = lower risk
  const normDrain = 1 - (drainage - 10) / 85; // higher drainage = lower local risk
  const normAnt = antecedent / 150; // higher antecedent rain = higher saturation risk

  // Combine moisture with antecedent rain
  const combinedMoisture = Math.min((normMoisture + normAnt) / 2, 1);

  // Updated FSI weighted AHP score
  // Rainfall: 25%, Slope: 20%, NDVI: 15%, Combined Moisture: 15%, Infiltration: 15%, Drainage: 10%
  const fsiScoreRaw = (
    0.25 * normRain +
    0.20 * normSlope +
    0.15 * normNdvi +
    0.15 * combinedMoisture +
    0.15 * normInf +
    0.10 * normDrain
  ) * 100;
  const fsiScore = Math.round(Math.min(Math.max(fsiScoreRaw, 5), 98));

  // Runoff coefficient (C) calculations
  // Lower NDVI, higher moisture/antecedent, and lower infiltration = higher runoff
  const baseC = 0.85 - ndvi * 0.45 - (infiltration / 80) * 0.25;
  const saturationFactor = Math.min((moisture + (antecedent / 150) * 100) / 100, 1);
  const runoffCoeff = Math.min(Math.max(baseC + saturationFactor * 0.15, 0.12), 0.95).toFixed(2);

  // Peak discharge index (Higher drainage density accelerates time-of-concentration)
  const peakLoad = Math.round(rainfall * parseFloat(runoffCoeff) * (1 + slope / 100) * (1 + drainage / 180));

  // Sector-specific risk calculations for map rendering
  // 1. Steep Highlands (Zone 1) - vulnerable to Slope, Rain, and low Infiltration (sandy soil mitigates)
  const highlandRisk = Math.round((0.4 * normSlope + 0.4 * normRain + 0.2 * normInf) * 100);
  // 2. Urban Center (Zone 2) - vulnerable to Low NDVI, Rain, and low Drainage Grid Density
  const urbanRisk = Math.round((0.4 * normNdvi + 0.3 * normRain + 0.3 * normDrain) * 100);
  // 3. Lowland Plain (Zone 3) - vulnerable to Moisture, Antecedent Rain, Slope runoff, and Rain
  const plainRisk = Math.round((0.3 * combinedMoisture + 0.3 * normRain + 0.2 * normSlope + 0.2 * normInf) * 100);
  // 4. Forest Zone (Zone 4) - protected by NDVI, but affected by heavy rain & antecedent load
  const forestRisk = Math.round((0.1 * normNdvi + 0.6 * normRain + 0.3 * normAnt) * 55);

  const [selectedZone, setSelectedZone] = useState<"Highlands" | "Urban Core" | "Forest Buffer" | "Lowland Plain">("Highlands");

  const getShapValues = () => {
    const baseValue = 35;
    let actualScore = 0;
    let factors: { name: string; weight: number; norm: number }[] = [];

    if (selectedZone === "Highlands") {
      actualScore = highlandRisk;
      factors = [
        { name: "Terrain Slope", weight: 0.4, norm: normSlope },
        { name: "Rainfall Intensity", weight: 0.4, norm: normRain },
        { name: "Soil Infiltration (Ksat)", weight: 0.2, norm: normInf },
      ];
    } else if (selectedZone === "Urban Core") {
      actualScore = urbanRisk;
      factors = [
        { name: "Vegetation Index (NDVI)", weight: 0.4, norm: normNdvi },
        { name: "Rainfall Intensity", weight: 0.3, norm: normRain },
        { name: "Drainage Grid Density", weight: 0.3, norm: normDrain },
      ];
    } else if (selectedZone === "Forest Buffer") {
      actualScore = forestRisk;
      factors = [
        { name: "Vegetation Index (NDVI)", weight: 0.1, norm: normNdvi },
        { name: "Rainfall Intensity", weight: 0.6, norm: normRain },
        { name: "Antecedent wetness", weight: 0.3, norm: normAnt },
      ];
    } else {
      actualScore = plainRisk;
      factors = [
        { name: "Combined Moisture", weight: 0.3, norm: combinedMoisture },
        { name: "Rainfall Intensity", weight: 0.3, norm: normRain },
        { name: "Terrain Slope", weight: 0.2, norm: normSlope },
        { name: "Soil Infiltration (Ksat)", weight: 0.2, norm: normInf },
      ];
    }

    const diff = actualScore - baseValue;
    const totalWeightedVal = factors.reduce((sum, f) => sum + f.weight * f.norm, 0) || 0.001;
    
    return factors.map(f => {
      const contrib = ((f.weight * f.norm) / totalWeightedVal) * diff;
      return {
        name: f.name,
        val: contrib,
      };
    });
  };

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
  let riverWidth = 3 + parseFloat(runoffCoeff) * 6;
  let riverColor = "#3b82f6"; // standard blue
  let riverPulse = "";

  if (parseFloat(runoffCoeff) > 0.75) {
    riverColor = "#ef4444"; // flooded rose
    riverWidth += 2.5;
    riverPulse = "animate-pulse";
  } else if (parseFloat(runoffCoeff) > 0.5) {
    riverColor = "#f97316"; // high flow orange
  }

  return (
    <section id="sandbox" className="py-28 bg-secondary/15 relative overflow-hidden border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-xs uppercase tracking-widest text-accent font-mono font-semibold mb-3">
          04 · Interactive Simulation
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">
          Explainable Flood Susceptibility Sandbox
        </h2>
        <p className="text-muted-foreground max-w-3xl text-base mb-12 leading-relaxed">
          An interactive GIS-AHP simulator built on the methodology of my research paper: <strong className="text-foreground">"Comparative Machine Learning and Explainable Flood Susceptibility Mapping in Humphreys County, Tennessee Using AHP and SHAP"</strong>. Adjust spatial factors on the left to see the simulated susceptibility index and engineering risk profile adapt in real-time.
        </p>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold tracking-wider uppercase font-mono text-foreground/80">
                  AHP Susceptibility Factors
                </span>
              </div>

              {/* Group 1: Hydrometeorological Load */}
              <div className="border border-border/40 rounded-xl p-4 bg-secondary/10 space-y-5">
                <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold">
                  1. Hydrometeorological Load
                </div>
                
                {/* Parameter 1: Rainfall */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Rainfall Intensity</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
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
                </div>

                {/* Parameter 2: Antecedent Rainfall */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Antecedent Rain (24h)</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
                      {antecedent} mm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={antecedent}
                    onChange={(e) => setAntecedent(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              {/* Group 2: Basin Topography & Land Cover */}
              <div className="border border-border/40 rounded-xl p-4 bg-secondary/10 space-y-5">
                <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold">
                  2. Basin Characteristics
                </div>

                {/* Parameter 3: Slope */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Terrain Slope</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
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
                </div>

                {/* Parameter 4: NDVI */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Vegetation Index (NDVI)</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
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
                </div>
              </div>

              {/* Group 3: Hydrology & Drainage Infrastructure */}
              <div className="border border-border/40 rounded-xl p-4 bg-secondary/10 space-y-5">
                <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold">
                  3. Hydrology & Infrastructure
                </div>

                {/* Parameter 5: Soil Saturation */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Initial Soil Saturation</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
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
                </div>

                {/* Parameter 6: Infiltration Rate (Ksat) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Soil Infiltration (Ksat)</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
                      {infiltration} mm/hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={infiltration}
                    onChange={(e) => setInfiltration(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Parameter 7: Drainage Density */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-foreground/80">Drainage Grid Density</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">
                      {drainage}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    value={drainage}
                    onChange={(e) => setDrainage(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-secondary/35 border border-border/40 p-4 rounded-xl text-xs text-muted-foreground">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p>
                This simulator approximates hydrologic responses by combining the Rational Method with AHP spatial weighting parameters, demonstrating GIS-based disaster management planning.
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
                    <pattern id="pat-highlands" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    </pattern>
                    
                    <pattern id="pat-urban" width="12" height="12" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" x="2" y="2" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                    </pattern>
                    
                    <pattern id="pat-forest" width="18" height="18" patternUnits="userSpaceOnUse">
                      <path d="M 9 3 L 13 9 L 10 9 L 14 14 L 4 14 L 8 9 L 5 9 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                      <line x1="9" y1="14" x2="9" y2="16" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                    </pattern>
                    
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
                    stroke={selectedZone === "Highlands" ? "#3b82f6" : getRiskColor(highlandRisk)}
                    strokeWidth={selectedZone === "Highlands" ? "2.5" : "1.5"}
                    strokeOpacity={selectedZone === "Highlands" ? "1" : "0.4"}
                    className="transition-all duration-300 cursor-pointer hover:stroke-accent"
                    onClick={() => setSelectedZone("Highlands")}
                  />
                  <path
                    d="M 10 10 L 220 10 L 160 120 L 10 160 Z"
                    fill="url(#pat-highlands)"
                    pointerEvents="none"
                  />
                  <text x="100" y="65" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="font-mono text-[9px] font-bold tracking-wider uppercase opacity-90 pointer-events-none">
                    Highlands
                  </text>

                  {/* Zone 2: Urban Core (Top Right/Center) */}
                  <path
                    d="M 220 10 L 390 10 L 390 130 L 260 180 L 160 120 Z"
                    fill="url(#grad-urban)"
                    stroke={selectedZone === "Urban Core" ? "#3b82f6" : getRiskColor(urbanRisk)}
                    strokeWidth={selectedZone === "Urban Core" ? "2.5" : "1.5"}
                    strokeOpacity={selectedZone === "Urban Core" ? "1" : "0.4"}
                    className="transition-all duration-300 cursor-pointer hover:stroke-accent"
                    onClick={() => setSelectedZone("Urban Core")}
                  />
                  <path
                    d="M 220 10 L 390 10 L 390 130 L 260 180 L 160 120 Z"
                    fill="url(#pat-urban)"
                    pointerEvents="none"
                  />
                  <text x="280" y="70" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="font-mono text-[9px] font-bold tracking-wider uppercase opacity-90 pointer-events-none">
                    Urban Core
                  </text>

                  {/* Zone 4: Forest Conservation Zone (Bottom Left) */}
                  <path
                    d="M 10 160 L 160 120 L 220 200 L 120 290 L 10 290 Z"
                    fill="url(#grad-forest)"
                    stroke={selectedZone === "Forest Buffer" ? "#3b82f6" : getRiskColor(forestRisk)}
                    strokeWidth={selectedZone === "Forest Buffer" ? "2.5" : "1.5"}
                    strokeOpacity={selectedZone === "Forest Buffer" ? "1" : "0.4"}
                    className="transition-all duration-300 cursor-pointer hover:stroke-accent"
                    onClick={() => setSelectedZone("Forest Buffer")}
                  />
                  <path
                    d="M 10 160 L 160 120 L 220 200 L 120 290 L 10 290 Z"
                    fill="url(#pat-forest)"
                    pointerEvents="none"
                  />
                  <text x="90" y="215" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="font-mono text-[9px] font-bold tracking-wider uppercase opacity-90 pointer-events-none">
                    Forest Buffer
                  </text>

                  {/* Zone 3: Lowland Floodplain (Bottom Right) */}
                  <path
                    d="M 260 180 L 390 130 L 390 290 L 120 290 L 220 200 Z"
                    fill="url(#grad-plain)"
                    stroke={selectedZone === "Lowland Plain" ? "#3b82f6" : getRiskColor(plainRisk)}
                    strokeWidth={selectedZone === "Lowland Plain" ? "2.5" : "1.5"}
                    strokeOpacity={selectedZone === "Lowland Plain" ? "1" : "0.4"}
                    className="transition-all duration-300 cursor-pointer hover:stroke-accent"
                    onClick={() => setSelectedZone("Lowland Plain")}
                  />
                  <path
                    d="M 260 180 L 390 130 L 390 290 L 120 290 L 220 200 Z"
                    fill="url(#pat-plain)"
                    pointerEvents="none"
                  />
                  <text x="280" y="235" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="font-mono text-[9px] font-bold tracking-wider uppercase opacity-90 pointer-events-none">
                    Lowland Plain
                  </text>

                  {/* Riverbed / Channel boundaries */}
                  <path
                    d="M 10 90 Q 150 110 200 170 T 390 220"
                    fill="none"
                    stroke="#141a26"
                    strokeWidth={riverWidth + 3.5}
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 90 Q 150 110 200 170 T 390 220"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={riverWidth + 1.5}
                    strokeLinecap="round"
                  />

                  {/* Flow Accumulation Channel (The River) winding through */}
                  <path
                    id="river-flow-path"
                    d="M 10 90 Q 150 110 200 170 T 390 220"
                    fill="none"
                    stroke={riverColor}
                    strokeWidth={riverWidth}
                    strokeLinecap="round"
                    className={`transition-all duration-300 ${
                      parseFloat(runoffCoeff) > 0.75 ? "river-flow-fast" : "river-flow-normal"
                    }`}
                  />

                  {/* Curved Text Label along the River flow path */}
                  <text dy="-4.5" className="font-mono text-[7px] font-bold tracking-[0.25em] fill-white/80 pointer-events-none select-none">
                    <textPath href="#river-flow-path" startOffset="12%">
                      RIVER CHANNEL • FLOW ACCUMULATION →
                    </textPath>
                  </text>

                  {/* Source and Outlet labels */}
                  <text x="14" y="80" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" letterSpacing="0.1em" className="pointer-events-none">SOURCE</text>
                  <text x="355" y="240" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" letterSpacing="0.1em" className="pointer-events-none">OUTLET</text>

                  {/* Contour line representations */}
                  <path d="M 30 30 Q 100 40 120 90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 50 10 Q 130 20 150 70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M 320 250 Q 250 260 210 200" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
                </svg>
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center bg-secondary/20 border border-border/40 p-3 rounded-xl text-[10px] font-mono font-medium text-foreground/80">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#ef4444] rounded"></div><span>Extreme Risk (&ge;75%)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#f97316] rounded"></div><span>High Risk (50-74%)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#eab308] rounded"></div><span>Moderate Risk (30-49%)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#10b981] rounded"></div><span>Low Risk (&lt;30%)</span></div>
              </div>

              {/* Sub-catchment Risk Scores */}
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                <button
                  onClick={() => setSelectedZone("Highlands")}
                  className={`border p-2 rounded-xl transition-all duration-300 ${
                    selectedZone === "Highlands"
                      ? "border-accent bg-accent/5 font-semibold text-accent shadow-sm"
                      : "border-border/40 bg-secondary/15 text-foreground/80 hover:bg-secondary/30"
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">Highlands</span>
                  <span className="text-xs font-bold font-mono" style={{ color: getRiskColor(highlandRisk) }}>{highlandRisk}%</span>
                </button>
                <button
                  onClick={() => setSelectedZone("Urban Core")}
                  className={`border p-2 rounded-xl transition-all duration-300 ${
                    selectedZone === "Urban Core"
                      ? "border-accent bg-accent/5 font-semibold text-accent shadow-sm"
                      : "border-border/40 bg-secondary/15 text-foreground/80 hover:bg-secondary/30"
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">Urban Core</span>
                  <span className="text-xs font-bold font-mono" style={{ color: getRiskColor(urbanRisk) }}>{urbanRisk}%</span>
                </button>
                <button
                  onClick={() => setSelectedZone("Forest Buffer")}
                  className={`border p-2 rounded-xl transition-all duration-300 ${
                    selectedZone === "Forest Buffer"
                      ? "border-accent bg-accent/5 font-semibold text-accent shadow-sm"
                      : "border-border/40 bg-secondary/15 text-foreground/80 hover:bg-secondary/30"
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">Forest Buffer</span>
                  <span className="text-xs font-bold font-mono" style={{ color: getRiskColor(forestRisk) }}>{forestRisk}%</span>
                </button>
                <button
                  onClick={() => setSelectedZone("Lowland Plain")}
                  className={`border p-2 rounded-xl transition-all duration-300 ${
                    selectedZone === "Lowland Plain"
                      ? "border-accent bg-accent/5 font-semibold text-accent shadow-sm"
                      : "border-border/40 bg-secondary/15 text-foreground/80 hover:bg-secondary/30"
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono text-muted-foreground block">Lowland Plain</span>
                  <span className="text-xs font-bold font-mono" style={{ color: getRiskColor(plainRisk) }}>{plainRisk}%</span>
                </button>
              </div>
 
              {/* SHAP Feature Attribution Panel */}
              <div className="mt-5 border border-border/50 bg-secondary/10 p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      SHAP Feature Attribution (Explainable AI)
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground uppercase bg-secondary/80 border border-border/60 px-2 py-0.5 rounded-full font-bold">
                    Zone: <span className="text-accent">{selectedZone}</span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  SHAP values explain the model contribution of each geological or hydrologic factor relative to a baseline susceptibility expectation of 35.0%. Click on any zone on the map above or select the buttons to inspect its local feature attribution.
                </p>
                
                <div className="space-y-3 pt-1">
                  {getShapValues().map((shap) => {
                    const val = shap.val;
                    const isPositive = val >= 0;
                    return (
                      <div key={shap.name} className="flex items-center gap-3">
                        <div className="w-[140px] text-xs font-semibold text-foreground/85 shrink-0 truncate">{shap.name}</div>
                        <div className="w-[45px] text-[10px] font-mono font-bold shrink-0 text-right pr-2" style={{ color: isPositive ? "#ef4444" : "#10b981" }}>
                          {isPositive ? "+" : ""}{val.toFixed(1)}%
                        </div>
                        <div className="relative flex-1 h-3 bg-secondary/30 border border-border/20 rounded overflow-hidden">
                          {/* 50% Center Line */}
                          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border z-10" />
                          
                          {/* Bar */}
                          {isPositive ? (
                            <div
                              className="absolute h-full bg-rose-500/20 border-l border-rose-500 transition-all duration-500"
                              style={{ left: "50%", width: `${Math.min(val * 1.5, 50)}%` }}
                            />
                          ) : (
                            <div
                              className="absolute h-full bg-emerald-500/20 border-r border-emerald-500 transition-all duration-500"
                              style={{ right: "50%", width: `${Math.min(Math.abs(val) * 1.5, 50)}%` }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
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
