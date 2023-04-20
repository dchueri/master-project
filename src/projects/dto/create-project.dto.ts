import { IsISO8601, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsInt()
  @IsNotEmpty()
  zip_code: number;
  @IsISO8601()
  @IsNotEmpty()
  deadline: string;
  @IsInt()
  @IsNotEmpty()
  cost: number;
}
