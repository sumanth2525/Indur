using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace NizamProperty.Api.Security;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequireAdminApiKeyAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        var expected = config["Api:AdminKey"];
        if (string.IsNullOrWhiteSpace(expected))
        {
            context.Result = new ObjectResult(new { error = "Admin API is not configured." })
            {
                StatusCode = StatusCodes.Status503ServiceUnavailable,
            };
            return;
        }

        if (!context.HttpContext.Request.Headers.TryGetValue("X-Admin-Key", out var provided)
            || provided != expected)
        {
            context.Result = new UnauthorizedObjectResult(new { error = "Invalid or missing admin key." });
        }
    }
}
