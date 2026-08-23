

import { startPage } from '../core/shell.js';
import {
  renderProfileHub,
  renderStudyProfile,
  renderSettings,
  renderReport,
  renderDataPage,
} from '../views/profile.js';

startPage({
  fallbackRoute: '/perfil',
  register: ({ route, view, requireOnboarding }) => {
    route('/perfil', view(renderProfileHub, { guard: requireOnboarding }));
    route('/perfil/estudo', view(renderStudyProfile, { guard: requireOnboarding }));
    route('/perfil/configuracoes', view(renderSettings, { guard: requireOnboarding }));
    route('/perfil/relatorio', view(renderReport, { guard: requireOnboarding }));
    route('/perfil/dados', view(renderDataPage, { guard: requireOnboarding }));
  },
});
