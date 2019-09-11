import React, { Component } from "react";
import { CardGroup, Card } from "react-bootstrap";
import styles from './index.module.scss';
import { Link } from "react-router-dom";
import GetFeaturedPostsGateway from "../../../gateways/GetFeaturedPosts";
import { RichText } from "../../../prismic-types";
import { IFeaturedPost } from './../../../models/featured_posts/index';

interface IFeaturedPostsState {
    posts?: IPosts;
}

interface IPosts {
    post_1: IFeaturedPost;
    post_2: IFeaturedPost;
    post_3: IFeaturedPost;
}

export default class FeaturedPosts extends Component<{}, IFeaturedPostsState> {
    private readonly getFeaturedPosts : GetFeaturedPostsGateway;

    constructor(props: {}){
        super(props);

        this.getFeaturedPosts = new GetFeaturedPostsGateway();

        this.state = {}
    }

    async loadFeaturedPosts() : Promise<void> {
        const response = await this.getFeaturedPosts.Execute();
        this.setState({
            posts: {
                post_1: response.data.post_1,
                post_2: response.data.post_2,
                post_3: response.data.post_3
            }
        })
    }

    async componentDidMount() {
        await this.loadFeaturedPosts();
    }

    render() {
        if(!this.state.posts){
            return null;
        }

        const posts = this.state.posts;

        return (
            <CardGroup className={styles.wrapper}>
                {this.renderCard(posts.post_1)}
                {this.renderCard(posts.post_2)}
                {this.renderCard(posts.post_3)}
            </CardGroup>
        );
    }

    renderCard(post: IFeaturedPost){
        if(!post.uid || !post.data){
            return null;
        }

        return (
            <Card className={styles.card}>
                <Link to={`/blog/posts/${post.uid}`} className={styles.image}>
                    <Card.Img src={post.data.featured_image.url} alt={post.data.featured_image.alt} className={styles.image}/>
                    <Card.ImgOverlay>
                        <Card.Title className={styles.title}>{RichText.asText(post.data.title)}</Card.Title>
                    </Card.ImgOverlay>
                </Link>
            </Card>
        );
    }
}