-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE DATABASE "warcraftlogs";


CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"character" varchar(255),
   "armory" varchar(255),
   "favorites" TEXT []
);


CREATE TABLE "reports" (
	"id" serial PRIMARY KEY,
	"report_code" varchar(255) NOT NULL UNIQUE,
   "report_name" varchar(255),
   "guild_faction" varchar(255),
   "guild_name" varchar(255),
   "guild_server" varchar(255),
	"zone" varchar(255),
	"date" varchar(255)
);




-- ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk0" FOREIGN KEY ("boss_id") REFERENCES "all_fights_summary"("boss_id");
-- ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk1" FOREIGN KEY ("boss_name") REFERENCES "all_fights_summary"("boss_name");
-- ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk2" FOREIGN KEY ("start_time") REFERENCES "all_fights_summary"("start_time");
-- ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk3" FOREIGN KEY ("end_time") REFERENCES "all_fights_summary"("end_time");


-- ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk0" FOREIGN KEY ("id") REFERENCES "entries"("id");
-- ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk1" FOREIGN KEY ("name") REFERENCES "entries"("name");
-- ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk2" FOREIGN KEY ("icon") REFERENCES "entries"("icon");
-- ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk3" FOREIGN KEY ("item_level") REFERENCES "entries"("item_level");
-- ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk4" FOREIGN KEY ("encounter_length") REFERENCES "fight_summary"("encounter_length");

-- ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk0" FOREIGN KEY ("id") REFERENCES "entries"("id");
-- ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk1" FOREIGN KEY ("name") REFERENCES "entries"("name");
-- ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk2" FOREIGN KEY ("icon") REFERENCES "entries"("icon");
-- ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk3" FOREIGN KEY ("item_level") REFERENCES "entries"("item_level");
-- ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk4" FOREIGN KEY ("encounter_length") REFERENCES "fight_summary"("encounter_length");
