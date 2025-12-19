
import { Category, Prompt } from './types';

export const PROMPTS: Prompt[] = [
  // --- REQUIREMENTS & ANALYSIS ---
  {
    id: "req-1",
    category: Category.REQUIREMENTS,
    title: "User Story Drafting",
    focus: "User stories, acceptance criteria",
    description: "Create a structured user story for a specific feature with Gherkin AC.",
    template: "Draft a comprehensive user story for [FEATURE_NAME]. The primary user is [USER_ROLE]. The main goal is [GOAL]. Include at least 5 detailed acceptance criteria following the Gherkin format (Given/When/Then).",
    samples: [
      { FEATURE_NAME: "Push Notifications", USER_ROLE: "Mobile App User", GOAL: "Receive real-time flight updates" },
      { FEATURE_NAME: "MFA Login", USER_ROLE: "Security Admin", GOAL: "Protect sensitive account data" }
    ]
  },
  {
    id: "req-2",
    category: Category.REQUIREMENTS,
    title: "Edge Case Analysis",
    focus: "Analytical thinking",
    description: "Identify potential failures or missed requirements in a workflow.",
    template: "Analyze the feature [FEATURE_NAME] for potential edge cases, error states, and security considerations. Focus specifically on [USER_JOURNEY_STEP] and list 10 scenarios that might be missed.",
    samples: [
      { FEATURE_NAME: "Shopping Cart", USER_JOURNEY_STEP: "Applying a promo code" },
      { FEATURE_NAME: "Password Reset", USER_JOURNEY_STEP: "Verification email link expiration" }
    ]
  },

  // --- PMI-PMP & PROJECT GOVERNANCE ---
  {
    id: "pmp-1",
    category: Category.PMP,
    title: "Project Charter Architect",
    focus: "Initiation Phase",
    description: "Generate a high-level project charter to authorize the project.",
    template: "Develop a formal Project Charter for [PROJECT_NAME]. Include: Project Purpose, High-Level Requirements, [SUCCESS_CRITERIA], Summary Milestone Schedule, and [INITIAL_BUDGET]. Identify the [PROJECT_MANAGER] and their authority level.",
    samples: [
      { PROJECT_NAME: "Global ERP Rollout", SUCCESS_CRITERIA: "Full deployment in 12 regions with < 5% downtime", INITIAL_BUDGET: "$2.5M", PROJECT_MANAGER: "Jane Doe" }
    ]
  },
  {
    id: "pmp-2",
    category: Category.PMP,
    title: "Stakeholder Engagement Matrix",
    focus: "Stakeholder Management",
    description: "Analyze and categorize stakeholders by Power/Interest.",
    template: "Create a Stakeholder Register and Engagement Matrix for [PROJECT_CONTEXT]. For each stakeholder group (e.g., [STAKEHOLDER_GROUPS]), identify their Power/Interest level and a strategy to 'Manage Closely', 'Keep Satisfied', or 'Monitor'.",
    samples: [
      { PROJECT_CONTEXT: "Migration to AWS Cloud Services", STAKEHOLDER_GROUPS: "C-Suite, IT Operations, Customer Success" }
    ]
  },
  {
    id: "pmp-3",
    category: Category.PMP,
    title: "Risk Register & Response Plan",
    focus: "Risk Management",
    description: "Identify project risks and draft mitigation strategies.",
    template: "Conduct a risk identification session for [PROJECT_SCOPE]. Generate a Risk Register with at least 5 risks. For each risk, provide a Probability/Impact score (1-5) and a response strategy ([MITIGATE/AVOID/TRANSFER/ACCEPT]).",
    samples: [
      { PROJECT_SCOPE: "Developing a proprietary AI algorithm for credit scoring" }
    ]
  },
  {
    id: "pmp-4",
    category: Category.PMP,
    title: "WBS Decomposer",
    focus: "Scope Management",
    description: "Break down project scope into manageable work packages.",
    template: "Generate a Work Breakdown Structure (WBS) for [DELIVERABLE_NAME]. Decompose the scope into at least 3 levels, reaching the 'Work Package' level. Include a WBS Dictionary entry for [CRITICAL_WORK_PACKAGE].",
    samples: [
      { DELIVERABLE_NAME: "E-Commerce Website Launch", CRITICAL_WORK_PACKAGE: "Payment Gateway Integration" }
    ]
  },
  {
    id: "pmp-5",
    category: Category.PMP,
    title: "Communication Management Plan",
    focus: "Project Communications",
    description: "Define the information flow between stakeholders.",
    template: "Draft a Communication Management Plan for [PROJECT_TEAM_STRUCTURE]. Specify frequency, medium, and audience for [KEY_INFORMATION_FLOWS] (e.g., Status Reports, Steering Committee, Daily Syncs).",
    samples: [
      { PROJECT_TEAM_STRUCTURE: "Distributed Global Team across 3 timezones", KEY_INFORMATION_FLOWS: "Status Reports and Sprint Demos" }
    ]
  },
  {
    id: "pmp-6",
    category: Category.PMP,
    title: "Quality Management Plan",
    focus: "Quality Management",
    description: "Establish standards and metrics for project deliverables.",
    template: "Create a Quality Management Plan for [PROJECT_DELIVERABLE]. Define the [QUALITY_STANDARDS] to be met and the [QUALITY_CONTROL_MEASURES] (Testing, Inspections, Audits) to ensure compliance.",
    samples: [
      { PROJECT_DELIVERABLE: "Mobile Banking Application", QUALITY_STANDARDS: "ISO 27001 Security standards", QUALITY_CONTROL_MEASURES: "Penetration testing and peer code review" }
    ]
  },
  {
    id: "pmp-7",
    category: Category.PMP,
    title: "Change Control Assessment",
    focus: "Integration Management",
    description: "Evaluate the impact of a proposed project change.",
    template: "As a member of the Change Control Board (CCB), evaluate the following change request: '[CHANGE_DESCRIPTION]'. Analyze the impact on the [TRIPLE_CONSTRAINT] (Scope, Time, Cost) and provide a recommendation to Approve, Reject, or Defer.",
    samples: [
      { CHANGE_DESCRIPTION: "Adding Social Media login feature midway through development phase", TRIPLE_CONSTRAINT: "Development schedule and API licensing costs" }
    ]
  },

  // --- CUSTOMER EXPERIENCE ---
  {
    id: "cx-1",
    category: Category.CX,
    title: "Outcome vs Output Check",
    focus: "Value delivery",
    description: "Realign features with customer value over just 'building stuff'.",
    template: "Review the proposed feature [FEATURE_NAME]. Instead of listing what we are building (output), define the specific [CUSTOMER_OUTCOME] we want to achieve and how we will measure success using [KEY_METRIC].",
    samples: [
      { FEATURE_NAME: "Redesigning the search bar", CUSTOMER_OUTCOME: "Reduced time to find specific products", KEY_METRIC: "Average search duration" }
    ]
  },

  // --- BACKLOG MANAGEMENT ---
  {
    id: "backlog-1",
    category: Category.BACKLOG,
    title: "Story Splitting Strategies",
    focus: "Refinement",
    description: "Make large, intimidating stories manageable for a single sprint.",
    template: "The user story [BIG_STORY_TITLE] is too large for one sprint. Suggest 3 different ways to split it (e.g., by workflow, by data variations, or by operations) while ensuring each slice still provides value.",
    samples: [
      { BIG_STORY_TITLE: "As a user, I want to manage my entire financial portfolio" }
    ]
  },

  // --- TEAM DYNAMICS & EXECUTION ---
  {
    id: "team-1",
    category: Category.TEAM,
    title: "Swarming Strategy",
    focus: "Collaboration",
    description: "Get the whole team on one item to finish it faster.",
    template: "The team is struggling to finish [CRITICAL_STORY]. Propose a 'swarming' plan where [ROLES_IN_TEAM] can contribute to closing this item within [HOURS/DAYS].",
    samples: [
      { CRITICAL_STORY: "Database migration for production", ROLES_IN_TEAM: "Devs, QA, and DevOps", "HOURS/DAYS": "24 hours" }
    ]
  },

  // --- PRIORITIZATION ---
  {
    id: "pri-1",
    category: Category.PRIORITY,
    title: "MoSCoW Method Exercise",
    focus: "Frameworks",
    description: "Categorize features by necessity and urgency.",
    template: "Apply the MoSCoW prioritization to the following list of [FEATURES]. Justify why [FEATURE_NAME] is a 'Must Have' versus a 'Should Have' based on [BUSINESS_CONSTRAINT].",
    samples: [
      { FEATURES: "Biometric login, dark mode, CSV export, chat support", FEATURE_NAME: "Biometric login", BUSINESS_CONSTRAINT: "Regulatory security compliance" }
    ]
  },

  // --- USER RESEARCH & PERSONAS ---
  {
    id: "res-1",
    category: Category.RESEARCH,
    title: "Persona Profile Creation",
    focus: "Empathy",
    description: "Create realistic user profiles based on goals and pains.",
    template: "Develop a detailed user persona for [PERSONA_NAME], who is a [JOB_ROLE] using [PRODUCT_NAME]. Include their typical day, 3 biggest frustrations with [CURRENT_PROCESS], and their 'Definition of Success'.",
    samples: [
      { PERSONA_NAME: "Modern Mark", JOB_ROLE: "Junior Accountant", PRODUCT_NAME: "Expense Tracker Pro", CURRENT_PROCESS: "Excel spreadsheets" }
    ]
  },

  // --- DISCOVERY & EXPERIMENTATION ---
  {
    id: "disc-1",
    category: Category.DISCOVERY,
    title: "Hypothesis Testing Plan",
    focus: "Feedback loops",
    description: "Validate assumptions before committing to code.",
    template: "We believe that [FEATURE_IDEA] will result in [EXPECTED_OUTCOME] for [USER_GROUP]. Create an experiment plan to validate this in [TIME_PERIOD] without writing any code.",
    samples: [
      { FEATURE_IDEA: "AI Chatbot", EXPECTED_OUTCOME: "30% reduction in support tickets", USER_GROUP: "Frequent travelers", TIME_PERIOD: "1 week" }
    ]
  },

  // --- AGILE PLANNING ---
  {
    id: "plan-1",
    category: Category.PLANNING,
    title: "Roadmap Narrative",
    focus: "Visualization",
    description: "Tell a story with your roadmap instead of just showing dates.",
    template: "Create a narrative-based roadmap for [PRODUCT_NAME] over the next [TIME_HORIZON]. Group items by 'Themes of Value' rather than specific features, focusing on the problem we are solving in each phase.",
    samples: [
      { PRODUCT_NAME: "FinTech Savings App", TIME_HORIZON: "6 Months" }
    ]
  }
];
