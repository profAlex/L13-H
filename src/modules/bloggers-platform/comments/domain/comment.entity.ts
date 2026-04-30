import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {CommentatorInfo, CommentatorInfoSchema} from "./commentator-info.schema";
import {LikesInfo, LikesInfoSchema} from "./likes-info.schema";
import {HydratedDocument, Model} from "mongoose";

// export type CommentStorageModel = {
//     _id: ObjectId;
//     id: string;
//     relatedPostId: string;
//     content: string;
//     commentatorInfo: CommentatorInfo;
//     createdAt: Date;
//     likesInfo: LikesInfoViewModel;
// };
//
// export type CommentatorInfo = {
//     userId: string;
//     userLogin: string;
// };
//
// export type LikesInfo = {
//     likesCount: number;
//     dislikesCount: number;
//     myStatus: LikeStatus;
// }

// export enum LikeStatus {
//     None = 'None',
//     Like = 'Like',
//     Dislike = 'Dislike'
// }


@Schema({timestamps: true})
export class Comment{
    @Prop({type: Date, required: true})
    relatedPostId: string;

    @Prop({type: Date, required: true})
    content: string;

    @Prop({type: CommentatorInfoSchema, required: true})
    commentatorInfo: CommentatorInfo;

    createdAt: Date;
    updatedAt: Date;

    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;

    @Prop({type: LikesInfoSchema})
    likesInfo: LikesInfo;

    get id(): string {
        // @ts-ignore
        return this._id.toString();
    }

    //TODO: тут надо будет доделывать метод в будущих спринтах

    // static createInstance(dto: CreateCommentDomainDto): CommentDocument{
    //
    //     const newComment = new this();
    //
    //     return newComment as CommentDocument
    // }

    // makeDeleted() {
    //     if(this.deletedAt !== null) {
    //         throw new Error('Comment entity already deleted');
    //     }
    //     this.deletedAt = new Date();
    // }

    // updateComment(dto: UpdateCommentInputDto) {
    //
    // }
}


export const CommentSchema = SchemaFactory.createForClass(Comment);

//регистрирует методы сущности в схеме
CommentSchema.loadClass(Comment);

//Типизация документа
export type CommentDocument = HydratedDocument<Comment>;

//Типизация модели + статические методы
export type CommentModelType = Model<CommentDocument> & typeof Comment;