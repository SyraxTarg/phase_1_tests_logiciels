/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProfilePage from "@/src/app/profile/page";
import { getCurrentUser } from "@/src/lib/auth";
import { getCardsByUserId } from "@/src/lib/data";

jest.mock("@/src/lib/auth");
jest.mock("@/src/lib/data");
jest.mock("@/src/app/components/DeckEditor", () => {
  return function DummyDeckEditor({ initialCards }) {
    return <div data-testid="deck-editor">{initialCards.length} cartes</div>;
  };
});

describe("ProfilePage", () => {
  it("should display nothing if user is not connected", async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue(null);
    
    const { container } = render(await ProfilePage());
    expect(container).toBeEmptyDOMElement();
  });

  it("should load and display card if user is connected", async () => {
    const mockUser = { id: 1, name: "Alice" };
    const mockCards = [{ id: 1, name: "Salamèche" }];
    
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (getCardsByUserId as jest.Mock).mockResolvedValue(mockCards);

    render(await ProfilePage());

    expect(screen.getByText("Mon Deck")).toBeInTheDocument();
    expect(screen.getByTestId("deck-editor")).toHaveTextContent("1 cartes");
  });
});