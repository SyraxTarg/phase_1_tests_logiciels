import { getTransactionById, getMessagesByTransaction } from "@/src/lib/data";
import { sendMessage } from "@/src/lib/actions";

import { getCurrentUser } from "@/src/lib/auth";
import Link from "next/link";
import { Card, Message } from "@/src/lib/definitions";

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

  const handleSendMessage = async (formData: FormData) => {
    "use server";
    const content = formData.get("message") as string;
    if (!content || content.trim() === "") return;

    await sendMessage(transactionId, content);
  };

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
            {transaction.cardsExchange.map((c: Card) => (
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
            {transaction.cardsReceive.map((c: Card) => (
              <span
                key={c.id}
                className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-medium border border-emerald-100"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border-x border-slate-200 flex-1 overflow-y-auto p-6 space-y-6 shadow-sm flex flex-col-reverse">
          <div className="space-y-6 flex flex-col">
            {messages && messages.length > 0 ? (
              messages.map((msg: Message) => {
                const isMe = msg.user.id === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
                  >
                    <span className="text-xs font-bold text-slate-400 mb-1 px-1">
                      {isMe ? "Moi" : msg.user.username}
                    </span>
                    <div
                      className={`px-5 py-3 rounded-2xl shadow-sm ${
                        isMe
                          ? "bg-indigo-600 text-white rounded-tr-sm"
                          : "bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.timestamp && (
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center h-full">
                <p className="text-slate-400 font-medium italic">
                  Aucun message pour l&apos;instant. Lance la discussion !
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-b-3xl shadow-md">
          <form action={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              name="message"
              placeholder="Écrivez votre message..."
              required
              className="flex-1 px-5 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
