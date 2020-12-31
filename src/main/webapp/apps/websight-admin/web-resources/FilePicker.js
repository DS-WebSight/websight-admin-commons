import React from 'react';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';

export default class FilePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: null
        }
    }

    render() {
        return (
            <div>
                <input
                    type='file'
                    name={this.props.name}
                    accept={this.props.accept}
                    style={{ display: 'none' }}
                    ref={(element) => this.inputElement = element}
                    onChange={(event) => {
                        const file = event.target.files[0];
                        const fileName = file ? file.name : null;
                        this.setState({ fileName: fileName })
                        if (this.props.onChange) {
                            this.props.onChange(event);
                        }
                    }}
                />
                <TextField
                    placeholder={this.props.placeholder || ''}
                    value={this.props.fileName || this.state.fileName || ''}
                    isReadOnly
                    elemAfterInput={
                        <Button
                            onClick={() => this.inputElement.click()}
                            style={{
                                marginRight: '2px'
                            }}
                        >
                            Browse
                        </Button>
                    }
                />
            </div>
        )
    }
}