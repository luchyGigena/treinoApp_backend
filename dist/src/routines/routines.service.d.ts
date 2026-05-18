import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CopyRoutineDto } from './dto/copy-routine.dto';
export declare class RoutinesService {
    private prisma;
    constructor(prisma: PrismaService);
    getRoutinesByCliente(clienteId: number): Promise<any>;
    getRoutinesByAlumno(alumnoId: number, clienteId: number): Promise<any>;
    createRoutine(clienteId: number, dto: CreateRoutineDto): Promise<any>;
    deleteRoutine(routineId: number, clienteId: number): Promise<{
        message: string;
    }>;
    copyRoutine(routineId: number, clienteId: number, dto: CopyRoutineDto): Promise<any>;
    getMyRoutines(alumnoId: number): Promise<any>;
    private ensureAlumnoBelongsToCliente;
}
