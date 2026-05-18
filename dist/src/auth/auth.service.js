"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true, perfilCliente: true },
        });
        if (!user || !user.password)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        if (user.role.name === 'CLIENTE' && !user.active) {
            throw new common_1.ForbiddenException('La cuenta está inactiva');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const tokens = await this.generateTokens(user.id, user.email, user.role.name);
        const { password: _pw, ...userWithoutPassword } = user;
        return { ...tokens, user: userWithoutPassword };
    }
    async refresh(refreshToken) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: { include: { role: true } } },
        });
        if (!stored || stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token inválido o expirado');
        }
        const accessToken = this.jwt.sign({
            sub: stored.user.id,
            email: stored.user.email,
            role: stored.user.role.name,
        });
        return { accessToken };
    }
    async logout(refreshToken) {
        await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
        return { message: 'Sesión cerrada correctamente' };
    }
    async generateTokens(userId, email, roleName) {
        const payload = { sub: userId, email, role: roleName };
        const accessToken = this.jwt.sign(payload);
        const rawRefreshToken = crypto.randomBytes(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: { token: rawRefreshToken, userId, expiresAt },
        });
        return { accessToken, refreshToken: rawRefreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map