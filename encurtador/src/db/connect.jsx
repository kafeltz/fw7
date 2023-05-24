/** @type {import('@types/pg').Client} */

import { Client } from "pg"

export const connectDb = async () => {
  try {
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    })

    await client.connect()
    const res = await client.query('SELECT * FROM urls')
    console.log(res.rows)
    await client.end()
  } catch (error) {
    console.log(error)
  }
}