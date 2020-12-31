import React from 'react';
import TextField from '@atlaskit/textfield';

import { FilterPatternIcon } from 'websight-admin/Icons';
import { ClearButton } from 'websight-admin/Buttons';

const ESC_KEY_CODE = 27;

/**
 Component to handle cases where both:
 <ul>
 <li>filter value can be changed by parent component</li>
 <li>filter input uses debounce</li>
 </ul>
 <p>
 This is problematic because input's value should be controlled and at the same time
 controlled value cannot be updated immediately because of debounce.
 </p>
 <p>
 To handle this case, component has its own temporary value and tries to figure out whether value given in props
 or value entered by user should be displayed.
 </p>
 */
export default class StatefulFilterInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            prevPropsValue: null
        }
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

    render() {
        const { value } = this.state;
        return (
            <TextField
                placeholder="Filter"
                isCompact
                elemBeforeInput={(
                    <FilterPatternIcon className='material-icons'>filter_list</FilterPatternIcon>
                )}
                elemAfterInput={(
                    <ClearButton
                        onClick={() => {
                            this.setState({ value: '' })
                            if (this.props.onClear) {
                                this.props.onClear();
                            }
                        }}
                        isVisible={value}
                    />
                )}
                onChange={(event) => {
                    const targetValue = event.target.value;
                    this.setState({ value: targetValue });
                    if (this.props.onChange) {
                        this.props.onChange(event);
                    }
                }}
                value={value || ''}
                onKeyUp={(event) => {
                    if (event.keyCode === ESC_KEY_CODE) {
                        if (this.props.onClear) {
                            this.props.onClear();
                        }
                    }
                }}
            />
        )
    }
}