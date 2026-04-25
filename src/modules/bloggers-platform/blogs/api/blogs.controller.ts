import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Query} from "@nestjs/common";
import {GetBlogsQueryParams} from "./input-dto/get-blogs-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {BlogViewDto} from "./view-dto/blogs.view-dto";
import {BlogsQueryRepository} from "../infrastructure/query/blogs.query-repository";

@ApiTags('Blogs endpoint')
@Controller('blogs')
export class BlogsController {
    constructor(private blogsQueryRepository: BlogsQueryRepository,) {
        console.log('BlogsController created');
    }

    @Get()
    async getALlBlogs(@Query() query: GetBlogsQueryParams): Promise<PaginatedViewDto<BlogViewDto[]>> {
        return this.blogsQueryRepository.getAllBlogs(query);
    }

}