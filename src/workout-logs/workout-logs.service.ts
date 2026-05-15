import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertWorkoutLogDto } from './dto/upsert-workout-log.dto';
import { UpsertMyWorkoutLogDto } from './dto/upsert-my-workout-log.dto';

@Injectable()
export class WorkoutLogsService {
  constructor(private prisma: PrismaService) {}

  // ─── CLIENTE ───────────────────────────────────────────────────────

  async getWorkoutLogs(alumnoId: number, clienteId: number) {
    await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);

    return this.prisma.workoutLog.findMany({
      where: { alumnoId },
      include: { routine: { select: { id: true, name: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async getWorkoutLog(alumnoId: number, date: string, routineId: number, clienteId: number) {
    await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);

    const log = await this.prisma.workoutLog.findUnique({
      where: { alumnoId_date_routineId: { alumnoId, date, routineId } },
      include: { routine: { select: { id: true, name: true } } },
    });

    if (!log) throw new NotFoundException('Log de entreno no encontrado');
    return log;
  }

  async upsertWorkoutLog(clienteId: number, dto: UpsertWorkoutLogDto) {
    await this.ensureAlumnoBelongsToCliente(dto.alumnoId, clienteId);

    const routine = await this.prisma.routine.findFirst({
      where: { id: dto.routineId, alumnoId: dto.alumnoId },
    });
    if (!routine) throw new NotFoundException('Rutina no encontrada para este alumno');

    return this.prisma.workoutLog.upsert({
      where: { alumnoId_date_routineId: { alumnoId: dto.alumnoId, date: dto.date, routineId: dto.routineId } },
      update: { exercises: dto.exercises },
      create: { alumnoId: dto.alumnoId, date: dto.date, routineId: dto.routineId, exercises: dto.exercises },
    });
  }

  // ─── ALUMNO ────────────────────────────────────────────────────────

  async getMyWorkoutLogs(alumnoId: number) {
    return this.prisma.workoutLog.findMany({
      where: { alumnoId },
      include: { routine: { select: { id: true, name: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async getMyWorkoutLog(alumnoId: number, date: string, routineId: number) {
    const log = await this.prisma.workoutLog.findUnique({
      where: { alumnoId_date_routineId: { alumnoId, date, routineId } },
      include: { routine: { select: { id: true, name: true } } },
    });

    if (!log) throw new NotFoundException('Log de entreno no encontrado');
    return log;
  }

  async upsertMyWorkoutLog(alumnoId: number, dto: UpsertMyWorkoutLogDto) {
    const routine = await this.prisma.routine.findFirst({
      where: { id: dto.routineId, alumnoId },
    });
    if (!routine) throw new NotFoundException('Rutina no encontrada');

    return this.prisma.workoutLog.upsert({
      where: { alumnoId_date_routineId: { alumnoId, date: dto.date, routineId: dto.routineId } },
      update: { exercises: dto.exercises },
      create: { alumnoId, date: dto.date, routineId: dto.routineId, exercises: dto.exercises },
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
