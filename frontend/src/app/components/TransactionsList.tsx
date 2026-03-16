"use client";

import { patchTransactionStatus, sendMessage } from "@/src/lib/actions";
import { getCurrentUser } from "@/src/lib/auth";
import { Transaction, User } from "@/src/lib/definitions";
import { useState } from "react";

export default function TransactionsList({
  initialTransactions,
  currentUser,
}: {
  initialTransactions: Transaction[];
  currentUser: User;
}) {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handleStatusUpdate = async (
    transactionId: number,
    newStatus: string,
  ) => {
    setIsLoading(transactionId);
    try {
      const res = await patchTransactionStatus(transactionId, newStatus);

      if (!res.ok) {
        alert("Erreur lors de la mise à jour de la proposition.");
        return;
      }

      const updatedTransaction: Transaction = await res.transaction;

      setTransactions((prevTransactions) =>
        prevTransactions.map((tx) =>
          tx.id === transactionId ? updatedTransaction : tx,
        ),
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur réseau est survenue.");
    } finally {
      setIsLoading(null);
    }
  };

  const handleSendMessage = async (
    formData: FormData,
    transactionId: number,
  ) => {
    const message = formData.get("message") as string;
    if (!message || message.trim() === "") return;

    await sendMessage(transactionId, message);

    setTransactions((prevTransactions) =>
      prevTransactions.map((tx) => {
        if (tx.id === transactionId) {
          return {
            ...tx,
            messages: [
              ...tx.messages,
              {
                id: Date.now(),
                content: message,
                user: currentUser,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return tx;
      }),
    );
  };

  const filteredTransactions = transactions.filter(
    (tx) => tx.status === activeTab,
  );

  const tabs = [
    { id: "pending", label: "En cours" },
    { id: "accepted", label: "Acceptées" },
    { id: "rejected", label: "Refusées" },
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-2 border-b border-slate-200 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-t-xl font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs py-0.5 px-2 rounded-full bg-slate-200 text-slate-600">
              {transactions.filter((t) => t.status === tab.id).length}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <p className="text-slate-500 font-medium">
              Aucune transaction pour ce statut.
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isMyProposal = tx.proposer.id === currentUser.id;
            const otherUser = isMyProposal ? tx.receiver : tx.proposer;

            return (
              <div
                key={tx.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">
                    Échange avec{" "}
                    <span className="text-indigo-600">
                      {otherUser.username}
                    </span>
                  </h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-amber-100 text-amber-700">
                    {tx.status}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  <div className="space-y-4 pt-4 md:pt-0">
                    <h4 className="font-semibold text-slate-600 flex items-center gap-2">
                      <span className="text-red-500">↑</span>{" "}
                      {isMyProposal
                        ? "Je propose"
                        : `${otherUser.username} propose`}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {tx.cardsExchange.map((card) => (
                        <div key={card.id} className="w-20 relative group">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full aspect-3/4 object-cover rounded-lg border border-slate-200 shadow-sm"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {card.pv} PV
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 md:pt-0 md:pl-8">
                    <h4 className="font-semibold text-slate-600 flex items-center gap-2">
                      <span className="text-emerald-500">↓</span>{" "}
                      {isMyProposal
                        ? "Je demande"
                        : `${otherUser.username} demande`}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {tx.cardsReceive.map((card) => (
                        <div key={card.id} className="w-20 relative group">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full aspect-3/4 object-cover rounded-lg border border-slate-200 shadow-sm"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {card.pv} PV
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100">
                  {tx.messages && tx.messages.length > 0 && (
                    <div className="mb-4 text-sm text-slate-600">
                      <p className="font-semibold mb-2">
                        Historique des messages :
                      </p>
                      <ul className="space-y-2">
                        {tx.messages.map((msg) => (
                          <li
                            key={msg.id}
                            className={`p-3 rounded-lg border shadow-sm ${
                              msg.user.id === currentUser.id
                                ? "bg-indigo-50 border-indigo-100 ml-8"
                                : "bg-white border-slate-100 mr-8"
                            }`}
                          >
                            <span className="font-bold text-slate-900 block text-xs mb-1">
                              {msg.user.username}
                            </span>
                            {msg.content}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Formulaire pour un nouveau message (uniquement si en cours) */}
                  {tx.status === "pending" && (
                    <form
                      action={(formData) => handleSendMessage(formData, tx.id)}
                      className="mt-2 flex gap-2"
                    >
                      <input
                        type="text"
                        name="message"
                        placeholder="Écrire un message..."
                        required
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                      >
                        Envoyer
                      </button>
                    </form>
                  )}
                </div>

                {tx.status === "pending" && (
                  <div className="bg-white p-4 border-t border-slate-200 flex justify-end items-center gap-3">
                    {isMyProposal ? (
                      <p className="text-sm text-slate-500 font-medium italic">
                        En attente d&apos;une réponse de {otherUser.username}...
                      </p>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(tx.id, "rejected")}
                          disabled={isLoading === tx.id}
                          className="px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50"
                        >
                          {isLoading === tx.id ? "..." : "Refuser"}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(tx.id, "accepted")}
                          disabled={isLoading === tx.id}
                          className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-md disabled:opacity-50"
                        >
                          {isLoading === tx.id ? "Mise à jour..." : "Accepter"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
