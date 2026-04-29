import {Injectable} from '@nestjs/common';
import {
    UsersExternalQueryRepository
} from '../../../user-accounts/infrastructure/external-query/users.external-query-repository';
import {UsersExternalService} from '../../../user-accounts/application/users.external-service';
import {Blog, BlogModelType} from "../domain/blog.entity";
import {InjectModel} from "@nestjs/mongoose";
import {CreateBlogDto} from "../dto/create-blog.dto";
import {BlogsCommandRepository} from "../infrastructure/blogs.command-repository";

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private BlogModel: BlogModelType,
        private blogsCommandRepository: BlogsCommandRepository,
    ) {
        console.log('BlogsService created');
    }

    async createNewBlog(dto: CreateBlogDto): Promise<string> {
        const blog = this.BlogModel.createInstance({
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl
        });

        await this.blogsCommandRepository.save(blog);

        return blog.id;
    }

    async updateBlogById({id, name, description, websiteUrl}: {
        id: string,
        name: string,
        description: string,
        websiteUrl: string
    }): Promise<Blog> {
        
    }
}
