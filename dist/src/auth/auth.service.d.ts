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
            id: number;
            name: string;
            email: string;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            roleId: number;
            avatar: string | null;
            active: boolean;
            createdAt: Date;
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
