import React from "react";
import { Card, User } from "@/src/lib/definitions";
import { getCardsByUserId, getUserById } from "@/src/lib/data";
import Link from "next/link";
import { getCurrentUser } from "@/src/lib/auth";
import TransactionModal from "@/src/app/components/TransactionModal";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const user: User | null = await getUserById(parseInt(userId));

  const allCards: Card[] = await getCardsByUserId(parseInt(userId));
  const visibleCards = allCards.filter((card) => !card.masked);

  const currentUser = await getCurrentUser();
  let myVisibleCards: Card[] = [];

  if (currentUser) {
    const myAllCards = await getCardsByUserId(currentUser.id);
    myVisibleCards = myAllCards.filter((card) => !card.masked);
  }

  if (!user) return;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link
              href="/"
              className="text-indigo-600 font-semibold text-sm mb-4 inline-block hover:text-indigo-700 transition-colors"
            >
              ← Retour aux dresseurs
            </Link>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              Profil de {user.username}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              {visibleCards.length} cartes disponibles au troc
            </p>
          </div>

          {currentUser && currentUser.id !== parseInt(userId) && (
            <TransactionModal
              receiverId={user.id}
              receiverCards={visibleCards}
              proposerId={currentUser.id}
              proposerCards={myVisibleCards}
            />
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-3/4 bg-slate-100 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    PV
                  </span>
                  <span className="ml-1 text-slate-900 font-extrabold">
                    {card.pv}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {card.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600 uppercase tracking-widest">
                    {card.type}
                  </span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleCards.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-20 text-center">
            <p className="text-slate-500 font-medium">
              Ce dresseur n&apos;a pas encore de cartes à échanger.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
