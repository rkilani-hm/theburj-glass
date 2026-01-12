import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import towerCityContext from "@/assets/tower-city-context.jpg";

const Engineering = () => {
  const heroReveal = useScrollReveal();

  const specs = [
    { label: "Structural System", value: "Reinforced Concrete Core" },
    { label: "Foundation Depth", value: "30 meters" },
    { label: "Concrete Volume", value: "85,000 m³" },
    { label: "Steel Reinforcement", value: "12,500 tonnes" },
    { label: "Wind Load Design", value: "180 km/h" },
    { label: "Seismic Rating", value: "Zone 2B Compliant" },
  ];

  const innovations = [
    {
      title: "Asymmetric Core",
      description: "The offset concrete core provides structural efficiency while allowing for flexible floor plates and unobstructed views."
    },
    {
      title: "Outrigger System",
      description: "Strategic outrigger trusses connect the core to the perimeter columns, reducing lateral sway by 40%."
    },
    {
      title: "High-Performance Concrete",
      description: "Custom concrete mixes with compressive strengths up to 80 MPa ensure long-term durability in Kuwait's harsh climate."
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={towerAerialDay} 
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
              Engineering
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The science behind the sculpture
            </p>
          </motion.div>
        </section>

        {/* Specifications Grid */}
        <section className="py-24 px-6 lg:px-12">
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
                    className="p-6 border border-border text-center"
                  >
                    <p className="text-2xl font-light mb-2">{spec.value}</p>
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Structural Innovations */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
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
              >
                <img 
                  src={towerCityContext} 
                  alt="Tower in City Context" 
                  className="w-full h-auto sticky top-32"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-light tracking-wide mb-16">
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
                  <p className="text-4xl font-light mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Engineering;
