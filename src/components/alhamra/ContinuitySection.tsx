import { useLanguage } from "@/contexts/LanguageContext";

const ContinuitySection = () => {
  const { t } = useLanguage();

  const timeline = [
    { year: "2005", label: t("continuity.groundbreaking") || "Ground Breaking" },
    { year: "2011", label: t("continuity.completion") || "Completion" },
    { year: "2024", label: t("continuity.present") || "Present Day" },
  ];

  return (
    <section id="continuity" className="py-section bg-background relative texture-noise overflow-hidden">
      {/* Large decorative number */}
      <div className="absolute top-0 right-0 text-[20rem] lg:text-[30rem] font-light text-muted/30 leading-none select-none pointer-events-none -translate-y-20 translate-x-20">
        ∞
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">05</span>
        </div>

        {/* Section Title */}
        <h2 className="text-headline font-light tracking-wide text-foreground mb-20">
          {t("continuity.title")}
        </h2>

        {/* Stacked Text Blocks */}
        <div className="max-w-3xl space-y-12">
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            {t("continuity.p1")}
          </p>

          <p className="text-body-lg text-muted-foreground leading-relaxed">
            {t("continuity.p2")}
          </p>

          {/* Quote Block */}
          <blockquote className="relative py-8 my-16">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground" />
            <p className="text-title font-light text-foreground pl-8 lg:pl-12">
              {t("continuity.quote")}
            </p>
          </blockquote>
        </div>

        {/* Timeline */}
        <div className="mt-32 pt-16 border-t border-border">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-border hidden md:block" />

            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative text-center md:text-left">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute top-4 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-4 h-4 items-center justify-center">
                    <div className="w-3 h-3 bg-background border-2 border-foreground" />
                  </div>

                  <div className="md:pt-12">
                    <p className="text-4xl lg:text-5xl font-light text-foreground mb-2 tracking-tight">
                      {item.year}
                    </p>
                    <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContinuitySection;
