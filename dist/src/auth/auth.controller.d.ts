import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
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
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
    }>;
    logout(dto: LogoutDto): Promise<{
        message: string;
    }>;
    me(user: any): any;
}
