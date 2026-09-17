import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_first_time_service_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  ALTER TABLE "home" ADD COLUMN "first_time_service_title" varchar;
  ALTER TABLE "home" ADD COLUMN "first_time_service_description" varchar;
  ALTER TABLE "home" ADD COLUMN "first_time_service_banner_image_id" integer;
  ALTER TABLE "home_first_time_service_steps" ADD CONSTRAINT "home_first_time_service_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_first_time_service_steps" ADD CONSTRAINT "home_first_time_service_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_first_time_service_steps_order_idx" ON "home_first_time_service_steps" USING btree ("_order");
  CREATE INDEX "home_first_time_service_steps_parent_id_idx" ON "home_first_time_service_steps" USING btree ("_parent_id");
  CREATE INDEX "home_first_time_service_steps_image_idx" ON "home_first_time_service_steps" USING btree ("image_id");
  ALTER TABLE "home" ADD CONSTRAINT "home_first_time_service_banner_image_id_media_id_fk" FOREIGN KEY ("first_time_service_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_first_time_service_first_time_service_banner_image_idx" ON "home" USING btree ("first_time_service_banner_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_first_time_service_steps" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_first_time_service_steps" CASCADE;
  ALTER TABLE "home" DROP CONSTRAINT "home_first_time_service_banner_image_id_media_id_fk";
  
  DROP INDEX "home_first_time_service_first_time_service_banner_image_idx";
  ALTER TABLE "home" DROP COLUMN "first_time_service_title";
  ALTER TABLE "home" DROP COLUMN "first_time_service_description";
  ALTER TABLE "home" DROP COLUMN "first_time_service_banner_image_id";`)
}
