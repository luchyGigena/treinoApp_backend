import { IsArray, IsInt, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRoutineDto {
  @IsInt()
  @IsPositive()
  alumnoId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  days: any[];
}
