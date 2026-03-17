"use client";

import { patchCardVisibility } from "@/src/lib/actions";
import { Card } from "@/src/lib/definitions";
import { useState } from "react";

export default function DeckEditor({ initialCards }: { initialCards: Card[] }) {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const toggleMask = async (cardId: number, currentMaskedStatus: boolean) => {
    const newMaskedStatus = !currentMaskedStatus;

    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, masked: newMaskedStatus } : c,
      ),
    );

    try {
      await patchCardVisibility(cardId, newMaskedStatus);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour de la carte.");
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, masked: currentMaskedStatus } : c,
        ),
      );
    }
  };

  if (cards.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-20 text-center">
        <p className="text-slate-500 font-medium">
          Tu n&apos;as pas encore de cartes dans ton deck.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cards.map((card) => {
        const isMasked = card.masked;

        return (
          <div
            key={card.id}
            className={`group bg-white rounded-2xl border shadow-xl overflow-hidden transition-all ${
              isMasked
                ? "border-slate-200 opacity-60 grayscale-[50%]"
                : "border-slate-100 hover:-translate-y-2 hover:shadow-2xl"
            }`}
          >
            <div className="relative aspect-3/4 bg-slate-100 overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${!isMasked && "group-hover:scale-110"}`}
              />

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  PV
                </span>
                <span className="ml-1 text-slate-900 font-extrabold">
                  {card.pv}
                </span>
              </div>

              <div
                className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleMask(card.id, !!isMasked)}
              >
                <input
                  type="checkbox"
                  checked={!isMasked}
                  readOnly
                  className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700">
                  {isMasked ? "Masquée" : "Visible"}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3
                  className={`text-xl font-extrabold tracking-tight ${isMasked ? "text-slate-500" : "text-slate-900"}`}
                >
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
        );
      })}
    </div>
  );
}
