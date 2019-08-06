import React, { Component } from 'react';
import { Image, Badge } from 'react-bootstrap';
import IAuthor from '../../../models/author';
import styles from './index.module.scss';
import dateFormatter from '../../../utilities/date-formatter';
import IImage from '../../../models/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommentCount } from 'disqus-react';
import { IDisqusInfo } from '../../../utilities/disqus-config';
import { Link } from 'react-router-dom';

interface IPostMetaDataProps {
    publishedDate: string | null;
    author: IAuthor;
    disqusConfig?: IDisqusInfo;
    onClickComments?: () => void;
}

export default class PostMetaData extends Component<IPostMetaDataProps, {}> {
    private readonly roles : string[];
    private readonly firstPublished : string;
        
    constructor(props: IPostMetaDataProps){
        super(props);

        this.roles = this.props.author.data.role.split(',');
        this.firstPublished = dateFormatter(this.props.publishedDate);
    }

    render() {
        const author = this.props.author.data;

        return (
            <div className={styles.metaData}>
                {this.renderAvatar(author.avatar)}
                <span>
                    By {author.name} on {this.firstPublished}
                    <br/>
                    <span className="d-block d-md-inline">
                        {this.roles.map(this.renderRoleBadge)}
                    </span>
                    {this.renderCommentCount()}
                </span>
            </div>
        );
    }
    
    renderAvatar(image: IImage) {
        if(image && image.url){
            return (
                <Image 
                    className={styles.avatar} 
                    src={image.url} 
                    alt={image.alt} 
                    roundedCircle 
                />
            );
        }

        return (
            <span className={styles.avatar}>
                <FontAwesomeIcon
                    className={styles.avatarPlaceholder}
                    icon={['fas', 'user-circle']}
                />
            </span>
        );
    }
    
    renderRoleBadge(role: string, index: number) {
        return <Badge key={index} className="mr-1" variant="primary">{role}</Badge>
    }

    renderCommentCount(){
        if(!this.props.disqusConfig){
            return null;
        }

        return (
            <div className="mt-1">
                <Link to={`/blog/posts/${this.props.disqusConfig.config.identifier}#disqus_thread`} onClick={this.props.onClickComments}>
                    <CommentCount 
                        shortname={this.props.disqusConfig.disqusShortName} 
                        config={this.props.disqusConfig.config}
                    />
                </Link>
            </div>
        )
    }
}