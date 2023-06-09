/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS Users (
  user_id SERIAL PRIMARY KEY, 
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  isoperator boolean default false,
  isactive boolean default true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
