import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true, perfilCliente: true },
    });

    if (!user || !user.password) throw new UnauthorizedException('Credenciales inválidas');

    if (user.role.name === 'CLIENTE' && !user.active) {
      throw new ForbiddenException('La cuenta está inactiva');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Credenciales inválidas');

    const tokens = await this.generateTokens(user.id, user.email!, user.role.name);

    const { password: _pw, ...userWithoutPassword } = user;
    return { ...tokens, user: userWithoutPassword };
  }

  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: { include: { role: true } } },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    const accessToken = this.jwt.sign({
      sub: stored.user.id,
      email: stored.user.email,
      role: stored.user.role.name,
    });

    return { accessToken };
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    return { message: 'Sesión cerrada correctamente' };
  }

  private async generateTokens(userId: number, email: string, roleName: string) {
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
}
