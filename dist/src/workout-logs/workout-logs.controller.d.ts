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
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    })[]>;
    getMyWorkoutLog(user: any, date: string, routineId: number): Promise<{
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
    upsertMyWorkoutLog(user: any, dto: UpsertMyWorkoutLogDto): Promise<{
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
    getAll(user: any, alumnoId: number): Promise<({
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
    getOne(user: any, alumnoId: number, date: string, routineId: number): Promise<{
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
    upsert(user: any, dto: UpsertWorkoutLogDto): Promise<{
        id: number;
        alumnoId: number;
        routineId: number;
        date: string;
        exercises: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
}
