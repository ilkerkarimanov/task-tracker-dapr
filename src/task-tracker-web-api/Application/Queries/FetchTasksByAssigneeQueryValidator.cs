using FluentValidation;

namespace TaskTrackerWebApi.Application.Queries;

public class FetchTasksByAssigneeQueryValidator : AbstractValidator<FetchTasksByAssigneeQuery>
{
    public FetchTasksByAssigneeQueryValidator()
    {
        RuleFor(x => x.AssignedTo).NotEmpty().EmailAddress();
    }
}