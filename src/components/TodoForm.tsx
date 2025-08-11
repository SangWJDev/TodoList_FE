import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAdd(description.trim());
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className="todo-input"
        maxLength={100}
      />
      <button type="submit" className="btn-add" disabled={!description.trim()}>
        추가
      </button>
    </form>
  );
};

export default TodoForm; 