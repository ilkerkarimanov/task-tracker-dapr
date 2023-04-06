FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["task-tracker-web-api.csproj", "task-tracker-web-api/"]
RUN dotnet restore "task-tracker-web-api/task-tracker-web-api.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "task-tracker-web-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "task-tracker-web-api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskTrackerWebApi.dll"]
