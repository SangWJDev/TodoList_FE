import React, { useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, description: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.description);

  const handleEdit = () => {
    if (editValue.trim()) {
      onUpdate(todo.id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditValue(todo.description);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            className="todo-edit-input"
            autoFocus
          />
        ) : (
          <span
            className={`todo-description ${todo.completed ? 'completed' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.description}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn-edit"
          title="수정"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-delete"
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 