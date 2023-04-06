using Carter;
using Carter.ModelBinding;
using MediatR;
using Microsoft.OpenApi.Models;
using TaskTrackerWebApi.Application.Commands;

namespace TaskTrackerWebApi.Presentation.TaskEndpoints;

public class EditTaskEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/tasks", async (
                EditTaskCommand request,
                HttpContext ctx,
                IMediator mediator) =>
            {
                var validationResult = ctx.Request.Validate(request);

                if (!validationResult.IsValid)
                {
                    return Results.UnprocessableEntity(validationResult.GetFormattedErrors());
                }
                
                await mediator.Send(request);
                
                return TypedResults.NoContent();
            })
            .WithOpenApi(operation => new OpenApiOperation(operation)
            {
                Summary = "Updates an existing task in the system.",
                Description = "Updates an existing task in the system."
            })
            .Accepts<EditTaskCommand>("application/json");
    }
}