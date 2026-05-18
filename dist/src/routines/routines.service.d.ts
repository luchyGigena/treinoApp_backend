import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CopyRoutineDto } from './dto/copy-routine.dto';
export declare class RoutinesService {
    private prisma;
    constructor(prisma: PrismaService);
    getRoutinesByCliente(clienteId: number): Promise<({
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
    getRoutinesByAlumno(alumnoId: number, clienteId: number): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    createRoutine(clienteId: number, dto: CreateRoutineDto): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }>;
    deleteRoutine(routineId: number, clienteId: number): Promise<{
        message: string;
    }>;
    copyRoutine(routineId: number, clienteId: number, dto: CopyRoutineDto): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getMyRoutines(alumnoId: number): Promise<{
        id: number;
        alumnoId: number;
        createdAt: Date;
        name: string;
        days: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    private ensureAlumnoBelongsToCliente;
}
