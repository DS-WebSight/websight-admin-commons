// Info: Contains containers with additional logic

import React from 'react';
import Spinner from '@atlaskit/spinner';
import { Resizable } from 're-resizable';

import { colors } from './theme.js';

export const LoadingWrapper = (props) => {
    const loadingWrapperStyle = {
        position: 'relative',
        pointerEvents: 'none',
        opacity: 0.6,
        filter: 'grayscale(50%)'
    }

    const loadingWrapperSpinnerStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
        ...props.spinnerStyle
    }

    const showSpinner = props.showSpinner || props.spinnerSize;
    const spinner = (
        <span style={loadingWrapperSpinnerStyle}>
            <Spinner size={props.spinnerSize} />
        </span>
    );
    return (
        <div style={props.isLoading ? loadingWrapperStyle : null}>
            {props.children}
            {props.isLoading && showSpinner && spinner}
        </div>
    );
}

export const ResizableWrapper = (props) => {
    let resizable;
    return (
        <Resizable
            ref={(element) => resizable = element}
            defaultSize={{
                width: '100%',
                height: props.size || '400px'
            }}
            minHeight={props.minHeight || 70}
            minWidth={'100%'}
            maxWidth={'100%'}
            maxHeight={props.maxHeight}
            enable={{
                bottom: true
            }}
            style={{
                paddingBottom: '15px'
            }}
            handleStyles={{
                bottom: {
                    height: '25px'
                }
            }}
            handleComponent={{
                bottom: (
                    <i style={{ display: 'flex', justifyContent: 'center', color: colors.grey }}
                        className='material-icons'>drag_handle</i>
                )
            }}
            onResize={props.onResize ? (event) => props.onResize(event, resizable) : undefined}
            onResizeStop={props.onResizeStop ? (event) => props.onResizeStop(event, resizable) : undefined}
        >
            {props.children}
        </Resizable>
    )
}
