import React from 'react';
import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import styled from 'styled-components';

import { colors } from './theme.js'

export const TableRowActionButton = (props) => {
    const iconStyle = {
        fontSize: '16px',
        padding: '8px'
    };

    const icon = (
        <i
            className={props.iconClassName || 'material-icons'}
            style={iconStyle}
        >
            {props.iconName}
        </i>
    );

    return (
        <Tooltip content={props.tooltipContent} delay={0}>
            <Button
                iconBefore={icon}
                spacing='none'
                style={{ marginRight: '5px' }}
                {...props}
            />
        </Tooltip>
    )
}

export const ClearButton = (props) => {
    const Container = styled.button`
        border: none;
        display: flex;
        background-color: inherit;
        cursor: pointer;
        align-items: center;
        text-align: center;
        padding: 0px;
        border-radius: 50%;
    `;

    const Icon = styled.i`
        color: ${colors.grey}; 
        font-size: 16px;
        padding: 0 4px;

        &:hover {
            color: ${colors.black};
        }
    `;

    return (
        props.isVisible ?
            <Container onClick={props.onClick}>
                <Icon className='material-icons'>cancel</Icon>
            </Container> :
            <></>
    );
}