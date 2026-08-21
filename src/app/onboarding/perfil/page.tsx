import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth/current-user';
import { loadAnswers, syncProfileFromAnswers } from '@/lib/onboarding/service';
import { classifyProfile, describePersonalization, supportsFor } from '@/lib/profile/engine';
import { getProfile } from '@/lib/profile/profiles';
import { ONBOARDING_MESSAGES } from '@/lib/onboarding/questionnaire';
import { ProfileConfirmation } from './ProfileConfirmation';

export const metadata: Metadata = { title: 'Seu perfil de estudo' };

export default async function ProfileConfirmationPage() {
  const user = await requireUser('/onboarding/perfil');
  await syncProfileFromAnswers(user.id);

  const answers = await loadAnswers(user.id);
  const result = classifyProfile(answers);
  const suggested = getProfile(result.suggested);

  const alternatives = result.alternatives.map((slug) => {
    const profile = getProfile(slug);
    const rankingEntry = result.ranking.find((item) => item.slug === slug);
    return {
      slug: profile.slug,
      name: profile.name,
      description: profile.description,
      trait: profile.trait,
      firstApproach: profile.firstApproach,
      premiseReason: rankingEntry?.eligible === false ? rankingEntry.premiseReason : undefined,
    };
  });

  return (
    <ProfileConfirmation
      suggested={{
        slug: suggested.slug,
        name: suggested.name,
        description: suggested.description,
        firstApproach: suggested.firstApproach,
      }}
      signals={result.signals.map((signal) => signal.text)}
      effects={describePersonalization(suggested.slug)}
      supports={supportsFor(answers)}
      alternatives={alternatives}
      confidence={result.confidence}
      contradictions={result.contradictions}
      insufficientMessage={
        result.confidence === 'low' && result.contradictions.length === 0
          ? ONBOARDING_MESSAGES.insufficient
          : undefined
      }
      contradictionMessage={
        result.contradictions.length > 0 ? ONBOARDING_MESSAGES.contradiction : undefined
      }
    />
  );
}
