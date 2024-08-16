import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';

import { IUrlPersistenceService } from '../url-persistence.service';

@Injectable()
export class UrlRedisPersistenceImplementationService
  implements IUrlPersistenceService
{
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  async save(originalUrl: string, shortUrl: string): Promise<void> {
    try {
      await this.redisClient.set(shortUrl, originalUrl);
    } catch (error) {
      console.log(error);
    }
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    try {
      return await this.redisClient.get(shortUrl);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
