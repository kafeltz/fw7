/** @type {import('@types/pg').Client} */

import { Client } from "pg"

function getClient() {
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
  });

  return client;
}

export const getUrls = async () => {
  const client = getClient();
  await client.connect();
  const res = await client.query('SELECT * FROM urls');
  await client.end();
  return res.rows;
}

// todo colocar try com begin
export const createUrl = async(url: string) => {
  const client = getClient();
  await client.connect();

  const short_url = url;
  const params = [url, short_url];

  const query = `
  INSERT INTO urls
  (url, short_url, created_at)
  VALUES
  ($1, $2, NOW())
  RETURNING id;
  `;
  const res = await client.query(query, params);
  await client.end();

  return res.rows;
}
