/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    iduser:number;
    @IsNotEmpty()
    @IsString()
    fullname:string;
    
    @IsNotEmpty()
    age:number;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

}
