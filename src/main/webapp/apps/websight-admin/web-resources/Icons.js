import React from 'react';

import { colors } from './theme.js'

export const AvatarIcon = (props) => {
    const iconStyle = {
        color: colors.white,
        background: colors.lightGrey,
        borderRadius: '5px',
        padding: '5px'
    };

    return <i className='material-icons' style={iconStyle} {...props}>{props.children}</i>;
}

export const NavigationItemIcon = (props) => {
    const iconStyle = {
        color: colors.grey
    };

    return <i className='material-icons' style={iconStyle} {...props}>{props.children}</i>;
}

export const FilterPatternIcon = (props) => {
    const iconStyle = {
        color: colors.darkGrey,
        fontSize: '18px',
        paddingLeft: '6px',
        verticalAlign: 'sub'
    };

    return <i className='material-icons' style={iconStyle} {...props}>{props.children}</i>;
};

export const ResourceIcon = (props) => {
    const { style, isFolder, isExpanded } = props;

    const iconStyle = {
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '18px',
        verticalAlign: 'sub',
        padding: '0 4px 0 0',
        margin: '2px 0'
    }

    let icon = {};

    if (isFolder) {
        isExpanded ?
            icon = { className: 'material-icons-outlined', iconName: 'folder_open' }
            :
            icon = { className: 'material-icons-outlined', iconName: 'folder' }
        ;
    } else {
        icon = { className: 'material-icons-outlined', iconName: 'insert_drive_file' }
    }

    return <i className={icon.className} style={{ ...iconStyle, ...style }} {...props}>{icon.iconName}</i>
};

export const SelectTagIcon = (props) => {
    const iconStyle = {
        fontSize: '10px',
        verticalAlign: 'middle',
        paddingRight: '3px'
    };

    return <i className='material-icons' style={iconStyle} {...props}>{props.children}</i>;
};

export const TabIcon = (props) => {
    const iconStyle = {
        fontSize: '20px',
        verticalAlign: 'sub',
        margin: '0 5px 0 0'
    }

    return <i className='material-icons' style={iconStyle}  {...props}>{props.children}</i>;
}

export const TagIcon = (props) => {
    const iconStyle = {
        fontSize: '14px',
        padding: '3px 2px 4px 3px',
        verticalAlign: 'middle'
    };

    return <i className='material-icons' style={iconStyle} {...props}>{props.children}</i>;
};

export const TreeIcon = (props) => {
    const iconStyle = {
        cursor: 'pointer',
        fontSize: '18px',
        verticalAlign: 'sub',
        padding: '0 4px 0 0',
        margin: '2px 0'
    }

    return <i className='material-icons' style={iconStyle} {...props}>{props.children}</i>;
}