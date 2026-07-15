import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home page waitlist form", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }))
    );
  });

  it("renders the early access form", () => {
    render(<Home />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join waitlist \/ request early access/i })
    ).toBeInTheDocument();
  });

  it("submits the form data to /api/waitlist and shows a success message", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByLabelText(/full name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
    await user.type(screen.getByLabelText(/company/i), "Analytical Engines");
    await user.click(screen.getByRole("button", { name: /join waitlist \/ request early access/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          fullName: "Ada Lovelace",
          company: "Analytical Engines",
          email: "ada@example.com",
        }),
      })
    );
  });

  it("does not show the success message if the request fails", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "Failed" }), { status: 500 })
    );
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByLabelText(/full name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
    await user.click(screen.getByRole("button", { name: /join waitlist \/ request early access/i }));

    await waitFor(() => {
      expect(screen.getByRole("button")).not.toBeDisabled();
    });
    expect(screen.queryByText(/you're on the list/i)).not.toBeInTheDocument();
  });

  it("requires full name and email before submission", () => {
    render(<Home />);
    expect(screen.getByLabelText(/full name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/company/i)).not.toBeRequired();
  });
});
