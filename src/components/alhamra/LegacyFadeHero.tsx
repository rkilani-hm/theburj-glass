import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import heritageImage from "@/assets/alhamra-cinema-historic.jpg";
import towerImage from "@/assets/alhamra-tower-daylight.png";

const LegacyFadeHero = () => {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isRTL = dir === "rtl";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Heritage section fades out as user scrolls
  const heritageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heritageY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  // Tower section fades in with overlap for dissolve effect
  const towerOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const towerScale = useTransform(scrollYProgress, [0.3, 0.7], [0.97, 1]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Heritage Section (Scroll 1) - B&W Cinema */}
      <motion.section
        style={{ opacity: heritageOpacity, y: heritageY }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* B&W Background Image */}
        <div className="absolute inset-0">
          <img
            src={heritageImage}
            alt={t("legacy.origins.historic.alt")}
            className="w-full h-full object-cover grayscale contrast-125"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
        </div>

        {/* Heritage Content */}
        <div className="relative h-full container mx-auto px-6 lg:px-12 flex items-center">
          <div className={`max-w-lg ${isRTL ? "mr-auto ml-0" : "ml-0 mr-auto"}`}>
            {/* Heritage Card - Executive Black */}
            <div className="bg-foreground/85 backdrop-blur-md border border-foreground/20 p-8 lg:p-10">
              {/* Label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-background/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-background/70">
                  {t("legacy.label")}
                </span>
              </div>

              {/* Year Badge */}
              <div className="inline-block mb-6">
                <span className="text-sm font-medium tracking-wider text-background/90 border border-background/30 px-3 py-1">
                  1958
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-light text-background mb-6 leading-tight">
                {t("legacy.origins.heading")}
              </h2>

              {/* Description */}
              <p className="text-background/80 text-sm lg:text-base leading-relaxed mb-6">
                {t("legacy.origins.p1")}
              </p>

              {/* Quote */}
              <blockquote className="border-l-2 border-background/30 pl-4">
                <p className="text-background/70 text-sm italic">
                  {t("legacy.origins.quote")}
                </p>
              </blockquote>
            </div>
          </div>

          {/* Year Watermark */}
          <div className={`absolute bottom-12 ${isRTL ? "left-12" : "right-12"} pointer-events-none`}>
            <span className="text-[12rem] lg:text-[16rem] font-extralight text-background/10 leading-none select-none">
              1958
            </span>
          </div>
        </div>
      </motion.section>

      {/* Transformation Section (Scroll 2) - Modern Tower */}
      <motion.section
        style={{ opacity: towerOpacity, scale: towerScale }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Tower Background Image - Full Color */}
        <div className="absolute inset-0">
          <img
            src={towerImage}
            alt={t("legacy.origins.modern.alt")}
            className="w-full h-full object-cover"
          />
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/10" />
        </div>

        {/* Tower Content */}
        <div className="relative h-full container mx-auto px-6 lg:px-12 flex items-center">
          <div className={`max-w-lg ${isRTL ? "ml-0 mr-auto" : "ml-auto mr-0"}`}>
            {/* Transformation Card - Architectural White */}
            <div className="bg-background/90 backdrop-blur-md border border-border p-8 lg:p-10">
              {/* Label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t("legacy.timeline.completion")}
                </span>
              </div>

              {/* Year Badge */}
              <div className="inline-block mb-6">
                <span className="text-sm font-medium tracking-wider text-foreground border border-border px-3 py-1">
                  2011
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-6 leading-tight">
                {t("legacy.title")}
              </h2>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-border pl-3">
                  <p className="text-2xl font-light text-foreground">412m</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t("stats.height")}
                  </p>
                </div>
                <div className="border-l-2 border-border pl-3">
                  <p className="text-2xl font-light text-foreground">80</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t("stats.floors")}
                  </p>
                </div>
                <div className="border-l-2 border-border pl-3">
                  <p className="text-lg font-light text-foreground">SOM</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Design
                  </p>
                </div>
                <div className="border-l-2 border-border pl-3">
                  <p className="text-lg font-light text-foreground">CTBUH</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Award
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("legacy.timeline.completion.desc")}
              </p>
            </div>
          </div>

          {/* Year Watermark */}
          <div className={`absolute bottom-12 ${isRTL ? "right-12" : "left-12"} pointer-events-none`}>
            <span className="text-[12rem] lg:text-[16rem] font-extralight text-foreground/10 leading-none select-none">
              2011
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LegacyFadeHero;
