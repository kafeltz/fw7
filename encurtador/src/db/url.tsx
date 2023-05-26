/** @type {import('@types/pg').Client} */
/** @type {import('builtins')} */

import { Client } from "pg"
import {decode, encode} from "../../../coder"

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

export const getUrls = async (page: number, limit: number) => {
  const client = getClient();

  const params : (number|string)[] = [limit, limit*(page-1)];

  await client.connect();
  const query = 'SELECT id, url, short_url, created_at, updated_at FROM urls LIMIT $1 OFFSET $2';
  const res = await client.query(query, params);

  const queryTotal = 'SELECT COUNT(*) AS total FROM urls';
  const resTotal = await client.query(queryTotal);

  const result = {
    'total': resTotal.rows[0]['total'],
    'rows': res.rows
  }

  await client.end();

  return result;
}

export const getUrlByHash = async (hash : string) : Promise<string> => {
  const client = getClient();
  await client.connect();
  const res = await client.query('SELECT url FROM urls WHERE short_url = $1;', [hash]);
  await client.end();
  const url = res.rows[0]['url'];

  return url;
}

// todo colocar try com begin
export const createUrl = async(url: string) : Promise<number> => {
  const client = getClient();

  try {
    await client.connect();
    await client.query('BEGIN')

    const short_url = url;
    let params : (number|string)[] = [short_url];

    let query = `
    INSERT INTO urls
    (url, created_at)
    VALUES
    ($1, NOW())
    RETURNING id;
    `;

    const res = await client.query(query, params);
    const id : number = res.rows[0]['id'];

    const encode_url = encode(id);

    query = 'UPDATE urls SET short_url = $1, updated_at = NOW() WHERE id = $2;';
    params = [encode_url, id];
    await client.query(query, params);
    await client.query('COMMIT')
    await client.end();
    return id;
  } catch (e : any) { // todo: descobrir esse tipo
    await client.query('ROLLBACK');
    await client.end();

    if (e['code'] == '23505') {
      return -1;
    } else {
      throw e
    }
  }
}

export const deleteUrlById = async(id: number) : Promise<boolean> => {
  const client = getClient();

  try {
    await client.connect();
    const query = 'DELETE FROM urls WHERE id = $1;';
    const params : (number|string)[] = [id];
    await client.query(query, params);
    await client.end();
    return true;
  }
  catch(e) {
    await client.end();
    return false;
  }
}