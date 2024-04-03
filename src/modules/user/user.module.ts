/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
