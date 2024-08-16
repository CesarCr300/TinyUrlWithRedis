import { ShortUrlResponseDto } from '../dtos/short-url.response.dto';

export interface IUrlShorterService {
  shortUrl(url: string): Promise<ShortUrlResponseDto>;
}

export const IUrlShorterService = Symbol('IUrlShorterService');
