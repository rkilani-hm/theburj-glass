import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { ArrowUp, ArrowDown, Zap, Clock } from "lucide-react";

interface ElevatorRoute {
  id: string;
  type: "express" | "local";
  nameKey: string;
  fromFloor: number;
  toFloor: number;
  color: string;
  stops: number[];
  speedKey: string;
  capacityKey: string;
}

const ElevatorSystemVisualization = () => {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const [activeRoute, setActiveRoute] = useState<string | null>("express-high");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const elevatorY = useTransform(scrollYProgress, [0.2, 0.8], ["90%", "5%"]);

  const elevatorRoutes: ElevatorRoute[] = [
    {
      id: "express-high",
      type: "express",
      nameKey: "elevator.express.high",
      fromFloor: 0,
      toFloor: 55,
      color: "bg-foreground",
      stops: [0, 30, 55],
      speedKey: "elevator.speed.express",
      capacityKey: "elevator.capacity.express",
    },
    {
      id: "express-mid",
      type: "express",
      nameKey: "elevator.express.mid",
      fromFloor: 0,
      toFloor: 30,
      color: "bg-foreground/80",
      stops: [0, 30],
      speedKey: "elevator.speed.express",
      capacityKey: "elevator.capacity.express",
    },
    {
      id: "local-low",
      type: "local",
      nameKey: "elevator.local.low",
      fromFloor: 0,
      toFloor: 20,
      color: "bg-muted-foreground",
      stops: [0, 5, 10, 15, 20],
      speedKey: "elevator.speed.local",
      capacityKey: "elevator.capacity.local",
    },
    {
      id: "local-mid",
      type: "local",
      nameKey: "elevator.local.mid",
      fromFloor: 30,
      toFloor: 50,
      color: "bg-muted-foreground",
      stops: [30, 35, 40, 45, 50],
      speedKey: "elevator.speed.local",
      capacityKey: "elevator.capacity.local",
    },
    {
      id: "local-high",
      type: "local",
      nameKey: "elevator.local.high",
      fromFloor: 55,
      toFloor: 77,
      color: "bg-muted-foreground",
      stops: [55, 60, 65, 70, 77],
      speedKey: "elevator.speed.local",
      capacityKey: "elevator.capacity.local",
    },
  ];

  const floors = [
    { number: 77, label: t("elevator.floor.executive"), isLobby: false },
    { number: 55, label: t("elevator.floor.sky55"), isLobby: true },
    { number: 30, label: t("elevator.floor.sky30"), isLobby: true },
    { number: 0, label: t("elevator.floor.ground"), isLobby: true },
  ];

  const getFloorPosition = (floor: number) => {
    return ((77 - floor) / 77) * 100;
  };

  const activeRouteData = elevatorRoutes.find(r => r.id === activeRoute);

  return (
    <div ref={containerRef} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("elevator.label")}
            </span>
          </div>
          
          <h3 className="text-xl lg:text-2xl font-light tracking-wide text-foreground mb-4">
            {t("elevator.title")}
          </h3>
          <p className="text-body text-muted-foreground max-w-2xl">
            {t("elevator.subtitle")}
          </p>
        </motion.div>

        {/* Main Visualization Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Tower Shaft Visualization */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[500px] lg:h-[600px] bg-muted/30 border border-border overflow-hidden">
              {/* Tower silhouette background */}
              <div 
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-muted/50 to-transparent"
                style={{ height: "100%" }}
              />

              {/* Floor markers */}
              {floors.map((floor) => (
                <div
                  key={floor.number}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ top: `${getFloorPosition(floor.number)}%` }}
                >
                  <div className={`flex-1 h-px ${floor.isLobby ? 'bg-foreground/40' : 'bg-border'}`} />
                  <div className={`px-3 py-1 text-xs ${
                    floor.isLobby 
                      ? 'bg-foreground text-background font-medium' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {floor.number === 0 ? 'G' : floor.number}
                  </div>
                  <div className={`w-16 h-px ${floor.isLobby ? 'bg-foreground/40' : 'bg-border'}`} />
                </div>
              ))}

              {/* Elevator shaft columns */}
              <div className="absolute inset-x-8 inset-y-4 flex justify-center gap-2">
                {/* Express shaft */}
                <div className="relative w-8 bg-foreground/5 border-x border-border">
                  {activeRoute?.includes('express') && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-6 h-10 bg-foreground shadow-lg"
                      style={{ top: elevatorY }}
                    >
                      <div className="absolute inset-0.5 bg-background/20" />
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-background rounded-full"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Local shaft 1 */}
                <div className="relative w-6 bg-muted-foreground/5 border-x border-border/50">
                  {activeRoute?.includes('local') && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-8 bg-muted-foreground shadow-md"
                      animate={{ top: ["70%", "30%", "70%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0.5 bg-background/10" />
                    </motion.div>
                  )}
                </div>

                {/* Local shaft 2 */}
                <div className="relative w-6 bg-muted-foreground/5 border-x border-border/50">
                  {activeRoute?.includes('local') && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-8 bg-muted-foreground shadow-md"
                      animate={{ top: ["40%", "80%", "40%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0.5 bg-background/10" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Legend labels */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                <span className="uppercase tracking-wider">{t("elevator.shaft.express")}</span>
                <span className="uppercase tracking-wider">{t("elevator.shaft.local")}</span>
              </div>
            </div>

            {/* Floor legend */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
              {floors.map((floor) => (
                <div key={floor.number} className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${floor.isLobby ? 'bg-foreground' : 'bg-border'}`} />
                  <span>{floor.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Route Selection & Details */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Route Type Tabs */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setActiveRoute("express-high")}
                  className={`p-4 border text-left transition-all duration-300 ${
                    activeRoute?.includes('express')
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {t("elevator.type.express")}
                    </span>
                  </div>
                  <p className={`text-xs ${activeRoute?.includes('express') ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {t("elevator.express.desc")}
                  </p>
                </button>

                <button
                  onClick={() => setActiveRoute("local-mid")}
                  className={`p-4 border text-left transition-all duration-300 ${
                    activeRoute?.includes('local')
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {t("elevator.type.local")}
                    </span>
                  </div>
                  <p className={`text-xs ${activeRoute?.includes('local') ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {t("elevator.local.desc")}
                  </p>
                </button>
              </div>
            </motion.div>

            {/* Route Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1"
            >
              <h4 className="text-lg font-medium text-foreground mb-6">
                {t("elevator.routes.title")}
              </h4>

              <div className="space-y-3">
                {elevatorRoutes.map((route, index) => (
                  <motion.button
                    key={route.id}
                    onClick={() => setActiveRoute(route.id)}
                    initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className={`w-full p-4 border text-left transition-all duration-300 group ${
                      activeRoute === route.id
                        ? 'border-foreground/50 bg-muted/50'
                        : 'border-border hover:border-muted-foreground hover:bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${route.color}`} />
                        <span className="font-medium text-foreground">
                          {t(route.nameKey)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {route.type === "express" ? (
                          <ArrowUp size={14} className="text-foreground" />
                        ) : (
                          <ArrowDown size={14} />
                        )}
                        <span className="text-xs uppercase tracking-wider">
                          {route.type === "express" ? t("elevator.type.express") : t("elevator.type.local")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        {t("elevator.floors")}: {route.fromFloor === 0 ? 'G' : route.fromFloor} → {route.toFloor}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span>{t(route.speedKey)}</span>
                      <span className="w-px h-3 bg-border" />
                      <span>{t(route.capacityKey)}</span>
                    </div>

                    {/* Visual route bar */}
                    <div className="mt-3 h-1 bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: activeRoute === route.id ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                        className={route.color}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              <div className="p-4 bg-muted/30 border border-border text-center">
                <div className="text-2xl font-light text-foreground mb-1">52</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t("elevator.stat.elevators")}
                </div>
              </div>
              <div className="p-4 bg-muted/30 border border-border text-center">
                <div className="text-2xl font-light text-foreground mb-1">8</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t("elevator.stat.express.units")}
                </div>
              </div>
              <div className="p-4 bg-muted/30 border border-border text-center">
                <div className="text-2xl font-light text-foreground mb-1">6m/s</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t("elevator.stat.max.speed")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-body text-muted-foreground leading-relaxed italic">
            {t("elevator.closing")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ElevatorSystemVisualization;
