/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { UserDto } from 'src/modules/user/user-dto/user-dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly  userEntityRepository: Repository<UserEntity>
    ){}

    async create (userDto: UserDto){
        const user = await this.userEntityRepository.create(userDto);
        if(!user){
            throw new NotFoundException('User not create')
        }
        await this.userEntityRepository.save(user);
        return this.entityToDto(user);
    }
    
    private entityToDto(user: UserEntity){
        const { iduser, fullname, age,email, createdAt, updatedAt, deletedAt} = user;
        return {  iduser, fullname, age,email, createdAt, updatedAt, deletedAt};
    }
}
