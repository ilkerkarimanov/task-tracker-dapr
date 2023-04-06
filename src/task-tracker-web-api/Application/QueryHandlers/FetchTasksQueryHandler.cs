using MediatR;
using TaskTrackerWebApi.Application.Queries;
using TaskTrackerWebApi.Domain;

namespace TaskTrackerWebApi.Application.QueryHandlers;

public class FetchTasksQueryHandler : IRequestHandler<FetchTasksQuery, FetchTasksQueryResult>
{
    private readonly ITaskCatalog _taskCatalog;

    public FetchTasksQueryHandler(
        ITaskCatalog taskCatalog)
    {
        _taskCatalog = taskCatalog;
    }
    
    public Task<FetchTasksQueryResult> Handle(FetchTasksQuery request, CancellationToken cancellationToken)
    {
        var tasks = _taskCatalog.ListTasks();
        return Task.FromResult(new FetchTasksQueryResult()
        {
            Data = tasks.Select(x => x.ToTaskResult())
        });
    }
}