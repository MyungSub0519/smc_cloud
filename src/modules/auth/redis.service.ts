// redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_URL,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttl);
  }

  async update(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value, 'KEEPTTL');
  }

  async keys(): Promise<string[]> {
    return this.redisClient.keys('*');
  }

  async allDataDelete() {
    await this.redisClient.flushall();
  }

  async checkTTL(key: string) {
    return this.redisClient.ttl(key);
  }
}
