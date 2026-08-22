'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button, LinkButton } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';

type DemoQuestion = {
  id: string;
  stem: string;
  support: string | null;
  topicName: string;
  options: { id: string; label: string; text: string; isCorrect: boolean; rationale: string }[];
  explanation: string;
};

/**
 * Sessão demonstrativa 100% no cliente: nenhuma chamada ao servidor, nenhum registro.
 * Reproduz o comportamento real — gabarito só depois de responder e comentário por
 * alternativa — para o visitante entender o produto antes de criar conta.
 */
export function DemoSession({ questions }: { questions: DemoQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const question = questions[index];
  if (!question) return null;

  const finished = results.length === questions.length;
  const correctCount = results.filter(Boolean).length;

  if (finished) {
    return (
      <Card className="ck-enter p-6">
        <Badge tone="green">Fim da demonstração</Badge>
        <h2 className="mt-3 text-xl font-semibold">
          Você acertou {correctCount} de {questions.length}
        </h2>
        <p className="mt-2 text-sm text-ink-secondary">
          Na plataforma, este resultado viraria uma recomendação: o que revisar, quando e por quê.
          Cada erro entraria na fila de revisão com uma questão diferente.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/criar-conta" size="lg">
            Criar minha conta
          </LinkButton>
          <Button
            variant="ghost"
            onClick={() => {
              setIndex(0);
              setSelected(null);
              setAnswered(false);
              setResults([]);
            }}
          >
            Repetir a demonstração
          </Button>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Nada do que você fez aqui foi gravado.{' '}
          <Link href="/privacidade" className="underline underline-offset-4">
            Como tratamos dados
          </Link>
        </p>
      </Card>
    );
  }

  const chosen = question.options.find((option) => option.id === selected);
  const correct = question.options.find((option) => option.isCorrect);

  return (
    <div className="space-y-4">
      <Progress
        value={results.length}
        max={questions.length}
        label={`Questão ${index + 1} de ${questions.length}`}
        size="sm"
      />

      <Card className="p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="cyan">{question.topicName}</Badge>
          <span className="text-xs text-ink-muted">
            {index + 1} de {questions.length}
          </span>
        </div>

        {question.support && (
          <p className="mt-4 rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm text-ink-secondary">
            {question.support}
          </p>
        )}

        <p className="ck-reading mt-4 whitespace-pre-line">{question.stem}</p>

        <fieldset className="mt-5 border-0 p-0" disabled={answered}>
          <legend className="sr-only">Alternativas</legend>
          {question.options.map((option) => {
            const isSelected = selected === option.id;
            const showCorrect = answered && option.isCorrect;
            const showWrong = answered && isSelected && !option.isCorrect;

            return (
              <label
                key={option.id}
                className="ck-card ck-card-interactive mb-2.5 flex cursor-pointer items-start gap-3 p-4"
                style={{
                  borderColor: showCorrect
                    ? 'var(--ck-success)'
                    : showWrong
                      ? 'var(--ck-danger)'
                      : isSelected
                        ? 'var(--ck-green-primary)'
                        : undefined,
                }}
              >
                <input
                  type="radio"
                  name={`demo-${question.id}`}
                  checked={isSelected}
                  onChange={() => setSelected(option.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--ck-green-primary)]"
                />
                <span className="min-w-0 flex-1">
                  <span className="font-medium">{option.label})</span> {option.text}
                  {answered && (
                    <span className="mt-1 block text-xs text-ink-muted">{option.rationale}</span>
                  )}
                  {showCorrect && (
                    <span className="mt-1 block text-xs font-medium" style={{ color: 'var(--ck-success)' }}>
                      ✓ Alternativa correta
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </fieldset>

        {!answered ? (
          <Button
            className="mt-4"
            size="lg"
            disabled={!selected}
            onClick={() => {
              setAnswered(true);
              setResults((current) => [...current, chosen?.isCorrect ?? false]);
            }}
          >
            Responder
          </Button>
        ) : (
          <div className="mt-5 space-y-4">
            <div
              className="rounded-md border-l-2 p-4"
              style={{
                borderColor: chosen?.isCorrect ? 'var(--ck-success)' : 'var(--ck-danger)',
                background: 'var(--ck-bg-raised)',
              }}
            >
              <p className="text-sm font-medium">
                {chosen?.isCorrect
                  ? 'Resposta correta.'
                  : `Você marcou ${chosen?.label}. A correta é ${correct?.label}.`}
              </p>
              <p className="ck-reading mt-2 text-sm text-ink-secondary">{question.explanation}</p>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setIndex((value) => value + 1);
                setSelected(null);
                setAnswered(false);
              }}
            >
              {index + 1 < questions.length ? 'Próxima questão' : 'Ver o resultado'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
