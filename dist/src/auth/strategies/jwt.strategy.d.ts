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
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            createdAt: Date;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
            userId: number;
        };
    } & {
        id: number;
        name: string;
        email: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        password: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        createdAt: Date;
        clienteId: number | null;
    }>;
}
export {};
