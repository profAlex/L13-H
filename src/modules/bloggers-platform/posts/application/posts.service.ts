import {Injectable, NotFoundException} from "@nestjs/common";
import {GetPostsQueryParams} from "../api/input-dto/get-posts-query-params.input-dto";
import {PostsQueryRepository} from "../infrastructure/query/posts.query-repository";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {PostViewDto} from "../api/view-dto/posts.view-dto";
import {BlogsQueryRepository} from "../../blogs/infrastructure/query/blogs.query-repository";

@Injectable()
export class PostsService {
    constructor(private postsQueryRepository:PostsQueryRepository,
                private blogsQueryRepository:BlogsQueryRepository) {
        console.log('PostsService created');
    }

    async getPostsByBlogId({userId, blogId, query}: {
        userId?: string | null, // параметр на будущее, когда появится вариант делать анонимные запросы и неанонимные с конкретным юзером
        blogId: string,
        query: GetPostsQueryParams
    }):Promise<PaginatedViewDto<PostViewDto[]>> {

        const ifBlogExists = await this.blogsQueryRepository.ifBlogExistsOrNotFoundFail(blogId);
        if(!ifBlogExists) {
            throw new NotFoundException("Blog not found");
        }

        return this.postsQueryRepository.getPostsByBlogId({userId, blogId, query});
    };
}
