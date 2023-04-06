using System.Globalization;
using MediatR;
using TaskTrackerWebApi.Application.Queries;
using TaskTrackerWebApi.Domain;

namespace TaskTrackerWebApi.Application.QueryHandlers;

public class FetchTasksByTaskIdQueryHandler : IRequestHandler<FetchTaskByTaskIdQuery, FetchTaskByTaskIdQueryResult>
{
    private readonly ITaskCatalog _taskCatalog;

    public FetchTasksByTaskIdQueryHandler(ITaskCatalog taskCatalog)
    {
        _taskCatalog = taskCatalog;
    }

    public Task<FetchTaskByTaskIdQueryResult> Handle(FetchTaskByTaskIdQuery request, CancellationToken cancellationToken)
    {
        var task = _taskCatalog.GetById(Guid.Parse(request.TaskId));
        if (task is null)
        {
            throw new NullReferenceException();
        }
        return Task.FromResult(new FetchTaskByTaskIdQueryResult()
        {
            Data = task.ToTaskResult()
        });
    }
}