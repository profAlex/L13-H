import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {LikeStatus} from "../../../../core/enums/like-status.enum";
import {LikeDetailsViewModel, LikeDetailsViewModelSchema} from "./like-details-view-model.schema";


// export type ExtendedPostViewModel = {
//     likesCount: number;
//     dislikesCount: number;
//     myStatus: LikeStatus;
//     newestLikes: LikeDetailsViewModel[];
// }

@Schema({_id: false})
export class ExtendedPostViewModel {
    @Prop({type: Number})
    likesCount: number;

    @Prop({type: Number})
    dislikesCount: number;

    @Prop({
        type: String,
        enum: LikeStatus
    })
    myStatus: LikeStatus;

    @Prop({
        type: LikeDetailsViewModelSchema
    })
    newestLikes: LikeDetailsViewModel[];
}

export const ExtendedPostViewModelSchema = SchemaFactory.createForClass(ExtendedPostViewModel);
