import React from 'react';
import type { TaskProps } from '../types';
import { Col } from 'react-bootstrap';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    status: string;
    tasks: TaskProps[];
    }
function TaskColumn({status, tasks}: TaskColumnProps) {
    return (
        <Col>
        <h2>{status}</h2>
        <Droppable droppableId={status}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                    ))}
                </div>
            )}
        </Droppable>
        </Col>
    );
}

export default TaskColumn; 