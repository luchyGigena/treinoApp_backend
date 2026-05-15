import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, RoleName } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ─── Admin ─────────────────────────────────────────────────────────

  @Roles(RoleName.ADMIN)
  @Get('clientes')
  getAllClientes() {
    return this.usersService.getAllClientes();
  }

  @Roles(RoleName.ADMIN)
  @Post('clientes')
  createCliente(@Body() dto: CreateClienteDto) {
    return this.usersService.createCliente(dto);
  }

  @Roles(RoleName.ADMIN)
  @Get('clientes/:id')
  getClienteById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getClienteById(id);
  }

  @Roles(RoleName.ADMIN)
  @Patch('clientes/:id/toggle-active')
  toggleClienteActive(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.toggleClienteActive(id);
  }

  @Roles(RoleName.ADMIN)
  @Get('clientes/:id/alumnos')
  getClienteAlumnos(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getClienteAlumnos(id);
  }

  // ─── Cliente ───────────────────────────────────────────────────────

  @Roles(RoleName.CLIENTE)
  @Get('alumnos')
  getMyAlumnos(@CurrentUser() user: any) {
    return this.usersService.getMyAlumnos(user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Post('alumnos')
  createAlumno(@CurrentUser() user: any, @Body() dto: CreateAlumnoDto) {
    return this.usersService.createAlumno(user.id, dto);
  }

  @Roles(RoleName.CLIENTE)
  @Get('alumnos/:id')
  getAlumnoById(@CurrentUser() user: any, @Param('id', ParseIntPipe) id: number) {
    return this.usersService.getAlumnoById(id, user.id);
  }
}
