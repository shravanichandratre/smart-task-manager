import React from 'react';

const TaskDetail = ({ task }) => {
  if (!task) return <p>Select a task to see details</p>;

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Task:</strong> {task.task}</p> {/* Updated to show task description */}
      <p><strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}</p> {/* Show created_at */}
      <p><strong>Task ID:</strong> {task.id}</p> {/* Show Task ID */}
    </div>
  );
};

export default TaskDetail;
