using FluentValidation;

namespace TaskTrackerWebApi.Application.Commands;

public class AddTaskCommandValidator : AbstractValidator<AddTaskCommand> 
{
    public AddTaskCommandValidator()
    {
        RuleFor(x => x.TaskName).NotEmpty();
        RuleFor(x => x.TaskAssignedTo).NotEmpty().EmailAddress();
        RuleFor(x => x.TaskDueDate).NotEmpty();
        RuleFor(x => x.TaskId).NotEmpty();
    }
}