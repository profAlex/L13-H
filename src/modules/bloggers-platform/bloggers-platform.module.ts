import { Module } from '@nestjs/common';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { BlogsService } from './blogs/application/blogs.service';
import {BlogsController} from "./blogs/api/blogs.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blogs/domain/blog.entity";
import {BlogsQueryRepository} from "./blogs/infrastructure/query/blogs.query-repository";
import {Post, PostSchema} from "./posts/domain/post.entity";
import {BlogsCommandRepository} from "./blogs/infrastructure/blogs.command-repository";
import {PostsService} from "./posts/application/posts.service";
import {PostsQueryRepository} from "./posts/infrastructure/query/posts.query-repository";
import {PostsCommandRepository} from "./posts/infrastructure/posts.command-repository";
import {Comment, CommentSchema} from "./comments/domain/comment.entity";

//тут регистрируем провайдеры всех сущностей блоггерской платформы (blogs, posts, comments, etc...)
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),

    UserAccountsModule
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsQueryRepository, BlogsCommandRepository, PostsService, PostsQueryRepository, PostsCommandRepository],
})
export class BloggersPlatformModule {}
