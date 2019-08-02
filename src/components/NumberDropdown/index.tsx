import React, { Component } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import styles from './index.module.scss';

interface IDropdownProps {
    currentSelected: number;
    options: number[];
    onChange: (newNumber: number) => void;
}

interface IDropdownState {
    currentSelected: number;
}

export default class NumberDropdown extends Component<IDropdownProps, IDropdownState> {
    constructor(props: IDropdownProps){
        super(props);

        this.state = {
            currentSelected: props.currentSelected
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <span>Posts per page</span>
                <Form.Control as="select" className={`${styles.dropdown} ml-2`} onChange={this.onChangeEvent} value={this.state.currentSelected.toString()}>
                    {this.props.options.map(this.renderOption, this)}
                </Form.Control>
            </div>
        )
    }

    renderOption(option: number){
        return (
            <option key={option}>{option}</option>
        );
    }

    onChangeEvent = (event: React.FormEvent<FormControlProps>) => {
        const value = event.currentTarget.value;
        if(!value){
            return;
        }

        const numberValue = parseInt(value);
        this.setState({ currentSelected: numberValue });
        this.props.onChange(numberValue)
    }
}