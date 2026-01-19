import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import AnimatedStatCard from "@/components/alhamra/AnimatedStatCard";
import CircularProgress from "@/components/alhamra/CircularProgress";
import TowerCrossSection from "@/components/alhamra/TowerCrossSection";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sun, Shield, Zap, Leaf, Recycle, Car, Building2, Flame, Thermometer, Wind, Droplets, Battery } from "lucide-react";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import towerSunset from "@/assets/tower-sunset.png";
import somLobby from "@/assets/som-lobby.jpg";

const Sustainability = () => {
  const heroReveal = useScrollReveal();
  const introReveal = useScrollReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const energyFeatures = [
    {
      icon: Sun,
      title: "Passive Solar Design",
      description: "The tower's asymmetrical form reduces solar heat gain by removing a quarter of each floor plate from the south side, naturally cooling interior spaces while maximizing Arabian Gulf views.",
    },
    {
      icon: Building2,
      title: "Thermal Mass Shielding",
      description: "The south-facing core is clad in 40mm thick Jura limestone, acting as a natural thermal barrier against Kuwait's intense desert sun.",
    },
    {
      icon: Zap,
      title: "High-Performance Glazing",
      description: "East, north, and west elevations feature unitized Low-E coated insulated glass units that minimize heat transfer while optimizing natural daylight penetration.",
    },
    {
      icon: Recycle,
      title: "Sustainable Blinds",
      description: "SilverScreen Enviro roller blinds are 100% recyclable, highly reflective, and hold both Oeko-Tex and Cradle to Cradle certifications.",
    },
    {
      icon: Car,
      title: "EV Charging Infrastructure",
      description: "The 11-level car park includes dedicated electric vehicle charging stations, supporting Kuwait's transition to sustainable transportation.",
    },
    {
      icon: Leaf,
      title: "Climate-Responsive Form",
      description: "Recognized by Time Magazine's 50 Best Inventions for its innovative solar-responsive design that harmonizes architecture with environment.",
    },
  ];

  const safetyFeatures = [
    {
      icon: Flame,
      title: "Siemens FireFinder XLSV",
      description: "State-of-the-art firefighting system specifically designed for supertall structures, providing comprehensive fire detection and suppression throughout all 74 floors.",
    },
    {
      icon: Shield,
      title: "Dedicated Refuge Floors",
      description: "Two refuge floors on levels 29 and 54 provide protected areas for evacuation during emergencies, equipped with enhanced fire-resistant construction.",
    },
    {
      icon: Zap,
      title: "100% Power Redundancy",
      description: "Five electrical substations across levels B2, 4, 27, 52, and 76 ensure uninterrupted power distribution with full redundancy.",
    },
    {
      icon: Building2,
      title: "Smart Building Management",
      description: "Advanced BMS and IT telecom networking with fiber optic backbone enables real-time monitoring and automated response systems.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-emerald-50/50 to-background">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[...Array(20)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 100}
                  cy={Math.random() * 100}
                  r={Math.random() * 3 + 1}
                  fill="currentColor"
                  className="text-primary"
                />
              ))}
            </svg>
          </div>

          {/* Breadcrumb */}
          <div className="container mx-auto px-6 lg:px-12 pt-8">
            <nav className="text-sm text-muted-foreground">
              <span>Home</span>
              <span className="mx-2">|</span>
              <span>The Tower</span>
              <span className="mx-2">|</span>
              <span className="text-foreground">Sustainability</span>
            </nav>
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-12 py-24 relative z-10">
            <motion.div
              ref={heroReveal.ref}
              initial="hidden"
              animate={heroReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 text-primary mb-6">
                <Leaf className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest">Environmental Excellence</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-foreground mb-6">
                Sustainable by Design
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Al Hamra Tower's revolutionary form is not merely sculptural—it is a functional 
                response to Kuwait's desert climate, integrating passive solar strategies with 
                cutting-edge building systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={introReveal.ref}
              initial="hidden"
              animate={introReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={somTowerDetail}
                  alt="Al Hamra Tower sustainable facade"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white/80 text-sm">
                    The sculpted form reduces solar exposure by 25%
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-widest text-primary">Form Follows Climate</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  Architecture as Environmental Response
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In Kuwait's extreme climate, where summer temperatures exceed 50°C, conventional 
                  tower design would result in massive energy consumption. Al Hamra Tower's 
                  asymmetrical sculpting emerged as an elegant solution—removing floor area from 
                  the south side reduces heat gain while the solid limestone core acts as a 
                  thermal shield.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This integration of sustainable principles at the conceptual level, rather than 
                  as an afterthought, earned recognition from Time Magazine as one of the 50 Best 
                  Inventions of 2011.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Animated Energy Stats Infographic */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-primary mb-4">By The Numbers</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">
                  Environmental Impact
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Quantifying the sustainable advantages of climate-responsive architecture
                </p>
              </motion.div>
            </div>

            {/* Circular Progress Charts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <CircularProgress value={25} label="Solar Heat Reduction" delay={0} />
              <CircularProgress value={40} label="Limestone Thermal Shield (mm)" suffix="mm" maxValue={50} delay={1} color="hsl(142, 76%, 36%)" />
              <CircularProgress value={100} label="Recyclable Blinds" delay={2} color="hsl(45, 93%, 47%)" />
              <CircularProgress value={74} label="Floors Protected" suffix=" floors" maxValue={74} delay={3} color="hsl(217, 91%, 60%)" />
            </div>

            {/* Stat Cards Grid */}
            <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedStatCard
                value={24000}
                suffix="m²"
                label="Limestone Façade"
                description="Jura limestone panels providing natural thermal mass"
                icon={Thermometer}
                delay={0}
                color="primary"
              />
              <AnimatedStatCard
                value={11}
                label="Parking Levels"
                description="With integrated EV charging stations"
                icon={Car}
                delay={1}
                color="emerald"
              />
              <AnimatedStatCard
                value={5}
                label="Substations"
                description="Distributed across the tower for efficient power delivery"
                icon={Zap}
                delay={2}
                color="amber"
              />
              <AnimatedStatCard
                value={2}
                label="Refuge Floors"
                description="Dedicated emergency evacuation zones"
                icon={Shield}
                delay={3}
                color="blue"
              />
            </div>
          </div>
        </section>

        {/* Energy Efficiency Grid */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-widest text-primary mb-4">Energy Efficiency</p>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                Designed for Performance
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {energyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-background p-8 border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <feature.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
                  <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={towerSunset}
            alt="Al Hamra Tower at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center text-white max-w-2xl px-6"
            >
              <p className="text-4xl lg:text-5xl font-light mb-4">25%</p>
              <p className="text-lg opacity-80">
                Reduction in solar heat gain through passive design strategies
              </p>
            </motion.div>
          </div>
        </section>

        {/* Safety & Systems Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-sm uppercase tracking-widest text-primary mb-4">Safety & Systems</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6">
                  Intelligent Protection
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Beyond environmental sustainability, Al Hamra Tower integrates advanced safety 
                  and building management systems designed specifically for supertall structures, 
                  ensuring the wellbeing of thousands of daily occupants.
                </p>
                
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={somLobby}
                    alt="Al Hamra Tower lobby"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {safetyFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex gap-6 p-6 bg-muted/30 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300"
                  >
                    <feature.icon className="w-8 h-8 text-primary flex-shrink-0" strokeWidth={1} />
                    <div>
                      <h3 className="text-lg font-light mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Systems Infographic */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900 overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-grey-400 mb-4">Safety Infrastructure</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
                  Protection by Design
                </h2>
              </motion.div>
            </div>

            {/* Animated Safety Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { value: 74, label: "Floors Monitored", suffix: "", icon: Building2, description: "Complete fire detection coverage" },
                { value: 100, label: "Power Redundancy", suffix: "%", icon: Battery, description: "Zero downtime guarantee" },
                { value: 5, label: "Electrical Substations", suffix: "", icon: Zap, description: "Distributed across key levels" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative bg-charcoal-800/50 border border-charcoal-700/50 p-8 rounded-lg group hover:border-primary/30 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <motion.p 
                    className="text-4xl lg:text-5xl font-light text-white mb-2 tabular-nums"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.p>
                  <p className="text-sm font-medium text-grey-300 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-grey-500">{stat.description}</p>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, rgba(var(--primary), 0.1) 0%, transparent 50%)",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Interactive Tower Cross-Section */}
            <TowerCrossSection />
          </div>
        </section>

        {/* Recognition Banner */}
        <section className="py-20 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Recognition</p>
              <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-8">
                CTBUH 10 Year Award 2021
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                A decade after completion, Al Hamra Tower was recognized by the Council on Tall 
                Buildings and Urban Habitat for its enduring value, sustainable performance, and 
                continued contribution to Kuwait's urban landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-32 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Leaf className="w-12 h-12 text-primary mx-auto mb-8" strokeWidth={1} />
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-8">
                Building for Tomorrow
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Al Hamra Tower demonstrates that iconic architecture and environmental 
                responsibility are not competing values—they are complementary forces that, 
                when unified, create structures worthy of their place in the world.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;