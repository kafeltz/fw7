CREATE TABLE IF NOT EXISTS urls (
   id serial PRIMARY KEY,
   url TEXT UNIQUE NOT NULL,
   short_url TEXT,
   created_at timestamp NOT NULL
);