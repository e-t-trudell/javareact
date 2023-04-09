DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY,
  FIRST_NAME VARCHAR(250) NOT NULL,
  LAST_NAME VARCHAR(250) NOT NULL,
  EMAIL VARCHAR(250) NOT NULL,
  PASSWORD VARCHAR(250) NOT NULL,
  CREATED_AT DATE,
  UPDATED_AT DATE
  );
  
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  id INT PRIMARY KEY,
  NAME VARCHAR(250) NOT NULL
  );