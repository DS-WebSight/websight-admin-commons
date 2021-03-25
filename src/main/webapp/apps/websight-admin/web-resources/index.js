import React from 'react';
import ReactDOM from 'react-dom';

import { GlobalStyle } from './GlobalStyle.js';
import AdministrationMenu from './components/AdministrationMenu.js';
import { colors } from './theme.js'

const bodyStyle = `
    body {
        background-color: ${colors.veryLightGrey}
    }
`;

class App extends React.Component {
    render() {
        return (
            <>
                <GlobalStyle styles={bodyStyle} />
                <AdministrationMenu />
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'));