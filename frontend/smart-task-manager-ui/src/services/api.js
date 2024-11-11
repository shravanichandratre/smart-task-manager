import axios from 'axios';

const API_URL = 'http://localhost:8000/tasks';

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

// Update task function
export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

// Delete task function
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};
