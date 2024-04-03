/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class HelpService {
    async hashPassword (password: string){
        const pass = await bcrypt.hash(password, 10);
        return pass;
    }

    async comparePassword(passwordLogin:string, passwordDb:string){
        const pass = await bcrypt.compare(passwordLogin, passwordDb);
        return pass;
    }

    async generateJWT(iduser:number, email:string){ 
        try {
            const payload={ username:email, sub:iduser};
            const accessToken = await jwt.sign(payload, 'secret_key_jwt', {expiresIn:'1h'});
            return {access_token:accessToken}
        } catch (error) {
            throw new NotFoundException(`Error create Token`);
        }
    }
    
}
