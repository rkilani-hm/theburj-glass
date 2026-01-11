import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Star, Shield, Clock, Utensils, Dumbbell, Car, Wifi, Coffee, Users, Sparkles, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import lobbyInterior from "@/assets/interior-lobby.jpg";
import towerBwDetail from "@/assets/tower-bw-detail.png";
import kuwaitHorizon from "@/assets/kuwait-horizon.png";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import towerEntranceNight from "@/assets/tower-entrance-night.jpg";

const ServicesSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();
  const { ref: amenitiesRef, isInView: amenitiesInView } = useScrollReveal();
  const { ref: diningRef, isInView: diningInView } = useScrollReveal();

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

  const premiumServices = [
    { icon: Utensils, title: t("services.premium.dining") || "Executive Dining", desc: t("services.premium.dining.desc") || "Fine dining restaurants and private dining rooms" },
    { icon: Dumbbell, title: t("services.premium.fitness") || "Fitness Center", desc: t("services.premium.fitness.desc") || "State-of-the-art gym with personal trainers" },
    { icon: Car, title: t("services.premium.valet") || "Valet Parking", desc: t("services.premium.valet.desc") || "Complimentary valet service for tenants and guests" },
    { icon: Wifi, title: t("services.premium.tech") || "Tech Support", desc: t("services.premium.tech.desc") || "On-site IT assistance and telecom services" },
    { icon: Coffee, title: t("services.premium.lounge") || "Executive Lounge", desc: t("services.premium.lounge.desc") || "Private lounge with refreshments and workspace" },
    { icon: Users, title: t("services.premium.conference") || "Meeting Facilities", desc: t("services.premium.conference.desc") || "Fully equipped conference and boardrooms" },
    { icon: Sparkles, title: t("services.premium.cleaning") || "Cleaning Services", desc: t("services.premium.cleaning.desc") || "Professional daily cleaning and maintenance" },
    { icon: HeartPulse, title: t("services.premium.wellness") || "Wellness Programs", desc: t("services.premium.wellness.desc") || "Corporate wellness and health initiatives" },
  ];

  return (
    <section id="services" className="bg-background relative">
      {/* Hero Section */}
      <div className="py-section bg-secondary">
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
            className="text-headline font-light tracking-wide text-foreground mb-8"
          >
            {t("services.title")}
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-3xl mb-20"
          >
            {t("services.intro.long") || "At Al Hamra Tower, hospitality is not an afterthought—it is woven into the fabric of daily operations. Every service is designed to anticipate needs, remove friction, and allow occupants to focus on what matters most."}
          </motion.p>

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
                      <Check size={16} className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
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
        </div>
      </div>

      {/* Premium Services Grid */}
      <div className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={diningRef}
            initial="hidden"
            animate={diningInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("services.full.label") || "Full Service"}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("services.full.title") || "Complete Business Support"}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("services.full.desc") || "A comprehensive suite of services designed to support every aspect of business operations, from daily necessities to executive requirements."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumServices.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={diningInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 border border-border hover:border-foreground bg-secondary/30 hover:bg-secondary transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <service.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                </div>
                <h4 className="font-medium text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Entrance Images */}
          <div className="grid lg:grid-cols-2 gap-6 mt-16">
            <motion.div
              initial="hidden"
              animate={diningInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="aspect-[16/9] overflow-hidden group relative"
            >
              <img
                src={towerEntranceFountain}
                alt="Tower entrance fountain"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("services.img1") || "Grand Arrival"}</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={diningInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="aspect-[16/9] overflow-hidden group relative"
            >
              <img
                src={towerEntranceNight}
                alt="Tower entrance at night"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("services.img2") || "Evening Elegance"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div ref={amenitiesRef} className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h3
            initial="hidden"
            animate={amenitiesInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-subheadline font-light text-foreground mb-16"
          >
            {t("services.premium") || "Core Amenities"}
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
              <h3 className="text-subheadline font-light text-foreground">
                {t("services.experience.title") || "Beyond Expectation"}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("services.experience.p1") || "Every detail of Al Hamra Tower has been designed with occupant experience in mind. From the moment you enter the grand lobby, you are immersed in an atmosphere of quiet sophistication."}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("services.experience.p2") || "Our services extend beyond the physical—they encompass a philosophy of hospitality that anticipates needs before they arise."}
              </p>
              <div className="pt-6 border-t border-border">
                <blockquote className="text-xl font-light italic text-foreground">
                  "{t("services.quote") || "Service excellence, delivered with discretion."}"
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;