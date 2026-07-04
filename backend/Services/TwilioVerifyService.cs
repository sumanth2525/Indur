using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;
using NizamProperty.Api.Options;

namespace NizamProperty.Api.Services;

public class TwilioVerifyService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
    };

    private readonly HttpClient _http;
    private readonly TwilioOptions _options;
    private readonly ILogger<TwilioVerifyService> _logger;

    public TwilioVerifyService(
        HttpClient http,
        IOptions<TwilioOptions> options,
        ILogger<TwilioVerifyService> logger)
    {
        _http = http;
        _options = options.Value;
        _logger = logger;
    }

    public bool IsConfigured => _options.IsConfigured;

    public static string NormalizeIndianPhone(string phone)
    {
        var digits = new string(phone.Where(char.IsDigit).ToArray());
        if (digits.Length == 10)
            return $"+91{digits}";
        if (digits.Length == 12 && digits.StartsWith("91"))
            return $"+{digits}";
        if (phone.TrimStart().StartsWith('+') && digits.Length >= 10)
            return $"+{digits}";
        throw new ArgumentException("Enter a valid 10-digit Indian mobile number.");
    }

    public async Task<VerifySendResult> SendOtpAsync(string phone, CancellationToken ct = default)
    {
        var to = NormalizeIndianPhone(phone);
        var url = $"https://verify.twilio.com/v2/Services/{_options.VerifyServiceSid}/Verifications";

        using var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["To"] = to,
            ["Channel"] = "sms",
        });

        using var response = await _http.PostAsync(url, content, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogWarning("Twilio Verify send failed for {Phone}: {Status} {Body}", to, response.StatusCode, body);
            throw new InvalidOperationException(ParseTwilioError(body) ?? "Could not send verification code.");
        }

        var verification = JsonSerializer.Deserialize<TwilioVerificationResponse>(body, JsonOptions);
        return new VerifySendResult(to, verification?.Status ?? "pending");
    }

    public async Task<bool> CheckOtpAsync(string phone, string code, CancellationToken ct = default)
    {
        var to = NormalizeIndianPhone(phone);
        var url = $"https://verify.twilio.com/v2/Services/{_options.VerifyServiceSid}/VerificationCheck";

        using var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["To"] = to,
            ["Code"] = code.Trim(),
        });

        using var response = await _http.PostAsync(url, content, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogWarning("Twilio Verify check failed for {Phone}: {Status} {Body}", to, response.StatusCode, body);
            return false;
        }

        var check = JsonSerializer.Deserialize<TwilioVerificationCheckResponse>(body, JsonOptions);
        return string.Equals(check?.Status, "approved", StringComparison.OrdinalIgnoreCase);
    }

    private static string? ParseTwilioError(string body)
    {
        try
        {
            var error = JsonSerializer.Deserialize<TwilioErrorResponse>(body, JsonOptions);
            return error?.Message;
        }
        catch
        {
            return null;
        }
    }

    private sealed class TwilioVerificationResponse
    {
        [JsonPropertyName("status")]
        public string? Status { get; set; }
    }

    private sealed class TwilioVerificationCheckResponse
    {
        [JsonPropertyName("status")]
        public string? Status { get; set; }
    }

    private sealed class TwilioErrorResponse
    {
        [JsonPropertyName("message")]
        public string? Message { get; set; }
    }
}

public record VerifySendResult(string To, string Status);
