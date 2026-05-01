import {Controller, Get, NotFoundException, Param} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CommentViewDto} from "./view-dto/comments.view-dto";
import {CommentsQueryRepository} from "../infrastructure/query/comments.query-repository";

@ApiTags('Comments endpoint')
@Controller('comments')
export class CommentsController {
    constructor(private commentsQueryRepository: CommentsQueryRepository,) {
        console.log("CommentsController created");
    }

    @Get(":id")
    async getCommentById(@Param('id') commentId: string): Promise<CommentViewDto> {
        const comment = await this.commentsQueryRepository.getCommentById(commentId);

        if (!comment) {
            throw new NotFoundException("Comment not found!");
        }

        return comment;
    }
}