import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import towerAerial from "@/assets/tower-aerial.png";
import towerClouds from "@/assets/tower-clouds-aerial.png";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerBw2 from "@/assets/tower-bw-2.png";
import towerBwAngle from "@/assets/tower-bw-angle.png";
import towerSunset from "@/assets/tower-sunset.png";
import towerCityContext from "@/assets/tower-city-context.jpg";
import constructionFoundation from "@/assets/construction-foundation.jpg";
import constructionSteel from "@/assets/construction-steel.jpg";
import constructionFacade from "@/assets/construction-facade.jpg";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import waterfrontPromenade from "@/assets/waterfront-promenade.jpg";

const Origins = () => {
  const heroReveal = useScrollReveal();
  const contentReveal = useScrollReveal();
  const visionReveal = useScrollReveal();
  const foundersReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const constructionReveal = useScrollReveal();
  const competitionReveal = useScrollReveal();

  const milestones = [
    { 
      year: "2004", 
      title: "The Vision Takes Shape",
      event: "Al Hamra Real Estate Company commissions an international design competition to create Kuwait's most iconic tower.",
      detail: "Over 20 architectural firms from around the world submitted proposals."
    },
    { 
      year: "2005", 
      title: "Design Selection",
      event: "Skidmore, Owings & Merrill (SOM) is selected as the lead architect, with their revolutionary asymmetric design.",
      detail: "The twisting form was inspired by traditional Kuwaiti robes."
    },
    { 
      year: "2006", 
      title: "Groundbreaking",
      event: "Official groundbreaking ceremony marks the beginning of construction on Kuwait's future tallest building.",
      detail: "Foundation work required over 200 concrete piles driven 30 meters deep."
    },
    { 
      year: "2007", 
      title: "Foundation Complete",
      event: "The massive 5,800m² foundation mat is completed, biased north to match the tower's offset center of mass.",
      detail: "Research paper presented at Structural Engineers World Congress."
    },
    { 
      year: "2008", 
      title: "Rising Above",
      event: "Composite columns with embedded W360 steel sections complete to Level 29. Core reaches 40th floor.",
      detail: "Self-climbing formwork technology accelerated vertical construction."
    },
    { 
      year: "2009", 
      title: "Structural Topping",
      event: "The tower reaches its full structural height of 412 meters, crowned with its distinctive sculptural top.",
      detail: "Over 85,000 cubic meters of concrete used in total construction."
    },
    { 
      year: "2010", 
      title: "Envelope Completion",
      event: "24,000m² of custom-cut limestone panels installed on hyperbolic paraboloid surfaces using digital fabrication.",
      detail: "Fiberglass formwork moulds fabricated directly from 3D digital models."
    },
    { 
      year: "2011", 
      title: "Grand Opening",
      event: "Al Hamra Tower officially opens, immediately becoming Kuwait's most recognized landmark.",
      detail: "The opening ceremony was attended by dignitaries from across the Gulf region."
    },
  ];

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

        {/* Introduction Section */}
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
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-silk-gold/20">
                  <div>
                    <p className="text-sm text-muted-foreground">Construction Period</p>
                    <p className="text-2xl font-light">2005 — 2011</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Investment</p>
                    <p className="text-2xl font-light">$400 Million</p>
                  </div>
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

        {/* The Competition */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={competitionReveal.ref}
              initial="hidden"
              animate={competitionReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  The International Competition
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The international design competition attracted proposals from more than 20 of the 
                  world's most prestigious architectural firms. Each was challenged to create a 
                  tower that would capture local culture while pushing engineering boundaries.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  SOM's winning concept stood apart for its unprecedented asymmetric form—a sculptural 
                  tower that appeared to unfurl like a traditional Kuwaiti bisht robe. The design was 
                  selected based on its cultural resonance, sustainability, and structural feasibility.
                </p>
                <blockquote className="border-l-2 border-silk-gold pl-6 italic text-foreground">
                  "A significant step forward both in terms of architectural design form and process. 
                  By leveraging the latest three-dimensional parametric modeling software, SOM brought 
                  together the realms of free-form design and the super high-rise skyscraper."
                </blockquote>
              </div>
              <div>
                <img 
                  src={skylineParkPanorama} 
                  alt="Kuwait City Park Panorama" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">Al Hamra Tower rises above the Kuwait City landscape</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Site Constraints */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <img 
                  src={waterfrontPromenade} 
                  alt="Waterfront Promenade" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">The tower anchors a vibrant urban district</p>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  Site Constraints & Design Response
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The space-constrained site at a prominent intersection in Kuwait City center 
                  presented conflicting requirements: the need to open the southwest quadrant 
                  toward the retail podium entrance, while focusing premium office spaces 
                  toward the Gulf views to the north, west, and east.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The podium and parking structure were already under construction when SOM joined 
                  the project, adding further complexity. The spiraling geometry elegantly resolved 
                  both challenges—creating the carved southwest opening while progressively rotating 
                  floor plates to optimize Gulf views at higher elevations.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-light">10,000<span className="text-lg">m²</span></p>
                    <p className="text-sm text-muted-foreground">Site Area</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">20+</p>
                    <p className="text-sm text-muted-foreground">Competition Entries</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Founders' Vision */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={foundersReveal.ref}
              initial="hidden"
              animate={foundersReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <img 
                  src={towerCityContext} 
                  alt="Al Hamra Tower in Kuwait City context" 
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  The Founders' Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al Hamra Real Estate Company, established in 1985, had long harbored ambitions to create 
                  a development that would stand as a testament to Kuwait's entrepreneurial spirit and 
                  forward-thinking vision.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The decision to build Kuwait's tallest tower was not merely about height—it was about 
                  creating a symbol of national pride that would inspire future generations and position 
                  Kuwait as a leader in architectural innovation.
                </p>
                <blockquote className="border-l-2 border-silk-gold pl-6 italic text-foreground">
                  "We envisioned a building that would not only define our skyline but also embody the 
                  spirit of Kuwait—ambitious, resilient, and forever reaching upward."
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={visionReveal.ref}
              initial="hidden"
              animate={visionReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-8">
                A Revolutionary Design
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The winning concept—a sculptural tower developed by subtracting a quadrant of a typical 
                filleted square floor plan—captured the essence of local culture while pushing the 
                boundaries of structural engineering to unprecedented heights.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Cultural Inspiration", 
                  description: "The asymmetric twisting form draws inspiration from the flowing folds of traditional Kuwaiti garments, creating a uniquely regional identity.",
                  image: towerBw1
                },
                { 
                  title: "Structural Innovation", 
                  description: "The carved-out corner presented unprecedented engineering challenges, requiring hyperbolic paraboloid walls and innovative creep compatibility analysis.",
                  image: towerBwAngle
                },
                { 
                  title: "Sustainable Vision", 
                  description: "Stone façade to the south provides environmental protection from the desert sun, reducing solar heat gain by 40% while maximizing Gulf views.",
                  image: towerBw2
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <div className="aspect-[4/5] overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-light mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Construction Phases */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={constructionReveal.ref}
              initial="hidden"
              animate={constructionReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">
                Building the Dream
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From the first foundation pour to the final glass panel, witness the monumental 
                construction journey that brought Kuwait's tallest tower to life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  image: constructionFoundation,
                  phase: "Phase One",
                  title: "Foundation & Excavation",
                  year: "2006-2007",
                  description: "5,800m² foundation mat biased north to match the tower's offset center of mass. Over 200 concrete piles driven 30 meters into bedrock."
                },
                {
                  image: constructionSteel,
                  phase: "Phase Two",
                  title: "Composite Structure",
                  year: "2007-2009",
                  description: "Perimeter columns with embedded W360 steel sections to Level 29. Self-climbing formwork technology accelerated vertical construction of the concrete core."
                },
                {
                  image: constructionFacade,
                  phase: "Phase Three",
                  title: "Digital Fabrication",
                  year: "2009-2011",
                  description: "24,000m² of custom-cut limestone panels installed using fiberglass formwork moulds fabricated directly from 3D digital models."
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-sm">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs text-white/70 uppercase tracking-wider">{item.phase}</span>
                      <p className="text-white font-light">{item.year}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-light mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Gallery */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={galleryReveal.ref}
              initial="hidden"
              animate={galleryReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
                From Vision to Reality
              </h2>
              <p className="text-grey-400 max-w-2xl mx-auto">
                A visual chronicle of the tower's journey from concept to completion
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="row-span-2"
              >
                <img 
                  src={towerSunset} 
                  alt="Al Hamra Tower at sunset"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={towerBw1} 
                  alt="Al Hamra Tower detail"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={towerBwAngle} 
                  alt="Al Hamra Tower angle view"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-center mb-6">
              Journey to Completion
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Seven years of meticulous planning, engineering innovation, and unwavering commitment 
              brought Kuwait's most ambitious architectural project to life.
            </p>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-silk-gold/20 md:transform md:-translate-x-1/2" />
              
              <div className="space-y-16">
                {milestones.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative grid md:grid-cols-2 gap-8 ${
                      index % 2 === 0 ? '' : 'md:text-right'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-silk-gold rounded-full transform -translate-x-1/2 md:-translate-x-1/2" />
                    
                    <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:order-2 md:pl-16 md:text-left'}`}>
                      <span className="text-3xl font-light text-silk-gold">{item.year}</span>
                      <h3 className="text-xl font-light mt-2 mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.event}</p>
                      <p className="text-sm text-muted-foreground/70 mt-2 italic">{item.detail}</p>
                    </div>
                    <div className={index % 2 === 0 ? 'md:order-2' : ''} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Statement */}
        <section className="py-32 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl font-light tracking-wide mb-8">
                A Legacy Cast in Stone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Today, Al Hamra Tower stands as more than Kuwait's tallest building—it is a 
                monument to human ambition, cultural pride, and the relentless pursuit of excellence. 
                Its origins remind us that the greatest achievements begin with a single vision.
              </p>
              <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
                <span>412 meters</span>
                <span className="w-px h-4 bg-silk-gold/30" />
                <span>74 stories</span>
                <span className="w-px h-4 bg-silk-gold/30" />
                <span>7 years</span>
                <span className="w-px h-4 bg-silk-gold/30" />
                <span>1 vision</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Origins;