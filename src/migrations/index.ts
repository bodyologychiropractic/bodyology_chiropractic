import * as migration_20260916_074522_initial from './20260916_074522_initial';

export const migrations = [
  {
    up: migration_20260916_074522_initial.up,
    down: migration_20260916_074522_initial.down,
    name: '20260916_074522_initial'
  },
];
