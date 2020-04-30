DROP VIEW IF EXISTS `hasRole`;
CREATE VIEW `hasRole` AS
SELECT
  CONCAT(first_name, ' ', last_name) 'User',
  `task_name` 'Task',
  `board_name` 'Board',
  `role_name` 'Role'
FROM users
JOIN tasks ON (`user_id` = `author_id`)
JOIN boards USING (`board_id`)
JOIN roles USING (`board_id`);
DROP VIEW IF EXISTS `hasTasks`;
CREATE VIEW `hasTasks` AS
SELECT
  board_name,
  task_name
FROM boards
JOIN tasks USING (board_id);
DROP VIEW IF EXISTS `inGroup`;
CREATE VIEW `inGroup` AS
SELECT
  group_name,
  CONCAT(first_name, ' ', last_name)
FROM `groups`
JOIN `users` USING (user_id);
DROP VIEW IF EXISTS `hasList`;
CREATE VIEW `hasList` AS
SELECT
  board_name,
  list_name
FROM `boards`
JOIN `lists` USING (board_id);