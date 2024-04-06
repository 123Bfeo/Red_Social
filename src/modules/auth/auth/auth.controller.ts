/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from 'src/modules/user/user-dto/user-dto';
import { AuthService } from './auth.service';
import { LoginDto } from '../login-dto/login-dto';
import { Response } from 'express';
import { MailtrapService } from '../mailtrap/mailtrap.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailtrapService: MailtrapService,
  ) {}
  @Post('register')
  async create(
    @Body(new ValidationPipe()) createUserDto: UserDto,
    @Res() response,
  ) {
    try {
      const userCreate = await this.authService.create(createUserDto);
      if (!userCreate) {
        response.status(HttpStatus.FORBIDDEN).json({ error: 'Error al crear' });
      }
      const send = await this.mailtrapService.sendUserData(userCreate);
      if (!send) {
        response.status(HttpStatus.OK).json(userCreate);
      } else {
        response
          .status(HttpStatus.OK)
          .json({ userCreate, message: 'Correo de confirmacion enviado' });
      }
    } catch (error) {
      response
        .status(HttpStatus.FORBIDDEN)
        .json({ userCreate: 'ERROR CREATE USER' });
    }
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto, @Res() response) {
    try {
      const user = await this.authService.validationUserLogin(
        loginDto.email,
        loginDto.password,
      );
      const token = await this.authService.loginJWT(user.iduser, user.email);
      response.cookie('token', token, { httpOnly: true });
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response
        .status(HttpStatus.FORBIDDEN)
        .json({ userCreate: 'ERROR LOGIN USER' });
    }
  }

  @Post('logout')
  async logout(@Res() response: Response) {
    this.authService.clearToken(response);
    response
      .status(HttpStatus.OK)
      .json({ message: 'Sesion Finalizada correctamente' });
  }

  @Get('refresh')
  async refresh() {}
}
