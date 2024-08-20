import { ShortUrlResponseDto } from '../dtos/short-url.response.dto';

export interface IUrlShorterService {
  shortUrl(url: string): Promise<ShortUrlResponseDto>;
  getOriginalUrl(shortUrl: string): Promise<string | null>;
}

export const IUrlShorterService = Symbol('IUrlShorterService');
