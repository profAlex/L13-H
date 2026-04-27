import {ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {GetBlogsQueryParams} from "./input-dto/get-blogs-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {BlogViewDto} from "./view-dto/blogs.view-dto";
import {SwaggerBlogsPaginatedViewDto} from "../../../../core/swagger/blogs.paginated-view-schema";
import {CreateBlogInputDto} from "./input-dto/blogs.input-dto";
import {GetPostsQueryParams} from "../../posts/api/input-dto/get-posts-query-params.input-dto";
import {PostViewDto} from "../../posts/api/view-dto/posts.view-dto";

import {BlogsService} from "../application/blogs.service";
import {PostsService} from "../../posts/application/posts.service";

import {BlogsQueryRepository} from "../infrastructure/query/blogs.query-repository";

@ApiTags('Blogs endpoint')
@Controller('blogs')
export class BlogsController {
    constructor(private blogsQueryRepository: BlogsQueryRepository,
                private blogsService: BlogsService,
                private postsService: PostsService,
    ) {
        console.log('BlogsController created');
    }

    @Get()
    @ApiOperation({
        summary: 'Получить все блоги',
        description: 'Возвращает список блогов с поддержкой пагинации, поиска по имени и сортировки'
    })
    @ApiOkResponse({
        description: 'Успех',
        type: SwaggerBlogsPaginatedViewDto // Используем специальный класс для вывода в сваггер с "плоской" структурой, потмоу что PaginatedViewDto<T> сваггер не подхватит красиво и то что внутри items не отобразит
    })
    async getALlBlogs(@Query() query: GetBlogsQueryParams): Promise<PaginatedViewDto<BlogViewDto[]>> {
        return this.blogsQueryRepository.getAllBlogs(query);
    }

    @Post()
    async createNewBlog(@Body() body: CreateBlogInputDto): Promise<BlogViewDto> {
        const blogId = await this.blogsService.createNewBlog(body);

        return this.blogsQueryRepository.getBlogByIdOrNotFoundFail(blogId);
    }

    @ApiOperation({
        summary: 'Получить посты',
        description: 'Получить все посты, относящиеся к ID блоггера'
    })
    @ApiParam({name: 'blogId'}) //для сваггера
    // TODO: надо сделать плоский класс чтобы swagger подхватил то тчо внутри items[] находится, по аналогии с SwaggerBlogsPaginatedViewDto
    @ApiOkResponse({type: PaginatedViewDto<PostViewDto>})
    @Get(':blogId/posts')
    async getPostsByBlogId(@Param('blogId') blogId: string, @Query() query: GetPostsQueryParams): Promise<PaginatedViewDto<PostViewDto[]>> {
        return this.postsService.getPostsByBlogId({blogId, query});
    }


}