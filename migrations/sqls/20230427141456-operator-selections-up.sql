/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS Operator_selections (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(255) REFERENCES Operators(operator_id) on DELETE CASCADE,
  product_id integer REFERENCES Products(product_id) on DELETE set null,
  seed_type_id integer REFERENCES Seed_types(seed_type_id) on DELETE set null,
  UNIQUE (operator_id, product_id, seed_type_id)
  )