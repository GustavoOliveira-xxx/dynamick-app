'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth/current-user';

export type EssayState = { success?: string; error?: string };

const draftSchema = z.object({
  promptSlug: z.string().min(1),
  essayId: z.string().optional(),
  thesis: z.string().max(1000).optional(),
  outline: z.string().max(4000).optional(),
  body: z.string().max(20_000),
  submit: z.enum(['draft', 'submitted']).catch('draft'),
});

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Salva o rascunho e cria uma versão quando o texto muda (§5.9).
 * Não existe correção automática por IA nesta versão: a §7 do prompt só autoriza IA
 * depois do ciclo objetivo validado, e o produto nunca promete nota.
 */
export async function saveEssayAction(_prev: EssayState, formData: FormData): Promise<EssayState> {
  const user = await requireUser();
  const parsed = draftSchema.safeParse({
    promptSlug: formData.get('promptSlug'),
    essayId: formData.get('essayId') || undefined,
    thesis: formData.get('thesis') || undefined,
    outline: formData.get('outline') || undefined,
    body: formData.get('body') ?? '',
    submit: formData.get('submit') ?? 'draft',
  });

  if (!parsed.success) return { error: 'Não conseguimos salvar. Confira os campos.' };

  const prompt = await prisma.essayPrompt.findUnique({ where: { slug: parsed.data.promptSlug } });
  if (!prompt) return { error: 'Tema não encontrado.' };

  const wordCount = countWords(parsed.data.body);

  const existing = parsed.data.essayId
    ? await prisma.essay.findFirst({ where: { id: parsed.data.essayId, userId: user.id } })
    : await prisma.essay.findFirst({
        where: { userId: user.id, promptId: prompt.id },
        orderBy: { updatedAt: 'desc' },
      });

  const checklistState: Record<string, boolean> = {};
  for (const entry of formData.getAll('checklist')) {
    checklistState[String(entry)] = true;
  }

  if (existing) {
    // Nova versão só quando o texto realmente mudou — evita histórico poluído.
    if (existing.body !== parsed.data.body && existing.body.trim()) {
      await prisma.essayVersion.create({
        data: { essayId: existing.id, body: existing.body, wordCount: existing.wordCount },
      });
    }

    await prisma.essay.update({
      where: { id: existing.id },
      data: {
        thesis: parsed.data.thesis,
        outline: parsed.data.outline,
        body: parsed.data.body,
        wordCount,
        status: parsed.data.submit,
        checklistState: JSON.stringify(checklistState),
      },
    });

    revalidatePath(`/redacao/${prompt.slug}`);
    return {
      success:
        parsed.data.submit === 'submitted'
          ? 'Redação marcada como finalizada. A versão anterior ficou no histórico.'
          : 'Rascunho salvo.',
    };
  }

  await prisma.essay.create({
    data: {
      userId: user.id,
      promptId: prompt.id,
      thesis: parsed.data.thesis,
      outline: parsed.data.outline,
      body: parsed.data.body,
      wordCount,
      status: parsed.data.submit,
      checklistState: JSON.stringify(checklistState),
    },
  });

  revalidatePath(`/redacao/${prompt.slug}`);
  return { success: 'Rascunho salvo.' };
}
