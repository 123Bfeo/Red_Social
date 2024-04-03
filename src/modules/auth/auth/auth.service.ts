/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { UserDto } from 'src/modules/user/user-dto/user-dto';
import { Repository } from 'typeorm';
import { HelpService } from '../help/help.service';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly  userEntityRepository: Repository<UserEntity>,
        private readonly helpServices:HelpService
    ){}

    async create (userDto: UserDto){
        try {
            const hashedPassword = await this.helpServices.hashPassword(userDto.password);
            const user = await this.userEntityRepository.create({...userDto,password:hashedPassword});
            if(!user){
                throw new NotFoundException('User not create')
            }
            await this.userEntityRepository.save(user);
            return this.entityToDto(user);
        } catch (error) {
            throw new InternalServerErrorException(`Error create auth: ${error.message} `)
        }
    }

    async validationUserLogin (email:string, password:string){
        const pass:string = password;
        try {

            const userEmail = await this.userEntityRepository.findOne({where:{email:email}});
            if(!userEmail){
                throw new UnauthorizedException("Invalid Credentials");
            }
            const validatePass:boolean = await this.helpServices.comparePassword(pass, userEmail.password)
            if(!validatePass){
                throw new UnauthorizedException("Invalid Credentials");
            }
            const {password,age,createdAt,updatedAt,deletedAt,posts, ...result} = userEmail;
            return result
        } catch (error) {
            throw new InternalServerErrorException(`Error not fount user: ${error.message} `)
        }
    }
    async loginJWT (iduser:number, email:string){
        try {
            const jwt = await this.helpServices.generateJWT(iduser,email);
            return jwt;
        } catch (error) {
            throw new InternalServerErrorException(`Error not jwt user: ${error.message} `)
        }
    }
    clearToken (response:Response):void{
        response.clearCookie('token');
    }

    private entityToDto(user: UserEntity){
        const { iduser, fullname, age,email, createdAt, updatedAt, deletedAt} = user;
        return {  iduser, fullname, age,email, createdAt, updatedAt, deletedAt};
    }
}
