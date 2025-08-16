import React, { useState } from 'react';
import { TodoCategory } from '../types/todo';

interface TodoFormProps {
  onAdd: (description: string, category: TodoCategory) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory>(TodoCategory.LIFE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAdd(description.trim(), selectedCategory);
      setDescription('');
      setSelectedCategory(TodoCategory.LIFE); // 기본값으로 리셋
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="todo-input"
          maxLength={100}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as TodoCategory)}
          className="category-select"
        >
          {Object.values(TodoCategory).map(category => (
            <option key={category} value={category}>
              {category.replace(/_/g, ' ').toLowerCase().split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-add" disabled={!description.trim()}>
          추가
        </button>
      </div>
    </form>
  );
};

export default TodoForm; 