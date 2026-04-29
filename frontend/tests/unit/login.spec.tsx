/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/src/app/login/page";
import { login } from "@/src/lib/auth";
import { useRouter } from "next/navigation";

jest.mock("@/src/lib/auth", () => ({
  login: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  const routerMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: routerMock });
  });

  it("should update inputs values", () => {
    render(<LoginPage />);
    
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/mot de passe/i) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "Alice" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("Alice");
    expect(passwordInput.value).toBe("password123");
  });

  it("should call login function and redirect user if username and password are correct", async () => {
    (login as jest.Mock).mockResolvedValueOnce(undefined);

    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: "password123" } });
    
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("Alice", "password123");
      expect(routerMock).toHaveBeenCalledWith("/");
    });
  });

  it("should display error message if login fails", async () => {
    (login as jest.Mock).mockRejectedValueOnce(new Error("Unauthorized"));

    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "Aliceeeeeee" } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: "notAlicePassword" } });
    
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    const errorMessage = await screen.findByText(/identifiants incorrects/i);
    expect(errorMessage).toBeInTheDocument();
    
    expect(routerMock).not.toHaveBeenCalled();
  });

  it("should disable login button when loading", async () => {
    (login as jest.Mock).mockReturnValue(new Promise((resolve) => setTimeout(resolve, 100)));

    render(<LoginPage />);
    
    const submitButton = screen.getByRole("button", { name: /se connecter/i });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: "password123" } });
    
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/connexion.../i);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});