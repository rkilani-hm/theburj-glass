import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, Key, Star, Sparkles, Building2, Ruler, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import towerAerial from "@/assets/tower-aerial.png";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerAerialBalcony from "@/assets/tower-aerial-balcony.jpg";

const LeasingOpportunities = () => {
  const { t } = useLanguage();

  const floorPlans = [
    {
      type: t("leasing.type.executive"),
      size: "250 - 500",
      unit: t("leasing.sqm"),
      features: [t("leasing.feature.corner"), t("leasing.feature.view"), t("leasing.feature.private")],
    },
    {
      type: t("leasing.type.full"),
      size: "1,200 - 1,800",
      unit: t("leasing.sqm"),
      features: [t("leasing.feature.floor"), t("leasing.feature.elevator"), t("leasing.feature.reception")],
    },
    {
      type: t("leasing.type.corporate"),
      size: "3,000+",
      unit: t("leasing.sqm"),
      features: [t("leasing.feature.multi"), t("leasing.feature.branding"), t("leasing.feature.dedicated")],
    },
  ];

  const highlights = [
    { icon: Eye, title: t("leasing.highlight1.title") || "Panoramic Views", desc: t("leasing.highlight1.desc") || "360-degree views of Kuwait City and the Arabian Gulf from upper floors" },
    { icon: Key, title: t("leasing.highlight2.title") || "Flexible Layouts", desc: t("leasing.highlight2.desc") || "Customizable floor plans to match your operational requirements" },
    { icon: Star, title: t("leasing.highlight3.title") || "Premium Finishes", desc: t("leasing.highlight3.desc") || "High-end materials and finishes throughout common areas" },
    { icon: Sparkles, title: t("leasing.highlight4.title") || "Smart Building", desc: t("leasing.highlight4.desc") || "Integrated building management systems for efficiency" },
  ];

  const amenities = [
    { icon: Building2, label: t("leasing.amenity.lobby") },
    { icon: Ruler, label: t("leasing.amenity.ceiling") },
    { icon: Users, label: t("leasing.amenity.conference") },
    { icon: Calendar, label: t("leasing.amenity.flexible") },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={towerAerial} alt="Al Hamra Tower aerial view" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/70" />
          </div>
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-silk-gold/40" />
                  <span className="text-xs uppercase tracking-[0.3em] text-champagne">06</span>
                </div>
                <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 block">{t("leasing.subtitle")}</span>
                <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-8">{t("leasing.title")}</h1>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">{t("leasing.intro")}</p>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {t("leasing.intro2") || "Whether you're seeking an executive suite for a growing team or full-floor headquarters for an established enterprise, Al Hamra Tower offers configurations to match your ambition."}
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={skylineParkPanorama} alt="Kuwait City panorama" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-20 bg-background texture-noise">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl lg:text-3xl font-light tracking-tight mb-12">
              {t("leasing.highlights.title") || "Why Al Hamra Tower"}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div className="w-14 h-14 border border-silk-gold/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-silk-gold/10 group-hover:border-silk-gold/40">
                    <highlight.icon size={24} className="text-muted-foreground transition-colors duration-300 group-hover:text-silk-gold" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Space Configurations */}
        <section className="py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20 max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-silk-gold/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-champagne">{t("leasing.configurations") || "Configurations"}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">{t("leasing.plans.title")}</h2>
              <p className="text-body-lg text-muted-foreground leading-relaxed">{t("leasing.plans.desc") || "Flexible configurations designed to accommodate businesses of every scale, from boutique operations to multinational headquarters."}</p>
            </motion.div>
            
            <div className="space-y-0">
              {floorPlans.map((plan, index) => (
                <motion.div key={plan.type} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group border-t border-silk-gold/15 py-12 first:border-t-0">
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-1"><span className="text-xs text-muted-foreground tracking-wider">0{index + 1}</span></div>
                    <div className="lg:col-span-4">
                      <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-3 group-hover:text-foreground/80 transition-colors duration-300">{plan.type}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-muted-foreground">{plan.size}</span>
                        <span className="text-sm text-muted-foreground/70">{plan.unit}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {plan.features.map((feature, i) => (
                          <span key={i} className="text-sm text-muted-foreground relative before:content-[''] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-muted-foreground/50 before:rounded-full first:before:hidden">{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 pt-12 border-t border-silk-gold/15">
              <p className="text-sm text-muted-foreground max-w-2xl">{t("leasing.inquiry.note") || "All configurations are subject to availability and can be customized to meet specific operational requirements. Contact our leasing team for detailed floor plans and specifications."}</p>
            </motion.div>
          </div>
        </section>

        {/* Interior Showcase */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-light tracking-tight">{t("leasing.interior.title") || "Designed for Excellence"}</h2>
                <p className="text-body-lg text-muted-foreground leading-relaxed">{t("leasing.interior.p1") || "Every office space in Al Hamra Tower is designed with the modern enterprise in mind. Floor-to-ceiling windows flood interiors with natural light while offering unobstructed views of the city and Gulf."}</p>
                <p className="text-body text-muted-foreground leading-relaxed">{t("leasing.interior.p2") || "3.2-meter ceiling heights create an atmosphere of openness and possibility, while premium finishes and materials reflect the tower's commitment to quality at every level."}</p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <p className="text-3xl font-light text-silk-gold">3.2m</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("leasing.ceiling") || "Ceiling Height"}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-silk-gold">360°</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("leasing.views") || "Panoramic Views"}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] overflow-hidden group">
                  <img src={cityViewInterior} alt="Premium office with city views" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="aspect-[3/4] overflow-hidden group mt-8">
                  <img src={interiorLobby} alt="Executive lobby" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-24 lg:py-32 bg-foreground text-background">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">{t("leasing.amenities.title")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {amenities.map((amenity, index) => (
                <motion.div key={amenity.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex flex-col items-center text-center">
                  <amenity.icon className="w-10 h-10 mb-4 opacity-80" />
                  <span className="text-sm tracking-wide">{amenity.label}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="aspect-[21/9] overflow-hidden">
              <img src={towerAerialBalcony} alt="Al Hamra Tower aerial view" className="w-full h-full object-cover opacity-80" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeasingOpportunities;
