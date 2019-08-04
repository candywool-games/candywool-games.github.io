import IImage from "../image";
import IAuthor from "../author";

export default interface IBlogPost {
    id: string;
    first_publication_date: string | null;
    last_publication_date: string | null;
    data: {
        title: IPrismicText[];
        post_author: IAuthor;
        body: IBlogSlice[]
    }
}

export interface IBlogSlice {
    slice_type: string;
    slice_label?: string;
    primary: ISlicePrimary;
}

export interface ISlicePrimary {
    text?: IPrismicText[];
    quote?: IPrismicText[];
    image?: IImage;
    embedded_content?: IEmbeddedContent;
    caption?: IPrismicText[];
}

export interface IPrismicText {
    type: string;
    text: string;
}

export interface IEmbeddedContent {
    title: string;
    width: number;
    height: number;
    html: string;
}