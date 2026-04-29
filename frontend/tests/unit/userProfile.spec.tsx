/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserProfilePage from "@/src/app/profile/[id]/page";
import { getUserById, getCardsByUserId } from "@/src/lib/data";
import { getCurrentUser } from "@/src/lib/auth";

jest.mock("@/src/lib/data");
jest.mock("@/src/lib/auth");
jest.mock("@/src/app/components/TransactionModal", () => {
  return function MockModal() { return <button data-testid="modal">Échanger</button>; };
});

describe("UserProfilePage", () => {
  const mockTargetUser = { id: "10", username: "Alice" };
  const mockCards = [
    { id: 1, name: "Pikachu", masked: false, image: "", pv: 60, type: "Electrique", description: "" },
    { id: 2, name: "Mewtwo", masked: true, image: "", pv: 100, type: "Psy", description: "" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getUserById as jest.Mock).mockResolvedValue(mockTargetUser);
  });

  it("should display only non-masked cards", async () => {
    (getCardsByUserId as jest.Mock).mockResolvedValue(mockCards);
    (getCurrentUser as jest.Mock).mockResolvedValue(null);

    const params = Promise.resolve({ id: "10" });
    render(await UserProfilePage({ params }));

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.queryByText("Mewtwo")).not.toBeInTheDocument();
    expect(screen.getByText("1 cartes disponibles au troc")).toBeInTheDocument();
  });

  it("should not display TransactionModal if profile is current user's profile", async () => {
    (getCardsByUserId as jest.Mock).mockResolvedValue([]);
    (getCurrentUser as jest.Mock).mockResolvedValue({ id: 10 });

    const params = Promise.resolve({ id: "10" });
    render(await UserProfilePage({ params }));

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("should display TransactionModal if not current user's profile", async () => {
    (getCardsByUserId as jest.Mock).mockResolvedValue([]);
    (getCurrentUser as jest.Mock).mockResolvedValue({ id: 99 });

    const params = Promise.resolve({ id: "10" });
    render(await UserProfilePage({ params }));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("should display message when no cards to display", async () => {
    (getCardsByUserId as jest.Mock).mockResolvedValue([{ id: 1, name: "Cachée", masked: true }]);
    (getCurrentUser as jest.Mock).mockResolvedValue(null);

    const params = Promise.resolve({ id: "10" });
    render(await UserProfilePage({ params }));

    expect(screen.getByText(/n'a pas encore de cartes à échanger/i)).toBeInTheDocument();
  });
});