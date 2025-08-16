import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoApi from './services/todoApi';
import type { Todo } from './types/todo'; // Todo는 타입으로 임포트
import { TodoCategory } from './types/todo'; // TodoCategory는 값으로 임포트
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<TodoCategory[]>([]);

  // 모든 Todo 조회
  const fetchTodos = async () => {
    try {
      setLoading(true);
      // selectedCategories 배열을 getAllTodos에 전달
      const data = await todoApi.getAllTodos(selectedCategories);
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
  const handleAddTodo = async (description: string, category: TodoCategory) => {
    try {
      const newTodo = await todoApi.createTodo({
        description,
        completed: false,
        category: category
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
      // Todo 수정 시 카테고리도 함께 수정할 수 있도록 로직 추가 (필요 시)
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

  // 카테고리 선택/해제 토글 함수
  const handleCategoryChange = (category: TodoCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category) // 이미 선택된 카테고리이면 제거
        : [...prev, category] // 아니면 추가
    );
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedCategories]); // selectedCategories 변경 시 fetchTodos 재실행

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

        {/* 카테고리 필터링 UI */}
        <div className="category-filters">
          <h3>카테고리 필터</h3>
          <div className="category-buttons">
            {Object.values(TodoCategory).map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={selectedCategories.includes(category) ? 'active' : ''}
              >
                {category.replace(/_/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

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
