import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoutinesModule } from './routines/routines.module';
import { WeightLogsModule } from './weight-logs/weight-logs.module';
import { WorkoutLogsModule } from './workout-logs/workout-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RoutinesModule,
    WeightLogsModule,
    WorkoutLogsModule,
  ],
})
export class AppModule {}
