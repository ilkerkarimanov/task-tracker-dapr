import { Guid } from "guid-typescript";

export class TaskEditModel{
    public taskId: Guid | undefined;
    public taskName: string | undefined;
    public taskAssignedTo: string | undefined;
    public taskDueDate: Date | undefined;
}