const disqusShortname = 'candywool-games';

export interface IDisqusInfo {
    disqusShortName: string;
    config: IDisqusConfig;
}

export class DisqusInfo implements IDisqusInfo {
    disqusShortName: string;
    config: IDisqusConfig;

    constructor(url: string, identifier: string, title: string){
        this.disqusShortName = disqusShortname;
        this.config = {
            url: process.env["REACT_APP_SITE_URL"] + url,
            identifier: identifier,
            title: title
        }
    }
}

interface IDisqusConfig {
    url: string;
    identifier: string;
    title: string;
}
