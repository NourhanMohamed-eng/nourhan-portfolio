/**
 * Comprehensive Arabic (RTL) content and copy for Nourhan Mohamed's Portfolio.
 * Strictly adheres to truthfulness: no invented metrics, clients, or senior titles.
 * Feminine voice: speaking in first person ("قمتُ", "بنيتُ", "طالبة", "متاحة").
 * Technical labels and node names remain in Latin script per specification.
 */

export const siteMeta = {
  brand: "NOURHAN.MOHAMED",
  subBrand: "AUTOMATION LAB",
  status: "متاحة لمشاريع الأتمتة",
  headlineMono: "AI AUTOMATION / WORKFLOW DESIGN / SYSTEM INTEGRATION",
  headlineDisplay: "أحوّل العمليات المتكررة إلى أنظمة مؤتمتة.",
  headlineSubtitle:
    "أتمتة بالذكاء الاصطناعي وتصميم مسارات سير العمل باستخدام n8n وواجهات API ونماذج اللغة والتدفقات المنظمة.",
  heroCtaPrimary: "استكشف الأنظمة",
  heroCtaSecondary: "لنبنِ نظامًا معًا",
  footerTagline: "مبني حول العمليات، لا القوالب.",
};

export const navItems = [
  { id: "systems", label: "الأنظمة", href: "#systems" },
  { id: "approach", label: "المنهج", href: "#approach" },
  { id: "stack", label: "الأدوات", href: "#stack" },
  { id: "about", label: "عنّي", href: "#about" },
  { id: "contact", label: "تواصل", href: "#contact" },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nourhan-mohamed-ai",
    isActive: true,
  },
  {
    name: "خمسات",
    href: "https://khamsat.com/user/nourmohamed_23",
    isActive: true,
  },
  {
    name: "نفّذلي",
    href: "https://nafezly.com/u/Nourhan__Mohamed",
    isActive: true,
  },
  {
    name: "FreelanceYard",
    href: "https://freelanceyard.com/ar/freelancers/norhan-mhmd",
    isActive: true,
  },
  {
    name: "مستقل",
    // TODO: enable when approved
    href: "#",
    isActive: false,
    badge: "قيد المراجعة",
  },
  {
    name: "GitHub",
    href: "https://github.com/NourhanMohamed-eng",
    isActive: true,
  },
];

export const heroWorkflow = {
  label: "CORE WORKFLOW ARCHITECTURE",
  nodes: [
    { id: "input", label: "INPUT", sub: "Webhook / Trigger", type: "trigger", accent: "orange" },
    { id: "process", label: "PROCESS", sub: "Clean & Format", type: "action", accent: "blue" },
    { id: "ai", label: "AI LOGIC", sub: "Gemini / Prompt", type: "ai", accent: "violet" },
    { id: "decision", label: "DECISION", sub: "Routing & Logic", type: "logic", accent: "green" },
    { id: "action", label: "ACTION", sub: "Telegram / Sheets", type: "output", accent: "blue" },
  ],
  pulseIntervalMs: 3600,
};

export const systems = [
  {
    id: "system-01",
    monoTag: "WORKFLOW 01 / LEAD MANAGEMENT",
    title: "استقبال طلبات العملاء والتنبيهات المؤتمتة",
    summary:
      "سير عمل يستقبل بيانات العملاء عبر Webhook، ويستخرج الحقول المطلوبة، ثم يرسلها إلى Telegram وGmail وGoogle Sheets.",
    problem:
      "تحتاج بيانات العملاء الواردة إلى استقبال منظم وتنسيق وتخزين وإشعار للفريق المعني دون معالجة كل طلب يدويًا.",
    screenshot: "/screenshots/lead-capture.png",
    statusBadge: "EXECUTED ✓",
    tech: ["n8n", "Webhook", "Google Sheets", "Gmail", "Telegram", "Data Processing"],
    steps: [
      "طلب جديد يدخل النظام عبر Webhook للاستقبال.",
      "تنسيق وتنظيف البيانات الواردة وتحديد الحقول.",
      "توزيع البيانات تلقائيًا إلى وجهات متعددة بالتوازي.",
      "فريق المبيعات يستقبل إشعارًا فوريًا عبر Telegram.",
      "العميل يستقبل بريدًا ترحيبيًا وتأكيديًا تلقائيًا عبر Gmail.",
      "حفظ بيانات العميل في جدول CRM داخل Google Sheets.",
    ],
    myWork:
      "قمتُ ببناء Webhook للاستقبال، ومطابقة حقول العميل، وربط الوجهات الثلاث: Telegram وGmail وGoogle Sheets. كتبتُ نص البريد الترحيبي واختبرتُ سير العمل ببيانات تجريبية.",
    result:
      "عند إرسال طلب عميل، يتلقى فريق المبيعات رسالة عبر Telegram، ويصل العميل بريد ترحيبي، وتُحفظ البيانات في جدول CRM.",
    automationLogic:
      "يستقبل Webhook طلب HTTP POST يحتوي على بيانات العميل. تستخرج عقدة Edit Fields (Set) الاسم والبريد الإلكتروني ورقم الهاتف والخدمة المطلوبة من الطلب. ثم يتفرع سير العمل إلى ثلاثة إجراءات: إشعار فريق المبيعات برسالة Telegram، وإرسال بريد ترحيبي للعميل عبر Gmail، وحفظ بيانات العميل في جدول CRM على Google Sheets.",
    integrations: [
      { name: "n8n", role: "منسق سير العمل والأتمتة الرئيسي", category: "Core Engine" },
      { name: "Webhook", role: "مستقبل HTTP POST لالتقاط بيانات الطلبات", category: "Trigger" },
      { name: "Edit Fields (Set)", role: "استخراج حقول العميل وتنسيقها ومطابقتها", category: "Processing" },
      { name: "Telegram Bot API", role: "إرسال تنبيه فوري لمحادثة فريق المبيعات", category: "Messaging" },
      { name: "Gmail", role: "إرسال بريد ترحيبي وتأكيدي آلي للعميل", category: "Email" },
      { name: "Google Sheets", role: "حفظ وتخزين البيانات في جدول CRM مركزي", category: "Storage" },
    ],
    screenshotAlt: "واجهة سير عمل n8n توضح تفرع Webhook استقبال الطلبات إلى تنبيه Telegram وتأكيد Gmail وإضافة صف في Google Sheets.",
    nodes: [
      {
        id: "s1-node-1",
        name: "Lead Submission",
        rawCanvasName: "Lead from Submision",
        type: "Webhook Trigger",
        subtitle: "POST",
        executionCount: "1 item",
        role: "يستقبل البيانات الخام عبر طلب POST عند إرسال النموذج.",
        purpose: "نقطة الدخول التي تُطلق دورة الأتمتة بالكامل فور وصول طلب العميل.",
        input: "طلب HTTP POST يتضمن كائن JSON لبيانات النموذج",
        processing: "الاستماع إلى الـ Webhooks الواردة واستقبال حمولة البيانات فور إرسالها",
        output: "سجل بيانات العميل المحتمل (الاسم، وسيلة التواصل، الخدمة المطلوبة)",
        connections: "مسار مباشر إلى عقدة Format & Clean Data",
      },
      {
        id: "s1-node-2",
        name: "Format & Clean Data",
        type: "Edit Fields",
        subtitle: "manual",
        executionCount: "1 item",
        role: "استخراج حقول العميل ومطابقتها.",
        purpose: "استخراج حقول الاسم والبريد الإلكتروني ورقم الهاتف والخدمة المطلوبة.",
        input: "بيانات طلب HTTP POST المحتوية على تفاصيل العميل",
        processing: "استخراج حقول الاسم والبريد ورقم الهاتف والخدمة من الطلب",
        output: "الحقول المستخرجة: الاسم، البريد، الهاتف، الخدمة المطلوبة",
        connections: "تفرع متوازي إلى Telegram وGmail وGoogle Sheets",
      },
      {
        id: "s1-node-3",
        name: "Notify Sales Team",
        type: "Telegram",
        subtitle: "sendMessage: message",
        executionCount: "1 item",
        role: "إرسال تنبيه عاجل إلى محادثة فريق المبيعات.",
        purpose: "تمكين الاستجابة الفورية لاستفسارات وطلبات العملاء الواردة.",
        input: "بيانات العميل المنسقة",
        processing: "بناء رسالة تنبيه منسقة بصيغة Markdown وإرسالها عبر Telegram Bot API",
        output: "إشعار محادثة مرسل لفريق المبيعات",
        connections: "العقدة النهائية لمسار تنبيه المبيعات",
      },
      {
        id: "s1-node-4",
        name: "Send Welcome Email",
        type: "Gmail",
        subtitle: "send: message",
        executionCount: "1 item",
        role: "إرسال بريد ترحيب وتأكيد فوري للعميل.",
        purpose: "تقديم تأكيد فوري للعميل المحتمل دون تدخل بشري يدوي.",
        input: "عنوان بريد العميل وتفاصيل طلبه",
        processing: "تعبئة قالب البريد الإلكتروني وإرساله عبر تكامل Gmail",
        output: "تأكيد بريدي تم إرساله للعميل",
        connections: "العقدة النهائية لمسار البريد الإلكتروني",
      },
      {
        id: "s1-node-5",
        name: "Append to CRM sheet",
        type: "Google Sheets",
        subtitle: "read: sheet",
        executionCount: "1 item",
        role: "حفظ وتخزين بيانات العميل في جدول CRM الرئيسي.",
        purpose: "توثيق بيانات العملاء المحتملين في سجل موحد لمتابعتها لاحقًا.",
        input: "معلمات وسجلات العميل",
        processing: "إضافة صف منظم إلى ورقة عمل Google Sheets المحددة",
        output: "سجل مضاف إلى جدول البيانات",
        connections: "العقدة النهائية لمسار التخزين في CRM",
      },
    ],
  },
  {
    id: "system-02",
    monoTag: "WORKFLOW 02 / AI AGENT",
    title: "وكيل ذكاء اصطناعي لدعم العملاء",
    summary:
      "سير عمل لوكيل ذكاء اصطناعي يجيب على رسائل Telegram باستخدام نموذج محادثة Google Gemini وذاكرة للحوار وقاعدة معرفة على Google Sheets.",
    problem:
      "تتطلب استفسارات خدمة العملاء فهمًا لسياق الحديث وذاكرة للمحادثة الجارية والبحث المباشر في المعلومات دون الاقتصار على قوائم خيارات جامدة.",
    screenshot: "/screenshots/ai-support-agent.png",
    statusBadge: "EXECUTED ✓",
    tech: ["n8n", "AI Agent", "Google Gemini", "Memory", "Google Sheets", "Telegram", "LLM"],
    steps: [
      "يرسل العميل استفساره عبر محادثة Telegram.",
      "تستقبل الرسالة نقطة البدء وتمررها إلى سير عمل وكيل الذكاء الاصطناعي عبر LangChain.",
      "يستحضر الوكيل سياق الرسائل السابقة من مخزن الذاكرة.",
      "يستدعي الوكيل أداة Google Sheets للبحث عن بيانات المنتجات أو الخدمات عند الحاجة.",
      "يدمج نموذج Gemini سياق الحديث والبيانات المسترجعة وقصد المستخدم لصياغة الرد.",
      "يُرسل الرد المنسق إلى العميل مباشرة عبر Telegram.",
    ],
    myWork:
      "قمتُ ببناء وكيل الذكاء الاصطناعي في n8n وربطته بنموذج محادثة Gemini، وذاكرة للمحادثة، وأداة Google Sheets. كتبتُ رسالة النظام (System Message) ليجيب الوكيل استنادًا إلى جدول البيانات فقط دون اختلاق معلومات، وضبطتُ خطوات استقبال رسائل Telegram والرد عليها.",
    result:
      "صُمّم الوكيل للرد عبر Telegram بالاعتماد على ذاكرة المحادثة والمعلومات المستخرجة من Google Sheets.",
    automationLogic:
      "يستقبل مشغل Telegram Trigger رسالة العميل ويمررها إلى وكيل الذكاء الاصطناعي (AI Agent). توجّه رسالة النظام الوكيل للإجابة فقط من قاعدة المعرفة المخزنة في Google Sheets وعدم اختلاق معلومات. عندما يتطلب الاستفسار بيانات الشركة، يستدعي الوكيل أداة Google Sheets لقراءة الصفوف، ثم يصيغ نموذج المحادثة Gemini الرد ويُرسل للعميل عبر Telegram. وتحافظ ذاكرة المحادثة على سياق الحوار عبر الرسائل المتتالية.",
    aiLayer: {
      model: "نموذج محادثة Google Gemini يولد ردود الوكيل الحوارية.",
      memory: "ذاكرة Simple Memory تحتفظ بآخر الرسائل لضمان ترابط سياق المحادثة.",
      tools: "أداة Google Sheets تتيح للوكيل قراءة الصفوف من جدول قاعدة بيانات الدعم.",
      architecture: "نمط وكلاء LangChain المعياري بمنافذ مخصصة للنموذج (Model) والذاكرة (Memory) واستدعاء الأدوات (Tool Calling).",
    },
    integrations: [
      { name: "n8n", role: "منسق سير العمل والأتمتة", category: "Core Engine" },
      { name: "AI Agent", role: "معالجة الرسائل وتحديد وقت استخدام الأداة", category: "AI Agent" },
      { name: "Google Gemini", role: "نموذج لغوي كبير (LLM) لتوليد الإجابات", category: "AI & Model" },
      { name: "Simple Memory", role: "مخزن مؤقت لجلسات الحوار المتعددة", category: "Memory" },
      { name: "Google Sheets Tool", role: "استرجاع مباشر لبيانات المعرفة والدعم", category: "Tool Calling" },
      { name: "Telegram Bot API", role: "قناة تواصل تفاعلية ثنائية الاتجاه مع العميل", category: "Messaging" },
    ],
    screenshotAlt: "واجهة سير عمل n8n توضح وكيل LangChain للذكاء الاصطناعي متصلًا بنموذج Google Gemini وذاكرة Simple Memory وأداة Google Sheets ومدخلات ومخرجات Telegram.",
    nodes: [
      {
        id: "s2-node-1",
        name: "Incoming Customer Message",
        type: "Telegram Trigger",
        subtitle: "Updates: message",
        executionCount: "1 item",
        role: "التقاط الرسائل الواردة عبر محادثات Telegram.",
        purpose: "الاستماع لاستفسارات العملاء وتمريرها إلى وكيل الذكاء الاصطناعي فور وصولها.",
        input: "كائن تحديث رسالة Telegram (معرّف المحادثة، نص الرسالة، بيانات المستخدم)",
        processing: "استخراج نص السؤال وتمرير سياق المستخدم إلى الوكيل",
        output: "حمولة رسالة المستخدم المنسقة",
        connections: "يتصل مباشرة بوكيل الذكاء الاصطناعي المركزي",
      },
      {
        id: "s2-node-2",
        name: "AI Agent",
        type: "AI Agent",
        subtitle: "Conversational Agent",
        executionCount: "1 item",
        role: "محرك التفكير المركزي لإدارة السياق والذاكرة واستدعاء الأدوات.",
        purpose: "تحديد متى يستدعي الأدوات أو الذاكرة لصياغة إجابات دقيقة بناءً على تعليمات النظام.",
        input: "سؤال المستخدم + سجل الذاكرة + مخرجات البحث في الأدوات",
        processing: "تقييم القصد، واستدعاء الأدوات عند الحاجة لمعلومات، وتوجيه نموذج Gemini",
        output: "نص الرد المجمّع والمُصاغ من الذكاء الاصطناعي",
        connections: "متصل بثلاثة موارد فرعية بالأسفل، ومخرجاته تتصل بعقدة Send AI Reply",
        subConnections: [
          {
            id: "s2-sub-1",
            portName: "Chat Model*",
            nodeName: "Google Gemini Chat Model",
            name: "Google Gemini Chat Model",
            type: "Chat Model",
            subtitle: "Model",
            badgeCount: "2 items total",
            role: "نموذج محادثة لغوي يوفّر قدرات التوليد اللغوي للوكيل.",
            purpose: "توليد ردود حوارية لوكيل الذكاء الاصطناعي بناءً على السياق والأوامر.",
            input: "الأمر المنسق والبيانات المسترجعة من وكيل الذكاء الاصطناعي",
            processing: "تطبيق الاستدلال اللغوي عبر واجهة برمجية Google Gemini API",
            output: "رموز النص المولد الممررة إلى الوكيل",
            connections: "مربوط كمنفذ Chat Model فرعي بوكيل الذكاء الاصطناعي",
          },
          {
            id: "s2-sub-2",
            portName: "Memory",
            nodeName: "Simple Memory",
            name: "Simple Memory",
            type: "Memory",
            subtitle: "Memory",
            badgeCount: "2 items total",
            role: "الاحتفاظ بحالة الجلسة والرسائل السابقة لضمان ترابط الحوار.",
            purpose: "تخزين الرسائل الأخيرة لتمكين الحوار متعدد الأدوار من الاحتفاظ بالسياق.",
            input: "مدخلات سجل الرسائل ومعرّفات الجلسة",
            processing: "إدارة مخزن مؤقت للرسائل في الذاكرة لجلسة المحادثة النشطة",
            output: "سياق المحادثة السابق ممررًا إلى نص التوجيه للوكيل",
            connections: "مربوط كمنفذ Memory فرعي بوكيل الذكاء الاصطناعي",
          },
          {
            id: "s2-sub-3",
            portName: "Tool",
            nodeName: "Get row(s) in sheet in Google Sheets",
            name: "Get row(s) in sheet in Google Sheets",
            type: "Google Sheets Tool",
            subtitle: "read: sheet",
            badgeCount: "4 items",
            role: "يتيح للوكيل البحث واستخراج الصفوف من جدول المعرفة.",
            purpose: "تمكين الوكيل من البحث عن بيانات الدعم والعمليات داخل Google Sheets.",
            input: "معلمات البحث أو استعلام الصفوف الصادر من الوكيل",
            processing: "قراءة الصفوف المطابقة من جدول بيانات الدعم المحدد",
            output: "بيانات الصفوف المستخرجة كمخرجات للأداة تُسلّم للوكيل",
            connections: "مربوط كمنفذ Tool فرعي ديناميكي بوكيل الذكاء الاصطناعي",
          },
        ],
      },
      {
        id: "s2-node-3",
        name: "Send AI Reply",
        type: "Telegram",
        subtitle: "sendMessage: message",
        executionCount: "1 item",
        role: "تسليم الرد المُولّد إلى العميل عبر المحادثة.",
        purpose: "إكمال دورة المحادثة وإرسال الجواب إلى Telegram.",
        input: "معرّف المحادثة المستهدفة ونص إجابة الذكاء الاصطناعي",
        processing: "إرسال الرد إلى Telegram Bot API مع تنسيق الخطوط والعناصر",
        output: "إيصال تسليم الرسالة",
        connections: "العقدة النهائية لمسار محادثة العميل",
      },
    ],
  },
  {
    id: "system-03",
    monoTag: "WORKFLOW 03 / REPORTING & MONITORING",
    title: "التقارير اليومية المؤتمتة والتنبيهات الإدارية",
    summary:
      "سير عمل مجدول يعمل يوميًا عند الساعة 9:00 صباحًا، يقرأ بيانات العمليات من Google Sheets، ويحسب مؤشرات الأداء (KPIs) في عقدة Code، ثم يرسل الملخص عبر Telegram وGmail.",
    problem:
      "تحتاج بيانات العمليات اليومية إلى جمع وحساب وتقارير صباحية دون الحاجة إلى تلخيص الصفوف يدويًا وكتابة رسائل بريد متكررة كل يوم.",
    screenshot: "/screenshots/daily-reporting.png",
    statusBadge: "EXECUTED ✓",
    tech: ["n8n", "Schedule Trigger", "Google Sheets", "Data Processing", "KPI Calculation", "Telegram", "Gmail"],
    pipelineStrip: ["RAW DATA", "PROCESSING", "KPI", "REPORT", "DECISION"],
    steps: [
      "تفعيل المشغل المجدول يوميًا في تمام الساعة 9:00 صباحًا.",
      "جلب صفوف بيانات العمليات الحديثة من Google Sheets.",
      "عقدة Code تعالج السجلات الخام وتحسب مؤشرات الأداء الرئيسية.",
      "إرسال تنبيه بملخص المؤشرات (KPIs) إلى قناة المدير عبر Telegram.",
      "تنسيق تقرير إداري مفصل وإرساله للمسؤولين عبر بريد Gmail.",
    ],
    myWork:
      "ضبطتُ الجدولة اليومية، وربطتُ خطوة قراءة Google Sheets، وبنيتُ عقدة Code تحسب مؤشرات الأداء الرئيسية (KPIs). كتبتُ كود JavaScript بمساعدة الذكاء الاصطناعي، ثم ربطتُ النتائج بـ Telegram وGmail ونسقتُ رسائل التقارير.",
    result:
      "في كل صباح يُنتج سير العمل ملخصًا لمؤشرات الأداء للمدير عبر Telegram وتقرير HTML مفصل عبر البريد الإلكتروني، دون إعداد يدوي للتقارير.",
    automationLogic:
      "يعمل Schedule Trigger يوميًا في تمام الساعة 9:00 صباحًا. يقرأ سير العمل بيانات عمليات اليوم من Google Sheets ويمررها إلى عقدة Code، والتي تحسب إجمالي المبيعات، وإجمالي الطلبات، والطلبات المكتملة والمعلقة، ومتوسط قيمة الطلب. تُرسل النتيجة بعد ذلك بطريقتين: ملخص مؤشرات أداء للمدير عبر Telegram، وتقرير HTML عبر Gmail.",
    integrations: [
      { name: "n8n", role: "منسق سير العمل والأتمتة الرئيسي", category: "Core Engine" },
      { name: "Schedule Trigger", role: "تنفيذ مجدول (Cron) عند الساعة 9:00 صباحًا يوميًا", category: "Trigger" },
      { name: "Google Sheets", role: "استعلام قاعدة بيانات العمليات لاستخراج السجلات", category: "Storage" },
      { name: "Code Node (JavaScript)", role: "منطق حساب وتجميع مؤشرات الأداء (KPIs)", category: "Computation" },
      { name: "Telegram Bot API", role: "بث تنبيهات لوحة تحكم الإدارة الفورية", category: "Messaging" },
      { name: "Gmail", role: "إرسال التقرير الإداري اليومي عبر البريد الإلكتروني", category: "Email" },
    ],
    screenshotAlt: "واجهة سير عمل n8n توضح Schedule Trigger عند الساعة 9:00 صباحًا يجلب صفوف Google Sheets، ويحسب المؤشرات في عقدة Code، ويوزع التقارير إلى Telegram وGmail.",
    nodes: [
      {
        id: "s3-node-1",
        name: "Daily Trigger 9 AM",
        type: "Schedule Trigger",
        subtitle: "Cron 9:00 AM",
        executionCount: "1 item",
        role: "مشغل زمني يبدأ آليًا كل صباح.",
        purpose: "بدء دورة الحساب والمتابعة اليومية في الموعد المحدد.",
        input: "حدث زمني مجدول من ساعة النظام",
        processing: "إطلاق إشارة البدء عند الساعة 09:00 بالتوقيت المحلي يوميًا",
        output: "بيانات الطابع الزمني للتشغيل",
        connections: "يتصل بعقدة Fetch Daily Operations",
      },
      {
        id: "s3-node-2",
        name: "Fetch Daily Operations",
        type: "Google Sheets",
        subtitle: "read: sheet",
        executionCount: "4 items",
        role: "استعلام قاعدة بيانات العمليات لجلب أحدث السجلات.",
        purpose: "استرجاع الصفوف التي تحتوي على سجلات المهام اليومية والمقاييس.",
        input: "معرّف جدول البيانات المستهدف ونطاق ورقة العمل",
        processing: "سحب الصفوف الحديثة المطابقة لمعايير الاستعلام",
        output: "مصفوفة سجلات العمليات التشغيلية",
        connections: "يمرر البيانات إلى Calculate KPI Metrics",
      },
      {
        id: "s3-node-3",
        name: "Calculate KPI Metrics",
        type: "Code",
        subtitle: "{ }",
        executionCount: "1 item",
        role: "تنفيذ منطق حسابي بلغة JavaScript على السجلات الخام.",
        purpose: "حساب المبيعات وإجماليات الطلبات والمتوسطات الحسابية.",
        input: "بيانات الصفوف الخام من Google Sheets",
        processing: "تحويل الأرقام، وتجميع الإجماليات، وحساب مؤشرات الأداء، وتنسيق الملخصات",
        output: "كائن مؤشرات أداء (KPIs) مجمّع ومحسوب",
        connections: "يتفرع بالتوازي إلى Telegram وGmail",
      },
      {
        id: "s3-node-4",
        name: "Send KPI Summary to Admin",
        type: "Telegram",
        subtitle: "sendMessage: message",
        executionCount: "1 item",
        role: "بث المؤشرات والملخص إلى محادثة الإدارة.",
        purpose: "توفير اطلاع فوري ومباشر على الهاتف للمؤشرات الحيوية.",
        input: "نص ملخص مؤشرات الأداء المحسوبة",
        processing: "بناء رسالة لوحة تحكم موجزة وإرسالها إلى Telegram",
        output: "تنبيه محادثة تم تسليمه للإدارة",
        connections: "العقدة النهائية لمسار إشعار الإدارة",
      },
      {
        id: "s3-node-5",
        name: "Email Executive Report",
        type: "Gmail",
        subtitle: "send: message",
        executionCount: "1 item",
        role: "تقرير يومي يُرسل إلى قائمة التوزيع الإدارية.",
        purpose: "توفير ملخص يومي منظم بصيغة بريد إلكتروني.",
        input: "ملخص وتفصيل مؤشرات الأداء المحسوبة",
        processing: "إنشاء بريد تقرير بصيغة HTML وإرساله عبر Gmail API",
        output: "تقرير بريد إلكتروني تم إرساله",
        connections: "العقدة النهائية لمسار تقرير البريد الإلكتروني",
      },
    ],
  },
];

export const approachSteps = [
  {
    step: "01",
    title: "رصد التكرار",
    description: "تحديد الخطوات اليدوية المتكررة التي تستهلك وقت الفريق فيما يمكن للبرمجيات إنجازه بدقة.",
  },
  {
    step: "02",
    title: "رسم المسار",
    description: "فهم نقاط البداية (Triggers)، وتنسيق البيانات، وتفرعات اتخاذ القرار، والمخرجات المتوقعة قبل لمس أي أداة.",
  },
  {
    step: "03",
    title: "أتمتة الروابط",
    description: "ربط واجهات برمجة التطبيقات (APIs) وأدوات العمل والـ Webhooks ونماذج الذكاء الاصطناعي في تدفقات منظمة وقوية.",
  },
  {
    step: "04",
    title: "تحقيق الفائدة الملموسة",
    description: "تحويل سير العمل إلى أثر عملي ملموس يوفر المجهود اليدوي، ويمنع الأخطاء، ويسرّع تدفق المعلومات.",
  },
];

export const techStack = {
  groups: [
    {
      category: "Automation",
      skills: ["n8n", "Zapier", "Workflow Design"],
    },
    {
      category: "AI & LLM",
      skills: ["LLMs", "AI Agents", "Prompt Engineering", "Google Gemini", "RAG"],
    },
    {
      category: "Integration",
      skills: ["REST APIs", "Webhooks", "JSON", "Google Sheets", "Gmail", "Telegram"],
    },
    {
      category: "Programming",
      skills: ["Python", "JavaScript", "Java", "C++"],
    },
    {
      category: "Web & Systems",
      skills: ["HTML5", "CSS3", "DOM", "LocalStorage"],
    },
  ],
  toolboxChain: [
    "n8n",
    "APIs",
    "AI / LLMs",
    "Google Sheets",
    "Gmail",
    "Telegram",
    "Webhooks",
  ],
};

export const aboutMe = {
  label: "06 / BEHIND THE WORK",
  title: "خلف العمل",
  bio: "طالبة في كلية الحاسبات والمعلومات، أعمل على صقل مهاراتي في أتمتة العمليات بالذكاء الاصطناعي وتصميم مسارات سير العمل. تركيزي الحالي هو بناء أنظمة أتمتة عملية باستخدام n8n والذكاء الاصطناعي وواجهات برمجة التطبيقات (APIs) وربط أدوات الأعمال. يثير اهتمامي بشكل خاص تحويل العمليات اليدوية المتكررة إلى تدفقات مؤتمتة ومنظمة.",
  facts: [
    "بكالوريوس الحاسبات والمعلومات (الجامعة المصرية للتعلم الإلكتروني EELU)",
    "مبادرة DEPI — الذكاء الاصطناعي والأتمتة المتقدمة عبر n8n",
    "خلفية في الأمن السيبراني (Cyber Security)",
    "مشاريع عملية في أتمتة مسارات العمل وتدفق البيانات",
  ],
};

export const contactInfo = {
  label: "07 / CONTACT",
  title: "هل لديك عملية تستحق الأتمتة؟",
  description:
    "أخبرني بما تفعله يدويًا حاليًا، وسأساعدك في رسم مسار العملية وتحديد أين يمكن للأتمتة أن تنسجم.",
  ctaText: "ابدأ محادثة",
  email: "an3005752@gmail.com",
  mailtoHref: "mailto:an3005752@gmail.com?subject=Automation%20project%20inquiry",
  primaryLinks: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nourhan-mohamed-ai",
      ariaLabel: "نورهان محمد على LinkedIn",
    },
    {
      name: "خمسات",
      href: "https://khamsat.com/user/nourmohamed_23",
      ariaLabel: "نورهان محمد على خمسات",
    },
  ],
  secondaryLinks: [
    {
      name: "نفّذلي",
      href: "https://nafezly.com/u/Nourhan__Mohamed",
      ariaLabel: "نورهان محمد على نفّذلي",
      isActive: true,
    },
    {
      name: "FreelanceYard",
      href: "https://freelanceyard.com/ar/freelancers/norhan-mhmd",
      ariaLabel: "نورهان محمد على FreelanceYard",
      isActive: true,
    },
    {
      name: "مستقل",
      // TODO: enable when approved
      href: null,
      ariaLabel: "نورهان محمد على مستقل (قيد المراجعة)",
      isActive: false,
      badge: "قيد المراجعة",
    },
    {
      name: "GitHub",
      href: "https://github.com/NourhanMohamed-eng",
      ariaLabel: "نورهان محمد على GitHub",
      isActive: true,
    },
  ],
};
