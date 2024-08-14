import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { IIdGeneratorService } from './services/id-generator.service';
import { IdGeneratorService } from './services/implementation/id-generator.implementation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: IIdGeneratorService,
      useClass: IdGeneratorService,
    },
  ],
})
export class AppModule {}
