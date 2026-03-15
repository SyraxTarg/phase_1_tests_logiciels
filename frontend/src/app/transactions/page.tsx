import { getTransactionsByProposer } from "@/src/lib/data";
import TransactionsList from "../components/TransactionsList";
import Link from "next/link";
import { Transaction } from "@/src/lib/definitions";
import { getCurrentUser } from "@/src/lib/auth";

export default async function TransactionsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;

  const transactions: Transaction[] = await getTransactionsByProposer(
    currentUser.id,
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <Link
            href="/"
            className="text-indigo-600 font-semibold text-sm mb-4 inline-block hover:text-indigo-700 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Mes propositions d&apos;échange
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Gère tes transactions en cours et ton historique.
          </p>
        </header>

        <TransactionsList initialTransactions={transactions} />
      </div>
    </div>
  );
}
