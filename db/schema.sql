DROP TABLE IF EXISTS wish_list;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS attractions;


CREATE TABLE users
(
  id serial primary key,
  f_name text,
  l_name text,
  email text unique,
  password text,
  image_url text,
  current_city text
);

CREATE TABLE categories
(
  id serial primary key,
  type text
);

CREATE TABLE attractions
(
  id serial primary key,
  name text,
  location text,
  besttimetodo text,
  descriptions varchar(350),
  image text
);

CREATE TABLE wish_list
(
  id serial primary key,
  user_id integer references categories,
  location text,
  priority text,
  cat_id integer references categories,
  attraction_id integer references attractions
);
