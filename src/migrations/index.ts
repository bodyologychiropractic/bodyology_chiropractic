import * as migration_20260916_074522_initial from './20260916_074522_initial';
import * as migration_20260917_013013_add_user_role from './20260917_013013_add_user_role';
import * as migration_20260917_024318_add_legal_pages from './20260917_024318_add_legal_pages';

export const migrations = [
  {
    up: migration_20260916_074522_initial.up,
    down: migration_20260916_074522_initial.down,
    name: '20260916_074522_initial',
  },
  {
    up: migration_20260917_013013_add_user_role.up,
    down: migration_20260917_013013_add_user_role.down,
    name: '20260917_013013_add_user_role',
  },
  {
    up: migration_20260917_024318_add_legal_pages.up,
    down: migration_20260917_024318_add_legal_pages.down,
    name: '20260917_024318_add_legal_pages'
  },
];
