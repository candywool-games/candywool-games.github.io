import React, { Component } from "react";
import BlogSlice from '../BlogSlice';
import { RichText } from "../../../prismic-types";
import { IBlogPost, IBlogSlice } from "../../../models/blog_post";
import styles from './index.module.scss';
import PostMetaData from "../PostMetaData";
import IRouteParams from './../../../models/router/index';
import Loading from "../../Loading";
import GetBlogPostByUidGateway from './../../../gateways/GetBlogPostByUid';
import { Redirect, Link } from "react-router-dom";
import { DiscussionEmbed } from 'disqus-react';
import { Button } from 'react-bootstrap';
import { IDisqusInfo, DisqusInfo } from './../../../utilities/disqus-config';
import FeaturedImage from "../FeaturedImage";

interface IUrlParams {
    postId: string;
}

interface IBlogPostState {
    loading: boolean;
    blogPost?: IBlogPost;
    displayComments: boolean;
    disqusConfig: IDisqusInfo;
}

export default class BlogPost extends Component<IRouteParams<IUrlParams>, IBlogPostState> {
    readonly getBlogPost : GetBlogPostByUidGateway;

    constructor(props: IRouteParams<IUrlParams>){
        super(props);
        
        this.getBlogPost = new GetBlogPostByUidGateway();

        this.state = {
            loading: true,
            displayComments: true,
            disqusConfig: new DisqusInfo("", "", "")
        }
    }

    async componentDidMount() {
        const blogPostId = this.props.match.params.postId;
        const post = await this.getBlogPost.Execute(blogPostId);

        const postTitle : string = RichText.asText(post.data.title);
        const disqusConfig = new DisqusInfo(this.props.location.pathname, blogPostId, postTitle);

        this.setState({blogPost: post, loading: false, disqusConfig: disqusConfig})
    }

    render() {
        if(this.state.loading){
            return <Loading />;
        }

        const blogPost = this.state.blogPost;
        if(!blogPost){
            return <Redirect to="/blog"/>;
        }

        const metaData = (
            <PostMetaData 
                publishedDate={blogPost.first_publication_date} 
                author={blogPost.data.post_author}
            />
        );

        return (
            <>  
                <Link to="/blog"><Button className={styles.backButton} variant="primary">Back</Button></Link>
                <FeaturedImage image={blogPost.data.featured_image} />
                <h1 className={styles.postTitle}>{RichText.asText(blogPost.data.title)}</h1>
                {metaData}
                <div className={styles.postWrapper}>
                    { blogPost.data.body.map((slice: IBlogSlice, index: number) => {return (<BlogSlice content={slice} key={index} />)})}
                </div>
                {/* Have an about the author section */}
                {/* <div className="mt-5">
                    <hr/>
                    {this.handleComments()}
                </div> */}
            </>
        )
    }

    handleComments() {
        if(this.state.displayComments) {
            return this.getDiscussionThread();
        }

        return (
            <div className={styles.commentsButton}>
             <Button onClick={() => {this.setState({displayComments: true})}}>Load Comments</Button>
            </div>
        )
    }

    getDiscussionThread(){
        return (
            <DiscussionEmbed 
                shortname={this.state.disqusConfig.disqusShortName} 
                config={this.state.disqusConfig.config} />
        );
    }
}