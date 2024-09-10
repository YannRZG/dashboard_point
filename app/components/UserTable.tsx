// components/UserTable.tsx
import React from 'react';

interface User {
  discordUsername: string;
  pointsSent: number;
  pointsReceived: number;
  balance: number;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-4 text-left tracking-wider">Username</th>
            <th className="p-4 text-left tracking-wider">Points Envoyés</th>
            <th className="p-4 text-left tracking-wider">Points Reçus</th>
            <th className="p-4 text-left tracking-wider">Solde</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.discordUsername} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm text-gray-900">{user.discordUsername}</td>
              <td className="p-4 text-sm text-gray-900">{user.pointsSent}</td>
              <td className="p-4 text-sm text-gray-900">{user.pointsReceived}</td>
              <td className="p-4 text-sm text-gray-900">{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
