/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post, Res, ValidationPipe } from '@nestjs/common';
import { UserDto } from 'src/modules/user/user-dto/user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    @Post('register')
    async create(@Body(new ValidationPipe()) createUserDto:UserDto, @Res() response){
        try {
            const userCreate = await this.authService.create(createUserDto);
            response.status(HttpStatus.OK).json(userCreate);
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({userCreate:"ERROR CREATE USER"})
        }
    }

    @Post('login')
    async login(){

    }
    
    @Post('logout')
    async logout(){

    }

    @Get('refresh')
    async refresh (){

    }


}
