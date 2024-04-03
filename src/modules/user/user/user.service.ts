/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
            throw new InternalServerErrorException(`Error list user: ${error.message}`);
        }
    }

    async update(id: number, updateUserDto: UserDto) {
        try {
            await this.userEntityRepository.update(id, updateUserDto);
            const update = await this.userEntityRepository.findOneBy({ iduser: id });
            return this.entityToDto(update)
        } catch (error) {
            throw new InternalServerErrorException(`Error update user: ${error.message}`);
        }
    }

    async delete (id:number){
        try {
            const user = await this.userEntityRepository.findOneBy({iduser:id})
            if(!user){
                throw new NotFoundException(`User with id ${id} not found`);
            }
            user.deletedAt = new Date();
            await this.userEntityRepository.save(user);
            return {message:"User delete", status:"OK"} 
        } catch (error) {
            throw new InternalServerErrorException(`Error deleting user: ${error.message}`);
        }
    }

    private entityToDto(user: UserEntity) {
        const { iduser, fullname, age, email, createdAt, updatedAt, deletedAt } = user;
        return { iduser, fullname, age, email, createdAt, updatedAt, deletedAt };
    }
  
}
