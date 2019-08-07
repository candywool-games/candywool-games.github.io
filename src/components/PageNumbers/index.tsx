import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import styles from './index.module.scss';

interface IPageNumbersProps {
    className?: string,
    currentPage: number,
    totalPages: number,
    onUpdatePageNumber: (newPage: number) => void;
}

interface IPageNumbersState {
    numbers: number[];
}

export default class PageNumbers extends Component<IPageNumbersProps, IPageNumbersState> {
    readonly pagesToDisplay = 5;

    constructor(props: IPageNumbersProps){
        super(props);

        this.state = {
            numbers: []
        }
    }

    componentDidMount() {
        this.setNumberArray();
    }

    setNumberArray() {
        //Feels like this method could be better
        const pagesToDisplay = this.pagesToDisplay
        const currentPage = this.props.currentPage;
        const totalPages = this.props.totalPages;

        const half = (pagesToDisplay-1) / 2;
        
        let firstPageToDisplay = currentPage-half;
        let lastPageToDisplay = currentPage+half;
        
        if(firstPageToDisplay < 1){
            firstPageToDisplay = 1;
            lastPageToDisplay = firstPageToDisplay + pagesToDisplay;
        }

        if (lastPageToDisplay > totalPages) {
            lastPageToDisplay = totalPages;
        }

        if(lastPageToDisplay - pagesToDisplay > 1) {
            firstPageToDisplay = lastPageToDisplay - pagesToDisplay;
        }
        else {
            firstPageToDisplay = 1;
        }

        let numbers : number[] = [];
        for(let i = firstPageToDisplay; i <= lastPageToDisplay; i++){
            numbers.push(i);
        }

        this.setState({ numbers:  numbers })
    }

    render() {
        const isFirstPage = this.props.currentPage === 1;
        const isLastPage = this.props.currentPage === this.props.totalPages;
        return (
            <div className={`${styles.wrapper} ${this.props.className}`}>
                <Pagination >
                    <Pagination.First onClick={this.pageChangeEvent} disabled={isFirstPage}/>
                    <Pagination.Prev onClick={this.pageChangeEvent} disabled={isFirstPage}/>
                    {this.state.numbers.map(this.renderPageNumber, this)}
                    <Pagination.Next onClick={this.pageChangeEvent} disabled={isLastPage}/>
                    <Pagination.Last onClick={this.pageChangeEvent} disabled={isLastPage}/>
                </Pagination>
            </div>
        );
    }

    renderPageNumber(number: number) {
        return (
            <Pagination.Item 
                key={number} 
                active={number === this.props.currentPage}
                onClick={this.pageChangeEvent}
            >
                {number}
            </Pagination.Item>
        )
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