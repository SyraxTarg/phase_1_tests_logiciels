import React from "react";
import { User } from "../lib/definitions";
import { getAllUsers } from "../lib/data";
import { getCurrentUser } from "@/src/lib/auth";
import Link from "next/link";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();
  const allUsers: User[] = await getAllUsers();

  const otherUsers = currentUser
    ? allUsers.filter((user) => user.id !== currentUser.id)
    : allUsers;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {currentUser && (
              <p className="text-sm font-bold text-indigo-600 mb-1 uppercase tracking-wider">
                Connecté en tant que {currentUser.username}
              </p>
            )}

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Communauté de Troc
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              {otherUsers.length} dresseur{otherUsers.length > 1 ? "s" : ""}{" "}
              prêt{otherUsers.length > 1 ? "s" : ""} à échanger
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {currentUser && (
              <Link
                href={`/profile`}
                className="px-5 py-2.5 bg-white border border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-semibold rounded-xl transition-all shadow-sm inline-block h-min whitespace-nowrap"
              >
                Gérer mon Deck
              </Link>
            )}
            <Link
              href={`/transactions`}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/30 shadow-sm shadow-indigo-200 inline-block h-min whitespace-nowrap"
            >
              Mes transactions
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {otherUsers.map((user) => (
              <li
                key={user.id}
                className="group flex items-center justify-between p-6 transition-all hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold text-lg">
                      {user.username}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/profile/${user.id}`}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/30 shadow-sm shadow-indigo-200 inline-block"
                >
                  Voir le Deck
                </Link>
              </li>
            ))}
          </ul>

          {otherUsers.length === 0 && (
            <div className="py-20 text-center bg-red-50/30">
              <p className="text-slate-500 font-medium">
                Aucun dresseur n&apos;est en ligne pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
