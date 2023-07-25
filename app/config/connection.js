// config/connection.js
const { createClient } = require('@libsql/client');
require('dotenv').config();

const client_local = createClient({
  url: process.env.LOCAL_DB_URL,
});

module.exports = {
  client_local,
};