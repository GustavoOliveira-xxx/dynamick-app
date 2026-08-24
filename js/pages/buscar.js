

import { startPage } from '../core/shell.js';
import { renderSearch } from '../views/search.js';

startPage({
  fallbackRoute: '/buscar',
  register: ({ route, view, requireOnboarding }) => {
    route('/buscar', view(renderSearch, { guard: requireOnboarding }));
  },
});
