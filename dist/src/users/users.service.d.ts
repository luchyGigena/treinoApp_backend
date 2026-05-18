import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllClientes(): Promise<any>;
    createCliente(dto: CreateClienteDto): Promise<any>;
    getClienteById(id: number): Promise<any>;
    toggleClienteActive(id: number): Promise<any>;
    getClienteAlumnos(clienteId: number): Promise<any>;
    getMyAlumnos(clienteId: number): Promise<any>;
    createAlumno(clienteId: number, dto: CreateAlumnoDto): Promise<any>;
    getAlumnoById(alumnoId: number, clienteId: number): Promise<any>;
    ensureAlumnoBelongsToCliente(alumnoId: number, clienteId: number): Promise<any>;
}
