export interface IUrlPersistenceService {
  save(originalUrl: string, shortUrl: string): Promise<void>;
}

export const IUrlPersistenceService = Symbol('IUrlPersistenceService');
