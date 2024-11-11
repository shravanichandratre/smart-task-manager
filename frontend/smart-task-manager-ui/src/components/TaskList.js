import React from 'react';

const TaskList = ({ tasks, onSelectTask, onCompleteTask, onDeleteTask }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span 
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => onSelectTask(task)}
            >
              {task.task}
            </span>
            <button onClick={() => onCompleteTask(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
