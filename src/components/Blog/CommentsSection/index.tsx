import React, { Component } from 'react';
import styles from './index.module.scss';
import { Button } from 'react-bootstrap';
import { DiscussionEmbed } from 'disqus-react';
import { RouteProps } from 'react-router';
import { IDisqusInfo } from './../../../utilities/disqus-config';
import QueryString from 'query-string';

interface ICommentsSectionProps {
    shouldDisplay: boolean;
    disqusConfig: IDisqusInfo;
    history: RouteProps;
}

interface ICommentsSectionState {
    displayComments: boolean;
    disqusLoadObserver: MutationObserver;
}

export default class CommentsSection extends Component<ICommentsSectionProps, ICommentsSectionState> {
    constructor(props: ICommentsSectionProps){
        super(props);
        const disqusLoadObserver = new MutationObserver(this.disqusLoadCallback);

        this.state = {
            displayComments: this.props.shouldDisplay,
            disqusLoadObserver: disqusLoadObserver
        }
    }

    componentDidMount()
    {
        this.handleAnchor();
    }

    componentDidUpdate(prevProps: ICommentsSectionProps) {
        if(!this.props.shouldDisplay){
            return;
        }

        if(!prevProps.shouldDisplay && !this.state.displayComments) {
            console.log("Load and scroll");
            this.handleAnchor();
            return;
        }

        console.log("Just scroll, already loaded");
        this.scrollToComments();
    }

    urlHasAnchorInHash() : boolean {
        const location = this.props.history.location;
        if(!location){
            return false;
        }

        const hashes = QueryString.parse(location.hash);
        return "disqus_thread" in hashes;
    }

    handleAnchor() {
        const displayComments = this.urlHasAnchorInHash();
        this.setState({displayComments: displayComments}, this.setupObserver);
    }

    setupObserver(){
        const config = { attributes: false, childList: true, subtree: false };
        const element = document.getElementById("disqus_thread");
        element && this.state.disqusLoadObserver.observe(element, config);
        this.scrollToComments();
    }

    scrollToComments() {
        if(!this.urlHasAnchorInHash()){
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
                    this.state.disqusLoadObserver.disconnect();
                    return;
                }
            });
        }
    }
}