import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RegisterForm } from "../RegisterForm";

vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    registerStep: 1,
    registerForm: { username: "", password: "" },
    setAuthData: vi.fn(),
    resetRegisterForm: vi.fn(),
  }),
}));

vi.mock("@/hooks/useAuth", () => ({
  useRegister: () => ({ register: vi.fn(), loading: false, error: null }),
  useLogin: () => ({ login: vi.fn(), loading: false, error: null }),
}));

vi.mock("../RegisterSteps/RegisterStepOne", () => ({
  RegisterStepOne: () => <div data-testid="step-one">Step 1</div>,
}));

vi.mock("../RegisterSteps/RegisterStepTwo", () => ({
  RegisterStepTwo: () => <div data-testid="step-two">Step 2</div>,
}));

describe("RegisterForm", () => {
  it("renders the component", () => {
    render(<RegisterForm />);
    expect(screen.getByText("Inicia sesión")).toBeInTheDocument();
  });

  it("shows the login link text", () => {
    const accountExistsText = "¿Ya tienes cuenta?";
    render(<RegisterForm />);
    expect(screen.getByText(accountExistsText)).toBeInTheDocument();
  });

  it("has a link to login page", () => {
    render(<RegisterForm />);
    const link = screen.getByRole("link", { name: "Inicia sesión" });
    expect(link).toHaveAttribute("href", "/login");
  });
});
