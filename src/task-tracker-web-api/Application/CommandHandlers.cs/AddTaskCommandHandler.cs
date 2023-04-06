using MediatR;
using TaskTrackerWebApi.Application.Commands;
using TaskTrackerWebApi.Domain;

namespace TaskTrackerWebApi.Application.CommandHandlers.cs;

public class AddTaskCommandHandler: IRequestHandler<AddTaskCommand>
{
    private readonly ITaskCatalog _taskCatalog;

    public AddTaskCommandHandler(ITaskCatalog taskCatalog)
    {
        _taskCatalog = taskCatalog;
    }

    public async Task Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new TaskEntity(
        taskId: new Guid(request.TaskId),
        taskName: request.TaskName,
        taskDueDate: request.TaskDueDate,
        taskAssignedTo: request.TaskAssignedTo,
        isCompleted: false,
        isOverdue: false,
        taskCreatedOn: new DateTime(),
        taskCreatedBy: "ilker.karimanov@hotmail.com"
         );
         
        _taskCatalog.AddTask(task);

        await Task.CompletedTask;
    }
}