import { ClientType } from '@prisma/client';
export declare class CreateClienteDto {
    name: string;
    email: string;
    password: string;
    clientType: ClientType;
    nombre?: string;
    apellido?: string;
    emailContacto?: string;
    nombreComercial?: string;
    responsableNombre?: string;
    responsableApellido?: string;
    cuit?: string;
    direccion?: string;
    telefono?: string;
}
