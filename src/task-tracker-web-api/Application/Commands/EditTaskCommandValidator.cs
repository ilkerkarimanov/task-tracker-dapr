using FluentValidation;

namespace TaskTrackerWebApi.Application.Commands;

public class EditTaskCommandValidator : AbstractValidator<EditTaskCommand> 
{
    public EditTaskCommandValidator()
    {
        RuleFor(x => x.TaskName).NotEmpty();
        RuleFor(x => x.TaskAssignedTo).NotEmpty().EmailAddress();
        RuleFor(x => x.TaskDueDate).NotEmpty();
        RuleFor(x => x.TaskId).NotEmpty();
    }
}