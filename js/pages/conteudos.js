import { startPage } from '../core/shell.js';
import { renderContentMap, renderTopic } from '../views/content.js';

startPage({
  fallbackRoute: '/conteudos',
  register: ({ route, view, requireOnboarding }) => {
    route('/conteudos', view(renderContentMap, { guard: requireOnboarding }));
    route('/conteudos/:slug', view(renderTopic, { guard: requireOnboarding }));
  },
});
