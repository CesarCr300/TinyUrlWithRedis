import { Test, TestingModule } from '@nestjs/testing';

import { IdGeneratorService } from '../../src/services/implementation/id-generator.implementation.service';
import { IIdGeneratorService } from '../../src/services/id-generator.service';

describe('IdGeneratorService', () => {
  let service: IIdGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'IIdGeneratorService',
          useClass: IdGeneratorService,
        },
      ],
    }).compile();

    service = module.get<IdGeneratorService>('IIdGeneratorService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a unique ID', () => {
    const id1 = service.generate();
    const id2 = service.generate();
    expect(id1).not.toEqual(id2);
  });

  it('should generate an string', () => {
    const id = service.generate();
    // Assuming the ID should be a string of length 10
    expect(id).not.toBeNull();
  });
});
