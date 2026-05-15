import { IsArray, IsInt, IsPositive, Matches } from 'class-validator';

export class UpsertWorkoutLogDto {
  @IsInt()
  @IsPositive()
  alumnoId: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date debe tener formato YYYY-MM-DD' })
  date: string;

  @IsInt()
  @IsPositive()
  routineId: number;

  @IsArray()
  exercises: any[];
}
