import React, { Component } from "react";
import BlogSlice from '../BlogSlice';
import { RichText } from "../../../prismic-types";
import { IBlogPost, IBlogSlice } from "../../../models/blog_post";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";
import IRouteParams from './../../../models/router/index';
import Loading from "../../Loading";
import GetBlogPostByUidGateway from './../../../gateways/GetBlogPostByUid';
import { Redirect } from "react-router-dom";
import Disqus from 'disqus-react';
import { Button } from 'react-bootstrap';
import DisqusConfig from '../../../utilities/disqus-config';

interface IUrlParams {
    postId: string;
}

interface IBlogPostState {
    loading: boolean;
    blogPost?: IBlogPost;
    displayComments: boolean;
}

export default class BlogPost extends Component<IRouteParams<IUrlParams>, IBlogPostState> {
    readonly getBlogPost : GetBlogPostByUidGateway;

    constructor(props: IRouteParams<IUrlParams>){
        super(props);
        
        this.getBlogPost = new GetBlogPostByUidGateway();

        this.state = {
            loading: true,
            displayComments: false
        }
    }

    async componentDidMount() {
        const blogPostId = this.props.match.params.postId;
        const post = await this.getBlogPost.Execute(blogPostId);

        this.setState({blogPost: post, loading: false})
    }

    render() {
        if(this.state.loading){
            return <Loading />;
        }

        const blogPost = this.state.blogPost;
        if(!blogPost){
            return <Redirect to="/blog"/>;
        }

        const metaData = <PostMetaData publishedDate={blogPost.first_publication_date} author={blogPost.data.post_author}/>;

        return (
            <>
                <h1 className={styles.postTitle}>{RichText.asText(blogPost.data.title)}</h1>
                {metaData}
                { blogPost.data.body.map((slice: IBlogSlice, index: number) => {return (<BlogSlice content={slice} key={index} />)})}
                {/* Have an about the author section */}
                <div className="mt-5">
                    <hr/>
                    {this.handleComments(blogPost)}
                </div>
            </>
        )
    }

    handleComments(blogPost: IBlogPost) {
        if(this.state.displayComments){
            const disqusConfig = new DisqusConfig(this.props.location.pathname, this.props.match.params.postId, blogPost.data.title[0].text);
            return <Disqus.DiscussionEmbed shortname={disqusConfig.disqusShortName} config={disqusConfig.config} />;
        }

        return (
            <div className={styles.commentsButton}>
             <Button onClick={() => {this.setState({displayComments: true})}}>Load Comments</Button>
            </div>
        )
    }
}