import { Controller, Get, Inject } from '@nestjs/common';
import { IUrlShorterService } from './services/url-shorter.service';

@Controller()
export class AppController {
  constructor(
    @Inject(IUrlShorterService)
    private readonly urlShorterService: IUrlShorterService,
  ) {}

  @Get()
  async getHello() {
    const service = await this.urlShorterService.shortUrl(
      'https://www.google.com',
    );
    return service;
  }
}
