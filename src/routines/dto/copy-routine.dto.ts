import { IsArray, IsInt, IsPositive, ArrayNotEmpty } from 'class-validator';

export class CopyRoutineDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  targetAlumnoIds: number[];
}
