-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE DATABASE "warcraftlogs";


CREATE TABLE "all_fights_summary" (
	"id" serial PRIMARY KEY,
	"boss_id" integer UNIQUE,
	"boss_name" varchar(255) NOT null unique,
	"start_time" integer NOT null unique,
	"end_time" integer NOT null unique,
	"size" integer NOT NULL,
	"difficulty" integer NOT NULL
);



CREATE TABLE "fight_summary" (
   "id" serial PRIMARY key unique,
	"boss_id" integer NOT null unique,
	"boss_name" varchar(255) NOT null unique,
	"start_time" integer NOT null unique,
	"end_time" integer NOT null unique,
	"encounter_length" integer NOT null unique,
	"entries" varchar(255) NOT NULL
);



CREATE TABLE "entries" (
	"id" serial PRIMARY key unique,
	"name" varchar(255) NOT null unique,
    "character_id" integer NOT null unique,
	"icon" varchar(255) NOT null unique,
	"item_level" integer NOT null unique,
	"entries_healing" integer NOT NULL,
	"entries_damage" integer NOT NULL
);



CREATE TABLE "entries_healing" (
	"id" serial PRIMARY key unique,
	"name" varchar(255) NOT null unique,
	"icon" varchar(255) NOT null unique,
	"item_level" integer NOT null unique,
	"encounter_length" integer NOT null unique,
	"total" integer NOT NULL,
	"total/second" integer NOT NULL,
	"healing_breakdown" integer NOT NULL
);



CREATE TABLE "entries_damage" (
	"id" serial PRIMARY key unique,
	"name" varchar(255) NOT null unique,
	"icon" varchar(255) NOT null unique,
	"item_level" integer NOT null unique,
	"encounter_length" integer NOT null unique,
	"total" integer NOT NULL,
	"total/second" integer NOT NULL,
	"damage_breakdown" integer NOT NULL
);



CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"character" varchar(255) NOT NULL
);



CREATE TABLE "overview" (
	"id" serial PRIMARY KEY,
	"report_id" varchar(255) NOT NULL,
	"zone" varchar(255) NOT NULL,
	"date" DATE NOT NULL
);




ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk0" FOREIGN KEY ("boss_id") REFERENCES "all_fights_summary"("boss_id");
ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk1" FOREIGN KEY ("boss_name") REFERENCES "all_fights_summary"("boss_name");
ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk2" FOREIGN KEY ("start_time") REFERENCES "all_fights_summary"("start_time");
ALTER TABLE "fight_summary" ADD CONSTRAINT "fight_summary_fk3" FOREIGN KEY ("end_time") REFERENCES "all_fights_summary"("end_time");


ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk0" FOREIGN KEY ("id") REFERENCES "entries"("id");
ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk1" FOREIGN KEY ("name") REFERENCES "entries"("name");
ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk2" FOREIGN KEY ("icon") REFERENCES "entries"("icon");
ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk3" FOREIGN KEY ("item_level") REFERENCES "entries"("item_level");
ALTER TABLE "entries_healing" ADD CONSTRAINT "entries_healing_fk4" FOREIGN KEY ("encounter_length") REFERENCES "fight_summary"("encounter_length");

ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk0" FOREIGN KEY ("id") REFERENCES "entries"("id");
ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk1" FOREIGN KEY ("name") REFERENCES "entries"("name");
ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk2" FOREIGN KEY ("icon") REFERENCES "entries"("icon");
ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk3" FOREIGN KEY ("item_level") REFERENCES "entries"("item_level");
ALTER TABLE "entries_damage" ADD CONSTRAINT "entries_damage_fk4" FOREIGN KEY ("encounter_length") REFERENCES "fight_summary"("encounter_length");
