/**
 * Seed idempotente do Dynamic CK (§11.9).
 *
 * Regra central: rodar N vezes produz exatamente o mesmo banco. Todos os registros
 * usam identificadores estáveis (slug ou e-mail) e são gravados via upsert.
 *
 * Executar: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';

import { AREAS, SUBJECTS } from './seed/areas';
import { LINGUAGENS_TOPICS } from './seed/topics/linguagens';
import { MATEMATICA_TOPICS } from './seed/topics/matematica';
import { HUMANAS_TOPICS } from './seed/topics/humanas';
import { NATUREZA_TOPICS } from './seed/topics/natureza';
import { REDACAO_TOPICS } from './seed/topics/redacao';
import { STUDY_METHODS } from './seed/study-methods';
import { SESSION_TEMPLATES, SIMULATIONS } from './seed/sessions';
import { ESSAY_PROMPTS } from './seed/essay-prompts';
import { DEMO_USERS } from './seed/demo-users';
import type { SeedTopic } from './seed/types';

const prisma = new PrismaClient();

const ALL_TOPICS: SeedTopic[] = [
  ...LINGUAGENS_TOPICS,
  ...MATEMATICA_TOPICS,
  ...HUMANAS_TOPICS,
  ...NATUREZA_TOPICS,
  ...REDACAO_TOPICS,
];

const SEED_ORIGIN = 'AUTORAL_SEED';
const SEED_LICENSE = 'Conteúdo autoral de desenvolvimento — Conscious Knowledge';

function log(step: string, detail: string) {
  process.stdout.write(`  ${step.padEnd(22)} ${detail}\n`);
}

// --------------------------------------------------------------- Conteúdo

async function seedAreasAndSubjects() {
  for (const area of AREAS) {
    await prisma.knowledgeArea.upsert({
      where: { slug: area.slug },
      create: {
        slug: area.slug,
        name: area.name,
        shortName: area.shortName,
        summary: area.summary,
        accent: area.accent,
        order: area.order,
      },
      update: { name: area.name, shortName: area.shortName, summary: area.summary, accent: area.accent, order: area.order },
    });
  }
  log('áreas', `${AREAS.length} registradas`);

  for (const subject of SUBJECTS) {
    const area = await prisma.knowledgeArea.findUniqueOrThrow({ where: { slug: subject.areaSlug } });
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      create: {
        slug: subject.slug,
        name: subject.name,
        summary: subject.summary,
        areaId: area.id,
        order: subject.order,
      },
      update: { name: subject.name, summary: subject.summary, areaId: area.id, order: subject.order },
    });
  }
  log('matérias', `${SUBJECTS.length} registradas`);
}

async function seedTopics() {
  let skills = 0;
  let contents = 0;
  let questions = 0;
  let options = 0;

  for (const topic of ALL_TOPICS) {
    const area = await prisma.knowledgeArea.findUniqueOrThrow({ where: { slug: topic.areaSlug } });
    const subject = await prisma.subject.findUniqueOrThrow({ where: { slug: topic.subjectSlug } });

    const topicRow = await prisma.topic.upsert({
      where: { slug: topic.slug },
      create: {
        slug: topic.slug,
        name: topic.name,
        summary: topic.summary,
        order: topic.order,
        difficulty: topic.difficulty,
        estimatedMinutes: topic.estimatedMinutes,
        curationWeight: topic.curationWeight,
        isComplete: true,
        status: 'published',
        areaId: area.id,
        subjectId: subject.id,
      },
      update: {
        name: topic.name,
        summary: topic.summary,
        order: topic.order,
        difficulty: topic.difficulty,
        estimatedMinutes: topic.estimatedMinutes,
        curationWeight: topic.curationWeight,
        isComplete: true,
        areaId: area.id,
        subjectId: subject.id,
      },
    });

    for (const skill of topic.skills) {
      await prisma.skill.upsert({
        where: { slug: skill.slug },
        create: { slug: skill.slug, name: skill.name, description: skill.description, topicId: topicRow.id },
        update: { name: skill.name, description: skill.description, topicId: topicRow.id },
      });
      skills += 1;
    }

    for (const content of topic.content) {
      await prisma.contentItem.upsert({
        where: { slug: content.slug },
        create: {
          slug: content.slug,
          topicId: topicRow.id,
          kind: content.kind,
          title: content.title,
          body: content.body,
          depth: content.depth ?? 'standard',
          order: content.order ?? 0,
          status: 'published',
          origin: SEED_ORIGIN,
          license: SEED_LICENSE,
        },
        update: {
          topicId: topicRow.id,
          kind: content.kind,
          title: content.title,
          body: content.body,
          depth: content.depth ?? 'standard',
          order: content.order ?? 0,
        },
      });
      contents += 1;
    }

    for (const question of topic.questions) {
      const correct = question.options.filter((option) => option.isCorrect);
      // Trava de integridade: o seed nunca grava questão com gabarito inválido (§7 regra 5).
      if (correct.length !== 1) {
        throw new Error(
          `Questão ${question.slug} tem ${correct.length} alternativas corretas. Deve ter exatamente 1.`,
        );
      }

      const skillRow = question.skillSlug
        ? await prisma.skill.findUnique({ where: { slug: question.skillSlug } })
        : null;

      const questionRow = await prisma.question.upsert({
        where: { slug: question.slug },
        create: {
          slug: question.slug,
          stem: question.stem,
          support: question.support,
          difficulty: question.difficulty,
          cognitiveFormat: question.cognitiveFormat,
          reasoningType: question.reasoningType,
          estimatedSeconds: question.estimatedSeconds,
          status: 'published',
          origin: SEED_ORIGIN,
          license: SEED_LICENSE,
          isRecovery: question.isRecovery ?? false,
          likelyErrors: JSON.stringify(question.likelyErrors),
          areaId: area.id,
          subjectId: subject.id,
          topicId: topicRow.id,
          skillId: skillRow?.id ?? null,
        },
        update: {
          stem: question.stem,
          support: question.support,
          difficulty: question.difficulty,
          cognitiveFormat: question.cognitiveFormat,
          reasoningType: question.reasoningType,
          estimatedSeconds: question.estimatedSeconds,
          isRecovery: question.isRecovery ?? false,
          likelyErrors: JSON.stringify(question.likelyErrors),
          areaId: area.id,
          subjectId: subject.id,
          topicId: topicRow.id,
          skillId: skillRow?.id ?? null,
        },
      });
      questions += 1;

      for (const [index, option] of question.options.entries()) {
        await prisma.answerOption.upsert({
          where: { questionId_label: { questionId: questionRow.id, label: option.label } },
          create: {
            questionId: questionRow.id,
            label: option.label,
            text: option.text,
            isCorrect: option.isCorrect ?? false,
            rationale: option.rationale,
            errorHint: option.errorHint,
            order: index,
          },
          update: {
            text: option.text,
            isCorrect: option.isCorrect ?? false,
            rationale: option.rationale,
            errorHint: option.errorHint,
            order: index,
          },
        });
        options += 1;
      }

      await prisma.explanation.upsert({
        where: { questionId: questionRow.id },
        create: {
          questionId: questionRow.id,
          summary: question.explanation.summary,
          detailed: question.explanation.detailed,
          strategy: question.explanation.strategy,
          conceptRecap: question.explanation.conceptRecap,
        },
        update: {
          summary: question.explanation.summary,
          detailed: question.explanation.detailed,
          strategy: question.explanation.strategy,
          conceptRecap: question.explanation.conceptRecap,
        },
      });
    }
  }

  // Pré-requisitos e relações — feitos depois, quando todos os tópicos já existem.
  for (const topic of ALL_TOPICS) {
    const topicRow = await prisma.topic.findUniqueOrThrow({ where: { slug: topic.slug } });

    for (const prerequisiteSlug of topic.prerequisites ?? []) {
      const prerequisite = await prisma.topic.findUnique({ where: { slug: prerequisiteSlug } });
      if (!prerequisite) continue;
      await prisma.topicPrerequisite.upsert({
        where: { topicId_prerequisiteId: { topicId: topicRow.id, prerequisiteId: prerequisite.id } },
        create: { topicId: topicRow.id, prerequisiteId: prerequisite.id },
        update: {},
      });
    }

    for (const relatedSlug of topic.related ?? []) {
      const related = await prisma.topic.findUnique({ where: { slug: relatedSlug } });
      if (!related) continue;
      await prisma.topicRelation.upsert({
        where: { fromId_toId: { fromId: topicRow.id, toId: related.id } },
        create: { fromId: topicRow.id, toId: related.id, kind: 'related' },
        update: {},
      });
    }
  }

  log('tópicos', `${ALL_TOPICS.length} completos`);
  log('habilidades', `${skills} registradas`);
  log('conteúdos', `${contents} itens`);
  log('questões', `${questions} (${options} alternativas)`);
}

async function seedStudyMethods() {
  for (const method of STUDY_METHODS) {
    await prisma.studyMethod.upsert({
      where: { slug: method.slug },
      create: {
        slug: method.slug,
        title: method.title,
        summary: method.summary,
        howItWorks: method.howItWorks,
        whenToUse: method.whenToUse,
        minutes: method.minutes,
        steps: JSON.stringify(method.steps),
        example: method.example,
        limitations: method.limitations,
        suitableTopics: JSON.stringify(method.suitableTopics),
        order: method.order,
      },
      update: {
        title: method.title,
        summary: method.summary,
        howItWorks: method.howItWorks,
        whenToUse: method.whenToUse,
        minutes: method.minutes,
        steps: JSON.stringify(method.steps),
        example: method.example,
        limitations: method.limitations,
        suitableTopics: JSON.stringify(method.suitableTopics),
        order: method.order,
      },
    });
  }
  log('métodos de estudo', `${STUDY_METHODS.length} registrados`);
}

async function seedSessionTemplates() {
  for (const template of SESSION_TEMPLATES) {
    await prisma.sessionTemplate.upsert({
      where: { slug: template.slug },
      create: {
        slug: template.slug,
        title: template.title,
        goal: template.goal,
        instructions: template.instructions,
        minutes: template.minutes,
        mode: template.mode,
        kind: template.kind,
        itemRule: JSON.stringify(template.itemRule),
        completionRule: template.completionRule,
        nextRecommendation: template.nextRecommendation,
        order: template.order,
      },
      update: {
        title: template.title,
        goal: template.goal,
        instructions: template.instructions,
        minutes: template.minutes,
        mode: template.mode,
        kind: template.kind,
        itemRule: JSON.stringify(template.itemRule),
        completionRule: template.completionRule,
        nextRecommendation: template.nextRecommendation,
        order: template.order,
      },
    });
  }
  log('sessões prontas', `${SESSION_TEMPLATES.length} registradas`);
}

async function seedSimulations() {
  for (const simulation of SIMULATIONS) {
    const area = simulation.areaSlug
      ? await prisma.knowledgeArea.findUnique({ where: { slug: simulation.areaSlug } })
      : null;

    await prisma.simulation.upsert({
      where: { slug: simulation.slug },
      create: {
        slug: simulation.slug,
        title: simulation.title,
        description: simulation.description,
        kind: simulation.kind,
        areaId: area?.id ?? null,
        questionCount: simulation.questionCount,
        minutes: simulation.minutes,
        blueprint: JSON.stringify(simulation.blueprint),
        status: 'published',
      },
      update: {
        title: simulation.title,
        description: simulation.description,
        kind: simulation.kind,
        areaId: area?.id ?? null,
        questionCount: simulation.questionCount,
        minutes: simulation.minutes,
        blueprint: JSON.stringify(simulation.blueprint),
      },
    });
  }
  log('simulados', `${SIMULATIONS.length} registrados`);
}

async function seedEssayPrompts() {
  for (const prompt of ESSAY_PROMPTS) {
    await prisma.essayPrompt.upsert({
      where: { slug: prompt.slug },
      create: {
        slug: prompt.slug,
        title: prompt.title,
        theme: prompt.theme,
        focus: prompt.focus,
        motivatingTexts: JSON.stringify(prompt.motivatingTexts),
        productionCommand: prompt.productionCommand,
        planningQuestions: JSON.stringify(prompt.planningQuestions),
        repertoire: JSON.stringify(prompt.repertoire),
        argumentChecklist: JSON.stringify(prompt.argumentChecklist),
        reviewChecklist: JSON.stringify(prompt.reviewChecklist),
        status: 'published',
        origin: SEED_ORIGIN,
      },
      update: {
        title: prompt.title,
        theme: prompt.theme,
        focus: prompt.focus,
        motivatingTexts: JSON.stringify(prompt.motivatingTexts),
        productionCommand: prompt.productionCommand,
        planningQuestions: JSON.stringify(prompt.planningQuestions),
        repertoire: JSON.stringify(prompt.repertoire),
        argumentChecklist: JSON.stringify(prompt.argumentChecklist),
        reviewChecklist: JSON.stringify(prompt.reviewChecklist),
      },
    });
  }
  log('temas de redação', `${ESSAY_PROMPTS.length} registrados`);
}

async function main() {
  process.stdout.write('\nSeed do Dynamic CK — conteúdo autoral de desenvolvimento\n\n');
  await seedAreasAndSubjects();
  await seedTopics();
  await seedStudyMethods();
  await seedSessionTemplates();
  await seedSimulations();
  await seedEssayPrompts();
  const { seedDemoUsers } = await import('./seed/demo-runner');
  await seedDemoUsers(prisma, ALL_TOPICS);
  process.stdout.write('\nSeed concluído.\n\n');
}

main()
  .catch((error) => {
    process.stderr.write(`\nFalha no seed: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
