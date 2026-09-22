import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_about_section_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  ALTER TABLE "home" ADD COLUMN "about_section_image_id" integer;
  ALTER TABLE "home" ADD COLUMN "about_section_eyebrow" varchar DEFAULT 'Welcome to Bodyology Chiropractic';
  ALTER TABLE "home" ADD COLUMN "about_section_title" varchar;
  ALTER TABLE "home" ADD COLUMN "about_section_description" varchar;
  ALTER TABLE "home" ADD COLUMN "about_section_button_label" varchar DEFAULT 'Learn More About Us';
  ALTER TABLE "home_about_section_points" ADD CONSTRAINT "home_about_section_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_about_section_points_order_idx" ON "home_about_section_points" USING btree ("_order");
  CREATE INDEX "home_about_section_points_parent_id_idx" ON "home_about_section_points" USING btree ("_parent_id");
  ALTER TABLE "home" ADD CONSTRAINT "home_about_section_image_id_media_id_fk" FOREIGN KEY ("about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_about_section_about_section_image_idx" ON "home" USING btree ("about_section_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_about_section_points" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_about_section_points" CASCADE;
  ALTER TABLE "home" DROP CONSTRAINT "home_about_section_image_id_media_id_fk";
  
  DROP INDEX "home_about_section_about_section_image_idx";
  ALTER TABLE "home" DROP COLUMN "about_section_image_id";
  ALTER TABLE "home" DROP COLUMN "about_section_eyebrow";
  ALTER TABLE "home" DROP COLUMN "about_section_title";
  ALTER TABLE "home" DROP COLUMN "about_section_description";
  ALTER TABLE "home" DROP COLUMN "about_section_button_label";`)
}
