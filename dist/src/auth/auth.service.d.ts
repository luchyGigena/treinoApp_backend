import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    login(email: string, password: string): Promise<{
        user: any;
        accessToken: any;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    private generateTokens;
}
