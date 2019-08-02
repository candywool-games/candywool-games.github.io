import React, { Component } from "react";
import styles from './index.module.scss';
import { IPrismicText, IEmbeddedContent } from "../../../models/blog_post";
import BlogContentCaption from "../BlogContentCaption";

interface IBlogEmbedProps {
    content?: IEmbeddedContent;
    caption?: IPrismicText[];
}

export default class BlogEmbed extends Component<IBlogEmbedProps, {}> {
    render() {
        if(!this.props.content){
            return;
        }

        return (
            <blockquote className={`blockquote ${styles.embedWrapper}`}>
                <div className={styles.h_iframe}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.content.html }} />
                </div>
                <BlogContentCaption caption={this.props.caption} />
            </blockquote>
        );
    }
}