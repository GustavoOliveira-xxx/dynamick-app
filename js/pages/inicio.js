import { startPage } from '../core/shell.js';
import { renderDashboard } from '../views/dashboard.js';
import { renderDiagnostic } from '../views/diagnostic.js';

startPage({
  fallbackRoute: '/inicio',
  register: ({ route, view, requireOnboarding }) => {
    route('/', view(renderDashboard, { guard: requireOnboarding }));
    route('/inicio', view(renderDashboard, { guard: requireOnboarding }));
    route('/diagnostico', view(renderDiagnostic, { guard: requireOnboarding }));
  },
});
