import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RegisterStepOne } from "../RegisterStepOne";

vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    registerForm: { email: "", username: "" },
    setRegisterEmail: vi.fn(),
    setRegisterUsername: vi.fn(),
    setRegisterStep: vi.fn(),
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("RegisterStepOne", () => {
  it("renders the component", () => {
    render(<RegisterStepOne />);
    expect(screen.getByText("Email:")).toBeInTheDocument();
  });

  it("shows the username label", () => {
    render(<RegisterStepOne />);
    expect(screen.getByText("Nombre de usuario:")).toBeInTheDocument();
  });

  it("has a submit button with text Siguiente", () => {
    render(<RegisterStepOne />);
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeInTheDocument();
  });
});
