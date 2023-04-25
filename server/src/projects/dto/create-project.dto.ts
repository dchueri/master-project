import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  zip_code: number;
  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty()
  deadline: string;
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  cost: number;
}
