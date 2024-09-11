import React from 'react';
import { User } from '../api/Type';


interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-4 text-left ">Username</th>
            <th className="p-4 text-left ">Points Envoyés</th>
            <th className="p-4 text-left ">Points Reçus</th>
            <th className="p-4 text-left ">Solde</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.discordUsername} className=" hover:bg-gray-50">
              <td className="p-4">{user.discordUsername}</td>
              <td className="p-4">{user.pointsSent}</td>
              <td className="p-4">{user.pointsReceived}</td>
              <td className="p-4">{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
