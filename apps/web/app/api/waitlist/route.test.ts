import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function Resend() {
    return { emails: { send: sendMock } };
  }),
}));

import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 200 }))
    );
  });

  it("rejects a submission missing fullName", async () => {
    const res = await POST(makeRequest({ email: "a@example.com" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing required fields");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a submission missing email", async () => {
    const res = await POST(makeRequest({ fullName: "Ada Lovelace" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends a notification email and logs to the sheet on success", async () => {
    const res = await POST(
      makeRequest({ fullName: "Ada Lovelace", email: "ada@example.com", company: "Analytical Engines" })
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    expect(sendMock).toHaveBeenCalledTimes(1);
    const emailArgs = sendMock.mock.calls[0][0];
    expect(emailArgs.to).toHaveLength(1);
    expect(emailArgs.subject).toContain("Ada Lovelace");
    expect(emailArgs.html).toContain("ada@example.com");
    expect(emailArgs.html).toContain("Analytical Engines");

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, options] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain("script.google.com");
    expect(JSON.parse(options.body)).toEqual({
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
    });
  });

  it("defaults company to 'Not provided' in the email when omitted", async () => {
    await POST(makeRequest({ fullName: "Ada Lovelace", email: "ada@example.com" }));
    const emailArgs = sendMock.mock.calls[0][0];
    expect(emailArgs.html).toContain("Not provided");
  });

  it("returns a 500 when the Resend call fails", async () => {
    sendMock.mockRejectedValueOnce(new Error("Resend is down"));
    const res = await POST(makeRequest({ fullName: "Ada Lovelace", email: "ada@example.com" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Failed to process signup");
  });
});
