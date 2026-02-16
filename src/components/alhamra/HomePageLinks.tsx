import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import skylineReflection from "@/assets/skyline-reflection.png";

interface PageLinkItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  cta: string;
}

const HomePageLinks = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();

  const pages: PageLinkItem[] = [
    {
      number: "01",
      title: t("home.link.tower.title") || "The Tower",
      subtitle: t("home.link.tower.subtitle") || "Architecture & Engineering",
      description: t("home.link.tower.desc") || "A sculpted masterpiece by SOM — where climate-responsive design meets structural innovation. Discover the story behind Kuwait's tallest landmark.",
      image: somTowerSkyline,
      link: "/tower",
      cta: t("home.link.tower.cta") || "Explore the Tower",
    },
    {
      number: "02",
      title: t("home.link.business.title") || "Business",
      subtitle: t("home.link.business.subtitle") || "Workspace & Enterprise",
      description: t("home.link.business.desc") || "Premium office environments designed for the demands of modern enterprise. Flexible floor plates, vertical connectivity, and an address that commands respect.",
      image: interiorLobby,
      link: "/business",
      cta: t("home.link.business.cta") || "Discover the Workspace",
    },
    {
      number: "03",
      title: t("home.link.experience.title") || "Experience",
      subtitle: t("home.link.experience.subtitle") || "Services & Sustainability",
      description: t("home.link.experience.desc") || "Beyond workspace — a complete ecosystem. From 24/7 concierge to smart building systems, every detail calibrated for seamless daily operations.",
      image: towerEntranceFountain,
      link: "/services",
      cta: t("home.link.experience.cta") || "Experience the Services",
    },
    {
      number: "04",
      title: t("home.link.leasing.title") || "Leasing",
      subtitle: t("home.link.leasing.subtitle") || "Opportunities & Inquiry",
      description: t("home.link.leasing.desc") || "A limited collection of premium office spaces at Kuwait's most prestigious commercial address. Request availability and schedule a private viewing.",
      image: skylineReflection,
      link: "/leasing",
      cta: t("home.link.leasing.cta") || "View Opportunities",
    },
  ];

  return (
    <section className="py-section bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("home.links.label") || "Explore"}
            </span>
            <div className="w-12 h-px bg-border" />
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground mb-4">
            {t("home.links.title") || "Arrive. Ascend. Belong."}
          </h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto">
            {t("home.links.subtitle") || "Four dimensions of an exceptional address."}
          </p>
        </motion.div>

        {/* Page Links Grid */}
        <div className="space-y-0">
          {pages.map((page, index) => (
            <PageLinkCard key={page.number} page={page} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PageLinkCard = ({ page, index }: { page: PageLinkItem; index: number }) => {
  const { ref, isInView } = useScrollReveal({ margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <Link to={page.link} className="block group">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={revealVariants.fadeUp}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid lg:grid-cols-2 gap-0 border-t border-border last:border-b"
      >
        {/* Image */}
        <div className={`relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:min-h-[360px] ${isEven ? "" : "lg:order-2"}`}>
          <motion.img
            src={page.image}
            alt={page.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Number overlay */}
          <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
            <span className="text-6xl lg:text-8xl font-light text-background/20 leading-none select-none">
              {page.number}
            </span>
          </div>
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-center p-8 lg:p-16 bg-secondary group-hover:bg-background transition-colors duration-500 ${isEven ? "" : "lg:order-1"}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 20 : -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
              {page.subtitle}
            </span>

            <h3 className="text-subheadline font-light text-foreground mb-4 tracking-wide">
              {page.title}
            </h3>

            <p className="text-body text-muted-foreground leading-relaxed mb-8 max-w-md">
              {page.description}
            </p>

            <div className="inline-flex items-center gap-3 text-foreground group-hover:text-primary transition-colors duration-300">
              <span className="text-sm uppercase tracking-wider">{page.cta}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default HomePageLinks;
