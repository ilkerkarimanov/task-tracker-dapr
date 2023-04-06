namespace TaskTrackerWebApi.Application.Queries;

public class FetchTaskByTaskIdQueryResult
{
    public TaskResult Data { get; init; } = default!;
}