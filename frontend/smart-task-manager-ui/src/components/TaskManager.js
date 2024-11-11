import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';
import VoiceInput from './VoiceInput';
import TaskList from './TaskList';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();

    // WebSocket for real-time updates
    const socket = new WebSocket('ws://localhost:8000/ws/tasks');
    
    socket.onmessage = (event) => {
      try {
        const task = JSON.parse(event.data);
        setTasks((prevTasks) => [...prevTasks, task]);  // Add new task to the list
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      socket.close();  // Close WebSocket connection when component unmounts
    };
  }, []);

  // Function to add a task after creation (called by TaskInput and VoiceInput)
  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Handle task completion (Example: Toggle completion status)
  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:8000/tasks/${taskId}/`, updatedTask);
      setTasks((prevTasks) => prevTasks.map(t => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskInput onCreate={handleCreateTask} />
      <VoiceInput onCreate={handleCreateTask} />
      <TaskList
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
