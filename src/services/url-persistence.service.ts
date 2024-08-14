export interface IUrlPersistenceService {
  save(originalUrl: string, shortUrl: string): void;
}

export const IUrlPersistenceService = Symbol('IUrlPersistenceService');
