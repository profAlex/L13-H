import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {GetBlogsQueryParams} from "./input-dto/get-blogs-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {BlogViewDto} from "./view-dto/blogs.view-dto";
import {BlogsQueryRepository} from "../infrastructure/query/blogs.query-repository";
import {SwaggerBlogsPaginatedViewDto} from "../../../../core/swagger/blogs.paginated-view-schema";
import {CreateBlogInputDto} from "./input-dto/blogs.input-dto";
import {BlogsService} from "../application/blogs.service";

@ApiTags('Blogs endpoint')
@Controller('blogs')
export class BlogsController {
    constructor(private blogsQueryRepository: BlogsQueryRepository,
                private blogsService: BlogsService,
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
        type: SwaggerBlogsPaginatedViewDto // Используем наш новый класс
    })
    async getALlBlogs(@Query() query: GetBlogsQueryParams): Promise<PaginatedViewDto<BlogViewDto[]>> {
        return this.blogsQueryRepository.getAllBlogs(query);
    }

    @Post()
    async createNewBlog(@Body() body: CreateBlogInputDto): Promise<BlogViewDto>{
        const blogId = await this.blogsService.createNewBlog(body);

        return this.blogsQueryRepository.getBlogByIdOrNotFoundFail(blogId);
    }

}