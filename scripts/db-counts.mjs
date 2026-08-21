import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const counts = {
  areas: await prisma.knowledgeArea.count(),
  subjects: await prisma.subject.count(),
  topics: await prisma.topic.count(),
  skills: await prisma.skill.count(),
  contentItems: await prisma.contentItem.count(),
  questions: await prisma.question.count(),
  options: await prisma.answerOption.count(),
  explanations: await prisma.explanation.count(),
  methods: await prisma.studyMethod.count(),
  templates: await prisma.sessionTemplate.count(),
  simulations: await prisma.simulation.count(),
  essayPrompts: await prisma.essayPrompt.count(),
  users: await prisma.user.count(),
  sessions: await prisma.studySession.count(),
  attempts: await prisma.attempt.count(),
  reviewItems: await prisma.reviewItem.count(),
  errorNotes: await prisma.errorNote.count(),
  plans: await prisma.studyPlan.count(),
  planBlocks: await prisma.studyPlanBlock.count(),
  mastery: await prisma.topicMastery.count(),
  prerequisites: await prisma.topicPrerequisite.count(),
};
console.log(JSON.stringify(counts));
await prisma.$disconnect();
