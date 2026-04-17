CREATE SCHEMA IF NOT EXISTS "greetify";
--> statement-breakpoint
ALTER TABLE "public"."user" SET SCHEMA "greetify";
--> statement-breakpoint
ALTER TABLE "public"."session" SET SCHEMA "greetify";
--> statement-breakpoint
ALTER TABLE "public"."account" SET SCHEMA "greetify";
--> statement-breakpoint
ALTER TABLE "public"."verification" SET SCHEMA "greetify";
--> statement-breakpoint
ALTER TABLE "public"."cards" SET SCHEMA "greetify";
