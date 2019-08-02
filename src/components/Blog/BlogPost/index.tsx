import React, { Component } from "react";
import BlogSlice from '../BlogSlice';
import { RichText } from "../../../prismic-types";
import IBlogPost, { IBlogSlice } from "../../../models/blog_post";
import IAuthor from "../../../models/author";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";

interface IBlogPostProps {
    content: IBlogPost;
    author: IAuthor;
}

export default class BlogPost extends Component<IBlogPostProps, {}> {
    render() {
        const blogPost = this.props.content.data;
        return (
            <div>
                <h1 className={styles.postTitle}>{RichText.asText(blogPost.title)}</h1>
                <PostMetaData publishedDate={this.props.content.first_publication_date} author={this.props.author}/>
                {blogPost.body.map((slice: IBlogSlice, index: number) => {return (<BlogSlice content={slice} key={index} />)})}
            </div>
        )
    }
}