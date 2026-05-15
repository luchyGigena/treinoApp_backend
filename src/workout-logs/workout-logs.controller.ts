import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { WorkoutLogsService } from './workout-logs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, RoleName } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpsertWorkoutLogDto } from './dto/upsert-workout-log.dto';
import { UpsertMyWorkoutLogDto } from './dto/upsert-my-workout-log.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private workoutLogsService: WorkoutLogsService) {}

  // ─── ALUMNO ────────────────────────────────────────────────────────

  @Roles(RoleName.ALUMNO)
  @Get('me')
  getMyWorkoutLogs(@CurrentUser() user: any) {
    return this.workoutLogsService.getMyWorkoutLogs(user.id);
  }

  @Roles(RoleName.ALUMNO)
  @Get('me/:date/:routineId')
  getMyWorkoutLog(
    @CurrentUser() user: any,
    @Param('date') date: string,
    @Param('routineId', ParseIntPipe) routineId: number,
  ) {
    return this.workoutLogsService.getMyWorkoutLog(user.id, date, routineId);
  }

  @Roles(RoleName.ALUMNO)
  @Put('me')
  upsertMyWorkoutLog(@CurrentUser() user: any, @Body() dto: UpsertMyWorkoutLogDto) {
    return this.workoutLogsService.upsertMyWorkoutLog(user.id, dto);
  }

  // ─── CLIENTE ───────────────────────────────────────────────────────

  @Roles(RoleName.CLIENTE)
  @Get(':alumnoId')
  getAll(
    @CurrentUser() user: any,
    @Param('alumnoId', ParseIntPipe) alumnoId: number,
  ) {
    return this.workoutLogsService.getWorkoutLogs(alumnoId, user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Get(':alumnoId/:date/:routineId')
  getOne(
    @CurrentUser() user: any,
    @Param('alumnoId', ParseIntPipe) alumnoId: number,
    @Param('date') date: string,
    @Param('routineId', ParseIntPipe) routineId: number,
  ) {
    return this.workoutLogsService.getWorkoutLog(alumnoId, date, routineId, user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Put()
  upsert(@CurrentUser() user: any, @Body() dto: UpsertWorkoutLogDto) {
    return this.workoutLogsService.upsertWorkoutLog(user.id, dto);
  }
}
