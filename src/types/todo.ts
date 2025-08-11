export interface Todo {
  id: number;
  description: string;
  completed: boolean;
  modifiedAt: string;
}

export interface CreateTodoRequest {
  description: string;
  completed: boolean;
}

export interface UpdateTodoRequest {
  description?: string;
  completed?: boolean;
} 