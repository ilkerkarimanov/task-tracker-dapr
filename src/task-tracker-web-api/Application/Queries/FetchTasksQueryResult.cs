namespace TaskTrackerWebApi.Application.Queries;

public class FetchTasksQueryResult
{
    public IEnumerable<TaskResult> Data { get; init; } = default!;
}