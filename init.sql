CREATE TABLE IF NOT EXISTS urls (
   id serial PRIMARY KEY,
   url TEXT UNIQUE NOT NULL,
   short_url varchar(255) UNIQUE DEFAULT '',
   created_at timestamp NOT NULL,
   updated_at timestamp
);