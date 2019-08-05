const disqusShortname = 'candywool-games';

export interface IDisqus {
    disqusShortName: string;
    config: IDisqusConfig;
}

interface IDisqusConfig {
    url: string;
    identifier: string;
    title: string;
}

export default class Disqus implements IDisqus {
    disqusShortName: string;
    config: IDisqusConfig;

    constructor(url: string, identifier: string, title: string){
        this.disqusShortName = disqusShortname;
        this.config = {
            url: url,
            identifier: identifier,
            title: title
        }
    }
}