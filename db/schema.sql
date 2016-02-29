DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS users;
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


CREATE TABLE attractions
(
  id serial primary key,
  name text,
  location text,
  besttimetodo text,
  category text,
  description text,
  image text
);

CREATE TABLE wishlist
(
  user_id integer references users,
  attraction_id integer references attractions,
  wish boolean default false,
  havebeen boolean default false,
  PRIMARY KEY (user_id, attraction_id)
);
