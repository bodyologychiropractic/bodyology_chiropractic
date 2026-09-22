import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_health_funds_section_funds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  ALTER TABLE "home" ADD COLUMN "health_funds_section_title" varchar DEFAULT 'All Major Health Funds Accepted';
  ALTER TABLE "home" ADD COLUMN "health_funds_section_description" varchar DEFAULT 'Feel free to contact us to confirm if your health fund is included';
  ALTER TABLE "home" ADD COLUMN "health_funds_section_google_rating_rating" numeric DEFAULT 5;
  ALTER TABLE "home" ADD COLUMN "health_funds_section_google_rating_review_count" numeric;
  ALTER TABLE "home" ADD COLUMN "health_funds_section_google_rating_url" varchar;
  ALTER TABLE "home_health_funds_section_funds" ADD CONSTRAINT "home_health_funds_section_funds_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_health_funds_section_funds" ADD CONSTRAINT "home_health_funds_section_funds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_health_funds_section_funds_order_idx" ON "home_health_funds_section_funds" USING btree ("_order");
  CREATE INDEX "home_health_funds_section_funds_parent_id_idx" ON "home_health_funds_section_funds" USING btree ("_parent_id");
  CREATE INDEX "home_health_funds_section_funds_image_idx" ON "home_health_funds_section_funds" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_health_funds_section_funds" CASCADE;
  ALTER TABLE "home" DROP COLUMN "health_funds_section_title";
  ALTER TABLE "home" DROP COLUMN "health_funds_section_description";
  ALTER TABLE "home" DROP COLUMN "health_funds_section_google_rating_rating";
  ALTER TABLE "home" DROP COLUMN "health_funds_section_google_rating_review_count";
  ALTER TABLE "home" DROP COLUMN "health_funds_section_google_rating_url";`)
}
