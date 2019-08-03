import React, { Component } from 'react';
import IBlogPost from '../../../models/blog_post';
import IAuthor from '../../../models/author';
import BlogPost from '../BlogPost';
import GetBlogPostsGateway from '../../../gateways/GetBlogPosts';
import GetAuthorsByIdGateway from '../../../gateways/GetAuthorsById';
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
    authors: IAuthor[];
}

export default class BlogHome extends Component<{}, IBlogHomeState> {
    private readonly getBlogPosts : GetBlogPostsGateway;
    private readonly getAuthorsById: GetAuthorsByIdGateway;

    constructor(props: {}){
        super(props);

        this.getBlogPosts = new GetBlogPostsGateway();
        this.getAuthorsById = new GetAuthorsByIdGateway();

        this.state = {
            isLoading: true,
            totalPages: 1,
            currentPage: 1,
            postsToDisplay: 10,
            blogPosts: [],
            authors: []
        }
    }

    async loadBlogPosts() : Promise<void> {
        const response = await this.getBlogPosts.Execute(this.state.currentPage, this.state.postsToDisplay);
        const blogPosts = response.results;

        let ids : string[] = [];
        blogPosts.forEach((post) => {
            ids.push(post.data.post_author.id);
        });

        const postAuthors = await this.getAuthorsById.Execute(ids);

        this.setState(
            {
                isLoading: false, 
                blogPosts: blogPosts, 
                authors: postAuthors, 
                totalPages: response.total_pages
            }
        );
    }

    async componentDidMount(){
        await this.loadBlogPosts();
    }

    findMatchingAuthor(blogPost: IBlogPost) : IAuthor {
        let returnValue = this.state.authors[0];
        this.state.authors.forEach((author : IAuthor) => {
            if(blogPost.data.post_author.id === author.id){
                returnValue = author;
            }
        });

        return returnValue;
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
                <BlogPost content={post} author={this.findMatchingAuthor(post)}/>
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