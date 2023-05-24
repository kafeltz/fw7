/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  env: {
    PGUSER: "postgres",
    PGHOST: "localhost",
    PGPASSWORD: "postgres",
    PGDATABASE: "postgres",
    PGPORT: 5432,
  },
};

module.exports = nextConfig;
