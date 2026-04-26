import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {ExtendedPostViewModel, ExtendedPostViewModelSchema} from "./extended-post-view-model.schema";
import {CreatePostDomainDto} from "./dto/create-post.domain.dto";
import {HydratedDocument, Model} from "mongoose";


// post entity structure for reference:
// export type PostStorageModel = {
//     _id: ObjectId;
//     id: string;
//     title: string;
//     shortDescription: string;
//     content: string;
//     blogId: string;
//     blogName: string;
//     createdAt: Date;
//     extendedLikesInfo: ExtendedPostViewModel;
// };
//
// export type ExtendedPostViewModel = {
//     likesCount: number;
//     dislikesCount: number;
//     myStatus: LikeStatus;
//     newestLikes: LikeDetailsViewModel[];
// }
//
// export type LikeDetailsViewModel = {
//     addedAt: string;
//     userId: string;
//     login: string;
// };


@Schema({timestamps: true})
export class Post {
    @ApiProperty({example: 'This is my post title!', description: 'Post\'s title name'})
    @Prop({type: String, required: true})
    title: string;

    @ApiProperty({
        example: 'Short description of what is this post all about',
        description: 'Post\'s short desctiption'
    })
    @Prop({type: String, required: true})
    shortDescription: string;

    @ApiProperty({example: 'Post\'s content...', description: 'Post\'s content'})
    @Prop({type: String, required: true})
    content: string;

    @ApiProperty({
        example: '69e36dfcbb7e3d1be7ac9229',
        description: 'ID of the blog the current post is related/connected to'
    })
    @Prop({type: String, required: true})
    blogId: string;

    @Prop({type: String, required: true})
    @ApiProperty({
        example: 'My blog\'s name!',
        description: 'Name of the blog the current post is related/connected to'
    })
    blogName: string;

    createdAt: Date;
    updatedAt: Date;

    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;

    @Prop({type: ExtendedPostViewModelSchema})
    extendedLikesInfo: ExtendedPostViewModel;

    get id(): string {
        // @ts-ignore
        return this._id.toString();
    }

    static createInstance(dto: CreatePostDomainDto): PostDocument {

    }
}

export const PostSchema = SchemaFactory.createForClass(Post);

//регистрирует методы сущности в схеме
PostSchema.loadClass(Post);

//Типизация документа
export type PostDocument = HydratedDocument<Post>;

//Типизация модели + статические методы
export type PostModelType = Model<PostDocument> & typeof Post;