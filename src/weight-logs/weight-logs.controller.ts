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
import { WeightLogsService } from './weight-logs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, RoleName } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('weight-logs')
export class WeightLogsController {
  constructor(private weightLogsService: WeightLogsService) {}

  // ─── ALUMNO ────────────────────────────────────────────────────────

  @Roles(RoleName.ALUMNO)
  @Get('me')
  getMyWeightLogs(@CurrentUser() user: any) {
    return this.weightLogsService.getMyWeightLogs(user.id);
  }

  // ─── CLIENTE ───────────────────────────────────────────────────────

  @Roles(RoleName.CLIENTE)
  @Get(':alumnoId')
  getWeightLogs(
    @CurrentUser() user: any,
    @Param('alumnoId', ParseIntPipe) alumnoId: number,
  ) {
    return this.weightLogsService.getWeightLogs(alumnoId, user.id);
  }

  @Roles(RoleName.CLIENTE)
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateWeightLogDto) {
    return this.weightLogsService.createWeightLog(user.id, dto);
  }

  @Roles(RoleName.CLIENTE)
  @Delete(':id')
  delete(@CurrentUser() user: any, @Param('id', ParseIntPipe) id: number) {
    return this.weightLogsService.deleteWeightLog(id, user.id);
  }
}
