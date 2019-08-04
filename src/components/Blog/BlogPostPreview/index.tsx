import React, { Component } from "react";
import { RichText } from "../../../prismic-types";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";
import { IBlogPostPreview } from './../../../models/blog_post/index';
import { Link } from 'react-router-dom';

interface IBlogPostPreviewProps {
    content: IBlogPostPreview;
}

export default class BlogPostPreview extends Component<IBlogPostPreviewProps, {}> {
    render() {
        const blogPost = this.props.content.data;
        return (
            <>
                <Link to={`/blog/posts/${this.props.content.uid}`}>
                    <h1 className={styles.postTitle}>{RichText.asText(blogPost.title)}</h1>
                </Link>
                <PostMetaData publishedDate={this.props.content.first_publication_date} author={this.props.content.data.post_author}/>
            </>
        )
    }
}