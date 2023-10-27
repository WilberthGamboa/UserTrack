import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QrService } from './qr.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';


@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get()
  @UseGuards(AuthGuard())
  getQr(){
    return'hola qr'
  }
 
}
