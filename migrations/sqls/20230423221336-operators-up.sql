/* Replace with your SQL commands */


CREATE TYPE gender AS ENUM ('male', 'female');

CREATE TABLE IF NOT EXISTS Operators (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(255) GENERATED ALWAYS AS (CONCAT('xyz-', id)) STORED UNIQUE,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  fullname VARCHAR(255) GENERATED ALWAYS AS  (CONCAT(firstname," ",lastname)) STORED,
  phonenumber BIGINT,
  nationality VARCHAR(255),
  state VARCHAR(255),
  lga VARCHAR(255),
  sex gender,
  dateofbirth DATE,
  nin BIGINT,
  picture BYTEA,
  isVerified BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

