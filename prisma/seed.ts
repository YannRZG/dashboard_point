import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Nettoyage des tables
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.domain.deleteMany({});

  // Créer des domaines
  const domains = await Promise.all([
    prisma.domain.create({ data: { name: "Programming" } }),
    prisma.domain.create({ data: { name: "Design" } }),
    prisma.domain.create({ data: { name: "Marketing" } }),
    prisma.domain.create({ data: { name: "Finance" } }),
    prisma.domain.create({ data: { name: "Management" } })
  ]);

  // Créer des utilisateurs avec des soldes positifs
  const users = await Promise.all([
    prisma.user.create({ data: { discordUsername: "user1#1234", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user2#5678", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user3#9101", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user4#1121", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user5#3141", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user6#5161", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user7#7181", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user8#9202", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user9#1223", pointsSent: 0, pointsReceived: 0, balance: 100 } }),
    prisma.user.create({ data: { discordUsername: "user10#3244", pointsSent: 0, pointsReceived: 0, balance: 100 } })
  ]);

  // Créer des transactions
  const transactions = [
    { sender: users[0].discordUsername, receiver: users[1].discordUsername, points: 10, domain: domains[0].name },
    { sender: users[1].discordUsername, receiver: users[2].discordUsername, points: 15, domain: domains[1].name },
    { sender: users[2].discordUsername, receiver: users[3].discordUsername, points: 20, domain: domains[2].name },
    { sender: users[3].discordUsername, receiver: users[4].discordUsername, points: 25, domain: domains[3].name },
    { sender: users[4].discordUsername, receiver: users[5].discordUsername, points: 30, domain: domains[4].name },
    { sender: users[5].discordUsername, receiver: users[6].discordUsername, points: 35, domain: domains[0].name },
    { sender: users[6].discordUsername, receiver: users[7].discordUsername, points: 40, domain: domains[1].name },
    { sender: users[7].discordUsername, receiver: users[8].discordUsername, points: 45, domain: domains[2].name },
    { sender: users[8].discordUsername, receiver: users[9].discordUsername, points: 50, domain: domains[3].name },
    { sender: users[9].discordUsername, receiver: users[0].discordUsername, points: 55, domain: domains[4].name },
    { sender: users[0].discordUsername, receiver: users[2].discordUsername, points: 10, domain: domains[0].name },
    { sender: users[2].discordUsername, receiver: users[4].discordUsername, points: 15, domain: domains[1].name },
    { sender: users[4].discordUsername, receiver: users[6].discordUsername, points: 20, domain: domains[2].name },
    { sender: users[6].discordUsername, receiver: users[8].discordUsername, points: 25, domain: domains[3].name },
    { sender: users[8].discordUsername, receiver: users[0].discordUsername, points: 30, domain: domains[4].name },
  ];

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: {
        sender: { connect: { discordUsername: transaction.sender } },
        receiver: { connect: { discordUsername: transaction.receiver } },
        points: transaction.points,
        description: `Transaction from ${transaction.sender} to ${transaction.receiver}`,
        link: "https://example.com",
        domain: { connect: { name: transaction.domain } },
      },
    });

    // Mise à jour des points des utilisateurs après les transactions
    await prisma.user.update({
      where: { discordUsername: transaction.sender },
      data: {
        pointsSent: { increment: transaction.points },
        balance: { decrement: transaction.points },
      },
    });

    await prisma.user.update({
      where: { discordUsername: transaction.receiver },
      data: {
        pointsReceived: { increment: transaction.points },
        balance: { increment: transaction.points },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
