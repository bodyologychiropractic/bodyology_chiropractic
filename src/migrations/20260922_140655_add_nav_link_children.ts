import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "settings_nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  ALTER TABLE "settings_nav_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "settings_nav_links" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "settings_nav_links_children" ADD CONSTRAINT "settings_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "settings_nav_links_children_order_idx" ON "settings_nav_links_children" USING btree ("_order");
  CREATE INDEX "settings_nav_links_children_parent_id_idx" ON "settings_nav_links_children" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings_nav_links_children" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "settings_nav_links_children" CASCADE;
  ALTER TABLE "settings_nav_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "settings_nav_links" ALTER COLUMN "href" DROP NOT NULL;`)
}
