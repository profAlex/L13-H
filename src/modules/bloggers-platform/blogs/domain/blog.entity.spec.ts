import {Blog} from "./blog.entity";

describe('Blog Entity', () => {
    it('should set deletedAt when makeDeleted is called', () => {
        // 1. Arrange
        const blog = new Blog();
        blog.deletedAt = null;

        // 2. Act
        blog.makeDeleted();

        // 3. Assert
        expect(blog.deletedAt).toBeInstanceOf(Date);
    });

    it('should update name and description', () => {
        const blog = new Blog();
        blog.name = 'Old';

        blog.updateBlog({ name: 'New', description: 'Desc', websiteUrl: 'http://..' });

        expect(blog.name).toBe('New');
    });
});