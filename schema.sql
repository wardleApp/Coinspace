DROP DATABASE coinspace;

CREATE DATABASE IF NOT Exists coinspace;

\c coinspace;

Drop table if exists coin;
Drop table if exists price_history;
Drop table if exists users;

CREATE TABLE coin (
  id int NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL
);

CREATE TABLE price_history (
  id serial PRIMARY KEY,
  coin_id int NOT NULL,
  time_stamp varchar(50) NOT NULL,
  price decimal NOT NULL
);

CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  email varchar(50) NOT NULL,
  password text NOT NULL
);


