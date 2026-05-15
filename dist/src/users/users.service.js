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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const CLIENTE_INCLUDE = {
    role: { select: { name: true } },
    perfilCliente: true,
    _count: { select: { alumnos: true } },
};
const ALUMNO_SELECT = {
    id: true,
    name: true,
    nombre: true,
    apellido: true,
    telefono: true,
    email: true,
    avatar: true,
    active: true,
    createdAt: true,
};
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllClientes() {
        return this.prisma.user.findMany({
            where: { role: { name: 'CLIENTE' } },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                active: true,
                createdAt: true,
                role: { select: { name: true } },
                perfilCliente: true,
                _count: { select: { alumnos: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createCliente(dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('El email ya está en uso');
        const clienteRole = await this.prisma.role.findUnique({ where: { name: 'CLIENTE' } });
        const password = await bcrypt.hash(dto.password, 10);
        const avatar = dto.name.charAt(0).toUpperCase();
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password,
                roleId: clienteRole.id,
                avatar,
                perfilCliente: {
                    create: {
                        clientType: dto.clientType,
                        nombre: dto.nombre,
                        apellido: dto.apellido,
                        emailContacto: dto.emailContacto,
                        nombreComercial: dto.nombreComercial,
                        responsableNombre: dto.responsableNombre,
                        responsableApellido: dto.responsableApellido,
                        cuit: dto.cuit,
                        direccion: dto.direccion,
                        telefono: dto.telefono,
                    },
                },
            },
            include: CLIENTE_INCLUDE,
        });
        const { password: _pw, ...result } = user;
        return result;
    }
    async getClienteById(id) {
        const cliente = await this.prisma.user.findFirst({
            where: { id, role: { name: 'CLIENTE' } },
            include: CLIENTE_INCLUDE,
        });
        if (!cliente)
            throw new common_1.NotFoundException('Cliente no encontrado');
        const { password: _pw, ...result } = cliente;
        return result;
    }
    async toggleClienteActive(id) {
        const cliente = await this.prisma.user.findFirst({
            where: { id, role: { name: 'CLIENTE' } },
        });
        if (!cliente)
            throw new common_1.NotFoundException('Cliente no encontrado');
        const updated = await this.prisma.user.update({
            where: { id },
            data: { active: !cliente.active },
            include: CLIENTE_INCLUDE,
        });
        const { password: _pw, ...result } = updated;
        return result;
    }
    async getClienteAlumnos(clienteId) {
        const cliente = await this.prisma.user.findFirst({
            where: { id: clienteId, role: { name: 'CLIENTE' } },
        });
        if (!cliente)
            throw new common_1.NotFoundException('Cliente no encontrado');
        return this.prisma.user.findMany({
            where: { clienteId, role: { name: 'ALUMNO' } },
            select: ALUMNO_SELECT,
            orderBy: { name: 'asc' },
        });
    }
    async getMyAlumnos(clienteId) {
        return this.prisma.user.findMany({
            where: { clienteId, role: { name: 'ALUMNO' } },
            select: ALUMNO_SELECT,
            orderBy: { name: 'asc' },
        });
    }
    async createAlumno(clienteId, dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('El email ya está en uso');
        const alumnoRole = await this.prisma.role.findUnique({ where: { name: 'ALUMNO' } });
        const password = await bcrypt.hash(dto.password, 10);
        const name = `${dto.nombre} ${dto.apellido}`;
        const avatar = dto.nombre.charAt(0).toUpperCase();
        return this.prisma.user.create({
            data: {
                name,
                nombre: dto.nombre,
                apellido: dto.apellido,
                telefono: dto.telefono,
                email: dto.email,
                password,
                roleId: alumnoRole.id,
                clienteId,
                avatar,
            },
            select: ALUMNO_SELECT,
        });
    }
    async getAlumnoById(alumnoId, clienteId) {
        const alumno = await this.prisma.user.findFirst({
            where: { id: alumnoId, clienteId, role: { name: 'ALUMNO' } },
            select: {
                ...ALUMNO_SELECT,
                _count: { select: { weightLogs: true, workoutLogs: true, routines: true } },
            },
        });
        if (!alumno)
            throw new common_1.NotFoundException('Alumno no encontrado');
        return alumno;
    }
    async ensureAlumnoBelongsToCliente(alumnoId, clienteId) {
        const alumno = await this.prisma.user.findFirst({
            where: { id: alumnoId, clienteId, role: { name: 'ALUMNO' } },
        });
        if (!alumno)
            throw new common_1.ForbiddenException('Acceso denegado');
        return alumno;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map