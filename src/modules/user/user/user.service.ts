/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../user-dto/user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>
    ) { }

    async get (id:number){
        try {
            const userInfo = await this.userEntityRepository.findOneBy({ iduser: id });
            return this.entityToDto(userInfo)
        } catch (error) {
            throw new NotFoundException(`User not fount`);
        }
    }

    async update(id: number, updateUserDto: UserDto) {
        try {
            await this.userEntityRepository.update(id, updateUserDto);
            const update = await this.userEntityRepository.findOneBy({ iduser: id });
            return this.entityToDto(update)
        } catch (error) {
            throw new NotFoundException(`User not update`);
        }
    }

    async delete (id:number){
        try {
            await this.userEntityRepository.delete(id)
            return {message:"User delete", status:"OK"} 
        } catch (error) {
            throw new NotFoundException(`User not delete`);
        }
    }

    private entityToDto(user: UserEntity) {
        const { iduser, fullname, age, email, createdAt, updatedAt, deletedAt } = user;
        return { iduser, fullname, age, email, createdAt, updatedAt, deletedAt };
    }

}
