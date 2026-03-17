"use client";

import { useState, useRef } from "react";
import { sendMessage } from "@/src/lib/actions";
import { Message, User } from "@/src/lib/definitions";

export default function TransactionChat({
  initialMessages,
  transactionId,
  currentUser,
}: {
  initialMessages: Message[];
  transactionId: number;
  currentUser: User;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSendMessage = async (formData: FormData) => {
    const content = formData.get("message") as string;
    if (!content || content.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      content: content,
      user: currentUser,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    formRef.current?.reset();

    try {
      await sendMessage(transactionId, content);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    }
  };

  return (
    <>
      <div className="bg-white border-x border-slate-200 flex-1 overflow-y-auto p-6 space-y-6 shadow-sm flex flex-col-reverse">
        <div className="space-y-6 flex flex-col">
          {messages.length > 0 ? (
            messages.map((msg: Message) => {
              const isMe = msg.user.id === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[75%] ${
                    isMe ? "self-end items-end" : "self-start items-start"
                  }`}
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
        <form ref={formRef} action={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            name="message"
            placeholder="Écrivez votre message..."
            required
            className="flex-1 px-5 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md focus:ring-4 focus:ring-indigo-500/30 cursor-pointer"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
}
