-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);



CREATE TABLE "all_fights_summary" (
	"id" integer NOT NULL,
	"boss_id" integer UNIQUE,
	"boss_name" varchar(255) NOT NULL UNIQUE,
	"start_time" integer NOT NULL UNIQUE,
	"end_time" integer NOT NULL UNIQUE,
	"size" integer NOT NULL,
	"difficulty" integer NOT NULL,
	"kill" integer NOT NULL,
	CONSTRAINT "all_fights_summary_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "overview" (
	"id" varchar(255) NOT NULL,
	"zone" varchar(255) NOT NULL,
	"boss_id" integer NOT NULL UNIQUE,
	"boss_name" varchar(255) NOT NULL UNIQUE
) WITH (
  OIDS=FALSE
);



CREATE TABLE "fight_summary" (
	"boss_id" integer NOT NULL,
	"boss_name" varchar(255) NOT NULL UNIQUE,
	"start_time" integer NOT NULL UNIQUE,
	"end_time" integer NOT NULL UNIQUE,
	"encounter_length" integer NOT NULL UNIQUE,
	"entries" varchar(255) NOT NULL,
	CONSTRAINT "fight_summary_pk" PRIMARY KEY ("boss_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entries" (
	"id" integer NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"icon" varchar(255) NOT NULL UNIQUE,
	"item_level" integer NOT NULL UNIQUE,
	"entries_healing" integer NOT NULL,
	"entries_damage" integer NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entries_healing" (
	"id" integer NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"icon" varchar(255) NOT NULL,
	"item_level" integer NOT NULL UNIQUE,
	"encounter_length" integer NOT NULL UNIQUE,
	"total" integer NOT NULL,
	"total/second" integer NOT NULL,
	"healing_breakdown" integer NOT NULL,
	CONSTRAINT "entries_healing_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entries_damage" (
	"id" integer NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"icon" varchar(255) NOT NULL UNIQUE,
	"item_level" integer NOT NULL UNIQUE,
	"encounter_length" integer NOT NULL UNIQUE,
	"total" integer NOT NULL,
	"total/second" integer NOT NULL,
	"damage_breakdown" integer NOT NULL,
	CONSTRAINT "entries_damage_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "all_fights_summary" ADD CONSTRAINT "all_fights_summary_fk0" FOREIGN KEY ("boss_id") REFERENCES "overview"("boss_id");
ALTER TABLE "all_fights_summary" ADD CONSTRAINT "all_fights_summary_fk1" FOREIGN KEY ("boss_name") REFERENCES "overview"("boss_name");


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

