using MediatR;

namespace TaskTrackerWebApi.Application.Queries;

public class FetchTasksByAssigneeQuery : IRequest<FetchTasksByAssigneeQueryResult>
{
    public string AssignedTo { get; init; } = default!;
}