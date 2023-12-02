import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AttendanceModule } from 'src/attendance/attendance.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    AuthModule,
    AttendanceModule,
    
  ]
})
export class SeedModule {



  
}
