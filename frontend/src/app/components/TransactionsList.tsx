"use client";

import { Transaction } from "@/src/lib/definitions";
import { useState } from "react";

export default function TransactionsList({
  initialTransactions,
}: {
  initialTransactions: Transaction[];
}) {
  const [activeTab, setActiveTab] = useState<string>("pending");

  const filteredTransactions = initialTransactions.filter(
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
              {initialTransactions.filter((t) => t.status === tab.id).length}
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
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">
                  Échange avec{" "}
                  <span className="text-indigo-600">
                    {tx.receiver.username}
                  </span>
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-amber-100 text-amber-700">
                  {tx.status}
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="space-y-4 pt-4 md:pt-0">
                  <h4 className="font-semibold text-slate-600 flex items-center gap-2">
                    <span className="text-red-500">↑</span> Je propose
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
                    <span className="text-emerald-500">↓</span> Je demande
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

              {tx.messages.length > 0 && (
                <div className="bg-slate-50 p-4 border-t border-slate-100 text-sm text-slate-600">
                  <p className="font-semibold mb-2">Derniers messages :</p>
                  <ul className="space-y-2">
                    {tx.messages.map((msg) => (
                      <li
                        key={msg.id}
                        className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm"
                      >
                        <span className="font-bold text-slate-900">
                          {msg.user.username}
                        </span>{" "}
                        : {msg.content}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
