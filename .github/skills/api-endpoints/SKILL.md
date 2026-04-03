---
name: api-endpoints
description: "Minimal API and service patterns. Use for: MapGroup, TypedResults, endpoint routing, service interfaces, Result<T>, DI registration, CancellationToken."
---

# API Endpoint Patterns

## Minimal API (Preferred for new endpoints)
```csharp
public static class TodoEndpoints
{
    public static void MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/todos").RequireAuthorization();

        group.MapGet("/", GetAll);
        group.MapGet("/{id:int}", GetById);
        group.MapPost("/", Create);
        group.MapPut("/{id:int}", Update);
        group.MapDelete("/{id:int}", Delete);
    }

    private static async Task<Results<Ok<List<TodoDto>>, Problem>> GetAll(
        ITodoService service, CancellationToken ct)
    {
        var result = await service.GetAllAsync(ct);
        return TypedResults.Ok(result);
    }
}
```

## Registration
```csharp
// Program.cs
app.MapTodoEndpoints();
```

## Service Pattern
```csharp
public interface ITodoService
{
    Task<List<TodoDto>> GetAllAsync(CancellationToken ct = default);
    Task<TodoDto?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Result<TodoDto>> CreateAsync(CreateTodoDto dto, CancellationToken ct = default);
}

public class TodoService(AppDbContext db, ILogger<TodoService> logger) : ITodoService
{
    public async Task<List<TodoDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await db.TodoItems
            .AsNoTracking()
            .Select(t => new TodoDto(t.Id, t.Title, t.IsComplete))
            .ToListAsync(ct);
    }
}
```

## Rules
- Use `TypedResults` for compile-time endpoint metadata.
- Group related endpoints in static classes with `MapGroup`.
- Return `Result<T>` from services, convert to HTTP responses in endpoints.
- Use `[FromBody]`, `[FromQuery]`, `[FromRoute]` explicitly for clarity.
