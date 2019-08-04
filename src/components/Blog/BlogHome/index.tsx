import React, { Component } from 'react';
import IBlogPost from '../../../models/blog_post';
import BlogPost from '../BlogPost';
import GetBlogPostPreviewsGateway from '../../../gateways/GetBlogPostPreviews';
import Loading from './../../Loading/index';
import PageNumbers from '../../PageNumbers/index';
import NumberDropdown from '../../NumberDropdown';
import styles from './index.module.scss';

interface IBlogHomeState {
    isLoading: boolean;
    totalPages: number;
    currentPage: number;
    postsToDisplay: number;
    blogPosts: IBlogPost[];
}

export default class BlogHome extends Component<{}, IBlogHomeState> {
    private readonly getBlogPostPreviews : GetBlogPostPreviewsGateway;

    constructor(props: {}){
        super(props);

        this.getBlogPostPreviews = new GetBlogPostPreviewsGateway();

        this.state = {
            isLoading: true,
            totalPages: 1,
            currentPage: 1,
            postsToDisplay: 10,
            blogPosts: [],
        }
    }

    async loadBlogPosts() : Promise<void> {
        const response = await this.getBlogPostPreviews.Execute(this.state.currentPage, this.state.postsToDisplay);
        const blogPosts = response.results;

        this.setState(
            {
                isLoading: false, 
                blogPosts: blogPosts, 
                totalPages: response.total_pages
            }
        );
    }

    async componentDidMount(){
        await this.loadBlogPosts();
    }

    render() {
        if(this.state.isLoading){
            return <Loading />
        }

        var controls = this.renderControls();

        return (
            <>
                {controls}
                {this.state.blogPosts.map(this.renderBlogPost, this)}
                {controls}
            </>
        );
    }

    renderBlogPost(post: IBlogPost){
        return (
            <div key={post.id}>
                <BlogPost content={post}/>
                <hr/>
            </div>
        );
    }

    onUpdatePageNumber = (newPage: number) : void => {
        this.setState({currentPage: newPage, isLoading: true}, async () => {
            await this.loadBlogPosts();
        });
    }

    onUpdatePostsPerPage = (newNumber: number) : void => {
        const totalPages = Math.ceil(this.state.blogPosts.length/newNumber);
        let pageNumber = this.state.currentPage;
        if(pageNumber > totalPages){
            pageNumber = totalPages;
        }

        this.setState({postsToDisplay: newNumber, currentPage: pageNumber, isLoading: true}, async () => {
            await this.loadBlogPosts();
        })
    }

    renderControls() {
        const pagination = 
            <PageNumbers 
                totalPages={this.state.totalPages} 
                currentPage={this.state.currentPage} 
                onUpdatePageNumber={this.onUpdatePageNumber}
            />

        const postsPerPage =
            <NumberDropdown 
                currentSelected={this.state.postsToDisplay} 
                options={[1, 10, 20, 50, 100]} 
                onChange={this.onUpdatePostsPerPage} 
            />

        return (
            <div className={styles.controls}>
                {pagination}
                {postsPerPage}
            </div>
        )
    }
}