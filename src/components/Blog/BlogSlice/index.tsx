import React, { Component } from "react";
import BlogImage from "../BlogImage";
import BlogEmbed from "../BlogEmbed";
import { RichText } from "../../../prismic-types";
import { IPrismicText, IBlogSlice } from "../../../models/blog_post";

interface IBlogSliceProps {
    content: IBlogSlice;
}

export default class BlogSlice extends Component<IBlogSliceProps, {}> {
    render() {
        const slice = this.props.content;
        switch(slice.slice_type){
            case "text":
                return this.renderText(slice.primary.text);
            case "image":
                return <BlogImage image={slice.primary.image} caption={slice.primary.caption} />
            case "quote":
                return this.renderQuote(slice.primary.quote);
            case "embed":
                return <BlogEmbed content={slice.primary.embedded_content} caption={slice.primary.caption}/>
        }
    }

    renderText(text?: IPrismicText[]){
        if(!text){
            return;
        }

        return (
            <RichText render={text} />
        );
    }

    renderQuote(text?: IPrismicText[]) {
        if(!text){
            return;
        }

        return (
            <blockquote className="blockquote text-right">
                <RichText render={text} />
            </blockquote>
        );
    }
}