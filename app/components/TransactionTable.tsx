import React from 'react';
import { Transaction } from '../api/Type';
import Table from './Table';

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

  return <Table data={transactions} headers={headers} />;
};

export default TransactionTable;
