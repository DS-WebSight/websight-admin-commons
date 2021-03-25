import React from 'react';
import { colors as atlaskitColors } from '@atlaskit/theme';
import styled from 'styled-components';

import { colors } from '../theme.js';

const Item = styled.a`
    margin: 8px;
    padding: 16px 24px;
    background-color: ${colors.white};
    color: ${colors.black};
    cursor: pointer;
    text-decoration: none;
    border-radius: 3px;
    width: 300px;
    box-shadow: ${atlaskitColors.N50A} 0px 1px 1px, ${atlaskitColors.N50A} 0px 0px 0.5px 0px;
    animation: 0.6s cubic-bezier(0.15, 1, 0.33, 1) 0.5s 1 normal forwards running fGLASt;
    transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1) 0s;
    
    &:hover {
        color: ${colors.black};
        text-decoration: none;
        outline: none;
        box-shadow: ${atlaskitColors.N60A} 0px 4px 8px -2px, ${atlaskitColors.N50A} 0px 0px 1px;
        transform: translateY(-2px);
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const AppIcon = styled.i`
    background: ${colors.darkBlue};
    color: ${colors.white}
    border-radius: 2px;
    padding: 4px 4px 4px 5px;
    height: 16px;
    width: 16px;
    font-size: 16px;
`;

const Description = styled.div`
    margin-top: 12px;
`;

const Title = styled.p`
    margin: 0 0 0 10px;
    font-weight: 500;
`;

export default class MenuItem extends React.Component {
    render() {
        const { title, img, color, description, href } = this.props;

        return (
            <Item href={href}>
                <Header>
                    <AppIcon className='material-icons-outlined' style={{ backgroundColor: color }}>{img}</AppIcon>
                    <Title>{title}</Title>
                </Header>
                <Description>
                    {description}
                </Description>
            </Item>
        );
    }
}