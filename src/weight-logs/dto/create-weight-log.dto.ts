import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Matches, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWeightLogDto {
  @IsInt()
  @IsPositive()
  alumnoId: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date debe tener formato YYYY-MM-DD' })
  date: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  weight: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
