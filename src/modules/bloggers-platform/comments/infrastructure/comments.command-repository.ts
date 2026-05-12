import {InjectModel} from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common";
import {CommentModelType} from "../domain/comment.entity";
import {CommentViewDto} from "../api/view-dto/comments.view-dto";
import {GetCommentsQueryParams} from "../api/input-dto/get-comments-query-params.input-dto";
import {PaginatedViewDto} from "../../../../core/dto/base.paginated.view-dto";
import {SortDirection} from "../../../../core/dto/base.query-params.input-dto";

@Injectable()
export class CommentsCommandRepository {
    constructor(@InjectModel(Comment.name) private CommentModel: CommentModelType) {
    }

    async createComment(id: string): Promise<CommentViewDto | null> {

    }

}