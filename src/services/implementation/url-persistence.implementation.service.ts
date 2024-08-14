import { Injectable } from '@nestjs/common';

import { IUrlPersistenceService } from '../url-persistence.service';

@Injectable()
export class UrlRedisPersistenceImplementationService
  implements IUrlPersistenceService
{
  save(originalUrl: string, shortUrl: string): void {
    // Save the URL to redis
  }
}
