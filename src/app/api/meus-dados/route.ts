import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';

/**
 * Exportação dos dados pessoais (§5.1).
 * Só devolve os dados do próprio usuário autenticado — nunca de outro.
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const [profile, onboarding, confirmations, snapshots, sessions, attempts, notes, reviews, essays] =
    await Promise.all([
      prisma.studyProfile.findUnique({
        where: { userId: user.id },
        include: { dimensions: true },
      }),
      prisma.onboardingResponse.findMany({ where: { userId: user.id } }),
      prisma.profileConfirmation.findMany({ where: { userId: user.id } }),
      prisma.profileSnapshot.findMany({ where: { userId: user.id } }),
      prisma.studySession.findMany({
        where: { userId: user.id },
        include: { items: { select: { order: true, flagged: true, note: true, status: true } } },
      }),
      prisma.attempt.findMany({
        where: { userId: user.id },
        include: { errorClassification: true, question: { select: { slug: true } } },
      }),
      prisma.errorNote.findMany({ where: { userId: user.id } }),
      prisma.reviewItem.findMany({ where: { userId: user.id } }),
      prisma.essay.findMany({ where: { userId: user.id }, include: { versions: true } }),
    ]);

  const payload = {
    exportadoEm: new Date().toISOString(),
    aviso:
      'Este arquivo contém os dados associados à sua conta no Dynamic CK. A senha nunca é exportada.',
    conta: {
      nome: user.name,
      email: user.email,
      criadaEm: user.createdAt,
      preferencias: user.personalization,
      lembretes: user.notificationPreference,
    },
    perfilDeEstudo: profile,
    respostasDoOnboarding: onboarding,
    confirmacoesDePerfil: confirmations,
    historicoDePerfil: snapshots,
    sessoes: sessions,
    tentativas: attempts,
    cadernoDeErros: notes,
    filaDeRevisao: reviews,
    redacoes: essays,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="dynamick-meus-dados.json"`,
      'Cache-Control': 'no-store',
    },
  });
}
