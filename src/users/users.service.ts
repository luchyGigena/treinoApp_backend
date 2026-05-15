import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';

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

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ─── Admin: Clientes ───────────────────────────────────────────────

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

  async createCliente(dto: CreateClienteDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya está en uso');

    const clienteRole = await this.prisma.role.findUnique({ where: { name: 'CLIENTE' } });
    const password = await bcrypt.hash(dto.password, 10);
    const avatar = dto.name.charAt(0).toUpperCase();

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password,
        roleId: clienteRole!.id,
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

  async getClienteById(id: number) {
    const cliente = await this.prisma.user.findFirst({
      where: { id, role: { name: 'CLIENTE' } },
      include: CLIENTE_INCLUDE,
    });

    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const { password: _pw, ...result } = cliente;
    return result;
  }

  async toggleClienteActive(id: number) {
    const cliente = await this.prisma.user.findFirst({
      where: { id, role: { name: 'CLIENTE' } },
    });

    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const updated = await this.prisma.user.update({
      where: { id },
      data: { active: !cliente.active },
      include: CLIENTE_INCLUDE,
    });

    const { password: _pw, ...result } = updated;
    return result;
  }

  async getClienteAlumnos(clienteId: number) {
    const cliente = await this.prisma.user.findFirst({
      where: { id: clienteId, role: { name: 'CLIENTE' } },
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    return this.prisma.user.findMany({
      where: { clienteId, role: { name: 'ALUMNO' } },
      select: ALUMNO_SELECT,
      orderBy: { name: 'asc' },
    });
  }

  // ─── Cliente: Alumnos ──────────────────────────────────────────────

  async getMyAlumnos(clienteId: number) {
    return this.prisma.user.findMany({
      where: { clienteId, role: { name: 'ALUMNO' } },
      select: ALUMNO_SELECT,
      orderBy: { name: 'asc' },
    });
  }

  async createAlumno(clienteId: number, dto: CreateAlumnoDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya está en uso');

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
        roleId: alumnoRole!.id,
        clienteId,
        avatar,
      },
      select: ALUMNO_SELECT,
    });
  }

  async getAlumnoById(alumnoId: number, clienteId: number) {
    const alumno = await this.prisma.user.findFirst({
      where: { id: alumnoId, clienteId, role: { name: 'ALUMNO' } },
      select: {
        ...ALUMNO_SELECT,
        _count: { select: { weightLogs: true, workoutLogs: true, routines: true } },
      },
    });

    if (!alumno) throw new NotFoundException('Alumno no encontrado');
    return alumno;
  }

  async ensureAlumnoBelongsToCliente(alumnoId: number, clienteId: number) {
    const alumno = await this.prisma.user.findFirst({
      where: { id: alumnoId, clienteId, role: { name: 'ALUMNO' } },
    });
    if (!alumno) throw new ForbiddenException('Acceso denegado');
    return alumno;
  }
}
