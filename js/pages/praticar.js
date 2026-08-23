/** praticar.html — escolha da sessão e preparação antes de começar. */

import { startPage } from '../core/shell.js';
import { renderPractice, renderSessionTemplate, renderQuickSession } from '../views/practice.js';

startPage({
  fallbackRoute: '/praticar',
  register: ({ route, view, requireOnboarding }) => {
    route('/praticar', view(renderPractice, { guard: requireOnboarding }));
    route('/praticar/rapido', view(renderQuickSession, { guard: requireOnboarding }));
    route('/praticar/sessao/:slug', view(renderSessionTemplate, { guard: requireOnboarding }));
  },
});
