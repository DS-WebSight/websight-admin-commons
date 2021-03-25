import React from 'react';
import Popup from '@atlaskit/popup';
import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';

export default class DropdownButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    render() {
        return (
            <Popup
                content={() => React.createElement(this.props.popupContent)}
                isOpen={this.state.isOpen}
                placement='bottom-start'
                onClose={() => this.setState({ isOpen: false })}
                trigger={triggerProps => (
                    <PrimaryDropdownButton
                        {...triggerProps}
                        isSelected={this.state.isOpen}
                        onClick={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
                    >
                        {this.props.label}
                    </PrimaryDropdownButton>
                )}
            />
        );
    }
}
