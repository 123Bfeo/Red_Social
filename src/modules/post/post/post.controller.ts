/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from '../post-dto/post-dto';

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ) { }

    @Post('public')
    async public(@Body(new ValidationPipe()) createPostDto:PostDto, @Res() response) {
        try {
            const postCreate = await this.postService.create(createPostDto);
            response.status(HttpStatus.OK).json(postCreate);
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({postCreate:"ERROR CREATE POST"})
        }
    }

    @Get('list')
    async getPublic (@Res() response){
        try {
            const postList = await this.postService.get();
            response.status(HttpStatus.OK).json(postList)
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({userInfo:"ERROR LIST POST"})
        }
    }

    @Put(':id')
    async update (@Body(new ValidationPipe()) updatePostDto:PostDto, @Res() response, @Param('id') idpost){
        try {
            const postUpdate = await this.postService.update(idpost, updatePostDto) ;
            response.status(HttpStatus.OK).json(postUpdate);
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({userUpdate:"ERROR UPDATE POST"})
        }
    }

    @Delete(':id')
    async delete (@Param('id') idpost, @Res() response){
        try {
            const userDelete = await this.postService.delete(idpost);
            response.status(HttpStatus.OK).json(userDelete)
        } catch (error) {
         response.status(HttpStatus.FORBIDDEN).json({userDelete:"ERROR DELETE USER"})
        }
    }
}
