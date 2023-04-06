using FluentValidation;
using TaskTrackerWebApi.Application.Commands;
using TaskTrackerWebApi.Application.Queries;

namespace TaskTrackerWebApi.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddValidation(this IServiceCollection services)
    {
        services.AddSingleton<IValidator<FetchTasksByAssigneeQuery>, FetchTasksByAssigneeQueryValidator>();
        services.AddSingleton<IValidator<FetchTaskByTaskIdQuery>, FetchTaskByTaskIdQueryValidator>();
        services.AddSingleton<IValidator<AddTaskCommand>, AddTaskCommandValidator>();
        services.AddSingleton<IValidator<EditTaskCommand>, EditTaskCommandValidator>();
        return services;
    }
}