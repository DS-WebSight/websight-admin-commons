import React from 'react';
import styled from 'styled-components';

import { colors } from '../theme.js';

const OuterContainer = styled.div`
    display: inline-block;
    box-sizing: border-box;
`;

const InnerContainer = styled.span`
    display: flex;
    border-radius: 3px;
    background-color: ${colors.veryLightGrey};
    color: ${colors.veryDarkGrey};
    height: auto;
    margin: 4px 4px;
    padding: 0 4px;
`;

const ContentContainer = styled.span`
    max-width: fit-content;
    white-space: normal;
    font-size: 12px;
    font-weight: normal;
    line-height: 1;
    padding: 3px 2px;
`;

const ContentTag = (props) => {
    const { children } = props;
    return (
        <OuterContainer>
            <InnerContainer>
                <ContentContainer>
                    {children}
                </ContentContainer>
            </InnerContainer>
        </OuterContainer>
    )
}

export default ContentTag;