import prisma from "../../../lib/prismaClient";
import Table from "../../components/Table";
import Image from "next/image";
import Badge from "../../components/Badge";
import { FaLink } from 'react-icons/fa';
import Link from 'next/link';

interface ProfileProps {
  params: {
    discordUsername: string;
  };
}

async function fetchUserProfile(discordUsername: string) {
  try {
    console.log("Fetching user with discordUsername:", discordUsername);
    const user = await prisma.user.findUnique({
      where: { discordUsername },
      include: {
        sent: true,
        received: true,
      },
    });
    console.log("Fetched user:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export default async function ProfilePage({ params }: ProfileProps) {
  const user = await fetchUserProfile(params.discordUsername);

  if (!user) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-red-600">Utilisateur non trouvé</p>
      </main>
    );
  }

  const userData = [
    {
      discordUsername: user.discordUsername,
      pointsSent: user.pointsSent,
      pointsReceived: user.pointsReceived,
      balance: user.balance,
    },
  ];

  const transactionData = [
    {
      transactionsCount: user.sent.length + user.received.length,
      receptionsCount: user.received.length,
      sendsCount: user.sent.length,
    },
  ];

  const transactionHeaders: { key: keyof (typeof transactionData)[0]; label: string }[] = [
    { key: "sendsCount", label: "Nombre d'Envois" },
    { key: "receptionsCount", label: "Nombre de Réceptions" },
    { key: "transactionsCount", label: "Nombre de Transactions" },
  ];

  const headers: { key: keyof (typeof userData)[0]; label: string }[] = [
    { key: "pointsReceived", label: "Points Reçus" },
    { key: "pointsSent", label: "Points Envoyés" },
    { key: "balance", label: "Solde" },
  ];

  const detailedTransactionData = [
    ...user.sent.map((transaction) => ({
      type: "Envoi",
      member: (
        <Link href={`/profile/${encodeURIComponent(transaction.receiverId)}`} passHref>
          <Badge color="bg-blue-500">{transaction.receiverId}</Badge>
        </Link>
      ),
      points: transaction.points,
      domain: transaction.domainId,
      description: transaction.description,
      link: (
        <a
          href={transaction.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 transform hover:scale-105"
        >
          <FaLink className="text-lg" />
        </a>
      ),
    })),
    ...user.received.map((transaction) => ({
      type: "Réception",
      member: (
        <Link href={`/profile/${encodeURIComponent(transaction.senderId)}`} passHref>
          <Badge color="bg-blue-500">{transaction.senderId}</Badge>
        </Link>
      ),
      points: transaction.points,
      domain: transaction.domainId,
      description: transaction.description,
      link: (
        <a
          href={transaction.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 transform hover:scale-105"
        >
          <FaLink className="text-lg" />
        </a>
      ),
    })),
  ];

  const detailedTransactionHeaders: { key: keyof (typeof detailedTransactionData)[0]; label: string }[] = [
    { key: "type", label: "Type" },
    { key: "member", label: "Membre" },
    { key: "points", label: "Points" },
    { key: "domain", label: "Domaine" },
    { key: "description", label: "Description" },
    { key: "link", label: "Lien" },
  ];

  return (
    <>
      <header className="flex justify-center items-center mt-6">
        <div className="flex items-center justify-center w-[75%] bg-white shadow-md rounded-lg p-6 space-x-6">
          <div className="relative w-16 h-16">
            <Image
              src="/images/avatar.avif"
              alt="Avatar"
              layout="fill"
              className="rounded-full object-cover"
              style={{ transform: "scale(1.4)" }}
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Profil de {user.discordUsername}
          </h1>
        </div>
      </header>

      <main className="flex flex-col p-8">
        <section className="flex flex-row justify-around space-y-4 mb-8">
          <article className="flex flex-col items-center space-y-4 w-1/4 mt-4">
            <div className="bg-white shadow-md w-full rounded-lg">
              <div className="flex flex-col items-center justify-between p-6 h-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Rang</h2>
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-2xl font-bold text-gray-800 text-center">Points envoyés</p>
                  <p>8</p>
                  <p className="text-2xl font-semibold text-gray-800 mt-2 text-center">Points reçus</p>
                  <p>8</p>
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col items-center space-y-4 w-1/3">
            <div className="bg-white shadow-md w-full mb-4">
              <Table data={userData} headers={headers} />
            </div>
            <div className="bg-white shadow-md w-full">
              <Table data={transactionData} headers={transactionHeaders} />
            </div>
          </aside>
        </section>

        <section className="flex justify-center items-center">
          <div className="bg-white shadow-md w-[88%] mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {detailedTransactionHeaders.map((header) => (
                    <th key={header.key} className="px-6 py-3 text-left text-md font-semibold">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white ">
                {detailedTransactionData.map((row, index) => (
                  <tr key={index} className={row.type === "Envoi" ? "bg-red-100" : "bg-green-100"}>
                    {detailedTransactionHeaders.map((header) => (
                      <td key={header.key} className="px-6 py-4 text-md">
                        {row[header.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
