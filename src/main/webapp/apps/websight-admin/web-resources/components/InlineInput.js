import React from 'react';
import InlineEdit from '@atlaskit/inline-edit';
import TextField from '@atlaskit/textfield';
import styled from 'styled-components';

import { colors } from 'websight-admin/theme';

const ReadViewContainer = styled.div`
    border-radius: 3px;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 5px;
    text-overflow: ellipsis;
`;

export default class InlineInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            prevPropsValue: null
        }
        this.onChange = this.onChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { value, prevPropsValue } = state;
        const propsValue = props.value;
        let newValue = {};
        if (propsValue !== value && propsValue !== prevPropsValue) {
            newValue = { value: propsValue }
        }
        return {
            prevPropsValue: propsValue,
            ...newValue
        }
    }

    onChange(value) {
        this.setState(
            { value: value },
            this.props.onValueChange(value)
        )
    }

    render() {
        return (
            <InlineEdit
                readViewFitContainerWidth={true}
                hideActionButtons={true}
                defaultValue={this.props.value}
                editView={(fieldProps) =>
                    <TextField
                        {...fieldProps}
                        value={this.state.value}
                        autoFocus
                        onChange={event => this.onChange(event.target.value)}
                        isCompact={true}
                    />
                }
                readView={() => {
                    const readContent = this.props.value
                        ? this.props.value
                        : (this.props.placeholder
                            ? <div style={{ color: colors.grey }}><i>{this.props.placeholder}</i></div>
                            : '');
                    return (
                        <ReadViewContainer style={{ maxWidth: this.props.maxWidth || '100%' }}>
                            {readContent}
                        </ReadViewContainer>
                    );
                }}
                onConfirm={() => {
                    // Do nothing. Changes are handled in TextField component.
                }}
            />
        )
    }

}
