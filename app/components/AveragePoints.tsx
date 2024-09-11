'use client';

import React, { useEffect, useState } from 'react';

const AveragePoints: React.FC = () => {
    const [averagePoints, setAveragePoints] = useState<number>(0);

    useEffect(() => {
        const fetchAveragePoints = async () => {
            const res = await fetch('http://localhost:3000/api/users');
            const users = await res.json();

            console.log('Utilisateurs récupérés:', users); // Log des utilisateurs

            // Vérifiez la structure des utilisateurs
            users.forEach((user: { discordUsername: string; balance: number }) => {
                console.log(`Utilisateur: ${user.discordUsername}, Points: ${user.balance}`);
            });

            // Filtrer les utilisateurs avec des points valides et positifs
            const validUsers = users.filter((user: { balance: number }) => typeof user.balance === 'number' && user.balance > 0);

            console.log('Utilisateurs valides:', validUsers); // Log des utilisateurs valides

            const totalPoints = validUsers.reduce((acc: number, user: { balance: number }) => acc + user.balance, 0);
            const average = validUsers.length > 0 ? totalPoints / validUsers.length : 0;

            console.log('Total des points:', totalPoints); // Log du total des points
            console.log('Moyenne des points:', average); // Log de la moyenne

            setAveragePoints(average);
        };

        fetchAveragePoints();
    }, []);

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Moyenne utilisateur : {averagePoints.toFixed(2)}
                </h2>
            </div>
        </div>
    );
};

export default AveragePoints;
