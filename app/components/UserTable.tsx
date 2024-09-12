import React from 'react';
import { User } from '../api/Type';
import Link from 'next/link';
import Table from './Table';  // Réutilisation du composant Table

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

  // Préparer les données en remplaçant le champ discordUsername par le composant Link
  const userData = users.map(user => ({
    ...user,
    discordUsername: (
      <Link href={`/profile/${encodeURIComponent(user.discordUsername)}`}>
        {user.discordUsername}
      </Link>
    ),
  }));

  return (
    <div className="overflow-x-auto">
      <Table data={userData} headers={headers} />
    </div>
  );
};

export default UserTable;
