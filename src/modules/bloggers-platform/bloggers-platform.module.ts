import { Module } from '@nestjs/common';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { BlogsService } from './blogs/application/blogs.service';
import {BlogsController} from "./blogs/api/blogs.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blogs/domain/blog.entity";
import {BlogsQueryRepository} from "./blogs/infrastructure/query/blogs.query-repository";

//тут регистрируем провайдеры всех сущностей блоггерской платформы (blogs, posts, comments, etc...)
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    UserAccountsModule
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsQueryRepository],
})
export class BloggersPlatformModule {}
