using MediatR;
using TaskTrackerWebApi.Application.Queries;
using TaskTrackerWebApi.Domain;

namespace TaskTrackerWebApi.Application.QueryHandlers;

public class FetchTasksByAssigneeQueryHandler : IRequestHandler<FetchTasksByAssigneeQuery, FetchTasksByAssigneeQueryResult>
{
    private readonly ITaskCatalog _taskCatalog;

    public FetchTasksByAssigneeQueryHandler(
        ITaskCatalog taskCatalog)
    {
        _taskCatalog = taskCatalog;
    }
    public Task<FetchTasksByAssigneeQueryResult> Handle(FetchTasksByAssigneeQuery request, CancellationToken cancellationToken)
    {
        var tasks = _taskCatalog.ListTasksByAssignee(request.AssignedTo);
        return Task.FromResult(new FetchTasksByAssigneeQueryResult()
        {
            Data = tasks.Select(x => x.ToTaskResult())
        });
    }
}