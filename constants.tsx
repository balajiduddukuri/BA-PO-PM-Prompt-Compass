
import { Category, Prompt, Article } from './types';

export const KNOWLEDGE_ARTICLES: Article[] = [
  {
    id: "kb-invest",
    title: "The INVEST Principle",
    tag: "Quality Standards",
    readTime: "3 min",
    excerpt: "The gold standard for high-quality User Stories. Ensure your backlog is lean and actionable.",
    content: `
# The INVEST Principle
A high-quality user story should follow the INVEST acronym to ensure agility and clarity.

### 1. Independent
Stories should be as separate as possible. Dependencies between stories make planning and prioritization difficult. Aim for "Vertical Slices" of value.

### 2. Negotiable
A story is not a rigid contract. It is an invitation to a conversation. The details are co-created during refinement.

### 3. Valuable
The story must deliver clear value to the end user or the business. Avoid purely technical tasks without context.

### 4. Estimable
The team must be able to estimate the effort. Lack of estimability often indicates a lack of clarity or a story that is too large.

### 5. Small (Sized Appropriately)
Stories should be small enough to be completed within a single iteration/sprint.

### 6. Testable
The story must have clear acceptance criteria (Gherkin format preferred) so the team knows exactly when it is "Done".
    `
  },
  {
    id: "kb-3cs",
    title: "The 3 C's of User Stories",
    tag: "Requirements",
    readTime: "2 min",
    excerpt: "Ron Jeffries' classic framework for shifting from documentation to conversation.",
    content: `
# Card, Conversation, Confirmation
User stories are more than just text in a tool. They represent a process:

### 1. Card
The written description. It acts as a physical or digital token representing the requirement. "As a... I want... So that..."

### 2. Conversation
The most critical part. The dialogue between the Product Owner, Stakeholders, and the Team to flesh out the details and edge cases.

### 3. Confirmation
The Acceptance Criteria. The objective criteria that confirm the story meets the user's needs. This forms the basis for testing.
    `
  },
  {
    id: "kb-moscow",
    title: "Strategic Prioritization: MoSCoW",
    tag: "Prioritization",
    readTime: "4 min",
    excerpt: "A strategic guide to categorizing requirements in time-boxed projects for maximum ROI.",
    content: `
# MoSCoW Prioritization
MoSCoW helps stakeholders understand the relative importance of requirements for a specific delivery.

### Must Have
Non-negotiable requirements. If even one isn't delivered, the project is considered a failure. (The "MVP").

### Should Have
Important but not vital. If left out, the solution is still viable, though potentially painful for the user.

### Could Have
Desirable but less important. These are the first to be dropped if time or budget runs tight. Often referred to as "Nice to Have".

### Won't Have (this time)
Requirements agreed to be out of scope for the current delivery. This manages expectations and prevents scope creep.
    `
  },
  {
    id: "kb-okr",
    title: "OKRs vs KPIs: The BA's Guide",
    tag: "Outcome Driven",
    readTime: "5 min",
    excerpt: "Master the art of measuring what matters. Move from measuring activity to measuring impact.",
    content: `
# OKRs vs KPIs
Understanding the difference is key to Product Ownership.

### OKRs (Objectives and Key Results)
- **Objective**: Where do we want to go? (Qualitative, inspiring).
- **Key Result**: How do we know if we're getting there? (Quantitative, measurable).
- *Example*: Objective: "Delight our new users." KR: "Reduce Day 1 churn from 40% to 20%."

### KPIs (Key Performance Indicators)
- Business as usual metrics. Measures the "health" of a process already in place.
- *Example*: "Server Uptime: 99.9%."

**Rule of Thumb**: Use OKRs for growth and change; use KPIs for maintenance and monitoring.
    `
  }
];

export const APP_DOCS = `
# System Documentation: Prompt Compass

## 1. Architecture Overview
Prompt Compass is a high-fidelity workbench for Agile professionals. It leverages **Gemini 3 Pro** to perform complex reasoning tasks via multi-perspective simulations.

## 2. Core Modules
### Prompt Library
A curated collection of 52+ prompts. Each prompt is a "Template" that accepts variables to maintain high contextual relevance.

### Expert Polish (The Triple-Audit)
This feature implements a "Multi-Agent" simulation:
- **Pragmatic Architect**: Focuses on feasibility and system constraints.
- **Customer Obsessed Designer**: Focuses on UX and empathy.
- **QA Lead**: Focuses on robustness and edge cases.

## 3. Recommended External Resources
For advanced Business Analysis and Product Management training, we recommend:
- **Expert Learning**: [Angela Wick's LinkedIn Learning Courses](https://www.linkedin.com/learning/instructors/angela-wick?u=2113185)

## 4. QA Final Audit Report (v1.0.4)
*Conducted by Team Alpha, Beta, and Gamma (The 3 Expert QA Teams).*

### Audit Success Criteria:
- **WCAG 2.2 Level AA**: Passed.
- **Theme Integrity**: Passed.
- **API Resilience**: Passed.
- **Responsive Design**: Passed.

### Recent Fixes:
1.  **Icon Visibility**: Switched theme icons to robust inline SVGs.
2.  **Tab Accessibility**: Implemented ARIA tab-list patterns.
3.  **External Links**: Integrated Angela Wick's instructor profile for professional growth.

## 5. Technical Stack
- **React 19** / **Tailwind CSS**
- **Google GenAI SDK** (Gemini 3 Pro-Preview)
- **Marked.js** for markdown rendering.
`;

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
  }
];
