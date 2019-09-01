import React, { Component } from "react";
import { RichText } from "../../../prismic-types";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";
import { IBlogPostPreview } from './../../../models/blog_post/index';
import { Link } from 'react-router-dom';
import FeaturedImage from './../FeaturedImage/index';
import { Button } from "react-bootstrap";
import { IDisqusInfo, DisqusInfo } from "../../../utilities/disqus-config";

interface IBlogPostPreviewProps {
    content: IBlogPostPreview;
}

export default class BlogPostPreview extends Component<IBlogPostPreviewProps, {}> {
    readonly url: string;
    readonly title: string;
    readonly disqusConfig : IDisqusInfo;

    constructor(props: IBlogPostPreviewProps){
        super(props);

        const uid = this.props.content.uid || "";
        this.url = `/blog/posts/${uid}`;
        this.title = RichText.asText(this.props.content.data.title);
        this.disqusConfig = new DisqusInfo(
            this.url,
            uid,
            this.title
        );
    }


    render() {
        const blogPost = this.props.content.data;
        return (
            <>
                <Link to={this.url}>
                    <FeaturedImage image={blogPost.featured_image} />
                    <h2 className={styles.postTitle}>{this.title}</h2>
                </Link>
                <PostMetaData 
                    publishedDate={blogPost.published_date} 
                    author={blogPost.post_author}
                    disqusConfig={this.disqusConfig}
                />
                <div className={styles.outline}>
                    <RichText render={blogPost.outline} />
                    <Link to={this.url}>
                        <Button variant="primary">View post</Button>
                    </Link>
                </div>
            </>
        )
    }
}