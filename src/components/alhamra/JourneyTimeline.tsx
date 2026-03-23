import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Building2, ArrowUp, Users, Briefcase } from "lucide-react";

interface JourneyStop {
  floor: string;
  titleKey: string;
  descKey: string;
  icon: React.ElementType;
  accent?: boolean;
}

const JourneyTimeline = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const journeyStops: JourneyStop[] = [
    {
      floor: "G",
      titleKey: "journey.ground.title",
      descKey: "journey.ground.desc",
      icon: Building2,
    },
    {
      floor: "30",
      titleKey: "journey.sky30.title",
      descKey: "journey.sky30.desc",
      icon: Users,
      accent: true,
    },
    {
      floor: "55",
      titleKey: "journey.sky55.title",
      descKey: "journey.sky55.desc",
      icon: Users,
      accent: true,
    },
    {
      floor: "77",
      titleKey: "journey.offices.title",
      descKey: "journey.offices.desc",
      icon: Briefcase,
    },
  ];

  return (
    <div ref={containerRef} className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("journey.label")}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
          
          <h3 className="text-xl lg:text-2xl font-light tracking-wide text-foreground mb-4">
            {t("journey.title")}
          </h3>
          <p className="text-body text-muted-foreground max-w-xl mx-auto">
            {t("journey.subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Static Background Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-1/2 top-0 w-px bg-foreground -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Journey Stops */}
          <div className="relative space-y-0">
            {journeyStops.map((stop, index) => {
              const isLeft = index % 2 === 0;
              const StopIcon = stop.icon;
              
              return (
                <motion.div
                  key={stop.floor}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8 py-8`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-block p-6 bg-background border transition-all duration-300 hover:shadow-lg ${
                        stop.accent 
                          ? 'border-foreground/30 hover:border-foreground/50' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <div className={`w-8 h-8 flex items-center justify-center ${
                          stop.accent ? 'bg-foreground text-background' : 'bg-muted'
                        }`}>
                          <StopIcon size={16} />
                        </div>
                        <span className={`text-sm font-medium uppercase tracking-wider ${
                          stop.accent ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {t("journey.floor")} {stop.floor}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-foreground mb-2">
                        {t(stop.titleKey)}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                        {t(stop.descKey)}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        stop.accent 
                          ? 'bg-foreground border-foreground text-background' 
                          : 'bg-background border-border text-foreground'
                      }`}
                    >
                      <span className="text-lg font-light">{stop.floor}</span>
                    </motion.div>
                    
                    {/* Connecting Arrow */}
                    {index < journeyStops.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-6"
                      >
                        <ArrowUp size={16} className="text-muted-foreground rotate-180" />
                      </motion.div>
                    )}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-base text-muted-foreground italic">
            {t("journey.closing")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
