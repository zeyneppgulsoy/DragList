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
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-6 py-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-300 from-10% via-blue-500 via-45% to-emerald-500 to-90% bg-clip-text text-transparent tracking-tight flex items-center gap-3">
              📊 Task Management Board
            </h1>
          </div>
          <div className="text-center">
            <AddTaskForm addTask={addTask} />
          </div>
        </div>
        <TaskBoard tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;