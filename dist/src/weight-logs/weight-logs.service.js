"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightLogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WeightLogsService = class WeightLogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWeightLogs(alumnoId, clienteId) {
        await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);
        return this.prisma.weightLog.findMany({
            where: { alumnoId },
            orderBy: { date: 'asc' },
        });
    }
    async createWeightLog(clienteId, dto) {
        await this.ensureAlumnoBelongsToCliente(dto.alumnoId, clienteId);
        return this.prisma.weightLog.create({
            data: {
                alumnoId: dto.alumnoId,
                date: dto.date,
                weight: dto.weight,
                notes: dto.notes,
            },
        });
    }
    async deleteWeightLog(id, clienteId) {
        const log = await this.prisma.weightLog.findUnique({
            where: { id },
            include: { alumno: { select: { clienteId: true } } },
        });
        if (!log)
            throw new common_1.NotFoundException('Registro de peso no encontrado');
        if (log.alumno.clienteId !== clienteId)
            throw new common_1.ForbiddenException('Acceso denegado');
        await this.prisma.weightLog.delete({ where: { id } });
        return { message: 'Registro eliminado' };
    }
    async getMyWeightLogs(alumnoId) {
        return this.prisma.weightLog.findMany({
            where: { alumnoId },
            orderBy: { date: 'asc' },
        });
    }
    async ensureAlumnoBelongsToCliente(alumnoId, clienteId) {
        const alumno = await this.prisma.user.findFirst({
            where: { id: alumnoId, clienteId, role: { name: 'ALUMNO' } },
        });
        if (!alumno)
            throw new common_1.ForbiddenException('El alumno no pertenece a este cliente');
        return alumno;
    }
};
exports.WeightLogsService = WeightLogsService;
exports.WeightLogsService = WeightLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WeightLogsService);
//# sourceMappingURL=weight-logs.service.js.map