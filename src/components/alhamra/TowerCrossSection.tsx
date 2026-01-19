import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Building2 } from "lucide-react";

interface FloorMarker {
  level: string;
  levelNumber: number;
  name: string;
  type: "substation" | "refuge";
  description: string;
  details: string[];
}

const floorMarkers: FloorMarker[] = [
  {
    level: "B2",
    levelNumber: -2,
    name: "Substation 1",
    type: "substation",
    description: "Underground power distribution hub",
    details: [
      "Main power intake from Kuwait grid",
      "Primary transformer systems",
      "Emergency backup generators",
      "Uninterruptible power supply (UPS)",
    ],
  },
  {
    level: "4",
    levelNumber: 4,
    name: "Substation 2",
    type: "substation",
    description: "Lower tower power management",
    details: [
      "Powers basement to level 20",
      "Retail and parking systems",
      "Building management systems core",
      "Security infrastructure power",
    ],
  },
  {
    level: "27",
    levelNumber: 27,
    name: "Substation 3",
    type: "substation",
    description: "Mid-tower power relay",
    details: [
      "Services levels 21-45",
      "Office floor distribution",
      "HVAC zone controller",
      "Elevator motor room power",
    ],
  },
  {
    level: "29",
    levelNumber: 29,
    name: "Refuge Floor 1",
    type: "refuge",
    description: "Emergency evacuation zone",
    details: [
      "Fire-resistant construction",
      "Independent ventilation system",
      "Emergency communication hub",
      "First aid and safety supplies",
    ],
  },
  {
    level: "52",
    levelNumber: 52,
    name: "Substation 4",
    type: "substation",
    description: "Upper tower power distribution",
    details: [
      "Powers levels 46-65",
      "Premium office floor systems",
      "High-capacity elevator banks",
      "Façade lighting controls",
    ],
  },
  {
    level: "54",
    levelNumber: 54,
    name: "Refuge Floor 2",
    type: "refuge",
    description: "High-rise emergency shelter",
    details: [
      "Reinforced structural elements",
      "Smoke-proof pressurized area",
      "Direct stairwell access",
      "Helipad coordination point",
    ],
  },
  {
    level: "76",
    levelNumber: 76,
    name: "Substation 5",
    type: "substation",
    description: "Crown level power management",
    details: [
      "Observation deck systems",
      "Aircraft warning lights",
      "Spire illumination",
      "Weather monitoring equipment",
    ],
  },
];

const TowerCrossSection = () => {
  const [activeMarker, setActiveMarker] = useState<FloorMarker | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  // Tower dimensions for positioning (0 = ground, 76 = top)
  const totalFloors = 78; // Including basement levels
  const towerHeight = 500; // px
  const baseOffset = 2; // For basement levels

  const getYPosition = (levelNumber: number) => {
    const normalizedLevel = levelNumber + baseOffset;
    const percentage = 1 - normalizedLevel / totalFloors;
    return percentage * towerHeight;
  };

  return (
    <div className="relative py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">
        {/* Tower Visualization */}
        <div className="relative flex-shrink-0">
          {/* Tower SVG */}
          <svg
            viewBox="0 0 200 600"
            className="w-48 md:w-64 h-auto"
            style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }}
          >
            {/* Tower body - twisted shape approximation */}
            <defs>
              <linearGradient id="towerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--charcoal-600))" />
                <stop offset="50%" stopColor="hsl(var(--charcoal-700))" />
                <stop offset="100%" stopColor="hsl(var(--charcoal-800))" />
              </linearGradient>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(217, 91%, 40%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Main tower body */}
            <path
              d="M60 580 L50 560 Q30 400 40 200 Q50 80 90 20 L100 10 L110 20 Q150 80 160 200 Q170 400 150 560 L140 580 Z"
              fill="url(#towerGradient)"
              stroke="hsl(var(--charcoal-500))"
              strokeWidth="1"
            />

            {/* Glass facade highlights */}
            <path
              d="M65 560 Q45 400 55 200 Q65 100 95 30"
              fill="none"
              stroke="url(#glassGradient)"
              strokeWidth="20"
              opacity="0.5"
            />

            {/* Carved section (south side) */}
            <path
              d="M100 580 Q120 400 115 200 Q110 100 100 30"
              fill="hsl(var(--charcoal-900))"
              opacity="0.4"
            />

            {/* Floor markers */}
            {floorMarkers.map((marker) => {
              const yPos = 580 - (marker.levelNumber + 2) * 7;
              const isActive = activeMarker?.level === marker.level;
              const isHovered = hoveredMarker === marker.level;

              return (
                <g key={marker.level}>
                  {/* Floor line */}
                  <motion.line
                    x1="35"
                    y1={yPos}
                    x2="165"
                    y2={yPos}
                    stroke={
                      marker.type === "substation"
                        ? "hsl(45, 93%, 47%)"
                        : "hsl(142, 76%, 36%)"
                    }
                    strokeWidth={isActive || isHovered ? 3 : 2}
                    strokeDasharray={marker.type === "refuge" ? "6 3" : "none"}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: isActive || isHovered ? 1 : 0.5,
                      strokeWidth: isActive || isHovered ? 3 : 2,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Interactive marker */}
                  <motion.circle
                    cx="175"
                    cy={yPos}
                    r={isActive || isHovered ? 10 : 8}
                    fill={
                      marker.type === "substation"
                        ? "hsl(45, 93%, 47%)"
                        : "hsl(142, 76%, 36%)"
                    }
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      boxShadow: isActive
                        ? "0 0 20px rgba(255,255,255,0.5)"
                        : "none",
                    }}
                    onMouseEnter={() => setHoveredMarker(marker.level)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    onClick={() =>
                      setActiveMarker(
                        activeMarker?.level === marker.level ? null : marker
                      )
                    }
                  />

                  {/* Level label */}
                  <text
                    x="190"
                    y={yPos + 4}
                    fill="white"
                    fontSize="10"
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    L{marker.level}
                  </text>
                </g>
              );
            })}

            {/* Spire */}
            <path
              d="M100 10 L95 5 L100 -10 L105 5 Z"
              fill="hsl(var(--charcoal-500))"
            />
          </svg>

          {/* Ground level indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <p className="text-center text-xs text-grey-400 mt-2">Ground Level</p>
        </div>

        {/* Legend & Details Panel */}
        <div className="flex-1 max-w-md">
          {/* Legend */}
          <div className="mb-8 p-4 bg-charcoal-800/30 rounded-lg border border-charcoal-700/50">
            <p className="text-sm text-grey-400 uppercase tracking-wider mb-4">
              Legend
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500" />
                <span className="text-sm text-grey-300">Electrical Substation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                <span className="text-sm text-grey-300">Refuge Floor</span>
              </div>
            </div>
          </div>

          {/* Floor list */}
          <div className="space-y-3">
            {floorMarkers.map((marker, index) => {
              const isActive = activeMarker?.level === marker.level;
              const Icon = marker.type === "substation" ? Zap : Shield;

              return (
                <motion.button
                  key={marker.level}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() =>
                    setActiveMarker(isActive ? null : marker)
                  }
                  onMouseEnter={() => setHoveredMarker(marker.level)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 text-left ${
                    isActive
                      ? marker.type === "substation"
                        ? "bg-amber-500/10 border-amber-500/50"
                        : "bg-emerald-500/10 border-emerald-500/50"
                      : "bg-charcoal-800/30 border-charcoal-700/50 hover:border-charcoal-600"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      marker.type === "substation"
                        ? "bg-amber-500/20"
                        : "bg-emerald-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        marker.type === "substation"
                          ? "text-amber-500"
                          : "text-emerald-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        Level {marker.level}
                      </span>
                      <span className="text-xs text-grey-500">•</span>
                      <span
                        className={`text-sm ${
                          marker.type === "substation"
                            ? "text-amber-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {marker.name}
                      </span>
                    </div>
                    <p className="text-sm text-grey-400">{marker.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Building2 className="w-4 h-4 text-grey-500" />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {activeMarker && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-gradient-to-br from-charcoal-800/50 to-charcoal-900/50 rounded-lg border border-charcoal-700/50 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  {activeMarker.type === "substation" ? (
                    <Zap className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Shield className="w-6 h-6 text-emerald-500" />
                  )}
                  <div>
                    <h4 className="text-lg text-white font-medium">
                      {activeMarker.name}
                    </h4>
                    <p className="text-sm text-grey-400">
                      Level {activeMarker.level}
                    </p>
                  </div>
                </div>

                <p className="text-grey-300 mb-4">{activeMarker.description}</p>

                <div className="space-y-2">
                  <p className="text-xs text-grey-500 uppercase tracking-wider">
                    Features & Systems
                  </p>
                  <ul className="space-y-2">
                    {activeMarker.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-sm text-grey-300"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            activeMarker.type === "substation"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Instruction hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-grey-500 mt-8"
      >
        Click on any marker to explore detailed information
      </motion.p>
    </div>
  );
};

export default TowerCrossSection;
