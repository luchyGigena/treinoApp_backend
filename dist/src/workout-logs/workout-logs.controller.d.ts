import { WorkoutLogsService } from './workout-logs.service';
import { UpsertWorkoutLogDto } from './dto/upsert-workout-log.dto';
import { UpsertMyWorkoutLogDto } from './dto/upsert-my-workout-log.dto';
export declare class WorkoutLogsController {
    private workoutLogsService;
    constructor(workoutLogsService: WorkoutLogsService);
    getMyWorkoutLogs(user: any): Promise<any>;
    getMyWorkoutLog(user: any, date: string, routineId: number): Promise<any>;
    upsertMyWorkoutLog(user: any, dto: UpsertMyWorkoutLogDto): Promise<any>;
    getAll(user: any, alumnoId: number): Promise<any>;
    getOne(user: any, alumnoId: number, date: string, routineId: number): Promise<any>;
    upsert(user: any, dto: UpsertWorkoutLogDto): Promise<any>;
}
