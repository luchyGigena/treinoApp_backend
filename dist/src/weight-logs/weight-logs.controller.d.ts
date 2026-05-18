import { WeightLogsService } from './weight-logs.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
export declare class WeightLogsController {
    private weightLogsService;
    constructor(weightLogsService: WeightLogsService);
    getMyWeightLogs(user: any): Promise<any>;
    getWeightLogs(user: any, alumnoId: number): Promise<any>;
    create(user: any, dto: CreateWeightLogDto): Promise<any>;
    delete(user: any, id: number): Promise<{
        message: string;
    }>;
}
