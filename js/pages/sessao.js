import { startPage } from '../core/shell.js';
import { renderSession, renderSessionResult } from '../views/session.js';

startPage({
  fallbackRoute: '/inicio',
  register: ({ route, view, requireOnboarding }) => {
    route('/sessao/:id', view(renderSession, { guard: requireOnboarding }));
    route('/sessao/:id/resultado', view(renderSessionResult, { guard: requireOnboarding }));
  },
});
