import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskModel} from './task.model';
import taskApi from "./taskApi";
import {TaskAsyncState} from "./task.async.status";
import {TaskCreateModel} from "./taskCreate.model";
import {ApiError} from "./apiError";
import {TaskEditModel} from "./taskEdit.model";
import {Guid} from "guid-typescript";

// the type for the slice state
interface TaskState {
    tasks: TaskModel[]
    tasksLoaded: boolean,
    assignedToFilter: string
    status: TaskAsyncState
    error: string
}

// The initial state using that type
const initialState: TaskState = {
    tasks: [],
    tasksLoaded: false,
    assignedToFilter: '',
    status: TaskAsyncState.IDLE_STATUS,
    error: ''
}

// asynchronous function with createAsyncThunk 
export const fetchTasksAsync = createAsyncThunk<TaskModel[], void, { rejectValue: ApiError }>(
    'task/fetchTasks',
    async () => {
        return await taskApi.listTasks();
    }
);

export const addTaskAsync = createAsyncThunk<TaskModel, TaskCreateModel, { rejectValue: ApiError }>(
    'task/addTask',
    async (task) => {
        await taskApi.addTask(task);
        return await taskApi.getTaskById(task.taskId?.toString() ?? '');
    }
);

export const editTaskAsync = createAsyncThunk<TaskModel, TaskEditModel, { rejectValue: ApiError}>(
    'task/editTask',
    async (task) => {
        await taskApi.editTask(task);
        return await taskApi.getTaskById(task.taskId?.toString() ?? '');
    }
);

export const fetchTaskByAssignee = createAsyncThunk<TaskModel[], { userName: string }, { rejectValue: ApiError }>(
    'task/fetchTaskById',
    async (arg) => {
        return await taskApi.listTasksByAssignee(arg.userName);
    }
);

export const taskSlice = createSlice({
    name: 'task',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        saveFilter(state, action: PayloadAction<{ userName: string}>) {
            state.assignedToFilter = action.payload.userName;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = TaskAsyncState.LOADING_STATUS;
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                const dataResult = action.payload as TaskModel[];
                state.status = TaskAsyncState.IDLE_STATUS;
                state.tasksLoaded = true;
                state.tasks = dataResult;
            })
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                const errResult = action.payload as ApiError;
                state.status = TaskAsyncState.FAILURE_STATUS;
                state.error = errResult.error;
            })
            .addCase(addTaskAsync.pending, (state) => {
                state.status = TaskAsyncState.LOADING_STATUS;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.status = TaskAsyncState.IDLE_STATUS;
                state.tasks.push(action.payload);
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                const errResult = action.payload as ApiError;
                state.status = TaskAsyncState.FAILURE_STATUS;
                state.error = errResult.error;
            })
            .addCase(fetchTaskByAssignee.pending, (state) => {
                state.status = TaskAsyncState.LOADING_STATUS;
            })
            .addCase(fetchTaskByAssignee.fulfilled, (state, action) => {
                const dataResult = action.payload as TaskModel[];
                state.status = TaskAsyncState.IDLE_STATUS;
                state.tasks = dataResult;
                state.tasksLoaded = true;
            })
            .addCase(fetchTaskByAssignee.rejected, (state, action) => {
                const errResult = action.payload as ApiError;
                state.status = TaskAsyncState.FAILURE_STATUS;
                state.error = errResult.error;
            })
            .addCase(editTaskAsync.pending, (state) => {
                state.status = TaskAsyncState.LOADING_STATUS;
            })
            .addCase(editTaskAsync.fulfilled, (state, action) => {
                const dataResult = action.payload as TaskModel;
                state.status = TaskAsyncState.IDLE_STATUS;
                state.tasks = state.tasks.map(task => {
                    if(task.taskId?.equals(dataResult.taskId ?? Guid.createEmpty())){
                        task.taskName = dataResult.taskName;
                        task.taskAssignedTo = dataResult.taskAssignedTo;
                        task.taskDueDate = dataResult.taskDueDate;
                        task.taskCreatedBy = dataResult.taskCreatedBy;
                        task.taskCreatedOn = dataResult.taskCreatedOn;
                        task.isCompleted = dataResult.isCompleted;
                        task.isOverdue = dataResult.isOverdue;
                    }
                    return task;
                });
            })
            .addCase(editTaskAsync.rejected, (state, action) => {
                const errResult = action.payload as ApiError;
                state.status = TaskAsyncState.FAILURE_STATUS;
                state.error = errResult.error;
            });
    }
})

export const taskActions = taskSlice.actions