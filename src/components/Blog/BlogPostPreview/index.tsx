import React, { Component } from "react";
import { RichText } from "../../../prismic-types";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";
import { IBlogPostPreview } from './../../../models/blog_post/index';

interface IBlogPostProps {
    content: IBlogPostPreview;
}

export default class BlogPost extends Component<IBlogPostProps, {}> {
    render() {
        const blogPost = this.props.content.data;
        return (
            <>
                <h1 className={styles.postTitle}>{RichText.asText(blogPost.title)}</h1>
                <PostMetaData publishedDate={this.props.content.first_publication_date} author={this.props.content.data.post_author}/>
            </>
        )
    }
}