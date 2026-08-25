import { startPage } from '../core/shell.js';
import { renderCatalog } from '../views/catalog.js';

startPage({
  fallbackRoute: '/catalogo',
  register: ({ route, view, requireOnboarding }) => {
    route('/catalogo', view(renderCatalog, { guard: requireOnboarding }));
  },
});
