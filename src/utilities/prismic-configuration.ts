import Prismic from 'prismic-javascript';

const apiEndpoint = "https://oiseau.cdn.prismic.io/api/v2";
export const prismicClient = Prismic.client(apiEndpoint)
