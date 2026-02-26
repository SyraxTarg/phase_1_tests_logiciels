import { User } from "../lib/definitions";
import { getAllUsers } from "../lib/data";
import Link from "next/link";

export default async function UsersPage() {
  const users: User[] = await getAllUsers();

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Communauté de Troc
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            {users.length} dresseurs prêts à échanger
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {users.map((user) => (
              <li
                key={user.username}
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
                  href={`/profile/${user.username}`}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/30 shadow-sm shadow-indigo-200 inline-block"
                >
                  Voir le Deck
                </Link>
              </li>
            ))}
          </ul>

          {users.length === 0 && (
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
