import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import somTowerNight from "@/assets/som-tower-night.jpg";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import towerCityContext from "@/assets/tower-city-context.jpg";
import towerFacadeTwisted from "@/assets/tower-facade-twisted.png";
import towerLowangleClouds from "@/assets/tower-lowangle-clouds.png";

const Engineering = () => {
  const heroReveal = useScrollReveal();

  const specs = [
    { label: "Building Height", value: "412m", detail: "Kuwait's tallest structure" },
    { label: "Number of Stories", value: "74", detail: "Plus mechanical floors" },
    { label: "Foundation Mat", value: "5,800m²", detail: "Spanning full footprint" },
    { label: "Gross Area", value: "195,000m²", detail: "Office & retail space" },
    { label: "Concrete Volume", value: "85,000m³", detail: "High-performance mix" },
    { label: "Concrete Strength", value: "50–80 MPa", detail: "Cube strength range" },
    { label: "Shear Wall", value: "1,200mm", detail: "Maximum thickness" },
    { label: "Perimeter Columns", value: "700–1,200mm", detail: "Square sections" },
    { label: "Floor Slab", value: "160mm", detail: "× 6.0m span" },
  ];

  const innovations = [
    {
      title: "Hyperbolic Paraboloid Walls",
      description: "Two reinforced-concrete flared walls extend the full 412m height. The southeast wall leans INTO the building (lightly loaded), while the southwest wall leans AWAY, carrying enormous concentrated loads—a unique structural behavior unprecedented at this scale."
    },
    {
      title: "Torsional Gravity Response",
      description: "The tower twists elastically under gravity loads alone. Counter-clockwise circumferential forces at each slab-to-flared-wall intersection create cumulative torsional moment from zero at top to maximum at base. SOM developed creep compatibility analysis using ACI 209R-92 guidelines."
    },
    {
      title: "Cantilevered Truss System",
      description: "The observation deck's curtain wall is supported by an innovative cantilevered truss system that eliminates the need for columns, providing unobstructed 360-degree views from the 130-foot-high space."
    },
    {
      title: "Sloped Perimeter Columns",
      description: "Columns along the exterior slope inwards at the base, defining the street-level appearance while efficiently transferring the tower's loads to the foundation system."
    },
    {
      title: "Composite Column System",
      description: "From the foundation mat to Level 29, perimeter columns incorporate embedded W360 steel sections within reinforced concrete, creating a hybrid system that optimizes both strength and constructability."
    },
  ];

  const analysisModels = [
    { name: "Serviceability Model", purpose: "Wind drift criteria verification (Height/500)" },
    { name: "Wind Design Model", purpose: "Core and frame design under lateral wind loads" },
    { name: "Seismic Design Model", purpose: "Reinforcement layout verification" },
    { name: "Torsional Creep Model", purpose: "Long-term gravity twist analysis" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={towerLowangleClouds} 
            alt="Al Hamra Tower Engineering" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <motion.div 
            ref={heroReveal.ref}
            initial="hidden"
            animate={heroReveal.isInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 p-8 lg:p-16"
          >
            <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-foreground mb-4">
              Structural Engineering
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The science behind the sculpture
            </p>
          </motion.div>
        </section>

        {/* Overview */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-widest text-champagne">SOM Structural Engineering</p>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                Engineering Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Al Hamra Tower's distinctive asymmetrical form presented unprecedented engineering 
                challenges. The tower's twisted ribbon walls provide stunning visual impact, but 
                their design is grounded in rigorous structural analysis—consciously maximizing 
                views of the Arabian Gulf while minimizing solar heat gain.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The design and construction represents a significant step forward both in terms of 
                architectural design form and process. By leveraging the latest three-dimensional 
                parametric modeling software, SOM brought together the realms of free-form design 
                and the super high-rise skyscraper.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Specifications Grid */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-16">
                Technical Specifications
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 liquid-glass-subtle bg-background/80 text-center hover:border-silk-gold/40 transition-colors duration-300"
                  >
                    <p className="text-3xl font-light mb-2">{spec.value}</p>
                    <p className="text-sm text-foreground mb-1">{spec.label}</p>
                    <p className="text-xs text-muted-foreground">{spec.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Structural Innovations */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-light tracking-wide mb-12">
                  Structural Innovations
                </h2>
                <div className="space-y-8">
                  {innovations.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="pb-8 border-b border-silk-gold/15 last:border-0"
                    >
                      <h3 className="text-xl font-light mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-32"
              >
                <img 
                  src={towerFacadeTwisted} 
                  alt="Tower Twisted Facade Detail" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">The hyperbolic paraboloid walls create the tower's distinctive twist</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Analysis & Design Models */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-6">
                Analysis & Design Models
              </h2>
              <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
                Four parallel 3D finite element analysis models were developed to verify structural 
                performance under different loading conditions—a comprehensive approach essential 
                for the tower's unprecedented geometry.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analysisModels.map((model, index) => (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 liquid-glass-subtle bg-background/80 hover:border-silk-gold/40 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-silk-gold/10 border border-silk-gold/20 flex items-center justify-center mb-4 rounded-xl">
                      <span className="text-silk-gold font-light text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-light mb-2">{model.name}</h3>
                    <p className="text-sm text-muted-foreground">{model.purpose}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-light tracking-wide text-white mb-16">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "40%", label: "Solar Heat Reduction" },
                { value: "H/500", label: "Wind Drift Criteria" },
                { value: "15", label: "High-Speed Elevators" },
                { value: "52s", label: "Ground to Top" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-4xl font-light text-white mb-2">{stat.value}</p>
                  <p className="text-sm text-grey-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Load Path Visualization */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={somTowerDetail} 
                  alt="Tower Structural Detail" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-3xl font-light tracking-wide">
                  Gravity Load Path
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The tower's center of mass is offset 7.0 meters north of its geometric center—a 
                  consequence of the spiraling geometry that creates the iconic sculptural form.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The southwest flared wall, leaning away from the building, carries enormous concentrated 
                  loads. This required careful functional planning to locate heavy equipment away from this 
                  quadrant, demonstrating how architectural vision and engineering constraints informed 
                  each other throughout the design process.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-silk-gold/20">
                  <div>
                    <p className="text-3xl font-light">7.0<span className="text-lg">m</span></p>
                    <p className="text-sm text-muted-foreground">Center of Mass Offset</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">700<span className="text-lg">mm</span></p>
                    <p className="text-sm text-muted-foreground">Gravity Beam Depth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City Context */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={towerCityContext} 
                alt="Al Hamra Tower in Kuwait City" 
                className="w-full h-auto"
              />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Al Hamra Tower dominates the Kuwait City skyline, a testament to engineering ambition
              </p>
            </motion.div>
          </div>
        </section>

        {/* Research Credit */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-8">
                "The design and construction of the Al Hamra Tower is a significant step forward 
                both in terms of architectural design form and process. By blending conventional 
                engineering tools with parametric modeling software, SOM has brought together the 
                realms of free-form design and the super high-rise skyscraper."
              </blockquote>
              <cite className="text-muted-foreground">
                — CTBUH Research Paper, Structural Engineers World Congress 2007
              </cite>
              <p className="text-sm text-muted-foreground mt-4">
                Authors: Mark Sarkisian, Neville Mathias, Aaron Mazeika (SOM)
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;