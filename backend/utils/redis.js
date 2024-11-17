import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  } else {
    return new Error("Redis not defined");
  }
};
export const redis = new Redis(getRedisUrl());
