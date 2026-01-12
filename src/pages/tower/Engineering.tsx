import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import somTowerNight from "@/assets/som-tower-night.jpg";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import towerCityContext from "@/assets/tower-city-context.jpg";

const Engineering = () => {
  const heroReveal = useScrollReveal();

  const specs = [
    { label: "Building Height", value: "412m", detail: "Kuwait's tallest structure" },
    { label: "Number of Stories", value: "74", detail: "Including observation deck" },
    { label: "Site Area", value: "10,000m²", detail: "Mixed-use development" },
    { label: "Gross Area", value: "195,000m²", detail: "Office & retail space" },
    { label: "Concrete Volume", value: "85,000m³", detail: "High-performance mix" },
    { label: "Foundation Depth", value: "30m", detail: "Over 200 concrete piles" },
  ];

  const innovations = [
    {
      title: "Cantilevered Truss System",
      description: "The observation deck's curtain wall is supported by an innovative cantilevered truss system that eliminates the need for columns, providing unobstructed 360-degree views from the 130-foot-high space."
    },
    {
      title: "Sloped Perimeter Columns",
      description: "Columns along the exterior slope inwards at the base, defining the street-level appearance while efficiently transferring the tower's loads to the foundation system."
    },
    {
      title: "Twisted Ribbon Walls",
      description: "The graceful, twisting 'ribbon' walls required advanced computational modeling and precision construction to achieve the tower's sculptural form while maintaining structural integrity."
    },
    {
      title: "High-Performance Concrete",
      description: "Custom concrete mixes with compressive strengths up to 80 MPa ensure long-term durability in Kuwait's extreme climate conditions."
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={somTowerNight} 
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
              <p className="text-sm uppercase tracking-widest text-primary">SOM Structural Engineering</p>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                Engineering Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Al Hamra Tower's distinctive asymmetrical form presented unprecedented engineering 
                challenges. The tower's twisted ribbon walls provide stunning visual impact, but 
                their design is grounded in rigorous structural analysis—consciously maximizing 
                views of the Arabian Gulf while minimizing solar heat gain.
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 border border-border bg-background text-center"
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
                      className="pb-8 border-b border-border last:border-0"
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
                  src={somTowerDetail} 
                  alt="Tower Structural Detail" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
              </motion.div>
            </div>
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
                { value: "40%", label: "Energy Reduction" },
                { value: "99.9%", label: "Elevator Uptime" },
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

        {/* City Context */}
        <section className="py-24 px-6 lg:px-12">
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
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;