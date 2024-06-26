import Radis from "ioredis";

const client = new Radis({
  port: process.env.NEXT_PUBLIC_REDIS_PORT,
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
});

export default client;
