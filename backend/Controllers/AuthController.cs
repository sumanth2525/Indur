using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NizamProperty.Api.Services;

namespace NizamProperty.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private const string DemoOtp = "123456";
    private readonly TwilioVerifyService _verify;
    private readonly IWebHostEnvironment _env;

    public AuthController(TwilioVerifyService verify, IWebHostEnvironment env)
    {
        _verify = verify;
        _env = env;
    }

    [HttpGet("otp/status")]
    public IActionResult Status()
    {
        var demoAllowed = _env.IsDevelopment() && !_verify.IsConfigured;
        return Ok(new
        {
            twilioConfigured = _verify.IsConfigured,
            demoMode = demoAllowed,
        });
    }

    [HttpPost("otp/send")]
    [EnableRateLimiting("otp")]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Phone))
            return BadRequest(new { error = "Phone number is required." });

        try
        {
            if (!_verify.IsConfigured)
            {
                if (!_env.IsDevelopment())
                    return StatusCode(503, new { error = "Phone OTP is not configured for production." });

                _ = TwilioVerifyService.NormalizeIndianPhone(req.Phone);
                return Ok(new
                {
                    demo = true,
                    message = "Twilio is not configured. Use demo OTP in development only.",
                });
            }

            var result = await _verify.SendOtpAsync(req.Phone, ct);
            return Ok(new { demo = false, to = result.To, status = result.Status });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("otp/verify")]
    [EnableRateLimiting("otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Phone) || string.IsNullOrWhiteSpace(req.Code))
            return BadRequest(new { error = "Phone and OTP code are required." });

        try
        {
            bool approved;
            if (_verify.IsConfigured)
            {
                approved = await _verify.CheckOtpAsync(req.Phone, req.Code, ct);
            }
            else if (_env.IsDevelopment())
            {
                approved = string.Equals(req.Code.Trim(), DemoOtp, StringComparison.Ordinal);
            }
            else
            {
                return StatusCode(503, new { error = "Phone OTP is not configured for production." });
            }

            if (!approved)
                return BadRequest(new { error = "Invalid or expired OTP." });

            var phone = TwilioVerifyService.NormalizeIndianPhone(req.Phone);
            return Ok(new { verified = true, phone });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}

public record SendOtpRequest(string Phone);
public record VerifyOtpRequest(string Phone, string Code);
