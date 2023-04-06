using MediatR;
using TaskTrackerWebApi.Application.Commands;
using TaskTrackerWebApi.Domain;

namespace TaskTrackerWebApi.Application.CommandHandlers.cs;

public class EditTaskCommandHandler: IRequestHandler<EditTaskCommand>
{
    private readonly ITaskCatalog _taskCatalog;

    public EditTaskCommandHandler(ITaskCatalog taskCatalog)
    {
        _taskCatalog = taskCatalog;
    }

    public async Task Handle(EditTaskCommand request, CancellationToken cancellationToken)
    {
        var existingTask = _taskCatalog.GetById(Guid.Parse(request.TaskId));
        if (existingTask is null)
        {
            throw new NullReferenceException();
        }

        var task = new TaskEntity(
            taskId: new Guid(request.TaskId),
            taskName: request.TaskName,
            taskDueDate: request.TaskDueDate,
            taskAssignedTo: request.TaskAssignedTo,
            isCompleted: existingTask.IsCompleted,
            isOverdue: existingTask.IsOverdue,
            taskCreatedOn: existingTask.TaskCreatedOn,
            taskCreatedBy: existingTask.TaskCreatedBy
        );

        _taskCatalog.EditTask(task);
        
        await Task.CompletedTask;
    }
}