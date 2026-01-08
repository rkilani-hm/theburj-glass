import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Star, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import lobbyInterior from "@/assets/interior-lobby.jpg";
import towerBwDetail from "@/assets/tower-bw-detail.png";
import kuwaitHorizon from "@/assets/kuwait-horizon.png";

const ServicesSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();
  const { ref: amenitiesRef, isInView: amenitiesInView } = useScrollReveal();

  const services = [
    t("services.concierge"),
    t("services.dining"),
    t("services.conference"),
    t("services.wellness"),
    t("services.valet"),
  ];

  const amenities = [
    {
      icon: Star,
      title: t("services.amenity.concierge") || "24/7 Concierge",
      description: t("services.amenity.concierge.desc") || "Dedicated team providing personalized assistance around the clock"
    },
    {
      icon: Shield,
      title: t("services.amenity.security") || "Elite Security",
      description: t("services.amenity.security.desc") || "State-of-the-art security systems with trained professionals"
    },
    {
      icon: Clock,
      title: t("services.amenity.access") || "Flexible Access",
      description: t("services.amenity.access.desc") || "24-hour building access with smart card technology"
    }
  ];

  return (
    <section id="services" className="py-section bg-secondary relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">04</span>
        </motion.div>

        {/* Section Title */}
        <motion.h2 
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-headline font-light tracking-wide text-foreground mb-20"
        >
          {t("services.title")}
        </motion.h2>

        {/* Split Layout */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Column */}
          <motion.div 
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={revealVariants.slideLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 space-y-12"
          >
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {t("services.intro")}
            </p>

            {/* Service List */}
            <ul className="space-y-0">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                  className="group flex items-center gap-4 py-5 border-b border-border last:border-0 transition-all duration-300 hover:pl-2"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Check size={16} className="text-grey-medium transition-colors duration-300 group-hover:text-foreground" />
                  </div>
                  <span className="text-foreground transition-colors duration-300 group-hover:text-foreground">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={revealVariants.slideRight}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 relative group"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={lobbyInterior}
                alt="Grand lobby interior"
                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-border -z-10" />
            <div className="absolute top-1/2 -right-3 w-6 h-px bg-muted-foreground hidden lg:block" />
          </motion.div>
        </div>

        {/* Amenities Grid */}
        <div ref={amenitiesRef} className="mt-32 pt-20 border-t border-border">
          <motion.h3
            initial="hidden"
            animate={amenitiesInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-title font-light text-foreground mb-16"
          >
            {t("services.premium") || "Premium Amenities"}
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-12">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={amenitiesInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="group"
              >
                <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-background group-hover:border-foreground">
                  <amenity.icon size={24} className="text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-3">{amenity.title}</h4>
                <p className="text-muted-foreground">{amenity.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Full-width panorama */}
          <motion.div
            initial="hidden"
            animate={amenitiesInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <div className="aspect-[21/9] overflow-hidden group">
              <img
                src={kuwaitHorizon}
                alt="Kuwait horizon panorama"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Detail image */}
          <div className="grid lg:grid-cols-2 gap-16 mt-20 items-center">
            <motion.div
              initial="hidden"
              animate={amenitiesInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="aspect-[3/4] overflow-hidden group"
            >
              <img
                src={towerBwDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={amenitiesInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-title font-light text-foreground">
                {t("services.experience.title") || "Beyond Expectation"}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("services.experience.p1") || "Every detail of Al Hamra Tower has been designed with occupant experience in mind. From the moment you enter the grand lobby, you are immersed in an atmosphere of quiet sophistication."}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("services.experience.p2") || "Our services extend beyond the physical—they encompass a philosophy of hospitality that anticipates needs before they arise."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
