import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Nettoyage des tables
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.domain.deleteMany({});

  // Créer des domaines
  const domain1 = await prisma.domain.create({
    data: {
      name: "Programming",
    },
  });

  const domain2 = await prisma.domain.create({
    data: {
      name: "Design",
    },
  });

  // Créer des utilisateurs
  const user1 = await prisma.user.create({
    data: {
      discordUsername: "user1#1234",
      pointsSent: 100,
      pointsReceived: 50,
      balance: 50,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      discordUsername: "user2#5678",
      pointsSent: 200,
      pointsReceived: 100,
      balance: 100,
    },
  });

  // Créer des transactions
  await prisma.transaction.create({
    data: {
      sender: { connect: { discordUsername: user1.discordUsername } },
      receiver: { connect: { discordUsername: user2.discordUsername } },
      points: 50,
      description: "Points sent for project help",
      link: "https://example.com/project",
      domain: { connect: { name: domain1.name } },
    },
  });

  await prisma.transaction.create({
    data: {
      sender: { connect: { discordUsername: user2.discordUsername } },
      receiver: { connect: { discordUsername: user1.discordUsername } },
      points: 25,
      description: "Design contribution",
      link: "https://example.com/design",
      domain: { connect: { name: domain2.name } },
    },
  });

  // Mise à jour des points des utilisateurs après les transactions
  await prisma.user.update({
    where: { discordUsername: user1.discordUsername },
    data: {
      pointsSent: { increment: 50 },
      balance: { decrement: 50 },
    },
  });

  await prisma.user.update({
    where: { discordUsername: user2.discordUsername },
    data: {
      pointsReceived: { increment: 75 },
      balance: { increment: 25 },
    },
  });
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
