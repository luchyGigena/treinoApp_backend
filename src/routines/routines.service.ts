import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CopyRoutineDto } from './dto/copy-routine.dto';

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) {}

  // ─── CLIENTE ───────────────────────────────────────────────────────

  async getRoutinesByCliente(clienteId: number) {
    const alumnos = await this.prisma.user.findMany({
      where: { clienteId, role: { name: 'ALUMNO' } },
      select: { id: true },
    });
    const alumnoIds = alumnos.map((a) => a.id);

    return this.prisma.routine.findMany({
      where: { alumnoId: { in: alumnoIds } },
      include: {
        alumno: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRoutinesByAlumno(alumnoId: number, clienteId: number) {
    await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);

    return this.prisma.routine.findMany({
      where: { alumnoId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createRoutine(clienteId: number, dto: CreateRoutineDto) {
    await this.ensureAlumnoBelongsToCliente(dto.alumnoId, clienteId);

    return this.prisma.routine.create({
      data: { name: dto.name, alumnoId: dto.alumnoId, days: dto.days },
    });
  }

  async deleteRoutine(routineId: number, clienteId: number) {
    const routine = await this.prisma.routine.findUnique({
      where: { id: routineId },
      include: { alumno: { select: { clienteId: true } } },
    });

    if (!routine) throw new NotFoundException('Rutina no encontrada');
    if (routine.alumno.clienteId !== clienteId) throw new ForbiddenException('Acceso denegado');

    await this.prisma.routine.delete({ where: { id: routineId } });
    return { message: 'Rutina eliminada' };
  }

  async copyRoutine(routineId: number, clienteId: number, dto: CopyRoutineDto) {
    const routine = await this.prisma.routine.findUnique({
      where: { id: routineId },
      include: { alumno: { select: { clienteId: true } } },
    });

    if (!routine) throw new NotFoundException('Rutina no encontrada');
    if (routine.alumno.clienteId !== clienteId) throw new ForbiddenException('Acceso denegado');

    for (const targetId of dto.targetAlumnoIds) {
      await this.ensureAlumnoBelongsToCliente(targetId, clienteId);
    }

    return Promise.all(
      dto.targetAlumnoIds.map((alumnoId) =>
        this.prisma.routine.create({
          data: { name: routine.name, alumnoId, days: routine.days },
        }),
      ),
    );
  }

  // ─── ALUMNO ────────────────────────────────────────────────────────

  async getMyRoutines(alumnoId: number) {
    return this.prisma.routine.findMany({
      where: { alumnoId },
      orderBy: { createdAt: 'desc' },
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
