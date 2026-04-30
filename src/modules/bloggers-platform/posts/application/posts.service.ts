import {Injectable, NotFoundException} from "@nestjs/common";
import {GetPostsQueryParams} from "../api/input-dto/get-posts-query-params.input-dto";
import {PostsQueryRepository} from "../infrastructure/query/posts.query-repository";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {PostViewDto} from "../api/view-dto/posts.view-dto";
import {BlogsQueryRepository} from "../../blogs/infrastructure/query/blogs.query-repository";
import {Post, PostModelType} from "../domain/post.entity";
import {CreateBlogPostInputDto} from "../../blogs/api/input-dto/create-blog-post.input-dto";
import {InjectModel} from "@nestjs/mongoose";
import {PostsCommandRepository} from "../infrastructure/posts.command-repository";

@Injectable()
export class PostsService {
    constructor(private postsQueryRepository: PostsQueryRepository,
                private blogsQueryRepository: BlogsQueryRepository,
                @InjectModel(Post.name) private PostModel: PostModelType,
                private postsCommandRepository: PostsCommandRepository) {
        console.log('PostsService created');
    }

    async getPostsByBlogId({userId, blogId, query}: {
        userId?: string | null, // параметр на будущее, когда появится вариант делать анонимные запросы и неанонимные с конкретным юзером
        blogId: string,
        query: GetPostsQueryParams
    }): Promise<PaginatedViewDto<PostViewDto[]>> {

        if (await this.blogsQueryRepository.ifBlogExists(blogId)) {
            throw new NotFoundException("Blog not found");
        }

        return this.postsQueryRepository.getPostsByBlogId({userId, blogId, query});
    };


    async createPostByBlogId({userId, blogId, body}: {
        userId?: string | null, // параметр на будущее, когда понадобится верифицировать пользователя с т.зр. может ли этот конкретный юзер создавать пост в этом конкретном блоге (владеет ли он блогом?)
        blogId: string,
        body: CreateBlogPostInputDto
    }): Promise<PostViewDto> {

        if (userId && !(await this.postsQueryRepository.ifPostExists(userId))) {
            throw new NotFoundException("User not found");
        }

        const blog = await this.blogsQueryRepository.getBlogName(blogId);
        if (!blog) {
            throw new NotFoundException("Blog not found");
        }

        const blogName = blog.name;
        const post = this.PostModel.createInstance({
            ...body,
            blogId,
            blogName
        });

        await this.postsCommandRepository.save(post);

        return PostViewDto.mapToView(post);
    }
}
