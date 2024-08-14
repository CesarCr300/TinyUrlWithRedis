import { Inject } from '@nestjs/common';

import { IIdGeneratorService } from '../id-generator.service';
import { IUrlShorterService } from '../url-shorter.service';
import { IUrlPersistenceService } from '../url-persistence.service';
import { ShortUrlResponseDto } from '../../dtos/short-url.response.dto';

export class UrlShorterService implements IUrlShorterService {
  constructor(
    @Inject(IUrlPersistenceService)
    private readonly urlPersistenceService: IUrlPersistenceService,
    @Inject(IIdGeneratorService)
    private readonly idGeneratorService: IIdGeneratorService,
  ) {}

  shortUrl(url: string): ShortUrlResponseDto {
    const shortUrl = this.idGeneratorService.generate();
    this.urlPersistenceService.save(url, shortUrl);
    return {
      originalUrl: url,
      shortUrl,
    };
  }
}
