import React, { Component } from "react";
import styles from './index.module.scss';
import { RichText } from "../../../prismic-types";
import { IBlogPost, IBlogSlice } from "../../../models/blog_post";
import IRouteParams from './../../../models/router/index';
import { Redirect, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { IDisqusInfo, DisqusInfo } from './../../../utilities/disqus-config';
import GetBlogPostByUidGateway from './../../../gateways/GetBlogPostByUid';
import BlogSlice from '../BlogSlice';
import PostMetaData from "../PostMetaData";
import Loading from "../../Loading";
import FeaturedImage from "../FeaturedImage";
import CommentsSection from "../CommentsSection";
import SocialShare from "../../SocialShare";

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
            displayComments: false,
            disqusConfig: new DisqusInfo("", "", "")
        }
    }

    async componentDidMount() {
        const blogPostId = this.props.match.params.postId;
        const post = await this.getBlogPost.Execute(blogPostId);

        const postTitle : string = RichText.asText(post.data.title);
        const disqusConfig = new DisqusInfo(this.props.location.pathname, blogPostId, postTitle);

        this.setState (
            {
                blogPost: post, 
                loading: false, 
                disqusConfig: disqusConfig, 
            }
        );
    }

    onClickComments = () => {
        this.setState({displayComments: true});
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
                publishedDate={blogPost.data.published_date} 
                author={blogPost.data.post_author}
                disqusConfig={this.state.disqusConfig}
                onClickComments={this.onClickComments}
            />
        );

        const title = RichText.asText(blogPost.data.title);

        return (
            <>  
                <div>
                    <Link to="/blog"><Button className={styles.backButton} variant="primary">Back</Button></Link>
                </div>
                <FeaturedImage image={blogPost.data.featured_image} />
                <h1 className={styles.postTitle}>{title}</h1>
                {metaData}

                <SocialShare url={this.state.disqusConfig.config.url} title={title}></SocialShare>
                <hr/>

                <div className={styles.postWrapper}>
                    { blogPost.data.body.map((slice: IBlogSlice, index: number) => {return (<BlogSlice content={slice} key={index} />)})}
                </div>
                {/* Have an about the author section */}
                <div className="mt-5">
                    <hr/>
                    <CommentsSection 
                        disqusConfig={this.state.disqusConfig} 
                        history={this.props}
                        shouldDisplay={this.state.displayComments}/>
                </div>
            </>
        )
    }
}