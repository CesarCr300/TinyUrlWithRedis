import { Inject, Injectable } from '@nestjs/common';

import { ShortUrlResponseDto } from '../../dtos/short-url.response.dto';
import { IIdGeneratorService } from '../id-generator.service';
import { IUrlShorterService } from '../url-shorter.service';
import { IUrlPersistenceService } from '../url-persistence.service';

@Injectable()
export class UrlShorterService implements IUrlShorterService {
  constructor(
    @Inject(IUrlPersistenceService)
    private readonly urlPersistenceService: IUrlPersistenceService,
    @Inject(IIdGeneratorService)
    private readonly idGeneratorService: IIdGeneratorService,
  ) {}

  async shortUrl(url: string): Promise<ShortUrlResponseDto> {
    const urlShortedExists = await this.urlPersistenceService.wasShorted(url);
    console.log(urlShortedExists, 'urlShortedExists');
    if (urlShortedExists) {
      return {
        originalUrl: url,
        shortUrl: urlShortedExists,
      };
    }

    const shortUrl = this.idGeneratorService.generate();
    await this.urlPersistenceService.save(url, shortUrl);
    return {
      originalUrl: url,
      shortUrl,
    };
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    return this.urlPersistenceService.getOriginalUrl(shortUrl);
  }
}
