import { Controller, Get, Inject } from '@nestjs/common';
import { IUrlShorterService } from './services/url-shorter.service';
import { UrlShorterService } from './services/implementation/url-shorter.implementation.service';

@Controller()
export class AppController {
  constructor(
    @Inject(IUrlShorterService)
    private readonly urlShorterService: UrlShorterService,
  ) {}

  @Get()
  getHello(): string {
    const x = this.urlShorterService.shortUrl('https://www.google.com');
    console.log(x);
    return '';
  }
}
