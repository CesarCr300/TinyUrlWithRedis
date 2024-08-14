import { ShortUrlResponseDto } from '../dtos/short-url.response.dto';

export interface IUrlShorterService {
  shortUrl(url: string): ShortUrlResponseDto;
}

export const IUrlShorterService = Symbol('IUrlShorterService');
