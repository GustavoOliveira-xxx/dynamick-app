import { startPage } from '../core/shell.js';
import { renderEssayHub, renderEssayPrompt } from '../views/essay.js';

startPage({
  fallbackRoute: '/redacao',
  register: ({ route, view, requireOnboarding }) => {
    route('/redacao', view(renderEssayHub, { guard: requireOnboarding }));
    route('/redacao/:slug', view(renderEssayPrompt, { guard: requireOnboarding }));
  },
});
