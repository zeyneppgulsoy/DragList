import './App.css';
import { taskData } from './Data';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import type { TaskProps } from './types';
import TaskBoard from './components/TaskBoard';
import AddTaskForm from './components/AddTaskForm';

const initialTasks: TaskProps[] = [];
taskData.forEach((task) => {
  initialTasks.push({
    ...task,
    id: nanoid(),
  });
});

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);

  useEffect(() => {
    console.log(initialTasks);
  }, []);
  const addTask = (task: TaskProps) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Task Management Board</h1>
          <AddTaskForm addTask={addTask} />
        </div>
        <TaskBoard tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;