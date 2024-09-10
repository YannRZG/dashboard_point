import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
      senderId: user1.discordUsername,
      receiverId: user2.discordUsername,
      points: 50,
      description: "Points sent for project help",
      link: "https://example.com/project",
      domainId: domain1.name,
    },
  });

  await prisma.transaction.create({
    data: {
      senderId: user2.discordUsername,
      receiverId: user1.discordUsername,
      points: 25,
      description: "Design contribution",
      link: "https://example.com/design",
      domainId: domain2.name,
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
