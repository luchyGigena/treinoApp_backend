import { PrismaService } from '../prisma/prisma.service';
import { UpsertWorkoutLogDto } from './dto/upsert-workout-log.dto';
import { UpsertMyWorkoutLogDto } from './dto/upsert-my-workout-log.dto';
export declare class WorkoutLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWorkoutLogs(alumnoId: number, clienteId: number): Promise<any>;
    getWorkoutLog(alumnoId: number, date: string, routineId: number, clienteId: number): Promise<any>;
    upsertWorkoutLog(clienteId: number, dto: UpsertWorkoutLogDto): Promise<any>;
    getMyWorkoutLogs(alumnoId: number): Promise<any>;
    getMyWorkoutLog(alumnoId: number, date: string, routineId: number): Promise<any>;
    upsertMyWorkoutLog(alumnoId: number, dto: UpsertMyWorkoutLogDto): Promise<any>;
    private ensureAlumnoBelongsToCliente;
}
