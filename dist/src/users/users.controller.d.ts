import { UsersService } from './users.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllClientes(): Promise<any>;
    createCliente(dto: CreateClienteDto): Promise<any>;
    getClienteById(id: number): Promise<any>;
    toggleClienteActive(id: number): Promise<any>;
    getClienteAlumnos(id: number): Promise<any>;
    getMyAlumnos(user: any): Promise<any>;
    createAlumno(user: any, dto: CreateAlumnoDto): Promise<any>;
    getAlumnoById(user: any, id: number): Promise<any>;
}
