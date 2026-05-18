import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllClientes(): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        _count: {
            alumnos: number;
        };
        email: string;
        avatar: string;
        active: boolean;
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            createdAt: Date;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            userId: number;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
        };
    }[]>;
    createCliente(dto: CreateClienteDto): Promise<{
        _count: {
            alumnos: number;
        };
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            createdAt: Date;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            userId: number;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
        };
        id: number;
        createdAt: Date;
        name: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        email: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        clienteId: number | null;
    }>;
    getClienteById(id: number): Promise<{
        _count: {
            alumnos: number;
        };
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            createdAt: Date;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            userId: number;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
        };
        id: number;
        createdAt: Date;
        name: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        email: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        clienteId: number | null;
    }>;
    toggleClienteActive(id: number): Promise<{
        _count: {
            alumnos: number;
        };
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            createdAt: Date;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            userId: number;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
        };
        id: number;
        createdAt: Date;
        name: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        email: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        clienteId: number | null;
    }>;
    getClienteAlumnos(clienteId: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        avatar: string;
        active: boolean;
    }[]>;
    getMyAlumnos(clienteId: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        avatar: string;
        active: boolean;
    }[]>;
    createAlumno(clienteId: number, dto: CreateAlumnoDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        avatar: string;
        active: boolean;
    }>;
    getAlumnoById(alumnoId: number, clienteId: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        _count: {
            workoutLogs: number;
            routines: number;
            weightLogs: number;
        };
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        avatar: string;
        active: boolean;
    }>;
    ensureAlumnoBelongsToCliente(alumnoId: number, clienteId: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        email: string;
        password: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        clienteId: number | null;
    }>;
}
