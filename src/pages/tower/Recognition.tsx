import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";
import towerNight from "@/assets/tower-night-illuminated.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";

const Recognition = () => {
  const heroReveal = useScrollReveal();

  const awards = [
    {
      year: "2012",
      title: "Best Tall Building Middle East & Africa",
      organization: "Council on Tall Buildings and Urban Habitat (CTBUH)",
      icon: Trophy
    },
    {
      year: "2014",
      title: "Outstanding Structure Award",
      organization: "International Association for Bridge and Structural Engineering",
      icon: Award
    },
    {
      year: "2015",
      title: "Excellence in Engineering",
      organization: "American Society of Civil Engineers",
      icon: Star
    },
    {
      year: "2016",
      title: "Sustainable Design Recognition",
      organization: "Middle East Architecture Awards",
      icon: Award
    },
    {
      year: "2019",
      title: "Decade of Excellence",
      organization: "Gulf Construction Awards",
      icon: Trophy
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={towerNight} 
            alt="Al Hamra Tower Recognition" 
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
              Recognition
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Honored by the world's leading architectural institutions
            </p>
          </motion.div>
        </section>

        {/* Awards Timeline */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-16">
                Awards & Honors
              </h2>
              <div className="space-y-8">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 items-start p-6 border border-border bg-background hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-muted flex items-center justify-center">
                      <award.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-muted-foreground">{award.year}</span>
                      </div>
                      <h3 className="text-lg font-light mb-1">{award.title}</h3>
                      <p className="text-sm text-muted-foreground">{award.organization}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recognition Quote */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                "Al Hamra Tower represents a remarkable achievement in sustainable high-rise design, 
                seamlessly integrating form, function, and environmental responsibility."
              </blockquote>
              <cite className="text-muted-foreground">
                — Council on Tall Buildings and Urban Habitat
              </cite>
            </motion.div>
          </div>
        </section>

        {/* Global Standing */}
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
                  src={towerTopClouds} 
                  alt="Tower Among Clouds" 
                  className="w-full h-auto"
                />
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-3xl font-light tracking-wide">
                  Global Standing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al Hamra Tower stands among the world's most distinguished skyscrapers, 
                  recognized not only for its height but for its innovative approach to 
                  sustainable design in extreme climates.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <p className="text-4xl font-light">23rd</p>
                    <p className="text-sm text-muted-foreground">Tallest in the World (at completion)</p>
                  </div>
                  <div>
                    <p className="text-4xl font-light">#1</p>
                    <p className="text-sm text-muted-foreground">Tallest Sculpted Tower</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Recognition;
