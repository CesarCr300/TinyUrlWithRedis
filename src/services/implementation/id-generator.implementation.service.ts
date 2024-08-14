import { Injectable } from '@nestjs/common';

import { IIdGeneratorService } from '../id-generator.service';
import { randomUUID } from 'crypto';

@Injectable()
export class IdGeneratorService implements IIdGeneratorService {
  generate(): string {
    return randomUUID();
  }
}
