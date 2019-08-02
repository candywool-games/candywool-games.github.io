import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import styles from './index.module.scss';

interface IPageNumbersProps {
    className?: string,
    currentPage: number,
    totalPages: number,
    minimumPagesToDisplay: number;
    onUpdatePageNumber: (newPage: number) => void;
}

export default class PageNumbers extends Component<IPageNumbersProps, {}> {
    static defaultProps = {
        minimumPagesToDisplay: 5      
    }

    render() {
        let minimumPagesToDisplay = this.props.minimumPagesToDisplay;
        let currentPage = this.props.currentPage;
        let totalPages = this.props.totalPages;

        let items = [];

        if(minimumPagesToDisplay % 2 === 0){
            minimumPagesToDisplay++;
        }

        const half = (minimumPagesToDisplay-1) / 2;

        let firstPageToDisplay = currentPage-half;
        let lastPageToDisplay = currentPage+half;

        if(firstPageToDisplay < 1){
            firstPageToDisplay = 1;
        }

        if(lastPageToDisplay > totalPages) {
            lastPageToDisplay = totalPages;
        }

        for(let number = firstPageToDisplay; number <= lastPageToDisplay; number++){
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === currentPage}
                    onClick={this.pageChangeEvent}
                >
                    {number}
                </Pagination.Item>
            );
        }

        const isFirstPage = currentPage === 1;
        const isLastPage = currentPage === totalPages;
        return (
            <div className={`${styles.wrapper} ${this.props.className}`}>
                <Pagination>
                    <Pagination.First onClick={this.pageChangeEvent} disabled={isFirstPage}/>
                    <Pagination.Prev onClick={this.pageChangeEvent} disabled={isFirstPage}/>
                    {items}
                    <Pagination.Next onClick={this.pageChangeEvent} disabled={isLastPage}/>
                    <Pagination.Last onClick={this.pageChangeEvent} disabled={isLastPage}/>
                </Pagination>
            </div>
        );
    }

    pageChangeEvent = (event: React.MouseEvent) => {
        if(!event.currentTarget.textContent){
            return;
        }

        const text = event.currentTarget.textContent.toLowerCase();
        if(text.includes("current")){
            return;
        }

        let numberValue = parseInt(text);
        if(numberValue){
            this.props.onUpdatePageNumber(numberValue);
            return;
        }
        
        if(text.includes("first")){
            numberValue = 1;
        }
        else if (text.includes("previous")){
            numberValue = this.props.currentPage - 1;
        }
        else if(text.includes("next")){
            numberValue = this.props.currentPage + 1;
        }
        else if (text.includes("last")){
            numberValue = this.props.totalPages;
        }
        else {
            return;
        }

        this.props.onUpdatePageNumber(numberValue);
    }
}