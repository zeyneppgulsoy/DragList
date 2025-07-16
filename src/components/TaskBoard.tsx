import React from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import type { TaskProps } from '../types/index';
import { Container, Row } from 'react-bootstrap';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';

interface TaskBoardProps {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

function TaskBoard({ tasks, setTasks }: TaskBoardProps) {
  const onDragEnd = (result: DropResult) => {
    console.log('Drag Result:', result);
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) {
      console.error(`Task not found: ${draggableId}`);
      return;
    }

    const updatedTask: TaskProps = {
      ...draggedTask,
      status: destination.droppableId as TaskProps['status'],
    };

    const newTasks = tasks.filter((task) => task.id !== draggableId);
    const destinationTasks = newTasks.filter(
      (task) => task.status === destination.droppableId
    );

    let insertAt = 0;
    const firstTaskInDestination = destinationTasks[destination.index];
    if (firstTaskInDestination) {
      insertAt = newTasks.indexOf(firstTaskInDestination);
    } else {
      const prevTaskInDestination = destinationTasks[destination.index - 1];
      if (prevTaskInDestination) {
        insertAt = newTasks.indexOf(prevTaskInDestination) + 1;
      } else {
        insertAt = newTasks.length;
      }
    }

    newTasks.splice(insertAt, 0, updatedTask);
    setTasks(newTasks);
  };

  const statuses = ['Pending', 'Ongoing', 'Completed'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Row>
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </Row>
      </Container>
    </DragDropContext>
  );
}

export default TaskBoard; 