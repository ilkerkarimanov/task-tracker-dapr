using FluentValidation;

namespace TaskTrackerWebApi.Application.Queries;

public class FetchTaskByTaskIdQueryValidator : AbstractValidator<FetchTaskByTaskIdQuery>
{
    public FetchTaskByTaskIdQueryValidator()
    {
        RuleFor(x => x.TaskId)
            .NotEmpty()
            .Must(x => Guid.TryParse(x, out Guid result)).WithMessage("Please provide a valid GUID value.");
    }
}