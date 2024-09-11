import React from 'react';
import { User } from '../api/Type';
import Table from './Table';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const headers = [
    { key: 'discordUsername' as keyof User, label: 'Username' },
    { key: 'pointsSent' as keyof User, label: 'Points Envoyés' },
    { key: 'pointsReceived' as keyof User, label: 'Points Reçus' },
    { key: 'balance' as keyof User, label: 'Solde' },
  ];

  return <Table data={users} headers={headers} />;
};

export default UserTable;