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
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
    }>;
    logout(dto: LogoutDto): Promise<{
        message: string;
    }>;
    me(user: any): any;
}
