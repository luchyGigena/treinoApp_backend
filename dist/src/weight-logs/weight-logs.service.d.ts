import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
export declare class WeightLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWeightLogs(alumnoId: number, clienteId: number): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        notes: string | null;
        date: string;
        weight: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    createWeightLog(clienteId: number, dto: CreateWeightLogDto): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        notes: string | null;
        date: string;
        weight: import("@prisma/client/runtime/library").Decimal;
    }>;
    deleteWeightLog(id: number, clienteId: number): Promise<{
        message: string;
    }>;
    getMyWeightLogs(alumnoId: number): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        notes: string | null;
        date: string;
        weight: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    private ensureAlumnoBelongsToCliente;
}
