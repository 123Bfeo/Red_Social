/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from '../post-dto/post-dto';
import { PostEntity } from 'src/entities/post/post.entity';

@Injectable()
export class PostService {
    constructor( 
        @InjectRepository(PostEntity)
        private readonly postEntityRepository: Repository<PostEntity>
    ) { }

    async create (postDto: PostDto){
        try {
            const post = await this.postEntityRepository.create(postDto);
            if(!post){
                throw new InternalServerErrorException(`Error create post: `);
            }
            await this.postEntityRepository.save(post);
            return this.entityToDto(post);
        } catch (error) {
            throw new InternalServerErrorException(`Error create post: ${error.message} `)
        }
    }

    async get (){
        try {
            const postList = await this.postEntityRepository.find();
            return postList;
        } catch (error) {
            throw new InternalServerErrorException(`Error list post: ${error.message}`);
        }
    }

    async update(id: number, updatePostDto: PostDto) {
        try {
            await this.postEntityRepository.update(id, updatePostDto);
            const update = await this.postEntityRepository.findOneBy({ idpost: id });
            return this.entityToDto(update)
        } catch (error) {
            throw new InternalServerErrorException(`Error update post: ${error.message}`);
        }
    }

    async delete (id:number){
        try {
            const post = await this.postEntityRepository.findOneBy({idpost:id});
            if(!post){
                throw new NotFoundException(`Post with id ${id} not found`);
            }
            post.deletedAt = new Date()
            await this.postEntityRepository.save(post,);
            return {message:"User delete", status:"OK"} 
        } catch (error) {
            throw new InternalServerErrorException(`Error deleting post: ${error.message}`);
        }
    }

    private entityToDto(post: PostEntity) {
        const { idpost,title,content,like,id_user,createdAt,updatedAt,deletedAt} = post;
        return { idpost,title,content,like,id_user,createdAt,updatedAt,deletedAt};
    }

}
