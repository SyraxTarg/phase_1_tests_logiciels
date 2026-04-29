import React from "react";
import { getTransactionById, getMessagesByTransaction } from "@/src/lib/data";
import { getCurrentUser } from "@/src/lib/auth";
import Link from "next/link";
import { CardBasic } from "@/src/lib/definitions";
import TransactionChat from "../../components/TransactionChat";

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transactionId = parseInt(id, 10);

  const currentUser = await getCurrentUser();
  if (!currentUser || !transactionId) return;

  const transaction = await getTransactionById(transactionId);
  const messages = await getMessagesByTransaction(transactionId);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl font-bold text-slate-500">
          Transaction introuvable.
        </p>
      </div>
    );
  }

  const isMyProposal = transaction.proposer.id === currentUser.id;
  const otherUser = isMyProposal ? transaction.receiver : transaction.proposer;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col h-[90vh]">
        <header className="mb-6">
          <Link
            href="/transactions"
            className="text-indigo-600 font-semibold text-sm mb-4 inline-block hover:text-indigo-700 transition-colors"
          >
            ← Retour aux transactions
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Discussion avec{" "}
                <span className="text-indigo-600">{otherUser.username}</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
                Statut :
                <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  {transaction.status}
                </span>
              </p>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-t-3xl border border-slate-200 shadow-sm p-4 flex gap-6 overflow-x-auto text-sm">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-slate-700">Je propose :</span>
            {transaction.cardsExchange.map((c: CardBasic) => (
              <span
                key={c.id}
                className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg font-medium border border-indigo-100"
              >
                {c.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap border-l border-slate-200 pl-6">
            <span className="font-bold text-slate-700">Je demande :</span>
            {transaction.cardsReceive.map((c: CardBasic) => (
              <span
                key={c.id}
                className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-medium border border-emerald-100"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <TransactionChat
          initialMessages={messages ?? []}
          transactionId={transactionId}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
