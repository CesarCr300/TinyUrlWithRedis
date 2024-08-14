export interface IIdGeneratorService {
  generate(): string;
}

export const IIdGeneratorService = Symbol('IIdGeneratorService');
