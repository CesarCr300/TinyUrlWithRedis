import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';

import { IUrlShorterService } from './services/url-shorter.service';
import { SaveUrlRequestDto } from './dtos/save-url.request.dto';

@Controller()
export class AppController {
  constructor(
    @Inject(IUrlShorterService)
    private readonly urlShorterService: IUrlShorterService,
  ) {}

  @Post('/short')
  async shortUrl(@Body() body: SaveUrlRequestDto) {
    const response = await this.urlShorterService.shortUrl(body.url);
    return response;
  }

  @Get('/not-found')
  notFound() {
    return 'Not-found';
  }

  @Get('/:id')
  @Redirect()
  async getOriginalUrl(@Param('id') id: string) {
    const service = await this.urlShorterService.getOriginalUrl(id);
    if (service == null) return { url: 'not-found' };
    return { url: service };
  }
}
