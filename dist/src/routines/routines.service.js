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
exports.RoutinesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoutinesService = class RoutinesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRoutinesByCliente(clienteId) {
        const alumnos = await this.prisma.user.findMany({
            where: { clienteId, role: { name: 'ALUMNO' } },
            select: { id: true },
        });
        const alumnoIds = alumnos.map((a) => a.id);
        return this.prisma.routine.findMany({
            where: { alumnoId: { in: alumnoIds } },
            include: {
                alumno: { select: { id: true, name: true, avatar: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getRoutinesByAlumno(alumnoId, clienteId) {
        await this.ensureAlumnoBelongsToCliente(alumnoId, clienteId);
        return this.prisma.routine.findMany({
            where: { alumnoId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createRoutine(clienteId, dto) {
        await this.ensureAlumnoBelongsToCliente(dto.alumnoId, clienteId);
        return this.prisma.routine.create({
            data: { name: dto.name, alumnoId: dto.alumnoId, days: dto.days },
        });
    }
    async deleteRoutine(routineId, clienteId) {
        const routine = await this.prisma.routine.findUnique({
            where: { id: routineId },
            include: { alumno: { select: { clienteId: true } } },
        });
        if (!routine)
            throw new common_1.NotFoundException('Rutina no encontrada');
        if (routine.alumno.clienteId !== clienteId)
            throw new common_1.ForbiddenException('Acceso denegado');
        await this.prisma.routine.delete({ where: { id: routineId } });
        return { message: 'Rutina eliminada' };
    }
    async copyRoutine(routineId, clienteId, dto) {
        const routine = await this.prisma.routine.findUnique({
            where: { id: routineId },
            include: { alumno: { select: { clienteId: true } } },
        });
        if (!routine)
            throw new common_1.NotFoundException('Rutina no encontrada');
        if (routine.alumno.clienteId !== clienteId)
            throw new common_1.ForbiddenException('Acceso denegado');
        for (const targetId of dto.targetAlumnoIds) {
            await this.ensureAlumnoBelongsToCliente(targetId, clienteId);
        }
        return Promise.all(dto.targetAlumnoIds.map((alumnoId) => this.prisma.routine.create({
            data: { name: routine.name, alumnoId, days: routine.days },
        })));
    }
    async getMyRoutines(alumnoId) {
        return this.prisma.routine.findMany({
            where: { alumnoId },
            orderBy: { createdAt: 'desc' },
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
exports.RoutinesService = RoutinesService;
exports.RoutinesService = RoutinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutinesService);
//# sourceMappingURL=routines.service.js.map