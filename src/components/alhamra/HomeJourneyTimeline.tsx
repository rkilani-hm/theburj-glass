import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, History, Building2, Leaf, Eye, MapPin, Sparkles, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

// Images
import kuwaitPanoramaSunset from "@/assets/kuwait-panorama-sunset.png";
import interiorLobby from "@/assets/interior-lobby.jpg";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import towerFogNight from "@/assets/tower-fog-night.png";
import skylineReflection from "@/assets/skyline-reflection.png";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";

interface JourneyStop {
  id: string;
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  stat?: { value: string; label: string };
  highlights?: string[];
}

const HomeJourneyTimeline = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const journeyStops: JourneyStop[] = [
    {
      id: "legacy",
      icon: History,
      label: t("home.journey.legacy.label") || "Heritage",
      title: t("home.journey.legacy.title") || "A Place of Memory",
      description: t("home.journey.legacy.desc") || "Where Kuwait's first cinema once stood, Al Hamra Tower rises as a bridge between heritage and ambition—honoring the past while reaching toward the future.",
      image: kuwaitPanoramaSunset,
      link: "/legacy",
      linkText: t("home.journey.legacy.cta") || "Explore the Legacy",
      stat: { value: "1960s", label: t("home.journey.legacy.stat") || "Original Site Era" },
      highlights: [
        t("home.journey.legacy.h1") || "Kuwait's first cinema location",
        t("home.journey.legacy.h2") || "Cultural heritage preserved",
        t("home.journey.legacy.h3") || "Historic district transformation"
      ]
    },
    {
      id: "tower",
      icon: Compass,
      label: t("home.journey.tower.label") || "Architecture",
      title: t("home.journey.tower.title") || "Form Follows Vision",
      description: t("home.journey.tower.desc") || "A sculptural masterpiece by Skidmore, Owings & Merrill—the tower's distinctive twist is both aesthetic innovation and climate-responsive engineering.",
      image: somTowerSkyline,
      link: "/tower",
      linkText: t("home.journey.tower.cta") || "Discover the Design",
      stat: { value: "77", label: t("home.journey.tower.stat") || "Stories Above Ground" },
      highlights: [
        t("home.journey.tower.h1") || "Award-winning SOM design",
        t("home.journey.tower.h2") || "Unique sculptural silhouette",
        t("home.journey.tower.h3") || "2005-2011 construction"
      ]
    },
    {
      id: "business",
      icon: Building2,
      label: t("home.journey.business.label") || "Enterprise",
      title: t("home.journey.business.title") || "Where Business Rises",
      description: t("home.journey.business.desc") || "A vertical ecosystem designed for enterprise excellence—sky lobbies on floors 30 and 55, premium infrastructure, and an address that signals prestige across the Gulf.",
      image: interiorLobby,
      link: "/business",
      linkText: t("home.journey.business.cta") || "Discover the Workspace",
      stat: { value: "50+", label: t("home.journey.business.stat") || "Leading Companies" },
      highlights: [
        t("home.journey.business.h1") || "Two sky lobby transfer floors",
        t("home.journey.business.h2") || "95% occupancy rate",
        t("home.journey.business.h3") || "24/7 building operations"
      ]
    },
    {
      id: "sustainability",
      icon: Leaf,
      label: t("home.journey.sustainability.label") || "Innovation",
      title: t("home.journey.sustainability.title") || "Designed for Climate",
      description: t("home.journey.sustainability.desc") || "The tower's sculptural form is a functional response to Kuwait's desert sun—reducing solar heat gain by 25% through passive design strategies recognized by Time Magazine.",
      image: somTowerDetail,
      link: "/tower/sustainability",
      linkText: t("home.journey.sustainability.cta") || "See the Innovation",
      stat: { value: "25%", label: t("home.journey.sustainability.stat") || "Solar Heat Reduction" },
      highlights: [
        t("home.journey.sustainability.h1") || "Time Magazine's 50 Best Inventions",
        t("home.journey.sustainability.h2") || "Passive solar design",
        t("home.journey.sustainability.h3") || "Limestone thermal shielding"
      ]
    },
    {
      id: "services",
      icon: Sparkles,
      label: t("home.journey.services.label") || "Hospitality",
      title: t("home.journey.services.title") || "Seamless Support",
      description: t("home.journey.services.desc") || "Beyond workspace—a complete ecosystem of services from 24/7 concierge to executive dining, designed to anticipate needs before they arise.",
      image: towerEntranceFountain,
      link: "/services",
      linkText: t("home.journey.services.cta") || "Experience the Services",
      stat: { value: "24/7", label: t("home.journey.services.stat") || "Concierge Service" },
      highlights: [
        t("home.journey.services.h1") || "Executive dining facilities",
        t("home.journey.services.h2") || "Valet parking service",
        t("home.journey.services.h3") || "Premium wellness programs"
      ]
    },
    {
      id: "location",
      icon: MapPin,
      label: t("home.journey.location.label") || "Connectivity",
      title: t("home.journey.location.title") || "Command Central",
      description: t("home.journey.location.desc") || "Positioned at the nexus of Kuwait's commercial and governmental centers—20 minutes from the airport, steps from the financial district.",
      image: skylineReflection,
      link: "/location",
      linkText: t("home.journey.location.cta") || "Find the Location",
      stat: { value: "Sharq", label: t("home.journey.location.stat") || "Prime District" },
      highlights: [
        t("home.journey.location.h1") || "1,400+ parking spaces",
        t("home.journey.location.h2") || "Direct highway access",
        t("home.journey.location.h3") || "Near Kuwait Towers"
      ]
    },
    {
      id: "perspective",
      icon: Eye,
      label: t("home.journey.perspective.label") || "Vision",
      title: t("home.journey.perspective.title") || "Height as Perspective",
      description: t("home.journey.perspective.desc") || "From 412 meters, the view extends beyond the horizon—a vantage point that transforms how one sees the city, the Gulf, and the possibilities ahead.",
      image: towerFogNight,
      link: "/perspective",
      linkText: t("home.journey.perspective.cta") || "View the Perspective",
      stat: { value: "412m", label: t("home.journey.perspective.stat") || "Commanding Height" },
      highlights: [
        t("home.journey.perspective.h1") || "Kuwait's tallest structure",
        t("home.journey.perspective.h2") || "Panoramic Gulf views",
        t("home.journey.perspective.h3") || "Observation experiences"
      ]
    }
  ];

  return (
    <section ref={containerRef} className="py-section bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-32"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("home.journey.label") || "The Journey"}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground mb-6">
            {t("home.journey.title") || "Discover Al Hamra"}
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {t("home.journey.subtitle") || "From its historic foundations to its commanding views, explore the stories that define Kuwait's tallest landmark."}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block -translate-x-1/2">
            <motion.div 
              className="w-full bg-foreground origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Journey Stops */}
          <div className="space-y-20 lg:space-y-28">
            {journeyStops.map((stop, index) => (
              <JourneyStopCard 
                key={stop.id} 
                stop={stop} 
                index={index}
                isArabic={isArabic}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface JourneyStopCardProps {
  stop: JourneyStop;
  index: number;
  isArabic: boolean;
}

const JourneyStopCard = ({ stop, index, isArabic }: JourneyStopCardProps) => {
  const { ref, isInView } = useScrollReveal({ margin: "-100px" });
  const isEven = index % 2 === 0;
  
  // Flip layout in Arabic
  const imageFirst = isArabic ? !isEven : isEven;

  return (
    <div ref={ref} className="relative">
      {/* Timeline Node - Desktop Only */}
      <motion.div 
        className="absolute left-1/2 top-12 -translate-x-1/2 z-10 hidden lg:flex"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="w-12 h-12 bg-background border-2 border-foreground rounded-full flex items-center justify-center">
          <stop.icon size={20} className="text-foreground" />
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${imageFirst ? '' : 'lg:flex-row-reverse'}`}>
        {/* Image Side */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageFirst ? revealVariants.slideLeft : revealVariants.slideRight}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`relative group ${!imageFirst ? 'lg:order-2' : ''}`}
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted relative">
            <motion.img
              src={stop.image}
              alt={stop.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
            
            {/* Stat Badge */}
            {stop.stat && (
              <motion.div 
                className="absolute bottom-0 left-0 bg-background/95 backdrop-blur-sm p-4 border-t border-r border-border"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-2xl font-light text-foreground">{stop.stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{stop.stat.label}</p>
              </motion.div>
            )}
          </div>
          
          {/* Decorative corner */}
          <div className={`absolute -bottom-4 ${imageFirst ? '-right-4' : '-left-4'} w-24 h-24 border border-border -z-10`} />
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageFirst ? revealVariants.slideRight : revealVariants.slideLeft}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`space-y-6 ${imageFirst ? 'lg:order-2' : ''}`}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <stop.icon size={16} className="text-muted-foreground lg:hidden" />
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {stop.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-subheadline font-light text-foreground">
            {stop.title}
          </h3>

          {/* Description */}
          <p className="text-body text-muted-foreground leading-relaxed">
            {stop.description}
          </p>

          {/* Highlights */}
          {stop.highlights && (
            <motion.ul 
              className="space-y-2 pt-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {stop.highlights.map((highlight, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                >
                  <div className="w-1 h-1 bg-foreground rounded-full" />
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="pt-2"
          >
            <Link 
              to={stop.link}
              className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors group/link"
            >
              <span className="text-sm uppercase tracking-wider">{stop.linkText}</span>
              <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeJourneyTimeline;
