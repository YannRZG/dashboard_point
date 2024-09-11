import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TransactionTable from './components/TransactionTable';
import { User, Transaction } from './api/Type';
import UserTable from './components/UserTable';


export default async function Home() {
  // Récupérer les données côté serveur au moment du rendu
  const resUsers = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
  const users: User[] = await resUsers.json();

  const resTransactions = await fetch('http://localhost:3000/api/transactions', { cache: 'no-store' });
  const transactions: Transaction[] = await resTransactions.json();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <header className="bg-gray-900 text-white">
        <Navbar />
      </header>
      <main className="flex-grow p-8 sm:p-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Liste des Utilisateurs</h1>
        <UserTable users={users} />
        <h1 className="text-3xl font-bold m-6 text-center">Liste des Transactions</h1>
        <TransactionTable transactions={transactions} />
      </main>
      <Footer />
    </div>
  );
}
