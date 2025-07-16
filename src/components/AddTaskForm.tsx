import { useState } from 'react';
import type { TaskProps } from '../types';
import { nanoid } from 'nanoid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

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
            <Button variant="outline-dark" onClick={handleShow}>
                Add New Task
            </Button>
            <Modal show={show} onHide={handleClose}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title..."
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAssignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter assignee..."
                                value={assignee}
                                onChange={e => setAssignee(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={e => setStatus(e.target.value as "Pending" | "Ongoing" | "Completed")}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <div> <Button type="submit">Add</Button></div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddTaskForm;