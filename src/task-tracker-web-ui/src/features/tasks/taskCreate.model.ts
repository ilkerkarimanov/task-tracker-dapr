import {Guid} from "guid-typescript";

export class TaskCreateModel {
    public taskId: Guid | undefined;
    public taskName: string | undefined;
    public taskDueDate: Date | undefined;
    public taskAssignedTo: string | undefined;
}