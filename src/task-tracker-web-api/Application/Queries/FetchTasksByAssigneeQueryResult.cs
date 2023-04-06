namespace TaskTrackerWebApi.Application.Queries;

public class FetchTasksByAssigneeQueryResult
{
    public IEnumerable<TaskResult> Data { get; init; } = default!;
}