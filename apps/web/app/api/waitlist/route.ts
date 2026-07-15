import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbxpdJXyEWW-KjBOAKufraFS6_VK3ltdP_GzoT89jBLu7eiFzFH2rOZMu33JvNUjXgGqQg/exec";

export async function POST(req: Request) {
  const { fullName, company, email } = await req.json();

  if (!fullName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Send email notification via Resend
    await resend.emails.send({
      from: "Nazara AI Waitlist <onboarding@resend.dev>",
      to: ["chineduobi423@gmail.com"],
      subject: `New Waitlist Signup: ${fullName}`,
      html: `
        <h2>New Early Access Signup</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
      `,
    });

    // Log to Google Sheet
    await fetch(SHEETS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ fullName, company, email }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}
