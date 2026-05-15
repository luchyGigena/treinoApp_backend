import { WeightLogsService } from './weight-logs.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
export declare class WeightLogsController {
    private weightLogsService;
    constructor(weightLogsService: WeightLogsService);
    getMyWeightLogs(user: any): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        notes: string | null;
        date: string;
        weight: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    getWeightLogs(user: any, alumnoId: number): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        notes: string | null;
        date: string;
        weight: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    create(user: any, dto: CreateWeightLogDto): Promise<{
        id: number;
        createdAt: Date;
        alumnoId: number;
        notes: string | null;
        date: string;
        weight: import("@prisma/client/runtime/library").Decimal;
    }>;
    delete(user: any, id: number): Promise<{
        message: string;
    }>;
}
