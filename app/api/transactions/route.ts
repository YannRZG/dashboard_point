import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        sender: true,
        receiver: true,
        domain: true
      }
    });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
