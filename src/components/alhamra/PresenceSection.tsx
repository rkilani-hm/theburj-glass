import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import towerSunset from "@/assets/tower-sunset.png";
import towerBW1 from "@/assets/tower-bw-1.png";
import towerBW2 from "@/assets/tower-bw-2.png";
import towerBwDetail from "@/assets/tower-bw-detail.png";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import towerDetail from "@/assets/tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import interiorOffice from "@/assets/interior-office.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";
import towerAerialCityscape from "@/assets/tower-aerial-cityscape.jpg";
import towerAerialSea from "@/assets/tower-aerial-sea.jpg";
import towerEntranceNight from "@/assets/tower-entrance-night.jpg";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";
import kuwaitSkylineWaterNight from "@/assets/kuwait-skyline-water-night.jpg";
import towerAerialBalcony from "@/assets/tower-aerial-balcony.jpg";
import towerKuwaitTowers from "@/assets/tower-kuwait-towers.jpg";
import towerAerialHarbor from "@/assets/tower-aerial-harbor.jpg";
import towerAerialNorth from "@/assets/tower-aerial-north.jpg";
import towerAerialGulf from "@/assets/tower-aerial-gulf.jpg";
import towerCityContext from "@/assets/tower-city-context.jpg";

const PresenceSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: imageRef, isInView: imageInView } = useScrollReveal();
  const { ref: statsRef, isInView: statsInView } = useScrollReveal();
  const { ref: architectureRef, isInView: architectureInView } = useScrollReveal();
  const { ref: interiorRef, isInView: interiorInView } = useScrollReveal();
  const { ref: detailsRef, isInView: detailsInView } = useScrollReveal();
  const { ref: factsRef, isInView: factsInView } = useScrollReveal();
  const { ref: aerialRef, isInView: aerialInView } = useScrollReveal();
  const { ref: nightRef, isInView: nightInView } = useScrollReveal();
  const { ref: entranceRef, isInView: entranceInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

  const stats = [
    { label: t("presence.height"), value: t("presence.height.value") },
    { label: t("presence.year"), value: t("presence.year.value") },
    { label: t("presence.location"), value: t("presence.location.value") },
  ];

  const architecturalFeatures = [
    { title: t("tower.feature1.title"), desc: t("tower.feature1.desc") },
    { title: t("tower.feature2.title"), desc: t("tower.feature2.desc") },
    { title: t("tower.feature3.title"), desc: t("tower.feature3.desc") },
    { title: t("tower.feature4.title"), desc: t("tower.feature4.desc") },
  ];

  const towerFacts = [
    { value: "77", label: t("tower.fact1.label"), desc: t("tower.fact1.desc") },
    { value: "195,000", label: t("tower.fact2.label"), desc: t("tower.fact2.desc") },
    { value: "60°", label: t("tower.fact3.label"), desc: t("tower.fact3.desc") },
    { value: "2011", label: t("tower.fact4.label"), desc: t("tower.fact4.desc") },
  ];

  return (
    <section id="presence" className="bg-background relative">
      {/* Hero Section */}
      <div className="py-section texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Label */}
          <motion.div 
            ref={sectionRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">01</span>
          </motion.div>

          {/* Section Title */}
          <motion.h2 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-headline font-light tracking-wide text-foreground mb-8"
          >
            {t("presence.title")}
          </motion.h2>

          {/* Intro Text */}
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-3xl mb-20"
          >
            {t("tower.intro")}
          </motion.p>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Column */}
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 lg:pr-8"
            >
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("presence.p1")}
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("presence.p2")}
              </p>
              <div className="pt-6 border-t border-border">
                <blockquote className="text-xl font-light italic text-foreground">
                  "{t("tower.quote")}"
                </blockquote>
              </div>
            </motion.div>

            {/* Images Grid */}
            <motion.div 
              ref={imageRef}
              initial="hidden"
              animate={imageInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={towerSunset}
                    alt="Al Hamra Tower at sunset"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full border border-border -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden bg-muted group">
                  <img
                    src={towerBW1}
                    alt="Al Hamra Tower architectural detail"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center border border-border group hover:bg-secondary transition-colors duration-500">
                  <div className="text-center p-4">
                    <span className="text-4xl font-light text-foreground">413m</span>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{t("tower.architectural.height")}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-3 gap-8 lg:gap-16">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial="hidden"
                  animate={statsInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="text-center lg:text-left p-6 border border-transparent hover:border-border hover:bg-background/50 transition-all duration-500 cursor-default group"
                >
                  <p className="text-3xl lg:text-5xl font-light text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Architectural Features */}
      <div className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={architectureRef}
            initial="hidden"
            animate={architectureInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("tower.architecture.label")}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("tower.architecture.title")}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("tower.architecture.desc")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Features List */}
            <motion.div
              initial="hidden"
              animate={architectureInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {architecturalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={architectureInView ? "visible" : "hidden"}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-2xl font-light text-muted-foreground/40 group-hover:text-primary transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <div>
                      <h4 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Architecture Images */}
            <motion.div
              initial="hidden"
              animate={architectureInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] overflow-hidden group">
                <img
                  src={towerBW2}
                  alt="Tower structural detail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden group mt-8">
                <img
                  src={towerBwDetail}
                  alt="Tower facade detail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-2 aspect-[21/9] overflow-hidden group">
                <img
                  src={towerAerialDay}
                  alt="Tower aerial view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interior Spaces */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div ref={interiorRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Images */}
            <motion.div
              initial="hidden"
              animate={interiorInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[4/5] overflow-hidden group">
                <img
                  src={interiorLobby}
                  alt="Grand lobby interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden group mt-12">
                <img
                  src={interiorOffice}
                  alt="Premium office space"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              animate={interiorInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t("tower.interior.label")}
                </span>
              </div>
              <h3 className="text-subheadline font-light text-foreground">
                {t("tower.interior.title")}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("tower.interior.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("tower.interior.p2")}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <p className="text-3xl font-light text-foreground">3.2m</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t("tower.ceiling")}</p>
                </div>
                <div>
                  <p className="text-3xl font-light text-foreground">360°</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t("tower.views")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tower Details Gallery */}
      <div className="py-section bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={detailsRef}
            initial="hidden"
            animate={detailsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("tower.details.label")}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground">
              {t("tower.details.title")}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              animate={detailsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="md:col-span-2 aspect-[16/9] overflow-hidden group relative"
            >
              <motion.img
                src={towerTopClouds}
                alt="Tower crown detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("tower.details.img1")}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={detailsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              className="aspect-[4/5] md:aspect-auto overflow-hidden group relative"
            >
              <motion.img
                src={towerDetail}
                alt="Facade detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("tower.details.img2")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tower Facts */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={factsRef}
            initial="hidden"
            animate={factsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h3 className="text-subheadline font-light text-foreground">
              {t("tower.facts.title")}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {towerFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={factsInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center p-8 border border-border hover:border-primary/30 hover:bg-background/50 transition-all duration-500 group cursor-default"
              >
                <motion.p
                  className="text-4xl lg:text-5xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={factsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  {fact.value}
                </motion.p>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-300">
                  {fact.label}
                </p>
                <motion.div
                  className="w-8 h-px bg-border mx-auto mb-3 group-hover:w-16 group-hover:bg-primary transition-all duration-500"
                  initial={{ scaleX: 0 }}
                  animate={factsInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                />
                <p className="text-sm text-muted-foreground">
                  {fact.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Aerial Perspectives */}
      <div className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={aerialRef}
            initial="hidden"
            animate={aerialInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("tower.aerial.label")}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("tower.aerial.title")}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("tower.aerial.desc")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              animate={aerialInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="aspect-[4/3] overflow-hidden group relative"
            >
              <img
                src={towerAerialCityscape}
                alt="Al Hamra Tower dominating Kuwait City skyline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("tower.aerial.img1")}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={aerialInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[4/3] overflow-hidden group relative"
            >
              <img
                src={towerAerialSea}
                alt="Al Hamra Tower with Arabian Gulf view"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("tower.aerial.img2")}</p>
              </div>
            </motion.div>
          </div>

          {/* Full Width Facade Detail */}
          <motion.div
            initial="hidden"
            animate={aerialInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 aspect-[21/9] overflow-hidden group relative"
          >
            <img
              src={towerFacadeDetail}
              alt="Al Hamra Tower sculptural facade detail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white/80 text-sm uppercase tracking-[0.2em] mb-2">{t("tower.facade.label")}</p>
              <p className="text-white text-2xl font-light max-w-md">{t("tower.facade.title")}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grand Entrance */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div ref={entranceRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              animate={entranceInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t("tower.entrance.label")}
                </span>
              </div>
              <h3 className="text-subheadline font-light text-foreground">
                {t("tower.entrance.title")}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("tower.entrance.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("tower.entrance.p2")}
              </p>
            </motion.div>

            {/* Entrance Images */}
            <motion.div
              initial="hidden"
              animate={entranceInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] overflow-hidden group">
                <img
                  src={towerEntranceNight}
                  alt="Tower entrance at night"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden group mt-8">
                <img
                  src={towerEntranceFountain}
                  alt="Tower fountain and entrance plaza"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Night Illumination */}
      <div className="py-section bg-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={nightRef}
            initial="hidden"
            animate={nightInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h3 className="text-subheadline font-light text-background mb-4">
              {t("tower.night.title")}
            </h3>
            <p className="text-body text-background/70 max-w-2xl mx-auto">
              {t("tower.night.desc")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              animate={nightInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 aspect-[16/9] overflow-hidden group relative"
            >
              <img
                src={kuwaitSkylineWaterNight}
                alt="Kuwait City skyline at night with Al Hamra Tower"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={nightInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[3/4] lg:aspect-auto overflow-hidden group relative"
            >
              <img
                src={towerNightIlluminated}
                alt="Al Hamra Tower illuminated at night"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Extended Aerial Gallery */}
      <div className="py-section bg-background texture-noise">
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
                {t("tower.gallery.label")}
              </span>
            </div>
            <h3 className="text-subheadline font-light text-foreground mb-4">
              {t("tower.gallery.title")}
            </h3>
            <p className="text-body text-muted-foreground max-w-2xl">
              {t("tower.gallery.desc")}
            </p>
          </motion.div>

          {/* Masonry-style Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Large feature image */}
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden group relative"
            >
              <img
                src={towerAerialBalcony}
                alt="Al Hamra Tower aerial view from balcony"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("tower.gallery.img1")}</p>
              </div>
            </motion.div>

            {/* Kuwait Towers landmark */}
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[3/4] overflow-hidden group relative"
            >
              <img
                src={towerKuwaitTowers}
                alt="Al Hamra Tower with Kuwait Towers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("tower.gallery.img2")}</p>
              </div>
            </motion.div>

            {/* Harbor view */}
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-[3/4] overflow-hidden group relative"
            >
              <img
                src={towerAerialHarbor}
                alt="Al Hamra Tower aerial with harbor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("tower.gallery.img3")}</p>
              </div>
            </motion.div>

            {/* North view */}
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="aspect-[3/4] overflow-hidden group relative"
            >
              <img
                src={towerAerialNorth}
                alt="Al Hamra Tower north aerial view"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("tower.gallery.img4")}</p>
              </div>
            </motion.div>

            {/* Gulf view - spans 2 columns */}
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="col-span-2 aspect-[16/9] overflow-hidden group relative"
            >
              <img
                src={towerAerialGulf}
                alt="Al Hamra Tower with Arabian Gulf"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{t("tower.gallery.img5")}</p>
              </div>
            </motion.div>

            {/* City context */}
            <motion.div
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="aspect-[3/4] lg:aspect-[4/5] overflow-hidden group relative"
            >
              <img
                src={towerCityContext}
                alt="Al Hamra Tower in city context"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-light">{t("tower.gallery.img6")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceSection;