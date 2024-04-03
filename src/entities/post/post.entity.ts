/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    idpost:number;

    @Column({length:50})
    title:string;

    @Column({length:300})
    content:string;

    @Column()
    like:number;

    @Column()
    id_user:number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    /**Relacion entre Post y User M->1 */
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'id_user' })
    userEntity: UserEntity;

}
