import { startPage } from '../core/shell.js';
import { renderEnemArchive } from '../views/enems.js';

startPage({
  fallbackRoute: '/enems',
  register: ({ route, view, requireOnboarding }) => {
    route('/enems', view(renderEnemArchive, { guard: requireOnboarding }));
  },
});
