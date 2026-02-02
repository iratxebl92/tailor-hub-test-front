import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoginForm } from "../LoginForm";

describe('LoginForm', () => {
  it('should render the component correctly', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  
    it('username input has pattern for alphanumeric only', () => {
      render(<LoginForm />);
      const usernameInput = screen.getByTestId('username-input');
      expect(usernameInput).toHaveAttribute('pattern', '^[a-zA-Z0-9]+$');
    });

    it('password input has pattern for allowed special chars', () => {
      render(<LoginForm />);
      const passwordInput = screen.getByTestId('password-input');
      expect(passwordInput).toHaveAttribute(
        'pattern',
        "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\\\\|,.<>/?]*$"
      );
    });


}); 