import React, { useState } from "react";
import { Sliders, Activity, Info, ShieldAlert } from "lucide-react";

export function EnvironmentalModelSandbox() {
  // Simulator inputs
  const [rainfall, setRainfall] = useState(120); // mm/hr
  const [slope, setSlope] = useState(8); // %
  const [ndvi, setNdvi] = useState(0.4); // 0.1 to 0.8
  const [moisture, setMoisture] = useState(50); // %

  // Calculate Flood Susceptibility Index (FSI)
  // Normalized components (0 to 1)
  const normRain = Math.min(rainfall / 300, 1);
  const normSlope = Math.min(slope / 25, 1);
  const normNdvi = 1 - (ndvi - 0.1) / 0.7; // higher NDVI reduces risk
  const normMoisture = moisture / 100;

  // Weights based on standard AHP model for flood mapping
  const fsiScoreRaw = (0.4 * normRain + 0.3 * normSlope + 0.15 * normNdvi + 0.15 * normMoisture) * 100;
  const fsiScore = Math.round(Math.min(Math.max(fsiScoreRaw, 5), 98));

  // Runoff coefficient (simplified Rational Method C parameter)
  // Lower NDVI & higher moisture = higher runoff
  const baseC = 0.9 - (ndvi * 0.6); // bare soil has high runoff
  const saturatedC = baseC + (moisture / 100) * 0.1;
  const runoffCoeff = Math.min(Math.max(saturatedC, 0.15), 0.95).toFixed(2);

  // Peak discharge index (proxy for hydrologic load)
  const peakLoad = Math.round(rainfall * parseFloat(runoffCoeff) * (1 + slope / 100));

  // Risk details
  let riskLevel = "Low Risk";
  let riskColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  let ringColor = "stroke-emerald-500";
  let advice = "The local terrain and dense vegetation cover provide adequate absorption and natural drainage under this hydrological load.";

  if (fsiScore >= 80) {
    riskLevel = "Extreme Risk";
    riskColor = "text-rose-500 bg-rose-500/10 border-rose-500/20";
    ringColor = "stroke-rose-500";
    advice = "CRITICAL HAZARD: Immediate structural and nature-based bioretention basins needed. High urban runoff and slope gradients require channel capacity expansion and mandatory green infrastructure implementation.";
  } else if (fsiScore >= 60) {
    riskLevel = "High Risk";
    riskColor = "text-orange-500 bg-orange-500/10 border-orange-500/20";
    ringColor = "stroke-orange-500";
    advice = "WARNING: Elevate buffer zones near drainage channels. Target NDVI canopy enhancement (aim for > 0.65) and implement soft-engineering solutions like rain gardens to control peak runoff velocities.";
  } else if (fsiScore >= 35) {
    riskLevel = "Moderate Risk";
    riskColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
    ringColor = "stroke-amber-500";
    advice = "MODERATE: Runoff is manageable. Keep drainage networks clean and monitor soil moisture trends during consecutive storm cycles. Maintain existing vegetation buffers.";
  }

  // Circular gauge setup
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fsiScore / 100) * circumference;

  return (
    <section className="py-28 bg-secondary/15 relative overflow-hidden border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-xs uppercase tracking-widest text-accent font-mono font-semibold mb-3">
          04b · Simulation Sandbox
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">
          Ecohydrological Modeling Sandbox
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base mb-12">
          An interactive GIS-AHP simulator demonstrating how spatial and hydrological parameters determine flood susceptibility indices, peak discharge, and runoff dynamics.
        </p>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-8 flex flex-col justify-between space-y-8">
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
                This simulator approximates hydrologic responses by combining the Rational Method for surface runoff generation with an Analytical Hierarchy Process (AHP) weighted vulnerability framework, illustrating GIS-based disaster management calculations.
              </p>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 rounded-2xl border border-border/80 bg-card/65 backdrop-blur-sm p-8 flex flex-col justify-between">
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-2 mb-6 self-start">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold tracking-wider uppercase font-mono text-foreground/80">
                  Model Outputs
                </span>
              </div>

              {/* Circular Gauge */}
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className="stroke-secondary fill-none"
                    strokeWidth="10"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className={`fill-none transition-all duration-300 ${ringColor}`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold font-mono tracking-tighter text-foreground">{fsiScore}%</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">FSI Index</span>
                </div>
              </div>

              <div className={`px-4 py-1.5 rounded-full border text-xs font-bold font-mono tracking-wide ${riskColor}`}>
                {riskLevel}
              </div>
            </div>

            {/* Calculations and Recommendations */}
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border/50 bg-secondary/20 p-3 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">Runoff Coeff. (C)</span>
                  <span className="text-lg font-bold font-mono text-foreground">{runoffCoeff}</span>
                </div>
                <div className="border border-border/50 bg-secondary/20 p-3 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">Peak Discharge Index</span>
                  <span className="text-lg font-bold font-mono text-foreground">{peakLoad}</span>
                </div>
              </div>

              <div className="border border-border/50 bg-secondary/15 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-foreground">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                  Engineering Mitigation Advice
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed font-sans">
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
