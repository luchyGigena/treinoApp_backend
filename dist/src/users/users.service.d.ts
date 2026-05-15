import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllClientes(): Promise<{
        id: number;
        name: string;
        role: {
            name: string;
        };
        email: string;
        avatar: string;
        active: boolean;
        createdAt: Date;
        perfilCliente: {
            id: number;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            createdAt: Date;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
            userId: number;
        };
        _count: {
            alumnos: number;
        };
    }[]>;
    createCliente(dto: CreateClienteDto): Promise<{
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            createdAt: Date;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
            userId: number;
        };
        _count: {
            alumnos: number;
        };
        id: number;
        name: string;
        email: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        roleId: number;
        avatar: string | null;
        active: boolean;
        createdAt: Date;
        clienteId: number | null;
    }>;
    getClienteById(id: number): Promise<{
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            createdAt: Date;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
            userId: number;
        };
        _count: {
            alumnos: number;
        };
        id: number;
        name: string;
        email: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        roleId: number;
        avatar: string | null;
        active: boolean;
        createdAt: Date;
        clienteId: number | null;
    }>;
    toggleClienteActive(id: number): Promise<{
        role: {
            name: string;
        };
        perfilCliente: {
            id: number;
            nombre: string | null;
            apellido: string | null;
            telefono: string | null;
            createdAt: Date;
            clientType: import(".prisma/client").$Enums.ClientType;
            emailContacto: string | null;
            nombreComercial: string | null;
            responsableNombre: string | null;
            responsableApellido: string | null;
            cuit: string | null;
            direccion: string | null;
            updatedAt: Date;
            userId: number;
        };
        _count: {
            alumnos: number;
        };
        id: number;
        name: string;
        email: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        roleId: number;
        avatar: string | null;
        active: boolean;
        createdAt: Date;
        clienteId: number | null;
    }>;
    getClienteAlumnos(clienteId: number): Promise<{
        id: number;
        name: string;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        avatar: string;
        active: boolean;
        createdAt: Date;
    }[]>;
    getMyAlumnos(clienteId: number): Promise<{
        id: number;
        name: string;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        avatar: string;
        active: boolean;
        createdAt: Date;
    }[]>;
    createAlumno(clienteId: number, dto: CreateAlumnoDto): Promise<{
        id: number;
        name: string;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        avatar: string;
        active: boolean;
        createdAt: Date;
    }>;
    getAlumnoById(alumnoId: number, clienteId: number): Promise<{
        id: number;
        name: string;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        avatar: string;
        active: boolean;
        createdAt: Date;
        _count: {
            routines: number;
            weightLogs: number;
            workoutLogs: number;
        };
    }>;
    ensureAlumnoBelongsToCliente(alumnoId: number, clienteId: number): Promise<{
        id: number;
        name: string;
        email: string;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
        password: string;
        roleId: number;
        avatar: string | null;
        active: boolean;
        createdAt: Date;
        clienteId: number | null;
    }>;
}
