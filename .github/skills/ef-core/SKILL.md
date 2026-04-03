---
name: ef-core
description: "EF Core data access patterns. Use for: DbContext setup, entity configuration, migrations, AsNoTracking, CancellationToken, IEntityTypeConfiguration, in-memory database testing."
---

# EF Core Data Access

## DbContext Setup
```csharp
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
```

## Entity Configuration
```csharp
public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Title).IsRequired().HasMaxLength(200);
        builder.HasIndex(t => t.CreatedAt);
    }
}
```

## Registration
```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Migrations
```bash
dotnet ef migrations add InitialCreate --project src/App.Infrastructure --startup-project src/App.Web
dotnet ef database update --project src/App.Infrastructure --startup-project src/App.Web
```

## Rules
- One `DbContext` per bounded context. No god contexts.
- Use `AsNoTracking()` for read-only queries.
- Use `CancellationToken` on all async EF calls.
- Configure entities via `IEntityTypeConfiguration<T>`, not in `OnModelCreating`.
- Never expose `IQueryable` outside the infrastructure layer.
