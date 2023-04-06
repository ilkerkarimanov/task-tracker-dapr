namespace TaskTrackerWebApi.Domain;

public class TaskEntity
{
    public Guid TaskId { get; private set; }
    public string TaskName { get; private set; }
    public string TaskAssignedTo { get; private set; }
    public DateTime TaskDueDate { get; private set; }
    public bool IsCompleted { get; private set; }
    public bool IsOverdue { get; private set; }
    public string TaskCreatedBy { get; private set; }
    public DateTime TaskCreatedOn { get; private set; }

    public TaskEntity(
        Guid taskId,
        string taskName,
        string taskAssignedTo,
        DateTime taskDueDate,
        bool isCompleted,
        bool isOverdue,
        string taskCreatedBy,
        DateTime taskCreatedOn)
    {
        TaskId = taskId;
        TaskName = taskName;
        TaskAssignedTo = taskAssignedTo;
        TaskDueDate = taskDueDate;
        IsCompleted = isCompleted;
        IsOverdue = isOverdue;
        TaskCreatedBy = taskCreatedBy;
        TaskCreatedOn = taskCreatedOn;
    }
    
    public void MarkCompleted() => IsCompleted = true;
    public void MarkOverdue() => IsOverdue = true;
}