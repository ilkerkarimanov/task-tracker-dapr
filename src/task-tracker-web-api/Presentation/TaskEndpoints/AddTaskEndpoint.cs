using Carter;
using Carter.ModelBinding;
using MediatR;
using Microsoft.OpenApi.Models;
using TaskTrackerWebApi.Application.Commands;

namespace TaskTrackerWebApi.Presentation.TaskEndpoints;

public class AddTaskEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/tasks", async (
                AddTaskCommand request,
                HttpContext ctx,
                IMediator mediator) =>
            {
                var validationResult = ctx.Request.Validate(request);

                if (!validationResult.IsValid)
                {
                    return Results.UnprocessableEntity(validationResult.GetFormattedErrors());
                }
                
                await mediator.Send(request);

                return TypedResults.Created("/api/tasks", request.TaskId);
            })
            .WithOpenApi(operation => new OpenApiOperation(operation)
            {
                Summary = "Create a new task in the system.",
                Description = "create a new task in the system."
            })
            .Accepts<AddTaskCommand>("application/json");
    }
}