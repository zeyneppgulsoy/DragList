
import './App.css';
import { taskData } from './Data';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import type { TaskProps } from './types';
import { Container } from 'react-bootstrap';
import TaskBoard from './components/TaskBoard';

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

  return (
    <Container>
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </Container>
  );
}

export default App;
