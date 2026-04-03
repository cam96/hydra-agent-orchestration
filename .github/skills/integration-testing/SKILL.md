---
name: integration-testing
description: "Integration testing with WebApplicationFactory. Use for: API endpoint tests, HTTP client tests, full-stack .NET test host, database seeding in tests, IClassFixture."
---

# Integration Testing

## Pattern (WebApplicationFactory)
```csharp
public class TodoApiTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        var client = factory.CreateClient();
        var response = await client.GetAsync("/api/todos");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Create_ReturnsCreated_WithValidData()
    {
        var client = factory.CreateClient();
        var dto = new CreateTodoDto("Test Item");
        var response = await client.PostAsJsonAsync("/api/todos", dto);
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}
```

## Custom Factory with Test Database
```csharp
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
            if (descriptor != null) services.Remove(descriptor);

            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("TestDb"));
        });
    }
}
```

## Rules
- Use `WebApplicationFactory<Program>` for full HTTP pipeline testing.
- Replace real database with in-memory for test isolation.
- Test HTTP status codes, response bodies, and headers.
- Use `IClassFixture` to share the factory across tests in a class.
- Don't test implementation details — test the HTTP contract.
