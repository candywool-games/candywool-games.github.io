import React, { Component } from "react";
import BlogSlice from '../BlogSlice';
import { RichText } from "../../../prismic-types";
import dateFormatter from '../../../utilities/date-formatter';
import IBlogPost, { IBlogSlice } from "../../../models/blog_post";
import IAuthor from "../../../models/author";
import { Image, Badge } from 'react-bootstrap';
import styles from './index.module.scss';

interface IBlogPostProps {
    content: IBlogPost;
    author: IAuthor;
}

export default class BlogPost extends Component<IBlogPostProps, {}> {
    readonly firstPublished : string;
    readonly lastEdited? : string;

    constructor(props: IBlogPostProps){
        super(props);

        this.firstPublished = dateFormatter(this.props.content.first_publication_date);
        this.lastEdited = dateFormatter(this.props.content.last_publication_date);
    }

    render() {
        const blogPost = this.props.content.data;
        return (
            <div>
                <h1 className={styles.postTitle}>{RichText.asText(blogPost.title)}</h1>
                {this.renderPostMetadata(this.props.author)}
                {blogPost.body.map((slice: IBlogSlice, index: number) => {return (<BlogSlice content={slice} key={index} />)})}
            </div>
        )
    }

    renderPostMetadata(authorInfo: IAuthor) {
        const author = authorInfo.data;
        const roles = author.role.split(',');

        return (
            <div className={styles.metaData}>
                <span>
                    <Image className={styles.avatar} src={author.avatar.url} alt={author.avatar.alt} roundedCircle />
                </span>
                <span>
                    By {author.name} on {this.firstPublished}
                    <br/>
                    <span className="d-block d-md-inline">
                        {roles.map(this.renderRoleBadge)}
                    </span>
                </span>
            </div>
        );
    }
    
    renderRoleBadge(role: string, index: number) {
        return <Badge key={index} className="mr-1" variant="primary">{role}</Badge>
    }
}