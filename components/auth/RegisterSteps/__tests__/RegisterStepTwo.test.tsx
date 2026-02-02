import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RegisterStepTwo } from "../RegisterStepTwo";

vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    registerForm: { password: "" },
    setRegisterPassword: vi.fn(),
    setRegisterStep: vi.fn(),
  }),
}));

describe("RegisterStepTwo", () => {
  it("renders the component", () => {
    render(<RegisterStepTwo onSubmit={vi.fn()} loading={false} error={null} />);
    expect(screen.getByText("Crea una contraseña nueva")).toBeInTheDocument();
  });

  it("shows Finalizar button when not loading", () => {
    render(<RegisterStepTwo onSubmit={vi.fn()} loading={false} error={null} />);
    expect(screen.getByRole("button", { name: "Finalizar" })).toBeInTheDocument();
  });

  it("shows error message when error prop is passed", () => {
    render(
      <RegisterStepTwo onSubmit={vi.fn()} loading={false} error="Error de red" />
    );
    expect(screen.getByText("Error de red")).toBeInTheDocument();
  });
});
