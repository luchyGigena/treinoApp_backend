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
exports.WorkoutLogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkoutLogsService = class WorkoutLogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWorkoutLogs(alumnoId, clienteId) {
        await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);
        return this.prisma.workoutLog.findMany({
            where: { alumnoId },
            include: { routine: { select: { id: true, name: true } } },
            orderBy: { date: 'desc' },
        });
    }
    async getWorkoutLog(alumnoId, date, routineId, clienteId) {
        await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);
        const log = await this.prisma.workoutLog.findUnique({
            where: { alumnoId_date_routineId: { alumnoId, date, routineId } },
            include: { routine: { select: { id: true, name: true } } },
        });
        if (!log)
            throw new common_1.NotFoundException('Log de entreno no encontrado');
        return log;
    }
    async upsertWorkoutLog(clienteId, dto) {
        await this.ensureAlumnoBelongsToCliente(dto.alumnoId, clienteId);
        const routine = await this.prisma.routine.findFirst({
            where: { id: dto.routineId, alumnoId: dto.alumnoId },
        });
        if (!routine)
            throw new common_1.NotFoundException('Rutina no encontrada para este alumno');
        return this.prisma.workoutLog.upsert({
            where: { alumnoId_date_routineId: { alumnoId: dto.alumnoId, date: dto.date, routineId: dto.routineId } },
            update: { exercises: dto.exercises },
            create: { alumnoId: dto.alumnoId, date: dto.date, routineId: dto.routineId, exercises: dto.exercises },
        });
    }
    async getMyWorkoutLogs(alumnoId) {
        return this.prisma.workoutLog.findMany({
            where: { alumnoId },
            include: { routine: { select: { id: true, name: true } } },
            orderBy: { date: 'desc' },
        });
    }
    async getMyWorkoutLog(alumnoId, date, routineId) {
        const log = await this.prisma.workoutLog.findUnique({
            where: { alumnoId_date_routineId: { alumnoId, date, routineId } },
            include: { routine: { select: { id: true, name: true } } },
        });
        if (!log)
            throw new common_1.NotFoundException('Log de entreno no encontrado');
        return log;
    }
    async upsertMyWorkoutLog(alumnoId, dto) {
        const routine = await this.prisma.routine.findFirst({
            where: { id: dto.routineId, alumnoId },
        });
        if (!routine)
            throw new common_1.NotFoundException('Rutina no encontrada');
        return this.prisma.workoutLog.upsert({
            where: { alumnoId_date_routineId: { alumnoId, date: dto.date, routineId: dto.routineId } },
            update: { exercises: dto.exercises },
            create: { alumnoId, date: dto.date, routineId: dto.routineId, exercises: dto.exercises },
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
exports.WorkoutLogsService = WorkoutLogsService;
exports.WorkoutLogsService = WorkoutLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutLogsService);
//# sourceMappingURL=workout-logs.service.js.map