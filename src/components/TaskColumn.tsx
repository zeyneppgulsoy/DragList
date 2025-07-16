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
                <div ref={provided.innerRef} {...provided.droppableProps}
             
                    style={{
                        backgroundColor: 'lightgray',
                        padding: '10px',
                        borderRadius: '5px',
                        minHeight: '200px',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',

                    }}
                    >
                    
                    {tasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </Col>
    );
}

export default TaskColumn; 