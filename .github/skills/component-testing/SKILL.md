---
name: component-testing
description: "bUnit component testing patterns for Blazor. Use for: RenderComponent, parameter injection, event triggers, markup assertions, service mocks in Blazor tests."
---

# bUnit Component Testing

## Pattern
```csharp
public class StatCardTests : TestContext
{
    [Fact]
    public void Renders_Title_And_Value()
    {
        var cut = RenderComponent<StatCard>(p => p
            .Add(s => s.Title, "Users")
            .Add(s => s.Value, 42));

        cut.Find("h3").TextContent.Should().Be("Users");
        cut.Find(".value").TextContent.Should().Be("42");
    }

    [Fact]
    public void Click_RaisesCallback()
    {
        var clicked = false;
        var cut = RenderComponent<StatCard>(p => p
            .Add(s => s.Title, "Users")
            .Add(s => s.OnClick, EventCallback.Factory.Create(this, () => clicked = true)));

        cut.Find("button").Click();

        clicked.Should().BeTrue();
    }
}
```

## Service Injection
```csharp
public class DashboardPageTests : TestContext
{
    [Fact]
    public void Renders_Stats_From_Service()
    {
        var mockService = Substitute.For<IDashboardService>();
        mockService.GetStatsAsync().Returns(new List<StatDto> { new("Users", 42) });
        Services.AddSingleton(mockService);

        var cut = RenderComponent<DashboardPage>();

        cut.FindAll(".stat-card").Count.Should().Be(1);
    }
}
```

## Rules
- Use `TestContext` as base class for bUnit tests.
- Pass parameters via the fluent `Add()` builder.
- Use `Find()` / `FindAll()` with CSS selectors for assertions.
- Mock injected services via `Services.AddSingleton()`.
- Test rendering, parameters, events, and conditional display.
