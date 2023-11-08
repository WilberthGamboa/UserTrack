import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req, Put} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from './entities/resetpassword-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log(createAuthDto)
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
   
  
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return this.authService.loginFacebook(req.user.email)
  }
  @Put('resetpassword')
  async resetPasswordJwt(@Body() ressetPasswordDto:ResetPasswordDto ){
return this.authService.resetPassword(ressetPasswordDto)
  }

}
