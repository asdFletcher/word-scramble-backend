'use strict';

const asyncRedis = require("async-redis");
const client = asyncRedis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
  console.log(`Redis client connected`);
});

client.on('error', (err) => {
  console.log(`Redis error: `, err);
});

module.exports = client;
