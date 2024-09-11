'use client';

import React, { useEffect, useState } from 'react';

const UserCount: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const res = await fetch('http://localhost:3000/api/users');
      const users = await res.json();
      setCount(users.length);
    };

    fetchUserCount();
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Membres : {count}
        </h2>
      </div>
    </div>
  );
};

export default UserCount;
