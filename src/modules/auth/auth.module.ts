import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { HelpService } from './help/help.service';
//import { MailjetService } from './mailjet/mailjet.service';
import { MailtrapService } from './mailtrap/mailtrap.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, HelpService, MailtrapService],
})
export class AuthModule {}
