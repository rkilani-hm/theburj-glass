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
  "hero.headline2": { en: "A Mark of Presence", ar: "علامة الحضور" },
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

  // Tower Page
  "tower.intro": { en: "Al Hamra Tower is more than Kuwait's tallest building—it is a statement of architectural ambition that has reshaped the nation's skyline and redefined what is possible in modern construction.", ar: "برج الحمراء أكثر من مجرد أطول مبنى في الكويت — إنه بيان طموح معماري أعاد تشكيل أفق الأمة وأعاد تعريف ما هو ممكن في البناء الحديث." },
  "tower.quote": { en: "A monument to permanence in a world of change.", ar: "نصب تذكاري للديمومة في عالم متغير." },
  "tower.architectural.height": { en: "Architectural Height", ar: "الارتفاع المعماري" },
  "tower.architecture.label": { en: "Architecture", ar: "الهندسة المعمارية" },
  "tower.architecture.title": { en: "Engineering Excellence", ar: "التميز الهندسي" },
  "tower.architecture.desc": { en: "The tower's distinctive form emerged from a synthesis of engineering innovation and environmental response, creating a structure that is both functionally superior and aesthetically striking.", ar: "نشأ الشكل المميز للبرج من تركيب الابتكار الهندسي والاستجابة البيئية، مما خلق هيكلاً متفوقاً وظيفياً ومذهلاً جمالياً." },
  "tower.feature1.title": { en: "Sculptural Twist", ar: "اللفة النحتية" },
  "tower.feature1.desc": { en: "The tower rotates 60 degrees from base to crown, creating a dynamic silhouette that changes from every vantage point across the city.", ar: "يدور البرج ٦٠ درجة من القاعدة إلى التاج، مما يخلق صورة ظلية ديناميكية تتغير من كل نقطة مراقبة عبر المدينة." },
  "tower.feature2.title": { en: "Solar Optimization", ar: "التحسين الشمسي" },
  "tower.feature2.desc": { en: "The carved form naturally shields interior spaces from direct sunlight while maximizing natural light penetration throughout the day.", ar: "يحمي الشكل المنحوت المساحات الداخلية بشكل طبيعي من أشعة الشمس المباشرة مع تعظيم اختراق الضوء الطبيعي طوال اليوم." },
  "tower.feature3.title": { en: "Structural Innovation", ar: "الابتكار الهيكلي" },
  "tower.feature3.desc": { en: "A reinforced concrete core and steel frame work in harmony to support the complex geometry while resisting wind loads at extreme heights.", ar: "يعمل قلب من الخرسانة المسلحة وإطار فولاذي في انسجام لدعم الهندسة المعقدة مع مقاومة أحمال الرياح على ارتفاعات شاهقة." },
  "tower.feature4.title": { en: "Facade System", ar: "نظام الواجهة" },
  "tower.feature4.desc": { en: "High-performance glazing with integrated solar control creates comfortable interiors while presenting a crystalline exterior that reflects Kuwait's ever-changing sky.", ar: "يخلق الزجاج عالي الأداء مع التحكم الشمسي المدمج تصميمات داخلية مريحة مع تقديم خارج بلوري يعكس سماء الكويت المتغيرة باستمرار." },
  "tower.interior.label": { en: "Interior Spaces", ar: "المساحات الداخلية" },
  "tower.interior.title": { en: "Where Light Meets Function", ar: "حيث يلتقي الضوء بالوظيفة" },
  "tower.interior.p1": { en: "The interior spaces of Al Hamra Tower were conceived as environments where natural light, clean lines, and premium materials create an atmosphere of focused productivity.", ar: "صُممت المساحات الداخلية لبرج الحمراء كبيئات حيث يخلق الضوء الطبيعي والخطوط النظيفة والمواد الفاخرة جواً من الإنتاجية المركزة." },
  "tower.interior.p2": { en: "From the grand lobby to the uppermost executive floors, every space reflects the tower's commitment to understated excellence and timeless design.", ar: "من الردهة الكبرى إلى الطوابق التنفيذية العليا، تعكس كل مساحة التزام البرج بالتميز المتواضع والتصميم الخالد." },
  "tower.ceiling": { en: "Ceiling Height", ar: "ارتفاع السقف" },
  "tower.views": { en: "Panoramic Views", ar: "إطلالات بانورامية" },
  "tower.details.label": { en: "Details", ar: "التفاصيل" },
  "tower.details.title": { en: "Precision in Every Element", ar: "الدقة في كل عنصر" },
  "tower.details.img1": { en: "Crown & Sky", ar: "التاج والسماء" },
  "tower.details.img2": { en: "Facade Geometry", ar: "هندسة الواجهة" },
  "tower.facts.title": { en: "Tower at a Glance", ar: "البرج بنظرة سريعة" },
  "tower.fact1.label": { en: "Floors", ar: "طابق" },
  "tower.fact1.desc": { en: "Of premium office and commercial space", ar: "من المساحات المكتبية والتجارية المتميزة" },
  "tower.fact2.label": { en: "Square Meters", ar: "متر مربع" },
  "tower.fact2.desc": { en: "Total leasable floor area", ar: "إجمالي المساحة القابلة للتأجير" },
  "tower.fact3.label": { en: "Rotation", ar: "الدوران" },
  "tower.fact3.desc": { en: "Twist from base to crown", ar: "لفة من القاعدة إلى التاج" },
  "tower.fact4.label": { en: "Completed", ar: "الإنجاز" },
  "tower.fact4.desc": { en: "Redefining Kuwait's skyline", ar: "إعادة تعريف أفق الكويت" },
  "tower.aerial.label": { en: "Aerial Views", ar: "المناظر الجوية" },
  "tower.aerial.title": { en: "Commanding the Skyline", ar: "السيطرة على الأفق" },
  "tower.aerial.desc": { en: "From above, the tower's sculptural form reveals its true relationship with Kuwait City—a vertical landmark that organizes the urban landscape around its singular presence.", ar: "من الأعلى، يكشف الشكل النحتي للبرج عن علاقته الحقيقية بمدينة الكويت — معلم عمودي ينظم المشهد الحضري حول حضوره الفريد." },
  "tower.aerial.img1": { en: "Urban Dominance", ar: "الهيمنة الحضرية" },
  "tower.aerial.img2": { en: "Gulf Perspective", ar: "منظور الخليج" },
  "tower.facade.label": { en: "Sculptural Detail", ar: "التفاصيل النحتية" },
  "tower.facade.title": { en: "Where Stone Meets Sky", ar: "حيث يلتقي الحجر بالسماء" },
  "tower.entrance.label": { en: "Arrival Experience", ar: "تجربة الوصول" },
  "tower.entrance.title": { en: "The Grand Entrance", ar: "المدخل الكبير" },
  "tower.entrance.p1": { en: "The arrival experience at Al Hamra Tower sets the tone for everything that follows. The cascading fountain, dramatic illumination, and soaring diagrid structure create a threshold between the everyday and the exceptional.", ar: "تجربة الوصول إلى برج الحمراء تحدد نغمة كل ما يلي. النافورة المتتالية والإضاءة الدرامية وهيكل الشبكة المتصاعد تخلق عتبة بين اليومي والاستثنائي." },
  "tower.entrance.p2": { en: "The podium's glass diagrid facade, inspired by traditional Kuwaiti mashrabiya, filters light while creating visual interest at human scale before the tower ascends.", ar: "واجهة الشبكة الزجاجية للمنصة، المستوحاة من المشربية الكويتية التقليدية، تصفي الضوء مع خلق اهتمام بصري على مقياس بشري قبل صعود البرج." },
  "tower.night.title": { en: "Illuminated Presence", ar: "الحضور المُضاء" },
  "tower.night.desc": { en: "After sunset, Al Hamra Tower transforms into a beacon across the Kuwait skyline—its illuminated crown visible from across the Gulf, marking the city's center with quiet authority.", ar: "بعد غروب الشمس، يتحول برج الحمراء إلى منارة عبر أفق الكويت — تاجه المُضاء مرئي من عبر الخليج، يحدد مركز المدينة بسلطة هادئة." },
  "tower.gallery.label": { en: "Photography", ar: "التصوير" },
  "tower.gallery.title": { en: "Perspectives on Presence", ar: "منظورات على الحضور" },
  "tower.gallery.desc": { en: "A curated collection of aerial perspectives capturing Al Hamra Tower's commanding presence within Kuwait City's urban fabric and against the Arabian Gulf horizon.", ar: "مجموعة منتقاة من المنظورات الجوية تلتقط الحضور المهيمن لبرج الحمراء ضمن النسيج الحضري لمدينة الكويت وأمام أفق الخليج العربي." },
  "tower.gallery.img1": { en: "Balcony Perspective", ar: "منظور الشرفة" },
  "tower.gallery.img2": { en: "Two Landmarks", ar: "معلمان" },
  "tower.gallery.img3": { en: "Harbor Gateway", ar: "بوابة الميناء" },
  "tower.gallery.img4": { en: "Northern Axis", ar: "المحور الشمالي" },
  "tower.gallery.img5": { en: "Gulf Horizon", ar: "أفق الخليج" },
  "tower.gallery.img6": { en: "Urban Context", ar: "السياق الحضري" },

  // Perspective
  "perspective.title": { en: "Above the City", ar: "فوق المدينة" },
  "perspective.intro": { en: "From 412 meters, the world transforms. The urban grid becomes geometry, the horizon extends beyond imagination, and the relationship between earth and sky reveals itself in ways only height can offer.", ar: "من ٤١٢ متراً، يتحول العالم. تصبح الشبكة الحضرية هندسة، يمتد الأفق إلى ما وراء الخيال، وتكشف العلاقة بين الأرض والسماء عن نفسها بطرق لا يقدمها سوى الارتفاع." },
  "perspective.caption": {
    en: "Height here is not display, but perspective.",
    ar: "الارتفاع هنا ليس استعراضاً، بل منظوراً."
  },
  "perspective.vision.label": { en: "Vision", ar: "الرؤية" },
  "perspective.vision.title": { en: "Designed to See Further", ar: "صُمم ليرى أبعد" },
  "perspective.vision.p1": { en: "Al Hamra Tower was conceived with perspective as its guiding principle. The distinctive twisting form isn't merely aesthetic—it was engineered to maximize panoramic views from every floor, every office, every corner.", ar: "صُمم برج الحمراء بالمنظور كمبدأ توجيهي. الشكل الملتوي المميز ليس مجرد جمالية — إنه مُهندَس لتعظيم المناظر البانورامية من كل طابق، كل مكتب، كل زاوية." },
  "perspective.vision.p2": { en: "The result is a building where natural light floods interior spaces, where the Gulf waters meet the desert horizon in an unbroken line of sight, and where occupants feel connected to the city below while rising above it.", ar: "النتيجة مبنى حيث يغمر الضوء الطبيعي المساحات الداخلية، حيث تلتقي مياه الخليج بأفق الصحراء في خط رؤية متصل، وحيث يشعر الشاغلون بالارتباط بالمدينة أدناه بينما يرتفعون فوقها." },
  "perspective.timeofday.title": { en: "Light Through the Day", ar: "الضوء عبر اليوم" },
  "perspective.timeofday.desc": { en: "The tower's relationship with light transforms throughout the day, offering ever-changing perspectives on Kuwait's skyline.", ar: "تتحول علاقة البرج بالضوء طوال اليوم، مقدمة منظورات متغيرة باستمرار على أفق الكويت." },
  "perspective.view1": { en: "Dawn", ar: "الفجر" },
  "perspective.view2": { en: "Noon", ar: "الظهر" },
  "perspective.view3": { en: "Dusk", ar: "الغسق" },
  "perspective.gallery.label": { en: "Gallery", ar: "المعرض" },
  "perspective.gallery.title": { en: "Visual Studies", ar: "دراسات بصرية" },
  "perspective.gallery.img1": { en: "Ascending Through Clouds", ar: "صعوداً عبر الغيوم" },
  "perspective.gallery.img2": { en: "Crown Detail", ar: "تفاصيل التاج" },
  "perspective.gallery.img3": { en: "Waterfront Reflection", ar: "انعكاس الواجهة البحرية" },
  "perspective.gallery.img4": { en: "Nocturnal Presence", ar: "الحضور الليلي" },
  "perspective.gallery.img5": { en: "Urban Context", ar: "السياق الحضري" },
  "perspective.horizon.title": { en: "Where Sky Meets Sea", ar: "حيث تلتقي السماء بالبحر" },
  "perspective.horizon.p1": { en: "From the upper floors, the Arabian Gulf stretches to the eastern horizon while the city extends in every direction below. This dual perspective—water and urban landscape—defines the unique experience of occupying Al Hamra Tower.", ar: "من الطوابق العليا، يمتد الخليج العربي إلى الأفق الشرقي بينما تمتد المدينة في كل اتجاه أدناه. هذا المنظور المزدوج — الماء والمشهد الحضري — يحدد التجربة الفريدة لشغل برج الحمراء." },
  "perspective.horizon.p2": { en: "On clear days, the view extends over 80 kilometers, offering a perspective that transforms how one understands Kuwait's geography and position at the crossroads of land and sea.", ar: "في الأيام الصافية، يمتد المنظر لأكثر من ٨٠ كيلومتراً، مقدماً منظوراً يغير كيفية فهم جغرافية الكويت وموقعها عند مفترق طرق البر والبحر." },
  "perspective.horizon.stat.label": { en: "Visibility Range", ar: "مدى الرؤية" },
  "perspective.horizon.stat.value": { en: "80+ km", ar: "+٨٠ كم" },

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

  // Awards
  "awards.label": { en: "Recognition", ar: "التكريم" },
  "awards.title": { en: "Architectural Distinction", ar: "التميز المعماري" },
  "awards.desc": { en: "Al Hamra Tower has been recognized globally for its innovative design, engineering excellence, and contribution to architectural discourse.", ar: "حظي برج الحمراء بتقدير عالمي لتصميمه المبتكر وتميزه الهندسي ومساهمته في الخطاب المعماري." },
  "awards.award1.title": { en: "Best Tall Building Middle East & Africa", ar: "أفضل مبنى شاهق في الشرق الأوسط وأفريقيا" },
  "awards.award1.org": { en: "Council on Tall Buildings and Urban Habitat", ar: "مجلس المباني الشاهقة والموائل الحضرية" },
  "awards.award1.category": { en: "Excellence in structural innovation and urban integration", ar: "التميز في الابتكار الهيكلي والتكامل الحضري" },
  "awards.award2.title": { en: "MIPIM Architectural Review Future Project", ar: "جائزة MIPIM للمشروع المستقبلي" },
  "awards.award2.org": { en: "MIPIM Awards", ar: "جوائز MIPIM" },
  "awards.award2.category": { en: "Recognition for visionary architectural design", ar: "تقدير للتصميم المعماري الرؤيوي" },
  "awards.award3.title": { en: "Emirates Glass LEAF Award", ar: "جائزة Emirates Glass LEAF" },
  "awards.award3.org": { en: "LEAF International", ar: "LEAF الدولية" },
  "awards.award3.category": { en: "Outstanding facade engineering and sustainability", ar: "تميز هندسة الواجهات والاستدامة" },
  "awards.award4.title": { en: "International Property Award", ar: "جائزة العقارات الدولية" },
  "awards.award4.org": { en: "International Property Awards", ar: "جوائز العقارات الدولية" },
  "awards.award4.category": { en: "Best Commercial High-Rise Architecture Arabia", ar: "أفضل عمارة تجارية شاهقة في العربية" },
  "awards.award5.title": { en: "Iconic Landmark Recognition", ar: "تقدير المعلم الأيقوني" },
  "awards.award5.org": { en: "World Architecture Festival", ar: "مهرجان العمارة العالمي" },
  "awards.award5.category": { en: "Enduring contribution to global architectural heritage", ar: "مساهمة دائمة في التراث المعماري العالمي" },

  // Capabilities
  "capabilities.label": { en: "Engineering", ar: "الهندسة" },
  "capabilities.title": { en: "Architectural Capabilities", ar: "القدرات المعمارية" },
  "capabilities.desc": { en: "Al Hamra Tower represents a convergence of advanced engineering systems, each designed to work in harmony with the tower's unique sculptural form while ensuring optimal performance, safety, and sustainability.", ar: "يمثل برج الحمراء تقاربًا لأنظمة هندسية متقدمة، صُمم كل منها للعمل بانسجام مع الشكل النحتي الفريد للبرج مع ضمان الأداء الأمثل والسلامة والاستدامة." },
  "capabilities.structural.title": { en: "Structural Core", ar: "القلب الهيكلي" },
  "capabilities.structural.desc": { en: "Reinforced concrete core with outrigger system providing exceptional lateral stability.", ar: "قلب من الخرسانة المسلحة مع نظام دعامات يوفر ثباتًا جانبيًا استثنائيًا." },
  "capabilities.structural.stat": { en: "Floors Supported", ar: "طابق مدعوم" },
  "capabilities.wind.title": { en: "Wind Engineering", ar: "هندسة الرياح" },
  "capabilities.wind.desc": { en: "Aerodynamic form tested in multiple wind tunnels to minimize vortex shedding.", ar: "شكل ديناميكي هوائي تم اختباره في أنفاق رياح متعددة لتقليل انفصال الدوامات." },
  "capabilities.wind.stat": { en: "km/h Wind Load", ar: "كم/س حمل الرياح" },
  "capabilities.seismic.title": { en: "Seismic Design", ar: "التصميم الزلزالي" },
  "capabilities.seismic.desc": { en: "Engineered to withstand regional seismic activity with advanced damping systems.", ar: "مصمم هندسيًا لتحمل النشاط الزلزالي الإقليمي مع أنظمة تخميد متقدمة." },
  "capabilities.seismic.stat": { en: "Compliance", ar: "الامتثال" },
  "capabilities.thermal.title": { en: "Thermal Performance", ar: "الأداء الحراري" },
  "capabilities.thermal.desc": { en: "High-performance glazing reduces solar heat gain while maximizing daylight.", ar: "الزجاج عالي الأداء يقلل من اكتساب الحرارة الشمسية مع تعظيم ضوء النهار." },
  "capabilities.thermal.stat": { en: "Energy Reduction", ar: "تخفيض الطاقة" },
  "capabilities.power.title": { en: "Power Systems", ar: "أنظمة الطاقة" },
  "capabilities.power.desc": { en: "Redundant electrical infrastructure ensures uninterrupted operations.", ar: "البنية التحتية الكهربائية المتكررة تضمن عمليات متواصلة." },
  "capabilities.power.stat": { en: "Redundancy", ar: "التكرارية" },
  "capabilities.facade.title": { en: "Facade System", ar: "نظام الواجهة" },
  "capabilities.facade.desc": { en: "Unitized curtain wall with integrated solar shading and thermal breaks.", ar: "جدار ستائري موحد مع تظليل شمسي متكامل وفواصل حرارية." },
  "capabilities.facade.stat": { en: "Glass Panels", ar: "لوحة زجاجية" },
  "capabilities.foundation.title": { en: "Foundation Engineering", ar: "هندسة الأساسات" },
  "capabilities.foundation.desc": { en: "Deep pile foundation system anchored to bedrock for maximum stability.", ar: "نظام أساسات عميقة مرتبط بالصخر الأساسي لأقصى ثبات." },
  "capabilities.foundation.stat": { en: "Pile Depth", ar: "عمق الركائز" },
  "capabilities.orientation.title": { en: "Solar Orientation", ar: "التوجيه الشمسي" },
  "capabilities.orientation.desc": { en: "The tower's twist optimizes solar exposure throughout the day.", ar: "لفة البرج تحسن التعرض للشمس طوال اليوم." },
  "capabilities.orientation.stat": { en: "Rotation", ar: "الدوران" },
  "capabilities.stat1.label": { en: "Concrete Volume", ar: "حجم الخرسانة" },
  "capabilities.stat2.label": { en: "Steel Reinforcement", ar: "تسليح الفولاذ" },
  "capabilities.stat2.unit": { en: "tonnes", ar: "طن" },
  "capabilities.stat3.label": { en: "Elevators", ar: "المصاعد" },
  "capabilities.stat3.unit": { en: "units", ar: "وحدة" },
  "capabilities.stat4.label": { en: "Parking Spaces", ar: "مواقف السيارات" },
  "capabilities.stat4.unit": { en: "spaces", ar: "موقف" },

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
