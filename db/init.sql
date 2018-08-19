drop table if exists messages;
drop table if exists channel;
drop table if exists member;
drop table if exists team;
drop table if exists users;

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
    teamId int references team(id),
    userId int references users(id)
);

create table if not exists channel (
    id serial primary key,
    name text,
    teamId int references team(id),
    public boolean
);

create table if not exists messages (
    message text,
    userId int references users(id),
    channelId int references channel(id)
);

----- SEssions table 
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
);