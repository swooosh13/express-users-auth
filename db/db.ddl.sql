CREATE TABLE users
(
  id serial primary key,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  username VARCHAR(255),
  "createdAt" DATE,
  "updatedAt" DATE,
  role VARCHAR(45) DEFAULT ('USER')
);
