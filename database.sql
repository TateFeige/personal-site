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