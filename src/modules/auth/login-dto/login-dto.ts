/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    iduser: number
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password:string
}
