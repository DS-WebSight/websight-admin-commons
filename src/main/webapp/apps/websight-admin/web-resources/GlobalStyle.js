import React from 'react';
import '@atlaskit/css-reset';

/**
* @param props: {
*    styles: string
* }
*/
export const GlobalStyle = (props) => {
    const { styles } = props;

    const styleAlreadyDefined = [...document.querySelectorAll('style')]
        .some((style) => style.innerHTML === props.styles);

    if (styles && !styleAlreadyDefined) {
        const style = document.createElement('style');
        style.textContent = styles;
        style.type = 'text/css';
        document.querySelector('head').appendChild(style);
    }

    return (<></>);
}