import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdGeneratorService } from './services/implementation/id-generator.implementation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'IIdGeneratorService',
      useClass: IdGeneratorService,
    },
  ],
})
export class AppModule {}
