import axios from 'axios';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

const API_BASE_URL = 'http://localhost:8080/api/todo';

const todoApi = {
  // 모든 Todo 조회
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // ID로 Todo 조회
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Todo 생성
  createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await axios.post(API_BASE_URL, todo);
    return response.data;
  },

  // Todo 수정
  updateTodo: async (id: number, todo: UpdateTodoRequest): Promise<Todo> => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, todo);
    return response.data;
  },

  // Todo 완료 상태 토글
  toggleComplete: async (id: number): Promise<Todo> => {
    const response = await axios.patch(`${API_BASE_URL}/complete/${id}`);
    return response.data;
  },

  // Todo 삭제
  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};

export default todoApi; 