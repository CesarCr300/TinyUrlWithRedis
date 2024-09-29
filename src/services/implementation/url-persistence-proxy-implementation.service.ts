import { Inject, Injectable } from '@nestjs/common';
import { IUrlPersistenceService } from '../url-persistence.service';

import { UrlRedisPersistenceImplementationService } from './url-persistence-redis.implementation.service';
import { UrlPersistenceDatabaseImplementationService } from './url-persistence-database-implementation.service';

@Injectable()
export class UrlPersistenceProxyImplementationService
  implements IUrlPersistenceService
{
  constructor(
    @Inject(UrlRedisPersistenceImplementationService)
    private readonly redisService: IUrlPersistenceService,
    @Inject(UrlPersistenceDatabaseImplementationService)
    private readonly databaseService: IUrlPersistenceService,
  ) {}

  async save(originalUrl: string, shortUrl: string): Promise<void> {
    await this.databaseService.save(originalUrl, shortUrl);
    try {
      this.redisService.save(originalUrl, shortUrl);
    } catch (error) {
      console.log('Error saving to redis', error);
    }
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    let originalUrl = await this.redisService.getOriginalUrl(shortUrl);
    if (!originalUrl) {
      originalUrl = await this.databaseService.getOriginalUrl(shortUrl);
      this.redisService.save(originalUrl, shortUrl);
    }
    return originalUrl;
  }

  async wasShorted(url: string): Promise<string | null> {
    return await this.databaseService.wasShorted(url);
  }
}
