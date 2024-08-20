import { IsNotEmpty, IsString } from 'class-validator';

export class SaveUrlRequestDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
