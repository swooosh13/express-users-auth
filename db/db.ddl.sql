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

create TABLE posts
(
  id serial PRIMARY KEY,
  title VARCHAR(45),
  content VARCHAR(45),
  "userId" INTEGER,
  "createdAt" DATE,
  "updatedAt" DATE,
  FOREIGN KEY ("userId") REFERENCES users(id)
);
