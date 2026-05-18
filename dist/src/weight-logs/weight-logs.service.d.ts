import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
export declare class WeightLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWeightLogs(alumnoId: number, clienteId: number): Promise<{
        id: number;
        alumnoId: number;
        date: string;
        createdAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
    }[]>;
    createWeightLog(clienteId: number, dto: CreateWeightLogDto): Promise<{
        id: number;
        alumnoId: number;
        date: string;
        createdAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
    }>;
    deleteWeightLog(id: number, clienteId: number): Promise<{
        message: string;
    }>;
    getMyWeightLogs(alumnoId: number): Promise<{
        id: number;
        alumnoId: number;
        date: string;
        createdAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
    }[]>;
    private ensureAlumnoBelongsToCliente;
}
