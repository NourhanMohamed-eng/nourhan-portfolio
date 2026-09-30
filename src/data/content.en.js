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
    "AI Automation & Workflow Automation with n8n, APIs, LLMs and structured workflows.",
  heroCtaPrimary: "Explore the Systems",
  heroCtaSecondary: "Let's Build One",
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
    href: "https://www.linkedin.com/in/nourhan-mohamed-ai",
    isActive: true,
  },
  {
    name: "Khamsat",
    href: "https://khamsat.com/user/nourmohamed_23",
    isActive: true,
  },
  {
    name: "Nafezly",
    href: "https://nafezly.com/u/Nourhan__Mohamed",
    isActive: true,
  },
  {
    name: "FreelanceYard",
    href: "https://freelanceyard.com/ar/freelancers/norhan-mhmd",
    isActive: true,
  },
  {
    name: "Mostaql",
    // TODO: enable when approved
    href: "#",
    isActive: false,
    badge: "Pending",
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
    title: "Lead Capture & Notifications",
    summary:
      "A workflow that receives lead submissions through a webhook, extracts the lead fields, and sends them to Telegram, Gmail, and Google Sheets.",
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
      "I built the webhook trigger, mapped the lead fields, and connected the three outputs: Telegram, Gmail, and Google Sheets. I wrote the welcome email and tested the workflow with sample submissions.",
    result:
      "When a lead is submitted, the sales team gets a Telegram message, the lead gets a welcome email, and the lead is stored in a CRM sheet.",
    automationLogic:
      "A Webhook receives an HTTP POST request containing the lead's details. An Edit Fields (Set) node extracts the name, email, phone, and requested service from the request. The workflow then branches into three actions: a Telegram message notifies the sales team, Gmail sends a welcome email to the lead, and Google Sheets stores the lead in a CRM sheet.",
    integrations: [
      { name: "n8n", role: "Workflow Orchestrator", category: "Core Engine" },
      { name: "Webhook", role: "HTTP POST trigger for lead capture", category: "Trigger" },
      { name: "Edit Fields (Set)", role: "Extracts and maps the lead fields", category: "Processing" },
      { name: "Telegram Bot API", role: "Immediate sales alert dispatch", category: "Messaging" },
      { name: "Gmail", role: "Automated lead confirmation email", category: "Email" },
      { name: "Google Sheets", role: "CRM spreadsheet persistence", category: "Storage" },
    ],
    screenshotAlt: "n8n workflow interface showing Lead Submission webhook branching into Telegram alert, Gmail confirmation, and Google Sheets row append.",
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
        processing: "Listens for incoming webhooks and receives the submission payload",
        output: "Raw lead record (name, contact, service requirements)",
        connections: "Direct edge to Format & Clean Data",
      },
      {
        id: "s1-node-2",
        name: "Format & Clean Data",
        type: "Edit Fields",
        subtitle: "manual",
        executionCount: "1 item",
        role: "Extracts and maps the lead fields.",
        purpose: "Extracts the name, email, phone, and requested service fields.",
        input: "HTTP POST request payload with lead details",
        processing: "Extracts name, email, phone, and requested service from the request",
        output: "Extracted fields: name, email, phone, requested service",
        connections: "Branches to Telegram, Gmail, and Google Sheets",
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
        input: "Lead email address and details",
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
        role: "Stores lead information into master CRM spreadsheet.",
        purpose: "Centralizes prospect data for pipeline tracking and auditing.",
        input: "Lead parameters",
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
      "An AI agent workflow that replies to Telegram messages using a Google Gemini chat model, conversation memory, and a Google Sheets knowledge base.",
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
      "I built the AI agent in n8n and connected it to a Gemini chat model, conversation memory, and a Google Sheets tool. I wrote the system message so the agent answers from the sheet instead of inventing information, and set up the Telegram trigger and reply steps.",
    result:
      "The agent is designed to reply on Telegram using conversation memory and information looked up from Google Sheets.",
    automationLogic:
      "A Telegram Trigger receives the customer's message and passes it to the AI Agent. The agent's system message tells it to answer only from the Google Sheets knowledge base and not to make up information. When a question needs company data, the agent calls the Google Sheets tool to read rows, then the Gemini chat model writes the reply, which is sent back on Telegram. Conversation memory keeps the context across messages.",
    aiLayer: {
      model: "Google Gemini Chat Model generates the agent's replies.",
      memory: "Simple Memory keeps recent messages so the conversation has context.",
      tools: "A Google Sheets tool lets the agent read rows from a support knowledge sheet.",
      architecture: "LangChain Modular Agent pattern with separate sub-ports for Model, Memory, and Tool calling.",
    },
    integrations: [
      { name: "n8n", role: "Workflow Orchestrator", category: "Core Engine" },
      { name: "AI Agent", role: "Processes messages and decides when to use the tool", category: "AI Agent" },
      { name: "Google Gemini", role: "LLM Chat Model", category: "AI & Model" },
      { name: "Simple Memory", role: "Multi-turn session buffer", category: "Memory" },
      { name: "Google Sheets Tool", role: "Live database knowledge retrieval", category: "Tool Calling" },
      { name: "Telegram Bot API", role: "Bidirectional customer chat channel", category: "Messaging" },
    ],
    screenshotAlt: "n8n workflow interface showing LangChain AI Agent connected to Google Gemini Model, Simple Memory, Google Sheets tool, and Telegram I/O.",
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
            name: "Google Gemini Chat Model",
            type: "Chat Model",
            subtitle: "Model",
            badgeCount: "2 items total",
            role: "LLM chat model providing generation capabilities for the agent.",
            purpose: "Generates conversational replies for the AI Agent based on context and prompts.",
            input: "Formatted prompt and retrieved data from the AI Agent",
            processing: "Applies language model inference using the Gemini API",
            output: "Generated text reply tokens passed to the agent",
            connections: "Attached as Chat Model sub-resource to AI Agent",
          },
          {
            id: "s2-sub-2",
            portName: "Memory",
            nodeName: "Simple Memory",
            name: "Simple Memory",
            type: "Memory",
            subtitle: "Memory",
            badgeCount: "2 items total",
            role: "Maintains session state and past conversation turns for coherent dialogue.",
            purpose: "Stores recent chat messages so multi-turn conversations retain context.",
            input: "Message history entries and session identifiers",
            processing: "Maintains in-memory message buffer for the active chat session",
            output: "Prior conversational context passed into the agent's prompt",
            connections: "Attached as Memory sub-resource to AI Agent",
          },
          {
            id: "s2-sub-3",
            portName: "Tool",
            nodeName: "Get row(s) in sheet in Google Sheets",
            name: "Get row(s) in sheet in Google Sheets",
            type: "Google Sheets Tool",
            subtitle: "read: sheet",
            badgeCount: "4 items",
            role: "Allows the agent to search and retrieve rows from the knowledge sheet.",
            purpose: "Enables the agent to look up business and support data from a Google Sheet.",
            input: "Query parameters or row lookup request from the agent",
            processing: "Reads matching rows from the specified support knowledge sheet",
            output: "Raw row data provided as tool output to the agent",
            connections: "Attached as dynamic Tool sub-resource to AI Agent",
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
      "A scheduled workflow that runs every day at 9 AM, reads operations data from Google Sheets, calculates KPI metrics in a Code node, and sends the summary through Telegram and Gmail.",
    problem:
      "Operations data needs to be calculated and reported daily without someone having to manually aggregate rows and draft repetitive emails every morning.",
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
      "I set up the daily schedule, connected the Google Sheets read step, and built a Code node that calculates the KPI metrics. I wrote the JavaScript with AI assistance, then connected the results to Telegram and Gmail and formatted the report messages.",
    result:
      "Each morning the workflow produces a KPI summary for the admin on Telegram and an HTML report by email, without manual reporting.",
    automationLogic:
      "A Schedule Trigger runs daily at 9 AM. The workflow reads the day's operations data from Google Sheets and passes it to a Code node, which calculates total sales, total orders, completed and pending orders, and the average order value. The result is then sent in two ways: a KPI summary to the admin on Telegram, and an HTML report by Gmail.",
    integrations: [
      { name: "n8n", role: "Workflow Orchestrator", category: "Core Engine" },
      { name: "Schedule Trigger", role: "Cron execution at 9:00 AM daily", category: "Trigger" },
      { name: "Google Sheets", role: "Operational database query", category: "Storage" },
      { name: "Code Node (JavaScript)", role: "KPI metrics computation logic", category: "Computation" },
      { name: "Telegram Bot API", role: "Admin notification broadcast", category: "Messaging" },
      { name: "Gmail", role: "Report email delivery", category: "Email" },
    ],
    screenshotAlt: "n8n workflow interface showing 9 AM Schedule Trigger fetching Google Sheets rows, calculating KPIs in Code node, and distributing reports to Telegram and Gmail.",
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
        purpose: "Computes sales, order totals, and averages.",
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
        role: "Metric broadcast to admin chat.",
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
        role: "Daily report sent to the distribution list.",
        purpose: "Provides structured daily digest.",
        input: "Calculated KPI summary and breakdown",
        processing: "Builds HTML report email and sends via Gmail API",
        output: "Sent email report",
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
  label: "06 / BEHIND THE WORK",
  title: "Behind The Work",
  bio: "I am a Computer and Information Sciences student building my skills in AI automation and workflow design. My current focus is creating practical automation systems using n8n, AI, APIs, and connected business tools. I am particularly interested in turning repetitive manual processes into structured, automated workflows.",
  facts: [
    "B.Sc. Computer and Information Sciences (Egyptian E-Learning University)",
    "DEPI — AI & Advanced Automation with n8n",
    "Background in Cyber Security",
    "Practical workflow automation projects",
  ],
};

export const contactInfo = {
  label: "07 / CONTACT",
  title: "Have a Process Worth Automating?",
  description:
    "Tell me what you currently do manually. I'll help map the process and identify where automation can fit.",
  ctaText: "Start a Conversation",
  email: "an3005752@gmail.com",
  mailtoHref: "mailto:an3005752@gmail.com?subject=Automation%20project%20inquiry",
  primaryLinks: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nourhan-mohamed-ai",
      ariaLabel: "Nourhan Mohamed on LinkedIn",
    },
    {
      name: "Khamsat",
      href: "https://khamsat.com/user/nourmohamed_23",
      ariaLabel: "Nourhan Mohamed on Khamsat",
    },
  ],
  secondaryLinks: [
    {
      name: "Nafezly",
      href: "https://nafezly.com/u/Nourhan__Mohamed",
      ariaLabel: "Nourhan Mohamed on Nafezly",
      isActive: true,
    },
    {
      name: "FreelanceYard",
      href: "https://freelanceyard.com/ar/freelancers/norhan-mhmd",
      ariaLabel: "Nourhan Mohamed on FreelanceYard",
      isActive: true,
    },
    {
      name: "Mostaql",
      // TODO: enable when approved
      href: null,
      ariaLabel: "Nourhan Mohamed on Mostaql (Under Review)",
      isActive: false,
      badge: "Pending",
    },
    {
      name: "GitHub",
      href: "https://github.com/NourhanMohamed-eng",
      ariaLabel: "Nourhan Mohamed on GitHub",
      isActive: true,
    },
  ],
};
