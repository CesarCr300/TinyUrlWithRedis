export interface IUrlPersistenceService {
  save(originalUrl: string, shortUrl: string): Promise<void>;
  getOriginalUrl(shortUrl: string): Promise<string | null>;
}

export const IUrlPersistenceService = Symbol('IUrlPersistenceService');
