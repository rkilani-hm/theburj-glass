import { useLanguage } from "@/contexts/LanguageContext";
import towerDetail from "@/assets/tower-detail.jpg";

const PresenceSection = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t("presence.height"), value: t("presence.height.value") },
    { label: t("presence.year"), value: t("presence.year.value") },
    { label: t("presence.location"), value: t("presence.location.value") },
  ];

  return (
    <section id="presence" className="py-section bg-background relative texture-noise">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">01</span>
        </div>

        {/* Section Title */}
        <h2 className="text-headline font-light tracking-wide text-foreground mb-20">
          {t("presence.title")}
        </h2>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Column */}
          <div className="space-y-8 lg:pr-8">
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {t("presence.p1")}
            </p>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {t("presence.p2")}
            </p>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={towerDetail}
                alt="Al Hamra Tower architectural detail"
                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-border -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-32 pt-16 border-t border-border">
          <div className="grid grid-cols-3 gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <p className="text-3xl lg:text-5xl font-light text-foreground mb-3 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceSection;
