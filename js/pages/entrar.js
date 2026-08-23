

import { startPage } from '../core/shell.js';
import { renderAccount } from '../views/account.js';

startPage({
  chrome: false,
  fallbackRoute: '/entrar',
  register: ({ route, view }) => {
    route('/entrar', view(renderAccount));
    route('/entrar/:aba', view(renderAccount));
  },
});
