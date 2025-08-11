import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoApi from './services/todoApi';
import type { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 모든 Todo 조회
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAllTodos();
      console.log('Fetched todos:', data);
      console.log('First todo structure:', data[0]);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('할 일 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Todo 추가
  const handleAddTodo = async (description: string) => {
    try {
      const newTodo = await todoApi.createTodo({
        description,
        completed: false
      });
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('할 일 추가에 실패했습니다.');
      console.error('Error adding todo:', err);
    }
  };

  // Todo 완료 상태 토글
  const handleToggleTodo = async (id: number) => {
    try {
      console.log('handleToggleTodo called with id:', id);
      if (!id || id === undefined) {
        setError('유효하지 않은 할 일 ID입니다.');
        return;
      }
      const updatedTodo = await todoApi.toggleComplete(id);
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('할 일 상태 변경에 실패했습니다.');
      console.error('Error toggling todo:', err);
    }
  };

  // Todo 수정
  const handleUpdateTodo = async (id: number, description: string) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { description });
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('할 일 수정에 실패했습니다.');
      console.error('Error updating todo:', err);
    }
  };

  // Todo 삭제
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('할 일 삭제에 실패했습니다.');
      console.error('Error deleting todo:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="todo-container">
        <header className="todo-header">
          <h1>📝 Todo List</h1>
          <p className="todo-stats">
            완료: {completedCount} / 전체: {totalCount}
          </p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TodoForm onAdd={handleAddTodo} />

        {loading ? (
          <div className="loading">
            <p>로딩 중...</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
