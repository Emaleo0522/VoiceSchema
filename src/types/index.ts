export interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: number;
}

export interface SchemaSection {
  title: string;
  content: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface GeneratedSchema {
  projectTitle: string;
  description: string;
  sections: SchemaSection[];
  techStack: string[];
  finalPrompt: string;
}

export interface AppSettings {
  apiKey: string;
  theme: 'light' | 'dark';
}