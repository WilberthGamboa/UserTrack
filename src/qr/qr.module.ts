import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [QrController],
  providers: [QrService],
  imports:[AuthModule]
})
export class QrModule {}
