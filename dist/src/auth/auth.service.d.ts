import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    login(email: string, password: string): Promise<{
        user: {
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
            id: number;
            createdAt: Date;
            name: string;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            email: string;
            roleId: number;
            avatar: string | null;
            active: boolean;
            clienteId: number | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    private generateTokens;
}
