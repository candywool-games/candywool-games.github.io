import React, { Component } from 'react';
import styles from './index.module.scss';

export default class SiteLayout extends Component {
    render(){
        return (
            <div className={styles.contentWrapper}>
                {this.props.children}
            </div>
        )
    }
}