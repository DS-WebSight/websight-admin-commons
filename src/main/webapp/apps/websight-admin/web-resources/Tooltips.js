import { TooltipPrimitive } from '@atlaskit/tooltip/styled';
import styled from 'styled-components';

export const WhiteTooltip = styled(TooltipPrimitive)`
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-sizing: content-box; /* do not set this to border-box or it will break the overflow handling */
    color: #333;
    max-height: 300px;
    max-width: 300px;
    padding: 8px 12px;
    overflow: hidden;
`;