import React from "react";

export const AutoCADIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    {/* AutoCAD Red Folded Ribbon Logo */}
    <path d="M12,85 L50,15 L88,85 L65,85 L50,55 L35,85 Z" fill="#E11D48" />
    <path d="M50,15 L62,55 L50,55 L38,55 Z" fill="#BE123C" opacity="0.85" />
    <path d="M50,15 L50,55 L65,85 L88,85 Z" fill="#F43F5E" opacity="0.7" />
  </svg>
);

export const QGISIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    {/* Green outer ring with compass arrow */}
    <circle cx="50" cy="50" r="34" fill="none" stroke="#589632" strokeWidth="8" />
    <path d="M58,58 L78,78" stroke="#589632" strokeWidth="10" strokeLinecap="round" />
    <path d="M50,22 L62,42 L50,37 L38,42 Z" fill="#8bc34a" />
    <circle cx="50" cy="50" r="10" fill="#589632" />
  </svg>
);

export const ArcGISIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <circle cx="50" cy="50" r="42" fill="#005b96" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#60a5fa" strokeWidth="2" />
    {/* Globe grids */}
    <path d="M50,8 A42,42 0 0,1 50,92" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <path d="M8,50 A42,42 0 0,1 92,50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <path d="M15,20 Q35,40 50,40 Q35,70 15,80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <path d="M85,20 Q65,40 50,40 Q65,70 85,80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    {/* Data clusters */}
    <path d="M30,30 Q45,35 50,40 Q35,65 30,70" fill="#4ade80" opacity="0.75" />
    <path d="M50,40 Q65,35 70,30 Q65,65 50,60" fill="#60a5fa" opacity="0.75" />
  </svg>
);

export const GEEIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <circle cx="50" cy="50" r="40" fill="#1E293B" />
    {/* Blue/Green Leaf Globe representing GEE */}
    <path d="M50,15 C65,30 65,55 50,78 C35,55 35,30 50,15" fill="#34A853" opacity="0.85" />
    <path d="M50,22 C32,40 32,65 50,85 C68,65 68,40 50,22" fill="#4285F4" opacity="0.7" />
    <circle cx="50" cy="48" r="8" fill="#F7DF1E" opacity="0.9" />
  </svg>
);

export const ETABSIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <rect x="15" y="15" width="70" height="70" fill="#1e1b4b" stroke="#7C3AED" strokeWidth="4" rx="8" />
    {/* 3D Structural grid */}
    <line x1="30" y1="20" x2="30" y2="80" stroke="#a78bfa" strokeWidth="3" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="#a78bfa" strokeWidth="3" />
    <line x1="70" y1="20" x2="70" y2="80" stroke="#a78bfa" strokeWidth="3" />
    <line x1="20" y1="35" x2="80" y2="35" stroke="#a78bfa" strokeWidth="3" />
    <line x1="20" y1="55" x2="80" y2="55" stroke="#a78bfa" strokeWidth="3" />
    {/* Red braces */}
    <line x1="30" y1="35" x2="50" y2="55" stroke="#ef4444" strokeWidth="3.5" />
    <line x1="50" y1="35" x2="70" y2="55" stroke="#ef4444" strokeWidth="3.5" />
    <line x1="50" y1="35" x2="30" y2="55" stroke="#ef4444" strokeWidth="3.5" />
  </svg>
);

export const PlaxisIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <rect x="10" y="10" width="80" height="80" rx="8" fill="#0f172a" />
    {/* Finite elements forming a blue P */}
    <polygon points="25,25 58,25 58,55 25,55" fill="#0EA5E9" opacity="0.8" />
    <polygon points="58,25 80,40 58,55" fill="#38bdf8" />
    <polygon points="25,55 42,55 42,75 25,75" fill="#0284c7" />
    {/* Mesh triangulation lines */}
    <line x1="25" y1="25" x2="58" y2="55" stroke="#ffffff" strokeWidth="1.5" />
    <line x1="25" y1="55" x2="58" y2="25" stroke="#ffffff" strokeWidth="1.5" />
    <line x1="58" y1="55" x2="80" y2="40" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

export const HecRasIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <path d="M15,15 L85,15 L75,70 L50,88 L25,70 Z" fill="#1E3A8A" />
    {/* HecRas Blue Water Waves */}
    <path d="M25,42 Q40,30 50,42 T75,42" fill="none" stroke="#60a5fa" strokeWidth="6" strokeLinecap="round" />
    <path d="M25,58 Q40,46 50,58 T75,58" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export const EpanetIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <rect x="10" y="10" width="80" height="80" rx="8" fill="#0f172a" />
    {/* Pipes and junctions network */}
    <line x1="25" y1="50" x2="75" y2="50" stroke="#0D9488" strokeWidth="6" />
    <line x1="50" y1="25" x2="50" y2="75" stroke="#0D9488" strokeWidth="6" />
    <circle cx="25" cy="50" r="8" fill="#2dd4bf" />
    <circle cx="75" cy="50" r="8" fill="#2dd4bf" />
    <circle cx="50" cy="25" r="8" fill="#2dd4bf" />
    <circle cx="50" cy="75" r="8" fill="#2dd4bf" />
    <circle cx="50" cy="50" r="10" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

export const ETankIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    {/* Orange steel storage tank */}
    <rect x="25" y="25" width="50" height="55" rx="6" fill="#F97316" />
    <path d="M25,25 Q50,15 75,25 Z" fill="#ea580c" />
    <line x1="32" y1="25" x2="32" y2="80" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
    <line x1="68" y1="25" x2="68" y2="80" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
    {/* Weld line rings */}
    <line x1="25" y1="42" x2="75" y2="42" stroke="#ea580c" strokeWidth="2" />
    <line x1="25" y1="60" x2="75" y2="60" stroke="#ea580c" strokeWidth="2" />
  </svg>
);

export const SWMMIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <circle cx="50" cy="50" r="42" fill="#1e293b" />
    {/* Sewer inlet grate */}
    <line x1="28" y1="65" x2="72" y2="65" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="32" y1="75" x2="68" y2="75" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="35" y1="55" x2="65" y2="55" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Water droplet */}
    <path d="M50,15 C58,32 60,42 50,52 C40,42 42,32 50,15 Z" fill="#3B82F6" />
  </svg>
);

export const PythonIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <path d="M50,8 C27,8 28,18 28,26 L28,38 L50,38 L50,42 L20,42 C12,42 8,46 8,58 C8,70 18,70 24,70 L34,70 L34,60 C34,48 42,42 54,42 L76,42 C84,42 90,36 90,26 C90,16 80,8 64,8 Z" fill="#3776AB" />
    <path d="M50,92 C73,92 72,82 72,74 L72,62 L50,62 L50,58 L80,58 C88,58 92,54 92,42 C92,30 82,30 76,30 L66,30 L66,40 C66,52 58,58 46,58 L24,58 C16,58 10,64 10,74 C10,84 20,92 36,92 Z" fill="#FFD43B" />
    <circle cx="36" cy="22" r="3.5" fill="#ffffff" />
    <circle cx="64" cy="78" r="3.5" fill="#ffffff" />
  </svg>
);

export const CPlusPlusIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <path d="M15,10 L85,10 L75,75 L50,92 L25,75 Z" fill="#00599C" />
    <path d="M50,18 L50,84 L70,70 L78,18 Z" fill="#007cc7" />
    <text x="48" y="55" fill="#ffffff" fontSize="24" fontFamily="monospace" fontWeight="900" textAnchor="middle" dominantBaseline="central">C++</text>
  </svg>
);

export const JavaScriptIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <rect width="80" height="80" x="10" y="10" rx="6" fill="#F7DF1E" />
    <text x="82" y="82" fill="#000000" fontSize="30" fontFamily="monospace" fontWeight="900" textAnchor="end">JS</text>
  </svg>
);
