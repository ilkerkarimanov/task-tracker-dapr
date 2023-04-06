import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Link, useNavigate, useParams} from "react-router-dom";
import {fetchTaskByAssignee, fetchTasksAsync, taskActions} from "./taskSlice";
import {TaskAsyncState} from "./task.async.status";

export function TaskList() {
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    const {userName} = useParams();
    const tasksLoaded = useAppSelector(state => state.task.tasksLoaded);
    const asyncStatus = useAppSelector(state => state.task.status);
    const tasks = useAppSelector(state => state.task.tasks);

    useEffect(() => {
        appDispatch(taskActions.saveFilter({userName: userName ?? ''}))
        if (!tasksLoaded) {
            appDispatch(fetchTaskByAssignee({userName: userName ?? ''}));
        }
    }, [appDispatch, tasksLoaded, userName])

    if (asyncStatus === TaskAsyncState.LOADING_STATUS) {
        return <>Please wait, still loading...</>
    }

    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-10 col-lg-8 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fs-5">Tasks Dashboard</h5>
                            <h6 className="card-title text-center">Tasks of {userName}</h6>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Due Date</th>
                                    <th>Created By</th>
                                    <th>Assigned To</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    tasks.map(task => <tr key={task.taskId?.toString()} className="task-list-row">
                                        <td><Link to={`/tasks/${task.taskId}/edit`}>{task.taskName}</Link></td>
                                        <td>{task.taskDueDate?.toLocaleDateString()}</td>
                                        <td>{task.taskCreatedBy}</td>
                                        <td>{task.taskAssignedTo}</td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                            <button type="button" className="card-link" onClick={() => navigate("/tasks/new")}>Create
                                New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}