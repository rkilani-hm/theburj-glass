import { Building2, Users, Server, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import officeInterior from "@/assets/interior-office.jpg";

const BusinessSection = () => {
  const { t } = useLanguage();

  const items = [
    {
      icon: Building2,
      title: t("business.offices"),
      description: t("business.offices.desc"),
    },
    {
      icon: Users,
      title: t("business.environment"),
      description: t("business.environment.desc"),
    },
    {
      icon: Server,
      title: t("business.infrastructure"),
      description: t("business.infrastructure.desc"),
    },
    {
      icon: Headphones,
      title: t("business.support"),
      description: t("business.support.desc"),
    },
  ];

  return (
    <section id="business" className="py-section bg-background relative texture-noise">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">03</span>
        </div>

        {/* Section Title */}
        <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
          {t("business.title")}
        </h2>

        <p className="text-body-lg text-muted-foreground max-w-2xl mb-20">
          {t("business.intro") || "Infrastructure designed for enterprise excellence. Every system engineered with purpose."}
        </p>

        {/* Layout: Image + Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Featured Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative group">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={officeInterior}
                    alt="Executive office space"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {t("business.caption") || "Premium Workspace"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {items.map((item, index) => (
                <div key={index} className="group">
                  {/* Number & Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-xs text-grey-medium font-mono mt-1">0{index + 1}</span>
                    <div className="w-12 h-12 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-muted group-hover:border-muted-foreground">
                      <item.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Underline accent */}
                  <div className="mt-6 w-12 h-px bg-border transition-all duration-500 group-hover:w-24 group-hover:bg-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
