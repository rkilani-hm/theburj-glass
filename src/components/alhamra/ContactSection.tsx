import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-section bg-background relative texture-noise">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">07</span>
        </div>

        {/* Section Title */}
        <h2 className="text-headline font-light tracking-wide text-foreground mb-8">
          {t("contact.title")}
        </h2>

        <p className="text-body-lg text-muted-foreground mb-20 max-w-xl">
          {t("contact.intro")}
        </p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <form className="space-y-10">
            {/* Name */}
            <div className="group">
              <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {t("contact.name")}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-grey-soft focus:outline-none focus:border-foreground transition-colors duration-300"
                placeholder={t("contact.name.placeholder") || "Your name"}
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {t("contact.email")}
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-grey-soft focus:outline-none focus:border-foreground transition-colors duration-300"
                placeholder={t("contact.email.placeholder") || "your@email.com"}
              />
            </div>

            {/* Subject */}
            <div className="group">
              <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {t("contact.subject")}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-grey-soft focus:outline-none focus:border-foreground transition-colors duration-300"
                placeholder={t("contact.subject.placeholder") || "Subject of inquiry"}
              />
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {t("contact.message")}
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-grey-soft focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                placeholder={t("contact.message.placeholder") || "Your message"}
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="group flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] hover:bg-charcoal-light transition-all duration-300"
            >
              <span>{t("contact.submit")}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Contact Info */}
          <div className="lg:pt-16">
            <div className="space-y-10">
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {t("contact.address") || "Address"}
                </h3>
                <p className="text-foreground">
                  Al Hamra Tower<br />
                  Sharq, Kuwait City<br />
                  Kuwait
                </p>
              </div>

              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {t("contact.phone") || "Phone"}
                </h3>
                <p className="text-foreground">+965 2227 0000</p>
              </div>

              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {t("contact.hours") || "Business Hours"}
                </h3>
                <p className="text-foreground">
                  Sunday – Thursday<br />
                  8:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
