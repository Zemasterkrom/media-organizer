import { IsOptional, IsString } from 'class-validator';

export class SearchParams {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  type: string;
}
