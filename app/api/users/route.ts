import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const discordUsername = searchParams.get('discordUsername');

  try {
    if (discordUsername) {
      const user = await prisma.user.findUnique({
        where: { discordUsername: discordUsername },
      });

      if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
      }

      return NextResponse.json(user);
    } else {
      const users = await prisma.user.findMany();
      return NextResponse.json(users);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs' }, { status: 500 });
  }
}

