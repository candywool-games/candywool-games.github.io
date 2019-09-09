import React, { Component } from "react";
import { CardGroup, Card } from "react-bootstrap";
import styles from './index.module.scss';
import { Link } from "react-router-dom";
import IImage from "../../../models/image";

export default class FeaturedPosts extends Component {
    render() {
        var image = {
            url: "https://oiseau.cdn.prismic.io/oiseau/0893b0b39ea56ada54e125f50817f92fe954d293_68372ab5d2507209f314f4a4a9674e00792dc905_7b---add-fields.png",
            alt: "Test",
            dimensions: {
                width: 20,
                height: 20
            }
        }

        return (
            <CardGroup className={styles.wrapper}>
                {this.renderCard("", image, "Card title")}
                {this.renderCard("", image, "Card title")}
                {this.renderCard("", image, "Card title")}
            </CardGroup>
        );
    }

    renderCard(postUrl: string, image: IImage, postTitle: string){
        return (
            <Card>
                <Link to={postUrl}>
                    <Card.Img variant="top" src={image.url} alt={image.alt} />
                    <Card.ImgOverlay>
                        <Card.Title className={styles.title}>{postTitle}</Card.Title>
                    </Card.ImgOverlay>
                </Link>
            </Card>
        );
    }
}