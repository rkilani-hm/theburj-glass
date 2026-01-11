import { Route, Plane, Building, MapPin, Clock, Car, Train, Navigation } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import skylineReflection from "@/assets/skyline-reflection.png";
import towerAerialCityscape from "@/assets/tower-aerial-cityscape.jpg";
import towerCityContext from "@/assets/tower-city-context.jpg";
import kuwaitSkylineDay from "@/assets/kuwait-skyline-day.png";

const LocationSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal();
  const { ref: mapRef, isInView: mapInView } = useScrollReveal();
  const { ref: contextRef, isInView: contextInView } = useScrollReveal();

  const accessPoints = [
    { icon: Route, label: t("location.highway"), detail: t("location.highway.detail") || "Direct access via First Ring Road and Arabian Gulf Street" },
    { icon: Plane, label: t("location.airport"), detail: t("location.airport.detail") || "20 minutes to Kuwait International Airport" },
    { icon: Building, label: t("location.district"), detail: t("location.district.detail") || "Sharq financial and commercial district" },
  ];

  const nearbyLandmarks = [
    { name: t("location.landmark1") || "Kuwait Towers", distance: "2.5 km", time: "5 min" },
    { name: t("location.landmark2") || "Grand Mosque", distance: "1.2 km", time: "3 min" },
    { name: t("location.landmark3") || "Souk Al-Mubarakiya", distance: "3 km", time: "7 min" },
    { name: t("location.landmark4") || "The Avenues Mall", distance: "8 km", time: "15 min" },
  ];

  const transportOptions = [
    { icon: Car, label: t("location.transport.car") || "Private Vehicle", desc: t("location.transport.car.desc") || "Multi-level parking with 1,400+ spaces" },
    { icon: Train, label: t("location.transport.metro") || "Future Metro", desc: t("location.transport.metro.desc") || "Adjacent to planned metro station" },
    { icon: Navigation, label: t("location.transport.taxi") || "Taxi & Rideshare", desc: t("location.transport.taxi.desc") || "Dedicated drop-off zone at main entrance" },
  ];

  return (
    <section id="location" className="bg-background relative">
      {/* Hero Section */}
      <div className="py-section bg-secondary texture-noise">
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
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">06</span>
          </motion.div>

          {/* Section Title */}
          <motion.h2 
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-headline font-light tracking-wide text-foreground mb-8"
          >
            {t("location.title")}
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-3xl mb-20"
          >
            {t("location.intro") || "Strategically positioned at the nexus of Kuwait's commercial, governmental, and cultural centers. Al Hamra Tower commands a central presence that connects business to opportunity."}
          </motion.p>

          <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Location Image */}
            <motion.div 
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={revealVariants.scaleUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-square lg:aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={skylineReflection}
                  alt="Kuwait City skyline with Al Hamra Tower"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay with location info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-white/80" />
                    <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                      29.3759° N, 47.9774° E
                    </p>
                  </div>
                  <p className="text-lg text-white font-light">Sharq, Kuwait City</p>
                </div>
              </div>
            </motion.div>

            {/* Text & Access Points */}
            <motion.div 
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-12"
            >
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("location.desc")}
              </p>

              {/* Access Points */}
              <div className="space-y-8">
                {accessPoints.map((point, index) => (
                  <motion.div 
                    key={index} 
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                    variants={revealVariants.fadeUp}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group flex items-start gap-6"
                  >
                    <div className="w-14 h-14 border border-border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-background group-hover:border-foreground">
                      <point.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-1">{point.label}</h3>
                      <p className="text-sm text-muted-foreground">{point.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Google Maps Section */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={mapRef}
            initial="hidden"
            animate={mapInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("location.map.label") || "Interactive Map"}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("location.map.title") || "Find Us"}
            </h3>
          </motion.div>

          {/* Map Container with custom styling */}
          <motion.div
            initial="hidden"
            animate={mapInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-muted overflow-hidden border border-border relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.543841896841!2d47.97504231511892!3d29.37590298213397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c6a33c22c39%3A0x57f5a0c3dad3c516!2sAl%20Hamra%20Tower!5e0!3m2!1sen!2skw!4v1705000000000!5m2!1sen!2skw"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al Hamra Tower Location"
                className="absolute inset-0 transition-all duration-700 group-hover:filter-none"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10 pointer-events-none" />
              
              {/* Location card overlay */}
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm p-6 border border-border max-w-sm pointer-events-auto">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Al Hamra Tower</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("location.address") || "Sharq Area, Ahmed Al-Jaber Street, Kuwait City"}
                    </p>
                    <a 
                      href="https://www.google.com/maps/dir//Al+Hamra+Tower,+Kuwait+City,+Kuwait"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      {t("location.getdirections") || "Get Directions"} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transport Options */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {transportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={mapInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group p-6 border border-border hover:border-foreground transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <option.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                </div>
                <h4 className="font-medium text-foreground mb-2">{option.label}</h4>
                <p className="text-sm text-muted-foreground">{option.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby Landmarks */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={contextRef}
            initial="hidden"
            animate={contextInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("location.nearby.title") || "Nearby Destinations"}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("location.nearby.desc") || "Al Hamra Tower's central location provides convenient access to Kuwait's key landmarks, cultural sites, and business destinations."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {nearbyLandmarks.map((landmark, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={contextInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 bg-background border border-border group cursor-default"
              >
                <h4 className="font-medium text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {landmark.name}
                </h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{landmark.distance}</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock size={14} />
                    <span>{landmark.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Context Images */}
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              animate={contextInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 aspect-[16/9] overflow-hidden group relative"
            >
              <img
                src={towerAerialCityscape}
                alt="Al Hamra Tower aerial cityscape"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("location.img1") || "Central Business District"}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={contextInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="aspect-[4/3] lg:aspect-auto overflow-hidden group relative"
            >
              <img
                src={towerCityContext}
                alt="Tower in city context"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("location.img2") || "Urban Landmark"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;