/* Replaceable bilingual demo content. No network access is required. */
window.STUDENT_GUIDE_DATA = {
  brand: {
    product: { ar: "دليل الطالب الذكي", en: "Smart Student Guide" },
    organization: { ar: "الجامعات العُمانية", en: "Omani universities" },
    event: { ar: "تحدي الصيف 2026", en: "Summer Challenge 2026" },
    demoLabel: { ar: "وضع العرض التجريبي للفعالية", en: "Event Demo Mode" },
    demoNotice: {
      ar: "تجربة توضيحية ببيانات ولوائح خيالية - وليست خدمة جامعية رسمية.",
      en: "A demonstration using fictional data and policies - not an official university service."
    }
  },
  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    demo: { ar: "تجربة المساعد", en: "Assistant Demo" },
    technology: { ar: "التقنية", en: "Technology" },
    impact: { ar: "الأثر", en: "Impact" }
  },
  common: {
    skip: { ar: "انتقل إلى المحتوى", en: "Skip to content" },
    menu: { ar: "القائمة", en: "Menu" },
    language: { ar: "English", en: "العربية" },
    install: { ar: "تثبيت التطبيق", en: "Install app" },
    offlineReady: { ar: "جاهز دون اتصال", en: "Offline ready" },
    online: { ar: "متصل", en: "Online" },
    offline: { ar: "دون اتصال - العرض الأساسي متاح", en: "Offline - core demo available" },
    openDemo: { ar: "ابدأ التجربة", en: "Try the assistant" },
    learnTechnology: { ar: "اكتشف التقنية", en: "Explore the technology" },
    readMore: { ar: "عرض التفاصيل", en: "View details" },
    close: { ar: "إغلاق", en: "Close" },
    projected: { ar: "نتيجة متوقعة", en: "Projected outcome" },
    demo: { ar: "تجريبي", en: "Demo" }
  },
  home: {
    eyebrow: { ar: "مساعد أكاديمي موثوق، خطوة بخطوة", en: "Trusted academic guidance, step by step" },
    title: {
      ar: "من السؤال إلى الخطوة التالية، بوضوح.",
      en: "From question to next step, clearly."
    },
    intro: {
      ar: "دليل ثنائي اللغة يشرح الإجراءات الجامعية، يعرض مصادره، ويحوّل الإرشاد إلى نماذج وتذكيرات عملية - في تجربة محلية تعمل حتى دون إنترنت.",
      en: "A bilingual guide that explains university processes, cites its sources, and turns guidance into practical forms and reminders - in a local demo that works even offline."
    },
    trustLine: {
      ar: "إجابات محددة السياق. مصادر ظاهرة. بياناتك تبقى على جهازك.",
      en: "Context-aware answers. Visible sources. Your data stays on your device."
    },
    scenariosTitle: { ar: "أربع لحظات طلابية، مساعد واحد", en: "Four student moments, one assistant" },
    scenariosIntro: {
      ar: "اختر موقفاً وجرّب مساراً كاملاً من السؤال إلى الإجراء.",
      en: "Choose a situation and try a complete path from question to action."
    },
    journeyTitle: { ar: "رحلة الاستخدام في 3 خطوات فقط", en: "A three-step journey" },
    journey: [
      {
        icon: "message-circle",
        title: { ar: "1. اطرح سؤالك", en: "1. Ask naturally" },
        text: { ar: "اكتب ما تحتاجه بلغتك وبأسلوبك.", en: "Describe what you need in your own words." }
      },
      {
        icon: "sparkles",
        title: { ar: "2. افهم الإجراء", en: "2. Understand the process" },
        text: { ar: "تحصل على خطوات مرتبة ومصادر قابلة للمراجعة.", en: "Get ordered steps with reviewable sources." }
      },
      {
        icon: "circle-check-big",
        title: { ar: "3. أنجز الخطوة", en: "3. Take action" },
        text: { ar: "عاين النموذج وأنشئ تذكيراً محلياً.", en: "Preview the form and create a local reminder." }
      }
    ],
    qrTitle: { ar: "خذ التجربة معك", en: "Take the demo with you" },
    qrText: {
      ar: "امسح الرمز لفتح تجربة المساعد على هاتفك من نفس عنوان العرض.",
      en: "Scan to open the assistant demo on your phone from the same event URL."
    },
    qrHint: {
      ar: "يعكس الرمز عنوان الموقع الحالي تلقائياً.",
      en: "The code automatically reflects the current site address."
    },
    universitiesTitle: { ar: "اختر جامعتك واعرف قواعدها", en: "Pick your university and see its rules" },
    universitiesIntro: { ar: "مجموعة مختارة من الجامعات العُمانية. كل جامعة لها لائحة عرض خاصة بها.", en: "A curated set of Omani universities. Each has its own demo rules." },
    universitiesPrompt: { ar: "اضغط الجامعة لتعيينها في التجربة.", en: "Tap a university to set it for the demo." },
    faqTitle: { ar: "أسئلة شائعة", en: "Frequently asked questions" }
  },
  universities: [
    {
      id: "utas",
      short: { ar: "UTAS", en: "UTAS" },
      name: { ar: "جامعة التقنية والعلوم التطبيقية", en: "University of Technology and Applied Sciences" },
      image: "assets/images/utas-logo.png",
      description: {
        ar: "لوائح عرضية لـ UTAS مع قواعد التسجيل، التدريب، والحذف والإضافة.",
        en: "Demo rules for UTAS with registration, training, and add/drop guidance."
      },
      rules: [
        { ar: "التسجيل الصيفي يُغلق في 10 يونيو.", en: "Summer registration closes 10 June." },
        { ar: "الحد الأدنى للمقررات هو 12 ساعة معتمدة.", en: "Minimum load is 12 credits." },
        { ar: "يحتاج التدريب الصيفي موافقة الكلية قبل البدء.", en: "Summer training requires college approval." }
      ]
    },
    {
      id: "squ",
      short: { ar: "SQU", en: "SQU" },
      name: { ar: "جامعة السلطان قابوس", en: "Sultan Qaboos University" },
      image: "assets/images/squ-logo.png",
      description: {
        ar: "لوائح عرضية لـ SQU تشمل مواعيد التسجيل وطلبات الوثائق.",
        en: "Demo rules for SQU covering registration windows and document requests."
      },
      rules: [
        { ar: "التسجيل الرئيسي يبدأ في 1 يونيو وينتهي في 14 يونيو.", en: "Main registration opens 1 June and closes 14 June." },
        { ar: "أرفق كشف علامات عند طلب إفادة طالب.", en: "Attach a transcript for student status letter requests." },
        { ar: "الحذف والإضافة يتم عبر النظام الإلكتروني خلال الفترة المحددة.", en: "Add/drop is processed through the e-system during the allowed window." }
      ]
    }
  ],
  demoPage: {
    eyebrow: { ar: "تجربة محلية حتمية", en: "Deterministic local experience" },
    title: { ar: "جرّب المساعد الأكاديمي", en: "Try the academic assistant" },
    intro: {
      ar: "كل إجابة أدناه مُعدّة مسبقاً من محتوى تجريبي موثّق، لذلك ستعمل بثبات على منصة العرض وهاتف الزائر.",
      en: "Every answer below is prebuilt from cited demo content, so it remains reliable on the presenter laptop and visitor phones."
    },
    choose: { ar: "اختر سيناريو", en: "Choose a scenario" },
    universityLabel: { ar: "الجامعة المحددة", en: "Selected university" },
    assistantName: { ar: "مساعد دليل الطالب", en: "Student Guide Assistant" },
    assistantStatus: { ar: "جاهز - لا يتصل بمزوّد ذكاء اصطناعي", en: "Ready - no AI provider connection" },
    sources: { ar: "المصادر المستخدمة", en: "Sources used" },
    previewForm: { ar: "معاينة النموذج", en: "Preview form" },
    createReminder: { ar: "إنشاء تذكير", en: "Create reminder" },
    reset: { ar: "إعادة ضبط التجربة", en: "Reset demo" },
    inputLabel: { ar: "اكتب سؤالاً تجريبياً", en: "Type a demo question" },
    inputPlaceholder: { ar: "مثال: كيف أسجل للتدريب الصيفي؟", en: "Example: How do I register for summer training?" },
    send: { ar: "إرسال", en: "Send" },
    hint: { ar: "جرّب كلمات: تدريب، تسجيل، حذف، شهادة", en: "Try: training, registration, withdrawal, certificate" },
    fallback: {
      ar: "في وضع العرض، أستطيع مساعدتك في التدريب الصيفي، وتسجيل المقررات، والحذف والإضافة، وطلبات الشهادات. اختر أحد السيناريوهات للمتابعة.",
      en: "In Event Demo Mode, I can help with summer training, course registration, add/drop, and certificate requests. Choose a scenario to continue."
    },
    reminderSaved: { ar: "تم حفظ التذكير محلياً على هذا الجهاز.", en: "Reminder saved locally on this device." },
    remindersTitle: { ar: "تذكيراتي التجريبية", en: "My demo reminders" },
    noReminders: { ar: "لا توجد تذكيرات بعد.", en: "No reminders yet." },
    deleteReminder: { ar: "حذف التذكير", en: "Delete reminder" }
  },
  technology: {
    eyebrow: { ar: "بنية مفهومة، لا صندوق أسود", en: "Explainable by design" },
    title: { ar: "إرشاد مرتبط بالسياق والمصدر", en: "Guidance grounded in context and sources" },
    intro: {
      ar: "يوضح النموذج كيف يمكن للاسترجاع المعزز بالسياق أن يربط سؤال الطالب بمقالات معرفة محددة، ثم يعيد إجابة قابلة للتتبّع.",
      en: "The demo shows how contextual retrieval can connect a student question to specific knowledge articles, then return a traceable answer."
    },
    flowTitle: { ar: "كيف تعمل التجربة", en: "How the demo works" },
    flow: [
      {
        icon: "library",
        title: { ar: "1. محتوى منظم", en: "1. Structured content" },
        text: { ar: "لوائح ونماذج ومواعيد تجريبية قابلة للاستبدال.", en: "Replaceable demo policies, forms, and dates." }
      },
      {
        icon: "scan-search",
        title: { ar: "2. استرجاع بالسياق", en: "2. Contextual retrieval" },
        text: { ar: "مطابقة نية السؤال بالسيناريو والمصادر المناسبة.", en: "Match the question intent to the right scenario and sources." }
      },
      {
        icon: "badge-check",
        title: { ar: "3. إجابة موثقة", en: "3. Cited guidance" },
        text: { ar: "خطوات واضحة مع مصدر ونموذج وتذكير اختياري.", en: "Clear steps with a source, form, and optional reminder." }
      }
    ],
    architectureTitle: { ar: "طبقات العرض التجريبي", en: "Demo architecture" },
    architecture: [
      {
        icon: "panels-top-left",
        title: { ar: "واجهات تفاعلية", en: "Interactive interfaces" },
        text: { ar: "موقع متجاوب، ثنائي اللغة، ومتاح بلوحة المفاتيح.", en: "Responsive, bilingual, and keyboard-accessible website." }
      },
      {
        icon: "brain-circuit",
        title: { ar: "محرك حتمي محلي", en: "Local deterministic engine" },
        text: { ar: "اختيار الإجابات من بيانات منظمة دون طلبات خارجية.", en: "Selects answers from structured data without external calls." }
      },
      {
        icon: "database-zap",
        title: { ar: "بيانات وتنبيهات محلية", en: "Local data and reminders" },
        text: { ar: "المحتوى في ملفات قابلة للاستبدال والتذكيرات على الجهاز.", en: "Replaceable content files and on-device reminders." }
      }
    ],
    privacyTitle: { ar: "الخصوصية من البداية", en: "Privacy from the start" },
    privacy: [
      { icon: "wifi-off", title: { ar: "لا اعتماد على الشبكة", en: "No network dependency" }, text: { ar: "العرض الأساسي يعمل بعد أول تحميل.", en: "The core demo works after the first load." } },
      { icon: "hard-drive", title: { ar: "تخزين على الجهاز", en: "On-device storage" }, text: { ar: "التذكيرات تبقى في متصفح المستخدم.", en: "Reminders stay in the user's browser." } },
      { icon: "shield-check", title: { ar: "لا بيانات شخصية", en: "No personal data" }, text: { ar: "لا يطلب العرض رقماً جامعياً أو هوية حقيقية.", en: "The demo asks for no real identity or student number." } },
      { icon: "eye", title: { ar: "مصادر ظاهرة", en: "Visible provenance" }, text: { ar: "كل توجيه مرتبط بمقال معرفة تجريبي.", en: "Every recommendation links to a demo knowledge article." } }
    ]
  },
  impact: {
    eyebrow: { ar: "أثر قابل للقياس", en: "Measurable by design" },
    title: { ar: "قيمة متوقعة للطالب والجامعة", en: "Projected value for students and the university" },
    intro: {
      ar: "هذه مؤشرات افتراضية للعرض وليست نتائج محققة. تبدأ أي تجربة فعلية بخط أساس واضح وقياس خاضع للمراجعة.",
      en: "These are illustrative projections, not achieved results. Any real pilot would begin with a clear baseline and reviewed measurement."
    },
    metricsTitle: { ar: "نتائج متوقعة", en: "Projected outcomes" },
    roadmapTitle: { ar: "خارطة طريق تجريبية", en: "Demo roadmap" },
    teamTitle: { ar: "فريق متعدد التخصصات", en: "Multidisciplinary capabilities" },
    methodTitle: { ar: "كيف نتحقق من الأثر", en: "How impact would be validated" },
    methodText: {
      ar: "نقارن زمن إنجاز المهمة، ونسبة إكمال الإجراء، وجودة الإجابة، ورضا الطالب قبل التجربة وبعدها، مع مراجعة بشرية للمصادر والردود.",
      en: "We would compare task time, process completion, answer quality, and student satisfaction before and after a pilot, with human review of sources and responses."
    }
  },
  scenarios: [
    {
      id: "summer-training",
      icon: "briefcase-business",
      keywords: ["تدريب", "صيفي", "training", "internship", "summer"],
      title: { ar: "التدريب الصيفي", en: "Summer training" },
      summary: { ar: "تحقق من الأهلية، المستندات، وخطوات التقديم.", en: "Check eligibility, documents, and application steps." },
      prompt: { ar: "كيف أسجل للتدريب الصيفي؟", en: "How do I register for summer training?" },
      answer: {
        ar: "يمكنك البدء بعد التأكد من إكمال 60 ساعة معتمدة في هذا المثال التجريبي. جهّز السيرة الذاتية وخطاب الجهة، ثم اتبع الخطوات التالية:",
        en: "In this fictional example, you can begin after completing 60 credit hours. Prepare your CV and host letter, then follow these steps:"
      },
      steps: {
        ar: ["راجع شروط الأهلية في دليل التدريب.", "اختر جهة تدريب وأرفق خطاب القبول.", "أرسل نموذج الطلب قبل 15 مايو 2026 (موعد تجريبي).", "تابع حالة الطلب من منسق التدريب."],
        en: ["Review eligibility in the training guide.", "Choose a host and attach its acceptance letter.", "Submit the form by 15 May 2026 (demo date).", "Follow the status with the training coordinator."]
      },
      citationIds: ["training-policy", "training-calendar"],
      formId: "training-request",
      reminder: { ar: "إرسال طلب التدريب الصيفي", en: "Submit summer training request" }
    },
    {
      id: "course-registration",
      icon: "book-open-check",
      keywords: ["تسجيل", "مقرر", "مواد", "registration", "course", "register"],
      title: { ar: "تسجيل المقررات", en: "Course registration" },
      summary: { ar: "رتب المقررات وتحقق من المتطلبات السابقة.", en: "Plan courses and check prerequisites." },
      prompt: { ar: "ما خطوات تسجيل مقررات الفصل؟", en: "What are the semester registration steps?" },
      answer: {
        ar: "ابدأ بخطتك الدراسية التجريبية وتحقق من عدم وجود تعارض أو متطلب سابق غير مكتمل:",
        en: "Start with your fictional study plan and check for schedule conflicts or incomplete prerequisites:"
      },
      steps: {
        ar: ["راجع الخطة والساعات المتبقية.", "ابحث عن الشعب المتاحة دون تعارض.", "أضف المقررات ثم راجع العبء الدراسي.", "أكد التسجيل واحفظ الملخص."],
        en: ["Review the plan and remaining credits.", "Find available sections without conflicts.", "Add courses and review the workload.", "Confirm registration and save the summary."]
      },
      citationIds: ["registration-guide", "academic-load"],
      formId: "registration-checklist",
      reminder: { ar: "تأكيد تسجيل المقررات", en: "Confirm course registration" }
    },
    {
      id: "add-drop",
      icon: "list-restart",
      keywords: ["حذف", "إضافة", "انسحاب", "withdraw", "drop", "add"],
      title: { ar: "الحذف والإضافة", en: "Withdrawal and addition" },
      summary: { ar: "افهم الأثر الزمني والأكاديمي قبل التغيير.", en: "Understand timing and academic impact before changing." },
      prompt: { ar: "هل يمكنني حذف مقرر وإضافة آخر؟", en: "Can I drop one course and add another?" },
      answer: {
        ar: "نعم خلال فترة الحذف والإضافة في هذا المثال، بشرط بقاء العبء ضمن الحد المسموح وعدم وجود تعارض:",
        en: "Yes, during the fictional add/drop window, provided your load remains within the allowed range and there is no conflict:"
      },
      steps: {
        ar: ["راجع الموعد النهائي التجريبي: 7 يوليو 2026.", "تحقق من الحد الأدنى للساعات.", "عاين أثر الحذف على الخطة والمكافأة.", "أرسل طلب التعديل واحتفظ بالتأكيد."],
        en: ["Check the demo deadline: 7 July 2026.", "Verify the minimum credit load.", "Preview the impact on your plan and stipend.", "Submit the change and keep the confirmation."]
      },
      citationIds: ["add-drop-policy", "academic-load"],
      formId: "add-drop-request",
      reminder: { ar: "مراجعة طلب الحذف والإضافة", en: "Review add/drop request" }
    },
    {
      id: "certificate-request",
      icon: "file-badge",
      keywords: ["شهادة", "إفادة", "وثيقة", "certificate", "letter", "document"],
      title: { ar: "طلبات الشهادات", en: "Certificate requests" },
      summary: { ar: "اختر الوثيقة والغرض وطريقة الاستلام.", en: "Choose the document, purpose, and delivery method." },
      prompt: { ar: "أحتاج إفادة طالب، ماذا أفعل؟", en: "I need a student status letter. What should I do?" },
      answer: {
        ar: "اختر نوع الإفادة واللغة والغرض. في هذا العرض التجريبي، تُجهّز الإفادة الرقمية خلال يومي عمل:",
        en: "Choose the letter type, language, and purpose. In this demo, a digital letter is prepared within two working days:"
      },
      steps: {
        ar: ["اختر إفادة طالب من قائمة الوثائق.", "حدد العربية أو الإنجليزية والغرض.", "راجع الاسم والفصل الظاهرين في المعاينة.", "أرسل الطلب وتابع إشعار الجاهزية."],
        en: ["Choose Student Status Letter from the document list.", "Select Arabic or English and the purpose.", "Review the displayed name and semester.", "Submit and watch for the ready notification."]
      },
      citationIds: ["certificate-services"],
      formId: "certificate-request",
      reminder: { ar: "متابعة جاهزية الإفادة", en: "Check certificate readiness" }
    }
  ],
  knowledge: [
    {
      id: "training-policy",
      category: { ar: "التدريب", en: "Training" },
      title: { ar: "دليل التدريب الصيفي التجريبي", en: "Demo Summer Training Guide" },
      excerpt: { ar: "أهلية الطالب، المستندات المطلوبة، ومسار الاعتماد.", en: "Student eligibility, required documents, and approval path." },
      detail: { ar: "مثال خيالي: يشترط إكمال 60 ساعة معتمدة وإرفاق خطاب قبول وسيرة ذاتية. يخضع الطلب لمراجعة منسق التدريب.", en: "Fictional example: students complete 60 credit hours and attach a host letter and CV. The training coordinator reviews the request." },
      updated: "2026-04-20"
    },
    {
      id: "training-calendar",
      category: { ar: "المواعيد", en: "Calendar" },
      title: { ar: "تقويم التدريب التجريبي 2026", en: "Demo Training Calendar 2026" },
      excerpt: { ar: "مواعيد افتراضية للتقديم والاعتماد وبداية التدريب.", en: "Illustrative application, approval, and start dates." },
      detail: { ar: "مثال خيالي: يغلق التقديم في 15 مايو، وتصدر الموافقات في 1 يونيو، ويبدأ التدريب في 15 يونيو 2026.", en: "Fictional example: applications close 15 May, approvals issue 1 June, and training begins 15 June 2026." },
      updated: "2026-04-20"
    },
    {
      id: "registration-guide",
      category: { ar: "التسجيل", en: "Registration" },
      title: { ar: "إرشادات التسجيل التجريبية", en: "Demo Registration Instructions" },
      excerpt: { ar: "خطوات اختيار الشعب وتأكيد الجدول.", en: "Steps for choosing sections and confirming a schedule." },
      detail: { ar: "مثال خيالي: يراجع الطالب الخطة والمتطلبات والتعارضات قبل تأكيد الجدول وحفظ ملخص التسجيل.", en: "Fictional example: the student reviews the plan, prerequisites, and conflicts before confirming and saving the registration summary." },
      updated: "2026-05-02"
    },
    {
      id: "academic-load",
      category: { ar: "العبء الدراسي", en: "Academic load" },
      title: { ar: "سياسة العبء الدراسي التجريبية", en: "Demo Academic Load Policy" },
      excerpt: { ar: "حدود الساعات وآلية طلب الاستثناء.", en: "Credit limits and the exception process." },
      detail: { ar: "مثال خيالي: العبء المعتاد من 12 إلى 18 ساعة. يحتاج ما دون أو فوق ذلك إلى موافقة المرشد.", en: "Fictional example: the normal load is 12 to 18 credits. A lower or higher load requires adviser approval." },
      updated: "2026-05-02"
    },
    {
      id: "add-drop-policy",
      category: { ar: "الحذف والإضافة", en: "Add/drop" },
      title: { ar: "لائحة الحذف والإضافة التجريبية", en: "Demo Add/Drop Policy" },
      excerpt: { ar: "الفترة الزمنية وأثر تعديل الجدول.", en: "The change window and schedule impact." },
      detail: { ar: "مثال خيالي: تنتهي فترة الحذف والإضافة في 7 يوليو 2026. يجب التحقق من العبء والمتطلبات قبل التأكيد.", en: "Fictional example: the add/drop window closes 7 July 2026. Students check load and prerequisites before confirming." },
      updated: "2026-05-12"
    },
    {
      id: "certificate-services",
      category: { ar: "الوثائق", en: "Documents" },
      title: { ar: "خدمات الوثائق التجريبية", en: "Demo Document Services" },
      excerpt: { ar: "أنواع الإفادات وخيارات اللغة والاستلام.", en: "Letter types, language options, and delivery." },
      detail: { ar: "مثال خيالي: تتوفر إفادة الطالب رقمياً بالعربية أو الإنجليزية خلال يومي عمل بعد مراجعة البيانات.", en: "Fictional example: a digital student status letter is available in Arabic or English within two working days after review." },
      updated: "2026-05-18"
    }
  ],
  forms: [
    {
      id: "training-request",
      title: { ar: "طلب تدريب صيفي - نموذج تجريبي", en: "Summer Training Request - Demo Form" },
      fields: [
        { label: { ar: "الجهة المستضيفة", en: "Host organization" }, value: { ar: "شركة التقنية النموذجية", en: "Demo Technology Company" } },
        { label: { ar: "فترة التدريب", en: "Training period" }, value: { ar: "15 يونيو - 15 أغسطس 2026", en: "15 June - 15 August 2026" } },
        { label: { ar: "المرفقات", en: "Attachments" }, value: { ar: "السيرة الذاتية، خطاب القبول", en: "CV, host acceptance letter" } }
      ]
    },
    {
      id: "registration-checklist",
      title: { ar: "قائمة تسجيل المقررات - نموذج تجريبي", en: "Course Registration Checklist - Demo Form" },
      fields: [
        { label: { ar: "الفصل", en: "Semester" }, value: { ar: "صيف 2026", en: "Summer 2026" } },
        { label: { ar: "الساعات المختارة", en: "Selected credits" }, value: { ar: "12 ساعة", en: "12 credits" } },
        { label: { ar: "حالة التعارض", en: "Conflict check" }, value: { ar: "لا يوجد تعارض", en: "No conflicts" } }
      ]
    },
    {
      id: "add-drop-request",
      title: { ar: "طلب حذف وإضافة - نموذج تجريبي", en: "Add/Drop Request - Demo Form" },
      fields: [
        { label: { ar: "المقرر المحذوف", en: "Course to drop" }, value: { ar: "BUS210 - مبادئ الإدارة", en: "BUS210 - Management Principles" } },
        { label: { ar: "المقرر المضاف", en: "Course to add" }, value: { ar: "TEC205 - الابتكار الرقمي", en: "TEC205 - Digital Innovation" } },
        { label: { ar: "العبء بعد التعديل", en: "Load after change" }, value: { ar: "15 ساعة", en: "15 credits" } }
      ]
    },
    {
      id: "certificate-request",
      title: { ar: "طلب إفادة طالب - نموذج تجريبي", en: "Student Status Letter - Demo Form" },
      fields: [
        { label: { ar: "نوع الوثيقة", en: "Document type" }, value: { ar: "إفادة طالب", en: "Student Status Letter" } },
        { label: { ar: "اللغة", en: "Language" }, value: { ar: "العربية", en: "Arabic" } },
        { label: { ar: "طريقة الاستلام", en: "Delivery" }, value: { ar: "نسخة رقمية", en: "Digital copy" } }
      ]
    }
  ],
  metrics: [
    { id: "response-time", icon: "timer-reset", value: "-70%", status: "projected", label: { ar: "زمن الوصول للإجابة", en: "Time to guidance" }, note: { ar: "مقارنة بالبحث اليدوي الافتراضي", en: "Compared with a hypothetical manual search" } },
    { id: "completion", icon: "list-checks", value: "+25%", status: "projected", label: { ar: "إكمال الإجراء من أول مرة", en: "First-time process completion" }, note: { ar: "بفضل الخطوات والنماذج المترابطة", en: "With linked steps and forms" } },
    { id: "routine-queries", icon: "messages-square", value: "-40%", status: "projected", label: { ar: "الاستفسارات الروتينية", en: "Routine support queries" }, note: { ar: "مع بقاء الحالات الحساسة للموظفين", en: "While sensitive cases stay with staff" } },
    { id: "availability", icon: "clock-3", value: "24/7", status: "projected", label: { ar: "توفر الإرشاد الأساسي", en: "Basic guidance availability" }, note: { ar: "عند نشر محتوى معتمد ومحدّث", en: "With approved, maintained content" } }
  ],
  roadmap: [
    { phase: { ar: "المرحلة 1", en: "Phase 1" }, title: { ar: "اختبار المحتوى", en: "Content pilot" }, text: { ar: "أربعة سيناريوهات، مراجعة بشرية، وقياس خط الأساس.", en: "Four scenarios, human review, and baseline measurement." } },
    { phase: { ar: "المرحلة 2", en: "Phase 2" }, title: { ar: "تكامل الخدمات", en: "Service integration" }, text: { ar: "نماذج آمنة، تسجيل دخول، وتنبيهات بموافقة المستخدم.", en: "Secure forms, sign-in, and consent-based notifications." } },
    { phase: { ar: "المرحلة 3", en: "Phase 3" }, title: { ar: "توسّع محكوم", en: "Governed scale" }, text: { ar: "مزيد من الكليات مع مراقبة الجودة والتحديث المستمر.", en: "More colleges with quality monitoring and continuous updates." } }
  ],
  team: [
    { icon: "compass", title: { ar: "المنتج والبحث", en: "Product & Research" }, text: { ar: "فهم احتياجات الطلبة، تحديد النطاق، وقياس النجاح.", en: "Student needs, scope definition, and success measurement." } },
    { icon: "book-key", title: { ar: "الذكاء الاصطناعي والمعرفة", en: "AI & Knowledge" }, text: { ar: "هندسة الاسترجاع، جودة المحتوى، وتقييم الإجابات.", en: "Retrieval design, content quality, and answer evaluation." } },
    { icon: "accessibility", title: { ar: "تصميم التجربة", en: "Experience Design" }, text: { ar: "لغة مفهومة، إتاحة، وتجربة ثنائية الاتجاه.", en: "Plain language, accessibility, and bidirectional UX." } },
    { icon: "code-xml", title: { ar: "الهندسة", en: "Engineering" }, text: { ar: "أداء موثوق، خصوصية، تكاملات، ومراقبة تشغيلية.", en: "Reliable performance, privacy, integrations, and operations." } }
  ],
  faq: [
    { q: { ar: "هل هذه خدمة جامعية رسمية؟", en: "Is this an official university service?" }, a: { ar: "لا. هذه تجربة فعالية للجامعة النموذجية، وجميع اللوائح والنماذج والبيانات خيالية.", en: "No. This is an event demo for Demo University; all policies, forms, and data are fictional." } },
    { q: { ar: "هل يستخدم العرض مزود ذكاء اصطناعي؟", en: "Does the demo call an AI provider?" }, a: { ar: "لا. الردود حتمية ومحلية لضمان ثبات العرض دون الاعتماد على شبكة الفعالية.", en: "No. Responses are deterministic and local so the event experience never depends on venue Wi-Fi." } },
    { q: { ar: "من أين تأتي الإجابات؟", en: "Where do answers come from?" }, a: { ar: "من مقالات معرفة تجريبية منظمة، وتظهر المراجع المستخدمة بجانب كل إجابة.", en: "From structured demo knowledge articles, with the sources shown beside every answer." } },
    { q: { ar: "هل يحفظ الموقع بيانات شخصية؟", en: "Does the site store personal data?" }, a: { ar: "لا يطلب بيانات شخصية. التذكيرات التجريبية فقط تُحفظ محلياً في المتصفح ويمكن حذفها أو إعادة ضبطها.", en: "It asks for no personal data. Only demo reminders are stored locally and can be deleted or reset." } },
    { q: { ar: "هل يعمل دون إنترنت؟", en: "Does it work offline?" }, a: { ar: "نعم، بعد أول تحميل عبر خادم آمن أو محلي، يخزن تطبيق الويب التقدمي الصفحات الأساسية للعرض دون اتصال.", en: "Yes. After the first load from a secure or local server, the PWA caches the core experience for offline use." } }
  ]
};
