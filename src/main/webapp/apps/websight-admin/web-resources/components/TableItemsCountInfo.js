import React from 'react';
import styled from 'styled-components';

import { colors } from '../theme.js';

const TableDetailsContainer = styled.div`
    font-size: 12px;
    color: ${colors.grey};
    margin: -8px 0 8px 3px;
`;

const TableItemsCountInfo = (props) => {
    const { isHidden, numberOfFoundItems = 0, itemName = 'item' } = props;
    if (isHidden) {
        return null;
    }
    return (
        <TableDetailsContainer style={{ ...props.style }}>
            Found {numberOfFoundItems} {itemName}{numberOfFoundItems !== 1 ? 's' : ''}
        </TableDetailsContainer>
    )
}

export default TableItemsCountInfo;