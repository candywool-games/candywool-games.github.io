import { prismicClient } from '../../utilities/prismic-configuration';
import Prismic from 'prismic-javascript';
import IBlogPost from '../../models/blog_post';

interface IGetBlogPostsResponse {
    total_pages: number;
    results: IBlogPost[];
}

export default class GetBlogPostsGateway {
    async Execute(page: number = 1, pageSize: number = 20) : Promise<IGetBlogPostsResponse> {
        const response = await prismicClient.query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            { 
                orderings: '[document.first_publication_date desc]',
                pageSize: pageSize,
                page: page
            }
        );

        return response;
    }
}