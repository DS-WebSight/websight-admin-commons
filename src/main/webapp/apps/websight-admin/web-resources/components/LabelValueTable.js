import React from 'react';
import styled from 'styled-components';

import { colors } from '../theme.js';

const TableContainer = styled.div`
    display: block;
    margin: 20px 0 0;
    width: 100%;
`;

const EntryContainer = styled.div`
    margin: 10px 0 0 20px;
`;

const LabelContainer = styled.span`
    display: inline-block;
    color: ${colors.darkGrey};
    padding: 0 5px 0 0;
    width: 100px;
    text-align: right;
    vertical-align: top;
`;

const ValueContainer = styled.div`
    display: inline-block;
`;

const LabelValueTable = (props) => {
    const { data, labelWidth, skipEmptyValues } = props;
    const actualLabelWidth = labelWidth || '100px';
    const actualValueWidth = `calc(100% - ${actualLabelWidth} - 5px)`;
    return (
        <TableContainer>
            {
                data.map((entry) =>
                    ((skipEmptyValues && !entry.value)
                        ? ''
                        : (
                            <EntryContainer>
                                <LabelContainer style={{ width: actualLabelWidth }}>{entry.label}:</LabelContainer>
                                <ValueContainer style={{ width: actualValueWidth }}>{entry.value}</ValueContainer>
                            </EntryContainer>
                        ))
                )
            }
        </TableContainer>
    )
}

export default LabelValueTable;