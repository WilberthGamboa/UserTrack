import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrModule } from './qr/qr.module';
import { AttendanceModule } from './attendance/attendance.module';

import { MailModule } from './mail/mail.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [AuthModule,QrModule, ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.DB_HOST,
    port:+process.env.DB_PORT,
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    autoLoadEntities:true,
    synchronize:true
  }), AttendanceModule, MailModule, SeedModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
