import React, { Component } from "react";
import { RichText } from "../../../prismic-types";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";
import { IBlogPostPreview } from './../../../models/blog_post/index';
import { Link } from 'react-router-dom';
import FeaturedImage from './../FeaturedImage/index';
import { Button } from "react-bootstrap";

interface IBlogPostPreviewProps {
    content: IBlogPostPreview;
}

export default class BlogPostPreview extends Component<IBlogPostPreviewProps, {}> {
    render() {
        const blogPost = this.props.content.data;
        const url = `/blog/posts/${this.props.content.uid}`;
        return (
            <>
                <Link to={url}>
                    <FeaturedImage image={blogPost.featured_image} />
                    <h2 className={styles.postTitle}>{RichText.asText(blogPost.title)}</h2>
                </Link>
                <PostMetaData publishedDate={this.props.content.first_publication_date} author={this.props.content.data.post_author}/>
                <div className={styles.outline}>
                    <RichText render={blogPost.outline} />
                    <Link to={url}>
                        <Button variant="primary">View post</Button>
                    </Link>
                </div>
            </>
        )
    }
}