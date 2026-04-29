import {Injectable} from "@nestjs/common";
import {BlogDocument} from "../../blogs/domain/blog.entity";
import {PostDocument} from "../domain/post.entity";

@Injectable()
export class PostsCommandRepository {

    async save(post: PostDocument): Promise<void> {
        await post.save();
    }

}