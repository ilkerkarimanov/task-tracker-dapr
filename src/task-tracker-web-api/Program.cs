using Carter;
using TaskTrackerWebApi.Application;
using TaskTrackerWebApi.Domain;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();

/*
var corsPolicy = "CORS";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy,
        builder => builder
            .SetIsOriginAllowed((host) => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
*/

builder.Services.AddTransient<ITaskCatalog, TaskCatalog>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddValidation();
builder.Services.AddCarter();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
} 
else
{
    app.UseExceptionHandler();
    app.UseHsts();
}

app.UseStatusCodePages();

app.MapGet("/", () => TypedResults.Ok());

app.MapCarter();
/*
app.UseCors(corsPolicy);
*/

app.Run();