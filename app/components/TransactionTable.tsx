import { Transaction } from '@/types'; // Assurez-vous que le type Transaction est défini dans un fichier de types

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Envoyeur</th>
            <th className="p-4 text-left">Receveur</th>
            <th className="p-4 text-left">Points</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Lien</th>
            <th className="p-4 text-left">Domaine</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{transaction.id}</td>
              <td className="p-4">{transaction.senderId}</td>
              <td className="p-4">{transaction.receiverId}</td>
              <td className="p-4">{transaction.points}</td>
              <td className="p-4">{transaction.description}</td>
              <td className="p-4">
                <a href={transaction.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {transaction.link}
                </a>
              </td>
              <td className="p-4">{transaction.domainId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
