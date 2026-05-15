import { WorkoutLogsService } from './workout-logs.service';
import { UpsertWorkoutLogDto } from './dto/upsert-workout-log.dto';
import { UpsertMyWorkoutLogDto } from './dto/upsert-my-workout-log.dto';
export declare class WorkoutLogsController {
    private workoutLogsService;
    constructor(workoutLogsService: WorkoutLogsService);
    getMyWorkoutLogs(user: any): Promise<({
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
    getMyWorkoutLog(user: any, date: string, routineId: number): Promise<{
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
    upsertMyWorkoutLog(user: any, dto: UpsertMyWorkoutLogDto): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    }>;
    getAll(user: any, alumnoId: number): Promise<({
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
    getOne(user: any, alumnoId: number, date: string, routineId: number): Promise<{
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
    upsert(user: any, dto: UpsertWorkoutLogDto): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        date: string;
        routineId: number;
    }>;
}
