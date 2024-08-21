import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UrlEntity } from '../../entities/url.entity';
import { IUrlPersistenceService } from '../url-persistence.service';

@Injectable()
export class UrlRedisPersistenceImplementationService
  implements IUrlPersistenceService
{
  private redisClient: Redis;

  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {
    this.redisClient = new Redis();
  }

  async save(originalUrl: string, shortUrl: string): Promise<void> {
    try {
      await this.urlRepository.save(new UrlEntity(originalUrl, shortUrl));
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

  async wasShorted(url: string): Promise<string | null> {
    try {
      const keys = await this.redisClient.keys('*');
      for (const key of keys) {
        const storedValue = await this.redisClient.get(key);
        if (storedValue === url) {
          return key;
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
    return null;
  }
}
