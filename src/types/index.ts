export interface ContentItem {
  id: number;
  title: string;
  info?: TopicInfo;
  duration?: string;
}

export interface TopicInfo {
  aulas: string;
  exercicios: string;
  materiais: string;
}

export interface Topic {
  id: number;
  title: string;
  info: TopicInfo;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: number;
  title: string;
  info: TopicInfo;
  content: ContentItem[];
}