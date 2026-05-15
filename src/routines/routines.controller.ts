import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, RoleName } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { CopyRoutineDto } from './dto/copy-routine.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('routines')
export class RoutinesController {
  constructor(private routinesService: RoutinesService) {}

  // ─── ALUMNO ────────────────────────────────────────────────────────

  @Roles(RoleName.ALUMNO)
  @Get('me')
  getMyRoutines(@CurrentUser() user: any) {
    return this.routinesService.getMyRoutines(user.id);
  }

  // ─── CLIENTE ───────────────────────────────────────────────────────

  @Roles(RoleName.CLIENTE)
  @Get()
  getAll(@CurrentUser() user: any) {
    return this.routinesService.getRoutinesByCliente(user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Get('alumno/:id')
  getByAlumno(@CurrentUser() user: any, @Param('id', ParseIntPipe) alumnoId: number) {
    return this.routinesService.getRoutinesByAlumno(alumnoId, user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateRoutineDto) {
    return this.routinesService.createRoutine(user.id, dto);
  }

  @Roles(RoleName.CLIENTE)
  @Delete(':id')
  delete(@CurrentUser() user: any, @Param('id', ParseIntPipe) id: number) {
    return this.routinesService.deleteRoutine(id, user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Post(':id/copy')
  copy(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CopyRoutineDto,
  ) {
    return this.routinesService.copyRoutine(id, user.id, dto);
  }
}
