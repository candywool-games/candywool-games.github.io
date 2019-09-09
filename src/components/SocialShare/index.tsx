import React, { Component } from "react";
import styles from './index.module.scss';
import { FacebookShareButton, TwitterShareButton, RedditShareButton, EmailShareButton } from 'react-share';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISocialShareProps {
    url: string;
    title: string;
}

export default class BlogPost extends Component<ISocialShareProps, {}> {

    render() {
        return (
            <div className={styles.shareButtons}>
                Share:
                <FacebookShareButton url={this.props.url}>
                    <FontAwesomeIcon
                                icon={['fab', 'facebook-f']}
                            />
                </FacebookShareButton>
                <TwitterShareButton url={this.props.url} title={this.props.title}>
                    <FontAwesomeIcon 
                                icon={['fab', 'twitter']}
                            />
                </TwitterShareButton>
                <RedditShareButton url={this.props.url} title={this.props.title}>
                    <FontAwesomeIcon 
                                icon={['fab', 'reddit-alien']}
                            />
                </RedditShareButton>
                <EmailShareButton url={this.props.url} subject={this.props.title}>
                    <FontAwesomeIcon 
                                icon={['fas', 'envelope']}
                            />
                </EmailShareButton>
            </div>
        )
    }
}