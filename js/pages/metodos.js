/** metodos.html — biblioteca de formas de estudar. */

import { startPage } from '../core/shell.js';
import { renderMethods } from '../views/methods.js';

startPage({
  fallbackRoute: '/metodos',
  register: ({ route, view, requireOnboarding }) => {
    route('/metodos', view(renderMethods, { guard: requireOnboarding }));
  },
});
