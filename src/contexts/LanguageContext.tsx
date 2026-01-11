import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  "nav.tower": { en: "The Tower", ar: "البرج" },
  "nav.perspective": { en: "Perspective", ar: "المنظور" },
  "nav.business": { en: "Business", ar: "الأعمال" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.legacy": { en: "Legacy", ar: "الاستمرارية" },
  "nav.leasing": { en: "Leasing", ar: "التأجير" },
  "nav.location": { en: "Location", ar: "الموقع" },
  "nav.contact": { en: "Contact", ar: "التواصل" },

  // Hero
  "hero.headline": { en: "A Place of Gravity", ar: "هيبة المكان" },
  "hero.subline": { en: "Kuwait's Architectural Landmark", ar: "معلم الكويت المعماري" },
  "hero.scroll": { en: "Scroll", ar: "مرر" },

  // Presence
  "presence.title": { en: "The Tower", ar: "البرج" },
  "presence.p1": {
    en: "Al Hamra Tower stands as Kuwait's most significant architectural achievement. A structure of absolute presence, designed to endure beyond trends and cycles.",
    ar: "يقف برج الحمراء كأهم إنجاز معماري في الكويت. هيكل ذو حضور مطلق، صُمم ليستمر بعيداً عن الصيحات والدورات."
  },
  "presence.p2": {
    en: "Rising from the heart of Kuwait City, the tower commands attention through restraint — its sculptural form speaks of permanence and purpose.",
    ar: "يرتفع من قلب مدينة الكويت، يستحوذ البرج على الانتباه من خلال ضبط النفس — شكله النحتي يتحدث عن الديمومة والهدف."
  },
  "presence.height": { en: "Height", ar: "الارتفاع" },
  "presence.year": { en: "Completed", ar: "الإنجاز" },
  "presence.location": { en: "Location", ar: "الموقع" },
  "presence.height.value": { en: "412.6m", ar: "٤١٢.٦ م" },
  "presence.year.value": { en: "2011", ar: "٢٠١١" },
  "presence.location.value": { en: "Kuwait City", ar: "مدينة الكويت" },

  // Perspective
  "perspective.title": { en: "Above the City", ar: "فوق المدينة" },
  "perspective.caption": {
    en: "Height here is not display, but perspective.",
    ar: "الارتفاع هنا ليس استعراضاً، بل منظوراً."
  },

  // Business
  "business.title": { en: "Business Function", ar: "بيئة الأعمال" },
  "business.offices": { en: "Office Spaces", ar: "المساحات المكتبية" },
  "business.offices.desc": { en: "Premium workspaces designed for clarity and focus.", ar: "مساحات عمل متميزة صُممت للوضوح والتركيز." },
  "business.environment": { en: "Business Environment", ar: "بيئة العمل" },
  "business.environment.desc": { en: "An ecosystem built for serious enterprise.", ar: "منظومة بُنيت للمؤسسات الجادة." },
  "business.infrastructure": { en: "Infrastructure", ar: "البنية التحتية" },
  "business.infrastructure.desc": { en: "Systems engineered for reliability and performance.", ar: "أنظمة مُهندسة للموثوقية والأداء." },
  "business.support": { en: "Support Services", ar: "خدمات الدعم" },
  "business.support.desc": { en: "Seamless assistance, present but never intrusive.", ar: "مساعدة سلسة، حاضرة دون تطفل." },

  // Services
  "services.title": { en: "Hospitality", ar: "الضيافة" },
  "services.intro": { en: "Five-star service, delivered with quiet confidence.", ar: "خدمة خمس نجوم، تُقدم بثقة هادئة." },
  "services.concierge": { en: "Concierge Services", ar: "خدمات الاستقبال" },
  "services.dining": { en: "Fine Dining", ar: "المطاعم الراقية" },
  "services.conference": { en: "Conference Facilities", ar: "مرافق المؤتمرات" },
  "services.wellness": { en: "Wellness & Fitness", ar: "اللياقة والعافية" },
  "services.valet": { en: "Valet & Parking", ar: "خدمة صف السيارات" },

  // Continuity
  "continuity.title": { en: "Continuity", ar: "الاستمرارية" },
  "continuity.p1": {
    en: "Al Hamra Tower was conceived as a long-term presence in Kuwait — a structure designed not for the moment, but for generations.",
    ar: "صُمم برج الحمراء ليكون حضوراً دائماً في الكويت — هيكل لم يُصمم للحظة، بل للأجيال."
  },
  "continuity.p2": {
    en: "Stability, trust, and endurance define its legacy. The tower outlasts trends and stands as testament to considered, purposeful architecture.",
    ar: "الثبات والثقة والصمود تُحدد إرثه. البرج يتجاوز الصيحات ويقف شاهداً على العمارة المدروسة والهادفة."
  },
  "continuity.quote": { en: "A structure designed to endure.", ar: "مبنى صُمم ليستمر." },

  // Location
  "location.title": { en: "Location", ar: "الموقع" },
  "location.desc": { en: "Positioned at the heart of Kuwait City, with direct access to major thoroughfares and business districts.", ar: "يقع في قلب مدينة الكويت، مع وصول مباشر إلى الطرق الرئيسية ومناطق الأعمال." },
  "location.highway": { en: "Highway Access", ar: "الوصول للطريق السريع" },
  "location.airport": { en: "Airport Proximity", ar: "القرب من المطار" },
  "location.district": { en: "Business District", ar: "منطقة الأعمال" },

  // Contact
  "contact.title": { en: "Engagement", ar: "التواصل" },
  "contact.intro": { en: "For inquiries regarding leasing and business opportunities.", ar: "للاستفسارات المتعلقة بالتأجير وفرص الأعمال." },
  "contact.name": { en: "Name", ar: "الاسم" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.subject": { en: "Subject", ar: "الموضوع" },
  "contact.message": { en: "Message", ar: "الرسالة" },
  "contact.submit": { en: "Submit Inquiry", ar: "إرسال الاستفسار" },

  // Leasing
  "leasing.subtitle": { en: "Office Leasing", ar: "تأجير المكاتب" },
  "leasing.title": { en: "Exceptional Spaces", ar: "مساحات استثنائية" },
  "leasing.intro": { en: "Premium office spaces in Kuwait's most prestigious address. From executive suites to full-floor headquarters, find the space that elevates your business.", ar: "مساحات مكتبية متميزة في العنوان الأكثر تميزاً في الكويت. من الأجنحة التنفيذية إلى المقرات الكاملة، اعثر على المساحة التي ترتقي بأعمالك." },
  "leasing.plans.title": { en: "Available Configurations", ar: "التشكيلات المتاحة" },
  "leasing.type.executive": { en: "Executive Suite", ar: "جناح تنفيذي" },
  "leasing.type.full": { en: "Full Floor", ar: "طابق كامل" },
  "leasing.type.corporate": { en: "Corporate HQ", ar: "مقر الشركة" },
  "leasing.sqm": { en: "sqm", ar: "م²" },
  "leasing.feature.corner": { en: "Corner office configuration", ar: "تكوين مكتب زاوية" },
  "leasing.feature.view": { en: "Panoramic city views", ar: "إطلالات بانورامية على المدينة" },
  "leasing.feature.private": { en: "Private meeting room", ar: "غرفة اجتماعات خاصة" },
  "leasing.feature.floor": { en: "Entire floor exclusivity", ar: "حصرية الطابق بالكامل" },
  "leasing.feature.elevator": { en: "Private elevator access", ar: "مصعد خاص" },
  "leasing.feature.reception": { en: "Dedicated reception", ar: "استقبال مخصص" },
  "leasing.feature.multi": { en: "Multiple floors available", ar: "طوابق متعددة متاحة" },
  "leasing.feature.branding": { en: "Building signage rights", ar: "حقوق اللافتات" },
  "leasing.feature.dedicated": { en: "Dedicated parking levels", ar: "مواقف مخصصة" },
  "leasing.available": { en: "units available", ar: "وحدات متاحة" },
  "leasing.amenities.title": { en: "Premium Amenities", ar: "مرافق متميزة" },
  "leasing.amenity.lobby": { en: "Grand Lobby Access", ar: "الوصول للردهة الكبرى" },
  "leasing.amenity.ceiling": { en: "3.2m Ceiling Height", ar: "ارتفاع سقف ٣.٢ م" },
  "leasing.amenity.conference": { en: "Conference Center", ar: "مركز المؤتمرات" },
  "leasing.amenity.flexible": { en: "Flexible Terms", ar: "شروط مرنة" },
  "leasing.cta.title": { en: "Schedule a Viewing", ar: "حجز معاينة" },
  "leasing.cta.desc": { en: "Experience the Al Hamra Tower difference. Our leasing team is ready to show you the possibilities.", ar: "اختبر تميز برج الحمراء. فريق التأجير لدينا مستعد لعرض الإمكانيات." },
  "leasing.cta.button": { en: "Contact Leasing", ar: "تواصل مع التأجير" },

  // Stats
  "stats.height": { en: "Height", ar: "الارتفاع" },
  "stats.height.desc": { en: "Kuwait's tallest structure, redefining the skyline", ar: "أطول هيكل في الكويت، يعيد تشكيل الأفق" },
  "stats.floors": { en: "Floors", ar: "طابق" },
  "stats.floors.desc": { en: "Premium office and commercial spaces", ar: "مساحات مكتبية وتجارية متميزة" },
  "stats.sqm": { en: "Square Meters", ar: "متر مربع" },
  "stats.sqm.desc": { en: "Of leasable premium workspace", ar: "من المساحات المتميزة القابلة للتأجير" },

  // Footer
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms of Use", ar: "شروط الاستخدام" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      <div dir={dir} className={language === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
