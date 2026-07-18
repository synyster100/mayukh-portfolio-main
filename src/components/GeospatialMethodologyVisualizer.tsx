import React, { useState, useEffect, useRef } from "react";
import { Sliders, Layers, Info, Waves, TrendingUp, Grid, RefreshCw, BarChart2, FileText, Cpu } from "lucide-react";
import { EnvironmentalModelSandbox } from "./EnvironmentalModelSandbox";

type Tab = "sandbox" | "ahp" | "dsas";

export function GeospatialMethodologyVisualizer() {
  const [activeTab, setActiveTab] = useState<Tab>("dsas");

  // --- DSAS States ---
  const [transectCount, setTransectCount] = useState(15);
  const [shorelineShift, setShorelineShift] = useState(0); // anim cycle offset
  const [hoveredTransect, setHoveredTransect] = useState<number | null>(null);
  
  // --- AHP States ---
  const [weightRain, setWeightRain] = useState(35);
  const [weightSlope, setWeightSlope] = useState(30);
  const [weightNdvi, setWeightNdvi] = useState(15);
  const [weightInf, setWeightInf] = useState(20);
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>({ r: 2, c: 2 });
  const [ahpLayout, setAhpLayout] = useState<"stacked" | "grid">("stacked");

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLabelStyle = (type: "rain" | "slope" | "ndvi" | "inf" | "out") => {
    if (ahpLayout === "stacked") {
      switch (type) {
        case "rain": return { left: "16px", top: "70px", transform: "translateY(0)" };
        case "ndvi": return { left: "16px", top: "210px", transform: "translateY(0)" };
        case "out": return { left: "16px", top: "350px", transform: "translateY(0)" };
        case "slope": return { right: "16px", top: "140px", transform: "translateY(0)" };
        case "inf": return { right: "16px", top: "280px", transform: "translateY(0)" };
      }
    } else {
      if (isMobile) {
        switch (type) {
          case "rain": return { left: "calc(50% - 55px)", top: "15px", transform: "translateX(-50%) scale(0.9)" };
          case "slope": return { left: "calc(50% + 55px)", top: "15px", transform: "translateX(-50%) scale(0.9)" };
          case "ndvi": return { left: "calc(50% - 55px)", top: "125px", transform: "translateX(-50%) scale(0.9)" };
          case "inf": return { left: "calc(50% + 55px)", top: "125px", transform: "translateX(-50%) scale(0.9)" };
          case "out": return { left: "calc(50%)", top: "240px", transform: "translateX(-50%) scale(0.9)" };
        }
      } else {
        switch (type) {
          case "rain": return { left: "calc(50% - 260px)", top: "115px", transform: "translateX(-50%)" };
          case "slope": return { left: "calc(50% - 130px)", top: "115px", transform: "translateX(-50%)" };
          case "ndvi": return { left: "calc(50%)", top: "115px", transform: "translateX(-50%)" };
          case "inf": return { left: "calc(50% + 130px)", top: "115px", transform: "translateX(-50%)" };
          case "out": return { left: "calc(50% + 260px)", top: "115px", transform: "translateX(-50%)" };
        }
      }
    }
  };

  // Auto-normalize AHP weights to sum to 100%
  const totalWeight = weightRain + weightSlope + weightNdvi + weightInf;
  const normRain = (weightRain / totalWeight) * 100;
  const normSlope = (weightSlope / totalWeight) * 100;
  const normNdvi = (weightNdvi / totalWeight) * 100;
  const normInf = (weightInf / totalWeight) * 100;

  // Generate static cell values for AHP layers (5x5 grid)
  const cellValues = useRef({
    rain: [
      [90, 85, 80, 75, 70],
      [85, 80, 75, 70, 65],
      [80, 75, 70, 65, 60],
      [75, 70, 65, 60, 55],
      [70, 65, 60, 55, 50]
    ],
    slope: [
      [15, 20, 45, 80, 95],
      [12, 18, 40, 75, 90],
      [10, 15, 30, 65, 85],
      [5,  8, 12, 40, 60],
      [2,  3,  5, 10, 20]
    ],
    ndvi: [
      [20, 25, 30, 45, 60],
      [25, 30, 35, 55, 70],
      [30, 35, 45, 65, 75],
      [40, 45, 55, 70, 80],
      [50, 55, 65, 75, 85]
    ],
    inf: [
      [80, 75, 70, 50, 30],
      [75, 70, 65, 45, 25],
      [70, 65, 60, 40, 20],
      [65, 60, 50, 35, 15],
      [60, 50, 40, 30, 10]
    ]
  });

  // Shoreline coordinates generation (DSAS)
  const generateShorelinePoints = (year: 2000 | 2024, shift: number) => {
    const points: { x: number; y: number }[] = [];
    const width = 500;
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      // Wavy shoreline baseline Y around 130
      let y = 130 + Math.sin(x * 0.02) * 22 + Math.cos(x * 0.05) * 8;
      
      if (year === 2000) {
        // historic shoreline
        y += Math.sin(x * 0.015 + shift) * 8;
      } else {
        // current shoreline - show severe local erosion coves and accretion spits
        // 1. Accretion spit on the left (x < 150)
        const accretion = x < 150 ? Math.sin((x / 150) * Math.PI) * -38 : 0;
        // 2. Severe erosion cove in the center (x between 150 and 400)
        const erosion = (x >= 150 && x < 400) ? Math.sin(((x - 150) / 250) * Math.PI) * 48 : 0;
        // 3. Minor delta accretion on the right (x > 400)
        const delta = x >= 400 ? Math.sin(((x - 400) / 100) * Math.PI) * -22 : 0;
        
        y += accretion + erosion + delta + Math.sin(x * 0.035 - shift * 1.5) * 8;
      }
      points.push({ x, y });
    }
    return points;
  };

  const points2000 = generateShorelinePoints(2000, shorelineShift);
  const points2024 = generateShorelinePoints(2024, shorelineShift);

  // Shoreline auto-animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShorelineShift((prev) => prev + 0.03);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Compute DSAS Transect intersects
  const getTransectData = (index: number) => {
    const width = 500;
    const x = 30 + (index / (transectCount - 1)) * (width - 60);
    
    // Find closest points in shoreline arrays
    const pt2000 = points2000.reduce((prev, curr) => 
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
    );
    const pt2024 = points2024.reduce((prev, curr) => 
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
    );

    // Baseline is at Y = 250
    const baselineY = 240;
    const dist2000 = baselineY - pt2000.y;
    const dist2024 = baselineY - pt2024.y;
    
    // Shoreline change (Net Shoreline Movement - NSM)
    // Positive means accretion (shoreline moved away from baseline / seaward)
    // Negative means erosion (shoreline moved closer to baseline / landward)
    const nsm = dist2024 - dist2000;
    const epr = nsm / 24; // End Point Rate (meters/year)

    return {
      x,
      baselineY,
      y2000: pt2000.y,
      y2024: pt2024.y,
      nsm,
      epr
    };
  };

  // Cell suscetibility math (AHP)
  const getCellSusceptibility = (r: number, c: number) => {
    const rainVal = cellValues.current.rain[r][c]; // higher = worse
    const slopeVal = cellValues.current.slope[r][c]; // higher = worse
    const ndviVal = 100 - cellValues.current.ndvi[r][c]; // lower NDVI = worse
    const infVal = 100 - cellValues.current.inf[r][c]; // lower infiltration = worse

    const rawScore = 
      (rainVal * (normRain / 100)) + 
      (slopeVal * (normSlope / 100)) + 
      (ndviVal * (normNdvi / 100)) + 
      (infVal * (normInf / 100));

    return Math.round(rawScore);
  };

  // Susceptibility color helper
  const getSusceptibilityColor = (val: number) => {
    if (val > 75) return "bg-rose-500/80 border-rose-400";
    if (val > 55) return "bg-orange-500/80 border-orange-400";
    if (val > 35) return "bg-amber-500/80 border-amber-400";
    return "bg-emerald-500/80 border-emerald-400";
  };

  return (
    <section id="sandbox" className="py-24 bg-secondary/15 relative overflow-hidden border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-xs uppercase tracking-widest text-accent font-mono font-semibold mb-3">
          05 · Geospatial & Hydro-Environmental Simulation Lab
        </div>
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">
              Simulation & Modeling Lab
            </h2>
            <p className="text-muted-foreground max-w-3xl text-sm md:text-base leading-relaxed">
              Explore interactive models representing methodologies from my research publications, including machine learning flood risk estimation (SHAP), AHP multi-criteria weighted overlay maps, and shoreline change rate analysis (DSAS).
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-secondary/60 border border-border p-1 rounded-full shrink-0 z-30">
            <button
              onClick={() => setActiveTab("dsas")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all ${
                activeTab === "dsas"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              DSAS Shoreline
            </button>
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all ${
                activeTab === "sandbox"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Flood Sandbox
            </button>
            <button
              onClick={() => setActiveTab("ahp")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all ${
                activeTab === "ahp"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              AHP Overlay
            </button>
          </div>
        </div>

        {/* Tab 1: Flood Risk Sandbox */}
        {activeTab === "sandbox" && (
          <EnvironmentalModelSandbox />
        )}

        {/* Tab 2: DSAS Shoreline Analysis */}
        {activeTab === "dsas" && (
          <div className="grid lg:grid-cols-12 gap-8 items-stretch font-sans">
            {/* Visualizer Frame */}
            <div className="lg:col-span-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                    DSAS Transect Generation Simulator
                  </span>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    Scale: 1px = 1m | Epochs: 2000 — 2024
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full bg-[#060a12] border border-border/60 rounded-xl overflow-hidden flex items-center justify-center">
                  {/* Cartographic Title HUD overlay */}
                  <div className="absolute top-4 left-4 z-20 bg-slate-900/95 border border-slate-700/80 p-2.5 rounded-md backdrop-blur-md shadow-lg pointer-events-none text-white">
                    <div className="text-[10px] font-bold font-mono text-accent uppercase tracking-wider">
                      Pensacola Beach Shoreline Dynamics
                    </div>
                    <div className="text-[8px] font-mono text-white/50 mt-0.5">
                      Model: USGS DSAS Shoreline Forecasting (2000 - 2024)
                    </div>
                  </div>

                  {/* Custom SVG Drawing Shorelines and Transects */}
                  <svg viewBox="0 0 500 280" className="w-full h-full">
                    {/* Cartographic grid */}
                    <defs>
                      <pattern id="dsas-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dsas-grid)" />

                    {/* Accretion / Erosion Zone Fills */}
                    {Array.from({ length: 40 }).map((_, idx) => {
                      const x = (idx / 39) * 500;
                      const pt2000 = points2000.reduce((prev, curr) => Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev);
                      const pt2024 = points2024.reduce((prev, curr) => Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev);
                      const isErosion = pt2024.y > pt2000.y; // moved inland (towards baseline Y=240, so Y coordinate is larger)
                      return (
                        <line
                          key={idx}
                          x1={x}
                          y1={pt2000.y}
                          x2={x}
                          y2={pt2024.y}
                          stroke={isErosion ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)"}
                          strokeWidth="8"
                        />
                      );
                    })}

                    {/* Reference Baseline */}
                    <line x1="20" y1="240" x2="480" y2="240" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeDasharray="5,4" />
                    <text x="30" y="255" fill="rgba(255, 255, 255, 0.5)" className="font-mono text-[9px] font-bold">DSAS REFERENCE BASELINE</text>

                    {/* Historical Shoreline 2000 */}
                    <path
                      d={`M ${points2000.map(p => `${p.x},${p.y}`).join(" L ")}`}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <text x="330" y={points2000[95].y - 8} fill="#38bdf8" className="font-mono text-[8px] font-bold">Shoreline 2000 (Historic)</text>

                    {/* Current Shoreline 2024 */}
                    <path
                      d={`M ${points2024.map(p => `${p.x},${p.y}`).join(" L ")}`}
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="2.5"
                    />
                    <text x="330" y={points2024[95].y - 8} fill="#fb7185" className="font-mono text-[8px] font-bold">Shoreline 2024 (Current)</text>

                    {/* Render DSAS Transects */}
                    {Array.from({ length: transectCount }).map((_, i) => {
                      const data = getTransectData(i);
                      const isHovered = hoveredTransect === i;
                      const isErosion = data.y2024 > data.y2000;
                      return (
                        <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredTransect(i)} onMouseLeave={() => setHoveredTransect(null)}>
                          {/* Invisible hover helper for thicker interaction target */}
                          <line
                            x1={data.x}
                            y1={data.baselineY}
                            x2={data.x}
                            y2={Math.min(data.y2000, data.y2024) - 10}
                            stroke="transparent"
                            strokeWidth="12"
                          />
                          {/* Actual Transect Ray */}
                          <line
                            x1={data.x}
                            y1={data.baselineY}
                            x2={data.x}
                            y2={data.y2024}
                            stroke={isHovered ? "#60a5fa" : "rgba(255, 255, 255, 0.15)"}
                            strokeWidth={isHovered ? "2" : "1"}
                            strokeDasharray={isHovered ? "" : "3,2"}
                          />
                          {/* Historical point intersection circle */}
                          <circle cx={data.x} cy={data.y2000} r={isHovered ? 4 : 2} fill="#38bdf8" />
                          {/* Current point intersection circle */}
                          <circle cx={data.x} cy={data.y2024} r={isHovered ? 4 : 2.5} fill="#fb7185" />
                          
                          {/* NSM / EPR line segment highlighter */}
                          <line
                            x1={data.x}
                            y1={data.y2000}
                            x2={data.x}
                            y2={data.y2024}
                            stroke={isErosion ? "#ef4444" : "#10b981"}
                            strokeWidth={isHovered ? "4" : "2"}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* On-Map HUD overlay */}
                  {hoveredTransect !== null && (() => {
                    const data = getTransectData(hoveredTransect);
                    return (
                      <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700/80 p-3 rounded-lg backdrop-blur-md text-[11px] font-mono space-y-1.5 shadow-xl text-white z-25">
                        <div className="text-accent font-bold">TRANSECT #{hoveredTransect + 1} STATS:</div>
                        <div>Historic Dist: <span className="text-sky-300">{(data.baselineY - data.y2000).toFixed(1)}m</span></div>
                        <div>Current Dist: <span className="text-rose-300">{(data.baselineY - data.y2024).toFixed(1)}m</span></div>
                        <div>Net Shift (NSM): <span className={data.nsm < 0 ? "text-rose-400" : "text-emerald-400"}>{data.nsm.toFixed(1)}m ({data.nsm < 0 ? "Erosion" : "Accretion"})</span></div>
                        <div className="border-t border-white/10 pt-1 font-semibold">
                          EPR Rate: <span className={data.epr < 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>{data.epr.toFixed(2)} m/yr</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Balanced bottom row under the animation window */}
              <div className="mt-6 border-t border-border/40 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left items-center">
                <p className="text-sm text-muted-foreground/95 leading-relaxed font-medium md:pr-4">
                  The <strong className="font-semibold text-foreground">Digital Shoreline Analysis System (DSAS)</strong> computes rate-of-change statistics from multiple historical shoreline vectors. It casts measurement transects perpendicular to a reference baseline.
                </p>

                {/* Spacing Slider */}
                <div className="border border-border/40 bg-secondary/15 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono text-accent uppercase tracking-widest">TRANSECT SAMPLING COUNT</span>
                    <span className="font-mono text-xs text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded">{transectCount} transects</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={transectCount}
                    onChange={(e) => setTransectCount(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <p className="text-[10px] text-muted-foreground leading-relaxed font-sans font-medium">
                    Adjust count to change baseline sampling density (simulating USGS DSAS spacing configurations).
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold uppercase tracking-wider font-mono text-foreground/90">
                    DSAS Dynamics & Math
                  </span>
                </div>

                <div className="border border-border/50 rounded-xl p-4 bg-secondary/15 space-y-4">
                  {/* NSM */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold">
                      1. Net Shoreline Movement (NSM)
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                      Measures the physical distance (meters) between the oldest (2000) and newest (2024) shorelines.
                    </p>
                    <div className="bg-secondary/40 border border-border/60 p-2 rounded text-[11px] font-mono text-foreground/90 text-center font-bold">
                       NSM = Distance(2024) - Distance(2000)
                    </div>
                  </div>

                  {/* EPR */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold">
                      2. End Point Rate (EPR)
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                      Dividing the NSM by the elapsed time span between the shoreline epochs to get the annual rate.
                    </p>
                    <div className="bg-secondary/40 border border-border/60 p-2 rounded text-[11px] font-mono text-foreground/90 text-center font-bold">
                      EPR = NSM / Time Span (24 Years)
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-2 font-medium bg-secondary/10 p-3.5 rounded-xl border border-border/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Accretion rate: shoreline expansion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span>Erosion rate: shoreline retreat</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2.5 bg-accent/5 border border-accent/15 p-4 rounded-xl text-xs text-muted-foreground font-medium">
                  <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <p>
                    In shoreline research, these rates identify vulnerable coastlines, buffer zones, and validate shoreline prediction models.
                  </p>
                </div>

                <div className="border border-border/50 rounded-xl p-4 bg-secondary/15 space-y-2 text-left">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Methodology Reference
                  </div>
                  <p className="text-[11px] text-foreground/90 leading-relaxed font-semibold">
                    "GeoAI-Enabled Remote Sensing Framework for Shoreline Change Forecasting at Pensacola Beach, Florida"
                  </p>
                  <div className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                    Chowdhury, M. S., <span className="text-accent font-bold">Mayukh, A. A.</span>, Kim, Y. J., An, J., & Nam, B. H. (2026). <span className="text-foreground/80 font-medium">ACEM26 Conference paper.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: AHP Multi-Criteria Overlay */}
        {activeTab === "ahp" && (
          <div className="grid lg:grid-cols-12 gap-8 items-stretch font-sans">
            {/* GIS Visualization Area */}
            <div className="lg:col-span-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                    Humphreys County, TN — GIS Weighted Overlay
                  </span>
                  
                  {/* Layout Toggle Selector */}
                  <div className="flex bg-secondary/80 border border-border/80 p-0.5 rounded-full text-[10px] font-mono font-bold z-30">
                    <button
                      onClick={() => setAhpLayout("stacked")}
                      className={`px-3 py-1 rounded-full transition-all ${
                        ahpLayout === "stacked"
                          ? "bg-foreground text-background shadow-md"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      3D Stack
                    </button>
                    <button
                      onClick={() => setAhpLayout("grid")}
                      className={`px-3 py-1 rounded-full transition-all ${
                        ahpLayout === "grid"
                          ? "bg-foreground text-background shadow-md"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      2D Grid (Dashboard)
                    </button>
                  </div>
                </div>
                <div className="relative h-[460px] w-full bg-[#060a12] border border-border/60 rounded-xl overflow-hidden flex items-center justify-center">
                  
                  {/* Geographic Reference: North Arrow and Scale bar */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[9px] text-white/40 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white/50">↑</span> N
                    </div>
                    <div>Scale: 1:50,000</div>
                  </div>

                  {/* FLAT 2D OVERLAY LABELS - Positioned absolutely inside the canvas container. Aligned vertically with layers in 3D Stack mode, and centered above maps in 2D Grid mode. */}
                  {/* Rainfall Label */}
                  <div 
                    style={getLabelStyle("rain")}
                    className="absolute z-35 text-[10px] font-mono text-white bg-slate-900/95 border border-slate-700/80 px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 w-[145px] transition-all duration-700 ease-in-out pointer-events-none select-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>Rainfall: {normRain.toFixed(0)}%</span>
                  </div>
                  
                  {/* Slope Label */}
                  <div 
                    style={getLabelStyle("slope")}
                    className="absolute z-35 text-[10px] font-mono text-white bg-slate-900/95 border border-slate-700/80 px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 w-[145px] transition-all duration-700 ease-in-out pointer-events-none select-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    <span>Slope Map: {normSlope.toFixed(0)}%</span>
                  </div>

                  {/* NDVI Label */}
                  <div 
                    style={getLabelStyle("ndvi")}
                    className="absolute z-35 text-[10px] font-mono text-white bg-slate-900/95 border border-slate-700/80 px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 w-[145px] transition-all duration-700 ease-in-out pointer-events-none select-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>NDVI Cover: {normNdvi.toFixed(0)}%</span>
                  </div>
                  
                  {/* Soil Infiltration Label */}
                  <div 
                    style={getLabelStyle("inf")}
                    className="absolute z-35 text-[10px] font-mono text-white bg-slate-900/95 border border-slate-700/80 px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 w-[145px] transition-all duration-700 ease-in-out pointer-events-none select-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    <span>Soil Infil.: {normInf.toFixed(0)}%</span>
                  </div>

                  {/* Output Susceptibility Label */}
                  <div 
                    style={getLabelStyle("out")}
                    className="absolute z-35 text-[10px] font-mono text-accent font-bold bg-slate-900 border border-accent/40 px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 w-[145px] transition-all duration-700 ease-in-out pointer-events-none select-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0 animate-pulse" />
                    <span>SUSCEPTIBILITY</span>
                  </div>

                  {/* 3D/2D Viewport wrapper */}
                  <div 
                    style={{
                      transform: ahpLayout === "stacked"
                        ? "perspective(1200px) rotateX(46deg) rotateZ(-26deg) translateY(-20px)"
                        : "perspective(1200px) rotateX(0deg) rotateZ(0deg) translateY(0px)",
                      transformStyle: "preserve-3d",
                    }}
                    className="relative w-[230px] h-[230px] transition-transform duration-700 ease-in-out"
                  >
                    
                    {/* Layer 1: Rainfall */}
                    <div 
                      style={{ 
                        transform: ahpLayout === "stacked"
                          ? "translateZ(210px)"
                          : isMobile
                            ? "translateX(-55px) translateY(-105px) translateZ(0px) scale(0.42)"
                            : "translateX(-260px) translateY(0px) translateZ(0px) scale(0.48)"
                      }}
                      className="absolute inset-0 bg-slate-950/95 border border-white/10 rounded shadow-md grid grid-cols-5 p-1.5 transition-all duration-700 ease-in-out hover:border-accent/60"
                    >
                      {/* Humphreys County River Alignment path on map layer */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25] z-20">
                        <path d="M 0 35 Q 25 35, 40 50 T 75 40 T 100 65" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 40 50 Q 30 75, 45 100" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>

                      {cellValues.current.rain.map((row, r) => 
                        row.map((val, c) => (
                          <div
                            key={`rain-${r}-${c}`}
                            onMouseEnter={() => setHoveredCell({ r, c })}
                            className={`m-[1.5px] rounded-[3px] transition-all duration-150 relative z-10 ${
                              hoveredCell?.r === r && hoveredCell?.c === c ? "ring-2 ring-accent scale-105" : ""
                            }`}
                            style={{ backgroundColor: `rgba(59, 130, 246, ${val / 150})` }}
                          />
                        ))
                      )}
                    </div>

                    {/* Layer 2: Slope */}
                    <div 
                      style={{ 
                        transform: ahpLayout === "stacked"
                          ? "translateZ(120px)"
                          : isMobile
                            ? "translateX(55px) translateY(-105px) translateZ(0px) scale(0.42)"
                            : "translateX(-130px) translateY(0px) translateZ(0px) scale(0.48)"
                      }}
                      className="absolute inset-0 bg-slate-950/95 border border-white/10 rounded shadow-md grid grid-cols-5 p-1.5 transition-all duration-700 ease-in-out hover:border-accent/60"
                    >
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25] z-20">
                        <path d="M 0 35 Q 25 35, 40 50 T 75 40 T 100 65" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 40 50 Q 30 75, 45 100" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>

                      {cellValues.current.slope.map((row, r) => 
                        row.map((val, c) => (
                          <div
                            key={`slope-${r}-${c}`}
                            onMouseEnter={() => setHoveredCell({ r, c })}
                            className={`m-[1.5px] rounded-[3px] transition-all duration-150 relative z-10 ${
                              hoveredCell?.r === r && hoveredCell?.c === c ? "ring-2 ring-accent scale-105" : ""
                            }`}
                            style={{ backgroundColor: `rgba(249, 115, 22, ${val / 120})` }}
                          />
                        ))
                      )}
                    </div>

                    {/* Layer 3: NDVI */}
                    <div 
                      style={{ 
                        transform: ahpLayout === "stacked"
                          ? "translateZ(30px)"
                          : isMobile
                            ? "translateX(-55px) translateY(5px) translateZ(0px) scale(0.42)"
                            : "translateX(0px) translateY(0px) translateZ(0px) scale(0.48)"
                      }}
                      className="absolute inset-0 bg-slate-950/95 border border-white/10 rounded shadow-md grid grid-cols-5 p-1.5 transition-all duration-700 ease-in-out hover:border-accent/60"
                    >
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25] z-20">
                        <path d="M 0 35 Q 25 35, 40 50 T 75 40 T 100 65" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 40 50 Q 30 75, 45 100" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>

                      {cellValues.current.ndvi.map((row, r) => 
                        row.map((val, c) => (
                          <div
                            key={`ndvi-${r}-${c}`}
                            onMouseEnter={() => setHoveredCell({ r, c })}
                            className={`m-[1.5px] rounded-[3px] transition-all duration-150 relative z-10 ${
                              hoveredCell?.r === r && hoveredCell?.c === c ? "ring-2 ring-accent scale-105" : ""
                            }`}
                            style={{ backgroundColor: `rgba(16, 185, 129, ${(100 - val) / 130})` }}
                          />
                        ))
                      )}
                    </div>

                    {/* Layer 4: Soil Infiltration */}
                    <div 
                      style={{ 
                        transform: ahpLayout === "stacked"
                          ? "translateZ(-60px)"
                          : isMobile
                            ? "translateX(55px) translateY(5px) translateZ(0px) scale(0.42)"
                            : "translateX(130px) translateY(0px) translateZ(0px) scale(0.48)"
                      }}
                      className="absolute inset-0 bg-slate-950/95 border border-white/10 rounded shadow-md grid grid-cols-5 p-1.5 transition-all duration-700 ease-in-out hover:border-accent/60"
                    >
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25] z-20">
                        <path d="M 0 35 Q 25 35, 40 50 T 75 40 T 100 65" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 40 50 Q 30 75, 45 100" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>

                      {cellValues.current.inf.map((row, r) => 
                        row.map((val, c) => (
                          <div
                            key={`inf-${r}-${c}`}
                            onMouseEnter={() => setHoveredCell({ r, c })}
                            className={`m-[1.5px] rounded-[3px] transition-all duration-150 relative z-10 ${
                              hoveredCell?.r === r && hoveredCell?.c === c ? "ring-2 ring-accent scale-105" : ""
                            }`}
                            style={{ backgroundColor: `rgba(139, 92, 246, ${(100 - val) / 130})` }}
                          />
                        ))
                      )}
                    </div>

                    {/* Layer 5: Output Susceptibility Map */}
                    <div 
                      style={{ 
                        transform: ahpLayout === "stacked"
                          ? "translateZ(-150px)"
                          : isMobile
                            ? "translateX(0px) translateY(115px) translateZ(0px) scale(0.42)"
                            : "translateX(260px) translateY(0px) translateZ(0px) scale(0.48)"
                      }}
                      className="absolute inset-0 bg-slate-950 border-2 border-accent/40 rounded shadow-[0_0_35px_rgba(59,130,246,0.25)] grid grid-cols-5 p-1.5 transition-all duration-700 ease-in-out hover:border-accent/60"
                    >
                      {/* Fully visible River delta vector on bottom map */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-20">
                        <path d="M 0 35 Q 25 35, 40 50 T 75 40 T 100 65" fill="none" stroke="#0ea5e9" strokeWidth="2.8" strokeLinecap="round" />
                        <path d="M 40 50 Q 30 75, 45 100" fill="none" stroke="#0ea5e9" strokeWidth="2.0" strokeLinecap="round" />
                      </svg>

                      {Array.from({ length: 5 }).map((_, r) => 
                        Array.from({ length: 5 }).map((_, c) => {
                          const val = getCellSusceptibility(r, c);
                          return (
                            <div
                              key={`out-${r}-${c}`}
                              onMouseEnter={() => setHoveredCell({ r, c })}
                              className={`m-[1.5px] rounded-[3px] border transition-all duration-150 relative z-10 ${getSusceptibilityColor(val)} ${
                                hoveredCell?.r === r && hoveredCell?.c === c ? "ring-2 ring-white scale-110 shadow-lg z-20" : "border-transparent"
                              }`}
                            />
                          );
                        })
                      )}
                    </div>

                    {/* Animated vertical Ray tracing through active cell */}
                    {hoveredCell && (() => {
                      const cellSize = 226 / 5;
                      const rx = (hoveredCell.c * cellSize) + (cellSize / 2);
                      const ry = (hoveredCell.r * cellSize) + (cellSize / 2);
                      return (
                        <div
                          style={{
                            position: "absolute",
                            left: `${rx}px`,
                            top: `${ry}px`,
                            height: "365px", // spans top to bottom layer (Z span 210 to -150)
                            width: "2px",
                            background: "linear-gradient(to bottom, #3b82f6 0%, #8b5cf6 50%, #f43f5e 100%)",
                            transform: "translateZ(-155px)",
                            transformStyle: "preserve-3d",
                            pointerEvents: "none",
                            boxShadow: "0 0 10px rgba(59,130,246,0.8)",
                            opacity: ahpLayout === "stacked" ? 0.75 : 0,
                            transition: "opacity 0.5s ease-in-out",
                          }}
                          className="animate-pulse z-30"
                        />
                      );
                    })()}

                  </div>
                </div>
              </div>

              {/* Sliders for AHP factors */}
              <div className="mt-6 border-t border-border/40 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-secondary/10 rounded-xl p-4">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase font-mono mb-1">
                    Rainfall Weight
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={weightRain}
                    onChange={(e) => setWeightRain(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="text-xs font-mono font-bold mt-1 text-accent">{normRain.toFixed(0)}%</div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase font-mono mb-1">
                    Slope Weight
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={weightSlope}
                    onChange={(e) => setWeightSlope(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="text-xs font-mono font-bold mt-1 text-accent">{normSlope.toFixed(0)}%</div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase font-mono mb-1">
                    NDVI Weight
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={weightNdvi}
                    onChange={(e) => setWeightNdvi(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="text-xs font-mono font-bold mt-1 text-accent">{normNdvi.toFixed(0)}%</div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase font-mono mb-1">
                    Infiltration Weight
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={weightInf}
                    onChange={(e) => setWeightInf(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="text-xs font-mono font-bold mt-1 text-accent">{normInf.toFixed(0)}%</div>
                </div>
              </div>
            </div>

            {/* Overlay calculation details sidebar */}
            <div className="lg:col-span-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold uppercase tracking-wider font-mono text-foreground/90">
                    AHP Overlay Matrix
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Analytic Hierarchy Process (AHP) assigns mathematical weights to factors based on pairwise comparison matrices. In GIS, these raster factor layers are overlayed pixel-by-pixel.
                </p>

                {hoveredCell && (() => {
                  const rainVal = cellValues.current.rain[hoveredCell.r][hoveredCell.c];
                  const slopeVal = cellValues.current.slope[hoveredCell.r][hoveredCell.c];
                  const ndviVal = 100 - cellValues.current.ndvi[hoveredCell.r][hoveredCell.c];
                  const infVal = 100 - cellValues.current.inf[hoveredCell.r][hoveredCell.c];
                  const finalVal = getCellSusceptibility(hoveredCell.r, hoveredCell.c);
                  
                  let riskTxt = "Low Susceptibility";
                  let riskColor = "text-emerald-500";
                  if (finalVal > 75) { riskTxt = "Extreme Susceptibility"; riskColor = "text-rose-500"; }
                  else if (finalVal > 55) { riskTxt = "High Susceptibility"; riskColor = "text-orange-500"; }
                  else if (finalVal > 35) { riskTxt = "Moderate Susceptibility"; riskColor = "text-amber-500"; }

                  return (
                    <div className="border border-border/50 rounded-xl p-4 bg-secondary/15 space-y-3 font-mono text-[11px] text-foreground/90">
                      <div className="text-accent font-bold border-b border-border/60 pb-1">
                        CELL ({hoveredCell.r}, {hoveredCell.c}) OVERLAY MATH:
                      </div>
                      <div className="flex justify-between">
                        <span>Rainfall:</span>
                        <span>{rainVal} &times; {normRain.toFixed(0)}% = {((rainVal * normRain) / 100).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Slope:</span>
                        <span>{slopeVal} &times; {normSlope.toFixed(0)}% = {((slopeVal * normSlope) / 100).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NDVI (Loss):</span>
                        <span>{ndviVal} &times; {normNdvi.toFixed(0)}% = {((ndviVal * normNdvi) / 100).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clay soil:</span>
                        <span>{infVal} &times; {normInf.toFixed(0)}% = {((infVal * normInf) / 100).toFixed(1)}</span>
                      </div>
                      <div className="border-t border-border/60 pt-2 flex justify-between font-bold text-xs">
                        <span>Overlay Sum:</span>
                        <span className={riskColor}>{finalVal}%</span>
                      </div>
                      <div className={`text-[10px] text-center font-bold font-sans uppercase mt-1 ${riskColor}`}>
                        {riskTxt}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-4">
                <div className="text-xs text-muted-foreground space-y-1.5 leading-relaxed bg-secondary/20 p-3 rounded-lg border border-border/40 font-medium">
                  <div className="font-semibold text-foreground mb-1">SUSCEPTIBILITY FORMULA:</div>
                  <div className="bg-secondary/40 border border-border/60 p-2 rounded text-[11px] font-mono text-foreground/90 text-center font-bold">
                    Score = Σ (Factor_i × Weight_i)
                  </div>
                </div>

                <div className="border border-border/50 rounded-xl p-4 bg-secondary/15 space-y-2">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Methodology Reference
                  </div>
                  <p className="text-[11px] text-foreground/90 leading-relaxed font-semibold">
                    "Comparative Machine Learning and Explainable Flood Susceptibility Mapping in Humphreys County, Tennessee Using AHP and SHAP"
                  </p>
                  <div className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                    <span className="text-accent font-bold">Mayukh, A. A.</span>, Chowdhury, M. S., & Kim, Y. J. (2026). <span className="text-foreground/80 font-medium">ACEM26 Conference paper.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
