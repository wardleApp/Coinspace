CREATE DATABASE coinspace;

USE coinspace;

CREATE TABLE coin (
  id int NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL,
);

CREATE TABLE price_history (
  id serial PRIMARY KEY,
  coin_id int NOT NULL,
  time_stamp varchar(50) NOT NULL,
  price decimal NOT NULL
);


