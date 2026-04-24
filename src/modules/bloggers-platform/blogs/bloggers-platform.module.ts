import { Module } from '@nestjs/common';
import { UserAccountsModule } from '../../user-accounts/user-accounts.module';
import { BlogsService } from './application/blogs.service';
import {BlogsController} from "./api/blogs.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./domain/blog.entity";

//тут регистрируем провайдеры всех сущностей блоггерской платформы (blogs, posts, comments, etc...)
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    UserAccountsModule
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BloggersPlatformModule {}
