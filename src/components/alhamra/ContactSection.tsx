import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Phone, Mail, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import towerImage from "@/assets/tower-entrance-night.jpg";

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: formRef, isInView: formInView } = useScrollReveal();
  const { ref: mapRef, isInView: mapInView } = useScrollReveal();

  const contactDetails = [
    {
      icon: MapPin,
      label: t("contact.address") || "Address",
      lines: ["Al Hamra Tower", "Sharq, Kuwait City", "Kuwait"]
    },
    {
      icon: Phone,
      label: t("contact.phone") || "Phone",
      lines: ["+965 2227 0000"]
    },
    {
      icon: Mail,
      label: t("contact.email.label") || "Email",
      lines: ["info@alhamratower.com"]
    },
    {
      icon: Clock,
      label: t("contact.hours") || "Business Hours",
      lines: ["Sunday – Thursday", "8:00 AM – 6:00 PM"]
    }
  ];

  return (
    <section id="contact" className="bg-background relative">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img 
          src={towerImage} 
          alt="Al Hamra Tower Entrance" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-fluid">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-foreground/60" />
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/60-light">07</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white">
                {t("contact.title")}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid">
        <motion.p 
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="text-base text-muted-foreground mb-20 max-w-2xl"
        >
          {t("contact.intro")}
        </motion.p>

        <div ref={formRef} className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Contact Form - 3 columns */}
          <motion.form 
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={revealVariants.slideLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 space-y-10"
          >
            <div className="grid md:grid-cols-2 gap-10">
              {/* Name */}
              <div className="group">
                <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border transition-colors duration-300"
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
                  className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border transition-colors duration-300"
                  placeholder={t("contact.email.placeholder") || "your@email.com"}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="group">
              <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {t("contact.subject")}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border transition-colors duration-300"
                placeholder={t("contact.subject.placeholder") || "Subject of inquiry"}
              />
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {t("contact.message")}
              </label>
              <textarea
                rows={5}
                className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border transition-colors duration-300 resize-none"
                placeholder={t("contact.message.placeholder") || "Your message"}
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="group flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] hover:bg-primary/90 transition-all duration-300"
            >
              <span>{t("contact.submit")}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>

          {/* Contact Info - 2 columns */}
          <motion.div 
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={revealVariants.slideRight}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group p-6 bg-white/60 backdrop-blur bg-background/80 hover:border-border transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-border rounded-xl group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300">
                    <detail.icon size={18} className="text-muted-foreground group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2">
                      {detail.label}
                    </h3>
                    {detail.lines.map((line, i) => (
                      <p key={i} className="text-foreground">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <motion.div 
        ref={mapRef}
        initial="hidden"
        animate={mapInView ? "visible" : "hidden"}
        variants={revealVariants.fadeUp}
        transition={{ duration: 0.8 }}
        className="relative h-[50vh] min-h-[400px] bg-muted"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.8!2d47.9697!3d29.3797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf84ffc0000001%3A0x5e5e5e5e5e5e5e5e!2sAl%20Hamra%20Tower!5e0!3m2!1sen!2skw!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Al Hamra Tower Location"
          className="grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-12 md:bottom-12">
          <div className="bg-white/60 backdrop-blur bg-background/90 p-6 md:p-8 max-w-sm">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t("contact.visit") || "Visit Us"}
            </h3>
            <p className="text-foreground mb-4">
              Al Hamra Tower<br />
              Sharq, Kuwait City
            </p>
            <a 
              href="https://maps.google.com/?q=Al+Hamra+Tower+Kuwait"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>{t("contact.directions") || "Get Directions"}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
