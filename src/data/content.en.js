/**
 * Comprehensive English content and copy for Nourhan Mohamed's Portfolio.
 * Strictly adheres to truthfulness: no invented metrics, clients, or senior titles.
 */

export const siteMeta = {
  brand: "NOURHAN.MOHAMED",
  subBrand: "AUTOMATION LAB",
  status: "Available for Automation Projects",
  headlineMono: "AI AUTOMATION / WORKFLOW DESIGN / SYSTEM INTEGRATION",
  headlineDisplay: "I Turn Repetitive Processes Into Automated Systems.",
  headlineSubtitle:
    "AI Automation & Workflow Automation with n8n, APIs, LLMs and intelligent workflows.",
  footerTagline: "Built around processes, not templates.",
};

export const navItems = [
  { id: "systems", label: "Systems", href: "#systems" },
  { id: "approach", label: "Approach", href: "#approach" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    href: "#", // TODO: verify LinkedIn profile URL
    isPlaceholder: true,
  },
  {
    name: "GitHub",
    href: "#", // TODO: verify GitHub profile URL
    isPlaceholder: true,
  },
  {
    name: "Email",
    href: "mailto:nourhan@example.com?subject=Automation%20Inquiry%20from%20Portfolio", // TODO: verify primary email address
    isPlaceholder: true,
  },
  {
    name: "Mostaql",
    href: "#", // TODO: verify Mostaql profile URL
    isPlaceholder: true,
  },
  {
    name: "Khamsat",
    href: "#", // TODO: verify Khamsat profile URL
    isPlaceholder: true,
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
    title: "Lead Capture & Notifications",
    summary:
      "Captures incoming lead submissions via webhook, sanitizes and structures data, and orchestrates simultaneous delivery to sales chat, confirmation email, and CRM spreadsheet.",
    problem:
      "Incoming leads need to be captured, cleaned, stored, and communicated to the relevant team without manually processing every submission.",
    screenshot: "/screenshots/lead-capture.png",
    statusBadge: "EXECUTED ✓",
    tech: ["n8n", "Webhook", "Google Sheets", "Gmail", "Telegram", "Data Processing"],
    steps: [
      "A new lead enters through a submission webhook.",
      "The incoming data is cleaned and formatted.",
      "The workflow distributes the information to multiple destinations.",
      "The sales team receives a Telegram notification.",
      "The lead receives a welcome email.",
      "The lead information is appended to the CRM sheet.",
    ],
    myWork:
      "Designed the webhook trigger payload schema, configured data cleaning nodes, mapped fields for multi-channel broadcasting, and tested execution across Telegram, Gmail, and Google Sheets.",
    result:
      "The sales team receives immediate Telegram notifications, while leads receive automated confirmation emails and records are appended to Google Sheets in real-time.",
    nodes: [
      {
        id: "s1-node-1",
        name: "Lead Submission", // Display name per spec (original n8n canvas had typo "Submision")
        rawCanvasName: "Lead from Submision",
        type: "Webhook Trigger",
        subtitle: "POST",
        executionCount: "1 item", // Execution UI state only
        role: "Receives raw payload via POST request upon form submission.",
        purpose: "Entry point that triggers the entire automation cycle.",
        input: "HTTP POST request with form submission JSON",
        processing: "Listens for incoming webhooks and validates incoming payload structure",
        output: "Raw lead record (name, contact, service requirements)",
        connections: "Direct edge to Format & Clean Data",
      },
      {
        id: "s1-node-2",
        name: "Format & Clean Data",
        type: "Edit Fields",
        subtitle: "manual",
        executionCount: "1 item",
        role: "Sanitizes and standardizes incoming fields.",
        purpose: "Ensures uniform data formatting before CRM and email dissemination.",
        input: "Raw webhook JSON object",
        processing: "Trims whitespace, normalizes phone and email formats, formats timestamps",
        output: "Structured lead object ready for downstream tools",
        connections: "Branches concurrently to Telegram, Gmail, and Google Sheets",
      },
      {
        id: "s1-node-3",
        name: "Notify Sales Team",
        type: "Telegram",
        subtitle: "sendMessage: message",
        executionCount: "1 item",
        role: "Delivers high-priority alert to sales team chat.",
        purpose: "Enables instant response times for incoming client inquiries.",
        input: "Formatted lead details",
        processing: "Constructs formatted markdown alert message and dispatches via Telegram Bot API",
        output: "Delivered chat notification",
        connections: "Terminal node for sales alert branch",
      },
      {
        id: "s1-node-4",
        name: "Send Welcome Email",
        type: "Gmail",
        subtitle: "send: message",
        executionCount: "1 item",
        role: "Dispatches welcome and confirmation email to the lead.",
        purpose: "Provides immediate confirmation to the prospect without manual intervention.",
        input: "Lead email address and personalized details",
        processing: "Fills email template and triggers delivery via Gmail integration",
        output: "Sent email confirmation",
        connections: "Terminal node for email branch",
      },
      {
        id: "s1-node-5",
        name: "Append to CRM sheet",
        type: "Google Sheets",
        subtitle: "read: sheet", // As visible on n8n screenshot
        executionCount: "1 item",
        role: "Persists lead information into master CRM spreadsheet.",
        purpose: "Centralizes prospect data for pipeline tracking and auditing.",
        input: "Sanitized lead parameters",
        processing: "Appends structured row to the specified Google Sheets worksheet",
        output: "Appended spreadsheet record",
        connections: "Terminal node for CRM storage branch",
      },
    ],
  },
  {
    id: "system-02",
    monoTag: "WORKFLOW 02 / AI AGENT",
    title: "AI Customer Support Agent",
    summary:
      "An intelligent conversational workflow integrating Google Gemini with persistent conversation memory and Google Sheets data lookup to deliver context-aware support on Telegram.",
    problem:
      "Customer support queries require contextual understanding, memory of ongoing conversations, and live knowledge lookup without static rigid menus.",
    screenshot: "/screenshots/ai-support-agent.png",
    statusBadge: "EXECUTED ✓",
    tech: ["n8n", "AI Agent", "Google Gemini", "Memory", "Google Sheets", "Telegram", "LLM"],
    steps: [
      "Customer sends a question through Telegram.",
      "The message triggers the LangChain AI Agent workflow.",
      "AI Agent recalls past conversation context from memory buffer.",
      "AI Agent invokes the Google Sheets tool to retrieve product/service data when necessary.",
      "Gemini Chat Model synthesizes context, retrieved data, and user intent.",
      "Formatted response is dispatched back to the customer on Telegram.",
    ],
    myWork:
      "Configured LangChain agent parameters inside n8n, connected Google Gemini chat model, established conversational memory buffer, attached Google Sheets retrieval tool, and mapped Telegram triggers and outputs.",
    result:
      "Customers receive personalized, context-aware responses backed by live spreadsheet knowledge, without hallucinating out-of-context replies.",
    nodes: [
      {
        id: "s2-node-1",
        name: "Incoming Customer Message",
        type: "Telegram Trigger",
        subtitle: "Updates: message",
        executionCount: "1 item",
        role: "Detects incoming Telegram chat messages.",
        purpose: "Listens for customer inquiries and feeds prompt to the AI agent.",
        input: "Telegram message update object (chat ID, message text, user info)",
        processing: "Extracts query string and passes user context to downstream agent",
        output: "User message payload",
        connections: "Feeds into central AI Agent",
      },
      {
        id: "s2-node-2",
        name: "AI Agent",
        type: "AI Agent",
        subtitle: "Conversational Agent",
        executionCount: "1 item",
        role: "Central reasoning engine managing context, memory, and tools.",
        purpose: "Decides when to use tools or memory to formulate accurate answers.",
        input: "User query + history from memory + tool lookup outputs",
        processing: "Evaluates intent, queries tools if data is required, prompts Gemini model",
        output: "Synthesized AI response text",
        connections: "Connected to 3 sub-resources below, and outputs to Send AI Reply",
        subConnections: [
          {
            id: "s2-sub-1",
            portName: "Chat Model*",
            nodeName: "Google Gemini Chat Model",
            type: "Chat Model",
            subtitle: "Model",
            badgeCount: "2 items total",
            role: "High-speed multimodal LLM providing core generation capabilities.",
          },
          {
            id: "s2-sub-2",
            portName: "Memory",
            nodeName: "Simple Memory",
            type: "Memory",
            subtitle: "Memory",
            badgeCount: "2 items total",
            role: "Maintains session state and past conversation turns for coherent dialogue.",
          },
          {
            id: "s2-sub-3",
            portName: "Tool",
            nodeName: "Get row(s) in sheet in Google Sheets",
            type: "Google Sheets Tool",
            subtitle: "read: sheet",
            badgeCount: "4 items",
            role: "Allows the agent to search and retrieve real rows from the knowledge sheet.",
          },
        ],
      },
      {
        id: "s2-node-3",
        name: "Send AI Reply",
        type: "Telegram",
        subtitle: "sendMessage: message",
        executionCount: "1 item",
        role: "Delivers generated response back to customer.",
        purpose: "Completes conversational round-trip on Telegram.",
        input: "Target chat ID and finalized AI answer text",
        processing: "Transmits reply to Telegram API with formatted text styling",
        output: "Sent message receipt",
        connections: "Terminal node for AI customer conversation",
      },
    ],
  },
  {
    id: "system-03",
    monoTag: "WORKFLOW 03 / REPORTING & MONITORING",
    title: "Automated Daily Reporting & Alerting",
    summary:
      "A scheduled intelligence pipeline running daily at 9 AM to extract operational data from Google Sheets, compute KPI metrics in a Code node, and publish summaries to Telegram and Gmail.",
    problem:
      "Operational metrics need to be calculated and reported daily to leadership without someone having to manually aggregate rows and draft repetitive emails every morning.",
    screenshot: "/screenshots/daily-reporting.png",
    statusBadge: "EXECUTED ✓",
    tech: ["n8n", "Schedule Trigger", "Google Sheets", "Data Processing", "KPI Calculation", "Telegram", "Gmail"],
    pipelineStrip: ["RAW DATA", "PROCESSING", "KPI", "REPORT", "DECISION"],
    steps: [
      "Schedule trigger activates daily at 9:00 AM.",
      "Operations data rows are fetched from Google Sheets.",
      "Code node processes raw rows and calculates key performance indicators.",
      "KPI summary alert is posted to admin Telegram channel.",
      "Detailed executive report is formatted and emailed to management via Gmail.",
    ],
    myWork:
      "Configured cron schedule trigger, built Google Sheets retrieval query, developed custom JavaScript logic in the Code node for KPI formulas, and designed email and chat report layouts.",
    result:
      "Operational summaries and KPI health indicators arrive automatically every morning across email and chat channels, eliminating manual daily reporting.",
    nodes: [
      {
        id: "s3-node-1",
        name: "Daily Trigger 9 AM",
        type: "Schedule Trigger",
        subtitle: "Cron 9:00 AM",
        executionCount: "1 item",
        role: "Time-based trigger firing automatically each morning.",
        purpose: "Initiates daily monitoring and calculation cycle.",
        input: "System clock scheduled time event",
        processing: "Emits trigger pulse at 09:00 local time daily",
        output: "Trigger metadata timestamp",
        connections: "Connects to Fetch Daily Operations",
      },
      {
        id: "s3-node-2",
        name: "Fetch Daily Operations",
        type: "Google Sheets",
        subtitle: "read: sheet",
        executionCount: "4 items",
        role: "Queries operational database for latest records.",
        purpose: "Retrieves rows containing daily task logs and metrics.",
        input: "Target spreadsheet ID and sheet range",
        processing: "Pulls recent rows matching query criteria",
        output: "Array of operational records",
        connections: "Feeds into Calculate KPI Metrics",
      },
      {
        id: "s3-node-3",
        name: "Calculate KPI Metrics",
        type: "Code",
        subtitle: "{ }",
        executionCount: "1 item",
        role: "Executes JavaScript calculation logic on raw records.",
        purpose: "Computes completion rates, averages, and alert thresholds.",
        input: "Raw row data from Google Sheets",
        processing: "Parses numbers, aggregates totals, computes KPI metrics and formats summaries",
        output: "Consolidated KPI metrics object",
        connections: "Splits concurrently to Telegram and Gmail",
      },
      {
        id: "s3-node-4",
        name: "Send KPI Summary to Admin",
        type: "Telegram",
        subtitle: "sendMessage: message",
        executionCount: "1 item",
        role: "Quick-glance metric broadcast to admin chat.",
        purpose: "Delivers immediate mobile visibility on key indicators.",
        input: "Calculated KPI summary text",
        processing: "Constructs concise dashboard message and posts to Telegram",
        output: "Dispatched chat alert",
        connections: "Terminal node for admin chat branch",
      },
      {
        id: "s3-node-5",
        name: "Email Executive Report",
        type: "Gmail",
        subtitle: "send: message",
        executionCount: "1 item",
        role: "Formal daily report to executive distribution list.",
        purpose: "Provides structured daily digest for leadership archives.",
        input: "Calculated KPI summary and breakdown",
        processing: "Builds HTML report email and sends via Gmail API",
        output: "Sent executive email",
        connections: "Terminal node for email report branch",
      },
    ],
  },
];

export const approachSteps = [
  {
    step: "01",
    title: "Find the Repetition",
    description: "Identify manual, recurring steps where team hours are spent doing what software can handle.",
  },
  {
    step: "02",
    title: "Map the Flow",
    description: "Understand triggers, incoming data formats, decision branches, and expected outputs before touching any tool.",
  },
  {
    step: "03",
    title: "Automate the Connections",
    description: "Connect APIs, business tools, webhooks, and AI models into structured, fault-tolerant workflows.",
  },
  {
    step: "04",
    title: "Make It Useful",
    description: "Turn the workflow into something tangible that saves manual effort, prevents errors, and speeds up information flow.",
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
  bio: "I am a Computer and Information Sciences student building my skills in AI automation and workflow design. My current focus is creating practical automation systems using n8n, AI, APIs, and connected business tools. I am particularly interested in turning repetitive manual processes into structured, automated workflows.",
  facts: [
    "B.Sc. Computer and Information Sciences, Egyptian E-Learning University",
    "DEPI — AI & Advanced Automation with n8n",
    "Cybersecurity foundation & systems awareness",
    "Hands-on practical automation implementations",
  ],
};

export const contactInfo = {
  title: "Have a Process Worth Automating?",
  description:
    "Tell me what you currently do manually. I'll help map the process and identify where automation can fit.",
  ctaText: "Start a Conversation",
  emailSubject: "Automation%20Inquiry%20from%20Portfolio",
  emailAddress: "nourhan@example.com", // TODO: verify real email address
};
