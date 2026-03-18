"use client";

import { useState } from "react";
import { Card, TransactionContent } from "@/src/lib/definitions";
import { createNewTransaction } from "@/src/lib/actions";

interface TransactionModalProps {
  receiverId: number;
  receiverCards: Card[];
  proposerId: number;
  proposerCards: Card[];
}

export default function TransactionModal({
  receiverId,
  receiverCards,
  proposerId,
  proposerCards,
}: TransactionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [receiverCardIds, setReceiverCardIds] = useState<number[]>([]);
  const [proposerCardIds, setProposerCardIds] = useState<number[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSelection = (id: number, type: "receiver" | "proposer") => {
    if (type === "receiver") {
      setReceiverCardIds((prev) =>
        prev.includes(id)
          ? prev.filter((cardId) => cardId !== id)
          : [...prev, id],
      );
    } else {
      setProposerCardIds((prev) =>
        prev.includes(id)
          ? prev.filter((cardId) => cardId !== id)
          : [...prev, id],
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload: TransactionContent = {
      proposerId,
      proposerCardIds,
      receiverCardIds,
      receiverId,
      messageContent,
    };

    try {
      const response = await createNewTransaction(payload);

      if (response.ok) {
        alert("Proposition d'échange envoyée avec succès !");
        setIsOpen(false);

        setStep(1);
        setReceiverCardIds([]);
        setProposerCardIds([]);
        setMessageContent("");
      } else {
        alert("Erreur lors de l'envoi de la proposition.");
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/30 shadow-lg shadow-indigo-200"
      >
        Proposer un échange
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-extrabold text-slate-900">
                {step === 1 && "1. Quelles cartes veux-tu ?"}
                {step === 2 && "2. Que proposes-tu en retour ?"}
                {step === 3 && "3. Un petit mot ?"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white">
              {step === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {receiverCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => toggleSelection(card.id, "receiver")}
                      className={`cursor-pointer rounded-xl border-2 transition-all p-2 ${
                        receiverCardIds.includes(card.id)
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-slate-100 hover:border-indigo-300"
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full aspect-3/4 object-cover rounded-lg mb-2"
                      />
                      <p className="text-center text-sm font-bold text-slate-800">
                        {card.name}
                      </p>
                    </div>
                  ))}
                  {receiverCards.length === 0 && (
                    <p>Aucune carte disponible.</p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {proposerCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => toggleSelection(card.id, "proposer")}
                      className={`cursor-pointer rounded-xl border-2 transition-all p-2 ${
                        proposerCardIds.includes(card.id)
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-slate-100 hover:border-indigo-300"
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full aspect-3/4 object-cover rounded-lg mb-2"
                      />
                      <p className="text-center text-sm font-bold text-slate-800">
                        {card.name}
                      </p>
                    </div>
                  ))}
                  {proposerCards.length === 0 && (
                    <p>Tu n&apos;as aucune carte à proposer.</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <p className="text-slate-600 font-medium">
                    Tu demandes {receiverCardIds.length} carte(s) contre{" "}
                    {proposerCardIds.length} de tes cartes.
                  </p>
                  <textarea
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none min-h-37.5"
                    placeholder="Salut, je suis très intéressé par ton Dracaufeu. Que dis-tu de mon Tortank en échange ?"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-between bg-slate-50">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Retour
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={(step === 1 && receiverCardIds.length === 0)||
                    (step === 2 && proposerCardIds.length === 0)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer la proposition"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
