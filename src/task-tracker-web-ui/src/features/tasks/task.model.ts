import { Guid } from "guid-typescript";

export class TaskModel {
    public taskId: Guid | undefined;
    public taskName: string | undefined;
    public taskCreatedBy: string | undefined;
    public taskCreatedOn: Date | undefined;
    public taskDueDate: Date | undefined;
    public taskAssignedTo: string | undefined;
    public isCompleted: boolean | undefined;
    public isOverdue: boolean | undefined;
}