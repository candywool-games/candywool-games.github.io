import { prismicClient } from '../../utilities/prismic-configuration';
import IAuthor from '../../models/author';

export default class GetAuthorsByIdGateway{
    async Execute(params: string[]) : Promise<IAuthor[]> {
        const response = await prismicClient.getByIDs(params, {});

        return response.results;
    }
}