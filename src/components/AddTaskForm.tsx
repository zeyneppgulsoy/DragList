import { useState } from 'react';
import type { TaskProps } from '../types';
import { nanoid } from 'nanoid';

interface AddTaskFormProps {
    addTask: (task: TaskProps) => void;
}

function AddTaskForm({ addTask }: AddTaskFormProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("Pending");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !description || !assignee) {
            setError("All fields must be filled.");
            return;
        }
        const newTask: TaskProps = {
            id: nanoid(),
            title,
            description,
            status,
            assignee,
        };
        addTask(newTask);
        setTitle("");
        setDescription("");
        setAssignee("");
        setStatus("Pending");
        setError(null);
        handleClose();
    };

    return (
        <>
            {/* Add Task Button */}
            <button
                onClick={handleShow}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 border border-emerald-400"
            >
                ✨ Add New Task
            </button>

            {/* Modal Overlay */}
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 m-4 w-full max-w-md transform transition-all duration-300 scale-100">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200"
                            >
                                ×
                            </button>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter task title..."
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Enter description..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                            </div>

                            {/* Assignee Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assignee
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter assignee..."
                                    value={assignee}
                                    onChange={e => setAssignee(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            {/* Status Select */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={e => setStatus(e.target.value as "Pending" | "Ongoing" | "Completed")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddTaskForm;