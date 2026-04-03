---
name: unit-testing
description: "Unit testing patterns with xUnit and FluentAssertions. Use for: service tests, domain logic tests, in-memory database, test naming conventions, NullLogger, test isolation."
---

# Unit Testing

## Pattern (xUnit + FluentAssertions)
```csharp
public class TodoServiceTests
{
    private readonly AppDbContext _db;
    private readonly TodoService _sut;

    public TodoServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new AppDbContext(options);
        _sut = new TodoService(_db, NullLogger<TodoService>.Instance);
    }

    [Fact]
    public async Task GetAllAsync_ReturnsAllItems()
    {
        _db.TodoItems.Add(new TodoItem { Title = "Test" });
        await _db.SaveChangesAsync();

        var result = await _sut.GetAllAsync();

        result.Should().HaveCount(1);
        result[0].Title.Should().Be("Test");
    }
}
```

## Rules
- Name tests: `[Method]_[Scenario]_[ExpectedResult]`.
- Use `FluentAssertions` for readable assertions.
- Use in-memory DB for unit tests isolating EF Core.
- Mock external dependencies; never mock EF Core directly.
- One assert concept per test. Multiple `Should()` calls for the same concept are fine.
