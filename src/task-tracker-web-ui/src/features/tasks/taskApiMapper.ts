import {TaskModel} from "./task.model";
import {Guid} from "guid-typescript";
import {TaskCreateModel} from "./taskCreate.model";
import {TaskEditModel} from "./taskEdit.model";
export function createTaskResponse(resp: any): TaskModel {
    const task: TaskModel = {
        taskId: Guid.parse(resp.taskId),
        taskName: resp.taskName,
        taskAssignedTo: resp.taskAssignedTo,
        taskDueDate: new Date(resp.taskDueDate),
        taskCreatedBy: resp.taskCreatedBy,
        taskCreatedOn: new Date(resp.taskCreatedOn),
        isCompleted: resp.isCompleted,
        isOverdue: resp.isOverdue
    }
    return task;
}

export function createAddTaskRequest(task: TaskCreateModel): any {
    return {
        taskId: task.taskId?.toString(),
        taskName: task.taskName,
        taskDueDate: task.taskDueDate,
        taskAssignedTo: task.taskAssignedTo
    };
}

export function createEditTaskRequest(task: TaskEditModel): any {
    return {
        taskId: task.taskId?.toString(),
        taskName: task.taskName,
        taskDueDate: task.taskDueDate,
        taskAssignedTo: task.taskAssignedTo
    };
}