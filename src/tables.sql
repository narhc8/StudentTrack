CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`user_id`)
);
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` INT AUTO_INCREMENT,
  `task_id` INT,
  `board_id` INT,
  `role_name` VARCHAR(255),
  PRIMARY KEY (`role_id`)
);
CREATE TABLE IF NOT EXISTS `groups` (
  `group_id` INT AUTO_INCREMENT,
  `user_id` INT,
  `board_id` INT,
  `role_id` INT,
  `group_name` VARCHAR(255),
  PRIMARY KEY (`group_id`),
  FOREIGN KEY (`user_id`) REFERENCES users(user_id),
  FOREIGN KEY (`role_id`) REFERENCES roles(role_id)
);
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` INT AUTO_INCREMENT,
  `board_id` INT,
  `task_name` VARCHAR(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `author_id` INT,
  `list_id` INT,
  PRIMARY KEY (`task_id`),
  FOREIGN KEY (`author_id`) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS `boards` (
  `board_id` INT AUTO_INCREMENT,
  `name` INT,
  `description` varchar(255),
  `author_id` INT,
  PRIMARY KEY (`board_id`),
  FOREIGN KEY (`author_id`) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS `lists` (
  `list_id` INT AUTO_INCREMENT,
  `list_name` VARCHAR(255) NOT NULL UNIQUE,
  `task_id` INT,
  PRIMARY KEY (`list_id`),
  FOREIGN KEY (`task_id`) REFERENCES tasks(task_id)
);
ALTER TABLE
  `roles`
ADD
  FOREIGN KEY (task_id) REFERENCES tasks(task_id);
ALTER TABLE
  `roles`
ADD
  FOREIGN KEY (board_id) REFERENCES boards(board_id);
ALTER TABLE
  `groups`
ADD
  FOREIGN KEY (board_id) REFERENCES boards(board_id);
ALTER TABLE
  `tasks`
ADD
  FOREIGN KEY (board_id) REFERENCES boards(board_id);
ALTER TABLE
  `tasks`
ADD
  FOREIGN KEY (list_id) REFERENCES lists(list_id);