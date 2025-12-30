import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import lobbyInterior from "@/assets/interior-lobby.jpg";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    t("services.concierge"),
    t("services.dining"),
    t("services.conference"),
    t("services.wellness"),
    t("services.valet"),
  ];

  return (
    <section id="services" className="py-section bg-secondary relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">04</span>
        </div>

        {/* Section Title */}
        <h2 className="text-headline font-light tracking-wide text-foreground mb-20">
          {t("services.title")}
        </h2>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Column */}
          <div className="order-2 lg:order-1 space-y-12">
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {t("services.intro")}
            </p>

            {/* Service List */}
            <ul className="space-y-0">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="group flex items-center gap-4 py-5 border-b border-border last:border-0 transition-all duration-300 hover:pl-2"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Check size={16} className="text-grey-medium transition-colors duration-300 group-hover:text-foreground" />
                  </div>
                  <span className="text-foreground transition-colors duration-300 group-hover:text-foreground">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative group">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={lobbyInterior}
                alt="Grand lobby interior"
                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-border -z-10" />
            <div className="absolute top-1/2 -right-3 w-6 h-px bg-muted-foreground hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
