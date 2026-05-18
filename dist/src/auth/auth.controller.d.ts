import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        user: any;
        accessToken: any;
        refreshToken: string;
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: any;
    }>;
    logout(dto: LogoutDto): Promise<{
        message: string;
    }>;
    me(user: any): any;
}
