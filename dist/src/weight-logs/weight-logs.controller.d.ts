import { WeightLogsService } from './weight-logs.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
export declare class WeightLogsController {
    private weightLogsService;
    constructor(weightLogsService: WeightLogsService);
    getMyWeightLogs(user: any): Promise<{
        id: number;
        alumnoId: number;
        date: string;
        createdAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
    }[]>;
    getWeightLogs(user: any, alumnoId: number): Promise<{
        id: number;
        alumnoId: number;
        date: string;
        createdAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
    }[]>;
    create(user: any, dto: CreateWeightLogDto): Promise<{
        id: number;
        alumnoId: number;
        date: string;
        createdAt: Date;
        weight: import("@prisma/client/runtime/library").Decimal;
        notes: string | null;
    }>;
    delete(user: any, id: number): Promise<{
        message: string;
    }>;
}
