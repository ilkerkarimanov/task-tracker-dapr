using Carter;
using Carter.ModelBinding;
using MediatR;
using TaskTrackerWebApi.Application.Queries;

namespace TaskTrackerWebApi.Presentation.TaskEndpoints;

public class FetchTasksByAssigneeEndpoint: ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/tasksbyassignee/{assignedTo}", async (
                string assignedTo,
                HttpContext ctx,
                IMediator mediator) =>
            {
                FetchTasksByAssigneeQuery request = new FetchTasksByAssigneeQuery()
                {
                    AssignedTo = assignedTo
                };
                
                var validationResult = ctx.Request.Validate(request);

                if (!validationResult.IsValid)
                {
                    return Results.UnprocessableEntity(validationResult.GetFormattedErrors());
                }
                
                FetchTasksByAssigneeQueryResult result = await mediator.Send(request);
                
                return TypedResults.Ok(result.Data);
            })
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Fetch list of tasks by assignee.",
                Description = "Fetch list of tasks by assignee.",
            })
            .Produces<FetchTasksByAssigneeQueryResult>();
    }
}