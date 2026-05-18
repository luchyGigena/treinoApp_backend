import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
export declare class WeightLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWeightLogs(alumnoId: number, clienteId: number): Promise<any>;
    createWeightLog(clienteId: number, dto: CreateWeightLogDto): Promise<any>;
    deleteWeightLog(id: number, clienteId: number): Promise<{
        message: string;
    }>;
    getMyWeightLogs(alumnoId: number): Promise<any>;
    private ensureAlumnoBelongsToCliente;
}
