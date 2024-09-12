import React from 'react';
import { Transaction } from '../api/Type';
import Table from './Table';
import Badge from './Badge'; // Assurez-vous que le chemin est correct
import Link from 'next/link';
import { FaLink } from 'react-icons/fa'; // Importer l'icône FaLink

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const headers: { key: keyof Transaction; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'senderId', label: 'Envoyeur' },
    { key: 'receiverId', label: 'Receveur' },
    { key: 'points', label: 'Points' },
    { key: 'description', label: 'Description' },
    { key: 'link', label: 'Lien' },
    { key: 'domainId', label: 'Domaine' },
  ];

  const transactionData = transactions.map(transaction => ({
    ...transaction,
    senderId: (
      <Link href={`/profile/${encodeURIComponent(transaction.senderId)}`} passHref>
        <Badge color="bg-red-500">{transaction.senderId}</Badge>
      </Link>
    ),
    receiverId: (
      <Link href={`/profile/${encodeURIComponent(transaction.receiverId)}`} passHref>
        <Badge color="bg-green-500">{transaction.receiverId}</Badge>
      </Link>
    ),
    link: (
      <a href={transaction.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 text-xl transform hover:scale-125 ">
        <FaLink /> 
      </a>
    ),
  }));

  return <Table data={transactionData} headers={headers} />;
};

export default TransactionTable;
