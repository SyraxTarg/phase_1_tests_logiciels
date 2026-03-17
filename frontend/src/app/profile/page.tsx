import { getCardsByUserId } from "@/src/lib/data";
import { getCurrentUser } from "@/src/lib/auth";
import Link from "next/link";
import DeckEditor from "../components/DeckEditor";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;

  const myCards = await getCardsByUserId(currentUser.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col justify-between gap-4">
          <div>
            <Link
              href="/"
              className="text-indigo-600 font-semibold text-sm mb-4 inline-block hover:text-indigo-700 transition-colors"
            >
              ← Retour à l&apos;accueil
            </Link>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              Mon Deck
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Gère la visibilité de tes cartes. Décoche une carte pour la cacher
              aux autres dresseurs.
            </p>
          </div>
        </header>

        <DeckEditor initialCards={myCards} />
      </div>
    </div>
  );
}
