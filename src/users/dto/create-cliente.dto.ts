import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ClientType } from '@prisma/client';

export class CreateClienteDto {
  // ── Datos de acceso ─────────────────────────────────────
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(ClientType)
  clientType: ClientType;

  // ── Entrenador Personal ──────────────────────────────────
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsEmail()
  @IsOptional()
  emailContacto?: string;

  // ── Gimnasio ─────────────────────────────────────────────
  @IsString()
  @IsOptional()
  nombreComercial?: string;

  @IsString()
  @IsOptional()
  responsableNombre?: string;

  @IsString()
  @IsOptional()
  responsableApellido?: string;

  // ── Compartidos ──────────────────────────────────────────
  @IsString()
  @IsOptional()
  cuit?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
