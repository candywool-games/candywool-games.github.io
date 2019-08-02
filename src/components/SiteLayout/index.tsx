import React, { Component } from 'react';
import styles from './index.module.scss';

export default class SiteLayout extends Component {
    render(){
        return (
            <div>
                <div className={styles.header}>
                    Oiseau
                </div>
                <div className={styles.contentWrapper}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}