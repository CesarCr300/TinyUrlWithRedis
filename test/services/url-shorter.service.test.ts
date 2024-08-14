import { Test, TestingModule } from '@nestjs/testing';
import { IUrlShorterService } from '../../src/services/url-shorter.service';
import { UrlShorterService } from '../../src/services/implementation/url-shorter.implementation.service';
import { IIdGeneratorService } from '../../src/services/id-generator.service';
import { IUrlPersistenceService } from '../../src/services/url-persistence.service';

describe('UrlShorterService', () => {
  let service: IUrlShorterService;
  let urlPersistenceService: IUrlPersistenceService;

  beforeEach(async () => {
    urlPersistenceService = {
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IIdGeneratorService,
          useValue: {
            generate: () => '1234567890',
          },
        },
        {
          provide: IUrlPersistenceService,
          useValue: urlPersistenceService,
        },
        {
          provide: IUrlShorterService,
          useClass: UrlShorterService,
        },
      ],
    }).compile();

    service = module.get<UrlShorterService>(IUrlShorterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the original URL and the generated short URL', () => {
    const url = 'https://www.google.com';
    const response = service.shortUrl(url);

    expect(response.originalUrl).toEqual(url);
    expect(response.shortUrl).toEqual('1234567890');

    expect(urlPersistenceService.save).toHaveBeenCalledWith(url, '1234567890');
  });
});
