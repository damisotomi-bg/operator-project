/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS Seed_types (
  seed_type_id SERIAL PRIMARY KEY,
  seed_type VARCHAR(255) NOT NULL UNIQUE,
  product_id integer REFERENCES Products(product_id) on DELETE CASCADE
  )