import {PaginatedViewDto} from "../../../../../core/dto/base.paginated.view-dto";
import {BlogViewDto} from "../../api/view-dto/blogs.view-dto";
import {Blog, BlogModelType} from "../../domain/blog.entity";
import {FilterQuery} from "mongoose";
import {GetBlogsQueryParams} from "../../api/input-dto/get-blogs-query-params.input-dto";
import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class BlogsQueryRepository {
    constructor(
        @InjectModel(Blog.name)
        private BlogModel: BlogModelType,
    ) {
    }


    async getAllBlogs(query: GetBlogsQueryParams): Promise<PaginatedViewDto<BlogViewDto[]>> {
        const filter: FilterQuery<Blog> = {
            deletedAt: null,
        };

        // структура хранилища blogs
        //     _id: ObjectId;
        //     id: string;
        //     name: string;
        //     description: string;
        //     websiteUrl: string;
        //     createdAt: Date;
        //     isMembership: boolean;

        // структура GetBlogsQueryParams
        // sortBy = BlogsSortBy.CreatedAt;
        // searchNameTerm: string | null = null;
        // pageNumber: number = 1;
        // pageSize: number = 10;
        // sortDirection: SortDirection = SortDirection.Desc;

        // далее защита в дополнение к дефолтным, назначаемым в классе GetBlogsQueryParams
        // 1) Если пользователь не ввел поисковое слово, query.searchNameTerm будет равен null.
        // В таком случае, если нет проверки if: программа попытается добавить в MongoDB условие
        // { name: { $regex: null } }. База либо вернет ошибку, либо (что хуже) попытается
        // найти документы, где имя буквально равно null.
        // С проверкой if(query.searchNameTerm) код просто не зайдет внутрь if, и массив $or
        // не создается. Запрос остается чистым.

        // 2) Защита от пустых строк
        // Иногда пользователи присылают ?searchNameTerm=. В этом случае в DTO может попасть
        // пустая строка "".
        // if (query.searchNameTerm) отфильтрует это (так как пустая строка — это falsy),
        // и база не будет нагружена бесполезным поиском по пустому регулярному выражению.
        if (query.searchNameTerm) {
            filter.$or = filter.$or || [];
            filter.$or.push(
                {name: {$regex: query.searchNameTerm, $options: 'i'}}
            )
        }

        const blogs = await this.BlogModel.find(filter)
            .sort({[query.sortBy]: query.sortDirection})
            .skip(query.calculateSkip())
            .limit(query.pageSize);

        const totalCount = await this.BlogModel.countDocuments(filter);

        const items = blogs.map(BlogViewDto.mapToView);

        return PaginatedViewDto.mapToView({
            items: items,
            page: query.pageNumber,
            size: query.pageSize,
            totalCount: totalCount
        })
    }

    async getBlogByIdOrNotFoundFail(blogId: string): Promise<BlogViewDto> {
        const blog = await this.BlogModel.findOne({
            _id: blogId,
            deletedAt: null,
        });

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return BlogViewDto.mapToView(blog);
    }

    async ifBlogExistsOrNotFoundFail(blogId: string): Promise<boolean> {
        const count = await this.BlogModel.countDocuments({_id: blogId});

        return count > 0;
    }
}