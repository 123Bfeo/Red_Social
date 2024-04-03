/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostEntity } from "../post/post.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    iduser:number;

    @Column({length:50})
    fullname:string;

    @Column()
    age:number;

    @Column({length:250})
    email:string;

    @Column({length:250})
    password:string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
    /**Relacion User y Post 1 -> m */
    
    @OneToMany(() => PostEntity, post => post.id_user)
    posts: PostEntity[];
}
