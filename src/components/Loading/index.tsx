import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './index.module.scss';

export default class Loading extends Component {
    render(){
        return (
            <div className={`d-flex justify-content-center ${styles.margin}`}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }
}