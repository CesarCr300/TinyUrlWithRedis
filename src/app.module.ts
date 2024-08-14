import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { IIdGeneratorService } from './services/id-generator.service';
import { IdGeneratorService } from './services/implementation/id-generator.implementation.service';
import { IUrlPersistenceService } from './services/url-persistence.service';
import { UrlRedisPersistenceImplementationService } from './services/implementation/url-persistence.implementation.service';
import { IUrlShorterService } from './services/url-shorter.service';
import { UrlShorterService } from './services/implementation/url-shorter.implementation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: IIdGeneratorService,
      useClass: IdGeneratorService,
    },
    {
      provide: IUrlPersistenceService,
      useClass: UrlRedisPersistenceImplementationService,
    },
    {
      provide: IUrlShorterService,
      useClass: UrlShorterService,
    },
  ],
})
export class AppModule {}
