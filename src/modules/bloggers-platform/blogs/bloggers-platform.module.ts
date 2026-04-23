import { Module } from '@nestjs/common';
import { UserAccountsModule } from '../../user-accounts/user-accounts.module';
import { BlogsService } from './blogs.service';
import {BlogsController} from "./api/blogs.controller";

//тут регистрируем провайдеры всех сущностей блоггерской платформы (blogs, posts, comments, etc...)
@Module({
  imports: [UserAccountsModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BloggersPlatformModule {}
