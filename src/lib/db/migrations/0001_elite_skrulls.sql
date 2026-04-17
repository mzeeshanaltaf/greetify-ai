ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 5 NOT NULL;--> statement-breakpoint
CREATE INDEX "cards_user_created_idx" ON "cards" USING btree ("user_id","created_at");