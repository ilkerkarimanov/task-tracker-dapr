using Carter;
using Carter.ModelBinding;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.OpenApi.Models;
using TaskTrackerWebApi.Application.Queries;

namespace TaskTrackerWebApi.Presentation.TaskEndpoints;

public class FetchTaskByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/tasks/{taskId}",
                async Task<Results<Ok<TaskResult>, UnprocessableEntity<IEnumerable<ModelError>>>>(
                    string taskId,
                    HttpContext ctx,
                    IMediator mediator) =>
                {
                    FetchTaskByTaskIdQuery request = new FetchTaskByTaskIdQuery()
                    {
                        TaskId = taskId
                    };

                    var validationResult = ctx.Request.Validate(request);

                    if (!validationResult.IsValid)
                    {
                        return TypedResults.UnprocessableEntity(validationResult.GetFormattedErrors());
                    }

                    FetchTaskByTaskIdQueryResult result = await mediator.Send(request);

                    return TypedResults.Ok(result.Data);
                })
            .WithOpenApi(operation => new OpenApiOperation(operation)
            {
                Summary = "Fetch task by taskId provided.",
                Description = "Fetch task by taskId provided."
            });
    }
}