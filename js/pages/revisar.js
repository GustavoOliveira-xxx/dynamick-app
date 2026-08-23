/** revisar.html — fila de revisão e caderno de erros. */

import { startPage } from '../core/shell.js';
import { renderReview, renderNotebook } from '../views/review.js';

startPage({
  fallbackRoute: '/revisar',
  register: ({ route, view, requireOnboarding }) => {
    route('/revisar', view(renderReview, { guard: requireOnboarding }));
    route('/revisar/caderno', view(renderNotebook, { guard: requireOnboarding }));
  },
});
