import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import kuwaitPanorama from "@/assets/kuwait-panorama-sunset.png";
import towerCityscape from "@/assets/tower-cityscape.png";
import kuwaitMarina from "@/assets/kuwait-marina-dusk.png";
import towerAerial from "@/assets/tower-aerial.png";
import towerCloudsAerial from "@/assets/tower-clouds-aerial.png";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import skylineReflection from "@/assets/skyline-reflection.png";
import towerFogNight from "@/assets/tower-fog-night.png";
import kuwaitHorizon from "@/assets/kuwait-horizon.png";

const PerspectiveSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: imageRef, isInView: imageInView } = useScrollReveal();
  const { ref: captionRef, isInView: captionInView } = useScrollReveal();
  const { ref: viewsRef, isInView: viewsInView } = useScrollReveal();
  const { ref: visionRef, isInView: visionInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();
  const { ref: horizonRef, isInView: horizonInView } = useScrollReveal();

  return (
    <section id="perspective" className="bg-secondary relative">
      {/* Hero Section */}
      <div className="py-section">
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
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">02</span>
          </motion.div>

          {/* Section Title */}
          <motion.h2 
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-headline font-light tracking-wide text-foreground mb-8"
          >
            {t("perspective.title")}
          </motion.h2>

          {/* Intro Text */}
          <motion.p
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-3xl mb-20"
          >
            {t("perspective.intro")}
          </motion.p>
        </div>

        {/* Full-width Panoramic Image */}
        <motion.div 
          ref={imageRef}
          initial="hidden"
          animate={imageInView ? "visible" : "hidden"}
          variants={revealVariants.scaleUp}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group"
        >
          <div className="aspect-[21/9] overflow-hidden">
            <img
              src={kuwaitPanorama}
              alt="Kuwait City panoramic view at sunset"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.02]"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary to-transparent" />
          </div>
        </motion.div>

        <div className="container mx-auto px-6 lg:px-12">
          {/* Caption */}
          <motion.div 
            ref={captionRef}
            initial="hidden"
            animate={captionInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 max-w-2xl"
          >
            <blockquote className="relative">
              <span className="absolute -left-6 top-0 text-6xl text-border font-serif">"</span>
              <p className="text-xl lg:text-2xl text-foreground font-light italic leading-relaxed pl-4">
                {t("perspective.caption")}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <div ref={visionRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Column */}
            <motion.div
              initial="hidden"
              animate={visionInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t("perspective.vision.label")}
                </span>
              </div>
              <h3 className="text-subheadline font-light text-foreground">
                {t("perspective.vision.title")}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("perspective.vision.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("perspective.vision.p2")}
              </p>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial="hidden"
              animate={visionInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={towerAerial}
                  alt="Al Hamra Tower aerial view"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border border-border -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Time of Day Views */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={viewsRef}
            initial="hidden"
            animate={viewsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("perspective.timeofday.title")}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("perspective.timeofday.desc")}
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={viewsInView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-4 lg:gap-6"
          >
            {[
              { label: t("perspective.view1"), time: "06:00", image: kuwaitPanorama },
              { label: t("perspective.view2"), time: "12:00", image: towerCityscape },
              { label: t("perspective.view3"), time: "18:00", image: kuwaitMarina },
            ].map((view, i) => (
              <motion.div 
                key={i} 
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                  <img 
                    src={view.image}
                    alt={view.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: i === 0 ? "brightness(0.7) saturate(0.8)" : i === 2 ? "brightness(0.9) saturate(1.2) sepia(0.1)" : "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{view.label}</span>
                  <span className="text-xs text-muted-foreground/60 font-mono">{view.time}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={galleryRef}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("perspective.gallery.label")}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground">
              {t("perspective.gallery.title")}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto overflow-hidden group relative"
            >
              <motion.img
                src={towerCloudsAerial}
                alt="Tower piercing through clouds"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={galleryInView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("perspective.gallery.img1")}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="aspect-[4/3] overflow-hidden group relative"
            >
              <motion.img
                src={towerTopClouds}
                alt="Tower top detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("perspective.gallery.img2")}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="aspect-[4/3] overflow-hidden group relative"
            >
              <motion.img
                src={skylineReflection}
                alt="Kuwait skyline reflection"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("perspective.gallery.img3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="lg:col-span-2 aspect-[21/9] overflow-hidden group relative"
            >
              <motion.img
                src={towerFogNight}
                alt="Tower in fog at night"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("perspective.gallery.img4")}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="aspect-square overflow-hidden group relative"
            >
              <motion.img
                src={towerCityscape}
                alt="Tower in cityscape"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("perspective.gallery.img5")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizon Statement */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div ref={horizonRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Column */}
            <motion.div
              initial="hidden"
              animate={horizonInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className="relative group order-2 lg:order-1"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={kuwaitHorizon}
                  alt="Kuwait horizon view"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-border -z-10" />
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial="hidden"
              animate={horizonInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 order-1 lg:order-2"
            >
              <h3 className="text-subheadline font-light text-foreground">
                {t("perspective.horizon.title")}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("perspective.horizon.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("perspective.horizon.p2")}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {t("perspective.horizon.stat.label")}
                </p>
                <p className="text-4xl font-light text-foreground mt-2">
                  {t("perspective.horizon.stat.value")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerspectiveSection;