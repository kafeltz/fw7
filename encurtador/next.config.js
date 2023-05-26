/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  env: {
    PGUSER: "postgres",
    PGHOST: "localhost",
    PGPASSWORD: "postgres",
    PGDATABASE: "postgres",
    PGPORT: 5432,
    BASE_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
