import React from 'react';
import { User } from '../api/Type';
import Link from 'next/link';
import Table from './Table';
import Badge from './Badge'; // Assurez-vous que le chemin est correct

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const headers = [
    { key: 'discordUsername' as keyof User, label: 'discordUsername' },
    { key: 'pointsSent' as keyof User, label: 'Points Envoyés' },
    { key: 'pointsReceived' as keyof User, label: 'Points Reçus' },
    { key: 'balance' as keyof User, label: 'Solde' },
  ];

  const userData = users.map(user => ({
    ...user,
    discordUsername: (
      <Link href={`/profile/${encodeURIComponent(user.discordUsername)}`} passHref>
        <Badge color="bg-blue-500">{user.discordUsername}</Badge> {/* Choisissez la couleur souhaitée */}
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
