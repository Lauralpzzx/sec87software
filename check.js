const { Client } = require('pg');
require('dotenv').config();
const c = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});
c.connect().then(() => {
  c.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'").then(res => {
    console.log(res.rows);
  }).finally(() => c.end());
});
