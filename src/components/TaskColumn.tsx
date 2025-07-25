import type { TaskProps } from '../types';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    status: string;
    tasks: TaskProps[];
}

function TaskColumn({status, tasks}: TaskColumnProps) {
    // Modern Professional tema renkleri
    const getColumnStyles = (status: string) => {
        switch (status) {
            case 'Pending':
                return {
                    bg: 'bg-gradient-to-b from-amber-100 to-orange-200',
                    headerBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
                    dragOver: 'bg-orange-300',
                    border: 'border-orange-300'
                };
            case 'Ongoing':
                return {
                    bg: 'bg-gradient-to-b from-blue-100 to-cyan-200', 
                    headerBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
                    dragOver: 'bg-blue-300',
                    border: 'border-blue-300'
                };
            case 'Completed':
                return {
                    bg: 'bg-gradient-to-b from-emerald-100 to-green-200',
                    headerBg: 'bg-gradient-to-r from-green-500 to-emerald-500', 
                    dragOver: 'bg-green-300',
                    border: 'border-green-300'
                };
            default:
                return {
                    bg: 'bg-gradient-to-b from-gray-100 to-slate-200',
                    headerBg: 'bg-gradient-to-r from-gray-500 to-slate-500',
                    dragOver: 'bg-gray-300',
                    border: 'border-gray-300'
                };
        }
    };

    const styles = getColumnStyles(status);

    return (
        <div className="flex-1 mx-3">
            {/* Sütun başlığı */}
            <div className={`${styles.headerBg} text-white text-center py-4 px-4 rounded-t-2xl shadow-xl`}>
                <h2 className="text-xl font-bold tracking-wide">{status}</h2>
                <div className="text-xs opacity-90 mt-1">{tasks.length} tasks</div>
            </div>
            
            {/* Drop alanı */}
            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className={`
                            ${snapshot.isDraggingOver ? styles.dragOver : styles.bg}
                            p-6 rounded-b-2xl shadow-2xl min-h-[500px] transition-all duration-300 ease-in-out
                            border-2 ${styles.border} border-t-0 backdrop-blur-sm
                        `}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                        
                        {/* Boş alan mesajı */}
                        {tasks.length === 0 && (
                            <div className="text-center text-gray-500 mt-8">
                                <div className="text-4xl mb-2">📋</div>
                                <p className="text-sm">Drop tasks here</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default TaskColumn; 