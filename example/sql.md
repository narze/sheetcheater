# SQL Cheatsheet

## CRUD

### Select #query #basics

- `SELECT * FROM users;` — all columns
- `SELECT name, email FROM users;` — specific columns
- `SELECT DISTINCT city FROM users;` — unique values
- `SELECT * FROM users LIMIT 10;` — limit results

### Insert & Update #query

- `INSERT INTO users (name, email) VALUES ('A', 'a@x.com');` — add row
- `UPDATE users SET name = 'B' WHERE id = 1;` — modify row
- `DELETE FROM users WHERE id = 1;` — remove row

## Filtering

### Where & Order #query

- `WHERE age > 18 AND active = true` — combined conditions
- `WHERE name LIKE 'A%'` — pattern match
- `ORDER BY created_at DESC` — sort descending
- `WHERE id IN (1, 2, 3)` — match set

### Aggregation #query #advanced

- `COUNT(*)`, `SUM(price)`, `AVG(score)` — aggregate functions
- `GROUP BY category` — group results
- `HAVING COUNT(*) > 5` — filter groups

## Joins

### Types #query #join

- `INNER JOIN orders ON users.id = orders.user_id` — matching only
- `LEFT JOIN orders ON users.id = orders.user_id` — all from left
- `FULL OUTER JOIN` — all from both
- `CROSS JOIN` — cartesian product
