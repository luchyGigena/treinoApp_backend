import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@Injectable()
export class WeightLogsService {
  constructor(private prisma: PrismaService) {}

  // ─── CLIENTE ───────────────────────────────────────────────────────

  async getWeightLogs(alumnoId: number, clienteId: number) {
    await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);

    return this.prisma.weightLog.findMany({
      where: { alumnoId },
      orderBy: { date: 'asc' },
    });
  }

  async createWeightLog(clienteId: number, dto: CreateWeightLogDto) {
    await this.ensureAlumnoBelongsToCliente(dto.alumnoId, clienteId);

    return this.prisma.weightLog.create({
      data: {
        alumnoId: dto.alumnoId,
        date: dto.date,
        weight: dto.weight,
        notes: dto.notes,
      },
    });
  }

  async deleteWeightLog(id: number, clienteId: number) {
    const log = await this.prisma.weightLog.findUnique({
      where: { id },
      include: { alumno: { select: { clienteId: true } } },
    });

    if (!log) throw new NotFoundException('Registro de peso no encontrado');
    if (log.alumno.clienteId !== clienteId) throw new ForbiddenException('Acceso denegado');

    await this.prisma.weightLog.delete({ where: { id } });
    return { message: 'Registro eliminado' };
  }

  // ─── ALUMNO ────────────────────────────────────────────────────────

  async getMyWeightLogs(alumnoId: number) {
    return this.prisma.weightLog.findMany({
      where: { alumnoId },
      orderBy: { date: 'asc' },
    });
  }

  // ──────────────────────────────────────────────────────────────────

  private async ensureAlumnoBelongsToCliente(alumnoId: number, clienteId: number) {
    const alumno = await this.prisma.user.findFirst({
      where: { id: alumnoId, clienteId, role: { name: 'ALUMNO' } },
    });
    if (!alumno) throw new ForbiddenException('El alumno no pertenece a este cliente');
    return alumno;
  }
}
