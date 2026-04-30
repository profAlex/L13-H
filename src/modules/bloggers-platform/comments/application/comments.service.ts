import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CommentModelType} from "../domain/comment.entity";
import {CommentViewDto} from "../api/view-dto/comments.view-dto";
import {GetCommentsQueryParams} from "../api/input-dto/get-comments-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {PostsQueryRepository} from "../../posts/infrastructure/query/posts.query-repository";
import {CommentsQueryRepository} from "../infrastructure/query/comments.query-repository";

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private CommentModel: CommentModelType,
        private postsQueryRepository:PostsQueryRepository,
        private commentsQueryRepository: CommentsQueryRepository
    ) {
        console.log('CommentsService created');
    }


    async getCommentsByPostId({userId, postId, query}: {
        userId?: string | null, // параметр на будущее, когда появится вариант делать анонимные запросы и неанонимные с конкретным юзером
        postId: string,
        query: GetCommentsQueryParams
    }): Promise<PaginatedViewDto<CommentViewDto[]>> {

        if (await this.postsQueryRepository.ifPostExists(postId)) {
            throw new NotFoundException("Blog not found");
        }

        return this.commentsQueryRepository.getCommentsByPostId({userId, postId, query});
    };
}