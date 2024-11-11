import React, { useState } from 'react';
import axios from 'axios';

const TaskInput = ({ onCreate }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const newTask = { task: inputValue };
        const response = await axios.post('http://localhost:8000/tasks/', newTask);
        onCreate(response.data);
        setInputValue('');
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <div>
      <h2>Text Task Input</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskInput;
