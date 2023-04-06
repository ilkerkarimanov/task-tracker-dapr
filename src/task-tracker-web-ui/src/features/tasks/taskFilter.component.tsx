import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export function TaskFilter() {
    const navigate = useNavigate();
    const [tasksUserName, setTasksUserName] = useState('');

    const onFilterValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTasksUserName(e.target.value);
    };
    const onFilterButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(`/tasks/${tasksUserName}/list`);
    };
    
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fs-5">Welcome to Tasks Tracker</h5>
                            <div className="form-floating mb-3">
                                <input type="email" id="taskEmail" name="taskEmail" value={tasksUserName} onChange={onFilterValueChangeHandler} className="form-control" />
                                <label htmlFor="taskEmail">Email address</label>
                            </div>
                            <div className="d-grid gap-3">
                                <button type="button" onClick={onFilterButtonClickHandler} className="btn btn-primary
                                btn-login text-uppercase fw-bold p-2">Load Tasks</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

