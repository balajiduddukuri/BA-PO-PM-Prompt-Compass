
export enum Category {
  REQUIREMENTS = "Requirements & Analysis",
  CX = "Customer Experience",
  BACKLOG = "Backlog Management",
  TEAM = "Team Dynamics & Execution",
  MAPPING = "Mapping & Visualization",
  DOCS = "Documentation & Communication",
  PRIORITY = "Prioritization",
  ROLE = "Role Clarity & Collaboration",
  RESEARCH = "User Research & Personas",
  DISCOVERY = "Discovery & Experimentation",
  PLANNING = "Agile Planning",
  PMP = "PMI-PMP & Project Governance"
}

export const CATEGORY_METADATA: Record<Category, { pattern: string; color: string }> = {
  [Category.REQUIREMENTS]: { pattern: "M0 0l10 10m0-10L0 10", color: "blue" },
  [Category.CX]: { pattern: "M0 10L10 0M0 0l10 10", color: "purple" },
  [Category.BACKLOG]: { pattern: "M5 0v10M0 5h10", color: "green" },
  [Category.TEAM]: { pattern: "M0 0h10v10H0z", color: "orange" },
  [Category.MAPPING]: { pattern: "M2 2h6v6H2z", color: "indigo" },
  [Category.DOCS]: { pattern: "M0 5h10M5 0v10", color: "pink" },
  [Category.PRIORITY]: { pattern: "M0 0l10 10M10 0L0 10M5 0v10M0 5h10", color: "yellow" },
  [Category.ROLE]: { pattern: "M2 5a3 3 0 1 0 6 0 3 3 0 1 0-6 0", color: "teal" },
  [Category.RESEARCH]: { pattern: "M0 0h5v5H0zm5 5h5v5H5z", color: "cyan" },
  [Category.DISCOVERY]: { pattern: "M5 0l5 10H0z", color: "rose" },
  [Category.PLANNING]: { pattern: "M0 0l10 5-10 5z", color: "emerald" },
  [Category.PMP]: { pattern: "M5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z", color: "amber" }
};

export type ThemeName = 'neon' | 'classic' | 'high-contrast';

export interface Prompt {
  id: string;
  category: Category;
  title: string;
  template: string;
  focus: string;
  description: string;
  samples?: VariableValue[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  readTime: string;
}

export interface VariableValue {
  [key: string]: string;
}
