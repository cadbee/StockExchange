import {Controller, Get, Param, Req} from '@nestjs/common';
import { Request} from "express";

@Controller('posts')
export class PostsController {
    @Get()
    getAllPosts(): string{
        return 'All posts'
    }
    @Get(':id')
    getPostById(@Req() req: Request, @Param('id') id: number): string{
        return `All posts ${id}`
    }
}
