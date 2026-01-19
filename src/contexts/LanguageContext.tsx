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
  "nav.connect": { en: "Connect", ar: "تواصل معنا" },
  "nav.sustainability": { en: "Sustainability", ar: "الاستدامة" },

  // Hero
  "hero.headline": { en: "A Place of Gravity", ar: "هيبة المكان" },
  "hero.headline2": { en: "A Mark of Presence", ar: "علامة الحضور" },
  "hero.subline": { en: "Kuwait's Architectural Landmark", ar: "معلم الكويت المعماري" },
  "hero.subline2": { en: "Where Vision Meets the Sky", ar: "حيث تلتقي الرؤية بالسماء" },
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
  "business.intro": { en: "Infrastructure designed for enterprise excellence. Every system engineered with purpose, every service calibrated for the demands of modern business.", ar: "بنية تحتية مصممة للتميز المؤسسي. كل نظام مُهندَس بهدف، كل خدمة مُعايرة لمتطلبات الأعمال الحديثة." },
  "business.caption": { en: "Premium Workspace", ar: "مساحة عمل متميزة" },
  "business.stat1.label": { en: "Leading Companies", ar: "شركات رائدة" },
  "business.stat1.desc": { en: "Regional and multinational tenants", ar: "مستأجرون إقليميون ودوليون" },
  "business.stat2.label": { en: "Occupancy Rate", ar: "معدل الإشغال" },
  "business.stat2.desc": { en: "Consistent high demand", ar: "طلب مرتفع مستمر" },
  "business.stat3.label": { en: "Operations", ar: "العمليات" },
  "business.stat3.desc": { en: "Round-the-clock building services", ar: "خدمات مبنى على مدار الساعة" },
  "business.advantages.title": { en: "The Al Hamra Advantage", ar: "ميزة الحمراء" },
  "business.advantages.desc": { en: "Beyond workspace—a complete business ecosystem designed to enhance productivity, connectivity, and corporate presence.", ar: "أكثر من مساحة عمل—منظومة أعمال متكاملة مصممة لتعزيز الإنتاجية والاتصال والحضور المؤسسي." },
  "business.advantage1.title": { en: "Global Connectivity", ar: "الاتصال العالمي" },
  "business.advantage1.desc": { en: "High-speed fiber infrastructure connecting you to global markets", ar: "بنية تحتية ألياف عالية السرعة تربطك بالأسواق العالمية" },
  "business.advantage2.title": { en: "Enterprise Security", ar: "أمان المؤسسات" },
  "business.advantage2.desc": { en: "Multi-layer security systems with 24/7 monitoring", ar: "أنظمة أمان متعددة الطبقات مع مراقبة على مدار الساعة" },
  "business.advantage3.title": { en: "Reliable Power", ar: "طاقة موثوقة" },
  "business.advantage3.desc": { en: "Redundant power systems ensuring uninterrupted operations", ar: "أنظمة طاقة متكررة تضمن عمليات متواصلة" },
  "business.advantage4.title": { en: "Prestigious Address", ar: "عنوان مرموق" },
  "business.advantage4.desc": { en: "Kuwait's most recognized business address", ar: "عنوان الأعمال الأكثر شهرة في الكويت" },
  "business.global.title": { en: "A Global Business Address", ar: "عنوان أعمال عالمي" },
  "business.global.p1": { en: "Al Hamra Tower hosts the headquarters of Kuwait's leading corporations and international enterprises. The address signals prestige, stability, and forward-thinking vision.", ar: "يستضيف برج الحمراء مقرات الشركات الكويتية الرائدة والمؤسسات الدولية. العنوان يشير إلى المكانة والاستقرار والرؤية المستقبلية." },
  "business.global.p2": { en: "With direct access to major transportation networks and proximity to government institutions, the tower offers unmatched connectivity for businesses operating at the highest level.", ar: "مع الوصول المباشر لشبكات النقل الرئيسية والقرب من المؤسسات الحكومية، يوفر البرج اتصالاً لا مثيل له للشركات العاملة على أعلى مستوى." },
  "business.global.p3": { en: "From financial services to technology companies, energy giants to consulting firms—Al Hamra Tower serves as the command center for enterprises that shape the region's economy.", ar: "من الخدمات المالية إلى شركات التكنولوجيا، ومن عمالقة الطاقة إلى شركات الاستشارات—يعمل برج الحمراء كمركز قيادة للمؤسسات التي تشكل اقتصاد المنطقة." },

  // Sky Lobbies
  "skylobbies.label": { en: "Vertical Transit", ar: "التنقل العمودي" },
  "skylobbies.title": { en: "Sky Lobbies — A Moment Above the City", ar: "الردهات السماوية — لحظة فوق المدينة" },
  "skylobbies.intro": { en: "On the 30th and 55th floors, the tower's sky lobbies serve as vertical gateways—spaces of transition that connect business zones while offering perspective, pause, and a renewed sense of arrival.", ar: "في الطابقين الثلاثين والخامس والخمسين، تعمل الردهات السماوية كبوابات عمودية—مساحات انتقالية تربط مناطق الأعمال مع توفير المنظور والتوقف وإحساس متجدد بالوصول." },
  "skylobbies.floor": { en: "Floor", ar: "طابق" },
  "skylobbies.floor30.label": { en: "Mid-Rise Lobby", ar: "ردهة الارتفاع المتوسط" },
  "skylobbies.floor30.zone": { en: "Transition to Mid Zones", ar: "انتقال للمناطق الوسطى" },
  "skylobbies.floor55.label": { en: "High-Rise Lobby", ar: "ردهة الارتفاع العالي" },
  "skylobbies.floor55.zone": { en: "Access to Upper Offices", ar: "وصول للمكاتب العليا" },
  "skylobbies.image.alt": { en: "Sky lobby with panoramic city views", ar: "ردهة سماوية مع إطلالات بانورامية على المدينة" },
  "skylobbies.image.caption": { en: "Observation Level", ar: "مستوى المراقبة" },
  "skylobbies.connectivity.title": { en: "Vertical Connectivity for Business", ar: "الاتصال العمودي للأعمال" },
  "skylobbies.connectivity.p1": { en: "The sky lobbies function as carefully designed transfer points within the tower's elevator system, allowing professionals to transition seamlessly between low-rise, mid-rise, and high-rise zones with clarity and efficiency.", ar: "تعمل الردهات السماوية كنقاط انتقال مصممة بعناية ضمن نظام المصاعد في البرج، مما يسمح للمهنيين بالانتقال بسلاسة بين المناطق المنخفضة والمتوسطة والعالية بوضوح وكفاءة." },
  "skylobbies.connectivity.p2": { en: "Wide views of the city and sea reinforce a sense of perspective and scale, while high ceilings and natural daylight create an atmosphere of openness—a brief moment of spatial clarity between stages of the vertical journey.", ar: "تعزز الإطلالات الواسعة على المدينة والبحر الإحساس بالمنظور والحجم، بينما تخلق الأسقف العالية وضوء النهار الطبيعي جواً من الانفتاح—لحظة قصيرة من الوضوح المكاني بين مراحل الرحلة العمودية." },
  "skylobbies.quote": { en: "Spaces where the vertical journey becomes visible, and movement through the tower feels composed.", ar: "مساحات تصبح فيها الرحلة العمودية مرئية، ويبدو التنقل عبر البرج متزناً." },
  "skylobbies.features.title": { en: "Designed for Professional Flow", ar: "مصممة للتدفق المهني" },
  "skylobbies.feature1.title": { en: "Perspective Between Levels", ar: "المنظور بين المستويات" },
  "skylobbies.feature1.desc": { en: "Panoramic views provide orientation and context, connecting occupants to the city below before continuing upward.", ar: "توفر الإطلالات البانورامية التوجيه والسياق، وتربط الشاغلين بالمدينة أدناه قبل الاستمرار صعوداً." },
  "skylobbies.feature2.title": { en: "Arrival Experience", ar: "تجربة الوصول" },
  "skylobbies.feature2.desc": { en: "High ceilings and generous daylight create a sense of arrival—a composed threshold before entering executive workspace.", ar: "تخلق الأسقف العالية وضوء النهار الوفير إحساساً بالوصول—عتبة متزنة قبل الدخول لمساحة العمل التنفيذية." },
  "skylobbies.feature3.title": { en: "Executive Transit", ar: "التنقل التنفيذي" },
  "skylobbies.feature3.desc": { en: "Brief pause for meetings, orientation, or regrouping before continuing to offices above—designed for professional rhythm.", ar: "توقف قصير للاجتماعات أو التوجيه أو إعادة التجمع قبل الاستمرار للمكاتب أعلاه—مصمم للإيقاع المهني." },
  "skylobbies.gallery.img1": { en: "Lobby Interior", ar: "داخل الردهة" },
  "skylobbies.gallery.img2": { en: "City Horizon", ar: "أفق المدينة" },
  "skylobbies.closing": { en: "The sky lobbies reflect Al Hamra Tower's commitment to a carefully engineered business environment—where the daily experience of vertical movement reinforces the building's role as a high-performance address.", ar: "تعكس الردهات السماوية التزام برج الحمراء ببيئة أعمال مهندسة بعناية—حيث تعزز التجربة اليومية للحركة العمودية دور المبنى كعنوان عالي الأداء." },

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

  // Journey Timeline
  "journey.label": { en: "Vertical Journey", ar: "الرحلة العمودية" },
  "journey.title": { en: "The Ascent Experience", ar: "تجربة الصعود" },
  "journey.subtitle": { en: "From arrival to executive floors—a choreographed vertical journey through Al Hamra Tower.", ar: "من الوصول إلى الطوابق التنفيذية—رحلة عمودية منسقة عبر برج الحمراء." },
  "journey.floor": { en: "Floor", ar: "طابق" },
  "journey.ground.title": { en: "Grand Arrival", ar: "الوصول الكبير" },
  "journey.ground.desc": { en: "The tower's dramatic lobby welcomes visitors with soaring ceilings, cascading water, and immediate access to express elevators.", ar: "ترحب ردهة البرج المهيبة بالزوار بأسقف شاهقة ومياه متدفقة ووصول فوري للمصاعد السريعة." },
  "journey.sky30.title": { en: "Mid-Rise Transfer", ar: "انتقال المستوى المتوسط" },
  "journey.sky30.desc": { en: "The first sky lobby offers panoramic orientation and connects express service to local elevators serving floors 20-40.", ar: "توفر الردهة السماوية الأولى توجيهاً بانورامياً وتربط الخدمة السريعة بالمصاعد المحلية التي تخدم الطوابق ٢٠-٤٠." },
  "journey.sky55.title": { en: "High-Rise Gateway", ar: "بوابة المستوى العالي" },
  "journey.sky55.desc": { en: "The second sky lobby serves as the gateway to executive floors, with unobstructed Gulf views and refined waiting areas.", ar: "تعمل الردهة السماوية الثانية كبوابة للطوابق التنفيذية، مع إطلالات خليجية مفتوحة ومناطق انتظار راقية." },
  "journey.offices.title": { en: "Executive Floors", ar: "الطوابق التنفيذية" },
  "journey.offices.desc": { en: "The tower's premium office levels—where industry leaders operate with commanding views across Kuwait City and beyond.", ar: "طوابق المكاتب المتميزة في البرج—حيث يعمل قادة الصناعة مع إطلالات آسرة عبر مدينة الكويت وما وراءها." },
  "journey.closing": { en: "Every vertical transition reinforces the building's commitment to a composed, high-performance business experience.", ar: "كل انتقال عمودي يعزز التزام المبنى بتجربة أعمال متزنة وعالية الأداء." },

  // Elevator System Visualization
  "elevator.label": { en: "Vertical Transport", ar: "النقل العمودي" },
  "elevator.title": { en: "Elevator System Architecture", ar: "هندسة نظام المصاعد" },
  "elevator.subtitle": { en: "A precision-engineered network of express and local elevators ensures swift, seamless transit through the tower's vertical zones.", ar: "شبكة مصاعد سريعة ومحلية مهندسة بدقة تضمن عبوراً سريعاً وسلساً عبر المناطق العمودية للبرج." },
  "elevator.type.express": { en: "Express", ar: "سريع" },
  "elevator.type.local": { en: "Local", ar: "محلي" },
  "elevator.express.desc": { en: "Non-stop service to sky lobbies", ar: "خدمة مباشرة للردهات السماوية" },
  "elevator.local.desc": { en: "Zone-specific floor access", ar: "وصول للطوابق حسب المنطقة" },
  "elevator.express.high": { en: "Express to Sky Lobby 55", ar: "سريع للردهة السماوية ٥٥" },
  "elevator.express.mid": { en: "Express to Sky Lobby 30", ar: "سريع للردهة السماوية ٣٠" },
  "elevator.local.low": { en: "Low-Rise Local (G–20)", ar: "محلي منخفض (أرضي–٢٠)" },
  "elevator.local.mid": { en: "Mid-Rise Local (30–50)", ar: "محلي متوسط (٣٠–٥٠)" },
  "elevator.local.high": { en: "High-Rise Local (55–77)", ar: "محلي عالي (٥٥–٧٧)" },
  "elevator.speed.express": { en: "6 m/s", ar: "٦ م/ث" },
  "elevator.speed.local": { en: "4 m/s", ar: "٤ م/ث" },
  "elevator.capacity.express": { en: "24 persons", ar: "٢٤ شخص" },
  "elevator.capacity.local": { en: "16 persons", ar: "١٦ شخص" },
  "elevator.floors": { en: "Floors", ar: "الطوابق" },
  "elevator.routes.title": { en: "Elevator Routes", ar: "مسارات المصاعد" },
  "elevator.shaft.express": { en: "Express", ar: "سريع" },
  "elevator.shaft.local": { en: "Local", ar: "محلي" },
  "elevator.floor.ground": { en: "Ground Lobby", ar: "الردهة الأرضية" },
  "elevator.floor.sky30": { en: "Sky Lobby 30", ar: "الردهة السماوية ٣٠" },
  "elevator.floor.sky55": { en: "Sky Lobby 55", ar: "الردهة السماوية ٥٥" },
  "elevator.floor.executive": { en: "Executive", ar: "تنفيذي" },
  "elevator.stat.elevators": { en: "Total Elevators", ar: "إجمالي المصاعد" },
  "elevator.stat.express.units": { en: "Express Units", ar: "وحدات سريعة" },
  "elevator.stat.max.speed": { en: "Max Speed", ar: "السرعة القصوى" },
  "elevator.closing": { en: "The elevator system transforms vertical distance into moments of transition—efficient, composed, and purposeful.", ar: "يحول نظام المصاعد المسافة العمودية إلى لحظات انتقال—فعالة ومتزنة وهادفة." },

  // Legacy Section
  "legacy.label": { en: "Heritage", ar: "التراث" },
  "legacy.title": { en: "From Cinema Grounds to Skyline Icon", ar: "من أرض السينما إلى أيقونة الأفق" },
  "legacy.subtitle": { en: "Where cultural memory and architectural ambition converge, Al Hamra Tower rises as a living testament to Kuwait's transformation.", ar: "حيث تتلاقى الذاكرة الثقافية والطموح المعماري، يرتفع برج الحمراء كشاهد حي على تحول الكويت." },
  "legacy.hero.alt": { en: "Kuwait City panorama at sunset", ar: "بانوراما مدينة الكويت عند الغروب" },
  
  // Legacy Origins
  "legacy.origins.heading": { en: "A Place of Gathering, Reborn", ar: "مكان للتجمع، يولد من جديد" },
  "legacy.origins.p1": { en: "Before the tower reached skyward, this site held a different significance. In the 1960s, it was home to Kuwait's first cinema and entertainment venue—a cultural gathering place where generations of Kuwaitis shared stories, celebrated, and connected.", ar: "قبل أن يمتد البرج نحو السماء، حمل هذا الموقع أهمية مختلفة. في الستينيات، كان موطناً لأول سينما ومكان ترفيه في الكويت—مكان تجمع ثقافي حيث شارك أجيال من الكويتيين القصص واحتفلوا وتواصلوا." },
  "legacy.origins.p2": { en: "That spirit of gathering endures. What began as a place for community entertainment has evolved into a landmark that anchors business, culture, and civic pride—transforming while honoring what came before.", ar: "روح التجمع هذه تستمر. ما بدأ كمكان للترفيه المجتمعي تطور إلى معلم يرسخ الأعمال والثقافة والفخر المدني—يتحول مع تكريم ما سبقه." },
  "legacy.origins.quote": { en: "From a place where stories were shown to a place where futures are built.", ar: "من مكان عُرضت فيه القصص إلى مكان تُبنى فيه المستقبل." },
  "legacy.origins.historic.alt": { en: "Historic view of the site", ar: "منظر تاريخي للموقع" },
  "legacy.origins.historic.label": { en: "The Site's Heritage", ar: "تراث الموقع" },
  "legacy.origins.modern.alt": { en: "Al Hamra Tower today", ar: "برج الحمراء اليوم" },
  "legacy.origins.modern.label": { en: "Present Day", ar: "الوقت الحاضر" },

  // Legacy Timeline
  "legacy.evolution.heading": { en: "A Story of Transformation", ar: "قصة التحول" },
  "legacy.evolution.desc": { en: "The journey from cultural landmark to architectural icon spans decades of vision, planning, and purposeful construction.", ar: "رحلة من المعلم الثقافي إلى الأيقونة المعمارية تمتد عبر عقود من الرؤية والتخطيط والبناء الهادف." },
  "legacy.timeline.cinema": { en: "Cultural Landmark", ar: "معلم ثقافي" },
  "legacy.timeline.cinema.desc": { en: "Kuwait's first cinema and entertainment district serves as a social gathering point for the city.", ar: "أول سينما ومنطقة ترفيه في الكويت تعمل كنقطة تجمع اجتماعي للمدينة." },
  "legacy.timeline.groundbreaking": { en: "Ground Breaking", ar: "وضع الأساس" },
  "legacy.timeline.groundbreaking.desc": { en: "Construction begins on a vision to create Kuwait's tallest and most distinctive tower.", ar: "بدء البناء على رؤية لإنشاء أطول وأميز برج في الكويت." },
  "legacy.timeline.completion": { en: "Tower Completion", ar: "اكتمال البرج" },
  "legacy.timeline.completion.desc": { en: "Al Hamra Tower opens, immediately becoming Kuwait's most recognized architectural achievement.", ar: "افتتاح برج الحمراء، ليصبح فوراً أكثر الإنجازات المعمارية شهرة في الكويت." },
  "legacy.timeline.today": { en: "Today", ar: "اليوم" },
  "legacy.timeline.icon": { en: "Global Icon", ar: "أيقونة عالمية" },
  "legacy.timeline.icon.desc": { en: "An internationally celebrated landmark housing Kuwait's leading enterprises.", ar: "معلم معترف به دولياً يستضيف المؤسسات الرائدة في الكويت." },

  // Legacy Design
  "legacy.design.label": { en: "Achievement", ar: "الإنجاز" },
  "legacy.design.heading": { en: "A Sculpted Landmark in the Heart of Kuwait City", ar: "معلم منحوت في قلب مدينة الكويت" },
  "legacy.design.p1": { en: "Designed by world-renowned architects Skidmore, Owings & Merrill, Al Hamra Tower stands as the tallest structure in Kuwait and the tallest carved concrete skyscraper in the world at 413 meters—a singular achievement in structural engineering and sculptural form.", ar: "صممه المعماريون ذوو الشهرة العالمية سكيدمور وأوينغز وميريل، يقف برج الحمراء كأطول هيكل في الكويت وأطول ناطحة سحاب خرسانية منحوتة في العالم بارتفاع ٤١٣ متراً—إنجاز فريد في الهندسة الإنشائية والشكل النحتي." },
  "legacy.design.p2": { en: "The tower's distinctive 60-degree twist from base to crown was not merely aesthetic ambition—it emerged from rigorous environmental analysis, optimizing solar exposure while creating an ever-changing silhouette that responds to Kuwait's climate and context.", ar: "لم يكن التواء البرج المميز بستين درجة من القاعدة إلى التاج مجرد طموح جمالي—بل نشأ من تحليل بيئي دقيق، يحسن التعرض للشمس مع خلق صورة ظلية متغيرة باستمرار تستجيب لمناخ الكويت وسياقها." },
  "legacy.stat.height": { en: "Architectural Height", ar: "الارتفاع المعماري" },
  "legacy.stat.floors": { en: "Total Floors", ar: "إجمالي الطوابق" },
  "legacy.stat.twist": { en: "Sculptural Twist", ar: "اللفة النحتية" },
  "legacy.stat.carved": { en: "World's Tallest Carved Tower", ar: "أطول برج منحوت في العالم" },
  "legacy.design.image.alt": { en: "Al Hamra Tower by SOM architects", ar: "برج الحمراء من تصميم معماريي SOM" },
  "legacy.design.image.caption": { en: "Designed by Skidmore, Owings & Merrill", ar: "من تصميم سكيدمور وأوينغز وميريل" },

  // Legacy Impact
  "legacy.impact.label": { en: "Cultural Significance", ar: "الأهمية الثقافية" },
  "legacy.impact.heading": { en: "Design, Achievement, and Global Recognition", ar: "التصميم والإنجاز والاعتراف العالمي" },
  "legacy.impact.p1": { en: "Since its completion in 2011, Al Hamra Tower has become an enduring symbol of Kuwait's modern identity—recognized internationally and celebrated for its sculptural form that responds intelligently to climate and urban context.", ar: "منذ اكتماله في ٢٠١١، أصبح برج الحمراء رمزاً دائماً لهوية الكويت الحديثة—معترف به دولياً ومُحتفى به لشكله النحتي الذي يستجيب بذكاء للمناخ والسياق الحضري." },
  "legacy.impact.p2": { en: "The tower has earned recognition from leading architectural institutions worldwide, establishing Kuwait's presence in the global conversation about innovative high-rise design and sustainable urban development.", ar: "حصل البرج على تقدير من المؤسسات المعمارية الرائدة عالمياً، مؤسساً حضور الكويت في الحوار العالمي حول التصميم المبتكر للمباني الشاهقة والتنمية الحضرية المستدامة." },
  "legacy.impact.recognition": { en: "International Recognition", ar: "الاعتراف الدولي" },
  "legacy.impact.image.alt": { en: "Al Hamra Tower illuminated at night", ar: "برج الحمراء مضاء في الليل" },

  // Legacy Heart of the City
  "legacy.heart.heading": { en: "Legacy in the Heart of the City", ar: "إرث في قلب المدينة" },
  "legacy.heart.p1": { en: "Situated in the commercial heart of Kuwait City, Al Hamra Tower anchors business, culture, and panoramic views of the Arabian Gulf—bridging past and present while pointing toward an ambitious future.", ar: "يقع في القلب التجاري لمدينة الكويت، يرسخ برج الحمراء الأعمال والثقافة والإطلالات البانورامية على الخليج العربي—جسر بين الماضي والحاضر مع الإشارة نحو مستقبل طموح." },
  "legacy.heart.gallery1.alt": { en: "Tower in urban context", ar: "البرج في السياق الحضري" },
  "legacy.heart.gallery2.alt": { en: "Architectural detail", ar: "تفاصيل معمارية" },

  // Legacy Archival Gallery
  "legacy.archival.label": { en: "Historical Archive", ar: "الأرشيف التاريخي" },
  "legacy.archival.heading": { en: "Echoes of What Came Before", ar: "أصداء ما كان قبل" },
  "legacy.archival.desc": { en: "Before the tower rose, this site was the cultural heart of a growing city—a place where Kuwaitis gathered, celebrated, and built community.", ar: "قبل أن يرتفع البرج، كان هذا الموقع القلب الثقافي لمدينة نامية—مكان حيث تجمع الكويتيون واحتفلوا وبنوا المجتمع." },
  "legacy.archival.cinema.alt": { en: "Historic Kuwait cinema district in the 1960s", ar: "حي السينما التاريخي في الكويت في الستينيات" },
  "legacy.archival.cinema.caption": { en: "The Al Hamra Cinema district—Kuwait's first entertainment venue", ar: "حي سينما الحمراء—أول مكان ترفيهي في الكويت" },
  "legacy.archival.souq.alt": { en: "Traditional Kuwait souq market in the 1950s", ar: "سوق الكويت التقليدي في الخمسينيات" },
  "legacy.archival.souq.caption": { en: "The surrounding souq where merchants traded for generations", ar: "السوق المحيط حيث تاجر التجار لأجيال" },
  "legacy.archival.city.alt": { en: "Aerial view of Kuwait City in the 1970s", ar: "منظر جوي لمدينة الكويت في السبعينيات" },
  "legacy.archival.city.caption": { en: "Kuwait City before the modern skyline emerged", ar: "مدينة الكويت قبل ظهور الأفق الحديث" },

  // Before/After Comparison
  "legacy.comparison.label": { en: "Then & Now", ar: "الماضي والحاضر" },
  "legacy.comparison.heading": { en: "Witness the Transformation", ar: "شاهد التحول" },
  "legacy.comparison.desc": { en: "Slide to reveal the remarkable transformation of this site—from Kuwait's beloved cinema district to its most iconic architectural achievement.", ar: "اسحب لتكشف التحول الملحوظ لهذا الموقع—من حي السينما المحبوب في الكويت إلى أكثر إنجازاتها المعمارية أيقونية." },
  "legacy.comparison.instruction": { en: "Drag the slider to compare the historic site with the tower today.", ar: "اسحب شريط التمرير لمقارنة الموقع التاريخي بالبرج اليوم." },
  "legacy.comparison.before.label": { en: "Al Hamra Cinema District", ar: "حي سينما الحمراء" },
  "legacy.comparison.after.label": { en: "Al Hamra Tower", ar: "برج الحمراء" },

  // Founders' Vision
  "legacy.founders.label": { en: "Founders' Vision", ar: "رؤية المؤسسين" },
  "legacy.founders.heading": { en: "The Voices Behind the Vision", ar: "الأصوات وراء الرؤية" },
  "legacy.founders.desc": { en: "The development team and architects who shaped Al Hamra Tower speak to the ambition and purpose that guided every decision.", ar: "فريق التطوير والمعماريون الذين شكلوا برج الحمراء يتحدثون عن الطموح والهدف الذي وجه كل قرار." },
  "legacy.founders.quote1": { en: "We wanted to create something that would stand as a testament to Kuwait's capabilities—not just in height, but in architectural innovation and engineering excellence.", ar: "أردنا إنشاء شيء يقف كشهادة على قدرات الكويت—ليس فقط في الارتفاع، بل في الابتكار المعماري والتميز الهندسي." },
  "legacy.founders.author1": { en: "Al Hamra Real Estate Co.", ar: "شركة الحمراء العقارية" },
  "legacy.founders.role1": { en: "Development Team", ar: "فريق التطوير" },
  "legacy.founders.quote2": { en: "The twisting form emerged from our analysis of Kuwait's harsh sun. Every degree of rotation serves a purpose—reducing solar gain while maximizing natural light.", ar: "نشأ الشكل الملتوي من تحليلنا لشمس الكويت القاسية. كل درجة دوران تخدم غرضاً—تقليل اكتساب الحرارة الشمسية مع تعظيم الضوء الطبيعي." },
  "legacy.founders.author2": { en: "Skidmore, Owings & Merrill", ar: "سكيدمور وأوينغز وميريل" },
  "legacy.founders.role2": { en: "Lead Architects", ar: "المعماريون الرئيسيون" },
  "legacy.founders.quote3": { en: "Building the world's tallest carved concrete tower required us to rethink construction methodology from the ground up. Every pour, every cure was choreographed.", ar: "بناء أطول برج خرساني منحوت في العالم تطلب منا إعادة التفكير في منهجية البناء من الأساس. كل صب، كل معالجة كانت منسقة." },
  "legacy.founders.author3": { en: "Samsung Engineering & Construction", ar: "سامسونج للهندسة والبناء" },
  "legacy.founders.role3": { en: "Construction Partner", ar: "شريك البناء" },
  "legacy.founders.vision": { en: "We envisioned a tower that would not simply occupy the skyline, but define it—a landmark that speaks to Kuwait's past while reaching toward its future.", ar: "تخيلنا برجاً لا يشغل الأفق فحسب، بل يحدده—معلم يتحدث عن ماضي الكويت بينما يمتد نحو مستقبلها." },
  
  // Legacy Closing
  "legacy.closing.quote": { en: "Al Hamra Tower is not merely a building—it is a living legacy, rooted in local culture, shaped by architectural ambition, and reaching toward a future that honors what came before.", ar: "برج الحمراء ليس مجرد مبنى—إنه إرث حي، متجذر في الثقافة المحلية، شكله الطموح المعماري، ويتجه نحو مستقبل يكرم ما سبقه." },
  "legacy.closing.attribution": { en: "A Testament to Kuwait's Transformation", ar: "شهادة على تحول الكويت" },

  // History Parallax Timeline
  "history.timeline.label": { en: "Historical Journey", ar: "الرحلة التاريخية" },
  "history.timeline.heading": { en: "Decades of Transformation", ar: "عقود من التحول" },
  "history.timeline.desc": { en: "Trace Kuwait's evolution from a historic trading hub to a modern metropolis, culminating in the rise of Al Hamra Tower.", ar: "تتبع تطور الكويت من مركز تجاري تاريخي إلى مدينة حديثة، وصولاً إلى صعود برج الحمراء." },
  "history.timeline.today": { en: "Today", ar: "اليوم" },
  "history.timeline.era.heritage": { en: "Heritage Era", ar: "عصر التراث" },
  "history.timeline.era.culture": { en: "Cultural Dawn", ar: "فجر الثقافة" },
  "history.timeline.era.growth": { en: "Urban Growth", ar: "النمو الحضري" },
  "history.timeline.era.vision": { en: "Visionary Leap", ar: "قفزة الرؤية" },
  "history.timeline.era.completion": { en: "Achievement", ar: "الإنجاز" },
  "history.timeline.era.legacy": { en: "Living Legacy", ar: "إرث حي" },
  "history.timeline.expand": { en: "Explore More", ar: "استكشف المزيد" },
  "history.timeline.collapse": { en: "Show Less", ar: "عرض أقل" },
  "history.timeline.clickToExplore": { en: "Click to explore", ar: "انقر للاستكشاف" },
  "history.timeline.milestone1.title": { en: "The Traditional Souq", ar: "السوق التقليدي" },
  "history.timeline.milestone1.desc": { en: "Kuwait's bustling souqs served as the heart of commerce and community, where generations of merchants built the foundations of the nation's prosperity.", ar: "كانت أسواق الكويت المزدهرة قلب التجارة والمجتمع، حيث بنى أجيال من التجار أسس ازدهار الأمة." },
  "history.timeline.milestone1.alt": { en: "Historic Kuwait souq in the 1950s", ar: "سوق الكويت التاريخي في الخمسينيات" },
  "history.timeline.milestone1.expanded": { en: "The souq district was the commercial nucleus of pre-oil Kuwait. Merchants traded pearls, textiles, and spices from across the Gulf and Indian subcontinent. The narrow alleyways and covered walkways provided shelter from the harsh sun while fostering close-knit business relationships that defined Kuwaiti commerce.", ar: "كان حي السوق النواة التجارية للكويت قبل النفط. تاجر التجار باللؤلؤ والمنسوجات والتوابل من جميع أنحاء الخليج وشبه القارة الهندية. وفرت الأزقة الضيقة والممرات المغطاة مأوى من الشمس الحارقة مع تعزيز علاقات الأعمال الوثيقة التي حددت التجارة الكويتية." },
  "history.timeline.milestone1.fact": { en: "Over 200 merchants operated in the souq district", ar: "أكثر من ٢٠٠ تاجر عملوا في حي السوق" },
  "history.timeline.milestone1.factLabel": { en: "Historical Fact", ar: "حقيقة تاريخية" },
  "history.timeline.milestone1.archival1": { en: "The bustling marketplace that preceded the cinema", ar: "السوق المزدحم الذي سبق السينما" },
  "history.timeline.milestone2.title": { en: "The Cinema District", ar: "حي السينما" },
  "history.timeline.milestone2.desc": { en: "Al Hamra Cinema opened as Kuwait's first entertainment venue, becoming a beloved cultural landmark where families gathered for films and celebration.", ar: "افتتحت سينما الحمراء كأول مكان ترفيهي في الكويت، لتصبح معلماً ثقافياً محبوباً حيث اجتمعت العائلات لمشاهدة الأفلام والاحتفال." },
  "history.timeline.milestone2.alt": { en: "Al Hamra Cinema district in the 1960s", ar: "حي سينما الحمراء في الستينيات" },
  "history.timeline.milestone2.expanded": { en: "Al Hamra Cinema became more than a movie theater—it was a social institution. Kuwaiti families would dress in their finest clothes for evening screenings, and the surrounding streets buzzed with cafés and shops. The cinema district represented Kuwait's emerging cosmopolitan identity during the oil boom years.", ar: "أصبحت سينما الحمراء أكثر من دار سينما—كانت مؤسسة اجتماعية. كانت العائلات الكويتية ترتدي أفخر ملابسها لعروض المساء، وكانت الشوارع المحيطة تعج بالمقاهي والمتاجر. مثّل حي السينما هوية الكويت الكوزموبوليتانية الناشئة خلال سنوات الطفرة النفطية." },
  "history.timeline.milestone2.fact": { en: "The cinema could seat 1,200 guests per show", ar: "كان يتسع السينما لـ ١٢٠٠ ضيف في كل عرض" },
  "history.timeline.milestone2.factLabel": { en: "Did You Know", ar: "هل تعلم" },
  "history.timeline.milestone2.archival1": { en: "The traditional souq adjacent to the cinema", ar: "السوق التقليدي المجاور للسينما" },
  "history.timeline.milestone3.title": { en: "A City Transformed", ar: "مدينة تتحول" },
  "history.timeline.milestone3.desc": { en: "Oil wealth enabled rapid modernization, with Kuwait City expanding outward and upward as ambitions grew beyond traditional boundaries.", ar: "مكنت ثروة النفط من التحديث السريع، مع توسع مدينة الكويت للخارج وللأعلى مع نمو الطموحات إلى ما بعد الحدود التقليدية." },
  "history.timeline.milestone3.alt": { en: "Kuwait City skyline in the 1970s", ar: "أفق مدينة الكويت في السبعينيات" },
  "history.timeline.milestone3.expanded": { en: "The 1970s marked Kuwait's ambitious urban development phase. Master plans commissioned from international architects reimagined the city as a modern Gulf metropolis. Wide boulevards replaced narrow souq alleys, and gleaming office towers signaled Kuwait's arrival on the world stage.", ar: "شهدت السبعينيات مرحلة التطوير الحضري الطموح للكويت. أعادت المخططات الرئيسية التي أعدها معماريون دوليون تصور المدينة كمدينة خليجية حديثة. حلت الشوارع الواسعة محل أزقة السوق الضيقة، وأشارت أبراج المكاتب اللامعة إلى وصول الكويت إلى المسرح العالمي." },
  "history.timeline.milestone3.fact": { en: "Kuwait's population grew 400% between 1960-1980", ar: "نما عدد سكان الكويت بنسبة ٤٠٠٪ بين ١٩٦٠-١٩٨٠" },
  "history.timeline.milestone3.factLabel": { en: "Growth Statistic", ar: "إحصائية النمو" },
  "history.timeline.milestone3.archival1": { en: "Kuwait's evolving urban landscape", ar: "المشهد الحضري المتطور للكويت" },
  "history.timeline.milestone4.title": { en: "Breaking Ground", ar: "وضع الأساس" },
  "history.timeline.milestone4.desc": { en: "Construction began on an unprecedented vision—to create Kuwait's tallest building and the world's tallest carved concrete tower.", ar: "بدأ البناء على رؤية غير مسبوقة—لإنشاء أطول مبنى في الكويت وأطول برج خرساني منحوت في العالم." },
  "history.timeline.milestone4.alt": { en: "Al Hamra Tower construction begins", ar: "بدء بناء برج الحمراء" },
  "history.timeline.milestone4.expanded": { en: "Breaking ground on the former cinema site required innovative foundation engineering. Teams excavated to bedrock level, installing deep piles to support the tower's unprecedented height. The construction methodology developed for Al Hamra has since informed high-rise projects worldwide.", ar: "تطلب البدء في موقع السينما السابق هندسة أساسات مبتكرة. حفرت الفرق حتى مستوى الصخر، وركبت ركائز عميقة لدعم الارتفاع غير المسبوق للبرج. منهجية البناء المطورة لبرج الحمراء أثرت منذ ذلك الحين على مشاريع الأبراج الشاهقة في جميع أنحاء العالم." },
  "history.timeline.milestone4.fact": { en: "Foundation depth: 60 meters to bedrock", ar: "عمق الأساس: ٦٠ متراً حتى الصخر" },
  "history.timeline.milestone4.factLabel": { en: "Engineering Detail", ar: "تفاصيل هندسية" },
  "history.timeline.milestone4.archival1": { en: "Foundation construction in progress", ar: "بناء الأساسات جارٍ" },
  "history.timeline.milestone4.archival2": { en: "Steel reinforcement rising skyward", ar: "تعزيزات الفولاذ ترتفع نحو السماء" },
  "history.timeline.milestone5.title": { en: "Tower Completion", ar: "اكتمال البرج" },
  "history.timeline.milestone5.desc": { en: "Al Hamra Tower opens its doors, instantly becoming Kuwait's most recognized architectural achievement and a symbol of national ambition.", ar: "يفتح برج الحمراء أبوابه، ليصبح فوراً أكثر الإنجازات المعمارية شهرة في الكويت ورمزاً للطموح الوطني." },
  "history.timeline.milestone5.alt": { en: "Al Hamra Tower completed in 2011", ar: "اكتمال برج الحمراء في ٢٠١١" },
  "history.timeline.milestone5.expanded": { en: "The completion ceremony drew dignitaries from across the Gulf region. Within its first year, Al Hamra Tower achieved near-full occupancy, attracting Kuwait's leading corporations and international firms. The tower's distinctive silhouette immediately became the city's most photographed landmark.", ar: "جذب حفل الاكتمال كبار الشخصيات من جميع أنحاء منطقة الخليج. خلال عامه الأول، حقق برج الحمراء إشغالاً شبه كامل، مستقطباً الشركات الكويتية الرائدة والشركات الدولية. أصبحت صورة البرج المميزة فوراً أكثر المعالم تصويراً في المدينة." },
  "history.timeline.milestone5.fact": { en: "Opening occupancy reached 92% within 18 months", ar: "وصل الإشغال إلى ٩٢٪ خلال ١٨ شهراً" },
  "history.timeline.milestone5.factLabel": { en: "Business Milestone", ar: "إنجاز تجاري" },
  "history.timeline.milestone5.archival1": { en: "The tower's sculptural form takes shape", ar: "يتشكل الشكل النحتي للبرج" },
  "history.timeline.milestone5.archival2": { en: "Illuminated presence over the Gulf", ar: "حضور مُضاء فوق الخليج" },
  "history.timeline.milestone6.title": { en: "A Global Landmark", ar: "معلم عالمي" },
  "history.timeline.milestone6.desc": { en: "Internationally celebrated and home to Kuwait's leading enterprises, Al Hamra Tower continues to define the nation's skyline and aspirations.", ar: "يحتفى به دولياً وموطن للمؤسسات الرائدة في الكويت، يستمر برج الحمراء في تحديد أفق الأمة وتطلعاتها." },
  "history.timeline.milestone6.alt": { en: "Al Hamra Tower today", ar: "برج الحمراء اليوم" },
  "history.timeline.milestone6.expanded": { en: "Today, Al Hamra Tower hosts over 40 leading corporations and welcomes thousands of visitors daily to its observation deck and luxury retail spaces. International architectural awards continue to recognize the tower's achievement, cementing its place among the world's most significant contemporary buildings.", ar: "اليوم، يستضيف برج الحمراء أكثر من ٤٠ شركة رائدة ويستقبل آلاف الزوار يومياً في منصة المراقبة ومساحات التجزئة الفاخرة. تستمر الجوائز المعمارية الدولية في الاعتراف بإنجاز البرج، مما يرسخ مكانته بين أهم المباني المعاصرة في العالم." },
  "history.timeline.milestone6.fact": { en: "Over 5 million visitors since opening", ar: "أكثر من ٥ ملايين زائر منذ الافتتاح" },
  "history.timeline.milestone6.factLabel": { en: "Visitor Milestone", ar: "إنجاز الزوار" },
  "history.timeline.milestone6.archival1": { en: "The tower illuminated at night", ar: "البرج مُضاء في الليل" },

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
