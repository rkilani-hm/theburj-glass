import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import towerFacade from "@/assets/tower-facade-detail.jpg";
import towerSunset from "@/assets/tower-sunset.png";
import towerBwDetail from "@/assets/tower-bw-detail.png";

const Architecture = () => {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();

  const features = [
    {
      title: "Sculptural Twist",
      description: "A 45-degree rotation from base to summit creates dynamic visual interest while optimizing solar exposure."
    },
    {
      title: "Carved Façade",
      description: "The asymmetrical carving along the south face provides natural shading and reduces solar heat gain."
    },
    {
      title: "Stone & Glass",
      description: "Traditional limestone cladding meets contemporary curtain wall systems in a harmonious blend."
    },
    {
      title: "Organic Form",
      description: "Inspired by the gradual unfurling of a palm frond, embodying Kuwait's natural heritage."
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={towerFacade} 
            alt="Al Hamra Tower Architecture" 
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
              Architecture & Design
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Where form follows climate and culture
            </p>
          </motion.div>
        </section>

        {/* Design Philosophy */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  Design Philosophy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Designed by Skidmore, Owings & Merrill, Al Hamra Tower represents a 
                  masterful response to Kuwait's extreme climate while honoring the region's 
                  rich architectural traditions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The tower's distinctive silhouette is not merely aesthetic—every curve and 
                  angle serves a purpose, from reducing wind loads to maximizing natural light 
                  while minimizing heat gain.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div>
                    <p className="text-3xl font-light">412m</p>
                    <p className="text-sm text-muted-foreground">Total Height</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">77</p>
                    <p className="text-sm text-muted-foreground">Floors</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={towerSunset} 
                  alt="Al Hamra Tower at Sunset" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architectural Features */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={featuresReveal.ref}
              initial="hidden"
              animate={featuresReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-16">
                Defining Elements
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 bg-background border border-border"
                  >
                    <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detail Image */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={towerBwDetail} 
                alt="Architectural Detail" 
                className="w-full h-auto"
              />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Façade detail showing the interplay of stone and glass
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Architecture;
