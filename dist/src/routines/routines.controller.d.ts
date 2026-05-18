import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CopyRoutineDto } from './dto/copy-routine.dto';
export declare class RoutinesController {
    private routinesService;
    constructor(routinesService: RoutinesService);
    getMyRoutines(user: any): Promise<any>;
    getAll(user: any): Promise<any>;
    getByAlumno(user: any, alumnoId: number): Promise<any>;
    create(user: any, dto: CreateRoutineDto): Promise<any>;
    delete(user: any, id: number): Promise<{
        message: string;
    }>;
    copy(user: any, id: number, dto: CopyRoutineDto): Promise<any>;
}
