// Info: Contains styled containers, without additional logic

import styled from 'styled-components';

import { colors } from './theme.js';

export const ConsoleContainer = styled.div`
    font-family: 'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', 'Menlo', 'Consolas', 'Courier', 'monospace';
    font-size: 11px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: normal;
    white-space: pre;
    color: ${colors.veryDarkGrey};
    background: ${colors.veryLightGrey};
    box-sizing: border-box;
    width: 100%;
    height: 240px;
    margin-bottom: 30px;
    padding: 10px 8px;
    border-bottom: 1px solid #ebecf0;
    border-spacing: 2px 2px;
    overflow-y: auto;
`;

export const FilterOptionsContainer = styled.div`
    flex: 0 0 300px;
    margin-right: 8px;
`;

export const FilterPatternContainer = styled.div`
    flex: 0 0 200px;
    margin-right: 8px;
`;

export const FilterSortByContainer = styled.div`
    flex: 0 0 200px;
    margin-right: 8px;
`;

export const HeaderFiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
`;

export const NoTableDataContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px;
`;

export const PageContentContainer = styled.div`
    display: block;
    padding: 0 40px 60px;
    min-height: 600px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

export const TableRowActionButtonsContainer = styled.div`
    display: flex;
    alignItems: center;
`;

export const TableTopAlignedContainer = styled.div`
    div[class^="styled__Cell"] {
        align-items: normal;
    }
`;
