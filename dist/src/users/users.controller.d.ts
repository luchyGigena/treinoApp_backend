import { UsersService } from './users.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    getClienteAlumnos(id: number): Promise<{
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
    getMyAlumnos(user: any): Promise<{
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
    createAlumno(user: any, dto: CreateAlumnoDto): Promise<{
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
    getAlumnoById(user: any, id: number): Promise<{
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
}
