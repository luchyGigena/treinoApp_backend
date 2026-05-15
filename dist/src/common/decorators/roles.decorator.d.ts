export declare enum RoleName {
    ADMIN = "ADMIN",
    CLIENTE = "CLIENTE",
    ALUMNO = "ALUMNO"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RoleName[]) => import("@nestjs/common").CustomDecorator<string>;
