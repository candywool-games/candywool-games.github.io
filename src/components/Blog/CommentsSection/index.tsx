import React, { Component } from 'react';
import styles from './index.module.scss';
import { Button } from 'react-bootstrap';
import { DiscussionEmbed } from 'disqus-react';
import { RouteProps } from 'react-router';
import { IDisqusInfo } from './../../../utilities/disqus-config';
import QueryString from 'query-string';

interface ICommentsSectionProps {
    disqusConfig: IDisqusInfo;
    history: RouteProps;
}

interface ICommentsSectionState {
    displayComments: boolean;
    commentsAnchor: boolean;
    diqusLoadObserver: MutationObserver;
}

export default class CommentsSection extends Component<ICommentsSectionProps, ICommentsSectionState> {
    constructor(props: ICommentsSectionProps){
        super(props);

        const diqusLoadObserver = new MutationObserver(this.disqusLoadCallback);

        this.state = {
            displayComments: false,
            commentsAnchor: false,
            diqusLoadObserver: diqusLoadObserver
        }
    }

    componentDidMount()
    {
        const location = this.props.history.location;
        if(!location){
            return;
        }

        const hashes = QueryString.parse(location.hash);
        const displayComments = "disqus_thread" in hashes;

        this.setState({commentsAnchor: displayComments, displayComments: displayComments}, this.setupObserver);
    }

    setupObserver(){
        const config = { attributes: false, childList: true, subtree: false };
        const element = document.getElementById("disqus_thread");
        element && this.state.diqusLoadObserver.observe(element, config);
        this.scrollToComments();
    }

    scrollToComments() {
        if(!this.state.commentsAnchor){
            return;
        }
        
        const element = document.getElementById("disqus_thread");
        element && element.scrollIntoView();
    }

    render() {
        if(this.state.displayComments) {
            return this.renderDiscussionThread();
        }
    
        return (
            <div className={styles.commentsButton}>
                <Button onClick={() => {this.setState({displayComments: true})}}>Load Comments</Button>
            </div>
        )
    }

    renderDiscussionThread(){
        return (
            <DiscussionEmbed
                shortname={this.props.disqusConfig.disqusShortName} 
                config={this.props.disqusConfig.config} />
        );
    }

    disqusLoadCallback = (mutationsList: any, observer: any) => {
        for(let mutation of mutationsList) {
            mutation.addedNodes.forEach((element: any) => {
                if(element.name && element.name.includes("indicator-south")){
                    //Disqus component has finished loading
                    this.scrollToComments();
                    this.state.diqusLoadObserver.disconnect();
                    return;
                }
            });
        }
    }
}