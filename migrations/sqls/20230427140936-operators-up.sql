/* Replace with your SQL commands */

-- /* Replace with your SQL commands */


-- CREATE FUNCTION concat_names(firstname VARCHAR(255), lastname VARCHAR(255))
--   RETURNS VARCHAR(255)
--   IMMUTABLE
-- AS $$
--   SELECT firstname || ' ' || lastname;
-- $$ LANGUAGE SQL;

-- CREATE FUNCTION generate_operator_id(id INTEGER)
--   RETURNS VARCHAR(255)
--   IMMUTABLE
-- AS $$
--   SELECT CONCAT('0-', id);
-- $$ LANGUAGE SQL;

-- CREATE TYPE gender AS ENUM ('male', 'female');

CREATE TABLE IF NOT EXISTS Operators (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(255) GENERATED ALWAYS AS (generate_operator_id(id)) STORED UNIQUE,
  firstname VARCHAR(255) Not Null,
  lastname VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) GENERATED ALWAYS AS (concat_names(firstname, lastname)) STORED,
  phonenumber BIGINT NOT NULL,
  nationality VARCHAR(255) NOT NULL,
  state_id integer references States (state_id) on DELETE set null, 
  lga_id integer references Lgas(lga_id) on DELETE set null,
  sex gender NOT NULL,
  dateofbirth DATE not null,
  nin BIGINT NOT NULL,
  isverified BOOLEAN DEFAULT true,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  picture BYTEA NOT NULL
);
