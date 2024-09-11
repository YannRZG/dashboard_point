// services/transactionService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createTransaction(
  senderId: string,
  receiverId: string,
  points: number,
  description: string,
  link: string,
  domainId: string
) {
  try {
    const senderUser = await prisma.user.findUnique({ where: { discordUsername: senderId } });
    const receiverUser = await prisma.user.findUnique({ where: { discordUsername: receiverId } });

    if (!senderUser || !receiverUser) {
      throw new Error('Un ou les deux utilisateurs n\'existe pas.');
    }

    if (senderUser.balance < points) {
      throw new Error('Le solde de l\'expéditeur est insuffisant.');
    }

    const result = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.create({
        data: {
          sender: { connect: { discordUsername: senderId } },
          receiver: { connect: { discordUsername: receiverId } },
          points,
          description,
          link,
          domain: { connect: { name: domainId } },
        },
      });

      await prisma.user.update({
        where: { discordUsername: senderId },
        data: { pointsSent: { increment: points }, balance: { decrement: points } },
      });

      await prisma.user.update({
        where: { discordUsername: receiverId },
        data: { pointsReceived: { increment: points }, balance: { increment: points } },
      });

      return transaction;
    });

    return result;
  } catch (error) {
    console.error('Erreur lors de la création de la transaction:', error);
    throw new Error('Erreur lors de la création de la transaction');
  } finally {
    await prisma.$disconnect();
  }
}
