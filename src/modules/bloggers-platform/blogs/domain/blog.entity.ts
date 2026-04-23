import {Prop, Schema} from "@nestjs/mongoose";
import {ApiProperty, ApiTags} from "@nestjs/swagger";

// type-fields for reference:
// export type BloggerCollectionStorageModel = {
//     _id: ObjectId;
//     id: string;
//     name: string;
//     description: string;
//     websiteUrl: string;
//     createdAt: Date;
//     isMembership: boolean;
// };


@Schema({timestamps: true})
export class Blog {
    /**
     * Name of the blog
     * @type {string}
     * @required
     */
    @ApiProperty({example: 'This is my super blog!', description: 'Blog\'s name'})
    @Prop({type: String,required: true})
    name: string;

    /**
     *
     */
    @ApiProperty({example: 'This is my super blog', description: 'Blog\'s description name'})
    @Prop({type: String, required: true})
    description: string;

    @ApiProperty({example: 'www.my_web_site.org', description: 'Blogger\'s personal website address'})
    @Prop({type: String, required: true})
    websiteUrl: string;

    /**
     * Creation timestamp
     * Explicitly defined despite timestamps: true
     * properties without @Prop for typescript so that they are in the class instance (or in instance methods)
     * @type {Date}
     */
    createdAt: Date;

    @ApiProperty({example: false, description: 'True if user has not expired membership subscription to blog'})
    @Prop({type: Boolean, required: true, default: false})
    isMembership: boolean;
}