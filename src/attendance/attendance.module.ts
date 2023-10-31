import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService],
  imports:[
    TypeOrmModule.forFeature([Attendance]),
    AuthModule
  ],
  exports:[TypeOrmModule,AttendanceService,]
})
export class AttendanceModule {}
