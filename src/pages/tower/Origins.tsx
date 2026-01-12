import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import towerAerial from "@/assets/tower-aerial.png";
import towerClouds from "@/assets/tower-clouds-aerial.png";

const Origins = () => {
  const heroReveal = useScrollReveal();
  const contentReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={towerAerial} 
            alt="Al Hamra Tower Origins" 
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
              Origins
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The vision that shaped Kuwait's tallest landmark
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={contentReveal.ref}
              initial="hidden"
              animate={contentReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  A Vision of Ambition
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al Hamra Tower emerged from a bold vision to create a landmark that would redefine 
                  Kuwait's skyline and establish a new benchmark for architectural excellence in the region.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Conceived by Al Hamra Real Estate Company, the project began in 2005 with the ambition 
                  to create not just a building, but a symbol of Kuwait's progress and resilience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The tower's development brought together world-renowned architects, engineers, and 
                  craftsmen, each contributing their expertise to realize this unprecedented vision.
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Construction Period</p>
                  <p className="text-2xl font-light">2005 — 2011</p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={towerClouds} 
                  alt="Al Hamra Tower Construction" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-light tracking-wide text-center mb-16">
              Journey to Completion
            </h2>
            <div className="space-y-12">
              {[
                { year: "2005", event: "Project conception and initial planning" },
                { year: "2006", event: "Groundbreaking ceremony" },
                { year: "2008", event: "Structural framework reaches midpoint" },
                { year: "2010", event: "Exterior cladding completion" },
                { year: "2011", event: "Grand opening and inauguration" },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  <span className="text-2xl font-light text-primary min-w-[80px]">{item.year}</span>
                  <div className="flex-1 pb-8 border-b border-border">
                    <p className="text-foreground">{item.event}</p>
                  </div>
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

export default Origins;
