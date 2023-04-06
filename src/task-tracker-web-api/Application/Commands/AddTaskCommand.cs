using MediatR;

namespace TaskTrackerWebApi.Application.Commands;

public class AddTaskCommand : IRequest
{
    public string TaskId { get; init; } = default!;
    public string TaskName { get; init; } = default!;
    public DateTime TaskDueDate { get; init; } = default!;
    public string TaskAssignedTo { get; init; } = default!;
}