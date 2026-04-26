import {Injectable} from "@nestjs/common";
import {BlogDocument} from "../domain/blog.entity";

@Injectable()
export class BlogsCommandRepository {
    constructor(){}

    async save(blog: BlogDocument): Promise<void> {
        await blog.save();
    }
}