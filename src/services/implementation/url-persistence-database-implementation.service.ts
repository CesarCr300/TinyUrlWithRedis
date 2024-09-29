import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UrlEntity } from '../../entities/url.entity';
import { IUrlPersistenceService } from '../url-persistence.service';

@Injectable()
export class UrlPersistenceDatabaseImplementationService
  implements IUrlPersistenceService
{
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  async save(originalUrl: string, shortUrl: string): Promise<void> {
    try {
      await this.urlRepository.save(new UrlEntity(originalUrl, shortUrl));
    } catch (error) {
      console.log(error);
    }
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    try {
      const urlEntity = await this.urlRepository.findOne({
        where: { shortUrl },
      });
      return urlEntity ? urlEntity.originalUrl : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async wasShorted(url: string): Promise<string | null> {
    const urlEntity = await this.urlRepository.findOne({
      where: { originalUrl: url },
    });
    if (!urlEntity) return null;
    return urlEntity.shortUrl;
  }
}
