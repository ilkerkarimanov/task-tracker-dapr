import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addTaskAsync} from "./taskSlice";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {TaskCreateModel} from "./taskCreate.model";
import {Guid} from "guid-typescript";

export function TaskCreate() {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const assignedToFilter = useAppSelector((state) => state.task.assignedToFilter);

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = React.useState({
        taskName: '',
        taskDueTo: '',
        taskAssignedTo: '',
    });

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const data: TaskCreateModel = {
            taskId: Guid.create(),
            taskName: formData.taskName,
            taskAssignedTo: formData.taskAssignedTo,
            taskDueDate: new Date(formData.taskDueTo)
        }

        appDispatch(addTaskAsync(data)).then(() => {
            navigate(`/tasks/${assignedToFilter}/list`);
        });
    };

    return <>
        <div className="container">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-5 fs-5">Create task</h5>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Name: </Form.Label>
                                        <Form.Control
                                            required
                                            minLength={3}
                                            type="text"
                                            id="taskName"
                                            value={formData.taskName}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please select a name, that is at least 3
                                            characters.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Due To:</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            id="taskDueTo"
                                            value={formData.taskDueTo}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please select a due to
                                            date.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Assigned To:</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            id="taskAssignedTo"
                                            value={formData.taskAssignedTo}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please select an assigned
                                            to.</Form.Control.Feedback>
                                    </Form.Group>
                                    <div className="d-grid gap-2 p-2">
                                        <Button type="submit" className={"btn-primary"}>Save</Button>
                                        <Button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Back
                                            to List</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}