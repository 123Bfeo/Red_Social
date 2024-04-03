/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
        const post = await this.postEntityRepository.create(postDto);
        if(!post){
            throw new NotFoundException('Post not create')
        }
        await this.postEntityRepository.save(post);
        return this.entityToDto(post);
    }

    async get (){
        try {
            const postList = await this.postEntityRepository.find();
            return postList;
        } catch (error) {
            throw new NotFoundException(`Post not fount`);
        }
    }

    async update(id: number, updatePostDto: PostDto) {
        try {
            await this.postEntityRepository.update(id, updatePostDto);
            const update = await this.postEntityRepository.findOneBy({ idpost: id });
            return this.entityToDto(update)
        } catch (error) {
            throw new NotFoundException(`Post not update`);
        }
    }

    async delete (id:number){
        try {
            await this.postEntityRepository.delete(id)
            return {message:"User delete", status:"OK"} 
        } catch (error) {
            throw new NotFoundException(`Post not delete`);
        }
    }

    private entityToDto(post: PostDto) {
        const { idpost,title,content,id_user} = post;
        return { idpost,title,content,id_user};
    }

}
