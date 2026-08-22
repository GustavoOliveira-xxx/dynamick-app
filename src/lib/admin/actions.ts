'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/current-user';
import { QUESTION_STATUS, REPORT_KINDS } from '@/lib/domain';

export type AdminActionState = { success?: string; error?: string; details?: string[] };

/** Toda alteração administrativa deixa trilha de auditoria (§6 AuditLog). */
async function audit(
  actorId: string,
  action: string,
  entity: string,
  entityId: string,
  before: unknown,
  after: unknown,
  note?: string,
) {
  await prisma.auditLog.create({
    data: {
      actorId,
      action,
      entity,
      entityId,
      before: before ? JSON.stringify(before) : null,
      after: after ? JSON.stringify(after) : null,
      note,
    },
  });
}

/**
 * Regras de publicação (§7 regra 5): gabarito válido, explicação, classificação
 * mínima, origem e licença. Sem isso, a publicação é recusada com o motivo.
 */
export async function validateForPublication(questionId: string): Promise<string[]> {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { options: true, explanation: true },
  });

  if (!question) return ['Questão não encontrada.'];

  const problems: string[] = [];
  const correct = question.options.filter((option) => option.isCorrect);

  if (question.options.length < 2) problems.push('A questão precisa de pelo menos duas alternativas.');
  if (correct.length === 0) problems.push('Nenhuma alternativa está marcada como correta.');
  if (correct.length > 1) problems.push('Mais de uma alternativa está marcada como correta.');
  if (question.options.some((option) => !option.text.trim())) problems.push('Há alternativa sem texto.');
  if (question.options.some((option) => !option.rationale.trim())) {
    problems.push('Toda alternativa precisa de um comentário explicando por que está certa ou errada.');
  }
  if (!question.explanation?.summary.trim()) problems.push('Falta a explicação da resposta correta.');
  if (!question.stem.trim()) problems.push('O enunciado está vazio.');
  if (!question.topicId) problems.push('A questão precisa estar ligada a um tópico.');
  if (!question.skillId) problems.push('A questão precisa de uma habilidade classificada.');
  if (!question.origin.trim()) problems.push('Informe a origem da questão.');
  if (!question.license.trim()) problems.push('Informe a licença ou a justificativa de uso.');

  return problems;
}

const statusSchema = z.object({
  questionId: z.string().min(1),
  status: z.enum(QUESTION_STATUS),
  note: z.string().max(500).optional(),
});

export async function changeQuestionStatusAction(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const admin = await requireAdmin();
  const parsed = statusSchema.safeParse({
    questionId: formData.get('questionId'),
    status: formData.get('status'),
    note: formData.get('note') || undefined,
  });
  if (!parsed.success) return { error: 'Estado editorial inválido.' };

  const question = await prisma.question.findUnique({ where: { id: parsed.data.questionId } });
  if (!question) return { error: 'Questão não encontrada.' };

  if (parsed.data.status === 'published') {
    const problems = await validateForPublication(question.id);
    if (problems.length > 0) {
      return {
        error: 'Esta questão ainda não pode ser publicada.',
        details: problems,
      };
    }
  }

  // Arquivar preserva o histórico de quem já respondeu (§7 regra 15).
  await prisma.question.update({
    where: { id: question.id },
    data: {
      status: parsed.data.status,
      archivedAt: parsed.data.status === 'archived' ? new Date() : null,
    },
  });

  await audit(
    admin.id,
    `question.${parsed.data.status}`,
    'Question',
    question.id,
    { status: question.status },
    { status: parsed.data.status },
    parsed.data.note,
  );

  revalidatePath('/admin/questoes');
  revalidatePath(`/admin/questoes/${question.id}`);
  return { success: `Questão marcada como "${parsed.data.status}".` };
}

const editSchema = z.object({
  questionId: z.string().min(1),
  stem: z.string().min(10, 'O enunciado precisa de pelo menos 10 caracteres.').max(8000),
  support: z.string().max(4000).optional(),
  difficulty: z.enum(['intro', 'intermediate', 'challenging']),
  origin: z.string().min(2).max(200),
  license: z.string().min(2).max(300),
  explanationSummary: z.string().min(10, 'A explicação precisa de pelo menos 10 caracteres.').max(4000),
  changeNote: z.string().max(500).optional(),
});

/** Editar cria uma nova versão: o histórico da questão é preservado (§6 QuestionVersion). */
export async function updateQuestionAction(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const admin = await requireAdmin();
  const parsed = editSchema.safeParse({
    questionId: formData.get('questionId'),
    stem: formData.get('stem'),
    support: formData.get('support') || undefined,
    difficulty: formData.get('difficulty'),
    origin: formData.get('origin'),
    license: formData.get('license'),
    explanationSummary: formData.get('explanationSummary'),
    changeNote: formData.get('changeNote') || undefined,
  });

  if (!parsed.success) {
    return { error: 'Confira os campos.', details: parsed.error.issues.map((issue) => issue.message) };
  }

  const question = await prisma.question.findUnique({
    where: { id: parsed.data.questionId },
    include: { options: true, explanation: true },
  });
  if (!question) return { error: 'Questão não encontrada.' };

  await prisma.$transaction([
    prisma.questionVersion.create({
      data: {
        questionId: question.id,
        version: question.version,
        snapshot: JSON.stringify(question),
        changedBy: admin.id,
        changeNote: parsed.data.changeNote,
      },
    }),
    prisma.question.update({
      where: { id: question.id },
      data: {
        stem: parsed.data.stem,
        support: parsed.data.support || null,
        difficulty: parsed.data.difficulty,
        origin: parsed.data.origin,
        license: parsed.data.license,
        version: { increment: 1 },
      },
    }),
    prisma.explanation.upsert({
      where: { questionId: question.id },
      create: { questionId: question.id, summary: parsed.data.explanationSummary },
      update: { summary: parsed.data.explanationSummary },
    }),
  ]);

  await audit(admin.id, 'question.update', 'Question', question.id, question, parsed.data, parsed.data.changeNote);

  revalidatePath(`/admin/questoes/${question.id}`);
  return { success: `Alterações salvas. Nova versão: ${question.version + 1}.` };
}

const resolveSchema = z.object({
  reportId: z.string().min(1),
  status: z.enum(['reviewing', 'resolved', 'rejected']),
  resolution: z.string().max(1000).optional(),
});

export async function resolveReportAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const parsed = resolveSchema.safeParse({
    reportId: formData.get('reportId'),
    status: formData.get('status'),
    resolution: formData.get('resolution') || undefined,
  });
  if (!parsed.success) return;

  const report = await prisma.report.findUnique({ where: { id: parsed.data.reportId } });
  if (!report) return;

  await prisma.report.update({
    where: { id: report.id },
    data: {
      status: parsed.data.status,
      resolution: parsed.data.resolution,
      resolvedBy: admin.id,
      resolvedAt: parsed.data.status === 'reviewing' ? null : new Date(),
    },
  });

  await audit(
    admin.id,
    `report.${parsed.data.status}`,
    'Report',
    report.id,
    { status: report.status },
    { status: parsed.data.status },
    parsed.data.resolution,
  );

  revalidatePath('/admin/denuncias');
}

/** Denúncia feita pelo estudante (§13): qualquer usuário autenticado pode abrir. */
const reportSchema = z.object({
  questionId: z.string().min(1),
  kind: z.enum(REPORT_KINDS),
  message: z.string().min(5, 'Conte em uma frase o que está errado.').max(1000),
});

export async function reportQuestionAction(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const { requireUser } = await import('@/lib/auth/current-user');
  const user = await requireUser();

  const parsed = reportSchema.safeParse({
    questionId: formData.get('questionId'),
    kind: formData.get('kind'),
    message: formData.get('message'),
  });
  if (!parsed.success) {
    return { error: 'Confira os campos.', details: parsed.error.issues.map((issue) => issue.message) };
  }

  const question = await prisma.question.findUnique({ where: { id: parsed.data.questionId } });
  if (!question) return { error: 'Questão não encontrada.' };

  await prisma.report.create({
    data: {
      userId: user.id,
      questionId: question.id,
      kind: parsed.data.kind,
      message: parsed.data.message,
      status: 'open',
    },
  });

  return { success: 'Obrigado. A curadoria vai analisar e registrar a resolução.' };
}

/** Importador JSON validado (§11.10). Não grava nada se houver item inválido. */
const importItemSchema = z.object({
  slug: z.string().min(3),
  topicSlug: z.string().min(3),
  skillSlug: z.string().min(3).optional(),
  stem: z.string().min(10),
  support: z.string().optional(),
  difficulty: z.enum(['intro', 'intermediate', 'challenging']),
  cognitiveFormat: z.enum(['concept', 'applied', 'interpretation', 'comparison', 'integration']),
  origin: z.string().min(2),
  license: z.string().min(2),
  explanation: z.string().min(10),
  options: z
    .array(
      z.object({
        label: z.enum(['A', 'B', 'C', 'D', 'E']),
        text: z.string().min(1),
        isCorrect: z.boolean().optional(),
        rationale: z.string().min(5),
      }),
    )
    .min(2),
});

export async function importQuestionsAction(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const admin = await requireAdmin();
  const raw = String(formData.get('payload') ?? '').trim();
  if (!raw) return { error: 'Cole o JSON das questões.' };

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return { error: 'O texto não é um JSON válido.' };
  }

  const arraySchema = z.array(importItemSchema).min(1).max(200);
  const result = arraySchema.safeParse(parsedJson);
  if (!result.success) {
    return {
      error: 'Nada foi importado. Corrija os itens abaixo e tente de novo.',
      details: result.error.issues.slice(0, 20).map((issue) => `item ${issue.path.join('.')}: ${issue.message}`),
    };
  }

  // Validação semântica antes de gravar qualquer coisa.
  const problems: string[] = [];
  for (const [index, item] of result.data.entries()) {
    const correct = item.options.filter((option) => option.isCorrect);
    if (correct.length !== 1) {
      problems.push(`item ${index + 1} (${item.slug}): precisa de exatamente uma alternativa correta.`);
    }
    const topic = await prisma.topic.findUnique({ where: { slug: item.topicSlug } });
    if (!topic) problems.push(`item ${index + 1} (${item.slug}): tópico "${item.topicSlug}" não existe.`);
    const labels = new Set(item.options.map((option) => option.label));
    if (labels.size !== item.options.length) {
      problems.push(`item ${index + 1} (${item.slug}): há alternativas com o mesmo rótulo.`);
    }
  }

  if (problems.length > 0) {
    return { error: 'Nada foi importado.', details: problems.slice(0, 20) };
  }

  let imported = 0;
  for (const item of result.data) {
    const topic = await prisma.topic.findUniqueOrThrow({ where: { slug: item.topicSlug } });
    const skill = item.skillSlug ? await prisma.skill.findUnique({ where: { slug: item.skillSlug } }) : null;

    const question = await prisma.question.upsert({
      where: { slug: item.slug },
      create: {
        slug: item.slug,
        stem: item.stem,
        support: item.support,
        difficulty: item.difficulty,
        cognitiveFormat: item.cognitiveFormat,
        reasoningType: 'importado',
        origin: item.origin,
        license: item.license,
        // Importação entra como rascunho: nada vai direto para os estudantes.
        status: 'draft',
        areaId: topic.areaId,
        subjectId: topic.subjectId,
        topicId: topic.id,
        skillId: skill?.id ?? null,
      },
      update: {
        stem: item.stem,
        support: item.support,
        difficulty: item.difficulty,
        cognitiveFormat: item.cognitiveFormat,
        origin: item.origin,
        license: item.license,
        skillId: skill?.id ?? null,
      },
    });

    for (const [index, option] of item.options.entries()) {
      await prisma.answerOption.upsert({
        where: { questionId_label: { questionId: question.id, label: option.label } },
        create: {
          questionId: question.id,
          label: option.label,
          text: option.text,
          isCorrect: option.isCorrect ?? false,
          rationale: option.rationale,
          order: index,
        },
        update: {
          text: option.text,
          isCorrect: option.isCorrect ?? false,
          rationale: option.rationale,
          order: index,
        },
      });
    }

    await prisma.explanation.upsert({
      where: { questionId: question.id },
      create: { questionId: question.id, summary: item.explanation },
      update: { summary: item.explanation },
    });

    imported += 1;
  }

  await audit(admin.id, 'question.import', 'Question', 'lote', null, { imported }, `${imported} questão(ões)`);

  revalidatePath('/admin/questoes');
  return {
    success: `${imported} questão(ões) importada(s) como rascunho. Revise antes de publicar.`,
  };
}
