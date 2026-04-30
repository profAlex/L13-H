import {ApiParam, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Query} from "@nestjs/common";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {CommentViewDto} from "../../comments/api/view-dto/comments.view-dto";
import {GetCommentsQueryParams} from "../../comments/api/input-dto/get-comments-query-params.input-dto";
import {CommentsService} from "../../comments/application/comments.service";

@ApiTags('Posts endpoint')
@Controller('posts')
export class PostsController {
    constructor(private commentsService: CommentsService ) {
        console.log('PostsController created');
    }

    @ApiParam({name: 'postId'}) //для сваггера
    @Get(":postId/comments")
    async getCommentsByPostId(@Param('postId') postId: string, @Query() query: GetCommentsQueryParams): Promise<PaginatedViewDto<CommentViewDto[]>> {
        return this.commentsService.getCommentsByPostId({postId, query});
    }
}