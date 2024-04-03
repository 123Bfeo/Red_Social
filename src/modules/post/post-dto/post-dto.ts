/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDto {
    idpost:number;
    
    @IsNotEmpty()
    @IsString()
    title:string;
    
    @IsNotEmpty()
    @IsString()
    content:string;
    
    @IsNumber()
    like:number;
    
    @IsNumber()
    id_user:number;
}
