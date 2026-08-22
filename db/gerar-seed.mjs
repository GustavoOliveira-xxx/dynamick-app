/**
 * Gera db/02-seed-acervo.sql a partir dos módulos de dados.
 * Fonte única: os arquivos js/data/. O SQL é derivado, nunca escrito à mão.
 */
import { writeFileSync } from 'node:fs';
import {
  AREAS, SUBJECTS, TOPICS, QUESTIONS, STUDY_METHODS,
  SESSION_TEMPLATES, SIMULATIONS, ESSAY_PROMPTS,
} from '../js/data/content.js';

const q = (v) => {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
};
const j = (v) => `${q(JSON.stringify(v ?? null))}::jsonb`;

const linhas = [];
const push = (s) => linhas.push(s);

push('-- Gerado por scripts a partir de js/data/. Não editar à mão.');
push('-- Regenerar: node db/gerar-seed.mjs');
push('BEGIN;');
push('');

push('-- Áreas');
for (const a of AREAS) {
  push(`INSERT INTO areas (slug, name, short_name, description, accent, display_order) VALUES (${q(a.slug)}, ${q(a.name)}, ${q(a.shortName)}, ${q(a.description ?? null)}, ${q(a.accent ?? null)}, ${a.order ?? 0});`);
}
push('');

push('-- Disciplinas');
for (const s of SUBJECTS) {
  push(`INSERT INTO subjects (slug, area_slug, name, display_order) VALUES (${q(s.slug)}, ${q(s.areaSlug)}, ${q(s.name)}, ${s.order ?? 0});`);
}
push('');

push('-- Tópicos');
for (const t of TOPICS) {
  push(`INSERT INTO topics (slug, subject_slug, area_slug, name, summary, difficulty, estimated_minutes, curation_weight, display_order) VALUES (${q(t.slug)}, ${q(t.subjectSlug)}, ${q(t.areaSlug)}, ${q(t.name)}, ${q(t.summary)}, ${q(t.difficulty)}, ${t.estimatedMinutes ?? 20}, ${t.curationWeight ?? 50}, ${t.order ?? 0});`);
}
push('');

push('-- Habilidades');
for (const t of TOPICS) {
  for (const s of t.skills ?? []) {
    push(`INSERT INTO skills (slug, topic_slug, name, description) VALUES (${q(s.slug)}, ${q(t.slug)}, ${q(s.name)}, ${q(s.description ?? null)});`);
  }
}
push('');

push('-- Pré-requisitos e relacionados (depois dos tópicos, por causa das FKs)');
for (const t of TOPICS) {
  for (const p of t.prerequisites ?? []) {
    push(`INSERT INTO topic_prerequisites (topic_slug, prerequisite_slug) VALUES (${q(t.slug)}, ${q(p)});`);
  }
  for (const r of t.related ?? []) {
    push(`INSERT INTO topic_related (topic_slug, related_slug) VALUES (${q(t.slug)}, ${q(r)});`);
  }
}
push('');

push('-- Blocos de conteúdo');
for (const t of TOPICS) {
  for (const c of t.content ?? []) {
    push(`INSERT INTO content_items (slug, topic_slug, kind, title, depth, body, display_order) VALUES (${q(c.slug)}, ${q(t.slug)}, ${q(c.kind)}, ${q(c.title)}, ${q(c.depth)}, ${q(c.body)}, ${c.order ?? 0});`);
  }
}
push('');

push('-- Questões (já com o gabarito rebalanceado pela montagem do catálogo)');
for (const qq of QUESTIONS) {
  const e = qq.explanation ?? {};
  push(`INSERT INTO questions (slug, topic_slug, skill_slug, difficulty, cognitive_format, is_recovery, stem, explanation_summary, explanation_detailed, explanation_strategy, explanation_concept_recap, origin, license) VALUES (${q(qq.slug)}, ${q(qq.topicSlug)}, ${q(qq.skillSlug ?? null)}, ${q(qq.difficulty)}, ${q(qq.cognitiveFormat)}, ${qq.isRecovery ? 'true' : 'false'}, ${q(qq.stem)}, ${q(e.summary)}, ${q(e.detailed ?? null)}, ${q(e.strategy ?? null)}, ${q(e.conceptRecap ?? null)}, ${q(qq.origin)}, ${q(qq.license)});`);
  for (const o of qq.options) {
    push(`INSERT INTO question_options (question_slug, label, body, is_correct, rationale, error_hint) VALUES (${q(qq.slug)}, ${q(o.label)}, ${q(o.text)}, ${o.isCorrect ? 'true' : 'false'}, ${q(o.rationale)}, ${q(o.errorHint ?? null)});`);
  }
}
push('');

push('-- Métodos de estudo');
for (const m of STUDY_METHODS) {
  push(`INSERT INTO study_methods (slug, title, summary, how_it_works, when_to_use, steps, example, limitations, minutes, suitable_topics, display_order) VALUES (${q(m.slug)}, ${q(m.title)}, ${q(m.summary)}, ${q(m.howItWorks)}, ${q(m.whenToUse)}, ${j(m.steps)}, ${q(m.example)}, ${q(m.limitations)}, ${m.minutes ?? 20}, ${j(m.suitableTopics ?? [])}, ${m.order ?? 0});`);
}
push('');

push('-- Simulados (antes das sessões prontas: nada depende, mas mantém a leitura em ordem)');
for (const s of SIMULATIONS) {
  push(`INSERT INTO simulations (slug, title, description, kind, area_slug, question_count, minutes, blueprint) VALUES (${q(s.slug)}, ${q(s.title)}, ${q(s.description)}, ${q(s.kind)}, ${q(s.areaSlug ?? null)}, ${s.questionCount}, ${s.minutes}, ${j(s.blueprint)});`);
}
push('');

push('-- Sessões prontas');
for (const s of SESSION_TEMPLATES) {
  push(`INSERT INTO session_templates (slug, title, goal, instructions, minutes, mode, kind, item_rule, completion_rule, next_recommendation, display_order) VALUES (${q(s.slug)}, ${q(s.title)}, ${q(s.goal)}, ${q(s.instructions)}, ${s.minutes}, ${q(s.mode)}, ${q(s.kind)}, ${j(s.itemRule)}, ${q(s.completionRule)}, ${q(s.nextRecommendation ?? null)}, ${s.order ?? 0});`);
}
push('');

push('-- Temas de redação');
for (const p of ESSAY_PROMPTS) {
  push(`INSERT INTO essay_prompts (slug, title, theme, focus, motivating_texts, production_command, planning_questions, repertoire, argument_checklist, review_checklist) VALUES (${q(p.slug)}, ${q(p.title)}, ${q(p.theme)}, ${q(p.focus)}, ${j(p.motivatingTexts)}, ${q(p.productionCommand)}, ${j(p.planningQuestions)}, ${j(p.repertoire)}, ${j(p.argumentChecklist)}, ${j(p.reviewChecklist)});`);
}
push('');
push('COMMIT;');

const sql = linhas.join('\n') + '\n';
writeFileSync(new URL('02-seed-acervo.sql', import.meta.url), sql);
console.log('linhas:', linhas.length, '| bytes:', sql.length);

// Com --json, também emite o acervo em JSON, para um carregador via API que não
// queira parsear SQL. Fora do repositório de propósito: é uma duplicata gerada de
// js/data/, e arquivo gerado que fica versionado sai de sincronia em silêncio.
if (process.argv.includes('--json')) {
  writeFileSync(new URL('acervo.json', import.meta.url), JSON.stringify({
    areas: AREAS, subjects: SUBJECTS, topics: TOPICS, questions: QUESTIONS,
    studyMethods: STUDY_METHODS, sessionTemplates: SESSION_TEMPLATES,
    simulations: SIMULATIONS, essayPrompts: ESSAY_PROMPTS,
  }, null, 2));
  console.log('db/acervo.json escrito');
}
