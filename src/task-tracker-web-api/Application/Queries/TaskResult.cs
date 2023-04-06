namespace TaskTrackerWebApi.Application.Queries;

public class TaskResult
{
    public string TaskId { get; init; } = default!;
    public string TaskName { get; init; } = default!;
    public string TaskAssignedTo { get; init; } = default!;
    public string TaskDueDate { get; init; } = default!;
    public DateTime TaskCreatedOn { get; init; } = default!;
    public string TaskCreatedBy { get; init; } = default!;
    public bool IsCompleted { get; init; } = default!;
    public bool IsOverdue { get; init; } = default!;
}