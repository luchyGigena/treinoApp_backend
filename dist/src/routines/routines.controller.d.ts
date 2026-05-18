import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CopyRoutineDto } from './dto/copy-routine.dto';
export declare class RoutinesController {
    private routinesService;
    constructor(routinesService: RoutinesService);
    getMyRoutines(user: any): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getAll(user: any): Promise<({
        alumno: {
            id: number;
            name: string;
            avatar: string;
        };
    } & {
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    getByAlumno(user: any, alumnoId: number): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    create(user: any, dto: CreateRoutineDto): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }>;
    delete(user: any, id: number): Promise<{
        message: string;
    }>;
    copy(user: any, id: number, dto: CopyRoutineDto): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
}
