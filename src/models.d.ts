export type Locale = "ar" | "en";
export type LocalizedText = Record<Locale, string>;

export interface SourceCitation {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  detail: LocalizedText;
  category: LocalizedText;
  updated: string;
}

export interface DemoScenario {
  id: "summer-training" | "course-registration" | "add-drop" | "certificate-request";
  icon: string;
  keywords: string[];
  title: LocalizedText;
  summary: LocalizedText;
  prompt: LocalizedText;
  answer: LocalizedText;
  steps: Record<Locale, string[]>;
  citationIds: SourceCitation["id"][];
  formId: string;
  reminder: LocalizedText;
}

export interface KnowledgeArticle extends SourceCitation {}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  locale: Locale;
  text: string;
  scenarioId?: DemoScenario["id"];
  citations?: SourceCitation[];
  createdAt: string;
}

export interface Reminder {
  id: string;
  scenarioId: DemoScenario["id"];
  title: string;
  date: string;
  locale: Locale;
  createdAt: string;
}

export interface ImpactMetric {
  id: string;
  icon: string;
  value: string;
  status: "projected";
  label: LocalizedText;
  note: LocalizedText;
}
