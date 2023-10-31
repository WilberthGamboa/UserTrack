import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { AttendanceModule } from 'src/attendance/attendance.module';


@Module({
  controllers: [QrController],
  providers: [QrService],
  imports:[AuthModule,
    TypeOrmModule.forFeature([Qr]),
    AttendanceModule
  ]
})
export class QrModule {}
