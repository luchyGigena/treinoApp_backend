import { PrismaService } from '../prisma/prisma.service';
import { UpsertWorkoutLogDto } from './dto/upsert-workout-log.dto';
import { UpsertMyWorkoutLogDto } from './dto/upsert-my-workout-log.dto';
export declare class WorkoutLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWorkoutLogs(alumnoId: number, clienteId: number): Promise<({
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    })[]>;
    getWorkoutLog(alumnoId: number, date: string, routineId: number, clienteId: number): Promise<{
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
    upsertWorkoutLog(clienteId: number, dto: UpsertWorkoutLogDto): Promise<{
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
    getMyWorkoutLogs(alumnoId: number): Promise<({
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    })[]>;
    getMyWorkoutLog(alumnoId: number, date: string, routineId: number): Promise<{
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
    upsertMyWorkoutLog(alumnoId: number, dto: UpsertMyWorkoutLogDto): Promise<{
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
    private ensureAlumnoBelongsToCliente;
}
