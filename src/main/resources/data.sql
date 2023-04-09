INSERT INTO users (ID, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CREATED_AT, UPDATED_AT) VALUES
  (1, 'first', 'last 1', 'abc1@gmail.com', password, Now(), Now()),
  (2, 'first', 'last 2', 'abc2@gmail.com', password, Now(), Now()),
  (3, 'first', 'last 3', 'abc3@gmail.com', password, Now(), Now());
INSERT INTO roles (ID, NAME) VALUES
	(1, 'ROLE_USER'),
	(2, 'ROLE_ADMIN');