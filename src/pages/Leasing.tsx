import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Ruler, Users, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Leasing = () => {
  const { t } = useLanguage();

  const floorPlans = [
    {
      type: t("leasing.type.executive"),
      size: "250 - 500",
      unit: t("leasing.sqm"),
      features: [t("leasing.feature.corner"), t("leasing.feature.view"), t("leasing.feature.private")],
      available: 3,
    },
    {
      type: t("leasing.type.full"),
      size: "1,200 - 1,800",
      unit: t("leasing.sqm"),
      features: [t("leasing.feature.floor"), t("leasing.feature.elevator"), t("leasing.feature.reception")],
      available: 2,
    },
    {
      type: t("leasing.type.corporate"),
      size: "3,000+",
      unit: t("leasing.sqm"),
      features: [t("leasing.feature.multi"), t("leasing.feature.branding"), t("leasing.feature.dedicated")],
      available: 1,
    },
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
        <section className="py-24 lg:py-32 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
                {t("leasing.subtitle")}
              </span>
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-8">
                {t("leasing.title")}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("leasing.intro")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Floor Plans */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
              {t("leasing.plans.title")}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {floorPlans.map((plan, index) => (
                <motion.div
                  key={plan.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group border border-border p-8 hover:border-foreground transition-colors duration-500"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-light mb-2">{plan.type}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-light">{plan.size}</span>
                      <span className="text-sm text-muted-foreground">{plan.unit}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-1 h-1 bg-foreground rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {plan.available} {t("leasing.available")}
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-24 lg:py-32 bg-charcoal-900 text-white">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
              {t("leasing.amenities.title")}
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={amenity.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <amenity.icon className="w-10 h-10 mb-4 opacity-80" />
                  <span className="text-sm tracking-wide">{amenity.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">
              {t("leasing.cta.title")}
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              {t("leasing.cta.desc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors duration-300"
            >
              {t("leasing.cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leasing;
