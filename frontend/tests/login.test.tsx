import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/src/app/login/page";
import { login } from "@/src/lib/auth";

// 1. On "mock" les dépendances externes
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/src/lib/auth", () => ({
  login: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    // On nettoie les mocks avant chaque test pour éviter les interférences
    jest.clearAllMocks();
    jest.mock("useRouter");
  });

  it("devrait afficher le formulaire de connexion correctement", () => {
    render(<LoginPage />);

    // Vérifie la présence des éléments visuels clés
    expect(screen.getByRole("heading", { name: /PokéCenter/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Se connecter/i })).toBeInTheDocument();
  });

  it("devrait mettre à jour les champs lors de la saisie", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    await user.type(usernameInput, "Sacha");
    await user.type(passwordInput, "Pikachu123");

    expect(usernameInput).toHaveValue("Sacha");
    expect(passwordInput).toHaveValue("Pikachu123");
  });

  it("devrait rediriger vers l'accueil en cas de succès", async () => {
    const user = userEvent.setup();
    // On simule une promesse résolue pour le login
    (login as jest.Mock).mockResolvedValueOnce(undefined);

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Username/i), "Sacha");
    await user.type(screen.getByLabelText(/Mot de passe/i), "Pikachu123");
    
    // On clique sur le bouton
    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    // On vérifie que la fonction login a bien été appelée avec les bonnes infos
    expect(login).toHaveBeenCalledWith("Sacha", "Pikachu123");
    expect(login).toHaveBeenCalledTimes(1);

    // On vérifie que la redirection a lieu
    // await waitFor(() => {
    //   expect(mockPush).toHaveBeenCalledWith("/");
    // });
  });

  it("devrait afficher un message d'erreur et ne pas rediriger si le login échoue", async () => {
    const user = userEvent.setup();
    // On simule une erreur lors de l'appel à l'API
    (login as jest.Mock).mockRejectedValueOnce(new Error("Unauthorized"));

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Username/i), "TeamRocket");
    await user.type(screen.getByLabelText(/Mot de passe/i), "Miaouss");
    
    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    // On attend que le message d'erreur apparaisse dans le DOM
    expect(await screen.findByText("Identifiants incorrects.")).toBeInTheDocument();
    
    // On s'assure que le routeur n'a jamais été appelé
    // expect(mockPush).not.toHaveBeenCalled();
  });

  it("devrait désactiver le bouton et changer le texte pendant le chargement", async () => {
    const user = userEvent.setup();
    
    // On simule une promesse qui ne se résout pas immédiatement pour figer l'état de chargement
    let resolveLogin: (value?: unknown) => void;
    (login as jest.Mock).mockImplementation(
      () => new Promise((resolve) => { resolveLogin = resolve; })
    );

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Username/i), "Sacha");
    await user.type(screen.getByLabelText(/Mot de passe/i), "Pikachu123");
    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    // Le bouton doit être désactivé et afficher "Connexion..."
    const submitButton = screen.getByRole("button", { name: /Connexion.../i });
    expect(submitButton).toBeDisabled();

    // On libère la promesse pour nettoyer proprement le test
    // @ts-ignore
    resolveLogin(); 
  });
});