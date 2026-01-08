import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-display font-light tracking-wide text-foreground animate-fade-up">
          {t("hero.headline")}
        </h1>
        <p className="mt-6 text-body-lg text-muted-foreground font-light tracking-wide animate-fade-up-delayed">
          {t("hero.subline")}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-delayed-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("hero.scroll") || "Scroll"}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-line-grow origin-top" />
        <ChevronDown size={16} className="text-muted-foreground animate-bounce" style={{ animationDuration: "2s" }} />
      </div>

      {/* Architectural Grid Overlay (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] architectural-grid" />
    </section>
  );
};

export default HeroSection;
