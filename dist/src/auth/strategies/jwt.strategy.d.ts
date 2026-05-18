import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
        role: string;
    }): Promise<{
        role: {
            id: number;
            name: string;
        };
        perfilCliente: {
            id: number;
            createdAt: Date;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            userId: number;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        name: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        email: string;
        password: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        clienteId: number | null;
    }>;
}
export {};
