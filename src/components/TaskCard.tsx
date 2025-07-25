import type { TaskProps } from '../types';
import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';
import useDraggableInPortal from '../hooks/useDraggableInPortal';

interface TaskCardProps {
    task: TaskProps;
    index: number;
}

function TaskCard({task, index}: TaskCardProps) {
  const renderDraggable = useDraggableInPortal();
  
  // Status'e göre aksent rengi
  const getAccentColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-white';
      case 'Ongoing':
        return 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-white';
      case 'Completed':
        return 'border-l-green-500 bg-gradient-to-r from-green-50 to-white';
      default:
        return 'border-l-gray-500 bg-gradient-to-r from-gray-50 to-white';
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
        {renderDraggable((provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <div
                className={`
                  task-card w-full ${getAccentColor(task.status)} 
                  border-l-4 border border-gray-200 rounded-xl shadow-md hover:shadow-xl 
                  transition-all duration-300 cursor-grab active:cursor-grabbing mb-4
                  transform hover:scale-[1.02] hover:-translate-y-1
                  ${snapshot.isDragging ? 'shadow-2xl scale-105 rotate-2' : ''}
                `}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className={`${getBadgeColor(task.status)} border text-xs font-semibold px-3 py-1.5 rounded-full`}>
                            👤 {task.assignee}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          #{task.id.slice(-4)}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </Draggable>
  );
};

export default TaskCard; 