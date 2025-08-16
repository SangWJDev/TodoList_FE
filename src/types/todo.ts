export enum TodoCategory {
  STUDY = "STUDY",
  PROJECT = "PROJECT",
  READING_DOCS = "READING_DOCS",
  CODING_PRACTICE = "CODING_PRACTICE",
  INTERVIEW_PREP = "INTERVIEW_PREP",
  NETWORKING = "NETWORKING",
  LIFE = "LIFE",
}

export interface Todo {
  id: number;
  description: string;
  completed: boolean;
  category?: TodoCategory | null;
  modifiedAt: string;
}

export interface CreateTodoRequest {
  description: string;
  completed: boolean;
  category: TodoCategory;
}

export interface UpdateTodoRequest {
  description?: string;
  completed?: boolean;
  category?: TodoCategory;
} 