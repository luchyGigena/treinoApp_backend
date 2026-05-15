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
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    })[]>;
    getWorkoutLog(alumnoId: number, date: string, routineId: number, clienteId: number): Promise<{
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    }>;
    upsertWorkoutLog(clienteId: number, dto: UpsertWorkoutLogDto): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    }>;
    getMyWorkoutLogs(alumnoId: number): Promise<({
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    })[]>;
    getMyWorkoutLog(alumnoId: number, date: string, routineId: number): Promise<{
        routine: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    }>;
    upsertMyWorkoutLog(alumnoId: number, dto: UpsertMyWorkoutLogDto): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    }>;
    private ensureAlumnoBelongsToCliente;
}
