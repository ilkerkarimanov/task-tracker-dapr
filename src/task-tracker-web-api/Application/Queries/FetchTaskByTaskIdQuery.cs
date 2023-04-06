using MediatR;

namespace TaskTrackerWebApi.Application.Queries;

public class FetchTaskByTaskIdQuery : IRequest<FetchTaskByTaskIdQueryResult>
{
    public string TaskId { get; init; } = default!;
}