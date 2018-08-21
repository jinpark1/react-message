drop table if exists messages;
drop table if exists channel;
drop table if exists member;
drop table if exists team;
drop table if exists codes;
drop table if exists users;
drop table if exists "session";

create table if not exists users (
    id serial primary key,
    username text unique,
    email text unique,
    password text
);

create table if not exists team (
    id serial primary key,
    name text,
    owner int references users(id)
);

create table if not exists member (
    team_id int references team(id),
    user_id int references users(id)
);

create table if not exists channel (
    id serial primary key,
    name text,
    team_id int references team(id),
    public boolean
);

create table if not exists messages (
    message text,
    user_id int references users(id),
    channel_id int references channel(id)
);

create table if not exists codes (
    id serial primary key,
    code text,
    time_sent timestamp,
    user_id int references users(id)
);

----- Sessions table 
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
);