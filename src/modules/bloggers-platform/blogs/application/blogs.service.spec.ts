import {Test, TestingModule} from "@nestjs/testing";
import {BlogsService} from "./blogs.service";
import {BlogsCommandRepository} from "../infrastructure/blogs.command-repository";
import {getModelToken} from "@nestjs/mongoose";
import {Blog} from "../domain/blog.entity";
import {NotFoundException} from "@nestjs/common";

describe('BlogsService', () => {
    let service: BlogsService;

    const mockRepository = {
        getBlogDocumentById: jest.fn(),
        save: jest.fn(),
    };

    // Создаем мок для модели, даже если мы её не используем напрямую в тесте
    // Это нужно просто чтобы Nest смог "собрать" конструктор сервиса
    const mockBlogModel = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BlogsService,
                {
                    provide: BlogsCommandRepository,
                    useValue: mockRepository
                },
                {
                    // Это "ключ", под которым Nest ищет модель
                    provide: getModelToken(Blog.name),
                    // Это "значение", которое он подставит
                    useValue: mockBlogModel
                },
            ],
        }).compile();

        service = module.get<BlogsService>(BlogsService);

        jest.clearAllMocks();
    });

    it('deleteBlogById should find blog and call makeDeleted', async () => {
        // 1. Arrange
        const fakeBlog = { makeDeleted: jest.fn() }; // Фейковый документ блога
        mockRepository.getBlogDocumentById.mockResolvedValue(fakeBlog); // Говорим репозиторию вернуть фейк

        // 2. Act
        await service.deleteBlogById('some-id');

        // 3. Assert
        expect(mockRepository.getBlogDocumentById).toHaveBeenCalledWith('some-id');
        expect(fakeBlog.makeDeleted).toHaveBeenCalled();
        expect(mockRepository.save).toHaveBeenCalledWith(fakeBlog);
    });

    it('updateBlogById should update blog and call updateBlog', async () => {
        // arrange
        const someDto = {
            name: 'some-name',
            description: 'some description',
            websiteUrl: 'http://some-url.com',
        };
        const blogId = 'some-id';

        const fakeBlog = { updateBlog: jest.fn() };
        mockRepository.getBlogDocumentById.mockResolvedValue(fakeBlog); // говорим репозиторию зарезолвить фейковый блог

        // act
        await service.updateBlogById({blogId, ...someDto});

        // assert
        expect(mockRepository.getBlogDocumentById).toHaveBeenCalledWith('some-id');
        expect(fakeBlog.updateBlog).toHaveBeenCalledWith(someDto);
        expect(mockRepository.save).toHaveBeenCalledWith(fakeBlog);

    });

    it('updateBlogById should throw NotFoundException if blog exists', async () => {
        mockRepository.getBlogDocumentById.mockResolvedValue(null);
        const someDto = {
            name: 'some-name',
            description: 'some description',
            websiteUrl: 'http://some-url.com',
        };
        const blogId = 'some-id';


        await expect(service.updateBlogById({blogId, ...someDto})).rejects.toThrow(NotFoundException);
        expect(mockRepository.getBlogDocumentById).toHaveBeenCalledWith('some-id');
        expect(mockRepository.save).not.toHaveBeenCalled();
    });
});