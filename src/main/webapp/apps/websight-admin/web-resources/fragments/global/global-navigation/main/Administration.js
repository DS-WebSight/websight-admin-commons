import React from 'react';

import DropdownButton from './DropdownButton.js';
import AdministrationMenu from './AdministrationMenu.js';

export default class Administration extends React.Component {
    render() {
        return (
            <DropdownButton label={'Tools'} popupContent={AdministrationMenu} />
        )
    }
}
