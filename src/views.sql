DROP VIEW IF EXISTS hasRole;
CREATE VIEW hasRole AS
SELECT
  CONCAT(first_name, ' ', last_name),
  task_name,
  board_name,
  role_name
FROM