/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param,  Put, Res, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../user-dto/user-dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    
    @Get(':id')
    async getInfo (@Param('id') iduser, @Res() response){
        try {
            const userInfo = await this.userService.get(iduser);
            response.status(HttpStatus.OK).json(userInfo)
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({userInfo:"ERROR USER NOT FOUNT"})
        }
    }

    @Put(':id')
    async update(@Body(new ValidationPipe()) updateUserDto:UserDto, @Res() response, @Param('id') idUser){
        try {
            const userUpdate = await this.userService.update(idUser, updateUserDto) ;
            response.status(HttpStatus.OK).json(userUpdate);
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({userUpdate:"ERROR UPDATE USER"})
        }
    }

    @Delete(':id')
    async delete(@Param('id') iduser, @Res() response){
       try {
           const userDelete = await this.userService.delete(iduser);
           response.status(HttpStatus.OK).json(userDelete)
       } catch (error) {
        response.status(HttpStatus.FORBIDDEN).json({userDelete:"ERROR DELETE USER"})
       }
    }

}
