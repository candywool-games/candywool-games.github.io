import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class NotFound extends Component {
    render(){
        return (
            <div className="text-center">
                <FontAwesomeIcon
                    size="7x"
                    icon={['far', 'frown']}
                    className="mb-4"
                />
                <h1>Page not found</h1>
            </div>
        )
    }
}
