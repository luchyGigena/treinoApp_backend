import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
