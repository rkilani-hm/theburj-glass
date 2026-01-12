import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import somLobby from "@/assets/som-lobby.jpg";
import somObservation from "@/assets/som-observation.jpg";
import somTowerVertical from "@/assets/som-tower-vertical.jpg";

const Architecture = () => {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const lobbyReveal = useScrollReveal();

  const features = [
    {
      title: "Sculptural Twist",
      description: "Each floor plate is rotated counterclockwise around the core, creating an ascending, geometric unraveling that defines the tower's iconic silhouette."
    },
    {
      title: "Carved South Wall",
      description: "A quarter of each floor plate is chiseled out of the south side, shifting from west to east over the height of the building, maximizing Gulf views while minimizing solar heat gain."
    },
    {
      title: "Jura Limestone Façade",
      description: "The south-facing core wall is constructed of richly textured Jura limestone, standing distinct from the three glass-enclosed sides of the tower."
    },
    {
      title: "Traditional Bisht Form",
      description: "The asymmetrical form draws inspiration from the traditional bisht robes worn by Kuwaitis, making the tower a culturally resonant icon."
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={somTowerSkyline} 
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
                <p className="text-sm uppercase tracking-widest text-primary">By Skidmore, Owings & Merrill</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  A Timeless, Elegant Marker
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A desire to maximize waterfront views while minimizing solar heat gain inspired 
                  the building's asymmetrical form, which calls to mind the traditional bisht robes 
                  worn by Kuwaitis. The purity of its form, expressed by a simple operation of 
                  removal, makes the tower a timeless, elegant marker in the heart of Kuwait City.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The result reveals a rich, monolithic stone at the south wall framed by the 
                  graceful, twisting "ribbon" walls that gesture toward the sky.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                  <div>
                    <p className="text-3xl font-light">412<span className="text-lg">m</span></p>
                    <p className="text-sm text-muted-foreground">Building Height</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">74</p>
                    <p className="text-sm text-muted-foreground">Stories</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">195,000<span className="text-lg">m²</span></p>
                    <p className="text-sm text-muted-foreground">Gross Area</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">10,000<span className="text-lg">m²</span></p>
                    <p className="text-sm text-muted-foreground">Site Area</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={somTowerVertical} 
                  alt="Al Hamra Tower Vertical View" 
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

        {/* Lobby Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={lobbyReveal.ref}
              initial="hidden"
              animate={lobbyReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <img 
                  src={somLobby} 
                  alt="Al Hamra Tower Lobby" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  The Grand Lobby
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At the base of the mixed-use complex, the main 80-foot lobby on the north side 
                  of the tower extends from the tower's core to its perimeter frame. Columns along 
                  the exterior slope inwards, defining the street-level appearance while structurally 
                  supporting the rest of the tower.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The lobby's dramatic scale and carefully orchestrated light create an arrival 
                  experience befitting Kuwait's tallest building.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Observation Deck */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-white">
                  Sky Deck & Restaurant
                </h2>
                <p className="text-grey-400 leading-relaxed">
                  A restaurant and observation deck sit at the top of the tower in a 130-foot-high 
                  space. Visitors are treated to tremendous, unobstructed views of the city thanks 
                  to a cantilevered truss system that supports the curtain wall and reduces the 
                  amount of columns needed.
                </p>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-light text-white">130<span className="text-lg">ft</span></p>
                    <p className="text-sm text-grey-500">Observation Height</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-white">360°</p>
                    <p className="text-sm text-grey-500">Panoramic Views</p>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={somObservation} 
                  alt="Observation Deck" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-grey-500 mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
              </motion.div>
            </div>
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
                src={somTowerDetail} 
                alt="Architectural Detail" 
                className="w-full h-auto"
              />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Façade detail showing the interplay of Jura limestone and glass curtain wall
              </p>
            </motion.div>
          </div>
        </section>

        {/* Collaborators */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-light tracking-wide mb-12">Project Collaborators</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: "SOM", role: "Lead Architect" },
                { name: "VDA", role: "Associate Architect" },
                { name: "Al-Jazera Consultants", role: "Local Consultants" },
                { name: "Ahmadiah Contracting", role: "General Contractor" },
              ].map((collaborator) => (
                <div key={collaborator.name} className="text-center">
                  <p className="font-light">{collaborator.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{collaborator.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Architecture;