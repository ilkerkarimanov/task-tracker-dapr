using TaskTrackerWebApi.Domain;

namespace TaskTrackerWebApi.Application.Queries;

public static class TaskResultExtensions
{
    public static TaskResult ToTaskResult(this TaskEntity x) => new TaskResult()
    {
        TaskId = x.TaskId.ToString(),
        TaskName = x.TaskName,
        TaskAssignedTo = x.TaskAssignedTo,
        TaskDueDate = x.TaskDueDate.ToString("s"),
        TaskCreatedOn = x.TaskCreatedOn,
        TaskCreatedBy = x.TaskCreatedBy,
        IsCompleted = x.IsCompleted,
        IsOverdue = x.IsOverdue
    };
}