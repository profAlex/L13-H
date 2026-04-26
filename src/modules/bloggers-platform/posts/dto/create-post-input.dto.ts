import {ApiProperty} from "@nestjs/swagger";

export class CreatePostInputDto {
    @ApiProperty({type:String, required:true})
    title: string;

    @ApiProperty({type:String, required:true})
    shortDescription: string;

    @ApiProperty({type:String, required:true})
    content: string;
}