using Carter;
using MediatR;
using TaskTrackerWebApi.Application.Queries;

namespace TaskTrackerWebApi.Presentation.TaskEndpoints;

public class FetchTasksEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/tasks", async (IMediator mediator) =>
            {
                FetchTasksQueryResult result = await mediator.Send(new FetchTasksQuery());
                return TypedResults.Ok(result.Data);
            })
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Fetch list of all tasks in the system.",
                Description = "Fetch list of all tasks in the system.",
            })
            .Produces<FetchTasksQueryResult>();
    }
}