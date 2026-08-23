/** onboarding.html — perfil de estudo: perguntas, confirmação e resumo. */

import { startPage } from '../core/shell.js';
import {
  renderOnboardingWelcome,
  renderOnboardingStep,
  renderProfileConfirmation,
  renderOnboardingSummary,
} from '../views/onboarding.js';

startPage({
  chrome: false,
  fallbackRoute: '/onboarding',
  register: ({ route, view, requireAccount }) => {
    route('/onboarding', view(renderOnboardingWelcome, { guard: requireAccount }));
    route('/onboarding/perfil', view(renderProfileConfirmation, { guard: requireAccount }));
    route('/onboarding/resumo', view(renderOnboardingSummary, { guard: requireAccount }));
    route('/onboarding/:etapa', view(renderOnboardingStep, { guard: requireAccount }));
  },
});
