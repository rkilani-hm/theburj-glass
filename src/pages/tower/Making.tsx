import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import constructionFoundation from "@/assets/construction-foundation.jpg";
import constructionSteel from "@/assets/construction-steel.jpg";
import constructionFacade from "@/assets/construction-facade.jpg";
import towerSunset from "@/assets/tower-sunset.png";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";

const Making = () => {
  const heroReveal = useScrollReveal();
  const visionReveal = useScrollReveal();

  const milestones = [
    {
      date: "2004",
      title: "The Vision Begins",
      description: "Al Hamra Real Estate Company launches an international design competition to create Kuwait's most iconic tower, attracting proposals from over 20 world-renowned architectural firms.",
      image: towerBw1,
    },
    {
      date: "2005",
      title: "Design Selection",
      description: "Skidmore, Owings & Merrill (SOM) is selected as the lead architect. Their revolutionary asymmetric design, inspired by traditional Kuwaiti bisht robes, wins the competition.",
      image: somTowerSkyline,
    },
    {
      date: "2006",
      title: "Foundation Phase",
      description: "Groundbreaking ceremony marks the beginning of construction. Over 200 concrete piles are driven 30 meters deep into the bedrock, with one of the largest continuous concrete pours in Middle East history.",
      image: constructionFoundation,
    },
    {
      date: "2007",
      title: "Structural Rising",
      description: "The reinforced concrete core reaches the 40th floor using self-climbing formwork technology. The tower becomes visible across Kuwait City's skyline for the first time.",
      image: constructionSteel,
    },
    {
      date: "2008",
      title: "Core Completion",
      description: "The massive foundation system is completed, featuring a mat foundation spanning over 5,800 square meters. High-performance concrete with compressive strengths up to 80 MPa ensures durability.",
      image: constructionSteel,
    },
    {
      date: "2009",
      title: "Structural Topping",
      description: "Al Hamra Tower reaches its full structural height of 412 meters, crowned with its distinctive sculptural top. Over 85,000 cubic meters of concrete used in total construction.",
      image: constructionFacade,
    },
    {
      date: "2010",
      title: "Envelope Completion",
      description: "The limestone and glass curtain wall is completed. 24,000 square meters of custom-cut Jura limestone panels are installed, revealing the tower's final sculptural form.",
      image: constructionFacade,
    },
    {
      date: "January 2011",
      title: "Grand Opening",
      description: "Al Hamra Tower officially opens as Kuwait's tallest building and the tallest sculpted tower in the world. The opening ceremony is attended by dignitaries from across the Gulf region.",
      image: towerSunset,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-stone-100 to-background">
          {/* Tower Silhouette */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10">
            <svg viewBox="0 0 200 600" className="h-full w-full" preserveAspectRatio="xMaxYMax meet">
              <path
                d="M100 600 L100 100 Q95 80 90 60 L90 40 Q100 20 110 40 L110 60 Q105 80 100 100 L100 600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary"
              />
              <path
                d="M80 600 L80 200 Q85 180 100 180 Q115 180 120 200 L120 600"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary"
              />
            </svg>
          </div>

          {/* Breadcrumb */}
          <div className="container mx-auto px-6 lg:px-12 pt-8">
            <nav className="text-sm text-muted-foreground">
              <span>Home</span>
              <span className="mx-2">|</span>
              <span>The Tower</span>
              <span className="mx-2">|</span>
              <span className="text-foreground">Making</span>
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
              <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-foreground mb-6">
                Al Hamra Tower Making Process
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                From vision to reality: the seven-year journey of creating Kuwait's most iconic landmark
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={visionReveal.ref}
              initial="hidden"
              animate={visionReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={somTowerSkyline} 
                  alt="Al Hamra Tower Vision"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-widest text-primary">Vision</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  The Idea — To Sculpt the Sky
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Inspired by the traditional bisht robes worn by Kuwaitis, Al Hamra Tower embodies 
                  visionary design. The asymmetrical form, expressed by a simple operation of removal, 
                  creates a sculptural presence that is both culturally resonant and structurally innovative.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A quarter of each floor plate is chiseled out of the south side, shifting from west 
                  to east over the height of the building. This design maximizes Arabian Gulf views 
                  while minimizing solar heat gain—form following both climate and culture.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-light tracking-wide text-center mb-20">
              Construction Timeline
            </h2>

            <div className="space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.date}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 py-16 border-b border-border ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-video overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img 
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col justify-center space-y-4 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                    <p className="text-sm uppercase tracking-widest text-primary font-medium">
                      {milestone.date}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-light">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-light tracking-wide text-center text-white mb-16">
              By The Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "7", label: "Years to Complete", suffix: "" },
                { value: "412", label: "Meters Height", suffix: "m" },
                { value: "85,000", label: "Cubic Meters Concrete", suffix: "m³" },
                { value: "24,000", label: "Sqm Limestone Façade", suffix: "m²" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-4xl lg:text-5xl font-light text-white mb-2">
                    {stat.value}<span className="text-lg">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-grey-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legacy Statement */}
        <section className="py-32 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-8">
                A Monument to Human Ambition
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Today, Al Hamra Tower stands as more than Kuwait's tallest building—it is the 
                world's tallest sculpted tower, a testament to the vision of its founders and 
                the skill of the thousands who brought it to life. Its making represents the 
                pinnacle of architectural and engineering achievement.
              </p>
              <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
                <span>Completed 2011</span>
                <span className="w-px h-4 bg-border" />
                <span>74 Stories</span>
                <span className="w-px h-4 bg-border" />
                <span>World's Tallest Sculpted Tower</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Making;