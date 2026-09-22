import * as migration_20260916_074522_initial from './20260916_074522_initial';
import * as migration_20260917_013013_add_user_role from './20260917_013013_add_user_role';
import * as migration_20260917_024318_add_legal_pages from './20260917_024318_add_legal_pages';
import * as migration_20260917_032654_add_faqs from './20260917_032654_add_faqs';
import * as migration_20260917_040458_add_first_time_service from './20260917_040458_add_first_time_service';
import * as migration_20260922_133733_add_about_section from './20260922_133733_add_about_section';
import * as migration_20260922_135135_add_health_funds_section from './20260922_135135_add_health_funds_section';
import * as migration_20260922_140655_add_nav_link_children from './20260922_140655_add_nav_link_children';
import * as migration_20260922_140947_add_services_drafts from './20260922_140947_add_services_drafts';

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
    name: '20260917_024318_add_legal_pages',
  },
  {
    up: migration_20260917_032654_add_faqs.up,
    down: migration_20260917_032654_add_faqs.down,
    name: '20260917_032654_add_faqs',
  },
  {
    up: migration_20260917_040458_add_first_time_service.up,
    down: migration_20260917_040458_add_first_time_service.down,
    name: '20260917_040458_add_first_time_service',
  },
  {
    up: migration_20260922_133733_add_about_section.up,
    down: migration_20260922_133733_add_about_section.down,
    name: '20260922_133733_add_about_section',
  },
  {
    up: migration_20260922_135135_add_health_funds_section.up,
    down: migration_20260922_135135_add_health_funds_section.down,
    name: '20260922_135135_add_health_funds_section',
  },
  {
    up: migration_20260922_140655_add_nav_link_children.up,
    down: migration_20260922_140655_add_nav_link_children.down,
    name: '20260922_140655_add_nav_link_children',
  },
  {
    up: migration_20260922_140947_add_services_drafts.up,
    down: migration_20260922_140947_add_services_drafts.down,
    name: '20260922_140947_add_services_drafts'
  },
];
