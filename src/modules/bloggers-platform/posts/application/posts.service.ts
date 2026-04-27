import {Injectable} from "@nestjs/common";
import {GetPostsQueryParams} from "../api/input-dto/get-posts-query-params.input-dto";
import {PostQueryRepository} from "../infrastructure/query/posts.query-repository";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {PostViewDto} from "../api/view-dto/posts.view-dto";

@Injectable()
export class PostsService {
    constructor(private postQueryRepository:PostQueryRepository) {
        console.log('PostsService created');
    }

    async getPostsByBlogId({userId, blogId, query}: {
        userId?: string | null,
        blogId: string,
        query: GetPostsQueryParams
    }):Promise<PaginatedViewDto<PostViewDto[]>> {
        return this.postQueryRepository.getPostsByBlogId({userId, blogId, query});
    };
}
