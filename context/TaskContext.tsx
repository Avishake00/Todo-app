import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  date: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  getTasksByDate: (date: string) => Task[];
  
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('tasks');
      if (stored) {
        const parsedTasks = JSON.parse(stored);
        // Ensure all tasks have valid dates
        const validTasks = parsedTasks.map((task: Task) => ({
          ...task,
          date: task.date || new Date().toISOString()
        }));
        setTasks(validTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      date: taskData.date || new Date().toISOString()
    };
    const newTasks = [...tasks, newTask];
    await saveTasks(newTasks);
  };

  const deleteTask = async (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    await saveTasks(newTasks);
  };

  const updateTask = async (updatedTask: Task) => {
    const newTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    await saveTasks(newTasks);
  };

  const getTasksByDate = (date: string) => {
    if (!date) return [];
    return tasks.filter(task => {
      if (!task.date) return false;
      const taskDate = task.date.split('T')[0];
      return taskDate === date;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask,getTasksByDate }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}; 