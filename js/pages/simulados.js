import { startPage } from '../core/shell.js';
import {
  renderSimulations,
  renderSimulationDetail,
  renderSimulationResult,
} from '../views/simulations.js';

startPage({
  fallbackRoute: '/simulados',
  register: ({ route, view, requireOnboarding }) => {
    route('/simulados', view(renderSimulations, { guard: requireOnboarding }));
    route('/simulados/resultado/:runId', view(renderSimulationResult, { guard: requireOnboarding }));
    route('/simulados/:slug', view(renderSimulationDetail, { guard: requireOnboarding }));
  },
});
